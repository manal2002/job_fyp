import React from "react";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MyChart from "../../Components/Chart/Chart";
// import CollapsibleTable from "../Components/Table";
import Table2 from "../Components/Table2";
function AllJobs() {
  return (
    <div className="container-fluid mt-5" style={{ backgroundColor: "white",  overflowY: "auto" }}>
      <h4 className="dash-title">My Jobs</h4>
      <p className="date">Today is Monday, 23 November 2023</p>
      <div className="dashboard-home" style={{ backgroundColor: "white" }}>
        
          <div className="list-section mt-5">
            <div className="row mt-4 p-2">
              <div className="col-md-12 col-lg-12">
                {/* <CollapsibleTable className="w-100" /> */}
                <Table2 />
              </div>
              <div>
                <h3 style={{ color: "white" }}>Todays Interviews</h3>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default AllJobs;
