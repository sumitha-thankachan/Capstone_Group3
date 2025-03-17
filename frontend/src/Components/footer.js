import React, { useEffect, useState } from "react";
import "../App";

const Footer = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Get userType from localStorage
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <div className="footer">
      <div className="firstsection_footer">
        <h5>Follow us on</h5>
        <div className="footer_images">
          <img
            className="footer_logo"
            src={require("../Components/Assets/facebook-logo.png")}
            alt="facebook logo"
          />
          <img
            className="footer_logo"
            src={require("../Components/Assets/instagram-logo.png")}
            alt="instagram logo"
          />
          <img
            className="footer_logo"
            src={require("../Components/Assets/twitter-logoo.png")}
            alt="twitter logo"
          />
        </div>
      </div>

      <div className="middlesection_footer">
        <p>
          Thank you for choosing Home. Together, let's bring comfort and care
          to our cherished seniors.
        </p>
        <a href="#">
          <button className="button primary-btn">Learn More</button>
        </a>
      </div>

      <div className="lastsection_footer">
        <nav>
          {/* Admin Links */}
          {userType === "Admin" && (
            <>
              <a href="/home">Home</a>
              <a href="/Caregiver-list">Caregiver List</a>
              <a href="/admin-dashboard">Dashboard</a>
              <a href="/Tasks">Tasks</a>
              <a href="/Financial">Financial</a>
            </>
          )}

          {/* Caregiver Links */}
          {userType === "Caregiver" && (
            <>
              <a href="/Registration">Registration</a>
            </>
          )}

            {userType === "Patient" && (
            <>
                <a href="/">Patient Registration</a>
            </>
          )}

          {/* Visitor (No userType) Links */}
          {!userType && (
            <>
              <a href="/home">Home</a>
              <a href="/about-us">About Us</a>
              <a href="/contact-us">Contact Us</a>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Footer;
