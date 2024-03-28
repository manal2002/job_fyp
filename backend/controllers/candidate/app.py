import os
import json
import sys
import warnings
import re

from cv_parser import parse_cv
from skill_matching import match_skills

# Ignore warnings
warnings.filterwarnings("ignore")

def run_parser_matcher(file_path, job_skills):
    # Ensure the file exists
    if not os.path.isfile(file_path):
        return {"error": "File not found."}
    
    # Call the CV parsing function
    cv_skills = parse_cv(file_path)  

    # Split jobskills string by commas and newlines
    skills_list = re.split(r',|\n', job_skills)
    
    # Process each element in job_skills_list
    job_skills_list = []
    for skill in skills_list:
        # Remove leading/trailing whitespace and punctuation
        skill = re.sub(r'[^\w\s,]', '', skill.strip())
        # Split skill by commas
        skills = skill.split(',')
        # Add cleaned skills to final_skills_list
        job_skills_list.extend([s.strip() for s in skills if s.strip()])


    # Call the skill matching function
    matched_skills, score = match_skills(cv_skills, job_skills_list)  

    # Convert result variable to JSON format
    result = {'matched_skills': matched_skills, 'match_score': score}

    return result

if __name__ == "__main__":
    # Initialize arguments with provided names
    file_path = sys.argv[1]
    job_skills = sys.argv[2]

    # Run the skill matching function
    output = run_parser_matcher(file_path, job_skills)

    # Print the output as JSON
    print(json.dumps(output))