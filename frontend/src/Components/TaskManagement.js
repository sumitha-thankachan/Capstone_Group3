import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";
import "../login.css";
import { Filter } from "bad-words";

const TaskManagement = () => {
  const [searchStatus, setSearchStatus] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [approvedPatients, setApprovedPatients] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  const [newTask, setNewTask] = useState({
    name: "",
    task: "",
    resident: "",
    status: "Pending",
    caregiver: "",
  });

  const filter = new Filter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    const fetchApprovedPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/admin/patients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data?.approved) {
          setApprovedPatients(response.data.approved);
        }
      } catch (error) {
        console.error("Error fetching approved patients:", error);
      }
    };
    fetchApprovedPatients();

    const fetchApprovedCaregivers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/caregivers/approved"
        );
        setCaregivers(res.data); //  This stores caregivers
      } catch (err) {
        console.error("Error fetching caregivers:", err);
      }
    };

    fetchApprovedCaregivers();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesTask = searchTask
      ? task.task.toLowerCase().includes(searchTask.toLowerCase())
      : true;
    const matchesStatus = searchStatus
      ? task.status.toLowerCase() === searchStatus.toLowerCase()
      : true;
    return matchesTask && matchesStatus;
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (filter.isProfane(newTask.task)) {
      alert("Please remove inappropriate words from the task description.");
      return;
    }
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/tasks",
    //     newTask
    //   );

    try {
      await axios.post("http://localhost:5000/api/tasks", newTask);
  
      //  Re-fetch all tasks with populated caregiver
      const updatedTasks = await axios.get("http://localhost:5000/api/tasks");
      setTasks(updatedTasks.data);
  
    
      // setTasks([...tasks, response.data]);
      setNewTask({
        name: "",
        task: "",
        resident: "",
        status: "Pending",
        caregiver: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setNewTask({
      name: task.name,
      task: task.task,
      resident: task.resident,
      status: task.status,
      caregiver: task.caregiver?._id || task.caregiver || '',
    });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (filter.isProfane(newTask.task)) {
      alert("Please remove inappropriate words from the task description.");
      return;
    }
    // try {
    //   const response = await axios.put(
    //     `http://localhost:5000/api/tasks/${editTask._id}`,
    //     newTask
    //   );
    //   setTasks(
    //     tasks.map((task) => (task._id === editTask._id ? response.data : task))
    //   );
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        newTask
      );
  
      //  Re-fetch to get updated caregiver info
      const updatedTasks = await axios.get("http://localhost:5000/api/tasks");
      setTasks(updatedTasks.data);
      setEditTask(null);
      setNewTask({
        name: "",
        task: "",
        resident: "",
        status: "Pending",
        caregiver: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={7} xl={6} className="task-container">
            <div className="task-management-heading">
              <h1 className="text">Task Management</h1>
              <p>Organize and track your tasks efficiently</p>
            </div>

            <div className="search-section">
              <Row className="align-items-center">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder=" Search tasks..."
                    value={searchTask}
                    onChange={(e) => setSearchTask(e.target.value)}
                    className="me-2"
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="me-2"
                  >
                    <option>Filter by status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button variant="primary" className="w-100">
                    <i className="bi bi-search"></i> Search
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="custom-table">
              <Table striped hover responsive>
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th>Name</th>
                    <th>Task</th>
                    <th>Resident</th>
                    <th>Caregiver</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td>{task.task}</td>
                      <td>{task.resident}</td>
                      <td>{task.caregiver?.name || 'N/A'}</td>
                      <td>
                        <span
                          className={`badge ${
                            task.status === "Pending"
                              ? "bg-pending"
                              : task.status === "In Progress"
                              ? "bg-in-progress"
                              : "bg-completed"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="action-btn"
                          onClick={() => handleEdit(task)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="action-btn"
                          onClick={() => handleViewTask(task)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="action-btn"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="form-section">
              <h2>{editTask ? "Edit Task" : "Add New Task"}</h2>
              <Form onSubmit={editTask ? handleUpdateTask : handleAddTask}>
                <Form.Group className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    name="name"
                    value={newTask.name}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Resident</Form.Label>
                  <Form.Select
                    name="resident"
                    value={newTask.resident}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select a patient</option>
                    {approvedPatients.map((patient) => (
                      <option key={patient._id} value={patient.name}>
                        {patient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Caregiver</Form.Label>
                  <Form.Select
                    name="caregiver"
                    value={newTask.caregiver}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a caregiver</option>
                    {caregivers.map((cg) => (
                      <option key={cg._id} value={cg._id}>
                        {cg.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter task description"
                    name="task"
                    value={newTask.task}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newTask.status}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="me-2">
                    {editTask ? "Update Task" : "Add Task"}
                  </Button>
                  {editTask && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setEditTask(null);
                        setNewTask({
                          name: "",
                          task: "",
                          resident: "",
                          status: "Pending",
                          caregiver: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </div>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              className="confirm-modal"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedTask && (
                  <div className="text-center">
                    <h5>{selectedTask.name}</h5>
                    <p className="mb-1">
                      <strong>Resident:</strong> {selectedTask.resident}
                    </p>
                    <p className="mb-1">
                      <strong>Caregiver:</strong> 
                          {selectedTask.caregiver?.name || selectedTask.caregiver || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong>
                      <span
                        className={`badge ${
                          selectedTask.status === "Pending"
                            ? "bg-pending"
                            : selectedTask.status === "In Progress"
                            ? "bg-in-progress"
                            : "bg-completed"
                        }`}
                      >
                        {selectedTask.status}
                      </span>
                    </p>
                    <p className="mb-0">
                      <strong>Description:</strong> {selectedTask.task}
                    </p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TaskManagement;
