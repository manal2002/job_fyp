import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ClickableLinkChips from "../Chips/ClickableLinkChips";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OutlinedCard({ data }) {
  const gotoJobDetailsPage = (jobId) => {
    window.location.href = `/job/${jobId}`;
  };

  return (
    <Box>
      {data &&
        data.length > 0 &&
        data.map((job) => (
          <Card variant="outlined" className="mt-2 cardBox w-100 ">
            <React.Fragment className="w-100 row">
              <CardContent className="w-100" style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="green"
                    gutterBottom
                    style={{ color: "green" }}
                  >
                    New
                  </Typography>
                  <div>
                    <BookmarkBorderIcon />
                  </div>
                </div>
                <Typography
                  variant="h5"
                  component="div"
                  className="jobTitle"
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => gotoJobDetailsPage(job?._id)}
                >
                  {job?.jobTitle}
                </Typography>
                {job?.jobType && (
                  <div className={`job-type ${job?.jobType}`}>
                    {job?.jobType}
                  </div>
                )}

                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                  className="jobLocation"
                  style={{ color: "darkcyan" }}
                >
                  {job?.location}
                </Typography>
                <Typography variant="body2">
                  {job?.description}
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <div className="p-3">
                {job?.skills_and_requirement && (
                  <ClickableLinkChips
                    skills={job?.skills_and_requirement?.split(",")}
                  />
                )}
              </div>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => gotoJobDetailsPage(job?._id)}
                  className="view-more"
                >
                  View More
                </Button>
              </CardActions>
            </React.Fragment>
          </Card>
        ))}
    </Box>
  );
}
