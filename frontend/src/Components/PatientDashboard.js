import React from 'react'
import Header from "./Header";
import Footer from './footer';
function PatientDashboard() {
    return (
        <div>
          <Header />
          <h2 className="fw-bold">Care Giver Dashboard</h2>
    
          <div className="admin-mainContainers">
            <div className="admin-subcontainers">
              <div className="admin-containers">
                <div className="combo">
                  <h4>Details</h4>
                  <i className="bi bi-person-circle icon"></i>
                </div>
                  <h5></h5>
              </div>
              <div className="admin-containers">
                <div className="combo">
                  <h4>History</h4>
                  <i className="bi bi-person-circle icon"></i>
                </div>
                <h5></h5>
              </div>
            </div>
         
          </div>
          <Footer />
        </div>
      );
    }

export default PatientDashboard