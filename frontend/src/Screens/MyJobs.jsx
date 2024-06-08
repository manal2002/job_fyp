// import React, { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar/Navbar";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import OutlinedCard from "../Components/Card/Card";
// import axios from "axios";
// import API_ENDPOINTS from "../Api";
// import Loader from "../Components/Loader";
// import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

// function MyJobs() {
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [myJobs, setMyJobs] = useState([]);
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData"))
//   );

//   useEffect(() => {
//     if (userData) {
//       setLoading(true);
//       const fetchData = async () => {
//         let uid = userData._id;

//         await axios.get(API_ENDPOINTS.myJobs + `/${uid}`).then((result) => {
//           if (result && result.status == 200) {
//             setMyJobs(result.data.data);
//             setLoading(false);
//           }
//         });
//       };
//       fetchData();
//     }
//   }, []);

//   return (
//     <div className="myjobs">
//       <Navbar />
//       <div className="container">
//       <JobSeekerSidebar />
//         <div className="card-lg p-3 mt-5">
//           <br></br>
//           <br></br>
//           <br></br>
//           <br></br>
//           <br></br>


//           <h4>Applied Jobs</h4>
//           <div className="mt-4">
//             <Tabs>
//               <TabList>
//                 <Tab>Applied ({myJobs?.length})</Tab>
//                 <Tab>Saved (2)</Tab>
//               </TabList>

//               <TabPanel>
//                 <div>
//                   {loading ? (
//                     <Loader />
//                   ) : myJobs.length > 0 ? (
//                     <>
//                       <OutlinedCard data={myJobs} />
//                     </>
//                   ) : (
//                     <p>No jobs applied yet</p>
//                   )}
//                 </div>
//               </TabPanel>
//               <TabPanel>
//                 {savedJobs.length > 0 ? (
//                   <>Saved jobs</>
//                 ) : (
//                   <div className="text-center">
//                     <h4>No Saved Jobs</h4>
//                     <img
//                       className="w-25"
//                       src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png"
//                     />
//                   </div>
//                 )}
//               </TabPanel>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
// import API_ENDPOINTS from "../Api";
// import Loader from "../Components/Loader";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import Filter1Icon from "@mui/icons-material/Filter1";
// import Navbar from "../Components/Navbar/Navbar";
// import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import EmailIcon from "@mui/icons-material/Email";

// const MyJobs = () => {
//   const [myJobs, setMyJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData"))
//   );
//   const navigate = useNavigate(); // Access history object for navigation

//   useEffect(() => {
//     if (userData) {
//       setLoading(true);
//       const fetchData = async () => {
//         let uid = userData._id;

//         await axios.get(API_ENDPOINTS.myJobs + `/${uid}`).then((result) => {
//           if (result && result.status === 200) {
//             setMyJobs(result.data.data);
//             setLoading(false);
//           }
//         });
//       };
//       fetchData();
//     }
//   }, []);

//   // Function to handle click on job title
//   const handleJobTitleClick = (jobId) => {
//     // Navigate to job detail page with jobId as parameter
//     navigate(`/job/${jobId}`);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="myjobs" style={{ flexGrow: 1 }}>
//           <Navbar />
//           <div
//             className="container"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <JobSeekerSidebar />
//             <div style={{ width: "90%", maxWidth: "1200px" }}>
//               <Typography variant="h3" style={{ marginTop: "30px" }}>
//                 Applied Jobs
//               </Typography>
//               <Paper
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: 2,
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                   overflowY: "auto",
//                   position: "relative", // Adjusted position to relative
//                   top: "20px", // Adjusted top position
//                   height: "70vh",
//                   width: "120%", // Adjusted width to 100%
//                 }}
//               >
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow
//                         style={{
//                           backgroundColor: "#7B1FA2",
//                           color: "#000000",
//                           fontWeight: "bold",
//                           fontSize: "1.2rem",
//                         }}
//                       >
//                         <TableCell>
//                           <Filter1Icon style={{ marginLeft: "1rem" }} /> ID
//                         </TableCell>
//                         <TableCell>
//                           <WorkOutlineIcon style={{ marginLeft: "1rem" }} />{" "}
//                           Job Title
//                         </TableCell>
//                         <TableCell>
//                           <LocationOnIcon style={{ marginLeft: "1rem" }} />{" "}
//                           Location
//                         </TableCell>
//                         <TableCell>
//                           <BusinessCenterIcon style={{ marginLeft: "1rem" }} /> Company Name
//                         </TableCell>
//                         <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Job Type
//                         </TableCell>
//                         <TableCell>
//                           <EmailIcon style={{ marginLeft: "1rem" }} /> Email
//                         </TableCell>
//                         <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Skill Match Score
//                         </TableCell>
//                         <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Quiz Score
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {myJobs.map((job, index) => (
//                         <TableRow
//                           key={index}
//                           style={{
//                             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                             fontWeight: "bold",
//                             fontSize: "1.2rem",
//                           }}
//                         >
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell
//                             onClick={() => handleJobTitleClick(job._id)}
//                             style={{ cursor: "pointer" }}
//                           >
//                             {job.jobTitle}
//                           </TableCell>
//                           <TableCell>{job.location}</TableCell>
//                           <TableCell>{job.companyName}</TableCell>
//                           <TableCell>{job.jobType}</TableCell>
//                           <TableCell>{job.contactInformation}</TableCell>
//                           <TableCell>{job.matchScore}</TableCell>
//                           <TableCell>{job.quizScore}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Paper>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default MyJobs;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API_ENDPOINTS from "../Api";
// import Loader from "../Components/Loader";
// import {
//   Typography,
//   Paper,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import Filter1Icon from "@mui/icons-material/Filter1";
// import Navbar from "../Components/Navbar/Navbar";
// import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import EmailIcon from "@mui/icons-material/Email";

// const MyJobs = () => {
//   const [myJobs, setMyJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(
//     JSON.parse(localStorage.getItem("userData"))
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData) {
//       setLoading(true);
//       const fetchData = async () => {
//         let uid = userData._id;

//         await axios.get(`${API_ENDPOINTS.myJobs}/${uid}`).then((result) => {
//           if (result && result.status === 200) {
//             setMyJobs(result.data.data);
//             setLoading(false);
//           }
//         });
//       };
//       fetchData();
//     }
//   }, []);

//   // Function to handle click on job title
//   const handleJobTitleClick = (jobId) => {
//     navigate(`/job/${jobId}`);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="myjobs" style={{ flexGrow: 1 }}>
//           <Navbar />
//           <div
//             className="container"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <JobSeekerSidebar />
//             <div style={{ width: "90%", maxWidth: "1200px" }}>
//               <Typography variant="h3" style={{ marginTop: "30px" }}>
//                 Applied Jobs
//               </Typography>
//               <Paper
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: 2,
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                   overflowY: "auto",
//                   position: "relative",
//                   top: "20px",
//                   height: "70vh",
//                   width: "120%",
//                 }}
//               >
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow
//                         sx={{
//                           backgroundColor: '#7B1FA2',
//                           '& .MuiTableCell-root': {
//                             color: 'white',
//                             fontWeight: 'bold',
//                           }
//                         }}
//                       >
//                         <TableCell>
//                           <Filter1Icon style={{ marginLeft: "1rem" }} /> ID
//                         </TableCell>
//                         <TableCell>
//                           <WorkOutlineIcon style={{ marginLeft: "1rem" }} />{" "}
//                           Job Title
//                         </TableCell>
//                         <TableCell>
//                           <LocationOnIcon style={{ marginLeft: "1rem" }} />{" "}
//                           Location
//                         </TableCell>
//                         <TableCell>
//                           <BusinessCenterIcon style={{ marginLeft: "1rem" }} /> Company Name
//                         </TableCell>
//                         <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Job Type
//                         </TableCell>
//                         <TableCell>
//                           <EmailIcon style={{ marginLeft: "1rem" }} /> Email
//                         </TableCell>
//                         {/* <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Skill Match Score
//                         </TableCell> */}
//                         <TableCell>
//                           <AssignmentIcon style={{ marginLeft: "1rem" }} /> Quiz Score
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {myJobs.map((job, index) => (
//                         <TableRow
//                           key={index}
//                           style={{
//                             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                             fontWeight: "bold",
//                             fontSize: "1.4rem",
//                             color: "white",
//                             textAlign: "center",
//                           }}
//                         >
//                           <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
//                           <TableCell
//                             onClick={() => handleJobTitleClick(job.job._id)} // Access jobId from job.job._id
//                             style={{ cursor: "pointer", textAlign: "center" }}
//                           >
//                             {job.job.jobTitle} {/* Access job title from job.job.jobTitle */}
//                           </TableCell>
//                           <TableCell style={{textAlign: "center" }}>{job.job.location}</TableCell> {/* Access location from job.job.location */}
//                           <TableCell style={{textAlign: "center" }}>{job.job.companyName}</TableCell> {/* Access companyName from job.job.companyName */}
//                           <TableCell style={{textAlign: "center" }}>{job.job.jobType}</TableCell> {/* Access jobType from job.job.jobType */}
//                           <TableCell style={{textAlign: "center" }}>{job.job.contactInformation}</TableCell> {/* Access contactInformation from job.job.contactInformation */}
//                           {/* <TableCell style={{textAlign: "center" }}>{job.matchScore}</TableCell> */}
//                           <TableCell style={{textAlign: "center" }}>{job.quizScore}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Paper>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyJobs;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../Api";
import Loader from "../Components/Loader";
import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Filter1Icon from "@mui/icons-material/Filter1";
import Navbar from "../Components/Navbar/Navbar";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setLoading(true);
      const fetchData = async () => {
        const uid = userData._id;

        try {
          console.log("Fetching jobs for user ID:", uid); // Debug: Log user ID
          const result = await axios.get(`${API_ENDPOINTS.myJobs}/${uid}`);
          console.log("API Result:", result); // Debug: Log the API result
          if (result && result.status === 200) {
            console.log("Fetched Jobs Data:", result.data.data); // Debug: Log fetched jobs data
            setMyJobs(result.data.data);
          }
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  const handleJobTitleClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {loading ? (
        <Loader />
      ) : (
        <div className="myjobs" style={{ flexGrow: 1 }}>
          <Navbar />
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <JobSeekerSidebar />
            <div style={{ width: "90%", maxWidth: "1200px" }}>
              <Typography variant="h3" style={{ marginTop: "30px" }}>
                Applied Jobs
              </Typography>
              <Paper
                style={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  overflowY: "auto",
                  position: "relative",
                  top: "20px",
                  height: "70vh",
                  width: "120%",
                }}
              >
                {myJobs.length === 0 ? (
                  <Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
                    No jobs found.
                  </Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: '#7B1FA2',
                            '& .MuiTableCell-root': {
                              color: 'white',
                              fontWeight: 'bold',
                            }
                          }}
                        >
                          <TableCell>
                            <Filter1Icon style={{ marginLeft: "1rem" }} /> ID
                          </TableCell>
                          <TableCell>
                            <WorkOutlineIcon style={{ marginLeft: "1rem" }} /> Job Title
                          </TableCell>
                          <TableCell>
                            <LocationOnIcon style={{ marginLeft: "1rem" }} /> Location
                          </TableCell>
                          <TableCell>
                            <BusinessCenterIcon style={{ marginLeft: "1rem" }} /> Company Name
                          </TableCell>
                          <TableCell>
                            <AssignmentIcon style={{ marginLeft: "1rem" }} /> Job Type
                          </TableCell>
                          <TableCell>
                            <EmailIcon style={{ marginLeft: "1rem" }} /> Salary
                          </TableCell>
                          <TableCell>
                            <AssignmentIcon style={{ marginLeft: "1rem" }} /> Quiz Score
                          </TableCell>
                          <TableCell>
                            <AssignmentIcon style={{ marginLeft: "1rem" }} /> Skill Match Score
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myJobs.map((job, index) => (
                          <TableRow
                            key={index}
                            style={{
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                              fontWeight: "bold",
                              fontSize: "1.4rem",
                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                            <TableCell
                              onClick={() => handleJobTitleClick(job._id)}
                              style={{ cursor: "pointer", textAlign: "center" }}
                            >
                              {job.jobTitle}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.location}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.companyName}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.jobType}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.salary} PKR</TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.quizScore.toFixed(2)}%</TableCell>
                            <TableCell style={{ textAlign: "center" }}>{job.skillMatchScore.toFixed(2)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
