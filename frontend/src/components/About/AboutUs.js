import React from "react";
import Navbar from "../Navbar/Navbar"; 
import About from "./About";  
import Counsellors from "./Team";
import Gallery from "./Gallery";
import Contact from "../ContactUs/Contact";
import Footer from "../Footer/Footer";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />

      <section
        className="about-hero-section"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="about-hero-title">ABOUT US</h1>
      </section>

      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-row">
            <div className="about-image-col">
              <img
                className="about-image"
                src="assets/img/health-care.png"
                alt="Healthcare"
              />
            </div>
           <div className="about-text-col">
  <h2 className="about-heading">
    Supporting Your Mental Health <br className="d-none d-sm-block" />
    Anytime, Anywhere
  </h2>
  <p className="about-description">
    At <strong>CalmSpace</strong>, we believe that mental wellness is just as important as physical health. 
    Our platform connects you with professional counselors and therapists in a safe, confidential environment. 
    <br className="d-none d-sm-block" />
    Booking a session is simple — choose a counselor, pick a time, and get guidance from the comfort of your home.
    
    Whether you need help managing stress, anxiety, or simply someone to talk to, we make professional support accessible for everyone.
    
    Your well-being is our priority, and we are committed to providing compassionate, personalized care whenever you need it.
  </p>
  <div className="about-btn-wrapper">
    <button className="about-btn" type="button">
      Explore Counselors
    </button>
  </div>


            </div>
          </div>
        </div>
      </section>
<br /><br />
      <About />
      <Counsellors />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;
