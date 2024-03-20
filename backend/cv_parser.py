import torch
from transformers import AutoTokenizer, AutoModelForTokenClassification, AutoModelForSequenceClassification,AutoModelForSeq2SeqLM
from multiprocessing import Pool, set_start_method  # Import set_start_method
from transformers import pipeline

import os
import pandas as pd
import pdfplumber
import fitz

import re
from string import punctuation
from functools import partial
from datetime import datetime
from dateutil import parser

from flair.data import Sentence
from flair.models import SequenceTagger
import pickle

import logging
import warnings
import json

warnings.filterwarnings("ignore")

class ResumeReader:

    def convert_docx_to_txt(self, docx_file,docx_parser):
        """
            A utility function to convert a Microsoft docx files to raw text.

            This code is largely borrowed from existing solutions, and does not match the style of the rest of this repo.
            :param docx_file: docx file with gets uploaded by the user
            :type docx_file: InMemoryUploadedFile
            :return: The text contents of the docx file
            :rtype: str
        """

        
        text = ""
        try:
            clean_text = re.sub(r'\n+', '\n', text)
            clean_text = clean_text.replace("\r", "\n").replace("\t", " ")  # Normalize text blob
            resume_lines = clean_text.splitlines()  # Split text blob into individual lines
            resume_lines = [re.sub('\s+', ' ', line.strip()) for line in resume_lines if
                            line.strip()]  # Remove empty strings and whitespaces
            return resume_lines, text
        except Exception as e:
            logging.error('Error in docx file:: ' + str(e))
            return [], " "

    def convert_pdf_to_txt(self, pdf_file):
        """
        A utility function to convert a machine-readable PDF to raw text.

        This code is largely borrowed from existing solutions, and does not match the style of the rest of this repo.
        :param input_pdf_path: Path to the .pdf file which should be converted
        :type input_pdf_path: str
        :return: The text contents of the pdf
        :rtype: str
        """

        pdf = pdfplumber.open(pdf_file)
        raw_text= ""
        with fitz.open(pdf_file) as doc:
            for page in doc:
                raw_text += page.get_text()
                #print(raw_text)
        # for page in pdf.pages:
        #     raw_text += page.extract_text() + "\n"

        pdf.close()

        try:
            full_string = re.sub(r'\n+', '\n', raw_text)
            full_string = full_string.replace("\r", "\n")
            full_string = full_string.replace("\t", " ")

            # Remove awkward LaTeX bullet characters
            full_string = re.sub(r"\uf0b7", " ", full_string)
            full_string = re.sub(r"\(cid:\d{0,3}\)", " ", full_string)
            full_string = re.sub(r'• ', " ", full_string)

            # Split text blob into individual lines
            resume_lines = full_string.splitlines(True)

            # Remove empty strings and whitespaces
            resume_lines = [re.sub('\s+', ' ', line.strip()) for line in resume_lines if line.strip()]

            return resume_lines, raw_text
        except Exception as e:
            logging.error('Error in docx file:: ' + str(e))
            return [], " "

    def read_file(self, file,docx_parser = "tika"):
        """
        file : Give path of resume file
        docx_parser : Enter docx2txt or tika, by default is tika
        """
        #print("Reading the Resume...")
        # file = "/content/Asst Manager Trust Administration.docx"
        file = os.path.join(file)
        if file.endswith('docx') or file.endswith('doc'):
            # if file.endswith('doc') and docx_parser == "docx2txt":
                # docx_parser = "tika"
                # logging.error("doc format not supported by the docx2txt changing back to tika")
            resume_lines, raw_text = self.convert_docx_to_txt(file,docx_parser)
        elif file.endswith('pdf'):
            resume_lines, raw_text = self.convert_pdf_to_txt(file)
        elif file.endswith('txt'):
            with open(file, 'r', encoding='utf-8') as f:
                resume_lines = f.readlines()

        else:
            resume_lines = None


        return resume_lines


class Models:

    def pickle_it(self, obj, file_name):
        with open(f'{file_name}.pickle', 'wb') as f:
            pickle.dump(obj, f)

    def unpickle_it(self, file_name):
        with open(f'{file_name}.pickle', 'rb') as f:
            return pickle.load(f)

    def load_trained_models(self, pickle=False):
        #NER (dates)
        #this model got an f1 score of ~83%
        tokenizer = AutoTokenizer.from_pretrained("Jean-Baptiste/camembert-ner-with-dates",use_fast=False)
        model = AutoModelForTokenClassification.from_pretrained("Jean-Baptiste/camembert-ner-with-dates")
        self.ner_dates = pipeline('ner', model=model, tokenizer=tokenizer, aggregation_strategy="simple")

        #Zero Shot Classification
        # self.zero_shot_classifier = pipeline("zero-shot-classification", model='facebook/bart-large-mnli')
        self.zero_shot_classifier = pipeline("zero-shot-classification", model='valhalla/distilbart-mnli-12-6')

        # Ner
        tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER",use_fast=False)
        model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
        self.ner = pipeline('ner', model=model, tokenizer=tokenizer, grouped_entities=True)

        # Pos Tagging
        self.tagger = SequenceTagger.load("flair/pos-english")


        if pickle:
            self.pickle_models()

        return self.ner, self.ner_dates, self.zero_shot_classifier, self.tagger

    def pickle_models(self):
        self.pickle_it(self.ner, "ner")
        self.pickle_it(self.zero_shot_classifier, "zero_shot_classifier_6")
        self.pickle_it(self.ner_dates, "ner_dates")
        self.pickle_it(self.tagger, "pos_tagger_fast")


    def load_pickled_models(self):
        ner_dates = self.unpickle_it('ner_dates')
        ner = self.unpickle_it('ner')
        zero_shot_classifier = self.unpickle_it('zero_shot_classifier_6')
        tagger = self.unpickle_it("pos_tagger_fast")
        return ner_dates, ner, zero_shot_classifier, tagger

    def get_flair_sentence(self, sent):
        return Sentence(sent)
    
class ResumeSegmenter:
    def __init__(self, zero_shot_classifier):
        self.zero_shot_classifier = zero_shot_classifier

    objective = (
        'career goal',
        'objective',
        'career objective',
        'employment objective',
        'professional objective',
        'summary',
        'summary of qualifications',
        'digital',
        'interests'
    )

    work_and_employment = (
        'employment history',
        'employment data',
        'career summary',
        'work history',
        'working history',
        'work experience',
        'experience',
        'professional experience',
        'professional background',
        'professional employment',
        'additional experience',
        'career related experience',
        "professional employment history",
        'related experience',
        'relevant experience',
        'programming experience',
        'freelance',
        'freelance experience',
        'army experience',
        'military experience',
        'military background',
    )

    education_and_training = (
        'academic background',
        'academic experience',
        'programs',
        'courses',
        'related courses',
        'education',
        'educational background',
        'educational qualifications',
        'educational training',
        'education and training',
        'training',
        'academic training',
        'Academic Qualification',
        'professional training',
        'course project experience',
        'related course projects',
        'internship experience',
        'internships',
        'apprenticeships',
        'college activities',
        'certifications',
        'special training',
    )

    skills = (
        'credentials',
        'qualifications',
        'areas of experience',
        'areas of expertise',
        'areas of knowledge',
        'skills',
        'Skills',
        'Skill',
        "other skills",
        "other abilities",
        'career related skills',
        'professional skills',
        'specialized skills',
        'technical skills',
        'computer skills',
        'personal skills',
        'computer knowledge',
        'technologies',
        'technical experience',
        'proficiencies',
        'languages',
        'language competencies and skills',
        'programming languages',
        'Programming languages',
        'programming',
        'competencies',
        'experience',
        'Experience',
        'experienced',
        'Experienced',
        'Core Competencies',
        'certifications',
        'Core competencies',
        'special training',
        'Certifications'
    )

    misc = (
        'activities and honors',
        'activities',
        'affiliations',
        'professional affiliations',
        'associations',
        'professional associations',
        'memberships',
        'professional memberships',
        'athletic involvement',
        'community involvement',
        'refere',
        'civic activities',
        'extra-Curricular activities',
        'professional activities',
        'volunteer work',
        'volunteer experience',
        'additional information',
        'interests'
    )

    accomplishments = (
        'achievement',
        'awards and achievements',
        'licenses',
        'presentations',
        'conference presentations',
        'conventions',
        'dissertations',
        'exhibits',
        'papers',
        'publications',
        'professional publications',
        'research experience',
        'research grants',
        'project',
        'research projects',
        'personal projects',
        'current research interests',
        'thesis',
        'theses',
    )


    def find_segment_indices(self, string_to_search, resume_segments, resume_indices):
        for i, line in enumerate(string_to_search):

            if line[0].islower():
                continue

            header = line.lower()

            if [o for o in self.objective if header.startswith(o)]:
                try:
                    resume_segments['objective'][header]
                except:
                    resume_indices.append(i)
                    header = [o for o in self.objective if header.startswith(o)][0]
                    resume_segments['objective'][header] = i
            elif [w for w in self.work_and_employment if header.startswith(w)]:
                try:
                    resume_segments['work_and_employment'][header]
                except:
                    resume_indices.append(i)
                    header = [w for w in self.work_and_employment if header.startswith(w)][0]
                    resume_segments['work_and_employment'][header] = i
            elif [e for e in self.education_and_training if header.startswith(e)]:
                try:
                    resume_segments['education_and_training'][header]
                except:
                    resume_indices.append(i)
                    header = [e for e in self.education_and_training if header.startswith(e)][0]
                    resume_segments['education_and_training'][header] = i
            elif [s for s in self.skills if header.startswith(s)]:
                try:
                    resume_segments['skills'][header]
                except:
                    resume_indices.append(i)
                    header = [s for s in self.skills if header.startswith(s)][0]
                    resume_segments['skills'][header] = i
            elif [m for m in self.misc if header.startswith(m)]:
                try:
                    resume_segments['misc'][header]
                except:
                    resume_indices.append(i)
                    header = [m for m in self.misc if header.startswith(m)][0]
                    resume_segments['misc'][header] = i
            elif [a for a in self.accomplishments if header.startswith(a)]:
                try:
                    resume_segments['accomplishments'][header]
                except:
                    resume_indices.append(i)
                    header = [a for a in self.accomplishments if header.startswith(a)][0]
                    resume_segments['accomplishments'][header] = i

    def slice_segments(self, string_to_search, resume_segments, resume_indices):
        resume_segments['contact_info'] = string_to_search[:resume_indices[0]]
        sec_idxs = {}
        for section, value in resume_segments.items():
            if section == 'contact_info':
                continue

            for sub_section, start_idx in value.items():
                end_idx = len(string_to_search)
                if (resume_indices.index(start_idx) + 1) != len(resume_indices):
                    end_idx = resume_indices[resume_indices.index(start_idx) + 1]

                sec_idxs[section] = (start_idx, end_idx)
                # print(start_idx, end_idx)

                resume_segments[section][sub_section] = string_to_search[start_idx:end_idx]
        return sec_idxs

    def find_true_segment(self, dict_of_segments, segment_name):
        segment_classes = {
            'objective': ["objective", "other"],
            'work_and_employment':["employment history", "other"],
            'education_and_training': ["education", "other"],
            'skills': ["skills", "other"],
            'accomplishments': ["accomplishments", "other"],
            'misc': ["misc", "other"],
            'contact_info': ["contact information", "other"]
        }
        classes = segment_classes[segment_name]
        scores = []
        segs = dict_of_segments.keys()
        for seg in segs:
            sequence = dict_of_segments[seg]
            score = self.zero_shot_classifier(' '.join(sequence), classes)["scores"][0]
            scores.append(score)

        res = sorted(zip(dict_of_segments.keys(), scores), key=lambda x: x[1], reverse=True)
        if len(res):
            return res[0][0]
        else: return 0

    def segment(self, string_to_search):
        #print("Segmenting the Resume..")
        resume_segments = {
            'objective': {},
            'work_and_employment': {},
            'education_and_training': {},
            'skills': {},
            'accomplishments': {},
            'misc': {}
        }

        resume_indices = []

        self.find_segment_indices(string_to_search, resume_segments, resume_indices)
        if len(resume_indices) != 0:
            sec_idx = self.slice_segments(string_to_search, resume_segments, resume_indices)
        else:
            resume_segments['contact_info'] = []

        for segment in resume_segments:
            if segment == "contact_info": continue
            if not len(resume_segments[segment]) > 1:
                if len(resume_segments[segment]) == 1:
                    only_key = list(resume_segments[segment].keys())[0]
                    resume_segments[segment] = resume_segments[segment][only_key][1:]
                    continue
            if segment != "work_and_employment": continue
            true_seg = self.find_true_segment(resume_segments[segment], segment)
            if not true_seg:
                resume_segments[segment] = []
            else:
                resume_segments[segment] = resume_segments[segment][true_seg][1:]

        return resume_segments
    
class ResumeParser:
    def __init__(self, ner, ner_dates, zero_shot_classifier, tagger):
        self.models = Models()
        self.segmenter = ResumeSegmenter(zero_shot_classifier)
        self.ner, self.ner_dates, self.zero_shot_classifier, self.tagger = ner, ner_dates, zero_shot_classifier, tagger
        self.parsed_cv = {}

    def parse(self, resume_lines):
        resume_segments = self.segmenter.segment(resume_lines)
        #print(resume_segments)
        #print("***************************** Parsing the Resume...***************************** ")
        for segment_name in resume_segments:
            if segment_name == "work_and_employment":
                resume_segment = resume_segments[segment_name]
                self.parse_job_history(resume_segment)
            elif segment_name == "contact_info":
                contact_info = resume_segments[segment_name]
                self.parse_contact_info(contact_info)
            elif segment_name == "education_and_training":
                education_and_training = resume_segments[segment_name]
                self.parse_education(education_and_training)
            elif segment_name == "skills":
                skills = resume_segments[segment_name]
                self.parse_skills(skills)
        #print("************************************** Parsing the Resume Completed ... ***************************** ")
        return self.parsed_cv

    def parse_education(self, education_and_training):
        #print(education_and_training)
        self.parsed_cv['Education'] = education_and_training

    def parse_skills(self, skills):
        self.parsed_cv['Skills'] = skills

    def get_skills(self):
        return self.parsed_cv['Skills']

    def parse_contact_info(self, contact_info):
        contact_info_dict = {}
        name = self.find_person_name(contact_info)
        email = self.find_contact_email(contact_info)
        self.parsed_cv['Name'] = name
        contact_info_dict["Email"] = email
        self.parsed_cv['Contact Info'] = contact_info_dict


    def find_person_name(self, items):
        class_score = []
        splitter = re.compile(r'[{}]+'.format(re.escape(punctuation.replace("&", "") )))
        classes = ["person name", "address", "email", "title"]
        for item in items:
            elements = splitter.split(item)
            for element in elements:
                element = ''.join(i for i in element.strip() if not i.isdigit())
                if not len(element.strip().split()) > 1: continue
                out = self.zero_shot_classifier(element, classes)
                highest = sorted(zip(out["labels"], out["scores"]), key=lambda x: x[1])[-1]
                if highest[0] == "person name":
                    class_score.append((element, highest[1]))
        if len(class_score):
            return sorted(class_score, key=lambda x: x[1], reverse=True)[0][0]
        return ""

    def find_contact_email(self, items):
        for item in items:
            match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', item)
            if match:
                return match.group(0)
        return ""

    def get_job_dates(self, st, end, resume_segment):
        search_span = resume_segment[st:end]
        dates = []
        for line in search_span:
            for dt in self.get_ner_in_line(line, "DATE"):
                if self.isvalidyear(dt.strip()):
                    dates.append(dt)
        if len(dates): first = dates[0]
        exists_second = False
        if len(dates) > 1:
            exists_second = True
            second = dates[1]

        if len(dates) > 0:
            if self.has_two_dates(first):
                d1, d2 = self.get_two_dates(first)
                return self.format_date(d1), self.format_date(d2)
            elif exists_second and self.has_two_dates(second):
                d1, d2 = self.get_two_dates(second)
                return self.format_date(d1), self.format_date(d2)
            else:
                if exists_second:
                    st = self.format_date(first)
                    end = self.format_date(second)
                    return st, end
                else:
                    return (self.format_date(first), "")
        else: return ("", "")


    def filter_job_title(self, job_title):
        job_title_splitter = re.compile(r'[{}]+'.format(re.escape(punctuation.replace("&", "") )))
        job_title = ''.join(i for i in job_title if not i.isdigit())
        tokens = job_title_splitter.split(job_title)
        tokens = [''.join([i for i in tok.strip() if (i.isalpha() or i.strip()=="")]) for tok in tokens if tok.strip()]
        classes = ["company", "organization", "institution", "job title", "responsibility",  "details"]
        new_title = []
        for token in tokens:
            if not token: continue
            res = self.zero_shot_classifier(token, classes)
            class_score = zip(res["labels"], res["scores"])
            highest = sorted(class_score, key=lambda x: x[1])[-1]
            if (highest[0] == "job title") or (highest[0] == "organization"):
            # if highest[0] == "job title":
                new_title.append(token.strip())
        if len(new_title):
            return ', '.join(new_title)
        else: return ', '.join(tokens)

    def has_two_dates(self, date):
        years = self.get_valid_years()
        count = 0
        for year in years:
            if year in str(date):
                count+=1
        return count == 2

    def get_two_dates(self, date):
        years = self.get_valid_years()
        idxs = []
        for year in years:
            if year in date:
                idxs.append(date.index(year))
        min_idx = min(idxs)
        first = date[:min_idx+4]
        second = date[min_idx+4:]
        return first, second

    def get_valid_years(self):
        current_year = datetime.today().year
        years = [str(i) for i in range(current_year-100, current_year)]
        return years

    def format_date(self, date):
        out = self.parse_date(date)
        if out:
            return out
        else:
            date = self.clean_date(date)
            out = self.parse_date(date)
            if out:
                return out
            else:
                return date

    def clean_date(self, date):
        try:
            date = ''.join(i for i in date if i.isalnum() or i =='-' or i == '/')
            return date
        except:
            return date

    def parse_date(self, date):
        try:
            date = parser.parse(date)
            return date.strftime("%m-%Y")
        except:
            try:
                date = datetime(date)
                return date.strftime("%m-%Y")
            except:
                return 0


    def isvalidyear(self, date):
        current_year = datetime.today().year
        years = [str(i) for i in range(current_year-100, current_year)]
        for year in years:
            if year in str(date):
                return True
        return False

    def get_ner_in_line(self, line, entity_type):
        if entity_type == "DATE": ner = self.ner_dates
        else: ner = self.ner
        return [i['word'] for i in ner(line) if i['entity_group'] == entity_type]


    def get_job_company(self, idx, idx1, resume_segment):
        job_title = resume_segment[idx]
        if not idx1 <= len(resume_segment)-1: context = ""
        else:context = resume_segment[idx1]
        candidate_companies = self.get_ner_in_line(job_title, "ORG") + self.get_ner_in_line(context, "ORG")
        classes = ["organization", "company", "institution", "not organization", "not company", "not institution"]
        scores = []
        for comp in candidate_companies:
            res = self.zero_shot_classifier(comp, classes)['scores']
            scores.append(max(res[:3]))
        sorted_cmps = sorted(zip(candidate_companies, scores), key=lambda x: x[1], reverse=True)
        if len(sorted_cmps): return sorted_cmps[0][0]
        return context

    def parse_job_history(self, resume_segment):
        idx_job_title = self.get_job_titles(resume_segment)
        current_and_below = False
        if not len(idx_job_title):
            self.parsed_cv["Job History"] = []
            return
        if idx_job_title[0][0] == 0: current_and_below = True
        job_history = []
        for ls_idx, (idx, job_title) in enumerate(idx_job_title):
            job_info = {}
            # print("<br> Job Title: ",job_title)
            job_info["Job Title"] = self.filter_job_title(job_title)
            # company
            if current_and_below: line1, line2 = idx, idx+1
            else: line1, line2 = idx, idx-1
            job_info["Company"] = self.get_job_company(line1, line2, resume_segment)
            if current_and_below: st_span = idx
            else: st_span = idx-1
            # Dates
            if ls_idx == len(idx_job_title) - 1: end_span = len(resume_segment)
            else: end_span = idx_job_title[ls_idx+1][0]
            start, end = self.get_job_dates(st_span, end_span, resume_segment)
            job_info["Start Date"] = start
            job_info["End Date"] = end
            if(start != "" and end != ""):
              job_history.append(job_info)
        self.parsed_cv["Job History"] = job_history

    def get_job_titles(self, resume_segment):
        classes = ["organization", "institution", "company", "job title", "work details", "work experience"]
        idx_line = []
        #print("resume_segment:    ", resume_segment)
        for idx, line in enumerate(resume_segment):
            has_verb = False
            line_modifed = ''.join(i for i in line if not i.isdigit())
            #print("Line modified:",line_modifed )
            sentence = self.models.get_flair_sentence(line_modifed)
            self.tagger.predict(sentence)
            #print('sentence:',sentence)
            tags = []
            for entity in sentence.get_spans():
            #for entity in sentence:
                tags.append(entity.tag)
                if entity.tag.startswith("V"):
                    has_verb = True

            #if tags:
            most_common_tag = max(set(tags), key=tags.count)
            if (most_common_tag == "NNP") or (most_common_tag == "NN"):
            # if most_common_tag == "NNP":
                if not has_verb:
                    out = self.zero_shot_classifier(line, classes)
                    class_score = zip(out["labels"], out["scores"])
                    highest = sorted(class_score, key=lambda x: x[1])[-1]

                    if (highest[0] == "job title") or (highest[0] == "organization"):
                    # if highest[0] == "job title":
                        idx_line.append((idx, line))
        #print(idx_line)
        return idx_line



'''
def main_skill_parse(file_path):
    models = Models()
    ner, ner_dates, zero_shot_classifier, tagger = models.load_trained_models()

    def parse_cv(file_path):
        resume_lines = reader.read_file(file_path)
        output = parser.parse(resume_lines)
        return output
    
    def save_parse_as_json(dict, file_name):
        print("Saving the parse...")
        with open(file_name, 'w', encoding="utf-8") as f:
        json.dump(dict, f, indent=4, default=str, ensure_ascii=False)

    reader = ResumeReader()
    parser = ResumeParser(ner, ner_dates, zero_shot_classifier, tagger)

    fullCv_parse = parse_cv(file_path)

    #get and display the skills extracted only
    print("Skills")
    extracted_skills = parser.get_skills()
    return extracted_skills
'''

class Main:
    def __init__(self):
        models = Models()
        ner, ner_dates, zero_shot_classifier, tagger = models.load_trained_models()
        self.reader = ResumeReader()
        self.parser = ResumeParser(ner, ner_dates, zero_shot_classifier, tagger)

    def parse_cv(self, file_path):
        resume_lines = self.reader.read_file(file_path)
        output = self.parser.parse(resume_lines)
        skills = self.parser.get_skills()
        return output,skills

    def save_parse_as_json(self, dict, file_name):
        print("Saving the parse...")
        with open(file_name, 'w', encoding="utf-8") as f:
            json.dump(dict, f, indent=4, default=str, ensure_ascii=False)

# function to be called 
def parse_cv(cv):
    main = Main()
    fullParse, extracted_skills = main.parse_cv(cv)

    skills_array = []
    for skill_list in extracted_skills.values():
        skills_array.extend(skill_list)

    return skills_array
    



