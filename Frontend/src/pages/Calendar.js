import React, { useState, useEffect } from 'react';
import "../pages/Calendar.css";
import fetchWithToken from '../session/FetchWithToken';  // Make sure to import the fetchWithToken helper
import { useSession } from '../session/Session';  // Import useSession
import { useNavigate } from "react-router-dom";

const today = new Date();
const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() + index);
    return date;
});

function Calendar() {
    const [selectedDay, setSelectedDay] = useState(days[0].toLocaleString('en-us', { weekday: 'short' }));
    const [activitiesInfo, setActivitiesInfo] = useState([]);
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
      
    React.useEffect(() => {
        const fetchPatientData = async () => {
          if (!token) {
            console.error("Token is missing!");
            return;
          }
    
          try {
            // Pass both the URL and the token to fetchWithToken
            const data = await fetchWithToken("http://localhost:8081/patients/activities", token, {
              method: "GET",
            });
    
            // Transform data to match timetableData structure
            const transformedData = data.map((activity) => ({
                day: new Date(activity.date).toLocaleString('en-us', { weekday: 'short' }),
                time: activity.startTime.slice(0, 5), // Extracts HH:MM format
                activities: [activity.activityName]
            }));

            console.log("Received data:", data);  // Log the data received from the backend
            setActivitiesInfo(transformedData);  // Set the patient data
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchPatientData();  // Call the fetch function when component mounts
    
      }, [token]);  // Re-run if token changes

    const handleDayClick = (day) => {
        const dayOfWeek = day.toLocaleString('en-us', { weekday: 'short' });
        setSelectedDay(dayOfWeek);
    };

    const filteredTimetableData = activitiesInfo.filter(entry => entry.day === selectedDay);

    console.log(filteredTimetableData);

    return (  
        <div className="Main-container">
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
        </div>
    );
}

export default Calendar;
