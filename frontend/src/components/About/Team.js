import React from "react";
import "./Team.css";

const Counsellors = () => {
  return (
<section className="team-section" id="team">
  <div className="container">
    <h2 className="section-title">Meet Our Counsellors</h2>
    <p className="section-subtitle">
      Our experienced counsellors are here to help you grow, heal, and find balance.
    </p>
    <div className="team-grid">
      <div className="team-card">
        <img src="/assets/img/counsellor1.jpeg" alt="Dr. Maya Silva" />
        <h3>Dr. Maya Silva</h3>
        <p>Mental Health Specialist</p>
      </div>
      <div className="team-card">
        <img src="/assets/img/counsellor2.jpeg" alt="Mr. Nuwan Perera" />
        <h3>Mr. Nuwan Perera</h3>
        <p>Career & Stress Counsellor</p>
      </div>
      <div className="team-card">
        <img src="/assets/img/counsellor3.jpeg" alt="Ms. Tharushi Fernando" />
        <h3>Ms. Tharushi Fernando</h3>
        <p>Relationship Therapist</p>
      </div>
    </div>
  </div>
</section>
    );
};

export default Counsellors;