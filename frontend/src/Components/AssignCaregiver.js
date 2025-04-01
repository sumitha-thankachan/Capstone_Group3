import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Table, Button, Alert, Row, Col } from "react-bootstrap";

import Header from "./Header";
import Footer from "./footer";
import Sidebar from "./Sidebar";

const AssignCaregiver = () => {
  const { patientId } = useParams();
  const [caregivers, setCaregivers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/admin/caregivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCaregivers(data.approved || []);
    } catch (error) {
      console.error("Error fetching caregivers", error);
    }
  };

  const handleAssign = async (caregiverId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/assign-caregiver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ patientId, caregiverId }),
      });

      const data = await response.json();
      setMessage(data.message || "Caregiver assigned successfully.");
      setTimeout(() => navigate("/patients"), 2000);
    } catch (error) {
      console.error("Assignment error", error);
      setMessage("Failed to assign caregiver.");
    }
  };

  return (
    <>
      <Header />
      <Row className="m-0">
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container className="mt-4">
            <h3>Select a Caregiver to Assign</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Contact</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map((cg) => (
                  <tr key={cg._id}>
                    <td>{cg.name}</td>
                    <td>{cg.experience} yrs</td>
                    <td>{cg.contact}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleAssign(cg._id)}>Assign</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default AssignCaregiver;
