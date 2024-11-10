import React from "react";
import "./Main.css";
import logo from "../images/elder-logo.png";
import { useSession } from '../session/Session';  // Import useSession
import { useNavigate } from "react-router-dom";

function Auth() {
  const [listOfPosts, setListOfPosts] = React.useState([]);
  const [inputToken, setInputToken] = React.useState("");  // State to hold input value
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/home")
      .then((res) => res.json())
      .then((data) => setListOfPosts(data));
  }, []);

  const { saveToken } = useSession();  // Access saveToken from context

  // Handle changes in the input field
  const handleInputChange = (event) => {
    setInputToken(event.target.value);  // Update state with the input value
  };

  // Handle button click to save the token
  const handleButtonClick = () => {
    if (inputToken) {
      saveToken(inputToken);  // Save the token using saveToken function
      console.log("Token saved:", inputToken);  // Log the token for debugging
      navigate("/profile");
    } else {
      console.log("Please enter a token.");
    }
  };

  return (
    <>
      <div className="Main-container">
        <div className="auth-form">
          <div className="logo">
            <img src={logo} className="logo-img" alt="profile-pic" />
          </div>

          <div className="auth-zone">
            <p>Enter patient token</p>
            <input 
              type="text" 
              value={inputToken} 
              onChange={handleInputChange}  // Capture input value
              placeholder="Enter token"  // Optional placeholder text
            />
            <button type="button" onClick={handleButtonClick}>Get in!</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
