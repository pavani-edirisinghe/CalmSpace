import React from "react";
import "./About.css";

const About = () => {
  return (
   <section id="about" className="about section">
  <div className="container">
    <div className="about-row">
      
      <div className="about-image">
        <img src="/assets/img/about.jpg" alt="About Us" className="about-img" />
        <a
          href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
          className="pulsating-play-btn"
          target="_blank"
          rel="noreferrer"
          aria-label="Watch About Us Video"
        ></a>
      </div>

      <div className="about-content">
        <h3>About Us</h3>
        <p>
          We are dedicated to improving emotional well-being and mental health through personalized counselling sessions.
        </p>
        <ul>
          <li>
            <i className="fa-solid fa-heart-circle-check"></i>
            <div>
              <h5>Confidential Counselling</h5>
              <p>Your privacy is our top priority during every session.</p>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-brain"></i>
            <div>
              <h5>Expert Therapists</h5>
              <p>Our certified counsellors guide you with empathy and care.</p>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-hands-holding"></i>
            <div>
              <h5>Supportive Environment</h5>
              <p>We provide a calm and welcoming space to open up freely.</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>

  );
};

export default About;
