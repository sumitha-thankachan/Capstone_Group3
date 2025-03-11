import React from 'react';
import Header from './Header';
import Footer from "./footer";
import { Container, Row, Col } from 'react-bootstrap';
import "../login.css";
import "../App";


function Home() {
  return (
    <div>
      <Header />
      <Container className = "home-container">
        <section className= "welcome-session">
          <h1> Welcome to Home</h1>
          <p>A platform to simplify elderly home managament, resident activities.</p>
          <div className="buttons">
            <button className="button primary-btn">Login</button>
            <button className="button secondary-btn">Sign Up</button>
          </div>
        </section>
        {/* Quote Section */}
        <section className="quote-section">
          <blockquote>
            <p>"Caring for those who once cared for us."</p>
            <cite>- Group 3</cite>
          </blockquote>
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
              <h3>Activity Tracking</h3>
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
      <Footer />
      </div>
  )
}

export default Home;