import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import Header from "./Header";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email"); 
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      if (!token || !userType) {
        setMessage("Unauthorized: Please log in first.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          if (userType === "Caregiver") {
            navigate("/caregiver-dashboard");
          } else if (userType === "Patient") {
            navigate("/patient-dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      }
    } catch (error) {
      setMessage("Error changing password.");
      console.error("Error:", error);
    }
  };

  return (
    <>
     <Header />

      <Container className="mt-5">
        <h2 className="text-center">Change Password</h2>

        {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}

        <Form onSubmit={handleChangePassword} className="p-4 border rounded shadow-sm bg-light">
          {/* ✅ Display Email in Read-Only Format */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} readOnly />
          </Form.Group>

          {/* ✅ Old Password Input */}
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* ✅ New Password Input */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Update Password
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ChangePassword;
