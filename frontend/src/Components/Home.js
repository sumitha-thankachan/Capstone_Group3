import React from "react";
import Header from "./Header";
import Footer from "./footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import heroImage from "./Assets/homebg1_edit.png";
import aboutImage from "./Assets/about-us.jpg";
import "./home.css";

const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <Container className="text-center text-white">
          <h1 className="hero-title">Welcome to Home</h1>
          <p className="hero-subtitle">
            Simplify elderly home management and resident activities seamlessly.
          </p>
          {/* <div className="hero-buttons">
            <Button variant="primary" size="lg" className="me-2">Login</Button>
            <Button variant="outline-light" size="lg">Sign Up</Button>
          </div> */}
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={aboutImage}
                className="img-fluid rounded shadow-lg"
                alt="About Home"
              />
            </Col>
            <Col md={6}>
              <h2 className="section-title">About Us</h2>
              <p className="section-text">
                Wealth Home Health Services is a northern Virginia-based home
                care agency licensed by the Virginia Department of Health,
                Office of Licensure and Certification. Our mission is clear: to
                deliver compassionate care tailored specifically for your loved
                ones.
              </p>
              {/* <Button className="header-btn">Learn More</Button> */}
              <div className="text-center mt-4">
                <Button className="header-btn width">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quote Section */}
      <section className="quote-section py-4 text-center">
        <Container>
          <blockquote>"Caring for those who once cared for us."</blockquote>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Why Choose Home?</h2>
          <Row>
            <Col md={4}>
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>Home Management</Card.Title>
                  <Card.Text>
                    Easily manage all aspects of home operations with
                    user-friendly tools.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>Activity Tracking</Card.Title>
                  <Card.Text>
                    Effortlessly track and monitor resident activities in
                    real-time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card shadow-sm">
                <Card.Body>
                  <Card.Title>Secure Records</Card.Title>
                  <Card.Text>
                    Ensure records remain confidential and secure at all times.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section text-center text-white py-5">
        <Container>
          <h2 className="mb-3">
            We're here to help you get back on your feet quickly.
          </h2>
          <Button variant="warning" size="lg" className="me-2">
            Call Us Today
          </Button>
          <Button variant="outline-light" size="lg">
            Schedule Appointment
          </Button>
        </Container>
      </section>

      {/* Enhanced Testimonials Section */}
      {/* <section className="testimonials-section py-5 bg-light">
  <Container>
    <h2 className="text-center mb-5">What Our Clients Say</h2>
    <Row className="justify-content-center">
      <Col md={4} className="d-flex justify-content-center">
        <Card className="testimonial-card shadow text-center">
          <Card.Body>
            <div className="testimonial-img-container">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="testimonial-img" alt="Jane Doe"/>
            </div>
            <Card.Text className="mt-4">
              "Wonderful services and compassionate care."
            </Card.Text>
            <Card.Footer className="text-muted bg-transparent border-0">— Jane Doe</Card.Footer>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="d-flex justify-content-center">
        <Card className="testimonial-card shadow text-center">
          <Card.Body>
            <div className="testimonial-img-container">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="testimonial-img" alt="John Smith"/>
            </div>
            <Card.Text className="mt-4">
              "The staff is always professional and caring."
            </Card.Text>
            <Card.Footer className="text-muted bg-transparent border-0">— John Smith</Card.Footer>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} className="d-flex justify-content-center">
        <Card className="testimonial-card shadow text-center">
          <Card.Body>
            <div className="testimonial-img-container">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" className="testimonial-img" alt="Emily White"/>
            </div>
            <Card.Text className="mt-4">
              "I highly recommend their services."
            </Card.Text>
            <Card.Footer className="text-muted bg-transparent border-0">— Emily White</Card.Footer>
          </Card.Body>
        </Card>
      </Col>

      
    </Row>
  </Container>
</section> */}

      <section className="testimonials-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Our Clients Say</h2>
          <Row className="justify-content-center">
            <Col md={3} className="d-flex justify-content-center mb-5">
              <Card className="testimonial-card shadow text-center">
                <Card.Body>
                  <div className="testimonial-img-container">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      className="testimonial-img"
                      alt="Jane Doe"
                    />
                  </div>
                  <Card.Text className="mt-4">
                    "Wonderful services and compassionate care."
                  </Card.Text>
                  <Card.Footer className="text-muted bg-transparent border-0">
                    — Jane Doe
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="d-flex justify-content-center mb-5">
              <Card className="testimonial-card shadow text-center">
                <Card.Body>
                  <div className="testimonial-img-container">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      className="testimonial-img"
                      alt="John Smith"
                    />
                  </div>
                  <Card.Text className="mt-4">
                    "The staff is always professional and caring."
                  </Card.Text>
                  <Card.Footer className="text-muted bg-transparent border-0">
                    — John Smith
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="d-flex justify-content-center mb-5">
              <Card className="testimonial-card shadow text-center">
                <Card.Body>
                  <div className="testimonial-img-container">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      className="testimonial-img"
                      alt="Emily White"
                    />
                  </div>
                  <Card.Text className="mt-4">
                    "I highly recommend their services."
                  </Card.Text>
                  <Card.Footer className="text-muted bg-transparent border-0">
                    — Emily White
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="d-flex justify-content-center mb-5">
              <Card className="testimonial-card shadow text-center">
                <Card.Body>
                  <div className="testimonial-img-container">
                    <img
                      src="https://randomuser.me/api/portraits/men/45.jpg"
                      className="testimonial-img"
                      alt="Michael Brown"
                    />
                  </div>
                  <Card.Text className="mt-4">
                    "Excellent care and great support!"
                  </Card.Text>
                  <Card.Footer className="text-muted bg-transparent border-0">
                    — Michael Brown
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Home;
