import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from './footer';
import Sidebar from './Sidebar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './PatientDashboard.css';
import { ListGroup } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";



function CaregiverDashboard() {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [approvedPatientsCount, setApprovedPatientsCount] = useState(0);

  // Function to decode JWT
  const decodeJWT = (token) => {
    try {
      // const base64Url = token.split('.')[1];
      // const base64 = base64Url.replace('-', '+').replace('_', '/');
      // const decodedData = JSON.parse(window.atob(base64));
      const decodedData = jwtDecode(token);
      return decodedData;
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  };



  // Fetch approved patients count
  useEffect(() => {
    const fetchApprovedPatientsCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients/count/approved");
        setApprovedPatientsCount(response.data.count);
      } catch (error) {
        console.error("Error fetching approved patients count:", error);
      }
    };
    fetchApprovedPatientsCount();
  }, []);

  // Fetch assigned tasks for the caregiver
  /* useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decodedToken = decodeJWT(token);
        console.log(decodedToken)
        const caregiverId = decodedToken?.id;
        //const caregiverId = "67d11085cbbfd509d6a46052";
        console.log(caregiverId);
        if (!caregiverId) return;

        const response = await axios.get(`http://localhost:5000/api/tasks/caregiver/${caregiverId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAssignedTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error);
        setLoading(false);
      }
    };
    fetchAssignedTasks();
  }, []);
 */
  


  // Fetch total tasks count
  useEffect(() => {
    const fetchTotalTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/count');
        setTotalTasks(response.data.count);
      } catch (error) {
        console.error('Error fetching total tasks count:', error);
      }
    };
    fetchTotalTasks();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <Sidebar />

        <main className="dashboard-main">
          <h2 className="fw-bold">Caregiver Dashboard</h2>
          <Container fluid>
            <Row className="g-4">
              
              <Col md={6}>
                <Card className="dashboard-card">
                  <div className="combo">
                    <h4>Number of Residents</h4>
                    <i className="bi bi-people-fill icon"></i>
                  </div>
                  <h3>{approvedPatientsCount}</h3>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="dashboard-card">
                  <div className="combo">
                    <h4>Total Tasks</h4>
                    <i className="bi bi-list-check icon"></i>
                  </div>
                  <h3>{totalTasks}</h3>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default CaregiverDashboard;
