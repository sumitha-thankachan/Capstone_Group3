import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Header from "./Header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";



const PatientRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    medicalHistory: "",
    allergies: "",
  });

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));

      const fetchPatientDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/patients/${email}`);
          if (response.ok) {
            const patient = await response.json();
            setFormData({
              name: patient.name || "",
              age: patient.age || "",
              gender: patient.gender || "",
              contact: patient.contact || "",
              email: patient.email || email,
              address: patient.address || "",
              medicalHistory: patient.medicalHistory || "",
              allergies: patient.allergies || "",
            });
            setIsRegistered(true); // Mark as registered
          }
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };
      fetchPatientDetails();
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const url = isRegistered
        ? `http://localhost:4000/api/patients/update`
        : `http://localhost:4000/api/patients/register`;

      const method = isRegistered ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSuccessMessage(
          isRegistered ? "Patient details updated successfully!" : "Patient registered successfully!"
        );
  
        // ✅ Fetch updated details before navigating
        setTimeout(async () => {
          const fetchUpdatedDetails = await fetch(`http://localhost:5000/api/patients/${formData.email}`);
          if (fetchUpdatedDetails.ok) {
            const updatedPatient = await fetchUpdatedDetails.json();
            setFormData(updatedPatient); // ✅ Update form with new details
          }
  
          // ✅ Redirect to Patient Dashboard after fetching updated details
          navigate("/patient-dashboard");
  
        }, 1500); // 1.5-second delay before navigating
      } else {
        alert("Failed to submit patient details.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/patients/update/${formData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedPatient = await response.json();
        alert("Patient details updated successfully!");
        setFormData(updatedPatient);
      } else {
        alert("Failed to update patient details.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={6} className="border p-4 rounded shadow">
            <h3 className="text-center mb-4">
              {isRegistered ? "Update Patient Details" : "Patient Registration"}
            </h3>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} disabled required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Medical History</Form.Label>
                <Form.Control
                  type="text"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
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

export default PatientRegistration;
