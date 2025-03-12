import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../login.css";
import Header from './Header';
import Footer from './footer';

function AboutUs() {
  return (
    <div>
      <Header />
      <Container className="about-container">
        <h2>About Us</h2>

        {/* Who We Are */}
        <section className="who-we-are">
          <h3>Who We Are</h3>
          <p>
            Our platform is designed to simplify and enhance the management of elderly care. We aim to provide a comprehensive solution that streamlines daily operations, ensures efficient communication, and promotes the well-being of residents.
          </p>
        </section>

        {/* Our Mission */}
        <section className="our-mission">
          <h3>Our Mission</h3>
          <p>
            We built this system to enhance elderly care management by providing a reliable, user-friendly, and efficient platform. Our goal is to improve the quality of life for residents and support caregivers in their important work.
          </p>
        </section>

        {/* How We Help */}
        <section className="how-we-help">
          <h3>How We Help</h3>
          <Row>
            <Col md={4}>
              <div className="feature">
                <h4>Managing Residents and Caregivers</h4>
                <p>Efficiently manage resident and caregiver profiles, ensuring all information is up-to-date and accessible.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature">
                <h4>Scheduling Daily/Weekly Tasks</h4>
                <p>Create and manage schedules for daily and weekly tasks, ensuring smooth operations and accountability.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature">
                <h4>Tracking Medical and Financial Records</h4>
                <p>Keep detailed records of medical and financial information, ensuring transparency and ease of access.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Our Team */}
        <section className="our-team">
          <h3>Our Team</h3>
          <Row>
            <Col md={3}>
              <div className="team-member">
                <img src="/path-to-team-member-image.jpg" alt="Asif Mattanayil Mujeeb" className="team-image" />
                <h4>Asif Mattanayil Mujeeb</h4>
              </div>
            </Col>
            <Col md={3}>
              <div className="team-member">
              <img className="team-image" src={require("../Components/Assets/karthik.png")} alt="Karthik Janardhanan" />
                <h4>Karthik Janardhanan</h4>
              </div>
            </Col>
            <Col md={3}>
              <div className="team-member">
                <img src="/path-to-team-member-image.jpg" alt="Sumitha Thankachan" className="team-image" />
                <h4>Sumitha Thankachan</h4>
              </div>
            </Col>
            <Col md={3}>
              <div className="team-member">
                <img className="team-image" src={require("../Components/Assets/tithi_patel.jpg")} alt="Tithi Patel" />
                <h4>Tithi Patel</h4>
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
  );
}

export default AboutUs;