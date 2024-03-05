import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import OutlinedCard from "../Components/Card/Card";

function HomeScreen() {
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            {/* <Sidebar className="mt-3" /> */}
          </div>
          <div className="col-md-6 mt-5">
            <OutlinedCard />
          </div>
          <div className="col-md-3">3</div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
