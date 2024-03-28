
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
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            width: '135%',
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
                  <TableCell> <Filter1Icon sx={{ ml: 1 }}/> ID</TableCell>
                  <TableCell> <WorkOutlineIcon sx={{ ml: 1 }}/> Job Title</TableCell>
                  <TableCell> <LocationOnIcon sx={{ ml: 1 }}/> Location</TableCell>
                  <TableCell> <BusinessCenterIcon sx={{ ml: 1 }}/> Experience Level</TableCell>
                  <TableCell><PeopleAltIcon sx={{ ml: 1 }}/> Applied Candidates </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ cursor: 'pointer', color: '#6A1B9A', fontWeight: 'large' }} onClick={() => handleJobTitleClick(job)}>
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
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                width: '135%',
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
                      <TableCell style={{textAlign: "center" }}> Candidate Score</TableCell>
                      <TableCell style={{textAlign: "center" }}>See Resume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedJob.appliedCandidates?.map((candidate, index) => (
                      <TableRow key={index} sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <TableCell style={{textAlign: "center" }}>{index + 1}</TableCell>
                        <TableCell style={{textAlign: "center" }}>
                          {candidate.user ? `${candidate.user.firstName} ${candidate.user.lastName}` : ''}
                        </TableCell>
                        <TableCell style={{textAlign: "center" }}>{candidate.user ? candidate.user.email : ''}</TableCell>
                        <TableCell style={{textAlign: "center" }}>{candidate.quizScore}%</TableCell>
                        <TableCell style={{textAlign: "center" }}>7</TableCell>
                        <TableCell style={{textAlign: "center" }}>view</TableCell>
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

