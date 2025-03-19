import React, { useState, useEffect } from 'react';
import "../App";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from './Assets/home_copy.png';

function Header() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Get userType from localStorage
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token
    localStorage.removeItem("userType"); // Remove userType
    setUserType(null);  // Reset navbar state
   // window.location.reload(); // Refresh page to update navbar
   // Reset navbar state
    window.location.href = "/"; // Redirect to home page
  };

  return (
   <Navbar className='text-dark header-background' data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} 
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
          />
        </Navbar.Brand>
      </Container>

      <Container>
        <Nav className="me-auto text-dark navbar-header">
          {/* Admin Links */}
          {userType === "Admin" && (
            <>
              <NavLink className='text-light fw-bold' to="/home">Home</NavLink>
              <NavLink className='text-light fw-bold' to="/Caregiver-list">Caregiver List</NavLink>
              <NavLink className='text-light fw-bold' to="/admin-dashboard">Dashboard</NavLink>
              <NavLink className='text-light fw-bold' to="/patients">Patient</NavLink>
              <NavLink className='text-light fw-bold' to="/Tasks">Tasks</NavLink>
              <NavLink className='text-light fw-bold' to="/Financial">Financial</NavLink>
            </>
          )}

          
          {/* Caregiver Links */}
          {userType === "Caregiver" && (
            <>
              <NavLink className='text-secondary fw-bold' to="/caregiver-dashboard">Dashbord</NavLink>
              <NavLink className='text-secondary fw-bold' to="/Registration">Registration</NavLink>
              <NavLink className='text-secondary fw-bold' to="/change-password">Change Password</NavLink>
             
            </>
          )}
            {userType === "Patient" && (
            <>
                          <NavLink className='text-secondary fw-bold' to="/patient-dashboard">Dashbord</NavLink>

              <NavLink className='text-secondary fw-bold' to="/patient-registration">Patient Registration</NavLink>
              <NavLink className='text-secondary fw-bold' to="/change-password">Change Password</NavLink>
            </>
          )}

          {/* Visitor (No userType) Links */}
          {!userType && (
            <>
              <NavLink className='text-light fw-bold' to="/home">Home</NavLink>
              <NavLink className='text-light fw-bold' to="/about-us">About Us</NavLink>
              <NavLink className='text-light fw-bold' to="/contact-us">Contact Us</NavLink>
            </>
          )}
        </Nav>
      </Container>

      {/* Login/Logout Button */}
      <Container className='header_button'>
        {!userType ? (
          <Button className='btn btn-light text-dark me-5 header_button' as={NavLink} to="/login-signup">
            Login/SignUp
          </Button>
        ) : (
          <Button className='btn btn-light text-dark me-5 header_button' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
