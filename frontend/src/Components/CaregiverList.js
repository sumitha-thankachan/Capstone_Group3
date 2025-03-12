import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';  // Import React Bootstrap components
import Header from "./Header";
import Footer from "./footer";

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState([]);

  // Fetch all caregivers from the backend
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/caregivers/list');
        const data = await response.json();
        setCaregivers(data);
      } catch (error) {
        console.error('Error fetching caregivers:', error);
      }
    };

    fetchCaregivers();
  }, []);

  // Handle approval action
  const approveCaregiver = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/caregivers/approve/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Caregiver approved');
        setCaregivers(caregivers.map(cg => cg._id === id ? { ...cg, isApproved: true } : cg));
      } else {
        alert('Failed to approve caregiver');
      }
    } catch (error) {
      alert('Error approving caregiver');
    }
  };

  // Handle rejection action
  const rejectCaregiver = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/caregivers/reject/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isApproved: false }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        alert('Caregiver rejected');
        setCaregivers(caregivers.filter(cg => cg._id !== id));
      } else {
        alert('Failed to reject caregiver');
      }
    } catch (error) {
      alert('Error rejecting caregiver');
    }
  };

  // Handle delete action
  const deleteCaregiver = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/caregivers/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Caregiver deleted');
        setCaregivers(caregivers.filter(cg => cg._id !== id)); // Remove from the UI
      } else {
        alert('Failed to delete caregiver');
      }
    } catch (error) {
      alert('Error deleting caregiver');
    }
  };

  // Split caregivers into approved and pending lists
  const pendingCaregivers = caregivers.filter(cg => !cg.isApproved);
  const approvedCaregivers = caregivers.filter(cg => cg.isApproved);

  return (
    <>
      <Header />
      <div className="caregiver-list">
        <h1 className="text-center mb-4">Caregiver List</h1>

        {/* Pending Caregivers Table */}
        <h2>Waiting for Approval</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Experience</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingCaregivers.map(caregiver => (
              <tr key={caregiver._id}>
                <td>{caregiver.name}</td>
                <td>{caregiver.age}</td>
                <td>{caregiver.gender}</td>
                <td>{caregiver.contact}</td>
                <td>{caregiver.email}</td>
                <td>{caregiver.address}</td>
                <td>{caregiver.experience}</td>
                <td>{caregiver.specialization}</td>
                <td>
                  <Button 
                    variant="success" 
                    className="me-2" 
                    onClick={() => approveCaregiver(caregiver._id)}>
                    Approve
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => rejectCaregiver(caregiver._id)}>
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Approved Caregivers Table */}
        <h2>Approved Caregivers</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Experience</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedCaregivers.map(caregiver => (
              <tr key={caregiver._id}>
                <td>{caregiver.name}</td>
                <td>{caregiver.age}</td>
                <td>{caregiver.gender}</td>
                <td>{caregiver.contact}</td>
                <td>{caregiver.email}</td>
                <td>{caregiver.address}</td>
                <td>{caregiver.experience}</td>
                <td>{caregiver.specialization}</td>
                <td>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteCaregiver(caregiver._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};

export default CaregiverList;
