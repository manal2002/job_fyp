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
//     window.location.href = `/job/${jobId}`;
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
//                   <div className={`job-type ${job?.jobType}`}>
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

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ClickableLinkChips from "../Chips/ClickableLinkChips";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  },
  margin: "16px 0",
  borderRadius: "15px",
  overflow: "hidden",
  transition: "all 0.3s ease",
});

const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  background: "linear-gradient(135deg, #7B1FA2, #BA68C8)",
  color: "#FFFFFF",
});

const JobType = styled("div")(({ theme }) => ({
  display: "inline-block",
  padding: "3px 8px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#FFFFFF",
  backgroundColor: "#9C27B0",
  marginTop: "8px",
  marginRight: "4px",
}));

const ViewMoreButton = styled(Button)({
  borderColor: "#9C27B0",
  color: "#9C27B0",
  '&:hover': {
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
      {data && data.length > 0 && data.map((job) => (
        <CustomCard variant="outlined" key={job?._id}>
          <HeaderBox>
            <Typography variant="subtitle1">New</Typography>
            <BookmarkBorderIcon style={{ color: "#FFFFFF" }} />
          </HeaderBox>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", cursor: "pointer", marginBottom: "8px" }}
              onClick={() => gotoJobDetailsPage(job?._id)}
              color="primary"
            >
              {job?.jobTitle}
            </Typography>
            {job?.jobType && <JobType>{job?.jobType}</JobType>}

            <Typography variant="body2" color="textSecondary">
              {job?.location}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              {job?.description}
            </Typography>
          </CardContent>
          <Box sx={{ p: 3 }}>
            {job?.skills_and_requirement && (
              <ClickableLinkChips
                skills={job?.skills_and_requirement.split(",")}
              />
            )}
          </Box>
          <CardActions>
            <ViewMoreButton
              size="small"
              onClick={() => gotoJobDetailsPage(job?._id)}
            >
              View More
            </ViewMoreButton>
          </CardActions>
        </CustomCard>
      ))}
    </Box>
  );
}
