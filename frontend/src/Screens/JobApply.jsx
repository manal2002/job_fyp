import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import StepperForm from "../Components/Stepper/StepperForm";
import ApplyJob from "../Components/ApplyJob/ApplyJob";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

function JobApply() {
  return (
    <div style={{ backgroundColor: "whitesmoke",height:"100vh" }}>
      <Navbar />
      <div>
        <JobSeekerSidebar/>
        {/* <StepperForm /> */}
        <ApplyJob />
      </div>
    </div>
  );
}

export default JobApply;
