import React from "react";
import "./Main.css";
import logo from "../images/elder-logo.png";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [credentials, setCredentials] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState(""); // Add error state
  const navigate = useNavigate();

  // Handle changes in the input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // This ensures cookies are sent and received
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      navigate("/patients");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="Main-container">
        <div className="auth-form">
          <div className="logo">
            <img src={logo} className="logo-img" alt="profile-pic" />
          </div>

        <h3>Login</h3>

          <div className="auth-zone">
            <p>Username</p>
            <input
              type="text"
              name="username" // Set name attribute
              value={credentials.username}
              onChange={handleInputChange} // Capture input value
              placeholder="Username" // Optional placeholder text
            />

            <p>Password</p>
            <input
              type="password"
              name="password" // Set name attribute
              value={credentials.password}
              onChange={handleInputChange} // Capture input value
              placeholder="Password" // Optional placeholder text
            />

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display errors */}

            <a href="/register">Create new account</a>
            <button type="button" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
