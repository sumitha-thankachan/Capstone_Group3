import React from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import "../login.css";

function Home() {
  return (
    <div>
      <Header />
      <Container className = "home-container">
        <section className= "welcome-session">
          <h1> Welcome to Home</h1>
          <p>A platform to simplify elderly home managament, resident activities.</p>
          <div className="buttons">
            <button className="button">Login</button>
            <button>Sign Up</button>
          </div>
        </section>
        <section className= "features-session">
          <h2>Why Choose Home?</h2>
          <Row>
            <Col md={4}>
            <div className="feature">
              <h3>Home Management</h3>
              <p>Manage all aspeact of Home.</p>
            </div>
            </Col>
            <Col md={4}>
            <div className="feature">
              <h3>Activity Trackimg</h3>
              <p>Monitor and track resident activities.</p>
            </div>
            </Col>
            <Col md={4}>
            <div className="feature">
              <h3>Secure Records</h3>
              <p>Keep financial records safe.</p>
            </div>
            </Col>
          </Row>
          </section>

      </Container>
      </div>
  )
}

export default Home;