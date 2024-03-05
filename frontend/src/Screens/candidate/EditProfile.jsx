import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import { useParams } from "react-router-dom";
import { DEFAULT_PROFILE_IMAGE } from "../../constants/url";
import Swal from "sweetalert2";

const steps = ["Basic Information", "Experience", "Skills"];
const EditProfile = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [base64EncodedImage, setBase65EncodedImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("FILE-----------", file);
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // handleSubmit(reader.result);
    };
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase65EncodedImage(reader?.result);
      setPreviewSource(reader.result);
    };
  };

  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [formData, setFormData] = useState({
    profileImage,
    about: "",
    currentRole: "",
    age: "",
    yearsOfExp: "",
    contact: "",
    cctc: "",
    location: "",
    email: "",
    experience: [], // Array to store experience data
    skills: [],
    step3: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await axios.get(API_ENDPOINTS.getProfile + `/${id}`).then((resp) => {
        if (resp && resp.status == 200 && resp?.data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            profileImage: resp?.data?.data?.profileImage,
            currentRole: resp?.data?.data?.currentRole,
            about: resp?.data?.data?.about,
            age: resp?.data?.data?.age,
            yearsOfExp: resp?.data?.data?.yearsOfExp,
            contact: resp?.data?.data?.contact,
            email: resp?.data?.data?.email,
            cctc: resp?.data?.data?.cctc,
            location: resp?.data?.data?.location,
            // Assign other fields similarly
          }));
          setUserData(resp?.data?.data);
          if (resp.data.data?.experience.length > 0) {
            setForms(resp.data.data.experience);
          }
          if (resp.data.data?.profileImage) {
            setPreviewSource(resp?.data?.data?.profileImage);
          }

          if (resp.data.data?.skills.length > 0) {
            setItemList(resp.data.data.skills);
          }

          setLoading(false);
        }
      });
    };
    fetchUserData();
  }, []);

  const [forms, setForms] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [itemList, setItemList] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItemList((prevList) => [...prevList, inputValue]);

      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    setItemList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleAddButtonClick = () => {
    setForms([
      ...forms,
      { jobTitle: "", role: "", startDate: "", endDate: "" },
    ]);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (step, value, index) => {
    if (step === "experience") {
      setForms((prevForms) =>
        prevForms.map((form, i) =>
          i === index ? { ...form, [value.name]: value.value } : form
        )
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        experience: forms,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [step]: value,
      }));
    }
  };

  const isStepCompleted = (step) => {
    return Object.keys(formData).indexOf(step) < activeStep;
  };

  const handleImageClick = () => {
    // Trigger the file input
    document.getElementById("fileInput").click();
  };

  const handleSubmitFile = () => {};
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (file) => {
    setProcessing(true);
    formData.skills = itemList;
    console.log("base64EncodedImage---------------", base64EncodedImage);
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: forms,
      skills: itemList,
      profileImage: base64EncodedImage,
    }));
    await axios
      .post(API_ENDPOINTS.editProfile + `/${id}`, formData)
      .then((resp) => {
        if (resp && resp.status == 200) {
          setProcessing(false);
          setBase65EncodedImage(null);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Successfully updated Profile",
          }).then(() => {
            window.location.href = `/profile/${id}`;
          });
        }
      });
    // Handle form submission with formData
    console.log("Form submitted with data:", formData);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      {console.log(
        "USER DATA------------",
        userData ? userData : "no userData"
      )}
      <Navbar />
      <div className="container">
        <div className="card mt-5" style={{ height: "auto",top:"40px",position:"relative" }}>
          <div className="container p-2 mt-5">
            {/* <h4 className="mt-2">Update your profile</h4> */}
            <div className="row p-4 mt-5">
              <div className="col-md-5">
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className="mt-4"
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        error={!isStepCompleted(label)}
                        completed={isStepCompleted(label)}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className="col-md-7">
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <h6 className="text-center">
                        All steps completed. Do you want to Continue?
                      </h6>
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                      >
                        {processing ? <>Please wait....</> : <>Submit</>}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div>
                        {activeStep === 0 && (
                          <div className="stepss">
                            <div>
                              {previewSource ? (
                                <img
                                  src={previewSource}
                                  alt="chosen"
                                  className="profile-image"
                                />
                              ) : (
                                <>
                                  <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9tjaExsY-srL4VsHNE_OKGVCJ-eIFNBktw&usqp=CAU"
                                    className="profile-image"
                                  />
                                </>
                              )}

                              <i
                                className="fa fa-camera"
                                style={{ fontSize: "25px" }}
                                onClick={handleImageClick}
                              ></i>
                              <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                              />
                            </div>
                            <div className="stepss">
                              <div className="stepss">
                                {/* <label>Step 1:</label> */}
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  current Role
                                </p>

                                <br />
                                <textarea
                                  placeholder="Example : Software Engineer"
                                  required={true}
                                  type="text"
                                  value={formData.currentRole}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("currentRole", e.target.value)
                                  }
                                />

                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  About
                                </p>

                                <br />
                                <textarea
                                  placeholder="Example : I'm dedicated software engineer"
                                  required
                                  type="text"
                                  value={formData.about}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("about", e.target.value)
                                  }
                                />

                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Age
                                </p>

                                <br />
                                <input
                                  placeholder="Example : 23"
                                  required
                                  type="text"
                                  value={formData.age}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("age", e.target.value)
                                  }
                                />

                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Totl years of Experience
                                </p>

                                <br />
                                <input
                                  placeholder="Example : 5 years/5 months"
                                  required
                                  type="text"
                                  value={formData.yearsOfExp}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("yearsOfExp", e.target.value)
                                  }
                                />

                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Connected Contact Number (with country code)
                                </p>

                                <br />
                                <input
                                  placeholder="Example : +918777349901"
                                  required
                                  type="text"
                                  value={formData.contact}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("contact", e.target.value)
                                  }
                                />
                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Email
                                </p>

                                <br />
                                <input
                                  placeholder="Example : example@gmail.com"
                                  required
                                  type="text"
                                  value={formData.email}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("email", e.target.value)
                                  }
                                />
                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Current CTC
                                </p>

                                <br />
                                <input
                                  placeholder="Example : 4.8"
                                  required
                                  type="text"
                                  value={formData.cctc}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("cctc", e.target.value)
                                  }
                                />
                                <br />
                                <p
                                  className="information-text"
                                  style={{ left: "16px", position: "absolute" }}
                                >
                                  Current Location
                                </p>

                                <br />
                                <input
                                  placeholder="Example : Kochi"
                                  required
                                  type="text"
                                  value={formData.location}
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    handleChange("location", e.target.value)
                                  }
                                />
                                <br />
                                <br />
                              </div>
                            </div>
                          </div>
                        )}
                        {activeStep === 1 && (
                          <div>
                            <button
                              onClick={handleAddButtonClick}
                              className="btn btn-secondary"
                            >
                              Add
                            </button>
                            {forms.map((form, index) => (
                              <div key={index} className="mt-2 row">
                                <label>Company Name:</label>
                                <input
                                  required
                                  type="text"
                                  className="form-control w-100"
                                  placeholder="Enter compny name"
                                  name="jobTitle"
                                  value={form.jobTitle}
                                  onChange={(e) =>
                                    handleChange("experience", e.target, index)
                                  }
                                />
                                <br />
                                <br />
                                <br />
                                <label>Role:</label>
                                <input
                                  required
                                  className="form-control"
                                  type="text"
                                  placeholder="Enter role"
                                  name="role"
                                  value={form.role}
                                  onChange={(e) =>
                                    handleChange("experience", e.target, index)
                                  }
                                />
                                <br />
                                <br />
                                <div className="">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <label>Start Date:</label>
                                      <input
                                        required
                                        className="form-control w-100"
                                        type="date"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={(e) =>
                                          handleChange(
                                            "experience",
                                            e.target,
                                            index
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label>End Date:</label>
                                      <input
                                        required
                                        className="form-control w-100"
                                        type="date"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={(e) =>
                                          handleChange(
                                            "experience",
                                            e.target,
                                            index
                                          )
                                        }
                                      />
                                    </div>

                                    <br />
                                    <br />
                                    <br />
                                  </div>

                                  <br />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {activeStep === 2 && (
                          <div>
                            {/* <label>Step 3:</label>
                            <br />
                            <input
                              type="text"
                              value={formData.step3}
                              onChange={(e) =>
                                handleChange("step3", e.target.value)
                              }
                            /> */}
                            <div>
                              <h3>Add your Skills</h3>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <input
                                  required
                                  className="form-control"
                                  type="text"
                                  value={inputValue}
                                  onChange={handleInputChange}
                                  onKeyPress={handleKeyPress}
                                />
                                <button
                                  onClick={handleAddItem}
                                  className="btn btn-success"
                                >
                                  Add
                                </button>
                              </div>
                              <ul className="mt-3">
                                {itemList.map((item, index) => (
                                  <li
                                    key={index}
                                    className="mt-2"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {item}
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDeleteItem(index)}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-2">
                        <Button
                          style={{ left: "-10px", position: "relative" }}
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          variant="contained"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNext}
                          variant="contained"
                          color="success"
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
