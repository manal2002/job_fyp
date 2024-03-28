import os
import json
import sys
import warnings

from cv_parser import parse_cv
from skill_matching import match_skills

# Ignore warnings
warnings.filterwarnings("ignore")

# Initialize arguments with provided names
file_path = sys.argv[1]
job_skills = sys.argv[2]

# Redirect standard output and standard error to /dev/null for the library
sys.stdout = open(os.devnull, 'w')
sys.stderr = open(os.devnull, 'w')

# Ensure the file exists
if not os.path.isfile(file_path):
    print("File not found.")
    sys.exit(1)

# Call the CV parsing function
cv_skills = parse_cv(file_path)  

# Restore standard output and standard error
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

# Split job_skills string into a list of skills
job_skills_list = json.loads(job_skills)

# Split job_skills string into a list of skills
if ',' in job_skills_list:
    job_skills_list = job_skills.split(',')
else:
    job_skills_list = job_skills.split('\n')

# Now you have job_skills_list containing individual skills

# Call the skill matching function
matched_skills, score = match_skills(cv_skills, job_skills_list)  

# Convert result variable to JSON format
result = {'matched_skills': matched_skills, 'match_score': score}

# Print the result variable as JSON
print(json.dumps(result))

# Flush output to ensure it's sent to Node.js
sys.stdout.flush()
