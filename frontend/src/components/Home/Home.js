import React from "react";
import Navbar from "../Navbar/Navbar"; 
import About from "../About/About";  
import Counsellors from "../About/Team";
import Gallery from "../About/Gallery";
import Contact from "../ContactUs/Contact";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      <section id="home" className="home-section">
        <div
          className="bg-holder"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/hero-bg.png)`,
          }}
        ></div>

        <div className="container">
          <div className="row">
            <div className="col text-content">
              <h1>
                 We're <strong>committed</strong> to your <strong>mental well-being.</strong>
              </h1>
              <p>
                Book your counselling sessions anytime, anywhere. Our licensed therapists are here to listen and guide you toward a happier, balanced life.
              </p>
              <a href="#appointment" className="btn-primary">
                Book a Session
              </a>

            </div>

            <div className="col image-content">
              <div className="hero-image-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/hero.png`}
                  alt="hero"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="departments-section" id="departments">
  <div className="container">
    <h2 className="section-title">Our Departments</h2>
    <p className="section-subtitle">
      Explore our specialized counselling departments designed to support your mental and emotional well-being.
    </p>

    <div className="departments-grid">
      <div className="department-card">
        <img src="/assets/img/mental-health.jpeg" alt="Mental Health" />
        <h3>Mental Health</h3>
        <p>
          Personalized therapy sessions to help you manage anxiety, depression, and emotional stress.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/career-guidance.jpeg" alt="Career Guidance" />
        <h3>Career Guidance</h3>
        <p>
          Discover your strengths and explore career paths with our expert counsellors.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/relashionship.jpeg" alt="Relationship Counselling" />
        <h3>Relationship Counselling</h3>
        <p>
          Strengthen communication and rebuild trust in your relationships.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/stress.jpeg" alt="Stress Management" />
        <h3>Stress Management</h3>
        <p>
          Learn practical strategies to handle stress and lead a balanced life.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/family.jpeg" alt="Family Counselling" />
        <h3>Family Counselling</h3>
        <p>
          Improve family communication, resolve conflicts, and build stronger relationships at home.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/child.jpeg" alt="Child & Adolescent Counselling" />
        <h3>Child & Adolescent Counselling</h3>
        <p>
          Gentle, age-appropriate support for children and teens facing emotional or behavioral challenges.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/academic.jpeg" alt="Academic Counselling" />
        <h3>Academic Counselling</h3>
        <p>
          Guidance for students to overcome study stress, improve focus, and reach their academic goals.
        </p>
      </div>

      <div className="department-card">
        <img src="/assets/img/wellness.jpeg" alt="Wellness & Lifestyle Coaching" />
        <h3>Wellness & Lifestyle Coaching</h3>
        <p>
          Empower yourself through mindfulness, self-care, and healthy lifestyle practices for long-term balance.
        </p>
      </div>
    </div>
  </div>
</section>

      <About />
      <Counsellors />
      <Gallery />
      <Contact />
      <Footer />

    </div>
  );
};

export default Home;
