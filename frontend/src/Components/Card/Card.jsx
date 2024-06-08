// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ClickableLinkChips from "../Chips/ClickableLinkChips";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

// export default function OutlinedCard({ data }) {
//   const gotoJobDetailsPage = (jobId) => {
//     window.location.href = /job/${jobId};
//   };

//   return (
//     <Box>
//       {data &&
//         data.length > 0 &&
//         data.map((job) => (
//           <Card variant="outlined" className="mt-2 cardBox w-100 ">
//             <React.Fragment className="w-100 row">
//               <CardContent className="w-100" style={{ width: "100%" }}>
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <Typography
//                     sx={{ fontSize: 14 }}
//                     color="green"
//                     gutterBottom
//                     style={{ color: "green" }}
//                   >
//                     New
//                   </Typography>
//                   <div>
//                     <BookmarkBorderIcon />
//                   </div>
//                 </div>
//                 <Typography
//                   variant="h5"
//                   component="div"
//                   className="jobTitle"
//                   style={{ fontWeight: "bold", cursor: "pointer" }}
//                   onClick={() => gotoJobDetailsPage(job?._id)}
//                 >
//                   {job?.jobTitle}
//                 </Typography>
//                 {job?.jobType && (
//                   <div className={job-type ${job?.jobType}}>
//                     {job?.jobType}
//                   </div>
//                 )}

//                 <Typography
//                   sx={{ mb: 1.5 }}
//                   color="text.secondary"
//                   className="jobLocation"
//                   style={{ color: "darkcyan" }}
//                 >
//                   {job?.location}
//                 </Typography>
//                 <Typography variant="body2">
//                   {job?.description}
//                   <br />
//                   {'"a benevolent smile"'}
//                 </Typography>
//               </CardContent>
//               <div className="p-3">
//                 {job?.skills_and_requirement && (
//                   <ClickableLinkChips
//                     skills={job?.skills_and_requirement?.split(",")}
//                   />
//                 )}
//               </div>
//               <CardActions>
//                 <Button
//                   size="small"
//                   onClick={() => gotoJobDetailsPage(job?._id)}
//                   className="view-more"
//                 >
//                   View More
//                 </Button>
//               </CardActions>
//             </React.Fragment>
//           </Card>
//         ))}
//     </Box>
//   );
// }

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ClickableLinkChips from "../Chips/ClickableLinkChips";
// import { styled } from "@mui/material/styles";

// const CustomCard = styled(Card)({
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   backdropFilter: "blur(10px)",
//   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//   "&:hover": {
//     boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
//   },
//   margin: "16px 0",
//   borderRadius: "15px",
//   overflow: "hidden",
//   transition: "all 0.3s ease",
// });

// const HeaderBox = styled(Box)({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "8px 16px",
//   background: "linear-gradient(135deg, #7B1FA2, #BA68C8)",
//   color: "#FFFFFF",
// });

// const JobType = styled("div")(({ theme }) => ({
//   display: "inline-block",
//   padding: "3px 8px",
//   borderRadius: "8px",
//   fontWeight: "bold",
//   fontSize: "12px",
//   color: "#FFFFFF",
//   backgroundColor: "#9C27B0",
//   marginTop: "8px",
//   marginRight: "4px",
// }));

// const ViewMoreButton = styled(Button)({
//   borderColor: "#9C27B0",
//   color: "#9C27B0",
//   '&:hover': {
//     backgroundColor: "#9C27B0",
//     color: "#FFFFFF",
//   },
// });

// export default function OutlinedCard({ data }) {
//   const gotoJobDetailsPage = (jobId) => {
//     window.location.href = /job/${jobId};
//   };

//   return (
//     <Box>
//       {data && data.length > 0 && data.map((job) => (
//         <CustomCard variant="outlined" key={job?._id}>
//           <HeaderBox>
//             <Typography variant="subtitle1">New</Typography>
//             <BookmarkBorderIcon style={{ color: "#FFFFFF" }} />
//           </HeaderBox>
//           <CardContent>
//             <Typography
//               variant="h5"
//               component="div"
//               sx={{ fontWeight: "bold", cursor: "pointer", marginBottom: "8px" }}
//               onClick={() => gotoJobDetailsPage(job?._id)}
//               color="primary"
//             >
//               {job?.jobTitle}
//             </Typography>
//             {job?.jobType && <JobType>{job?.jobType}</JobType>}

//             <Typography variant="body2" color="textSecondary">
//               {job?.location}
//             </Typography>
//             <Typography variant="body2" sx={{ marginTop: "8px" }}>
//               {job?.description}
//             </Typography>
//           </CardContent>
//           <Box sx={{ p: 3 }}>
//             {job?.jobSkills && (
//               <ClickableLinkChips
//                 skills={job?.jobSkills.split(",")}
//               />
//             )}
//           </Box>
//           <CardActions>
//             <ViewMoreButton
//               size="small"
//               onClick={() => gotoJobDetailsPage(job?._id)}
//             >
//               View More
//             </ViewMoreButton>
//           </CardActions>
//         </CustomCard>
//       ))}
//     </Box>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoneyIcon from "@mui/icons-material/Money";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)({
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
  margin: "16px 0",
});

const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  background: "linear-gradient(135deg, #7B1FA2, #BA68C8)",
  color: "#FFFFFF",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
});

const JobTypeTag = styled("div")({
  display: "inline-block",
  padding: "3px 8px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#FFFFFF",
});

const ViewMoreButton = styled(Button)({
  borderColor: "#9C27B0",
  color: "#9C27B0",
  "&:hover": {
    backgroundColor: "#9C27B0",
    color: "#FFFFFF",
  },
});

export default function OutlinedCard({ data }) {
  const gotoJobDetailsPage = (jobId) => {
    window.location.href = `/job/${jobId}`;
  };

  return (
    <Box>
      {data && data.length > 0 ? (
        data.map((job) => (
          <CustomCard variant="outlined" key={job?._id}>
            <HeaderBox>
              <Typography variant="subtitle1">{job?.companyName || "Company Name Not Available"}</Typography>
              <BookmarkBorderIcon style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "24px" }} />
            </HeaderBox>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: "8px",
                  fontFamily: "Roboto, sans-serif",
                }}
                onClick={() => gotoJobDetailsPage(job?._id)}
                color="primary"
              >
                {job?.jobTitle || "Job Title Not Available"}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <WorkIcon style={{ color: "#7B1FA2", marginRight: "4px" }} />
                <Typography variant="body2" color="textPrimary">{job?.jobType || "Job Type Not Available"}</Typography>
                <LocationOnIcon style={{ color: "#7B1FA2", marginLeft: "16px", marginRight: "4px" }} />
                <Typography variant="body2" color="textPrimary">{job?.location || "Location Not Available"}</Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <MoneyIcon style={{ color: "#7B1FA2", marginRight: "4px" }} />
                <Typography variant="body2" color="textPrimary">{job?.salary ? `${job.salary} PKR / MONTH` : "Salary Not Available"}</Typography>
                <AccessTimeIcon style={{ color: "#7B1FA2", marginLeft: "16px", marginRight: "4px" }} />
                <Typography variant="body2" color="textPrimary">Deadline: {job?.applicationDeadline || "Deadline Not Available"}</Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                {job?.requiredSkills && job?.requiredSkills.map((skill, index) => (
                  <Chip key={index} label={skill} color="primary" style={{ marginRight: "8px" }} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <Typography variant="body2" color="textPrimary">{job?.companyDescription || "Company Description Not Available"}</Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
  {(Array.isArray(job?.jobSkills) ? job?.jobSkills : [job?.jobSkills]).map((skill, index) => (
    <Chip key={index} label={skill} color="secondary" style={{ marginRight: "8px" }} />
  ))}
</div>




            </CardContent>
            <CardActions>
              <ViewMoreButton
                size="small"
                onClick={() => gotoJobDetailsPage(job?._id)}
              >
                View More
              </ViewMoreButton>
            </CardActions>
          </CustomCard>
        ))
      ) : (
        <Typography variant="body1">No jobs available</Typography>
      )}
    </Box>
  );
}
