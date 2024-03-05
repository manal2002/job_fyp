import React, { useState } from "react";
import "./Navbar.css";
function Navbar() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a class="navbar-brand" href="/">
            Hire Me
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/alljobs">
                  Jobs
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/myjobs">
                  My jobs
                </a>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link disabled">Disabled</a> */}
                <a class="nav-link" href={`/interview/${userData?._id}`}>
                  Interviews
                </a>
              </li>
            </ul>
          </div>
        </div>
        <form class="form-inline">
          {/* <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <ul class="navbar-nav">
            <div class="dropdown">
              <button
                class="dropdown-toggle btn mt-1"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                {userData && (
                  <img src={userData?.profileImage} className="thumbnail" />
                )}

                {userData ? <>{userData.firstName}</> : <>Account</>}
              </button>
              <div class="dropdown-menu">
                {userData ? (
                  <>
                    <a class="dropdown-item" href={`/profile/${userData?._id}`}>
                      My Profile
                    </a>
                    <a class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a class="dropdown-item" href="/Login">
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
            <li
              class="nav-item active"
              style={{ left: "-20px", position: "relative" }}
            >
              <a class="nav-link" href="#">
                FAQ <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          {/* <button class="SigninBtn my-2 my-sm-0" type="submit">
            Login
          </button> */}
          {/* <button
            type="button"
            class="SigninBtn"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            Login
          </button> */}

          <div
            class="modal fade"
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center" id="staticBackdropLabel">
                    User Login
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <p>Email</p>
                    <input
                      type="email"
                      className="form-control w-100"
                      placeholder="Email"
                    />
                    <br />
                    <br />
                    <p>Password</p>
                    <input
                      type="password"
                      className="form-control w-100"
                      placeholder="Email"
                    />
                    <button type="submit" className="mt-4 submitBtn">
                      Login
                    </button>
                    <br />
                    <div className="mt-3">
                      <a>Create new Account?</a>
                      <br />
                      <a>Foreget password?</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
