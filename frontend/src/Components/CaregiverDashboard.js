import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // Import Axios for making API requests
import Header from "./Header";
import Footer from './footer';

function CaregiverDashboard() {
  const [residentsCount, setResidentsCount] = useState(0); // State for number of residents

  // Fetch the number of residents when the component mounts
  useEffect(() => {
    const fetchResidentsCount = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/patients/count'); // API for residents count
        setResidentsCount(response.data.count); // Set the state with the count
      } catch (error) {
        console.error('Error fetching residents count:', error);
      }
    };

    fetchResidentsCount(); // Call the function to fetch the count
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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
            <h5>{residentsCount}</h5> {/* Dynamically displaying the number of residents */}
          </div>
          <div className="admin-containers">
            <div className="combo">
              <h4>Total Tasks</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>158</h5> {/* Placeholder value for tasks (you can change this later) */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CaregiverDashboard;
