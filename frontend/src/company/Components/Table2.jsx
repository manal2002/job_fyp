
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Loader from "../../Components/Loader";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Box
// } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import Filter1Icon from '@mui/icons-material/Filter1';

// const Table2 = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await axios.get(API_ENDPOINTS.postedJobs).then((resp) => {
//         if (resp && resp.status === 200) {
//           setJobs(resp.data.data);
//           setLoading(false);
//         }
//       });
//     };
//     fetchData();
//   }, []);

//   const handleJobTitleClick = (job) => {
//     setSelectedJob(job);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Posted Jobs
//           </Typography>
//           <TableContainer component={Paper} sx={{
//             border: 2,
//             borderColor: '#9C27B0',
//             borderRadius: 2,
//             maxHeight: 400,
//             //overflow: 'auto',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             maxWidth: 1300,
//             width: '300%',
//           }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow sx={{
//                   backgroundColor: '#7B1FA2',
//                   '& .MuiTableCell-root': {
//                     color: '#000000',
//                     fontWeight: 'bold',
//                   }
//                 }}>
//                   <TableCell> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
//                   <TableCell> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
//                   <TableCell> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
//                   <TableCell> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
//                   <TableCell><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((job, index) => (
//                   <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F3E5F5' }, '&:nth-of-type(even)': { backgroundColor: '#EDE7F6' } }}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'medium' }} onClick={() => handleJobTitleClick(job)}>
//                       {job.jobTitle}
//                     </TableCell>
//                     <TableCell>{job.location}</TableCell>
//                     <TableCell>{job.experienceLevel}</TableCell>
//                     <TableCell>{job.appliedCandidates?.length || 0}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {selectedJob && (
//             <>
//               <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//                 Applied Candidates for {selectedJob.jobTitle}
//               </Typography>
//               <TableContainer component={Paper} sx={{
//                 border: 2,
//                 borderColor: '#9C27B0',
//                 borderRadius: 2,
//                 maxHeight: 400,
//                 //overflow: 'auto',
//                 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                 maxWidth: 1300,
//                 width: '300%',
//               }}>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow sx={{
//                       backgroundColor: '#7B1FA2',
//                       '& .MuiTableCell-root': {
//                         color: '#000000',
//                         fontWeight: 'bold',
//                       }
//                     }}>
//                       <TableCell> <Filter1Icon sx={{ ml: 1 }}/>ID</TableCell>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Skills Score</TableCell>
//                       <TableCell>Matched Score</TableCell>
//                       <TableCell>See Resume</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                   {selectedJob.appliedCandidates?.map((candidate, index) => (
//   <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F3E5F5' }, '&:nth-of-type(even)': { backgroundColor: '#EDE7F6' } }}>
//     <TableCell>{index + 1}</TableCell>
//     <TableCell>
//       {candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : ''}
//     </TableCell>
//     <TableCell>{candidate.user ? candidate.user.email : ''}</TableCell>
//     <TableCell>{candidate.quizScore}</TableCell>
//     <TableCell>7</TableCell>
//     <TableCell>view</TableCell>
//   </TableRow>
// ))}

//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Table2;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Loader from "../../Components/Loader";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Box
// } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import Filter1Icon from '@mui/icons-material/Filter1';

// const Table2 = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await axios.get(API_ENDPOINTS.postedJobs).then((resp) => {
//         if (resp && resp.status === 200) {
//           setJobs(resp.data.data);
//           setLoading(false);
//         }
//       });
//     };
//     fetchData();
//   }, []);

//   // Function to rank candidates based on their overall score
//   const rankCandidates = (candidates) => {
//     return candidates.slice().sort((a, b) => {
//       // Calculate overall score for each candidate
//       const overallScoreA = calculateOverallScore(a);
//       const overallScoreB = calculateOverallScore(b);

//       // Compare overall scores for ranking
//       if (overallScoreA > overallScoreB) return -1; // A should come before B
//       if (overallScoreA < overallScoreB) return 1; // B should come before A
//       return 0; // Scores are equal, maintain the order
//     });
//   };

//   // Function to calculate the overall score for a candidate
//   const calculateOverallScore = (candidate) => {
//     // Convert quizScore and matchScore to numbers
//     const quizScore = parseFloat(candidate.quizScore);
//     const matchScore = parseFloat(candidate.matchScore);

//     // Calculate the overall score based on preferences (60% for quiz score, 40% for match score)
//     const overallScore = (0.6 * quizScore) + (0.4 * matchScore);
    
//     return overallScore;
//   };

//   const handleJobTitleClick = (job) => {
//     setSelectedJob(job);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Posted Jobs
//           </Typography>
//           <TableContainer component={Paper} sx={{
//             backgroundColor: 'white',
//             borderRadius: 2,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             width: '110%',
//             overflowY: 'auto',
//             maxHeight: 400,
//           }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{
//                   backgroundColor: '#7B1FA2',
//                   '& .MuiTableCell-root': {
//                     color: 'white',
//                     fontWeight: 'bold',
//                   }
//                 }}>
//                   <TableCell> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
//                   <TableCell> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
//                   <TableCell> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
//                   <TableCell> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
//                   <TableCell><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((job, index) => (
//                   <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'large' }} onClick={() => handleJobTitleClick(job)}>
//                       {job.jobTitle}
//                     </TableCell>
//                     <TableCell>{job.location}</TableCell>
//                     <TableCell>{job.experienceLevel}</TableCell>
//                     <TableCell>{job.appliedCandidates?.length || 0}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {selectedJob && (
//             <>
//               <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//                 Applied Candidates for {selectedJob.jobTitle}
//               </Typography>
//               <TableContainer component={Paper} sx={{
//                 backgroundColor: 'white',
//                 borderRadius: 2,
//                 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                 width: '110%',
//                 overflowY: 'auto',
//                 maxHeight: 400,
//               }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{
//                       backgroundColor: '#7B1FA2',
//                       '& .MuiTableCell-root': {
//                         color: 'white',
//                         fontWeight: 'bold',
//                       }
//                     }}>
//                       <TableCell style={{textAlign: "center" }}> <Filter1Icon sx={{ ml: 1 }}/>ID</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Name</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Email</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Evaluation Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}> Skill Match Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Overall Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}>See Resume</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rankCandidates(selectedJob.appliedCandidates)?.map((candidate, index) => (
//                       <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
//                         <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
//                         <TableCell style={{textAlign: "center" }}>
//                           {candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : ''}
//                         </TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.user ? candidate.user.email : ''}</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.quizScore.toFixed(2)}%</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.matchScore.toFixed(2)}%</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{calculateOverallScore(candidate).toFixed(2)}%</TableCell>
//                         <TableCell style={{textAlign: "center" }}>view</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Table2;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Loader from "../../Components/Loader";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Box
// } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import Filter1Icon from '@mui/icons-material/Filter1';



// const Table2 = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const resumeURL = 'http://localhost:5000/uploads/resume.pdf';


//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await axios.get(API_ENDPOINTS.postedJobs).then((resp) => {
//         if (resp && resp.status === 200) {
//           setJobs(resp.data.data);
//           setLoading(false);
//         }
//       });
//     };
//     fetchData();
//   }, []);

//   // Function to rank candidates based on their overall score
//   const rankCandidates = (candidates) => {
//     return candidates.slice().sort((a, b) => {
//       // Calculate overall score for each candidate
//       const overallScoreA = calculateOverallScore(a);
//       const overallScoreB = calculateOverallScore(b);

//       // Compare overall scores for ranking
//       if (overallScoreA > overallScoreB) return -1; // A should come before B
//       if (overallScoreA < overallScoreB) return 1; // B should come before A
//       return 0; // Scores are equal, maintain the order
//     });
//   };

//   // Function to calculate the overall score for a candidate
//   const calculateOverallScore = (candidate) => {
//     // Convert quizScore and matchScore to numbers
//     const quizScore = parseFloat(candidate.quizScore);
//     const matchScore = parseFloat(candidate.matchScore);

//     // Calculate the overall score based on preferences (60% for quiz score, 40% for match score)
//     const overallScore = (0.6 * quizScore) + (0.4 * matchScore);
    
//     return overallScore;
//   };

//   const handleJobTitleClick = (job) => {
//     setSelectedJob(job);
//   };

//   const handleViewResume = (resumeFilename) => {
//     if (!resumeFilename) {
//       console.error("Resume filename is not provided.");
//       return;
//     }
    
//     const resumeURL = `localhost:5000/uploads/${resumeFilename}`;
//     window.open(resumeURL, "_blank");
//   };
  
  
 
  

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Posted Jobs
//           </Typography>
//           <TableContainer component={Paper} sx={{
//             backgroundColor: 'white',
//             borderRadius: 2,
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             width: '110%',
//             overflowY: 'auto',
//             maxHeight: 400,
//           }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{
//                   backgroundColor: '#7B1FA2',
//                   '& .MuiTableCell-root': {
//                     color: 'white',
//                     fontWeight: 'bold',
//                   }
//                 }}>
//                   <TableCell> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
//                   <TableCell> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
//                   <TableCell> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
//                   <TableCell> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
//                   <TableCell><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((job, index) => (
//                   <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'large' }} onClick={() => handleJobTitleClick(job)}>
//                       {job.jobTitle}
//                     </TableCell>
//                     <TableCell>{job.location}</TableCell>
//                     <TableCell>{job.experienceLevel}</TableCell>
//                     <TableCell>{job.appliedCandidates?.length || 0}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {selectedJob && (
//             <>
//               <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//                 Applied Candidates for {selectedJob.jobTitle}
//               </Typography>
//               <TableContainer component={Paper} sx={{
//                 backgroundColor: 'white',
//                 borderRadius: 2,
//                 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                 width: '110%',
//                 overflowY: 'auto',
//                 maxHeight: 400,
//               }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{
//                       backgroundColor: '#7B1FA2',
//                       '& .MuiTableCell-root': {
//                         color: 'white',
//                         fontWeight: 'bold',
//                       }
//                     }}>
//                       <TableCell style={{textAlign: "center" }}> <Filter1Icon sx={{ ml: 1 }}/>ID</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Name</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Email</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Evaluation Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}> Skill Match Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}>Overall Score</TableCell>
//                       <TableCell style={{textAlign: "center" }}>resume</TableCell>
//                       <TableCell style={{textAlign: "center" }}>See Resume</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {rankCandidates(selectedJob.appliedCandidates)?.map((candidate, index) => (
//                       <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
//                         <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
//                         <TableCell style={{textAlign: "center" }}>
//                           {candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : ''}
//                         </TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.user ? candidate.user.email : ''}</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.quizScore.toFixed(2)}%</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.matchScore.toFixed(2)}%</TableCell>

//                         <TableCell style={{textAlign: "center" }}>{calculateOverallScore(candidate).toFixed(2)}%</TableCell>
//                         <TableCell style={{textAlign: "center" }}>{candidate.user.resume}</TableCell>
//                         <TableCell style={{textAlign: "center" }}>
//                         <button onClick={() => {
//                           console.log("User details:", candidate.user);
//                           handleViewResume(candidate.user.resume);
//                         }}>View</button>
//                       </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Table2;


import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Loader from "../../Components/Loader";
import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Filter1Icon from '@mui/icons-material/Filter1';

const Table2 = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(API_ENDPOINTS.postedJobs).then((resp) => {
        if (resp && resp.status === 200) {
          setJobs(resp.data.data);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  const handleJobTitleClick = (job) => {
    setSelectedJob(job);
  };

  const downloadResume = (resumeFilename) => {
    axios({
      method: "get",
      url: `${API_ENDPOINTS.openResume}/${resumeFilename}`,
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = resumeFilename;
      link.click();
    });
  };

  const handleDownloadClick = (resumeFilename) => {
    if (resumeFilename.trim() !== "" && resumeFilename !== null) {
      downloadResume(resumeFilename);
    } else {
      console.log("No resume available for download");
    }
  };

  // Function to rank candidates based on their overall score
  const rankCandidates = (candidates) => {
    return candidates.slice().sort((a, b) => {
      // Calculate overall score for each candidate
      const overallScoreA = calculateOverallScore(a);
      const overallScoreB = calculateOverallScore(b);

      // Compare overall scores for ranking
      if (overallScoreA > overallScoreB) return -1; // A should come before B
      if (overallScoreA < overallScoreB) return 1; // B should come before A
      return 0; // Scores are equal, maintain the order
    });
  };

  // Function to calculate the overall score for a candidate
  const calculateOverallScore = (candidate) => {
    // Convert quizScore and matchScore to numbers
    const quizScore = parseFloat(candidate.quizScore);
    const matchScore = parseFloat(candidate.matchScore);

    // Calculate the overall score based on preferences (60% for quiz score, 40% for match score)
    const overallScore = (0.6 * quizScore) + (0.4 * matchScore);
    
    return overallScore;
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Posted Jobs
          </Typography>
          <TableContainer component={Paper} sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            width: '110%',
            overflowY: 'auto',
            maxHeight: 400,
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#7B1FA2',
                  '& .MuiTableCell-root': {
                    color: 'white',
                    fontWeight: 'bold',
                  }
                }}>
                  <TableCell style={{textAlign: "center" }}> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
                  <TableCell style={{textAlign: "center" }}> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
                  <TableCell style={{textAlign: "center" }}> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
                  <TableCell style={{textAlign: "center" }}> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
                  <TableCell style={{textAlign: "center" }}><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
                    <TableCell style={{textAlign: "center" }} sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'large' }} onClick={() => handleJobTitleClick(job)}>
                      {job.jobTitle}
                    </TableCell>
                    <TableCell style={{textAlign: "center" }} >{job.location}</TableCell>
                    <TableCell style={{textAlign: "center" }}>{job.experienceLevel}</TableCell>
                    <TableCell style={{textAlign: "center" }}>{job.appliedCandidates?.length || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedJob && (
            <>
              <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Applied Candidates for {selectedJob.jobTitle}
              </Typography>
              <TableContainer component={Paper} sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                width: '110%',
                overflowY: 'auto',
                maxHeight: 400,
              }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{
                      backgroundColor: '#7B1FA2',
                      '& .MuiTableCell-root': {
                        color: 'white',
                        fontWeight: 'bold',
                      }
                    }}>
                      <TableCell style={{textAlign: "center" }}> <Filter1Icon sx={{ ml: 1 }}/>ID</TableCell>
                      <TableCell style={{textAlign: "center" }}>Name</TableCell>
                      <TableCell style={{textAlign: "center" }}>Email</TableCell>
                      <TableCell style={{textAlign: "center" }}>Evaluation Score</TableCell>
                      <TableCell style={{textAlign: "center" }}> Skill Match Score</TableCell>
                      <TableCell style={{textAlign: "center" }}>Overall Score</TableCell>
                      <TableCell style={{textAlign: "center" }}>Download Resume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rankCandidates(selectedJob.appliedCandidates || []).map((candidate, index) => (
                      <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
                        <TableCell style={{textAlign: "center" }}>
                          {candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : ''}
                        </TableCell>
                        <TableCell style={{textAlign: "center" }}>{candidate.user ? candidate.user.email : ''}</TableCell>
                        <TableCell style={{textAlign: "center" }}>{candidate.quizScore.toFixed(2)}%</TableCell>
                        <TableCell style={{textAlign: "center" }}>{candidate.matchScore.toFixed(2)}%</TableCell>
                        <TableCell style={{textAlign: "center" }}>{calculateOverallScore(candidate).toFixed(2)}%</TableCell>
                        <TableCell style={{textAlign: "center" }}>
                          <Button onClick={() => handleDownloadClick(candidate.user.resume)}>Download</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Table2;
