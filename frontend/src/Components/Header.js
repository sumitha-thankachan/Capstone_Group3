import React from 'react'
import "../App";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from './Assets/logo.png'
function Header() {
  return (
    <>
<Navbar bg="light" className='text-dark' data-bs-theme="dark">
<Container>
          <Navbar.Brand href="#home">
          <img src={logo} 
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
       

          <Nav className="me-auto text-dark navbar-header">
            <NavLink className='text-secondary fw-bold' to="/Home">Home</NavLink>
            <NavLink className='text-secondary fw-bold' to="/Registration">Registration</NavLink>
            <NavLink className='text-secondary fw-bold' to="/admin-dashboard">Dashboard</NavLink>
            <NavLink className='text-secondary fw-bold' to="/Tasks">Tasks</NavLink>
            <NavLink className='text-secondary fw-bold' to="/Financial">Financial</NavLink>
          </Nav>
        </Container>
        <Button className='btn btn-light text-dark me-5' type="submit">Login/SignUp</Button>
      </Navbar>
    </>
  )
}

export default Header