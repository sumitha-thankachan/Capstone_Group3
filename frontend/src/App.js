import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import CaregiverDashboard from "./Components/CaregiverDashboard";




function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
      </Routes> 
    </div>
  );
}

export default App;
