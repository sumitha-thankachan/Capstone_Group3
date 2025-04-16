import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './footer';
import './about.css';

// Replace with actual paths to your images
import visionImg from './Assets/homebg1_edit.png';
import missionImg from './Assets/homebg1_edit.png';
import asif from "./Assets/asif1.jpg";
import karthik from "./Assets/karthik.png";
import sumitha from "./Assets/tithi_patel.jpg";
import tithi from "./Assets/tithi_patel.jpg";

function AboutUs() {
  return (
    <>
      <Header />

      {/* Banner Section */}
      <section className="about-banner text-center text-white">
        <div className="banner-overlay">
          <h1 className="banner-heading">About Us</h1>
        </div>
      </section>

      <Container className="my-5 py-4">

        {/* Vision Section */}
        <section className="section-box shadow-sm p-4 mb-5">
          <Row className="align-items-center">
            <Col md={6}>
              <img src={visionImg} alt="Our Vision" className="img-fluid rounded shadow-sm" />
            </Col>
            <Col md={6}>
              <h3 className="section-header">Our Vision</h3>
              <p>
                Our vision is to revolutionize elderly care management, establishing new standards for caregiving efficiency and resident satisfaction.
              </p>
            </Col>
          </Row>
        </section>

        {/* Our Mission Section */}
        <section className="section-box shadow-sm p-4 mb-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="section-header">Our Mission</h3>
              <p>
                Dedicated to empowering caregivers with intuitive tools, enhancing communication, and improving overall quality of life.
              </p>
            </Col>
            <Col md={6}>
              <img src={missionImg} alt="Our Mission" className="img-fluid rounded shadow-sm" />
            </Col>
          </Row>
        </section>

        {/* How We Help Section */}
        <section className="section-box shadow-sm p-4 mb-5">
          <h3 className="section-header text-center mb-4">How We Help</h3>
          <Row>
            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title>Resident & Caregiver Management</Card.Title>
                  <Card.Text>
                    Easily manage detailed profiles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title>Task Scheduling</Card.Title>
                  <Card.Text>
                    Simplify daily and weekly task management.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title>Secure Records</Card.Title>
                  <Card.Text>
                    Maintain secure, transparent medical & financial records.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Our Team Section */}
        <section className="section-box shadow-sm p-4 mb-5">
          <h3 className="section-header text-center mb-4">Meet Our Team</h3>
          <Row className="text-center">
          {[
              { img: asif, name: "Asif Mujeeb", github: "https://github.com/asifmujeeb" },
              { img: karthik, name: "Karthik Janardhanan", github: "https://github.com/karthikjanardhanan" },
              { img: sumitha, name: "Sumitha Thankachan", github: "https://github.com/sumitha-thankachan" },
              { img: tithi, name: "Tithi Patel", github: "https://github.com/Tithi306" }
            ].map(member => (
              <Col md={3} key={member.name}>
              <img src={member.img} alt={member.name} className="team-img" />
              <h5 className="mt-3">{member.name}</h5>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
              {member.github}
              </a>
              </Col>
              ))}
          </Row>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default AboutUs;
