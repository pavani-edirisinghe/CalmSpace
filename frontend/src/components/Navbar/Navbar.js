import React, { useState } from "react";
// 1. Change 'Link' to 'NavLink' in the import
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // --- HAMBURGER MENU LOGIC ---
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    closeMobileMenu(); // Close menu on logout
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

      {/* Removed inline styles here so CSS can control mobile view */}
      <nav className="navbar">
        <div className="navbar-container">
            <div className="logo">
                <img src={logo} alt="CalmSpace Logo" className="navbar-logo" />
                CalmSpace
            </div>

            {/* --- HAMBURGER ICON (Visible only on Mobile via CSS) --- */}
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            
            {/* Added 'active' class logic for sliding effect */}
            <ul className={click ? "nav-links active" : "nav-links"}>
            <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                About Us
                </NavLink>
            </li>
            <li>
                <NavLink to="/counselors" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                Counselors
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
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
                        onClick={closeMobileMenu}
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
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                    Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMobileMenu}>
                    Sign Up
                    </NavLink>
                    
                </li>
                </>
            )}
            <br></br>
            </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;