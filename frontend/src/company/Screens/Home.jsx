import React from "react";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MyChart from "../../Components/Chart/Chart";
function Home() {
  return (
    <div className="container-fluid mt-4">
      <h4 className="dash-title">Hello ,Sara</h4>
      <p className="date">Today is Monday, 23 November 2023</p>
      <div className="dashboard-home">
        <div className="row">
          <div className="col-md-3">
            <div className="card" style={{ backgroundColor: "#8e2f8e" }}>
              <h4 className="text-white">Total Jobs</h4>
              <div className="row p-4">
                <WorkHistoryIcon className="dash-icons text-white" />
                <h3 className="text-white">55</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card"
              style={{ backgroundColor: "rgb(156 224 226)" }}
            >
              <h4 className="text-white">Unapproved Jobs</h4>
              <div className="row p-4">
                <PendingActionsIcon className="dash-icons text-white" />
                <h3 className="text-white">55</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card"
              style={{ backgroundColor: "rgb(255 181 45)" }}
            >
              <h4 className="text-white">Active Jobs</h4>
              <div className="row p-4">
                <WorkHistoryIcon className="dash-icons text-white" />
                <h3 className="text-white">55</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{ backgroundColor: "rgb(195 255 162)" }}>
              <h4 className="text-white">Closed Jobs</h4>
              <div className="row p-4">
                <WorkHistoryIcon className="dash-icons text-white" />
                <h3 className="text-white">55</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="list-section mt-5">
            <div className="row mt-4 p-2">
              <div className="col-md-4">
                <h3>Todays Interviews</h3>
                <div className="interview-list mt-4">
                  <ul className="mt-5">
                    <li
                      className="p-3 mt-4"
                      style={{ borderLeft: "8px solid #8e2f8e" }}
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <h5>Nodejs developer</h5>
                          <i class="fa fa-ellipsis-v ml-auto"></i>
                        </div>
                        <p>Interview with Anish</p>
                      </div>
                    </li>
                    <li
                      className="p-3 mt-4"
                      style={{ borderLeft: "8px solid rgb(156 224 226)" }}
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <h5>Nodejs developer</h5>
                          <i class="fa fa-ellipsis-v ml-auto"></i>
                        </div>
                        <p>Interview with Anish</p>
                      </div>
                    </li>
                    <li
                      className="p-3 mt-4"
                      style={{ borderLeft: "8px solid rgb(255 181 45)" }}
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <h5>Nodejs developer</h5>
                          <i class="fa fa-ellipsis-v ml-auto"></i>
                        </div>
                        <p>Interview with Anish</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 p-2">
                <h3>Todays Interviews</h3>
                <MyChart className="mt-5" />
              </div>
              <div className="col-md-4">
                <div className="container-fluid">
                  <div className="adv-card mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <h5>$99 / Month</h5>
                          <h5>Pro Plan</h5>
                          <p>More productivity with Premium</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <img
                          className="w-100"
                          src="https://img.freepik.com/premium-vector/blogger-illustration-watch-content-internet-idea-social-media-network-online-communication-illustration_277904-5268.jpg?size=626&ext=jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
