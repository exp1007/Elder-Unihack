import React from "react";
import "./Main.css";
import "./Patients.css";
import { getCookieValue } from "../session/Cookies";
import PopupElements from "../components/PopupElement";  // Import PopupElements
import { useNavigate } from "react-router-dom";

const today = new Date();
const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    return date;
});

function Patients() {
  const [patients, setPatients] = React.useState([]);
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [patientDetails, setPatientDetails] = React.useState(null); // State for patient details fetched with tokenCode
  const [generalInfo, setGeneralInfo] = React.useState(null); // Initialize as null
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [tokenValid, setTokenValid] = React.useState(false); // Track if token is valid
  const [selectedDay, setSelectedDay] = React.useState(days[0].toLocaleString('en-us', { weekday: 'short' }));
  const [calendarInfo, setActivitiesInfo] = React.useState([]);
  const navigate = useNavigate();

  // Fetch patient data on component mount
  React.useEffect(() => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
      // If no JWT token, redirect to authentication page
      navigate("/auth");
      return;
    }

    // If the token exists, validate it (optionally you can verify it with the backend)
    setTokenValid(true);

    const fetchPatientData = async () => {
      try {
        const response = await fetch("http://localhost:8081/patients?accessUser=exp", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 403) {
          navigate("/auth");
          return;
        }

        const data = await response.json();

        // Extract only tokenCode and name
        const extractedData = data.map((patient) => ({
          tokenCode: patient.tokenCode,
          name: patient.name,
        }));

        setPatients(extractedData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchPatientData();
  }, [navigate]);

// Handle button click for a specific patient
const handleSelectPatient = async (tokenCode) => {
  const jwt = getCookieValue("JWT");
  if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
  }

  setSelectedPatient(tokenCode);
  console.log(`Selected patient with tokenCode: ${tokenCode}`);

  // Fetch detailed data for the selected patient using their tokenCode
  try {
    const response = await fetch(`http://localhost:8081/patients?tokenCode=${tokenCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 403) {
      navigate("/auth");
      return;
    }
    
    const patientData = await response.json();
    console.log("Patient: " + patientData);
    setPatientDetails(patientData); // Assuming response is an array with one object (the selected patient)
  } catch (error) {
    console.error("Error fetching patient details:", error);
  }

  try {
    // Fetch general info for the selected patient
    const response = await fetch(`http://localhost:8081/patients/generalInfo?tokenCode=${tokenCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 403) {
      navigate("/auth");
      return;
    }

    const generalInfoData = await response.json();  // Parse the JSON data
    console.log("Received general info data:", generalInfoData);  // Log the data received from the backend
    setGeneralInfo(generalInfoData);  // Set the general info data

  } catch (error) {
    console.error("Error fetching general info:", error);
  }

  try {
    const response = await fetch(`http://localhost:8081/patients/activities?tokenCode=${tokenCode}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json(); // Parse the response body as JSON
  
    // Transform data to match timetableData structure
    const transformedData = data.map((activity) => ({
      day: new Date(activity.date).toLocaleString('en-us', { weekday: 'short' }),
      time: activity.startTime.slice(0, 5), // Extracts HH:MM format
      activities: [activity.activityName],
    }));
  
    console.log("Transformed data:", transformedData); // Log the transformed data
    setActivitiesInfo(transformedData); // Set the transformed data into state
  
  } catch (error) {
    console.error("Error fetching data:", error);
  }  
};
  
const filteredTimetableData = calendarInfo.filter(entry => entry.day === selectedDay);

  // Function to handle cell clicks
  const handleCellClick = (type) => {
    setSelectedType(type);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedType(null);
  };

  const handleDayClick = (day) => {
    const dayOfWeek = day.toLocaleString('en-us', { weekday: 'short' });
    setSelectedDay(dayOfWeek);
};

  // If token is not valid or loading, render a loading state or nothing
  if (!tokenValid || loading) {
    return; // Display a loading message or nothing
  }

  return (
    <div className="Main-container">
      {/* Patients List */}
      <div className="patients-list">
        {patients.map((patient) => (
          <div className="user-row" key={patient.tokenCode}>
            <p>{patient.name}</p>
            <button onClick={() => handleSelectPatient(patient.tokenCode)}>Select</button>
          </div>
        ))}
      </div>

      {patientDetails && (
        <div className="profile-card">
          <div className="left-profile-card">
            <p>ID: {patientDetails.tokenCode || "Loading..."}</p>
            <p>Name: {patientDetails.name || "Loading..."}</p>
            <p>Age: {patientDetails.age || "Loading..."}</p>
            <p>Medical Condition: {patientDetails.medicalCondition || "Loading..."}</p>
          </div>

          <div className="right-profile-card">
            <img src={require(`../profile-pics/${patientDetails.tokenCode}.jpg`)} className="profile-pic" alt="profile-pic" />
            <p>Status: {patientDetails ? "Good" : "Loading status..."}</p>
          </div>
        </div>
      )}

      {generalInfo && (      
        <div className="table">
        <div className="row">
          <div className="cell" onClick={() => handleCellClick("Activities")}>Activities</div>
          <div className="cell" onClick={() => handleCellClick("Medicaments")}>Medicaments</div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => handleCellClick("Sleep")}>Sleep</div>
          <div className="cell" onClick={() => handleCellClick("Meals")}>Meals</div>
        </div>
      </div>
    )}

  {calendarInfo[0] && (
   <div className="calendar-form">
   <div className="left-calendar-form">
       <div className="days-container">
           <h2>Next 7 Days</h2>
           <ul>
               {days.map((day, index) => (
                   <li key={index} onClick={() => handleDayClick(day)}>
                       {day.toDateString()}
                   </li>
               ))}
           </ul>
       </div>
   </div>

      <div className="right-calendar-form">
          <div className="timetable">
              {filteredTimetableData.length === 0 ? (
                  <p>No activities for {selectedDay}</p>
              ) : (
                  filteredTimetableData.map((entry, index) => (
                      <div key={index} className="timetable-row">
                          <div className="time-zone">
                              <div className="dots"></div>
                              <span className="time">{entry.time}</span>
                          </div>

                          <div className="activities">
                              {entry.activities.map((activity, i) => (
                                  <div key={i} className="activity">
                                      {activity}
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))
              )}
          </div>
      </div>
    </div>
  )}
  
      {selectedType && (
        <PopupElements type={selectedType} onClose={handleClosePopup} GeneralInfo = {generalInfo}/>
      )}
    </div>
  );
}

export default Patients;
