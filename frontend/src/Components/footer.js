import React from "react";
import "../App";

 const Footer = () => {
    return (
        <div className="footer">
            <div className="firstsection_footer">
            <h5>Follow us on</h5>
            <div className="footer_images">
            <img className="footer_logo" src={require("../Components/Assets/facebook-logo.png")} alt="facebook logo" />
            <img className="footer_logo" src={require("../Components/Assets/instagram-logo.png")} alt="instagram logo" />
            <img className="footer_logo" src={require("../Components/Assets/twitter-logoo.png")} alt="twitter logo" />
            </div>
        </div>
        <div className="middlesection_footer">
            <p>Thank you for choosing Home. Together, let's bring comfort and care to our cherished seniors.</p>
            <a href="#"><button className="button primary-btn" >Learn More</button></a>
        </div>
        <div className="lastsection_footer">
            <nav>
                <a href="/Home">Home</a>
                <a href="/Registration">Registration</a>
                <a href="/admin-dashboard">Dashboard</a>
                <a href="/Tasks">Tasks</a>
                <a href="/Financial">Financial</a>
            </nav>
        </div>
        </div>
    )
}

export default Footer