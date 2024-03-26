import os
import json
import sys

# Assuming these functions are implemented in separate Python modules
from cv_parser import parse_cv
from skill_matching import match_skills

def process_cv(file_path, job_skills):
    print("Processing CV...")
    
    # Ensure the file exists
    if not os.path.isfile(file_path):
        print("File not found.")
        return {'error': 'File not found'}, 404
    
    # Split job_skills string into a list of skills
    if ',' in job_skills:
        job_skills_list = job_skills.split(',')
    else:
        job_skills_list = job_skills.split()

    # Now you have job_skills_list containing individual skills
    print("Job Skills:", job_skills_list)

    # Call the CV parsing function
    cv_skills = parse_cv(file_path)  # Implement this function to parse CV and extract skills
    print("Parsed CV skills:", cv_skills)

    # Call the skill matching function
    matched_skills, score = match_skills(cv_skills, job_skills_list)  # Implement this function
    print("Matched skills:", matched_skills)
    print("Match score:", score)

    return {'matched_skills': matched_skills, 'match_score': score}

# Example usage
if __name__ == '__main__':
    # Accept file path and job skills as command-line arguments
    file_path = sys.argv[1]
    job_skills = json.loads(sys.argv[2]) if len(sys.argv) > 2 else []
    #file_path = "resume-1700708300506-756689765.pdf"
    #job_skills = "Mongodb MySQL Html CSS3 Javascript"
    result = process_cv(file_path, job_skills)
    print(result)
