import React, { useState } from "react";
import "./NavbarRc.css";
//import JobSeekerSidebar from "../Sidebar/Jobseekersidebar";

function NavbarRc() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-container container-fluid">
          <input type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            {/* <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/alljobs">Find Jobs</a>
            </li> */}
            {/* <li>
              <a href="/myjobs">My jobs</a>
            </li>
            <li>
              <a href="#">Interviews</a>
            </li> */}

            {!userData ? (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register" className="loginBnt text-white">
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <li>
                <div class="dropdown">
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                    }}
                    class="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={userData?.profileImage} className="thumbnail" />{" "}
                    {userData?.firstName}
                  </button>
                  <div class="dropdown-menu">
                    {/* <a class="dropdown-item" href={`/profile/${userData?._id}`}>
                      My Profile
                    </a> */}
                    <a class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                </div>
              </li>
              // <li>
              //   <a href="#">
              //     <img src={userData?.profileImage} className="thumbnail" />{" "}
              //     {userData?.firstName}
              //   </a>
              // </li>
            )}
          </ul>
          <h1 className="logo">
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Job Connect" className="logo-image" /> {/* Use the logo image from the public folder */}
            <span className="logo-text">Job Connect</span>
          </h1>
        </div>
      </nav>
      
    </div>
  );
}

export default NavbarRc;



