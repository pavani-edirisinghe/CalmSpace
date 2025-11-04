import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import "./Navbar.css";

const Navbar = () => {
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
           <img src={logo} alt="CalmSpace Logo" className="navbar-logo" />CalmSpace</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/counselors">Counselors</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
