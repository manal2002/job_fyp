import React, { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../Api";
import Swal from "sweetalert2";

function RegisterScreen() {
  const [role, setRole] = useState("Candidate");
  const [username, setUsername] = useState("");
  const [userNameError, setUsernameError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [contact, setContact] = useState(0);
  const [contactError, setContactError] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!username || username.trim() == "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (!firstName || firstName.trim() == "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    if (!lastName || lastName.trim() == "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    if (!email || email.trim() == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!contact || contact.trim() == "") {
      setContactError(true);
    } else {
      setContactError(false);
    }

    let registerData = {
      username,
      firstName,
      lastName,
      email,
      contact,
      password,
      role,
    };
    await axios.post(API_ENDPOINTS.createAccount, registerData).then((resp) => {
      if (resp && resp.data && resp.data.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registered successfully.",
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      }
    });
    console.log("SUBMIT CALLED", registerData);
  };

  return (
    <div>
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
              <h2>Create new Account</h2>

              <>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <p>First Name</p>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <br />
                  {firstNameError && (
                    <p style={{ color: "red" }}>First name required</p>
                  )}
                  <br />
                  <p>Last Name</p>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <br />
                  {lastNameError && (
                    <p style={{ color: "red" }}>last name required</p>
                  )}
                  <br />
                  <p>User Name</p>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                  {userNameError && (
                    <p style={{ color: "red" }}>username required</p>
                  )}
                  <br />
                  <p>Email Address</p>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  {emailError && <p style={{ color: "red" }}>Email required</p>}
                  <br />
                  <p>Contact Number</p>
                  <input
                    type="text"
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <br />
                  {contactError && (
                    <p style={{ color: "red" }}>Phone number required</p>
                  )}
                  <br />
                  <p>Join as</p>
                  <select
                    style={{ width: "50%" }}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value={"Candidate"}>Candidate</option>
                    <option value={"Company"}>Company</option>
                  </select>
                  <br />
                  <br />

                  <br />
                  <br />
                  <p>Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    // style={{
                    //   position: "absolute",
                    //   right: "10px",
                    //   top: "50%",
                    //   transform: "translateY(-50%)",
                    //   cursor: "pointer",
                    // }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </i>
                  <br />
                  <p>Confirm password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p style={{ color: "red" }}>Password should be same</p>
                  )}
                  <br />
                  <button type="submit">Register</button>
                </form>
              </>

              <br />
              <a href="/login">Already have an account ?</a>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
