import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Alert,
//   Row,
//   Col,
// } from "react-bootstrap";
import {
    Container,
    Table,
    Button,
    Form,
    Alert,
    Row,
    Col,
    Card,
  } from "react-bootstrap";
import Header from "./Header";
import Footer from "./footer";
import "./room.css";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [message, setMessage] = useState("");
  const [view, setView] = useState("home"); // "home", "addRoom", "assignRoom"
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "ICU",
    capacity: 1,
  });

  useEffect(() => {
    fetchRooms();
    fetchPatients();
  }, []);

  // ✅ Fetch Rooms
  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rooms");
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // ✅ Fetch Available Patients
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patients/list");
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();
      console.log("Fetched Patients:", data); //

      setPatients(data.filter((p) => !p.room)); // Show only unassigned patients
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // ✅ Assign Patient to Room
  const assignPatientToRoom = async (roomId) => {
    if (!selectedPatient[roomId]) {
      setMessage("Please select a patient before assigning.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomId}/assign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId: selectedPatient[roomId] }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      fetchRooms();
      fetchPatients();
    } catch (error) {
      console.error("Error assigning patient:", error);
      setMessage("Failed to assign patient.");
    }
  };

  // ✅ Remove Patient from Room
  const removePatientFromRoom = async (roomId, patientId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomId}/remove`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      fetchRooms();
      fetchPatients();
    } catch (error) {
      console.error("Error removing patient:", error);
      setMessage("Failed to remove patient.");
    }
  };

  // ✅ Update Room Status
  const updateRoomStatus = async (roomId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
      fetchRooms();
    } catch (error) {
      console.error("Error updating room status:", error);
      setMessage("Failed to update status.");
    }
  };

  // ✅ Delete Room (Only if Empty)
  const deleteRoom = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rooms/${roomId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      setMessage(data.message);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      setMessage("Failed to delete room.");
    }
  };

  // ✅ Add New Room
  const addRoom = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });

      const data = await response.json();
      setMessage(data.message);
      fetchRooms();
    } catch (error) {
      console.error("Error adding room:", error);
      setMessage("Failed to add room.");
    }
  };
  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="text-center">Room Management</h2>
        {message && <Alert variant="success">{message}</Alert>}

        {/* ✅ Display Buttons to Switch Between Views */}
        {view === "home" && (
          <>
            <Row className="mb-4 text-center">
              <Col>
                <Button variant="primary" size="lg" onClick={() => setView("addRoom")}>
                  Add Room
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" size="lg" onClick={() => setView("assignRoom")}>
                  Assign Room
                </Button>
              </Col>
            </Row>

            {/* ✅ Room Status Display in Grid Format */}
            <h4 className="text-center mt-4">Room Status</h4>
            <Row className="d-flex justify-content-center">
              {rooms.map((room) => (
                <Col md={3} className="mb-3" key={room._id}>
                  <Card
                    style={{
                      backgroundColor: room.status === "Available" ? "#c3fdb8" : "#ffb3b3",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Room {room.roomNumber}</Card.Title>
                      <Card.Text>Type: {room.type}</Card.Text>
                      <Card.Text>Capacity: {room.capacity}</Card.Text>
                      <Card.Text>Status: {room.status}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* ✅ Add Room Section */}
        {view === "addRoom" && (
          <>
            <Button variant="outline-dark" onClick={() => setView("home")}>Back</Button>
            <h4 className="text-center mt-4">Add New Room</h4>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Room Number"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                />
              </Col>
              <Col md={3}>
                <Form.Select onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}>
                  <option value="ICU">ICU</option>
                  <option value="General">General</option>
                  <option value="Private">Private</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  placeholder="Capacity"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                />
              </Col>
              <Col md={3}>
                <Button variant="success" onClick={addRoom}>
                  Add Room
                </Button>
              </Col>
            </Row>
          </>
        )}

        {/* ✅ Assign Room Section */}
        {view === "assignRoom" && (
          <>
            <Button variant="outline-dark" onClick={() => setView("home")}>Back</Button>
            <h4 className="text-center mt-4">Assign Patient to Room</h4>
           <Table striped bordered hover className="mt-3 text-center ">
          <thead className="theadname">
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Residents</th>
              <th>Assign</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.type}</td>
                  <td>{room.capacity}</td>
                  <td>{room.status}</td>
                  <td>
                    {room.residents.length > 0
                      ? room.residents.map((resident) => (
                          <div key={resident._id}>
                            {resident.name}{" "}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                removePatientFromRoom(room._id, resident._id)
                              }
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      : "Empty"}
                  </td>
                  {/* <td>
                    <Form.Select onChange={(e) => setSelectedPatient({ ...selectedPatient, [room._id]: e.target.value })}>
                      <option value="">Select Patient</option>
                      {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Button variant="primary" size="sm" onClick={() => assignPatientToRoom(room._id)}>Assign</Button>

                    
                  </td> */}
                  <td>
                    <Form.Select
                      onChange={(e) =>
                        setSelectedPatient({
                          ...selectedPatient,
                          [room._id]: e.target.value,
                        })
                      }
                      disabled={
                        room.status === "Under Maintenance" ||
                        room.status === "Occupied"
                      } // ✅ Disable if room is locked or full
                    >
                      <option value="">Select Patient</option>
                      {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-2"
                      onClick={() => assignPatientToRoom(room._id)}
                      disabled={
                        room.status === "Under Maintenance" ||
                        room.status === "Occupied"
                      } // ✅ Disable if room is locked or full
                    >
                      Assign
                    </Button>
                  </td>

                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() =>
                        updateRoomStatus(room._id, "Under Maintenance")
                      }
                    >
                      Under Maintenance
                    </Button>
                    {/* <Button variant="success" size="sm" onClick={() => updateRoomStatus(room._id, "Available")}>Available</Button> */}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateRoomStatus(room._id, "Available")}
                      disabled={room.residents.length >= room.capacity} // ✅ Disable if full
                    >
                      Available
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteRoom(room._id)}
                      disabled={room.residents.length > 0}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No rooms found.</td>
              </tr>
            )}
          </tbody>
        </Table>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default RoomManagement;

//   return (
//     <>
//       <Header />
//       <Container className="mt-4">
//         <h2>Room Management</h2>
//         {message && <Alert variant="success">{message}</Alert>}

//         {/* ✅ Add Room Form */}
//         <Row className="mb-3">
//           <Col md={3}>
//             <Form.Control
//               type="text"
//               placeholder="Room Number"
//               value={newRoom.roomNumber}
//               onChange={(e) =>
//                 setNewRoom({ ...newRoom, roomNumber: e.target.value })
//               }
//             />
//           </Col>
//           <Col md={3}>
//             <Form.Select
//               onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
//             >
//               <option value="ICU">ICU</option>
//               <option value="General">General</option>
//               <option value="Private">Private</option>
//             </Form.Select>
//           </Col>
//           <Col md={3}>
//             <Form.Control
//               type="number"
//               placeholder="Capacity"
//               value={newRoom.capacity}
//               onChange={(e) =>
//                 setNewRoom({ ...newRoom, capacity: e.target.value })
//               }
//             />
//           </Col>
//           <Col md={3}>
//             <Button variant="success" onClick={addRoom}>
//               Add Room
//             </Button>
//           </Col>
//         </Row>

//         {/* ✅ Room Table */}
//         <Table striped bordered hover className="mt-3 text-center">
//           <thead>
//             <tr>
//               <th>Room Number</th>
//               <th>Type</th>
//               <th>Capacity</th>
//               <th>Status</th>
//               <th>Residents</th>
//               <th>Assign</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.length > 0 ? (
//               rooms.map((room) => (
//                 <tr key={room._id}>
//                   <td>{room.roomNumber}</td>
//                   <td>{room.type}</td>
//                   <td>{room.capacity}</td>
//                   <td>{room.status}</td>
//                   <td>
//                     {room.residents.length > 0
//                       ? room.residents.map((resident) => (
//                           <div key={resident._id}>
//                             {resident.name}{" "}
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() =>
//                                 removePatientFromRoom(room._id, resident._id)
//                               }
//                             >
//                               Remove
//                             </Button>
//                           </div>
//                         ))
//                       : "Empty"}
//                   </td>
//                   {/* <td>
//                     <Form.Select onChange={(e) => setSelectedPatient({ ...selectedPatient, [room._id]: e.target.value })}>
//                       <option value="">Select Patient</option>
//                       {patients.map((p) => (
//                         <option key={p._id} value={p._id}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     <Button variant="primary" size="sm" onClick={() => assignPatientToRoom(room._id)}>Assign</Button>

                    
//                   </td> */}
//                   <td>
//                     <Form.Select
//                       onChange={(e) =>
//                         setSelectedPatient({
//                           ...selectedPatient,
//                           [room._id]: e.target.value,
//                         })
//                       }
//                       disabled={
//                         room.status === "Under Maintenance" ||
//                         room.status === "Occupied"
//                       } // ✅ Disable if room is locked or full
//                     >
//                       <option value="">Select Patient</option>
//                       {patients.map((p) => (
//                         <option key={p._id} value={p._id}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       className="mt-2"
//                       onClick={() => assignPatientToRoom(room._id)}
//                       disabled={
//                         room.status === "Under Maintenance" ||
//                         room.status === "Occupied"
//                       } // ✅ Disable if room is locked or full
//                     >
//                       Assign
//                     </Button>
//                   </td>

//                   <td>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       onClick={() =>
//                         updateRoomStatus(room._id, "Under Maintenance")
//                       }
//                     >
//                       Under Maintenance
//                     </Button>
//                     {/* <Button variant="success" size="sm" onClick={() => updateRoomStatus(room._id, "Available")}>Available</Button> */}
//                     <Button
//                       variant="success"
//                       size="sm"
//                       onClick={() => updateRoomStatus(room._id, "Available")}
//                       disabled={room.residents.length >= room.capacity} // ✅ Disable if full
//                     >
//                       Available
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => deleteRoom(room._id)}
//                       disabled={room.residents.length > 0}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No rooms found.</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Container>
//       <Footer />
//     </>
//   );
//};

//export default RoomManagement;
