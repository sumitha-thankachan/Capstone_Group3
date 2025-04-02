import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./PatientDashboard.css";
import Sidebar from "./Sidebar";

const validateForm = (formData, setErrors) => {
  let errors = {};
  let isValid = true;
  if (!formData.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }
  if (
    !formData.age ||
    isNaN(formData.age) ||
    formData.age <= 0 ||
    formData.age > 120
  ) {
    errors.age = "Please enter a valid age (1-120)";
    isValid = false;
  }
  if (!formData.gender) {
    errors.gender = "Gender is required";
    isValid = false;
  }
  if (!/^[0-9]{10,15}$/.test(formData.contact)) {
    errors.contact = "Enter a valid contact number (10-15 digits)";
    isValid = false;
  }
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
    isValid = false;
  }
  if (!formData.address.trim()) {
    errors.address = "Address is required";
    isValid = false;
  }
  if (!formData.medicalHistory.trim()) {
    errors.medicalHistory = "Medical history is required";
    isValid = false;
  }
  if (!formData.allergies.trim()) {
    errors.allergies = "Allergies information is required";
    isValid = false;
  }
  setErrors(errors);
  return isValid;
};

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
    medicalPhoto: null,
    medicalReport: null,
  });
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   if (email) {
  //     setFormData((prev) => ({ ...prev, email }));
  //     fetch(`http://localhost:5000/api/patients/${email}`)
  //       .then((res) => res.json())
  //       .then((patient) => {
  //         setFormData({
  //           name: patient.name || "",
  //           age: patient.age || "",
  //           gender: patient.gender || "",
  //           contact: patient.contact || "",
  //           email: patient.email || email,
  //           address: patient.address || "",
  //           medicalHistory: patient.medicalHistory || "",
  //           allergies: patient.allergies || "",
  //           medicalPhoto: patient.medicalPhoto || "",
  //           medicalReport: patient.medicalReport || "",
  //         });
  //         setIsRegistered(true);
  //       })
  //       .catch((error) =>
  //         console.error("Error fetching patient details:", error)
  //       );
  //   }
  // }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
      fetch(`http://localhost:5000/api/patients/profile/${email}`)
        .then((res) => {
          if (res.status === 404) {
            // User not registered yet – allow form to be filled
            setIsRegistered(false);
            return null;
          }
          return res.json();
        })
        .then((patient) => {
          if (patient) {
            setFormData({
              name: patient.name || "",
              age: patient.age || "",
              gender: patient.gender || "",
              contact: patient.contact || "",
              email: patient.email || email,
              address: patient.address || "",
              medicalHistory: patient.medicalHistory || "",
              allergies: patient.allergies || "",
              medicalPhoto: patient.medicalPhoto || "",
              medicalReport: patient.medicalReport || "",
            });
            setIsRegistered(true);
          }
        })
        .catch((error) =>
          console.error("Error fetching patient details:", error)
        );
    }
  }, []);
  
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm(formData, setErrors)) return;

  //   const url = isRegistered
  //     ? `http://localhost:5000/api/patients/update/${formData.email}`
  //     : `http://localhost:5000/api/patients/register`;
  //   const method = isRegistered ? "PUT" : "POST";


  //   const payload = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (value && typeof value !== "object") payload.append(key, value);
  //   });
  //   if (formData.medicalPhoto)
  //     payload.append("medicalPhoto", formData.medicalPhoto);
  //   if (formData.medicalReport)
  //     payload.append("medicalReport", formData.medicalReport);

  //   try {
  //     const res = await fetch(url, { method, body: payload });
  //     if (res.ok) {
  //       setSuccessMessage(
  //         isRegistered ? "Updated successfully!" : "Registered successfully!"
  //       );
  //       setTimeout(() => navigate("/patient-dashboard"), 1500);
  //     } else {
  //       alert("Submission failed");
  //     }
  //   } catch (err) {
  //     console.error("Submission error:", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, setErrors)) return;
  
    const url = isRegistered
      ? `http://localhost:5000/api/patients/update/${formData.email}`
      : `http://localhost:5000/api/patients/register`;
    const method = isRegistered ? "PUT" : "POST";
  
    const payload = new FormData();
    
    // Append basic fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'medicalPhoto' && key !== 'medicalReport') {
        payload.append(key, value);
      }
    });
  
    // Only append new files if selected
    if (formData.medicalPhoto instanceof File) {
      payload.append("medicalPhoto", formData.medicalPhoto);
    }
  
    if (formData.medicalReport instanceof File) {
      payload.append("medicalReport", formData.medicalReport);
    }
  
    try {
      const res = await fetch(url, { method, body: payload });
      if (res.ok) {
        setSuccessMessage(
          isRegistered ? "Updated successfully!" : "Registered successfully!"
        );
        setTimeout(() => navigate("/patient-dashboard"), 1500);
      } else {
        const err = await res.json();
        alert("Submission failed: " + err.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission error");
    }
  };
  

  return (
    <>
      <Header />
      <div className="d-flex">
        {/* <div
          className="sidebar bg-dark text-white p-4"
          style={{ minWidth: "250px", minHeight: "100vh" }}
        >
          <div className="text-center mb-4">
            <img
              src={
                formData.medicalPhoto
                  ? `http://localhost:5000/uploads/${formData.medicalPhoto}`
                  : "http://localhost:5000/uploads/default-profile.png"
              }
              alt="Patient"
              className="rounded-circle"
              width="100"
              height="100"
            />

            <h5 className="mt-2">{formData.name}</h5>
          </div>
          <NavLink className="text-white d-block mb-3" to="/patient-dashboard">
            Dashboard
          </NavLink>
          <NavLink
            className="text-white d-block mb-3"
            to="/patient-registration"
          >
            Patient Registration
          </NavLink>
          <NavLink className="text-white d-block mb-3" to="/change-password">
            Change Password
          </NavLink>
          <NavLink className="text-white d-block mb-3" to="/profile">
            Profile
          </NavLink>
        </div> */}
<Sidebar />
        <Container fluid className="py-4">
          <h3 className="text-center mb-4">
            {isRegistered ? "Update Patient Details" : "Patient Registration"}
          </h3>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="g-4">
              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Basic Information</Card.Title>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        isInvalid={!!errors.age}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.age}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        isInvalid={!!errors.contact}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow">
                  <Card.Body>
                    <Card.Title>Medical Information</Card.Title>
                    <Form.Group className="mb-3">
                      <Form.Label>Medical History</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.medicalHistory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            medicalHistory: e.target.value,
                          })
                        }
                        isInvalid={!!errors.medicalHistory}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.medicalHistory}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Allergies</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.allergies}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            allergies: e.target.value,
                          })
                        }
                        isInvalid={!!errors.allergies}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.allergies}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                      <Form.Label>Medical Photo</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".jpeg,.jpg"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            medicalPhoto: e.target.files[0],
                          })
                        }
                      />
                    </Form.Group> */}
<Form.Group className="mb-3">
  <Form.Label>Medical Photo</Form.Label>
  <Form.Control
    type="file"
    accept=".jpeg,.jpg"
    onChange={(e) =>
      setFormData({
        ...formData,
        medicalPhoto: e.target.files[0],
      })
    }
  />
  {formData.medicalPhoto && typeof formData.medicalPhoto === "string" && (
    <div className="mt-2">
      <small>Existing: {formData.medicalPhoto}</small><br />
      <img
        src={`http://localhost:5000/uploads/${formData.medicalPhoto}`}
        alt="Medical"
        height="80"
        style={{ borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>
  )}
</Form.Group>


                    {/* <Form.Group className="mb-3">
                      <Form.Label>Medical Report (PDF/JPG)</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf,.jpeg,.jpg"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            medicalReport: e.target.files[0],
                          })
                        }
                      />
                    </Form.Group> */}
<Form.Group className="mb-3">
  <Form.Label>Medical Report (PDF/JPG)</Form.Label>
  <Form.Control
    type="file"
    accept=".pdf,.jpeg,.jpg"
    onChange={(e) =>
      setFormData({
        ...formData,
        medicalReport: e.target.files[0],
      })
    }
  />
  {formData.medicalReport && typeof formData.medicalReport === "string" && (
    <div className="mt-2">
      <small>Existing: {formData.medicalReport}</small><br />
      {formData.medicalReport.endsWith(".pdf") ? (
        <a
          href={`http://localhost:5000/uploads/${formData.medicalReport}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Uploaded PDF
        </a>
      ) : (
        <img
          src={`http://localhost:5000/uploads/${formData.medicalReport}`}
          alt="Medical Report"
          height="80"
          style={{ borderRadius: "5px", border: "1px solid #ccc" }}
        />
      )}
    </div>
  )}
</Form.Group>


                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button variant="primary" size="lg" type="submit">
                {isRegistered ? "Update Details" : "Register"}
              </Button>
            </div>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PatientRegistration;
