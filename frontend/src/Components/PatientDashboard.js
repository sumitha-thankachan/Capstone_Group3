import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import './PatientDashboard.css';

function PatientDashboard() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetch(`http://localhost:5000/api/patients/profile/${email}`)
        .then(res => res.json())
        .then(data => setPatient(data))
        .catch(err => console.error("Error fetching patient:", err));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          {patient?.medicalPhoto && (
            <img src={`http://localhost:5000/uploads/${patient.medicalPhoto}`} alt="Profile" />
          )}
          <h5>{patient?.name || "Patient"}</h5>
          <div className="dashboard-nav">
            <NavLink to="/patient-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/patient-registration" className={({ isActive }) => isActive ? "active" : ""}>
              📝 Registration
            </NavLink>
            <NavLink to="/change-password" className={({ isActive }) => isActive ? "active" : ""}>
              🔐 Password
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
              👤 Profile
            </NavLink>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="dashboard-main">
          <h2>Patient Dashboard</h2>
          {patient ? (
            <Container fluid>
              <Row className="g-4">
                {/* Personal Details */}
                <Col md={6}>
                  <Card className="dashboard-card">
                    <h5>Personal Details</h5>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                  </Card>
                </Col>

                {/* Medical Info */}
                <Col md={6}>
                  <Card className="dashboard-card">
                    <h5>Medical Info</h5>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                    <p><strong>Allergies:</strong> {patient.allergies}</p>
                    {patient.medicalReport && (
                      <p>
                        <strong>Medical Report:</strong>{' '}
                        <a href={`http://localhost:5000/uploads/${patient.medicalReport}`} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </p>
                    )}
                  </Card>
                </Col>
              </Row>
            </Container>
          ) : (
            <p>Loading patient data...</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default PatientDashboard;
