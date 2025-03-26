import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from './footer';
import Sidebar from './Sidebar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './PatientDashboard.css';

function CaregiverDashboard() {
  const [residentsCount, setResidentsCount] = useState(0);

  useEffect(() => {
    const fetchResidentsCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/count');
        setResidentsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching residents count:', error);
      }
    };

    fetchResidentsCount();
  }, []);

  const [totalTasks, setTotalTasks] = useState(0); // State for total number of tasks
  // Fetch total tasks count when the component mounts
  useEffect(() => {
    const fetchTotalTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/count'); // Adjust your endpoint
        console.log("Task count fetched:", response.data); // Log the response to check data
        setTotalTasks(response.data.count); // Set the total task count
      } catch (error) {
        console.error('Error fetching total tasks count:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchTotalTasks(); // Call function on mount
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
                  <h3>{residentsCount}</h3>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="dashboard-card">
                  <div className="combo">
                    <h4>Total Tasks</h4>
                    <i className="bi bi-list-check icon"></i>
                  </div>
                  <h3>{totalTasks}</h3> {/* Replace with API data later if needed */}
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
