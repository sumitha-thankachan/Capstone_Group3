import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../login.css";
import '../App';
import Header from './Header';
import Footer from './footer';


function ContactUs() {
  return (
    <div>
        <Header/>
      <Container className="contact-container">
        <h2>Contact Us</h2>

        {/* Contact Form */}
        <section className="contact-form">
          <h3>Get in Touch</h3>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter first name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter last name" required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone (Optional)</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter your message" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </section>

        {/* Direct Contact Information */}
        <section className="direct-contact">
          <h3>Direct Contact</h3>
          <p><strong>Address:</strong> 123 Elderly Home Road, Kitchener, Canada, N2C 1G9</p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Email:</strong> support@elderlyhome.com</p>
          <p><strong>Working Hours:</strong> Monday to Friday, 9 AM - 5 PM</p>
        </section>
      </Container>
      <Footer/>
    </div>
  );
}

export default ContactUs;