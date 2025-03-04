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
          {/* Client Feedback Section */}
        <section className="client-feedback-section">
          <h2>What Our Clients Say</h2>
          <div className="feedback-container">
            <div className="feedback-item">
              <p>"This platform has been a game-changer for managing our elderly home. Highly recommended!"</p>
              <cite>- Harsh</cite>
            </div>
            <div className="feedback-item">
              <p>"The activity tracking feature is incredibly useful. It helps us keep our residents engaged and happy."</p>
              <cite>- Purvi</cite>
            </div>
            <div className="feedback-item">
              <p>"The secure records feature gives us peace of mind. We can trust this platform with our residents' information."</p>
              <cite>- Parth</cite>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
      </div>
  )
}

export default Home;