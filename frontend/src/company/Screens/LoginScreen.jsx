import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_ENDPOINTS from "../../Api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validateEmail();
    let loginData = {
      email,
      password,
    };
    await axios.post(API_ENDPOINTS.loginAccount, loginData).then((response) => {
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Operation completed successfully.",
        }).then(() => {
          if (response.data.data.role == "Candidate") {
            // window.location.href = "/alljobs";
            if (response?.data?.data?.experience.length == 0) {
              window.location.href = `/edit-profile/${response?.data?.data?._id}`;
            } else {
              window.location.href = '/alljobs'
            }
            
          } else {
            window.location.href = "/company/dashboard";
          }
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.data)
          );
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      }
    });
  };

  return (
    <div className="login-screen">
      <div className="row">
        <div className="col-md-6 leftSide">
          <h4>
            Welcome to <span> JobWave</span>
          </h4>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/graphic-designer-6311240-5211312.png"
            className="w-100"
          />
        </div>
        <div className="col-md-6 mt-5">
          <div className="container p-4 mt-5">
            <h2>
              Hello,
              <br />
              Welcome Back.
            </h2>
            <form className="mt-4" onSubmit={handleLogin}>
              <p>Email Address</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && (
                <p className="error" style={{ color: "red" }}>
                  {emailError}
                </p>
              )}
              <br />
              <br />
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // onBlur={validatePassword}
              />
              {passwordError && (
                <p className="error" style={{ color: "red" }}>
                  {passwordError}
                </p>
              )}
              <br />
              <button type="submit">Login</button>
            </form>
            <br />
            <a href="/register">Create new Account ?</a>
            <br />
            <a>Foreget password ?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

