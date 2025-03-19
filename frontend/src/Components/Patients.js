import React, { useState, useEffect } from "react";
import { Table, Container, Button, Alert } from "react-bootstrap";
import AdminHeader from "./Header";

const Patients = () => {
  const [pendingPatients, setPendingPatients] = useState([]);
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

//   const fetchPatients = async () => {
//     try {
//       const token = localStorage.getItem("token"); // ✅ Get admin token

//       const response = await fetch("http://localhost:5000/api/admin/patients", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // ✅ Authenticate admin
//         },
//       });

//       const data = await response.json();
//       setPendingPatients(data.pending);
//       setApprovedPatients(data.approved);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get admin token

      if (!token) {
        console.error("No auth token found.");
        setMessage("Unauthorized: Please log in first.");
        return;
      }
  
      console.log("Using Token:", token); // ✅ Debugging token
  
      const response = await fetch("http://localhost:5000/api/admin/patients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // ✅ Check if response is valid JSON
      if (!response.ok) {
        const errorText = await response.text(); // ✅ Read non-JSON response
        throw new Error(`API Error: ${errorText}`);
      }
  
      const data = await response.json();
      setPendingPatients(data.pending || []);
      setApprovedPatients(data.approved || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setMessage("Failed to fetch patients. Please try again.");
    }
  };
  
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/admin/approve-patient/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMessage(data.message);
      fetchPatients(); // Refresh tables
    } catch (error) {
      console.error("Error approving patient:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/admin/reject-patient/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMessage(data.message);
      fetchPatients(); // Refresh tables
    } catch (error) {
      console.error("Error rejecting patient:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/admin/delete-patient/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMessage(data.message);
      fetchPatients(); // Refresh tables after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
      setMessage("Failed to delete patient. Please try again.");
    }
  };

  return (
    <>
      <AdminHeader />
      <Container className="mt-5">
        <h2 className="text-center">Patient Management</h2>

        {message && <Alert variant="success">{message}</Alert>}

        {/* ✅ Pending Patients Table */}
        <h4 className="mt-4">Pending Approvals</h4>
        <Table striped bordered hover className="shadow-sm">
          <thead className="bg-warning text-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Medical History</th>
              <th>Allergies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingPatients.length > 0 ? (
              pendingPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{patient.medicalHistory}</td>
                  <td>{patient.allergies}</td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => handleApprove(patient._id)}>
                      Approve
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleReject(patient._id)}>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No pending patients.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* ✅ Approved Patients Table */}
        <h4 className="mt-4">Approved Patients</h4>
        <Table striped bordered hover className="shadow-sm">
          <thead className="bg-success text-white">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Medical History</th>
              <th>Allergies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedPatients.length > 0 ? (
              approvedPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{patient.medicalHistory}</td>
                  <td>{patient.allergies}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(patient._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No approved patients.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Patients;
