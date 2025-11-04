import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo"><span>CalmSpace</span></h3>
          <p>
            CalmSpace is your safe space for emotional well-being, growth, and
            connection. We help you find balance through professional counselling.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>No.12, Peace Avenue, Galle, Sri Lanka</p>
          <p>📧 hello@calmspace.lk</p>
          <p>📞 +94 77 654 3210</p>
        </div>

        <div className="footer-col social-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 CalmSpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
