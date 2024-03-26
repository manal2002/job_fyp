// // const express = require('express');
// // const session = require('express-session');
// // const axios = require('axios');

// // const app = express();
// // const port = 5600;

// // // Set up session middleware
// // app.use(session({
// //   secret: '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',
// //   resave: false,
// //   saveUninitialized: true
// // }));

// // // Function to generate interview questions using OpenAI API
// // async function generateInterviewQuestions(jobDesc, skills) {
// //   try {
// //     const response = await axios.post('https://api.openai.com/v1/completions', {
// //       model: 'text-davinci-002',
// //       prompt: `Given the job description "${jobDesc}" and skills "${skills}", generate 3 multiple-choice questions with 4 options each focusing on problem-solving, algorithmic thinking, and coding skills.`,
// //       max_tokens: 150,
// //       n: 3
// //     }, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': 'Bearer YOUR_OPENAI_API_KEY_HERE'
// //       }
// //     });

// //     const questions = response.data.choices.map(choice => choice.text.trim());
// //     return questions;
// //   } catch (error) {
// //     console.error('Error generating questions:', error.response ? error.response.data : error.message);
// //     throw error;
// //   }
// // }

// // // Route to generate questions and store them in session
// // app.post('/generate_questions', async (req, res) => {
// //   const { job_description, skills } = req.body;

// //   try {
// //     // Call function to generate questions using OpenAI API
// //     const questions = await generateInterviewQuestions(job_description, skills);

// //     // Store the questions in session
// //     req.session.generatedQuestions = questions;

// //     res.json({ message: 'Questions generated and stored in session' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'An error occurred while generating questions' });
// //   }
// // });

// // // Route to retrieve questions from session
// // app.get('/get_questions', (req, res) => {
// //   const questions = req.session.generatedQuestions || [];
// //   res.json({ questions });
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });



// const axios = require('axios');

// // Function to generate interview questions using OpenAI API
// async function generateQuestions(jobDescription, matchedSkills) {
//   try {
//     // Construct the prompt for the OpenAI API request
//     const prompt = `Given the job description "${jobDescription}" and skills "${matchedSkills.join(', ')}", generate 3 multiple-choice questions with 4 options each focusing on problem-solving, algorithmic thinking, and coding skills.`;

//     // Make a POST request to the OpenAI API
//     const response = await axios.post('https://api.openai.com/v1/completions', {
//       model: 'text-davinci-002',
//       prompt: prompt,
//       max_tokens: 150,
//       n: 3
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': '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' // Replace this with your OpenAI API key
//       }
//     });

//     // Extract the generated questions from the API response
//     const questions = response.data.choices.map(choice => choice.text.trim());
//     return questions;
//   } catch (error) {
//     console.error('Error generating questions:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// }

// module.exports = { generateQuestions };
