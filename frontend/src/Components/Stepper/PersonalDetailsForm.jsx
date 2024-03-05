import React, { useState } from "react";
import API_ENDPOINTS from "../../Api";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Add PropTypes for updateFormData
PersonalDetailsForm.propTypes = {
  updateFormData: PropTypes.func.isRequired,
};

function PersonalDetailsForm({ updateFormData }) {
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState("");
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("");
  const [references, setReferences] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [newResume, setNewResume] = useState(false);

  const handleRadioChange = (e) => {
    setNewResume(e.target.value === "true");
  };
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(API_ENDPOINTS.getProfile + `/${userData?._id}`)
        .then((resp) => {
          if (resp && resp.status == 200) {
            setCurrentUser(resp?.data?.data);
            let currentData = resp?.data?.data;
            setFullName(currentData?.firstName + " " + currentData?.lastName);
            setEmail(currentData?.email);
            setPhone(currentData?.contact);
            setWorkExperience(currentData?.yearsOfExp);
          }
        });
    };
    fetchData();
  }, []);

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
  const [disableBtn, setDisable] = useState(false);
  const handleSubmitPersonalDetails = (e) => {
    e.preventDefault();
    let data = {
      fullName,
      email,
      phone,
      address,
      resume: uploadedFilename,
      education,
      workExperience,
      skills,
      coverLetter,
      availability,
      references,
      portfolio,
    };
    localStorage.setItem("personal-details", JSON.stringify(data));
    console.log("DATA-----------", data);
    setDisable(true);
  };
  return (
    <div className="container-fluid p-5">
      <h2 className="form-title" style={{ left: "28px", position: "relative" }}>
        PersonalDetailsForm
      </h2>
      <div className="card-lg p-4">
        <form>
          <div className="row">
            <div className="col-md-6">
              <label>Full Name:</label>
              <input
                type="text"
                className="form-control w-100"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Email:</label>
              <input
                type="email"
                className="form-control w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label>Phone:</label>
              <input
                type="tel"
                className="form-control w-100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Address:</label>
              <textarea
                className="form-control w-100"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label>Resume/CV:</label>
              <div className="mt-3" style={{ color: "red" }}>
                <label>
                  <input
                    type="radio"
                    value={false}
                    name="resumeOption"
                    onChange={handleRadioChange}
                  />
                  Use existing resume
                </label>
                {"     "}

                <label style={{ left: "20px", position: "relative" }}>
                  <input
                    type="radio"
                    value={true}
                    name="resumeOption"
                    onChange={handleRadioChange}
                  />
                  Upload new resume
                </label>
              </div>
              {newResume ? (
                <>
                  <input
                    type="file"
                    className="form-control w-100 mt-3"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <button onClick={handleUpload} className="btn btn-success">
                    Upload
                  </button>
                  {uploadedFilename && (
                    <p style={{ color: "#700c93" }}>
                      File uploaded: {uploadedFilename}
                    </p>
                  )}
                </>
              ) : (
                <p style={{color:"green"}}>{userData?.resume}</p>
              )}
            </div>
            <div className="col-md-6">
              <label>Education:</label>
              <textarea
                className="form-control w-100"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label>Total Work Experience:</label>
              <textarea
                className="form-control w-100"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Skills:</label>
              <input
                type="text"
                className="form-control w-100"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Cover Letter:</label>
              <textarea
                className="form-control w-100"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Availability:</label>
              <input
                type="text"
                className="form-control w-100"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label>References:</label>
              <textarea
                className="form-control w-100"
                value={references}
                onChange={(e) => setReferences(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Portfolio or Github Link:</label>
              <input
                type="text"
                className="form-control w-100"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>
            <div className="">
              <button
                disabled={disableBtn}
                className="btn btn-primary mt-5"
                onClick={handleSubmitPersonalDetails}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalDetailsForm;
