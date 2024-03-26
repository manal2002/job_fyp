import openai
import requests
from flask import Flask, request, jsonify
import os
import json



# app = Flask(__name__)


def generate_interview_questions(job_desc, skills):
    openai.api_key = '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'

    try:

        response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[
            {
                'role': 'system', 'content': ''' Do not include any explanations or ';', only provide a  RFC8259 compliant JSON response  following this format without deviation: 
                [
    {
        'Question': "Question",
        "Options": [{
            "A": "Answer A",
        },{
            "B": "Answer B",

        },
            {
                "C": "Answer C",
            },
            {
                "D": "Answer D",
            }
        ],
        "Correct_answer": "A",

    }
]

The system will receive a job description and skills extracted from a candidate's resume. Given the job description and resume, generate 3 multiple-choice questions (MCQs) with 4 options each. These questions should focus on problem-solving, algorithmic thinking, and coding skills and should be LeetCode style questions

Instructions:

Generate MCQs of difficulty level easy, medium, and hard.

Requirements:

Each question should have 4 options.
Do not mention the difficulty level in the question, only the question itself.
Ensure each question is complete, without any cutoffs.
Exclude any special characters, slashes, or extra information.
Provide exactly 3 questions, no more, no less. '''

            },
            {
                'role': 'user', 'content': f'''
                        Job Description:
                        {job_desc}

                        Skills:
                        {skills}

                        
                    '''
            }
        ])


        questions = response.choices[0].message['content']


        return questions
    except Exception as e:
        return str(e)
    
    


#@app.route('/generate_questions', methods=['POST'])
#def generate_questions():
 #   data = request.json
  #  job_desc = data['job_description']
   # skills = data['skills']
   # difficulty = data['difficulty']
            

   # questions = generate_interview_questions(job_desc, skills, difficulty)    

   # return jsonify({'questions': questions})


#if __name__ == '__main__':
  #  app.run(host='0.0.0.0', port=5600,debug=True)
            
            
skills = "Python, Java, SQL, problem-solving"
job_desc = "We are looking for a software engineer proficient in Python and Java, with strong problem-solving skills and experience with SQL databases."
            
print(generate_interview_questions(job_desc, skills))