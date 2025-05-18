import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Dashboard from "./components/Dashboard/Dashboard.js";

import PlantSuggestion from "./components/PlantSuggestion";
import Profile from "./components/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plant-suggestion" element={<PlantSuggestion />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
