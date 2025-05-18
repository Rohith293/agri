// src/components/Dashboard/Dashboard.js
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Charts from "./Charts";
import "./Dashboard.css";


import { Link } from "react-router-dom";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
  <div className="dashboard-container">
    <header className="dashboard-header">
      <Link to="/profile" className="profile-link">Profile</Link>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleLogout} className="logout-btn">
        Sign Out
      </button>
    </header>
    <main className="dashboard-content">
      <section className="data-section">
        <h2>Farm Analytics Dashboard</h2>
        <p>Monitor your farm's health and performance.</p>
        <p>Check the soil moisture, temperature, and humidity levels.</p>
        <p>Get insights on the best plants to grow based on your soil conditions.</p>
        <p>Use the charts below to visualize your data.</p>
        <p>Click on the "Plant Suggestion" link to find suitable plants for your farm.</p>
        <Link to="/plant-suggestion" className="plant-suggestion-link">
          Plant Suggestion
        </Link>
        <p> </p>
        <div className="chart-container">
          <Charts />
        </div>
        
      </section>
    </main>
  </div>
);
}