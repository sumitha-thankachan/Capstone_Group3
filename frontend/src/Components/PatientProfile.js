import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import Sidebar from './Sidebar';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetch(`http://localhost:5000/api/patients/profile/${email}`)
        .then((res) => res.json())
        .then((data) => setPatient(data))
        .catch((err) => console.error("Fetch error:", err.message));
    }
  }, []);

  if (!patient) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading profile...</p>
      </Container>
    );
  }

  const handleEditClick = () => {
    navigate('/edit-profile');
  };

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={4} className="text-center mb-4 mb-md-0">
                      <img
                        src={patient.medicalPhoto ? `http://localhost:5000/uploads/${patient.medicalPhoto}` : 'http://localhost:5000/uploads/default-profile.png'}
                        onError={(e) => e.target.src = '/default-profile.png'}
                        alt="Patient"
                        className="rounded-circle shadow"
                        width="160"
                        height="160"
                      />
                      <h4 className="mt-3">{patient.name}</h4>
                    </Col>
  
                    <Col md={8}>
                      <div className="patient-profile-container">
                        <h2>Patient Profile</h2>
                        <ListGroup variant="flush">
                          <ListGroup.Item><strong>Age:</strong> {patient.age}</ListGroup.Item>
                          <ListGroup.Item><strong>Gender:</strong> {patient.gender}</ListGroup.Item>
                          <ListGroup.Item><strong>Contact:</strong> {patient.contact}</ListGroup.Item>
                          <ListGroup.Item><strong>Email:</strong> {patient.email}</ListGroup.Item>
                          <ListGroup.Item><strong>Address:</strong> {patient.address}</ListGroup.Item>
                          <ListGroup.Item><strong>Medical History:</strong> {patient.medicalHistory}</ListGroup.Item>
                          <ListGroup.Item><strong>Allergies:</strong> {patient.allergies}</ListGroup.Item>
                          {patient.medicalReport && (
                            <ListGroup.Item>
                              <strong>Medical Report:</strong>{' '}
                              <a href={`http://localhost:5000/uploads/${patient.medicalReport}`} target="_blank" rel="noreferrer">View Report</a>
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                        <div className="profile-actions">
                          <Button variant="primary" onClick={handleEditClick} className="edit-btn">
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
  
};

export default PatientProfile;
