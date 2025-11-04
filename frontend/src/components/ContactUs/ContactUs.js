import React from "react";
import Navbar from "../Navbar/Navbar"; 
import Contact from "./Contact";
import Footer from "../Footer/Footer";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <Navbar />

      <section
        className="contact-hero-section"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="contact-hero-title">CONTACT US</h1>
      </section>
      
      <Contact />
      <Footer />

    </div>
  );
};

export default ContactUs;
