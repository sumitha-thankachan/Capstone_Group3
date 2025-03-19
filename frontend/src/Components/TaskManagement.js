import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './footer';
import axios from 'axios';

const TaskManagement = () => {
  const [searchResident, setSearchResident] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    task: '',
    resident: '',
    status: 'Pending',
  });

  // Fetch tasks when the component is mounted
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        console.log("Fetched tasks:", response.data);  // Log response data
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Function to handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      console.log('Task added:', response.data);
      setTasks([...tasks, response.data]); // Add the new task to the list of tasks
      setNewTask({
        name: '',
        task: '',
        resident: '',
        status: 'Pending',
      }); // Reset the form after adding the task
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row className="mt-5 mx-4 mb-5" style={{ minHeight: '600px' }}>
          <Col md={6}>
            <div className="border p-4" style={{ height: '600px', overflowY: 'auto' }}>
              <h4>Resident Management</h4>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search residents..."
                    value={searchResident}
                    onChange={(e) => setSearchResident(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Select>
                    <option>Search by status</option>
                    <option>Stable</option>
                    <option>Critical</option>
                    <option>Recovering</option>
                  </Form.Select>
                </Col>
              </Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Medical Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace this with your resident data */}
                  <tr>
                    <td>John Doe</td>
                    <td>72</td>
                    <td>Stable</td>
                    <td>
                      <Button variant="primary" size="sm" className="me-2 edit primary-btn">Edit</Button>
                      <Button variant="info" className="primary-btn" size="sm">View</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>

          <Col md={6}>
            <div className="border p-4" style={{ height: '600px', overflowY: 'auto' }}>
              <h4>Task Management</h4>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search task..."
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Select>
                    <option>Search by status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Select>
                </Col>
              </Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Task</th>
                    <th>Resident</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td>{task.task}</td>
                      <td>{task.resident}</td>
                      <td>
                        <Button variant="primary" size="sm" className="me-2 edit primary-btn">Edit</Button>
                        <Button variant="success" size="sm" className="primary-btn">Completed</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h4>Add New Task</h4>
              <Form onSubmit={handleAddTask}>
                <Form.Group className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    name="name"
                    value={newTask.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task description"
                    name="task"
                    value={newTask.task}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Resident</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter resident name"
                    name="resident"
                    value={newTask.resident}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newTask.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Task
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TaskManagement;
