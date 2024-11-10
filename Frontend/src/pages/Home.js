import React from 'react';
import './Home.css'; // Updated to reflect the new name
import logo from "../images/elder-logo.png"

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo">
        <img src={logo} className="logo-img" alt="profile-pic" />
      </div>
      <div className='title'>Welcome to Elder</div>
      <p>
        Elder is a user-friendly portal providing real-time insights into daily schedules, activities, meals, and treatments for your loved ones in care.
      </p>
      <button className="visit-page-button" onClick={() => window.location.href = '/auth'}>
        Get your details now!
      </button>
    </div>
  );
};

export default Home;