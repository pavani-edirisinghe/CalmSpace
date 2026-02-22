import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Counselors.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Counselors = () => {
  // Initialize as an empty array to prevent initial errors
  const [counsellors, setCounsellors] = useState([]);
  const navigate = useNavigate();

  // Use the public IP if running on AWS, otherwise localhost
  const baseUrl = process.env.REACT_APP_API_URL || "http://54.92.192.253:5000";

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/counsellor/all`);
        
        // Check if response is okay (status 200-299)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Data received:", data); // Check console (F12) to see this!

        // Safety: Only set state if data is an Array
        if (Array.isArray(data)) {
            setCounsellors(data);
        } else {
            console.error("Data is not an array:", data);
            setCounsellors([]); // Fallback to empty list
        }

      } catch (error) {
        console.error("Error fetching counsellors:", error);
        setCounsellors([]); // Safety fallback
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
      
      {/* Safety Check: Only map if it is an array and has items */}
      <div className="counsellor-grid">
        {Array.isArray(counsellors) && counsellors.length > 0 ? (
            counsellors.map((c) => (
            <div key={c.id} className="counsellor-card">
                <div className="counsellor-image">
                <FaUserCircle className="profile-icon" />
                </div>
                <h3>{c.name}</h3>
                <p className="profession">{c.profession || "Counselor"}</p>
                <p className="bio">{c.bio || "Ready to help."}</p>
                <button
                className="view-btn"
                onClick={() => handleViewProfile(c.user_id)}
                >
                View Availability
                </button>
            </div>
            ))
        ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
                No counselors found or loading...
            </p>
        )}
      </div>
    </div>
  );
};

export default Counselors;