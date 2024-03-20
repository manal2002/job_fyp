from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

# Assuming these functions are implemented in separate Python modules
from cv_parser import parse_cv
from skill_matching import match_skills

app = Flask(__name__)
CORS(app)  # Enable CORS if your Flask API and Node.js backend are on different origins

# Connect to MongoDB - Adjust as per actual implementation
# This example does not directly interact with MongoDB, but you may do so as needed
# client = MongoClient('your_mongo_connection_string')
# db = client['your_database_name']
# users_collection = db['users']
# jobs_collection = db['jobs']

UPLOAD_FOLDER = '/backend/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit

@app.route('/process_cv', methods=['POST'])
def process_cv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Here we assume job_skills are passed as a JSON list in a form field or as a JSON payload
    # This part needs to be adjusted based on how you're sending job_skills from Node.js
    job_skills = request.form.get('skills_and_requirement', '[]')  # Fallback to an empty list as string

    # If job_skills are expected to be JSON in a form field, parse them
    try:
        job_skills = json.loads(job_skills)
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid job_skills format'}), 400

    # Call the CV parsing function
    cv_skills = parse_cv(filepath)  # Implement this function to parse CV and extract skills

    # Call the skill matching function
    matched_skills, score = match_skills(cv_skills, job_skills)  # Implement this function

    # Cleanup uploaded file after processing
    os.remove(filepath)

    return jsonify({'matched_skills': matched_skills, 'match_score': score})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Adjust the port as necessary

