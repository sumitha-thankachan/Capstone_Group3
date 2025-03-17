import React, { useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './footer';

const TaskManagement = () => {
  const [searchResident, setSearchResident] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Sample data
  const residents = [
    {
      name: 'John Doe',
      age: '72',
      medicalStatus: 'Stable',
    }
  ];

  const tasks = [
    {
      name: 'Asif',
      task: 'Morning section',
      resident: 'John Doe',
      status: 'Completed'
    }
  ];

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
                  {residents.map((resident, index) => (
                    <tr key={index}>
                      <td>{resident.name}</td>
                      <td>{resident.age}</td>
                      <td>{resident.medicalStatus}</td>
                      <td>
                        <Button variant="primary" size="sm" className="me-2 edit primary-btn">Edit</Button>
                        <Button variant="info" className='primary-btn' size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
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
                    placeholder="Search caregiver..."
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
                        <Button variant="success" size="sm" className='primary-btn'>Completed</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TaskManagement;
