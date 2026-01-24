import React from "react";
// 1. Change 'Link' to 'NavLink' in the import
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <small>
            <i className="far fa-clock text-primary me-2"></i>
            Opening Hours: Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed
          </small>
        </div>
        <div className="topbar-right">
          <div className="border-end">
            <p>
              <i className="fa fa-envelope-open me-2"></i>calmspace@gmail.com
            </p>
          </div>
          <div>
            <p>
              <i className="fa fa-phone-alt me-2"></i>012 345 6789
            </p>
          </div>
        </div>
      </div>

      <nav
        className="navbar"
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div className="logo">
          <img src={logo} alt="CalmSpace Logo" className="navbar-logo" />
          CalmSpace
        </div>
        
        <ul className="nav-links">
          {/* 2. Use NavLink instead of Link.
             The 'end' prop ensures Home is only blue when exactly at "/" 
          */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/counselors" className={({ isActive }) => (isActive ? "active" : "")}>
              Counselors
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>

          {user ? (
            <>
              {user.role === "counsellor" && (
                <li>
                  <NavLink 
                    to="/counsellor-dashboard" 
                    title="Counsellor Dashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="fa fa-user-circle" style={{ fontSize: "1.2rem", marginRight: "5px" }}></i>
                    Profile
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink to="/login" onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;