import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import { HiArrowSmLeft } from "react-icons/hi";
import donationImage from "./Assets/donation.png";
import "../App";

function AddDonations() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="donation-container">
        <div className="image-wrapper">
          <div className="goBack_Button" onClick={() => navigate("/financial")}>
            <HiArrowSmLeft size={30} />
            <h4>Previous Page</h4>
          </div>
          <img
            src={donationImage}
            alt="Donation image which shows an idea of donate now"
            className="donation-image"
          />
        </div>

        <h2 className="donation-heading">Your Donation Will Provide...</h2>
        <div className="donation-options">
          <div className="donation-card">
            $50 <p>Could provide meals for a senior resident for one week</p>
          </div>
          <div className="donation-card">
            $150{" "}
            <p>
              Could cover medical expenses for one elderly resident for a month
            </p>
          </div>
          <div className="donation-card">
            $250{" "}
            <p>
              Would help with the cost of comfortable bedding and essentials for
              a resident
            </p>
          </div>
          <div className="donation-card">
            $500{" "}
            <p>
              Would allow us to organize recreational activities and social
              events for the elderly
            </p>
          </div>
          <div className="donation-card">
            $1000{" "}
            <p>
              Could support the renovation of common areas and improve living
              conditions for all residents
            </p>
          </div>
        </div>

        <h3 className="select-amount-heading">Select an Amount *</h3>
        <div className="donation-buttons">
          {["$100", "$150", "$250", "$500", "$1,000", "$5,000"].map(
            (amount, index) => (
              <button key={index} className="donation-btn">
                {amount}
              </button>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddDonations;
