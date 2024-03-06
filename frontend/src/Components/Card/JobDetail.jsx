import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import { useEffect } from "react";
import moment from "moment";
import Loader from "../Loader";
import ClickableLinkChips from "../Chips/ClickableLinkChips";
import Swal from "sweetalert2";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const calculateTimeAgo = (createdAt) => {
    const now = moment();
    const createdTime = moment(createdAt);
    const diffInMinutes = now.diff(createdTime, "minutes");
    const diffInHours = now.diff(createdTime, "hours");
    const diffInDays = now.diff(createdTime, "days");

    if (diffInMinutes < 60) {
      setTimeAgo(
        `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
      );
    } else if (diffInHours < 24) {
      setTimeAgo(`${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`);
    } else {
      setTimeAgo(`${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        let res = await axios.get(API_ENDPOINTS.getJobDetails + `/${id}`);

        if (res && res.data) {
          setLoading(false);
          let job = res?.data?.data;
          let time = calculateTimeAgo(job?.createdAt);
          let updatedJob = { ...job, time };
          setJob(job);
        }
      };
      fetchData();
    } catch (error) {
      setError(true);
    }
  }, []);

  const applyJob = () => {
    Swal.fire({
      title: "Do you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/candidate/apply-job/${id}`;
      } else {
      }
    });
  };

  const login = () => {
    window.location.href = `/login`;
  };


// return (
//   <Box sx={{ padding: '20px' }}>
//     <DetailCard>
//       <CardContent>
//       <IconTextRow>
//           <AccessTimeIcon sx={{ color: '#7c4dff' }} />
//           <IconTextStyle>Posted {moment(job?.createdAt).fromNow()}</IconTextStyle>
//         </IconTextRow>
        
//         <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3, color: '#000' }}>
//           {job?.jobTitle} - {job?.companyName}
//         </Typography>

       

//         <Typography variant="body1" sx={{ color: '#000', mt: 2, lineHeight: 1.6 }}>
//           {job?.jobDescription}
//         </Typography>
        
//         {/* Repeating structure for each detail with corresponding icon */}
        

//         {/* Conditional rendering if data is available */}

//         {job?.jobType && (
//           <IconTextRow>
//             <JobTypeIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Job Type: {job?.jobType}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.location && (
//           <IconTextRow>
//             <LocationOnIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Location: {job?.location}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {/* Repeating for each detail as needed */}
//         {job?.salary && (
//           <IconTextRow>
//             <AttachMoneyIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Salary: {job?.salary} PKR</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.educationLevel && (
//           <IconTextRow>
//             <SchoolIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Education: {job?.educationLevel}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.experienceLevel && (
//           <IconTextRow>
//             <WorkIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Experience: {job?.experienceLevel} years</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.companyDescription && (
//           <IconTextRow>
//             <InfoIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>{job?.companyDescription}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.companyWebsite && (
//           <IconTextRow>
//             <WebIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Website: {job?.companyWebsite}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.applicationDeadline && (
//           <IconTextRow>
//             <CalendarTodayIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Deadline: {moment(job?.applicationDeadline).format('LL')}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.contactInformation && (
//           <IconTextRow>
//             <ContactMailIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Contact: {job?.contactInformation}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {job?.applicationInstructions && (
//           <IconTextRow>
//             <DescriptionIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>How to Apply: {job?.applicationInstructions}</IconTextStyle>
//           </IconTextRow>
//         )}

//         {/* Assuming ClickableLinkChips handles rendering skills as chips */}
//         {job?.skills_and_requirement && (
//           <IconTextRow>
//             <SkillIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//               Skills Required:
//               <Box sx={{ ml: 2, display: 'flex', flexWrap: 'wrap' }}>
//                 <ClickableLinkChips skills={job?.skills_and_requirement?.split(",")} />
//               </Box>
//             </IconTextStyle>
//           </IconTextRow>
//         )}

//         {/* Apply/Login Button */}
//         {localStorage.getItem('userData') ? (
//           <CustomButton onClick={() => Swal.fire('Apply', 'Application process not implemented.', 'info')}>
//             Apply Now
//           </CustomButton>
//         ) : (
//           <CustomButton onClick={() => (window.location.href = '/login')}>Login to Apply</CustomButton>
//         )}
//       </CardContent>
//     </DetailCard>
//   </Box>
// );
// }

  return (
    <div
      className="mt-5 .job-details-page"
      style={{ backgroundColor: "whitesmoke", height: "100vh" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card sx={{ minWidth: 275 }} className="">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
                New
              </Typography>
              <p style={{ color: "red" }}>Posted {timeAgo}</p>
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                {job?.jobTitle}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {job?.company}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "grey", fontSize: "18px" }}
              >
                {job?.jobDescription}
                <br />
              </Typography>
              <br />
              <div>
                <h5>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Salary
                  </span>{" "}
                  <br />
                  <p style={{ color: "grey", fontSize: "18px" }}>
                    {job?.salary}
                  </p>
                </h5>
                <h5>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Location :
                  </span>{" "}
                  <br />
                  <p style={{ color: "grey", fontSize: "18px" }}>
                    {job?.location}
                  </p>
                </h5>
                <h5>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Education :
                  </span>{" "}
                  {job?.education}
                </h5>
                <h5>
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Expericence Level :
                  </span>{" "}
                  {job?.experienceLevel}
                </h5>
                <h4>
                  {job?.skills_and_requirement && (
                    <>
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        Skills Required{" "}
                      </span>
                      <ClickableLinkChips
                        className="mt-5"
                        skills={job?.skills_and_requirement?.split(",")}
                      />
                    </>
                  )}

                  {/* <ClickableLinkChips skills={job?.ski} /> */}
                </h4>
                <div className="mt-4">
                  <Stack direction="row" spacing={1}>
                    {job?.skillsRequired &&
                      job?.skillsRequired.length > 0 &&
                      job?.skillsRequired.map((skill) => (
                        <>
                          <Chip label={skill} />
                        </>
                      ))}
                  </Stack>
                </div>
              </div>

              <div className="mt-3">
                {userData ? (
                  <button className="loginBtn" onClick={() => applyJob()}>
                    Apply Now
                  </button>
                ) : (
                  <button className="loginBtn">Login to Apply</button>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import API_ENDPOINTS from '../../Api';
// import moment from 'moment';
// import Loader from '../Loader';
// import ClickableLinkChips from '../Chips/ClickableLinkChips';
// import Swal from 'sweetalert2';
// import { styled } from '@mui/material/styles';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SkillIcon from '@mui/icons-material/Extension'; // Assuming Extension icon as Skills icon
// import CompanyIcon from '@mui/icons-material/BusinessCenter'; // Assuming BusinessCenter icon as Company icon
// import websiteIcon from '@mui/icons-material/Website'; // Assuming Website icon as Company icon
// import emailIcon from '@mui/icons-material/Email'; // Assuming Email icon as Company icon
// import experienceIcon from '@mui/icons-material/WorkOutline'; // Assuming WorkOutline icon as Experience icon

// const DetailCard = styled(Card)({
//   maxWidth: 1000,
//   margin: '40px auto',
//   padding: '30px',
//   backgroundColor: '#fff',
//   boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
//   borderRadius: '15px',
// });

// const CustomButton = styled(Button)({
//   backgroundColor: '#7c4dff',
//   color: '#FFFFFF',
//   fontWeight: 'bold',
//   marginTop: 20,
//   padding: '10px 30px',
//   '&:hover': {
//     backgroundColor: '#5e35b1',
//   },
// });

// const IconTextRow = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   marginTop: 20,
//   marginBottom: 20,
// });

// const IconTextStyle = styled(Typography)({
//   marginLeft: 15,
//   color: '#000',
//   fontSize: '1rem',
// });

// export default function JobDetail() {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_ENDPOINTS.getJobDetails}/${id}`);
//         if (res.data) {
//           setJob(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (loading) return <Loader />;






//   return (
//     <Box sx={{ padding: '20px' }}>
//       <DetailCard>
//         <CardContent>
//           <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3, color: '#000' }}>
//             {job?.jobTitle}
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#000', mt: 2, lineHeight: 1.6 }}>
//             {job?.jobDescription}
//           </Typography>
//           <IconTextRow>
//             <AccessTimeIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Posted {moment(job?.createdAt).fromNow()}</IconTextStyle>
//           </IconTextRow>
//           <IconTextRow>
//             <LocationOnIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>{job?.location}</IconTextStyle>
//           </IconTextRow>
//           <IconTextRow>
//             <AttachMoneyIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Salary: {job?.salary}</IconTextStyle>
//           </IconTextRow>
//           <IconTextRow>
//             <SkillIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//               Skills Required:
//               <Box sx={{ ml: 2, display: 'flex', flexWrap: 'wrap' }}>
//                 <ClickableLinkChips skills={job?.skills_and_requirement?.split(",")} />
//               </Box>
//             </IconTextStyle>
//           </IconTextRow>
          
//           {localStorage.getItem('userData') ? (
//             <CustomButton onClick={() => Swal.fire('Apply', 'Application process not implemented.', 'info')}>
//               Apply Now
//             </CustomButton>
//           ) : (
//             <CustomButton onClick={() => (window.location.href = '/login')}>Login to Apply</CustomButton>
//           )}
//         </CardContent>
//       </DetailCard>
//     </Box>
//   );
// }





// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import API_ENDPOINTS from '../../Api';
// import moment from 'moment';
// import Loader from '../Loader';
// import ClickableLinkChips from '../Chips/ClickableLinkChips';
// import Swal from 'sweetalert2';
// import { styled } from '@mui/material/styles';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SkillIcon from '@mui/icons-material/Extension';
// import SchoolIcon from '@mui/icons-material/School';
// import WorkIcon from '@mui/icons-material/Work';
// import InfoIcon from '@mui/icons-material/Info';
// import WebIcon from '@mui/icons-material/Web';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import DescriptionIcon from '@mui/icons-material/Description';
// import CompanyIcon from '@mui/icons-material/BusinessCenter';
// import JobTypeIcon from '@mui/icons-material/WorkOutline';

// const DetailCard = styled(Card)({
//   maxWidth: 960,
//   margin: '40px auto',
//   padding: '30px',
//   backgroundColor: '#fff',
//   boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
//   borderRadius: '15px',
// });

// const CustomButton = styled(Button)({
//   backgroundColor: '#7c4dff',
//   color: '#FFFFFF',
//   fontWeight: 'bold',
//   marginTop: 20,
//   '&:hover': {
//     backgroundColor: '#5e35b1',
//   },
// });

// const IconTextRow = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   marginTop: 20,
//   marginBottom: 20,
// });

// const IconTextStyle = styled(Typography)({
//   marginLeft: 15,
//   color: '#000',
//   fontSize: '1rem',
// });


// export default function JobDetail() {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_ENDPOINTS.getJobDetails}/${id}`);
//         if (res.data) {
//           setJob(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const applyJob = () => {
//     Swal.fire({
//       title: "Do you want to proceed?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.href = `/candidate/apply-job/${id}`;
//       } else {
//       }
//     });
//   };

//   const login = () => {
//     window.location.href = `/login`;
//   };

//   if (loading) return <Loader />;

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <DetailCard>
//         <CardContent>
//         <IconTextRow>
//             <AccessTimeIcon sx={{ color: '#7c4dff' }} />
//             <IconTextStyle>Posted {moment(job?.createdAt).fromNow()}</IconTextStyle>
//           </IconTextRow>
          
//           <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3, color: '#000' }}>
//             {job?.jobTitle} - {job?.companyName}
//           </Typography>

         

//           <Typography variant="body1" sx={{ color: '#000', mt: 2, lineHeight: 1.6 }}>
//             {job?.jobDescription}
//           </Typography>
          
//           {/* Repeating structure for each detail with corresponding icon */}
          

//           {/* Conditional rendering if data is available */}

//           {job?.jobType && (
//             <IconTextRow>
//               <JobTypeIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Job Type: {job?.jobType}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.location && (
//             <IconTextRow>
//               <LocationOnIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Location: {job?.location}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {/* Repeating for each detail as needed */}
//           {job?.salary && (
//             <IconTextRow>
//               <AttachMoneyIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Salary: {job?.salary} PKR</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.educationLevel && (
//             <IconTextRow>
//               <SchoolIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Education: {job?.educationLevel}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.experienceLevel && (
//             <IconTextRow>
//               <WorkIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Experience: {job?.experienceLevel} years</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.companyDescription && (
//             <IconTextRow>
//               <InfoIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>{job?.companyDescription}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.companyWebsite && (
//             <IconTextRow>
//               <WebIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Website: {job?.companyWebsite}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.applicationDeadline && (
//             <IconTextRow>
//               <CalendarTodayIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Deadline: {moment(job?.applicationDeadline).format('LL')}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.contactInformation && (
//             <IconTextRow>
//               <ContactMailIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>Contact: {job?.contactInformation}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {job?.applicationInstructions && (
//             <IconTextRow>
//               <DescriptionIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle>How to Apply: {job?.applicationInstructions}</IconTextStyle>
//             </IconTextRow>
//           )}

//           {/* Assuming ClickableLinkChips handles rendering skills as chips */}
//           {job?.skills_and_requirement && (
//             <IconTextRow>
//               <SkillIcon sx={{ color: '#7c4dff' }} />
//               <IconTextStyle sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//                 Skills Required:
//                 <Box sx={{ ml: 2, display: 'flex', flexWrap: 'wrap' }}>
//                   <ClickableLinkChips skills={job?.skills_and_requirement?.split(",")} />
//                 </Box>
//               </IconTextStyle>
//             </IconTextRow>
//           )}

//           {/* Apply/Login Button */}
//           {localStorage.getItem('userData') ? (
//             <CustomButton onClick={() => Swal.fire('Apply', 'Application process not implemented.', 'info')}>
//               Apply Now
//             </CustomButton>
//           ) : (
//             <CustomButton onClick={() => (window.location.href = '/login')}>Login to Apply</CustomButton>
//           )}
//         </CardContent>
//       </DetailCard>
//     </Box>
//   );
// }
