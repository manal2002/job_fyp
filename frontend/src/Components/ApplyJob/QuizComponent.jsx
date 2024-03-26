import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, LinearProgress, CircularProgress, Slide, Checkbox, Button } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import Chart from 'chart.js/auto'; // Import Chart.js
import { CheckCircleOutlineOutlined, RadioButtonUncheckedOutlined, TimerOutlined, SkipNextOutlined, NavigateNextOutlined, NavigateBeforeOutlined } from '@mui/icons-material';
import "./score.css";
import axios from 'axios';
import API_ENDPOINTS from "../../Api";


const ScoreMeter = ({ score }) => {
  const progressBar = (widthPerc, gradient = false) => {
    const radius = 65;
    const dashArray = (Math.PI * radius * widthPerc) / 100;

    return (
      <svg width="200" height="120">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          strokeWidth="25"
          strokeLinecap="round"
          strokeDashoffset={-1 * Math.PI * radius}
          strokeDasharray={`${dashArray} 10000`}
          stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
        ></circle>
        {gradient && (
          <defs>
            <linearGradient id="score-gradient">
              <stop offset="0%" stopColor="red" />
              <stop offset="25%" stopColor="orange" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
        )}
      </svg>
    );
  };

  return (
    <div className="score-wrap">
      <div className="score">
        <div className="score-bar">
          <div className="placeholder">{progressBar(100)}</div>
          <div className="score-circle">{progressBar(score, true)}</div>
        </div>
        <div className="score-value">
          <div className="score-name">Score</div>
          <div className="score-number">
            {Math.round(score)}%
          </div>
        </div>
      </div>
    </div>
  );
};

// const questions = [
//   {
//     question: "What is React?",
//     options: ["Library for building UI", "Server-side Framework", "User interface", "None of the above"],
//     answer: 0,
//   },
//   {
//     question: "What is Redux?",
//     options: ["State management library", "Backend database", "UI component library", "None of the above"],
//     answer: 0,
//   },
//   {
//     question: "What is JavaScript?",
//     options: ["Programming language", "Document Object Model", "Server-side Framework", "None of the above"],
//     answer: 0,
//   },
//   {
//     question: "What does CSS stand for?",
//     options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "None of the above"],
//     answer: 0,
//   },
//   {
//     question: "What does HTML stand for?",
//     options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "None of the above"],
//     answer: 0,
//   },
//   {
//     question: "What is the capital of France?",
//     options: ["Paris", "London", "Berlin", "Madrid"],
//     answer: 0,
//   }
// ];

const QuizComponent = ({ passScore, setQuizCompleted }) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const chartRef = useRef(null);
  const [quizScore, setQuizScore] = useState(null);
  //const [isQuizCompleted, setQuizCompleted] = useState(false);


  const jobDescription = "We are looking for a software engineer proficient in Python and Java, with strong problem-solving skills and experience with SQL databases.";
  const skills = "Python, Java, SQL, problem-solving";

  useEffect(() => {
    if (showReport) {
      renderChart();
      //setQuizCompleted(true); // Set quiz as completed when showing the report
    }
  }, [showReport]);

  // Calculate score when quiz is completed and pass it to parent component
  useEffect(() => {
    if (questions.length > 0) {
      const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
        const question = questions[index];
        return answer !== null && answer === question.answer ? count + 1 : count;
      }, 0);
      const percentageScore = ((correctAnswers / questions.length) * 100).toFixed(2);
      passScore(percentageScore);
    }
  }, [questions, selectedAnswers, passScore]);


  useEffect(() => {
    let intervalId;

    if (isTimerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            handleSkipQuestion();
          }
          return prevTimer === 0 ? 10 : prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
      if (timer === 0) {
        handleSkipQuestion();
      }
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timer]);

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowReport(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsTimerRunning(true);
      setTimer(10);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowReport(true);
    } else {
      handleAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsTimerRunning(true);
      setTimer(10);
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(10);
  };

  // const handleQuizComplete = () => {
  //   const score = calculateScore();
  //   setQuizScore(score);
  //   setQuizCompleted(true);
  // };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        sessionStorage.removeItem('questions');

        const payload = {
                                "model": "gpt-3.5-turbo",
                                "messages": [{
                                        "role": "system",
                                        "content": `Do not include any explanations or ';', only provide a RFC8259 compliant JSON response following this format without deviation: 
                              [
                                {
                                  "Question": "Question",
                                  "Options": [
                                    {
                                      "0": "Answer A"
                                    },
                                    {
                                      "1": "Answer B"
                                    },
                                    {
                                      "2": "Answer C"
                                    },
                                    {
                                      "3": "Answer D"
                                    }
                                  ],
                                  "Correct_answer": "1"
                                }
                              ]
                              
                              The system will receive a job description and skills extracted from a candidate's resume. Given the job description and resume, generate 1 multiple-choice questions (MCQs) with 4 options each. These questions should focus on problem-solving, algorithmic thinking, and coding skills and should be LeetCode style questions
                    
                              Instructions:
                    
                              Generate MCQs of difficulty level easy, medium, and hard.
                    
                              Requirements:
                    
                              Each question should have 4 options.
                              Do not mention the difficulty level in the question, only the question itself.
                              Ensure each question is complete, without any cutoffs.
                              Exclude any special characters, slashes, or extra information.
                              Provide exactly 3 questions, no more, no less.`
                                    },
                                    {
                                        "role": "user",
                                        "content": `Job Description:
                                            ${jobDescription}
                    
                                            Skills:
                                            ${skills}`
                                    }
                                ],
                                "max_tokens": 1000,
                                "temperature": 0.7,
                                "n": 5
                            };

        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Replace with your OpenAI API key
          }
        });

        const generatedQuestions = response.data.choices.map(choice => {
          const mcqContent = choice.message.content;
          const mcq = JSON.parse(mcqContent)[0];
          const options = mcq.Options.map(option => Object.values(option)[0]);
          const correctAnswer = mcq.Correct_answer;
          return {
            question: mcq.Question,
            options: options,
            answer: parseInt(correctAnswer)
          };
        });

        setQuestions(generatedQuestions);
        console.log('Generated questions:', generatedQuestions);
        setSelectedAnswers(Array(generatedQuestions.length).fill(null));
        sessionStorage.setItem('questions', JSON.stringify(generatedQuestions));
      } catch (error) {
        console.error('Error fetching/generating questions:', error);
      }
    };

    if (!isQuizStarted) {
      fetchQuestions();
    }
  }, [isQuizStarted]);

  const renderChart = () => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const totalQuestions = questions.length;
    const attemptedQuestions = selectedAnswers.filter(answer => answer !== null).length;
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      const question = questions[index];
      return answer !== null && answer === question.answer ? count + 1 : count;
    }, 0);
    const wrongAnswers = attemptedQuestions - correctAnswers;
    const skippedQuestions = totalQuestions - attemptedQuestions;

    const chartData = {
      labels: ['Correct', 'Wrong', 'Skipped'],
      datasets: [
        {
          label: 'Question Stats',
          data: [correctAnswers, wrongAnswers, skippedQuestions],
          backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
          borderWidth: 1,
        },
      ],
    };

    chartRef.current.chart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
    });
  };

  const handleAnswer = (optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
    setIsTimerRunning(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswers[currentQuestionIndex] !== null) {
      handleNext();
    }
  };

  // const calculateScore = () => {
  //   const totalQuestions = questions.length;
  //   const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
  //     const question = questions[index];
  //     return answer !== null && answer === question.answer ? count + 1 : count;
  //   }, 0);
  //   return (correctAnswers / totalQuestions) * 100;
  // };

  const calculateScore = () => {
    // Calculate the percentage score based on the selected answers and correct answers
    const totalQuestions = questions.length;
    let correctAnswers = 0;
  
    for (let i = 0; i < totalQuestions; i++) {
      const question = questions[i];
      if (selectedAnswers[i] === question.answer) {
        correctAnswers++;
      }
    }
  
    const percentageScore = (correctAnswers / totalQuestions) * 100;
    return percentageScore.toFixed(2); // Return the percentage score rounded to 2 decimal places
  };


  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const renderQuiz = () => {
    if (!questions.length) {
      return <div>Loading questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    return (
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: 'red' }}>
          <TimerOutlined />
          <Typography variant="subtitle1" sx={{ mr: 2 }}>{`: ${timer} seconds`}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>{currentQuestion.question}</Typography>
        {currentQuestion.options.map((option, optionIndex) => (
          <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', p: 2, m: 2, border: 1, borderRadius: 1, cursor: 'pointer' }} onClick={() => handleAnswer(optionIndex)}>
            <Checkbox checked={selectedAnswers[currentQuestionIndex] === optionIndex} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>{`${option}`}</Typography>
          </Box>
        ))}
        <Box mt={2}>
          <LinearProgress variant="determinate" value={((currentQuestionIndex + 1) / questions.length) * 100} />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</Typography>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleSkipQuestion}>Skip</Button>
          <Button variant="contained" color="primary" onClick={handleSubmitAnswer} disabled={selectedAnswers[currentQuestionIndex] === null}>Next</Button>
        </Box>
      </Container>
    );
  };

  // const handlePassScoreAndExit = () => {
  //   if (quizScore !== null) {
  //     passScore(quizScore);
  //   }
  //   // Reset states to initial values to exit the quiz component
  //   setIsQuizStarted(false);
  //   setQuestions([]);
  //   setCurrentQuestionIndex(0);
  //   setSelectedAnswers([]);
  //   setShowReport(false);
  //   setTimer(10);
  //   setIsTimerRunning(false);
  //   setQuizScore(null);
  // };

  const renderReport = () => {
    const totalQuestions = questions.length;
    const attemptedQuestions = selectedAnswers.filter(answer => answer !== null).length;
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      const question = questions[index];
      if (question && typeof question.answer === 'number' && answer !== null && answer === question.answer) {
        return count + 1;
      }
      return count;
    }, 0);
    const wrongAnswers = attemptedQuestions - correctAnswers;
    const skippedQuestions = totalQuestions - attemptedQuestions;

    const handleContinue = () => {
      setQuizCompleted(true); // Update state in the parent component
    };

    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ p: 3, m: 3, border: 1, borderRadius: 1, backgroundColor: 'white', color: '#000000', textAlign: 'center', minWidth: '200px' }}>
            <Typography variant="h4">Score</Typography>
            <ScoreMeter score={calculateScore()} />
          </Box>
          <Box sx={{ p: 3, m: 3, border: 1, borderRadius: 1, backgroundColor: 'white', color: '#000000', textAlign: 'center', minWidth: '200px' }}>
            <Typography variant="h4">Quiz Stats</Typography>
            <canvas ref={chartRef} />
          </Box>
        </Box>
        {questions.map((question, index) => (
          <Slide key={index} direction="up" in={true} mountOnEnter unmountOnExit>
            <Box sx={{ border: 1, borderRadius: 2, borderColor: 'primary.main', p: 2, mt: 2 }}>
              <Typography variant="h6" gutterBottom>Question {index + 1}</Typography>
              <Typography variant="body1">{question.question}</Typography>
              {question.options.map((option, optionIndex) => (
                <Box
                  key={optionIndex}
                  sx={{
                    backgroundColor: optionIndex === question.answer ? 'green' : selectedAnswers[index] === optionIndex ? 'red' : 'transparent',
                    color: selectedAnswers[index] === optionIndex ? '#ffffff' : '#000000',
                    p: 2,
                    m: 1,
                    borderRadius: 1,
                  }}
                >
                  {option}
                </Box>
              ))}
            </Box>
          </Slide>
        ))}
        <br />
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Next
        </Button>
      </Container>
    );
  };

  const renderStartQuizButton = () => (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button variant="contained" color="primary" onClick={startQuiz}>Start Quiz</Button>
      </Box>
    </Container>
  );

  return (
    <Box>
      {!isQuizStarted ? (
        renderStartQuizButton()
      ) : showReport ? (
        renderReport()
      ) : (
        renderQuiz()
      )}
    </Box>
  );

  //return renderReport();
};

export default QuizComponent;

