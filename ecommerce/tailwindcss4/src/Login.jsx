import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import logo from './assets/logo.jpg';

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* Left Half - Branding / Image */}
      <div className="login-left">
      <img src={logo} alt="ShopMind AI"/>

        <h1 className="branding-title">ShopMind AI</h1>
        <p className="branding-subtext">Smart Shopping Powered by AI</p>
      </div>

      {/* Right Half - Login Form */}
      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="input-group">
              <div className="input-icon-wrapper">
                <span className="icon">👤</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Role Field */}
            <div className="input-group">
              <div className="input-icon-wrapper">
                <span className="icon">🎭</span>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                  required
                >
                   <option value="">
                    Choose your role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
