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
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
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
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
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
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
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
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
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
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;
