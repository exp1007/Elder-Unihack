import React from "react";
import "./Main.css";
import "./Profile.css";
import PopupElements from "../components/PopupElement";  // Import PopupElements
import fetchWithToken from '../session/FetchWithToken';  // Make sure to import the fetchWithToken helper
import { useSession } from '../session/Session';  // Import useSession
import { useNavigate } from "react-router-dom";

function Profile() {
  const [patient, setPatient] = React.useState(null); // Initialize as null
  const [generalInfo, setGeneralInfo] = React.useState(null); // Initialize as null
  const [selectedType, setSelectedType] = React.useState(null); // State for the popup
  const { token } = useSession(); // Access the token from session context
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPatientData = async () => {
      if (!token) {
        console.error("Token is missing!");
        return;
      }

      try {
        // Pass both the URL and the token to fetchWithToken
        const data = await fetchWithToken("http://localhost:8081/verify-token", token, {
          method: "GET",
        });

        console.log("Received data:", data);  // Log the data received from the backend

      } catch (error) {
        navigate("/auth");
        console.error("Error fetching data:", error);
      }
    };

    fetchPatientData();  // Call the fetch function when component mounts

  }, [token]);  // Re-run if token changes
    


  // Function to handle button clicks and set the popup type
  const handleCellClick = (type) => {
    setSelectedType(type);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedType(null);
  };

  React.useEffect(() => {
    const fetchPatientData = async () => {
      if (!token) {
        console.error("Token is missing!");
        return;
      }

      try {
        // Pass both the URL and the token to fetchWithToken
        const data = await fetchWithToken("http://localhost:8081/patients", token, {
          method: "GET",
        });

        console.log("Received data:", data);  // Log the data received from the backend
        setPatient(data);  // Set the patient data

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatientData();  // Call the fetch function when component mounts

  }, [token]);  // Re-run if token changes

  React.useEffect(() => {
    const fetchPatientData = async () => {
      if (!token) {
        console.error("Token is missing!");
        return;
      }

      try {
        // Pass both the URL and the token to fetchWithToken
        const data = await fetchWithToken("http://localhost:8081/patients/generalInfo", token, {
          method: "GET",
        });

        console.log("Received data:", data);  // Log the data received from the backend
        setGeneralInfo(data);  // Set the patient data

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatientData();  // Call the fetch function when component mounts

  }, [token]);  // Re-run if token changes

  // Preload all images in the directory
  const images = require.context('../profile-pics', false, /\.jpg$/);

  let profile_pic;
  try {
    profile_pic = images(`./${token}.jpg`);
  } catch (error) {
    profile_pic = images(`./default.jpg`); // Fallback image
  }
  

  return (
    <div className="Main-container">
      <div className="profile-card">
        <div className="left-profile-card">
          <p>ID: {patient?.id || "Loading..."}</p>
          <p>Name: {patient?.name || "Loading..."}</p>
          <p>Age: {patient?.age || "Loading..."}</p>
          <p>Medical Condition: {patient?.medicalCondition || "Loading..."}</p>
        </div>

        <div className="right-profile-card">
          <img src={profile_pic} className="profile-pic" alt="profile-pic" />
          <p>Status: {patient ? "Good" : "Loading status..."}</p>
        </div>
      </div>

              {/* Table with clickable cells */}
        <div className="table">
          <div className="row">
            <div className="cell" onClick={() => handleCellClick('Activities')}>Activities</div>
            <div className="cell" onClick={() => handleCellClick('medicaments')}>Medicaments</div>
          </div>
          <div className="row">
            <div className="cell" onClick={() => handleCellClick('Sleep')}>Sleep</div>
            <div className="cell" onClick={() => handleCellClick('Meals')}>Meals</div>
          </div>
        </div>

        {selectedType && (
        <PopupElements type={selectedType} onClose={handleClosePopup} GeneralInfo = {generalInfo}/>
      )}

    </div>
  );
}

export default Profile;
