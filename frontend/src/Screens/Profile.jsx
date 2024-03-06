import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ClickableLinkChips from "../Components/Chips/ClickableLinkChips";
import BasicAccordion from "../Components/BasicAccordion/BasicAccordion";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import API_ENDPOINTS from "../Api";
import Loader from "../Components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [uploadedFilename, setUploadedFilename] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(API_ENDPOINTS.getProfile + `/${id}`).then((resp) => {
        if (resp && resp.status == 200) {
          setUserData(resp?.data?.data);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);

  const downloadResume = (resumeFilename) => {
    axios({
      method: "get",
      url: `${API_ENDPOINTS.downloadResume}/${resumeFilename}`,
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = resumeFilename;
      link.click();
    });
  };

  const handleDownloadClick = () => {
    if (userData?.resume?.trim() !== "" && userData.resume !== null) {
      downloadResume(userData.resume);
    } else {
      console.log("No resume available for download");
    }
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("userId", userData?._id); // Directly append userId to formData

      const response = await axios.post(API_ENDPOINTS.uploadResume, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFilename(response.data.filename);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <div className="container">
      <JobSeekerSidebar />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row mt-5">
              <div className="col-md-4 mt-4">
                <div className="profile-card mt-4">
                  <div className="container-fluid">
                    <a href={`/edit-profile/${userData?._id}`}>
                      <EditIcon
                        className="ml-auto mt-2"
                        style={{ float: "right" }}
                      />
                    </a>
                    <div className="profile-image">
                      <img
                        src={
                          userData?.profileImage
                            ? userData?.profileImage
                            : `https://www.marcorossini.altervista.org/images/heading-profile.jpg`
                        }
                        className="mt-4"
                      />
                    </div>
                    <h5 className="text-center mt-2">{userData?.firstName}</h5>
                    <p className="text-center">{userData?.currentRole}</p>
                    <div className="content">{userData?.about}</div>
                    <div className="mt-3">
                      <h5>Skills</h5>
                      <div className="row p-1" style={{display:"flex"}}>
                        {userData?.skills && userData?.skills?.length > 0 && (
                          <ClickableLinkChips skills={userData?.skills} />
                        )}
                      </div>
                    </div>
                    {/* <div className="mt-3">
                      <h5>About</h5>
                      <div className="content">
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document or a typeface without relying on
                        meaningful content. Lorem ipsum may be used as a
                        placeholder before final copy is available.
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-4">
                <div className="profile-card mt-4 p-4">
                  <div className="container-fluid">
                    <div className="mt-3">
                      <h5>Basic Information</h5>
                      <div className="basic-information mt-4">
                        <div className="row">
                          <div className="col-md-4 mt-2">
                            <h5>AGE</h5>
                            <h6>{userData?.age} Years</h6>
                          </div>
                          <div className="col-md-4 mt-2">
                            <h5>YEARS OF EXPERIENCE</h5>
                            <h6>{userData?.yearsOfExp} Years</h6>
                          </div>
                          <div className="col-md-4 mt-2">
                            <h5>PHONE</h5>
                            <h6>{userData?.contact}</h6>
                          </div>
                          <div className="col-md-4 mt-2">
                            <h5>CTC</h5>
                            <h6>{userData?.cctc}</h6>
                          </div>
                          <div className="col-md-4 mt-2">
                            <h5>LOCATION</h5>
                            <h6>{userData?.location}</h6>
                          </div>
                          <div className="col-md-4 mt-2">
                            <h5>EMAIL</h5>
                            <h6>{userData?.email}</h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    {userData?.resume?.trim() !== "" ||
                    userData?.resume !== null ? (
                      <button
                        className="dwnd-btn mt-3"
                        onClick={handleDownloadClick}
                      >
                        Download Resume
                      </button>
                    ) : (
                      // <button className="dwnd-btn mt-3" onClick={handleUpload}>
                      //   Upload Resume
                      // </button>
                      <>
                        <input
                          type="file"
                          className="form-control w-100"
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
                      </>
                    )}
                  </div>
                </div>
                <div className="profile-card mt-4 p-4">
                  <div className="container-fluid">
                    <div className="mt-3">
                      <h5>Experiences</h5>
                      <div className=" mt-4">
                        <div className="row p-3">
                          {userData?.experience &&
                          userData?.experience?.length > 0 ? (
                            userData?.experience?.map((experience) => (
                              <div className="mt-4">
                                <div className="row mt-2">
                                  <div className="col-md-4">
                                    <img
                                      src="data:image/jpeg;base64,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"
                                      className="w-75 com-logo"
                                    />
                                  </div>
                                  <div className="col-md-8">
                                    <div>
                                      <h5 style={{ marginLeft: "20px" }}>
                                        {experience?.jobTitle}
                                      </h5>
                                      <div
                                        className="basic-information mt-4"
                                        style={{ marginLeft: "20px" }}
                                      >
                                        <h6>{experience?.role}</h6>
                                        <h5>
                                          {experience?.startDate} -{" "}
                                          {experience?.endDate}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            ))
                          ) : (
                            <>No experience added</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <BasicAccordion />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
