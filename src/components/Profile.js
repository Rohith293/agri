import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import your CSS file for styling

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Farmer Profile</h2>
      <div className="profile-info">
        <strong>Email:</strong> {user?.email}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}