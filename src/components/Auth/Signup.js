// src/components/Auth/Signup.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; // Add db to the import
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        farmName: farmName || "My Farm",
        createdAt: new Date(),
        role: "farmer",
        lastLogin: new Date()
      });
      
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  // ... rest of your component remains the same ...

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Farm Account</h1>
        
        <div className="social-login">
          <GoogleLogin />
          <div className="divider">
            <span>or</span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Farm Name (Optional)</label>
            <input
              type="text"
              placeholder="Sunny Acres Farm"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
}