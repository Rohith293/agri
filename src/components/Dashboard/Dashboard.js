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
        <div className="chart-container">
          <Charts />
        </div>
        <Link to="/plant-suggestion" className="plant-suggestion-link">
          Go to Plant Suggestion
        </Link>
      </section>
    </main>
  </div>
);
}