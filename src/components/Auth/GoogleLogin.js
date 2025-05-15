// src/components/Auth/GoogleLogin.js
import { signInWithGoogle } from "../../firebase";

export default function GoogleLogin() {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <button onClick={handleLogin} className="google-login-btn">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
        alt="Google logo" 
        width="18"
        height="18"
      />
      Continue with Google
    </button>
  );
}