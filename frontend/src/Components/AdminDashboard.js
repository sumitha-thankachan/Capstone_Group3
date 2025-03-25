import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./footer";
import Sidebar from './Sidebar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../App";
import bannerImage from "./Assets/admin-dashboard.jpg";
import './PatientDashboard.css';

function AdminDashboard() {
  const [approvedCaregiversCount, setApprovedCaregiversCount] = useState(0);
  const [residentsCount, setResidentsCount] = useState(0);

  useEffect(() => {
    const fetchApprovedCaregiversCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/caregivers/count/approved');
        setApprovedCaregiversCount(response.data.count);
      } catch (error) {
        console.error('Error fetching approved caregivers count:', error);
      }
    };

    const fetchResidentsCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/count');
        setResidentsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching residents count:', error);
      }
    };

    fetchApprovedCaregiversCount();
    fetchResidentsCount();
  }, []);

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <main className="dashboard-main">
          {/* <div
            className="mt-4 position-relative"
            style={{
              background: `url(${bannerImage})`,
              minHeight: '300px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h2 className="fw-bold text-white">Welcome to Admin Dashboard</h2>
            </div>
          </div> */}

          <Container fluid className="mt-4">
            <Row className="g-4">
              <Col md={6}>
                <Card className="dashboard-card shadow">
                  <div className="combo">
                    <h4>Number of Residents</h4>
                    <i className="bi bi-people-fill icon"></i>
                  </div>
                  <h3>{residentsCount}</h3>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="dashboard-card shadow">
                  <div className="combo">
                    <h4>Number of Caregivers</h4>
                    <i className="bi bi-person-check-fill icon"></i>
                  </div>
                  <h3>{approvedCaregiversCount}</h3>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="dashboard-card shadow">
                  <div className="combo">
                    <h4>Total Tasks</h4>
                    <i className="bi bi-list-check icon"></i>
                  </div>
                  <h3>158</h3> {/* Placeholder value */}
                </Card>
              </Col>

              <Col md={6}>
                <Card className="dashboard-card shadow">
                  <div className="combo">
                    <h4>Financial Summary</h4>
                    <i className="bi bi-currency-dollar icon"></i>
                  </div>
                  <h3>158</h3> {/* Placeholder value */}
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

export default AdminDashboard;
