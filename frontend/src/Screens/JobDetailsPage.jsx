import React from "react";
import JobDetail from "../Components/Card/JobDetail";
import OutlinedCard from "../Components/Card/Card";
import Navbar from "../Components/Navbar/Navbar";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

function JobDetailsPage() {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <div className="container mt-5">
        <JobSeekerSidebar/>
        <div className="row mt-5">
          <div className="col-md-8">
            <JobDetail />
          </div>
          <div className="col-md-4">
            <div className="mt-5">
              {/* <h2>Similar Jobs for you</h2> */}
              <OutlinedCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
