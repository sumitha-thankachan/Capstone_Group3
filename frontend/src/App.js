import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./Components/LoginSignup";

import Home from "./Components/Home";
import AdminDashboard from "./Components/AdminDashboard";
import CaregiverDashboard from "./Components/CaregiverDashboard";
import TaskManagement from "./Components/TaskManagement";
import CaregiverRegistration from "./Components/caregiverRegistration";
import CaregiverList from "./Components/CaregiverList";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import Financial from "./Components/Financial";
import AddExpenses from "./Components/AddExpenses";
import AddDonations from "./Components/AddDonations";
import AddPayment from "./Components/AddPayment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
        {/* <Route path="/patient-dashboard" element={<PatientDashboard />} /> */}

        <Route path="/Tasks" element={<TaskManagement />} />
        <Route path="/home" element={< Home />} />
        <Route path="/Registration" element={< CaregiverRegistration />} />
        <Route path="/Caregiver-list" element={< CaregiverList />} />
        <Route path="/contact-us" element={< ContactUs />} />
        <Route path="/about-us" element={< AboutUs />} />
        <Route path="/financial" element={< Financial />} />
        <Route path="/AddExpenses" element={< AddExpenses />} />
        <Route path="/AddDonations" element={< AddDonations />} />
        <Route path="/AddPayment" element={< AddPayment />} />
      </Routes> 
    </div>
  );
}

export default App;
