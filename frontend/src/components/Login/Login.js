import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_API_URL || "http://44.200.76.182:5000";
      
      console.log("Login using API URL:", baseUrl); 

      const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful");
        if (formData.role === "user") navigate("/");
        else if (formData.role === "counsellor") navigate("/counsellor-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2 style={{ textAlign: "center", marginTop: "20px", color: "#2c3e50" }}>
          Welcome CalmSpace!
        </h2>
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>Login Page</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="counsellor">Counsellor</option>
            </select>
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account? <Link to="/signup">Sign Up here</Link>
        </p>
      </div>
      <br /><br />
      <Footer />
    </div>
  );
};

export default Login;