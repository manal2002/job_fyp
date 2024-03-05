import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Swal from "sweetalert2";

const MultistepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    applicationDeadline: "",
    jobCategory: "",
    experienceLevel: "",
    educationLevel: "",
    skills_and_requirement: "",
    contactInformation: "",
    companyDescription: "",
    companyWebsite: "",
    social_media_links: [],
    additional_features: "",
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const currentStepErrors = validateStep(activeStep);
    if (Object.keys(currentStepErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrors({});
    } else {
      setErrors(currentStepErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = (step) => {
    let stepErrors = {};

    switch (step) {
      case 0:
        if (
          !formData.jobTitle ||
          !formData.jobDescription ||
          !formData.companyName ||
          !formData.location ||
          !formData.jobType
        ) {
          stepErrors = {
            jobTitle: !formData.jobTitle ? "Job Title is required" : "",
            jobDescription: !formData.jobDescription
              ? "Job Description is required"
              : "",
            companyName: !formData.companyName
              ? "Company Name is required"
              : "",
            location: !formData.location ? "Location is required" : "",
            jobType: !formData.jobType ? "Job Type is required" : "",
          };
        }
        break;
      case 1:
        if (
          !formData.salary ||
          !formData.applicationDeadline ||
          !formData.jobCategory ||
          !formData.experienceLevel ||
          !formData.educationLevel
        ) {
          stepErrors = {
            salary: !formData.salary ? "Salary is required" : "",
            applicationDeadline: !formData.applicationDeadline
              ? "Application Deadline is required"
              : "",
            jobCategory: !formData.jobCategory
              ? "Job Category is required"
              : "",
            experienceLevel: !formData.experienceLevel
              ? "Experience Level is required"
              : "",
            educationLevel: !formData.educationLevel
              ? "Education Level is required"
              : "",
          };
        }
        break;
      case 2:
        if (
          !formData.skills_and_requirement ||
          !formData.contactInformation ||
          !formData.companyWebsite ||
          !formData.additional_features
        ) {
          stepErrors = {
            skills_and_requirement: !formData.skills_and_requirement
              ? "Skills and Requirements are required"
              : "",
            contactInformation: !formData.contactInformation
              ? "Contact Information is required"
              : "",
            companyWebsite: !formData.companyWebsite
              ? "Company Website is required"
              : "",
            additional_features: !formData.additional_features
              ? "Additional Features are required"
              : "",
          };
        }
        break;
      // Add more cases for additional steps if needed
      default:
        break;
    }

    return stepErrors;
  };

  const handleSubmit = async () => {
    const finalErrors = validateStep(activeStep);
    if (Object.keys(finalErrors).length === 0) {
      console.log(formData);
      await axios.post(API_ENDPOINTS.postJob, formData).then((resp) => {
        if (resp.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Job added successfully.",
          }).then(() => {
            window.location.href = "/company/dashboard";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong.",
          });
        }
      });
      // Perform submit logic here
      setFormData({
        jobTitle: "",
        jobDescription: "",
        companyName: "",
        location: "",
        jobType: "",
        salary: "",
        applicationDeadline: "",
        jobCategory: "",
        experienceLevel: "",
        educationLevel: "",
        skills_and_requirement: "",
        contactInformation: "",
        companyDescription: "",
        companyWebsite: "",
        social_media_links: [],
        additional_features: "",
      });
      setActiveStep(0);
      setErrors({});
    } else {
      setErrors(finalErrors);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="step-form p-5">
            <div className="container-fluid p-5">
              <div className="row">
                <div className="col-md-6">
                  <p>Job Title</p>
                  <TextField
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Description</p>
                  <TextField
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Company Name</p>
                  <TextField
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Location</p>
                  <TextField
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Job Type</p>
                  <TextField
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="step-form p-5">
            <div className="container-fluid">
              <h1>Step 2</h1>
              <div className="row">
                <div className="col-md-6">
                  <p>Salary</p>
                  <TextField
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Application Deadline</p>
                  <TextField
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Job Category</p>
                  <TextField
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Experience Level</p>
                  <TextField
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Education Level</p>
                  <TextField
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-form p-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <p>Skills and Requirements</p>
                  <TextField
                    name="skills_and_requirement"
                    value={formData.skills_and_requirement}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Contact Information</p>
                  <TextField
                    name="contactInformation"
                    value={formData.contactInformation}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Company Website</p>
                  <TextField
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <p>Additional Features</p>
                  <TextField
                    name="additional_features"
                    value={formData.additional_features}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Step 4</h1>
            <div className="statement p-4">
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-5">
      <div className="container-fluid">
        <h2 style={{ fontWeight: "bold" }}>Create new Job</h2>
        <Stepper activeStep={activeStep} alternativeLabel className="mt-5">
          <Step key="Personal Info">
            <StepLabel>Personal Info</StepLabel>
          </Step>
          <Step key="Contact Info">
            <StepLabel>Contact Info</StepLabel>
          </Step>
          <Step key="Additional Info">
            <StepLabel>Additional Info</StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === 3 ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div
                style={{
                  float: "right",
                  top: "-50px",
                  left: "-20px",
                  position: "relative",
                }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === 2 ? "Finish" : "Next"}
                </Button>
              </div>

              {Object.keys(errors).length > 0 && (
                <>
                  <div className="error-box">
                    <h4 style={{ color: "red" }}>Instructions</h4>
                    {Object.keys(errors).map((key) => (
                      <Typography key={key} color="error">
                        {errors[key]}
                      </Typography>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultistepForm;
