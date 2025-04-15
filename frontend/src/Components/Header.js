import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from './Assets/home_copy.png';
import "./Header.css";

function Header() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserType(null);
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" className="navbar-custom shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className="brand d-flex align-items-center">
          <img src={logo} width="45" height="45" alt="Logo" className="rounded-circle"/>
          <span className="brand-text ms-2">Home</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto nav-links">
            {userType === "Admin" && (
              <>
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/Caregiver-list">Caregivers</Nav.Link>
                <Nav.Link as={NavLink} to="/admin-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/patients">Patients</Nav.Link>
                <Nav.Link as={NavLink} to="/Tasks">Tasks</Nav.Link>
                <Nav.Link as={NavLink} to="/Financial">Financial</Nav.Link>
                <Nav.Link as={NavLink} to="/room-management">Rooms</Nav.Link>
              </>
            )}

            {userType === "Caregiver" && (
              <>
                <Nav.Link as={NavLink} to="/caregiver-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/Registration">Registration</Nav.Link>
                <Nav.Link as={NavLink} to="/change-password">Change Password</Nav.Link>
                <Nav.Link as={NavLink} to="/my-tasks"> My Tasks</Nav.Link>
              </>
            )}

            {userType === "Patient" && (
              <>
                <Nav.Link as={NavLink} to="/patient-dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/patient-registration">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/change-password">Change Password</Nav.Link>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/patient-financial">Financial</Nav.Link>              </>
            )}

            {!userType && (
              <>
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about-us">About Us</Nav.Link>
                <Nav.Link as={NavLink} to="/contact-us">Contact Us</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {!userType ? (
              <Button as={NavLink} to="/login-signup" className="header-btn">
                Login / SignUp
              </Button>
            ) : (
              <Button onClick={handleLogout} className="header-btn">
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
