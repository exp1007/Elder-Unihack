import React from "react";
import "./Main.css";
import logo from "../images/elder-logo.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = React.useState("");  // State to hold the username
  const [password, setPassword] = React.useState("");  // State to hold the password
  const navigate = useNavigate();

  // Handle changes in the username input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);  // Update state with the input value
  };

  // Handle changes in the password input field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);  // Update state with the input value
  };

  // Handle button click to send registration data
  const handleButtonClick = async () => {
    // Prepare the body data for the POST request
    const requestData = {
      username: username,
      password: password
    };

    console.log(JSON.stringify(requestData));

    try {
      const response = await fetch("http://localhost:8081/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),  // Send data as JSON string
      });

      if (response.ok) {
        // Redirect to login or other page after successful registration
        navigate("/auth");
      } else {
        // Handle error (show error message to user)
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="Main-container">
        <div className="auth-form">
          <div className="logo">
            <img src={logo} className="logo-img" alt="profile-pic" />
          </div>

          <h3>Register</h3>

          <div className="auth-zone">
            <p>Username</p>
            <input 
              type="text" 
              value={username} 
              onChange={handleUsernameChange}  // Capture input value for username
              placeholder="Username"  // Optional placeholder text
            />

            <p>Password</p>
            <input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange}  // Capture input value for password
              placeholder="Password"  // Optional placeholder text
            />

            <a href="/auth">Already have an account?</a>
            <button type="button" onClick={handleButtonClick}>Register</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
