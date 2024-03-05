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
