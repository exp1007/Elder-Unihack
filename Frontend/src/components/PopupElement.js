import React from 'react';
import '../components/PopupElement.css';  // Ensure this file contains styles for popup and overlay

const PopupElements = ({ type, onClose, GeneralInfo }) => {
  // Define statistics for each category
  const statistics = {
    Activities: [
      `Daily active hours: ${GeneralInfo?.dailyActiveHours || 'Loading...'}`,
      `Weekly workout sessions: ${GeneralInfo?.weeklyWorkoutSessions || 'Loading...'}`,
      `Steps per day: ${GeneralInfo?.stepsPerDay || 'Loading...'}`,
    ],
    medicaments: [
      `Medicaments: ${GeneralInfo?.medicaments || 'Loading...'}`,
    ],
    Sleep: [
      `Average sleep duration: ${GeneralInfo?.averageSleepDuration || 'Loading...'}`,
      `Sleep quality score: ${GeneralInfo?.sleepQuality || 'Loading...'}`,
      `Deep sleep hours: ${GeneralInfo?.deepSleepHours || 'Loading...'}`,
    ],
    Meals: [
      `Daily calorie intake: ${GeneralInfo?.dailyCaloriesIntake || 'Loading...'}`,
      `Protein intake: ${GeneralInfo?.proteinIntake || 'Loading...'}`,
      `Number of meals: ${GeneralInfo?.numberOfMeals || 'Loading...'}`,
    ]
  };

  // Get statistics for the selected type
  const statsForType = statistics[type] || ['Loading...'];

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Statistics for {type}</h3>
        <ul>
          {statsForType.map((stat, index) => (
            <li key={index}>{stat}</li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupElements;