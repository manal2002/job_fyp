import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function Page1() {
  return (
    <div className="container mt-4">
      <div className="row page1">
        <div className="col-md-6">
          <h1>
            Follow our steps, We <br /> will help you
          </h1>
        </div>
        <div className="col-md-6">
          <p>
          "Ready to streamline your candidate evaluation process? 
           Sign up now and experience the difference!"
          </p>
        </div>
      </div>
      <div>
        <div className="row mt-5">
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="container-fluid">
                <div className="icon-box mt-3">
                  <AppRegistrationIcon className="mu-icon" />
                </div>
                <h5 className="mt-3">Register</h5>
                <p style={{textAlign:"left"}}>
               "Join the Job Connect Community: 
                Sign up now to start revolutionizing your recruitment processes!"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="container-fluid">
                <div className="icon-box mt-3">
                  <AccountBoxIcon className="mu-icon" />
                </div>
                <h5 className="mt-3">Update Profile</h5>
                <p style={{textAlign:"left"}}>
                Keep it current. Enhance your experience by providing the latest details about your
                skills and qualifications. Stay ahead with an up-to-date profile on Job Connect"
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="container-fluid">
                <div className="icon-box mt-3">
                  <CheckBoxIcon className="mu-icon" />
                </div>
                <h5 className="mt-3">Select Job</h5>
                <p style={{textAlign:"left"}}>
                Discover opportunities tailored to your skills and aspirations. 
                Explore our comprehensive job listings and find the perfect fit for your career path."
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="container-fluid">
                <div className="icon-box mt-3">
                  <CheckCircleOutlineIcon className="mu-icon" />
                </div>
                <h5 className="mt-3">Apply Job</h5>
                <p style={{textAlign:"left"}}>
                 Seize the opportunity.
                 Submit your application effortlessly and take the first step towards your dream job."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;