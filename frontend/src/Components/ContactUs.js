import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from './Header';
import Footer from './footer';
import { Filter } from 'bad-words';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const filter = new Filter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter.isProfane(formData.message)) {
      alert("Your message contains inappropriate language.");
    } else {
      alert("Message sent successfully!");
      // Handle backend logic here
    }
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <Header />
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-2">Get in Touch</h2>
        <p className="text-center text-muted mb-4">
          We’d love to hear from you! Reach out to us with any questions or suggestions.
        </p>

        <div className="bg-white p-4 rounded-4 shadow" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Row>
            {/* Form */}
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="px-4"
                  style={{ backgroundColor: "#1abc9c", border: "none" }}
                >
                  SEND MESSAGE
                </Button>
              </Form>
            </Col>

            {/* Contact Info */}
            <Col md={6} className="ps-md-5 mt-4 mt-md-0">
              <h5 className="fw-bold">Contact Information</h5>
              <p><FaMapMarkerAlt className="me-2 " />123 Union, Waterloo, Canada</p>
              <p><FaPhoneAlt className="me-2 " />+1 (123) 456-7890</p>
              <p><FaEnvelope className="me-2 " />support@home.com</p>

           
              {/* Map */}
              <div className="ratio ratio-4x3 mt-3 rounded-2 overflow-hidden">
                
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.530896694389!2d-75.7000023!3d45.4215325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04fca74d053b%3A0xd3a4370cdcf5f3b4!2sParliament%20Hill!5e0!3m2!1sen!2sca!4v164556789"
  width="100%"
  height="250"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="Google Map"
/>

              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
