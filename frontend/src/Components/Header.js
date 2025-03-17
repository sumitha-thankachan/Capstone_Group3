import React, { useState, useEffect } from 'react';
import "../App";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from './Assets/logo.png';

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
    window.location.reload(); // Refresh page to update navbar
  };

  return (
    <Navbar bg="light" className='text-dark' data-bs-theme="dark">
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
              <NavLink className='text-secondary fw-bold' to="/home">Home</NavLink>
              <NavLink className='text-secondary fw-bold' to="/Caregiver-list">Caregiver List</NavLink>
              <NavLink className='text-secondary fw-bold' to="/admin-dashboard">Dashboard</NavLink>
              <NavLink className='text-secondary fw-bold' to="/Tasks">Tasks</NavLink>
              <NavLink className='text-secondary fw-bold' to="/Financial">Financial</NavLink>
            </>
          )}

          {/* Caregiver Links */}
          {userType === "Caregiver" && (
            <>
              <NavLink className='text-secondary fw-bold' to="/Registration">Registration</NavLink>
            </>
          )}

          {/* Visitor (No userType) Links */}
          {!userType && (
            <>
              <NavLink className='text-secondary fw-bold' to="/Home">Home</NavLink>
              <NavLink className='text-secondary fw-bold' to="/About">About Us</NavLink>
              <NavLink className='text-secondary fw-bold' to="/Contact">Contact Us</NavLink>
            </>
          )}
        </Nav>
      </Container>

      {/* Login/Logout Button */}
      <Container>
        {!userType ? (
          <Button className='btn btn-light text-dark me-5' as={NavLink} to="/login-signup">
            Login/SignUp
          </Button>
        ) : (
          <Button className='btn btn-light text-dark me-5' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
