import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">

      <div className="contact-info">
        <div className="info-item">
          <h2>Phone Number</h2>
          <p>+1 (123) 456-7890</p>
        </div>

        <div className="info-item">
          <h2>Email</h2>
          <p>contact@example.com</p>
        </div>

        <div className="info-item">
          <h2>Address</h2>
          <p>1234 Street Name, City, State, 56789</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;