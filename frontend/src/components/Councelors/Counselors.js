import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Counselors.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Counselors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/counsellor/all`);
        const data = await res.json();
        setCounsellors(data);
      } catch (error) {
        console.error("Error fetching counsellors:", error);
      }
    };
    fetchCounsellors();
  }, [baseUrl]); 

  const handleViewProfile = (id) => {
    navigate(`/counsellor/${id}`);
  };

  return (
    <div>
      <Navbar />
      <h2 className="page-title">Our Counselors</h2>
      <div className="counsellor-grid">
        {counsellors.map((c) => (
          <div key={c.id} className="counsellor-card">
            <div className="counsellor-image">
              <FaUserCircle className="profile-icon" />
            </div>
            <h3>{c.name}</h3>
            <p className="profession">{c.profession}</p>
            <p className="bio">{c.bio}</p>
            <button
              className="view-btn"
              onClick={() => handleViewProfile(c.user_id)}
            >
              View Availability
            </button>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counselors;