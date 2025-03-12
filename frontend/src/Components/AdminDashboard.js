import React from "react";
import Header from "./Header";
import Footer from "./footer";
import "../App";
import bannerImage from "./Assets/admin-dashboard.jpg"; 
function AdminDashboard() {
  return (
    <div>
      <Header />

      <div
        className="mt-4"
        style={{
          background: `url(${bannerImage})`,
          minHeight: '400px',
          position: 'relative',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
          }}
        ></div>
        
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2 className="fw-bold">Welcome to Admin Dashboard</h2>
        </div>
        </div>

      

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
              <h4>Number of Caregivers</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>156</h5>
          </div>
        </div>
        <div className="admin-subcontainers">
          <div className="admin-containers">
            <div className="combo">
              <h4>Total Tasks</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>158</h5>
          </div>
          <div className="admin-containers">
            <div className="combo">
              <h4>Financial Summary</h4>
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

export default AdminDashboard;
