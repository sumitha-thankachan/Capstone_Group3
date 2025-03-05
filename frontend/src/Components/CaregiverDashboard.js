import React from 'react'
import Header from "./Header";
import Footer from './footer';

function CaregiverDashboard() {
  return (
    <div>
      <Header />
      <h2 className="fw-bold">Care Giver Dashboard</h2>

      <div className="admin-mainContainers">
        <div className="admin-subcontainers">
          <div className="admin-containers">
            <div className="combo">
              <h4>Number of Residence</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
              <h5>156</h5>
          </div>
          <div className="admin-containers">
            <div className="combo">
              <h4>Total Tasks</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>158</h5>
          </div>
        </div>
     
      </div>
      <Footer />
    </div>
  );
}

export default CaregiverDashboard