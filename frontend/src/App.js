import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import CaregiverDashboard from "./Components/CaregiverDashboard";
import TaskManagement from "./Components/TaskManagement";
import CaregiverRegistration from "./Components/caregiverRegistration";
import CaregiverList from "./Components/CaregiverList";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
        <Route path="/Tasks" element={<TaskManagement />} />
        <Route path="/Registration" element={< CaregiverRegistration />} />
        <Route path="/Caregiver-list" element={< CaregiverList />} />

      </Routes> 
    </div>
  );
}

export default App;
