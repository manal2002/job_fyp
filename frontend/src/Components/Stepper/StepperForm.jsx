import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import "./StepperForm.css";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import JobAppliedMessage from "../MessageBox/JobAppliedMessage";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Swal from "sweetalert2";

function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    personalDetails: {},
    additionalInformation: {},
  });

  const steps = [
    { title: "Personal Information" },
    { title: "Additional Information" },
    { title: "Details confirmation" },
  ];

  const handleNext = (data) => {
    setFormData({ ...formData, [getStepName(activeStep)]: data });
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFinalSubmit = async () => {
    let pDetails = JSON.parse(localStorage.getItem("personal-details"));
    let aDetails = JSON.parse(localStorage.getItem("additionalDetails"));
    let finalData = {
      jobId: id,
      ...pDetails,
      ...aDetails,
    };
    await axios
      .post(API_ENDPOINTS.applyJob, { job: finalData })
      .then((resp) => {
        if (resp && resp.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Job applied successfully.",
          }).then(() => {
            window.location.href = "/alljobs";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong.",
          });
        }
      });
  };

  const getStepName = (step) => {
    switch (step) {
      case 0:
        return "personalDetails";
      case 1:
        return "additionalInformation";
      default:
        return null;
    }
  };

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalDetailsForm onNext={handleNext} />;
      case 1:
        return (
          <AdditionalInformationForm
            personalDetails={formData.personalDetails}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <div className="card-lg">
            {/* <JobAppliedMessage /> */}
            <h2 className="text-center">All the data iam given is correct</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div
        className="card-lg mt-5"
        style={{ top: "40px", position: "relative" }}
      >
        <Stepper steps={steps} activeStep={activeStep} />
        <div style={{ padding: "20px" }}>
          {getSectionComponent()}
          {activeStep !== 0 && activeStep !== steps.length - 1 && (
            <button onClick={handlePrevious} className="btn btn-danger">
              Previous
            </button>
          )}
          {activeStep !== steps.length - 1 && (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="btn btn-success"
              style={{
                float: "right",
                left: "-130px",
                top: "-111px",
                position: "relative",
              }}
            >
              Next
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button
              onClick={handleFinalSubmit}
              className="btn btn-primary"
              style={{ float: "right" }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepperForm;
