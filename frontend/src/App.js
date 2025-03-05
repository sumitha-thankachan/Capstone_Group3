import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import CaregiverDashboard from "./Components/CaregiverDashboard";
import TaskManagement from "./Components/TaskManagement";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
        <Route path="/Tasks" element={<TaskManagement />} />
      </Routes> 
    </div>
  );
}

export default App;