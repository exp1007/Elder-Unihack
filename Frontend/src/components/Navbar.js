import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // For styling the navbar
import logo from "../images/elder-logo-white.png"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} className="logo-img" alt="profile-pic"></img>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;