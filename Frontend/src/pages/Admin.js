import React, { useState, useEffect } from "react";
import "./Admin.css";
import { getCookieValue } from "../session/Cookies";
import { useNavigate } from "react-router-dom";

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    medicalCondition: "",
    tokenCode: "",
  });

  const [weeklyData, setWeeklyData] = useState({
    dailyActiveHours: "",
    weeklyWorkoutSession: "",
    steptPerDay: "",
    medicines: "",
    averageSleepDuration: "",
    sleepQuality: "",
    deepSleepHours: "",
    dailyCaloriesIntake: "",
    proteinIntake: "",
    numberOfMeals: "",
  });

  const [patients, setPatients] = useState([]); // State to hold the list of patients
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing a patient
  const [editingIndex, setEditingIndex] = useState(null); // Index of the patient being edited
  const [selectedPatient, setSelectedPatient] = useState(""); // State to hold selected patient for user assignment
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [tokenValid, setTokenValid] = React.useState(false); // Track if token is valid
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch user list on component mount
  React.useEffect(() => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
        // If no JWT token, redirect to authentication page
        navigate("/auth");
        return;
    }

    const checkAdminRole = async () => {
        try {
            // Fetch username
            const usernameResponse = await fetch("http://localhost:8081/users/getUsername", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (usernameResponse.status === 403) {
                navigate("/auth");
                return;
            }

            const username = await usernameResponse.text(); // Parse response as plain text
            console.log("Fetched username:", username);

            // Fetch role using username
            const roleResponse = await fetch(`http://localhost:8081/users/getRole?username=${username}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (roleResponse.status === 403) {
                navigate("/auth");
                return;
            }

            const role = await roleResponse.text(); // Parse response as plain text
            console.log("Fetched role:", role);

            // Check if the user is an admin
            if (role !== "admin") {
                navigate("/auth");
                return;
            }

            setLoading(false);
            setTokenValid(true);


        } catch (error) {
            console.error("Error in checkAdminRole:", error);
        }
    };

    checkAdminRole();
}, [navigate]);



// Fetch user list on component mount
React.useEffect(() => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    const fetchUsers = async () => {
    try {
        const response = await fetch("http://localhost:8081/users/all", {
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

        setUsers(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
    };

    fetchUsers();
}, [navigate]);

React.useEffect(() => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    const fetchPatients = async () => {
    try {
        const response = await fetch("http://localhost:8081/patients", {
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

        setPatients(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
    };

    fetchPatients();
}, [navigate]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWeeklyChange = (e) => {
    const { name, value } = e.target;
    const [category, subfield] = name.split(".");

    if (subfield) {
      setWeeklyData({
        ...weeklyData,
        [category]: { ...weeklyData[category], [subfield]: value },
      });
    } else {
      setWeeklyData({ ...weeklyData, [name]: value });
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    // Generate random string for tokenCode
    const tokenCode = generateRandomString();

    // Create newPatient object with the formData and tokenCode
    const newPatient = {
        ...formData,
        tokenCode,
    };

    // Optionally, log or send the newPatient object
    console.log("New Patient:", newPatient);

    // Reset formData with a new random tokenCode
    setFormData({
        name: "",
        age: "",
        medicalCondition: "",
        tokenCode, // Assign the same tokenCode here
    });

    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch("http://localhost:8081/patients/add", {
        method: "POST",
        body : JSON.stringify(newPatient),
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

        setUsers(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleDeletePatient = async (tokenCode) => {

    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/patients/delete?tokenCode=${tokenCode}`, {
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

        setUsers(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleModifyPatient = (index) => {
    const patientToModify = patients[index];
    setFormData({
      name: patientToModify.name,
      age: patientToModify.age,
      medicalCondition: patientToModify.medicalCondition,
    });
    setWeeklyData(patientToModify.weeklyData);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleMakeAdmin = async (userId) => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/users/setRole?username=${userId}&role=admin`, {
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

        setUsers(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/users/setRole?username=${userId}&role=user`, {
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

        setUsers(data); // Populate the users list
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleAssignPatient = async (userId, tokenCode) => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/patients/updateAccessUser?tokenCode=${tokenCode}&accessUser=${userId}`, {
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

    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleRemovePatient = async (tokenCode) => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/patients/updateAccessUser?tokenCode=${tokenCode}&accessUser=null`, {
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

    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleRemoveUser = async (userId) => {
    const jwt = getCookieValue("JWT");
    if (!jwt) {
    // If no JWT token, redirect to authentication page
    navigate("/auth");
    return;
    }

    try {
        const response = await fetch(`http://localhost:8081/users/delete?username=${userId}`, {
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

    } catch (error) {
        console.error("Error fetching patients:", error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedPatientId = e.target.value;
    
    // Find the selected patient from the patients array
    const selected = patients.find(patient => patient.id === selectedPatientId);
    
    if (selected) {
      setSelectedPatient(selected); // Set the full patient object in state
      console.log("Selected Token Code:", selected.tokenCode); // Log the tokenCode
    } else {
      setSelectedPatient(null); // Handle cases where no valid patient is selected
    }
  };

    // If token is not valid or loading, render a loading state or nothing
    if (!tokenValid || loading) {
        return; // Display a loading message or nothing
      }

  return (
    <div className="admin-page">
      <div className="user-list">
        <h2>User List</h2>
        <div>
          {users.map((user, index) => (
            <div key={index} className="user-item">
                <div className="user-title">
                    {user.username} - {user.role} {/* Only display the user's name */}
                </div>
              
              <div className="user-actions">
                <button onClick={() => handleMakeAdmin(user.username)}>Make Admin</button>
                <button onClick={() => handleRemoveAdmin(user.username)}>Remove Admin</button> 
                <br></br>

                <select onChange={handleSelectChange}>
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                <br></br>

                <button onClick={() => handleAssignPatient(user.username, selectedPatient.tokenCode)}>Assign Patient</button>
                <button onClick={() => handleRemovePatient(selectedPatient.tokenCode)}>Remove Patient</button>
                <br></br>

                <button onClick={() => handleRemoveUser(user.username)}>Remove User</button>
              </div>
            </div>
          ))}
        </div>

        <div>
        <h2>Patient List</h2>
        <div>
          {patients.map((patient, index) => (
            <div key={index} className="patient-item">
                <div className="user-title">
                    {patient.name} ({patient.age}) - {patient.medicalCondition}
                </div>

              <div className="user-actions">
                <button onClick={() => handleDeletePatient(patient.tokenCode)}>Delete</button>
              </div>

            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="admin-container">
        <h1>Admin Page - {isEditing ? "Edit Patient" : "Add Patient"}</h1>
        <form onSubmit={handleAddPatient}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Medical Condition:</label>
            <input
              type="text"
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleInputChange}
              required
            />
          </div>

            {/*
                        <div className="weekly-section">
                <h2>Weekly Updates</h2>
                <div>
                <label>Daily Active Hours:</label>
                <input
                    type="text"
                    name="dailyActiveHours"
                    value={weeklyData.dailyActiveHours}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Weekly Workout Session:</label>
                <input
                    type="text"
                    name="weeklyWorkoutSession"
                    value={weeklyData.weeklyWorkoutSession}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Steps per Day:</label>
                <input
                    type="text"
                    name="steptPerDay"
                    value={weeklyData.steptPerDay}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Medicines:</label>
                <textarea
                    name="medicines"
                    value={weeklyData.medicines}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Average Sleep Duration:</label>
                <input
                    type="text"
                    name="averageSleepDuration"
                    value={weeklyData.averageSleepDuration}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Sleep Quality:</label>
                <input
                    type="text"
                    name="sleepQuality"
                    value={weeklyData.sleepQuality}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Deep Sleep Hours:</label>
                <input
                    type="text"
                    name="deepSleepHours"
                    value={weeklyData.deepSleepHours}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Daily Calories Intake:</label>
                <input
                    type="text"
                    name="dailyCaloriesIntake"
                    value={weeklyData.dailyCaloriesIntake}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Protein Intake:</label>
                <input
                    type="text"
                    name="proteinIntake"
                    value={weeklyData.proteinIntake}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>

                <div>
                <label>Number of Meals:</label>
                <input
                    type="text"
                    name="numberOfMeals"
                    value={weeklyData.numberOfMeals}
                    onChange={handleWeeklyChange}
                    required
                />
                </div>
            </div>
            */}

          <button type="submit">
            {isEditing ? "Update Patient" : "Add Patient"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminPage;
