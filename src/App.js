import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Profile from './components/Dashboard/Profile'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        // Add this to your routes
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}