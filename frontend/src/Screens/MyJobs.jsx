import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OutlinedCard from "../Components/Card/Card";
import axios from "axios";
import API_ENDPOINTS from "../Api";
import Loader from "../Components/Loader";
import JobSeekerSidebar from "../Components/Sidebar/Jobseekersidebar";

function MyJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myJobs, setMyJobs] = useState([]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  useEffect(() => {
    if (userData) {
      setLoading(true);
      const fetchData = async () => {
        let uid = userData._id;

        await axios.get(API_ENDPOINTS.myJobs + `/${uid}`).then((result) => {
          if (result && result.status == 200) {
            setMyJobs(result.data.data);
            setLoading(false);
          }
        });
      };
      fetchData();
    }
  }, []);

  return (
    <div className="myjobs">
      <Navbar />
      <div className="container">
      <JobSeekerSidebar />
        <div className="card-lg p-3 mt-5">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>


          <h4>Applied Jobs</h4>
          <div className="mt-4">
            <Tabs>
              <TabList>
                <Tab>Applied ({myJobs?.length})</Tab>
                <Tab>Saved (2)</Tab>
              </TabList>

              <TabPanel>
                <div>
                  {loading ? (
                    <Loader />
                  ) : myJobs.length > 0 ? (
                    <>
                      <OutlinedCard data={myJobs} />
                    </>
                  ) : (
                    <p>No jobs applied yet</p>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                {savedJobs.length > 0 ? (
                  <>Saved jobs</>
                ) : (
                  <div className="text-center">
                    <h4>No Saved Jobs</h4>
                    <img
                      className="w-25"
                      src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png"
                    />
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
