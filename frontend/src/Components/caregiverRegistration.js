import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Header from "./Header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const CaregiverRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    experience: "",
    specialization: "",
  });
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      setFormData((prevFormData) => ({ ...prevFormData, email }));

      const fetchCaregiverDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/caregivers/${email}`);
          if (response.ok) {
            const caregiver = await response.json();
            setFormData({
              name: caregiver.name || "",
              age: caregiver.age || "",
              gender: caregiver.gender || "",
              contact: caregiver.contact || "",
              email: caregiver.email || email,
              address: caregiver.address || "",
              experience: caregiver.experience || "",
              specialization: caregiver.specialization || "",
            });
            setIsRegistered(true); // Set as registered
          } else {
            console.log("Caregiver not registered yet.");
          }
        } catch (error) {
          console.error("Error fetching caregiver details:", error);
        }
      };

      fetchCaregiverDetails();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.age || formData.age <= 0) newErrors.age = "Age must be a positive number.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Contact must be a 10-digit number.";
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.experience || formData.experience <= 0)
      newErrors.experience = "Experience must be a positive number.";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const url = isRegistered
        ? `http://localhost:5000/api/caregivers/update`
        : `http://localhost:5000/api/caregivers/register`;

      const method = isRegistered ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(
          isRegistered ? "Caregiver details updated successfully!" : "Caregiver registered successfully!"
        );
        setTimeout(() => navigate("/caregiver-dashboard"), 2000);
      } else {
        alert("Failed to submit caregiver details.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/caregivers/update/${formData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        const updatedCaregiver = await response.json();
        alert("Caregiver details updated successfully!");
        setFormData(updatedCaregiver);
      } else {
        alert("Failed to update caregiver details.");
      }
    } catch (error) {
      console.error("Error updating caregiver:", error);
    }
  };
  

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={6} className="border p-4 rounded shadow">
            <h3 className="text-center mb-4">
              {isRegistered ? "Update Caregiver Details" : "Caregiver Registration"}
            </h3>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {/* <Form onSubmit={handleSubmit}> */}
            <Form onSubmit={isRegistered ? handleUpdate : handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isRegistered}

                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              {/* Other form fields are similar, omitted for brevity */}
              
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                
                  isInvalid={!!errors.age}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  readOnly={isRegistered}
                  isInvalid={!!errors.contact}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
             
                 <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled // Optional: Disable email field to make it non-editable
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  readOnly={isRegistered}
                  isInvalid={!!errors.experience}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  readOnly={isRegistered}
                  isInvalid={!!errors.specialization}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
              </Form.Group>

{/* 
              <Button variant="primary" type="submit" className="w-100">
                {isRegistered ? "Update Details" : "Register"}
              </Button> */}
              <Button 
  variant="primary" 
  type="submit" 
  className="w-100"
  onClick={isRegistered ? handleUpdate : handleSubmit}  // Check isRegistered and trigger the correct function
>
  {isRegistered ? "Update Details" : "Register"}
</Button>

            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CaregiverRegistration;
