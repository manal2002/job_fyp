import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Swal from "sweetalert2";
import QuizComponent from './QuizComponent';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';



const steps = ['Candidate Details', 'Skills Extraction', 'Quiz', 'Verification'];

const ApplyJob = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFilename, setUploadedFilename] = useState("");
  let [resume, setResume] = useState("");
  //const [newResume, setNewResume] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    last_name: "",
    email: "",
    phone: "",
    current_position: "",
    current_company: "",
    yearOfExp: "",
    resume: null,
  });

  // Quiz related states
  const [quizScore, setQuizScore] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [matchedSkills, setMatchedSkills] = useState([]);
  const [matchedScore, setMatchedScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 15; // Maximum number of retry attempts
  const [loadingStep1, setLoadingStep1] = useState(false); // Loading state for Step 1
  const [jobSkills, setJobSkills] = useState([]); // State to store job skills

  const handleNextReport = () => {
    if (activeStep === 0) {
      // If activeStep is at Step 1, call handleSubmitStep1
      handleSubmitStep1();
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep);
      fetchData();

      handleNext();
      // Check if the current step is the quiz step
      
    }
    else if (activeStep === steps.indexOf('Quiz')) {
      // Check if the current step is the quiz step
      setQuizScore(quizScore); // Pass the quiz score to the next step
    }
    // Move to the next step
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    // Fetch data for Step 2 when activeStep becomes 2
    if (activeStep === 1) {
      fetchData(); // Call fetchData function for Step 2
    }
  }, [activeStep]);

  useEffect(() => {
    // Check if the quiz is completed
    if (quizCompleted) {
      // If quiz is completed, set activeStep to the index of 'Verification' step
      setActiveStep(steps.indexOf('Verification'));
    }
  }, [quizCompleted]);


  const [newResume, setNewResume] = useState(false);
  const [userId, setUserId] = useState(null);


  const handleRadioChange = (e) => {
    setNewResume(e.target.value === "true");
  };
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [currentUser, setCurrentUser] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile); // Log the selected file
      setResume(selectedFile); // Update the resume state with the selected file
    }
  };

  
  const handleUpload = async () => {
    try {
      if (!resume) {
        console.error("No file selected.");
        return;
      }

      console.log("Resume state before upload:", resume); // Log the resume state

      // Create a new FormData object
      const formData1 = new FormData();
      formData1.append("resume", resume);

      console.log("Form Data before upload:", [...formData1]);

      // Send the POST request to upload the resume
      const response = await axios.post(API_ENDPOINTS.uploadResume, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedFilename = response.data.filename;
      console.log("Upload response:", response.data);
      console.log("Uploaded filename:", uploadedFilename);

      setUploadedFilename(uploadedFilename);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };


  const handleSubmitStep1 = async () => {
    try {
      setLoadingStep1(true); // Set loading state for Step 1
      const jobId = id;
      const userId = userData._id;
  
      console.log("resume", resume);
      console.log("uploadedFilename", uploadedFilename);
  
      // Ensure resume and uploadedFilename are set before proceeding
      if (!resume || !uploadedFilename) {
        console.error("Resume or filename not set.");
        return;
      }
  
      // Create the request data object
      const requestData = {
        firstname: formData.firstname,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        current_position: formData.current_position,
        current_company: formData.current_company,
        yearOfExp: formData.yearOfExp,
        resume: resume,
        resumeFileName: uploadedFilename,
        jobId: jobId,
        userId: userId
      };
  
      console.log("Request Data (Step 1) before submitting:", requestData);
  
      const responseStep1 = await axios.post(API_ENDPOINTS.postResume, requestData, {
        headers: {
          "Content-Type": "application/json", // Change content type to JSON
        },
      });

      setLoadingStep1(false); // Set loading state for Step 1
  
      console.log("step 1 data:", jobId, userId, formData);
  
      if (responseStep1 && responseStep1.status === 200) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      }
      setLoadingStep1(false); // Set loading state for Step 1

    } catch (error) {
      console.error("Error submitting Step 1 data:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting Step 1 data.",
      });
    }
  };
  
  
  



  // const fetchData = async () => {
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 10000)); // Add a delay of 10 seconds
  //     const response = await axios.get(API_ENDPOINTS.getResume + `/${userData._id}/${id}`);
  //     const { data, message, success } = response.data;
  //     if (success) {
  //       const { matchedSkills, matchScore } = data;
  //       setMatchedSkills(matchedSkills);
  //       setMatchedScore(matchScore);
  //       setLoading(false); // Set loading state to false after data is fetched
  //     } else {
  //       console.error("Error fetching matched skills:", message);
  //       setLoading(false); // Set loading state to false on error
  //     }
  //   } catch (error) {
  //     console.error("Error fetching matched skills:", error);
  //     setLoading(false); // Set loading state to false on error
  //   }
  // };



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [processing, setProcessing] = useState(false);

  

  const handleSubmit = async () => {
    setProcessing(true);

    // Extract jobId from the URL
    const jobId = id; // id comes from useParams()

    
    const userId = userData._id;

    // Access all entered values in formData object
    formData.userId = userId;

    // Add quiz score to formData if available
  if (quizScore !== null) {
    formData.quiz_score = quizScore;
  }

    // Access all entered values in formData object
    //formData.userId = userId;
    formData.my_resume = uploadedFilename ? uploadedFilename : "";
    console.log("Form Data:", formData);

    try {
        const response = await axios.post(API_ENDPOINTS.applyJob, { data: { ...formData, jobId, userId } });
        if (response && response.status === 200) {
            setProcessing(false);
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Job applied successfully.",
            }).then(() => {
                window.location.href = "/alljobs";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong.",
            });
        }
    } catch (error) {
        console.error("Error applying for job:", error);
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred while applying for the job.",
        });
    }
  

 };

 const fetchData = async () => {
  try {
    const [resumeMatchResponse, jobResponse] = await Promise.all([
      axios.get(API_ENDPOINTS.getResume + `/${userData._id}/${id}`),
      axios.get(API_ENDPOINTS.getJobDetails + `/${id}`),
    ]);

    const resumeMatchData = resumeMatchResponse.data;
    const jobData = jobResponse.data;

    if (resumeMatchData.success && jobData.success) {
      const resumeMatchedSkills = resumeMatchData.data.matchedSkills;
      //const jobData = jobResponse.data;
      console.log('jobData:', jobData);
      console.log('jobData.data.jobSkills:', jobData.data.jobSkills);
      const jobSkills =  jobData.data.jobSkills; // Assuming jobDescription is stored in jobData
      //console.log('jobDescription:', jobDescription);
      console.log("skills:", jobSkills);

      setMatchedSkills(resumeMatchedSkills);
      setMatchedScore(resumeMatchData.data.matchScore);
      setJobSkills(jobSkills);

      setLoading(false);
    } else {
      console.error("Error fetching data");
      setLoading(false);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchData(); // Call fetchData within the useEffect hook
}, []);




  

  return (
    <div className="mt-5" style={{ top: "50px", position: "relative" }}>
      <div className="container bg-white p-4 ">
        <Stepper activeStep={activeStep} className="mt-4">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length - 1 ? (
            <div>
              {/* <Typography>Verification</Typography> */}
              <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
                <Typography variant="h5">Verification Details:</Typography>
                <div className="mt-4">
                <hr />
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "darkcyan",
                    }}
                  >
                    Personal Details
                  </Typography>
                  <hr />
                  <div className="mt-2">
                    <div className="row">
                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            First Name:
                          </span>{" "}
                          {formData.firstname}
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>Last Name:</span>{" "}
                          {formData.last_name}
                          <br />
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
                          {formData.phone}
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            Current Position:
                          </span>{" "}
                          {formData.current_position}
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            Current Company:
                          </span>{" "}
                          {formData.current_company}
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6">
                        <Typography>
                          <span style={{ fontWeight: "bold" }}>
                            Total years of experience:
                          </span>{" "}
                          {formData.yearOfExp}
                        </Typography>
                        <br />
                      </div>

                      <div className="col-md-6"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                <hr />
                <Typography
                    variant="h5"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "darkcyan",
                    }}
                  >
                    Quiz Score
                  </Typography>
                  <hr />
        
                  {quizScore !== null && (
                  //<Typography>Quiz Score: {quizScore}%</Typography>
                  <Typography>
                      <span style={{ fontWeight: "bold" }}>Quiz Score:</span>{" "}
                      {quizScore}%
                    </Typography>
                )}

                <br/>
                <br/>
                  
                <hr />
                  <Typography
                    variant="h5"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "darkcyan",
                    }}
                  >
                    Matched Skils
                  </Typography>
                  <hr />
                  <div className="mt-2">
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Matched Skills:</span>{" "}
                      {matchedSkills.join(", ")}
                    </Typography>
                    <br />
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Matched Score</span>{" "}
                      {matchedScore.toFixed(2)}%
                    </Typography>
                    <br />
                    
                    <br />
                    <br />
                  </div>
                </div>
              </Paper>
              <Button
                style={{ left: "20px", position: "relative" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {processing ? <>Please wait....</> : <>Submit</>}
              </Button>
            </div>
          ) : (
            <div>
  {activeStep === 0 && (
    <>
      {loadingStep1 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="primary" size={80} thickness={4} />
          <p style={{ marginTop: '10px', fontSize: '1.2em' }}>Please wait, your skills are being extracted...</p>
        </div>
      </div>
      
      ) : (
        <div className="row mt-5">
          <div className="col-md-6">
            <p>First Name</p>
            <input
              type="text"
              className="form-control"
              name="firstname"
              required={true}
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Last Name</p>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Email Address</p>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Contact Number (with country code)</p>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Current Role</p>
            <input
              type="text"
              className="form-control"
              name="current_position"
              value={formData.current_position}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Current Company</p>
            <input
              type="text"
              className="form-control"
              name="current_company"
              value={formData.current_company}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <p>Total year of experience</p>
            <input
              type="text"
              className="form-control"
              name="yearOfExp"
              value={formData.yearOfExp}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Resume/CV:</label>
            <div className="mt-3" style={{ color: "red" }}>
              <label>
                <input
                  type="radio"
                  value={false}
                  name="resumeOption"
                  onChange={handleRadioChange}
                />
                Use existing resume
              </label>
              {"     "}

              <label style={{ left: "20px", position: "relative" }}>
                <input
                  type="radio"
                  value={true}
                  name="resumeOption"
                  onChange={handleRadioChange}
                />
                Upload new resume
              </label>
            </div>
            {newResume ? (
              <>
                <input
                  type="file"
                  className="form-control w-100 mt-3"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
                <button
                  onClick={handleUpload}
                  className="btn btn-success"
                >
                  Upload
                </button>
                {uploadedFilename && (
                  <p style={{ color: "#700c93" }}>
                    File uploaded: {uploadedFilename}
                  </p>
                )}
              </>
            ) : (
              <p style={{ color: "green" }}>{userData?.resume}</p>
            )}
          </div>
        </div>
      )}
    </>
  )}

{activeStep === 1 && (
  // Step 2 UI
  <div style={{ height: "500px" }}>
    <br/>
    <Typography variant="h4">Step 2: Matched Skills and Score</Typography>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <br />
        <br />
        <Typography variant="body1" style={{ color: "#700c93", fontSize: "2em" }}>Job Skills:</Typography>
        <div>
          {jobSkills.split(',').map((skill, index) => (
            <Chip
              key={index}
              label={skill.trim()} // Trim to remove any leading or trailing spaces
              variant="outlined"
              style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#2196F3', color: '#ffffff' }}
            />
          ))}
        </div>
        <br />
        <Typography variant="body1" style={{ color: "#700c93", fontSize: "2em" }}>Matched Skills:</Typography>
        <div>
          {matchedSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              variant="outlined"
              style={{ marginRight: '10px', marginBottom: '10px', backgroundColor: '#E91E63', color: '#ffffff' }}
            />
          ))}
        </div>
        <br />
        <Typography variant="body1" style={{ color: "#700c93", fontSize: "2em" }}>Matched Score: {matchedScore.toFixed(2)}%</Typography>
      </div>
    )}
  </div>
)}

              {activeStep === steps.indexOf('Quiz') && (
                // Render QuizComponent
                <QuizComponent passScore={setQuizScore} setQuizCompleted={setQuizCompleted} matchedScore={matchedScore}
                matchedSkills={matchedSkills} />
              )}
              {activeStep !== steps.indexOf('Quiz') && activeStep !== 0 && (
              <Button
                className="mt-3"
                variant="contained"
                color="secondary"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {activeStep !== steps.length - 1 && activeStep !== steps.indexOf('Quiz') &&(
              <Button
              className="mt-3"
              variant="contained"
              color="primary"
              onClick={handleNextReport}
            >
              Next
            </Button>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;














































// import React, { useEffect, useState } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   TextField,
//   Paper,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Swal from "sweetalert2";


// const steps = ["Step 1", "Step 2", "Verification"];

// const ApplyJob = () => {
//   const { id } = useParams();
//   const [activeStep, setActiveStep] = useState(0);
//   const [uploadedFilename, setUploadedFilename] = useState("");
//   const [resume, setResume] = useState("");
//   //   const [newResume, setNewResume] = useState(false);
//   const [formData, setFormData] = useState({
//     firstname: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     current_position: "",
//     current_company: "",
//     yearOfExp: "",
//     my_resume: "",
//     current_ctc: "",
//     expected_ctc: "",
//     notice_period: "",
//     available_dates: "",
//     relocate: "",
//     profile_link: "",
//   });

//   const [newResume, setNewResume] = useState(false);
//   const [userId, setUserId] = useState(null);


//   const handleRadioChange = (e) => {
//     setNewResume(e.target.value === "true");
//   };
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData"))
//   );
//   const [currentUser, setCurrentUser] = useState(null);

//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("resume", resume);
//       formData.append("userId", userData?._id); // Directly append userId to formData

//       const response = await axios.post(API_ENDPOINTS.uploadResume, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUploadedFilename(response.data.filename);
//     } catch (error) {
//       console.error("Error uploading file:", error.message);
//     }
//   };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     console.log("ID-----------", id);
//   //     await axios
//   //       .get(API_ENDPOINTS.getProfile + `/${userData?._id}`)
//   //       .then((resp) => {
//   //         console.log("RESP OF USER---------", resp?.data?.data);
//   //       });
//   //   };
//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_ENDPOINTS.getProfile + `/${userData?._id}`);
//         const userData = response?.data?.data;
//         console.log("User data:", userData);

//         // Set the user ID in component state
//         setUserId(userData?._id);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async () => {
//     setProcessing(true);

//     // Extract jobId from the URL
//     const jobId = id; // id comes from useParams()

    
//     const userId = userData._id;

//     // Access all entered values in formData object
//     formData.userId = userId;

//     // Access all entered values in formData object
//     //formData.userId = userId;
//     formData.my_resume = uploadedFilename ? uploadedFilename : "";
//     console.log("Form Data:", formData);

//     try {
//         const response = await axios.post(API_ENDPOINTS.applyJob, { data: { ...formData, jobId, userId } });
//         if (response && response.status === 200) {
//             setProcessing(false);
//             Swal.fire({
//                 icon: "success",
//                 title: "Success!",
//                 text: "Job applied successfully.",
//             }).then(() => {
//                 window.location.href = "/alljobs";
//             });
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error!",
//                 text: "Something went wrong.",
//             });
//         }
//     } catch (error) {
//         console.error("Error applying for job:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error!",
//             text: "An error occurred while applying for the job.",
//         });
//     }
  

//  };

//   // const handleSubmit = async () => {
//   //   setProcessing(true);
//   //   // Access all entered values in formData object
//   //   //formData.jobId = "65601528dbb411088aefe12d";
//   //   //formData.companyId = "6561fe0e9171f68b9d4b9cf1";
//   //   formData.userId = userId;
//   //   formData.my_resume = uploadedFilename ? uploadedFilename : "";
//   //   console.log("Form Data:", formData);
//   //   await axios
//   //     .post(API_ENDPOINTS.applyJob, { data: formData })
//   //     .then((resp) => {
//   //       if (resp && resp.status == 200) {
//   //         setProcessing(false);
//   //         Swal.fire({
//   //           icon: "success",
//   //           title: "Success!",
//   //           text: "Job applied successfully.",
//   //         }).then(() => {
//   //           window.location.href = "/alljobs";
//   //         });
//   //       } else {
//   //         Swal.fire({
//   //           icon: "error",
//   //           title: "Error!",
//   //           text: "Something went wrong.",
//   //         });
//   //       }
//   //     });
//     // Add your logic to submit the form data

    

  

//   return (
//     <div className="mt-5" style={{ top: "50px", position: "relative" }}>
//       <div className="container bg-white p-4 ">
//         <Stepper activeStep={activeStep} className="mt-4">
//           {steps.map((label, index) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         <div>
//           {activeStep === steps.length - 1 ? (
//             <div>
//               {/* <Typography>Verification</Typography> */}
//               <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
//                 <Typography variant="h5">Verification Details:</Typography>
//                 <div className="mt-4">
//                   <Typography
//                     variant="h5"
//                     style={{
//                       fontSize: "17px",
//                       fontWeight: "bold",
//                       color: "darkcyan",
//                     }}
//                   >
//                     Personal Details
//                   </Typography>
//                   <hr />
//                   <div className="mt-2">
//                     <div className="row">
//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>
//                             First Name:
//                           </span>{" "}
//                           {formData.firstname}
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>Last Name:</span>{" "}
//                           {formData.last_name}
//                           <br />
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
//                           {formData.phone}
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>
//                             Current Position:
//                           </span>{" "}
//                           {formData.current_position}
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>
//                             Current Company:
//                           </span>{" "}
//                           {formData.current_company}
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6">
//                         <Typography>
//                           <span style={{ fontWeight: "bold" }}>
//                             Total years of experience:
//                           </span>{" "}
//                           {formData.yearOfExp}
//                         </Typography>
//                         <br />
//                       </div>

//                       <div className="col-md-6"></div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <Typography
//                     variant="h5"
//                     style={{
//                       fontSize: "17px",
//                       fontWeight: "bold",
//                       color: "darkcyan",
//                     }}
//                   >
//                     Company asked questions
//                   </Typography>
//                   <hr />
//                   <div className="mt-2">
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>Current CTC:</span>{" "}
//                       {formData.current_ctc}
//                     </Typography>
//                     <br />
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>Expecting CTC:</span>{" "}
//                       {formData.expected_ctc}
//                     </Typography>
//                     <br />
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>Notice Period:</span>{" "}
//                       {formData.notice_period}
//                     </Typography>
//                     <br />
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>
//                         Available dates for Interview:
//                       </span>{" "}
//                       {formData.available_dates}
//                     </Typography>
//                     <br />
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>
//                         Will you be able to relocate:
//                       </span>{" "}
//                       {formData.relocate}
//                     </Typography>
//                     <br />
//                     <Typography>
//                       <span style={{ fontWeight: "bold" }}>Extra Links:</span>{" "}
//                       {formData.profile_link}
//                     </Typography>
//                     <br />
//                   </div>
//                 </div>
//               </Paper>
//               <Button
//                 style={{ left: "20px", position: "relative" }}
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//               >
//                 {processing ? <>Please wait....</> : <>Submit</>}
//               </Button>
//             </div>
//           ) : (
//             <div>
//               {activeStep === 0 && (
//                 <>
//                   <div className="row mt-5">
//                     <div className="col-md-6">
//                       <p>First Name</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="firstname"
//                         required={true}
//                         value={formData.firstname}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Last Name</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Email Address</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Contact Numbe (with country code)</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Current Role</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="current_position"
//                         value={formData.current_position}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Current Company</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="current_company"
//                         value={formData.current_company}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Total year of experience</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="yearOfExp"
//                         value={formData.yearOfExp}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label>Resume/CV:</label>
//                       <div className="mt-3" style={{ color: "red" }}>
//                         <label>
//                           <input
//                             type="radio"
//                             value={false}
//                             name="resumeOption"
//                             onChange={handleRadioChange}
//                           />
//                           Use existing resume
//                         </label>
//                         {"     "}

//                         <label style={{ left: "20px", position: "relative" }}>
//                           <input
//                             type="radio"
//                             value={true}
//                             name="resumeOption"
//                             onChange={handleRadioChange}
//                           />
//                           Upload new resume
//                         </label>
//                       </div>
//                       {newResume ? (
//                         <>
//                           <input
//                             type="file"
//                             className="form-control w-100 mt-3"
//                             accept=".pdf,.doc,.docx"
//                             onChange={handleFileChange}
//                             required
//                           />
//                           <button
//                             onClick={handleUpload}
//                             className="btn btn-success"
//                           >
//                             Upload
//                           </button>
//                           {uploadedFilename && (
//                             <p style={{ color: "#700c93" }}>
//                               File uploaded: {uploadedFilename}
//                             </p>
//                           )}
//                         </>
//                       ) : (
//                         <p style={{ color: "green" }}>{userData?.resume}</p>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}
//               {activeStep === 1 && (
//                 <>
//                   <div className="row mt-5">
//                     <div className="col-md-6">
//                       <p>Your current CTC</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="current_ctc"
//                         value={formData.current_ctc}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Expected CTC</p>
//                       <textarea
//                         type="text"
//                         className="form-control"
//                         name="expected_ctc"
//                         value={formData.expected_ctc}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Your Notice Period</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="notice_period"
//                         value={formData.notice_period}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Available dates for Interview</p>
//                       <textarea
//                         type="text"
//                         className="form-control"
//                         name="available_dates"
//                         value={formData.available_dates}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Will you able to relocate</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="relocate"
//                         value={formData.relocate}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <p>Linkedin url / Github Link</p>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="profile_link"
//                         value={formData.profile_link}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}
//               {activeStep !== 0 && (
//                 <Button
//                   className="mt-3"
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleBack}
//                 >
//                   Back
//                 </Button>
//               )}
//               <Button
//                 style={{ left: "10px", position: "relative" }}
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className="mt-3"
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyJob;
