import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './PatientDashboard.css';

const Sidebar = () => {
  const [user, setUser] = useState({
    name: 'User',
    photo: 'default-profile.png',
    userType: null,
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    const storedUserType = localStorage.getItem('userType');

    if (email && storedUserType === 'Patient') {
      const apiUrl = `http://localhost:5000/api/patients/profile/${email}`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) =>
          setUser({
            name: data.name || 'Patient',
            photo: data.medicalPhoto || 'default-profile.png',
            userType: 'Patient',
          })
        )
        .catch((err) => console.error('Sidebar fetch error:', err));
    } 
    else if (email && (storedUserType === 'Caregiver')){

      const apiUrl = `http://localhost:5000/api/caregivers/profile/${email}`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) =>
          setUser({
            name: data.name || 'Caregiver',
            photo: data.photo  || 'default-profile.png',
            userType: 'Caregiver',
          })
        )
        .catch((err) => console.error('Sidebar fetch error:', err));
    } 
    else {
      // For Admin and Caregiver, fetching will be implemented later.
      setUser(prev => ({ ...prev, userType: storedUserType }));
    }

    // Uncomment below once your backend APIs for Admin and Caregiver are ready
    
    // if (email && (storedUserType === 'Caregiver')){  //|| storedUserType === 'Admin')) {
    //   let apiUrl = '';

    //   if (storedUserType === 'Caregiver') {
    //     apiUrl = `http://localhost:5000/api/caregivers/profile/${email}`;
    //   } else if (storedUserType === 'Admin') {
    //     apiUrl = `http://localhost:5000/api/admins/profile/${email}`;
    //   }

    //   fetch(apiUrl)
    //     .then((res) => res.json())
    //     .then((data) =>
    //       setUser({
    //         name: data.name || storedUserType,
    //           photo: data.image || 'default-profile.png',
    //         userType: storedUserType,
    //       })
    //     )
    //     .catch((err) => console.error('Sidebar fetch error:', err));
    // }
    
  }, []);

  return (
    <aside className="dashboard-sidebar">
      {(user.userType === 'Patient' || user.userType === 'Caregiver')&& (
        <img
          src={`http://localhost:5000/uploads/${user.photo}`}
          alt="Profile"
          className="rounded-circle mb-3 image-side"
          width="100"
          height="100"
        />
      )}

      <h5>{user.name}</h5>

      <div className="dashboard-nav mt-3">
        {user.userType === "Admin" && (
          <>
            <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/Caregiver-list" className={({ isActive }) => isActive ? "active" : ""}>
              👥 Caregivers
            </NavLink>
            <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
              🧑‍⚕️ Patients
            </NavLink>
            <NavLink to="/Tasks" className={({ isActive }) => isActive ? "active" : ""}>
              📋 Tasks
            </NavLink>
            <NavLink to="/Financial" className={({ isActive }) => isActive ? "active" : ""}>
              💰 Financial
            </NavLink>
            <NavLink to="/room-management" className={({ isActive }) => isActive ? "active" : ""}>
              🚪 Rooms
            </NavLink>
          </>
        )}

        {user.userType === "Caregiver" && (
          <>
            <NavLink to="/caregiver-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/Registration" className={({ isActive }) => isActive ? "active" : ""}>
              📝 Registration
            </NavLink>
            <NavLink to="/change-password" className={({ isActive }) => isActive ? "active" : ""}>
              🔐 Password
            </NavLink>
          </>
        )}

        {user.userType === "Patient" && (
          <>
            <NavLink to="/patient-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              📊 Dashboard
            </NavLink>
            <NavLink to="/patient-registration" className={({ isActive }) => isActive ? "active" : ""}>
              📝 Registration
            </NavLink>
            <NavLink to="/change-password" className={({ isActive }) => isActive ? "active" : ""}>
              🔐 Password
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
              👤 Profile
            </NavLink>
            <NavLink to="/patient-financial" className={({ isActive }) => isActive ? "active" : ""}>
                          👤 Financial
                        </NavLink>
          </>
        )}

        {!user.userType && (
          <>
            <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
              🏠 Home
            </NavLink>
            <NavLink to="/about-us" className={({ isActive }) => isActive ? "active" : ""}>
              ℹ️ About Us
            </NavLink>
            <NavLink to="/contact-us" className={({ isActive }) => isActive ? "active" : ""}>
              📞 Contact Us
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
