import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./footer";
import "../App";
import bannerImage from "./Assets/admin-dashboard.jpg"; 
function AdminDashboard() {
  /* const [approvedCaregiversCount, setApprovedCaregiversCount] = useState(0);

  useEffect(() => {
    const fetchApprovedCaregiversCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/caregivers/count/approved');
        setApprovedCaregiversCount(response.data.count);
      } catch (error) {
        console.error('Error fetching approved caregivers count:', error);
      }
    };

    fetchApprovedCaregiversCount();
  }, []); */
  const [approvedCaregiversCount, setApprovedCaregiversCount] = useState(0);

  useEffect(() => {
    const fetchApprovedCaregiversCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/caregivers/count/approved');
        setApprovedCaregiversCount(response.data.count);
      } catch (error) {
        console.error('Error fetching approved caregivers count:', error);
      }
    };

    fetchApprovedCaregiversCount();
  }, []);

  const [residentsCount, setResidentsCount] = useState(0); // State for number of residents

  // Fetch the number of residents when the component mounts
  useEffect(() => {
    const fetchResidentsCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/count'); // API for residents count
        setResidentsCount(response.data.count); // Set the state with the count
      } catch (error) {
        console.error('Error fetching residents count:', error);
      }
    };

    fetchResidentsCount(); // Call the function to fetch the count
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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

  const [totalRecords, setTotalRecords] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses/summary");
        console.log("API Response:", response.data);  // Debugging

        setTotalRecords(response.data.totalRecords);
        setTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error("Error fetching financial summary:", error);
      }
    };

    fetchFinancialSummary();
    const interval = setInterval(fetchFinancialSummary, 5000); // Refresh every 5 sec

    return () => clearInterval(interval);
  }, []);


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
              <h5>{residentsCount}</h5>
          </div>
          <div className="admin-containers">
            <div className="combo">
              <h4>Number of Caregivers</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>{approvedCaregiversCount}</h5>
          </div>
        </div>
        <div className="admin-subcontainers">
          <div className="admin-containers">
            <div className="combo">
              <h4>Total Tasks</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>{totalTasks}</h5>
          </div>
          <div className="admin-containers">
            <div className="combo">
              <h4>Financial Record</h4>
              <i className="bi bi-person-circle icon"></i>
            </div>
            <h5>Total: ${totalAmount}</h5>
            <p>{totalRecords} Records</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default AdminDashboard;

