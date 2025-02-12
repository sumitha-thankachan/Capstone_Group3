import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from './Assets/logo.png'
function Header() {
  return (
    <>
<Navbar bg="primary" data-bs-theme="dark">
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
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
       

          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
        <Button className='btn btn-light text-dark me-5' type="submit">Login/SignUp</Button>
      </Navbar>
    </>
  )
}

export default Header