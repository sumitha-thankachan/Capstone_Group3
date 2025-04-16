import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import "../login.css";
import '../App';
import Header from './Header';
import Footer from './footer';
import { Filter } from 'bad-words';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      alert("Your message contains inappropriate language. Please revise it.");
    } else {
      alert("Message submitted successfully!");
      // Clear or send form data here
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      <Container className="py-5">
        {/* Contact Us Section */}
        <div className="contact-us">
          <h2 className="text-center mb-4">Contact Us</h2>

          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">Get in Touch</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formFirstName" className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="input-field"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formLastName" className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="input-field"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                      <Form.Label>Phone (Optional)</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </Form.Group>
                    <Form.Group controlId="formMessage" className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter your message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 btn-custom">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Direct Contact Information */}
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card className="p-4 border-0 shadow-sm bg-light rounded-3 direct-contact">
              <Card.Body>
                <h4 className="mb-3">Direct Contact</h4>
                <p><FaMapMarkerAlt /> <strong>Address:</strong> 123 Elderly Home Road, Kitchener, Canada, N2C 1G9</p>
                <p><FaPhoneAlt /> <strong>Phone:</strong> +1 (123) 456-7890</p>
                <p><FaEnvelope /> <strong>Email:</strong> support@elderlyhome.com</p>
                <p><strong>Working Hours:</strong> Monday to Friday, 9 AM - 5 PM</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
