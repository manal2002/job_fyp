// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API_ENDPOINTS from "../../Api";
// import Loader from "../../Components/Loader";

// const itemsPerPage = 2;

// const Table2 = () => {
//   const [currentPage, setCurrentPage] = useState(1);
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

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = jobs?.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(jobs.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               marginTop: "20px",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   Job Title
//                 </th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   Location
//                 </th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   Experience Level
//                 </th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   Applied Candidates Count
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {index + 1}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #ddd",
//                         padding: "8px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setSelectedJob(item)}
//                     >
//                       {item?.job?.jobTitle}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {item?.job?.location}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {item?.job?.experienceLevel}
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {item?.applied_users?.length}
//                     </td>
//                   </tr>
//                   {selectedJob && selectedJob.job._id === item.job._id && (
//                     <>
//                       <h6>Applied candiates</h6>
//                       <tr>
//                         <td colSpan="5">
//                           {/* Render the expanded table with applied candidates */}
//                           <table
//                             style={{
//                               width: "100%",
//                               borderCollapse: "collapse",
//                               marginTop: "10px",
//                             }}
//                           >
//                             <thead>
//                               <tr>
//                                 <th>ID</th>
//                                 <th>Username</th>
//                                 <th>Email</th>
//                                 <th>Actions</th>
//                                 {/* Add more columns as needed */}
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {selectedJob.applied_users.map((user) => (
//                                 <>
//                                   <tr key={user._id}>
//                                     <td>{user._id}</td>
//                                     <td>{user.username}</td>
//                                     <td>{user.email}</td>
//                                     <td>
//                                       <div class="dropdown">
//                                         <button
//                                           class="actionBtn dropdown-toggle"
//                                           type="button"
//                                           data-toggle="dropdown"
//                                           aria-expanded="false"
//                                         >
//                                           Dropdown button
//                                         </button>
//                                         <div class="dropdown-menu">
//                                           <a
//                                             class="dropdown-item"
//                                             href={`/profile/${user?._id}`}
//                                           >
//                                             View Profile
//                                           </a>
//                                           <a class="dropdown-item">Select</a>
//                                           <a class="dropdown-item">Reject</a>
//                                         </div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </>
//                               ))}
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "20px", float: "right" }}>
//             <button
//               className="prevBtn"
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 style={{ marginLeft: "5px" }}
//                 className="page-list-btn"
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               style={{ marginLeft: "5px" }}
//               className="nextBtn"
//             >
//               Next
//             </button>
//           </div>
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
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   Typography,
//   Paper,
// } from "@mui/material";
// import {
//   Person,
//   Email,
// } from "@mui/icons-material"; // Import Material-UI icons

// const Table2 = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [error, setError] = useState(null); // New state for error handling

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const resp = await axios.get(API_ENDPOINTS.postedJobs);
//         console.log("Response data:", resp.data); // Log the response data
//         if (resp && resp.status === 200) {
//           setJobs(resp.data.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data. Please try again."); // Set error state
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);



//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Typography variant="body1" color="error" sx={{ color: "black" }}>
//           {error}
//         </Typography>
//       ) : (
//         <>
//           <Typography variant="h4" sx={{ mb: 2, color: "black" }}>
//             Posted Jobs
//           </Typography>
//           <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Job Title</TableCell>
//                   <TableCell>Location</TableCell>
//                   <TableCell>Experience Level</TableCell>
//                   <TableCell>Applied Candidates Count</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell
//                       className="job-title"
//                       onClick={() => setSelectedJob(item)}
//                     >
//                       {item?.job?.jobTitle}
//                     </TableCell>
//                     <TableCell>{item?.job?.location}</TableCell>
//                     <TableCell>{item?.job?.experienceLevel}</TableCell>
//                     <TableCell>{item?.applied_users?.length}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {selectedJob && (
//             <>
//               <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//                 Applied Candidates for {selectedJob?.job?.jobTitle}
//               </Typography>
//               <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Username</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {selectedJob.applied_users?.map((user) => (
//                       <TableRow key={user._id}>
//                         <TableCell>{user._id}</TableCell>
//                         <TableCell>{user.username}</TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>
//                           <IconButton>
//                             <Person />
//                           </IconButton>
//                           <IconButton>
//                             <Email />
//                           </IconButton>
//                           {/* Add more icons for actions as needed */}
//                         </TableCell>
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
  Box
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
            border: 2,
            borderColor: '#9C27B0',
            borderRadius: 2,
            maxHeight: 400,
            //overflow: 'auto',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: 1300,
            width: '300%',
          }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#7B1FA2',
                  '& .MuiTableCell-root': {
                    color: '#000000',
                    fontWeight: 'bold',
                  }
                }}>
                  <TableCell> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
                  <TableCell> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
                  <TableCell> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
                  <TableCell> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
                  <TableCell><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F3E5F5' }, '&:nth-of-type(even)': { backgroundColor: '#EDE7F6' } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'medium' }} onClick={() => handleJobTitleClick(job)}>
                      {job.jobTitle}
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.experienceLevel}</TableCell>
                    <TableCell>{job.appliedCandidates?.length || 0}</TableCell>
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
                border: 2,
                borderColor: '#9C27B0',
                borderRadius: 2,
                maxHeight: 400,
                //overflow: 'auto',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: 1300,
                width: '300%',
              }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{
                      backgroundColor: '#7B1FA2',
                      '& .MuiTableCell-root': {
                        color: '#000000',
                        fontWeight: 'bold',
                      }
                    }}>
                      <TableCell> <Filter1Icon sx={{ ml: 1 }}/>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Matched Score</TableCell>
                      <TableCell>Skills Score</TableCell>
                      <TableCell>See Application</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedJob.appliedCandidates?.map((candidate, index) => (
                      <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F3E5F5' }, '&:nth-of-type(even)': { backgroundColor: '#EDE7F6' } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{candidate.firstName } {candidate.lastName} </TableCell>
                        <TableCell>{candidate.email}</TableCell>
                        <TableCell>9</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>view</TableCell>
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
// } from "@mui/material";

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

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Typography variant="h4" sx={{ mb: 2 }}>
//             Posted Jobs
//           </Typography>
//           <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Job Title</TableCell>
//                   <TableCell>Location</TableCell>
//                   <TableCell>Experience Level</TableCell>
//                   <TableCell>Applied Candidates Count</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell
//                       className="job-title"
//                       onClick={() => setSelectedJob(item)}
//                     >
//                       {item?.jobTitle}
//                     </TableCell>
//                     <TableCell>{item?.location}</TableCell>
//                     <TableCell>{item?.experienceLevel}</TableCell>
//                     <TableCell>{item?.appliedCandidates?.length}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {selectedJob && (
//             <>
//               <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//                 Applied Candidates for {selectedJob?.jobTitle}
//               </Typography>
//               <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>First Name</TableCell>
//                       <TableCell>Last Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       {/* Add more columns as needed */}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {selectedJob.appliedCandidates?.map((candidate, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{candidate._id}</TableCell>
//                         <TableCell>{candidate.firstName}</TableCell>
//                         <TableCell>{candidate.lastName}</TableCell>
//                         <TableCell>{candidate.email}</TableCell>
//                         {/* Add more cells for additional candidate details */}
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
