import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", userType: "Caregiver" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = action === "Sign Up" ? "http://localhost:5000/api/auth/signup" : "http://localhost:5000/api/auth/login";
      const { data } = await axios.post(url, formData);

      localStorage.setItem("token", data.token);

      alert(`${action} successful!`);

      // Redirect based on userType
      if (data.user.userType === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/caregiver-dashboard");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container-login">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        {action === "Sign Up" && (
          <div className="input">
            <select name="userType" onChange={handleChange}>
              <option value="Caregiver">Caregiver</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>{action}</div>
        <div className="submit gray" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
          {action === "Login" ? "Sign Up" : "Login"}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
