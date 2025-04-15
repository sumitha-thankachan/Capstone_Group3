import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './footer';
import { Container, Table, Button, Form } from 'react-bootstrap';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const email = localStorage.getItem('email'); // Retrieve email from localStorage
        const response = await axios.get(`http://localhost:5000/api/tasks/caregiver/tasks/${email}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Unable to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = { status: newStatus };
      await axios.put(`http://localhost:5000/api/tasks/status/${taskId}`, updatedTask);

      // Update the status in the local state
      setTasks(tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
      setError('Unable to update task status.');
    }
  };

  // Function to get background color based on status value
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#28a745'; // Green for Completed
      case 'In Progress':
        return '#ffc107'; // Yellow for In Progress
      case 'Pending':
        return '#FF0000'; // Blue for Pending
      default:
        return '#f0f0f0'; // Light gray for default
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-4">My Tasks</h2>
        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : tasks.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Resident</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task._id}</td>
                  <td>{task.name}</td>
                  <td>{task.task}</td>
                  <td>{task.resident}</td>
                  {/* Applying background color to the status cell */}
                  <td
                    style={{
                      backgroundColor: getStatusBackgroundColor(task.status),
                      color: '#fff', // Text color to white for contrast
                      padding: '5px 10px',
                      borderRadius: '5px',
                    }}
                  >
                    {task.status}
                  </td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                  <td>
                    <Form.Control
                      as="select"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Form.Control>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No tasks assigned.</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyTasks;
