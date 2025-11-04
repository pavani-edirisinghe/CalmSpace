import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaUserCircle } from "react-icons/fa";
import "./CounsellorDetail.css";

const CounsellorDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`http://localhost:5000/api/counsellor/profile/${id}`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const availRes = await fetch(`http://localhost:5000/api/counsellor/availability/${id}`);
        const availData = await availRes.json();
        setAvailability(availData);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchData();
  }, [id]);

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let current = new Date(`2025-01-01T${startTime}`);
    const end = new Date(`2025-01-01T${endTime}`);

    while (current < end) {
      const next = new Date(current.getTime() + 30 * 60000);
      slots.push(`${current.toTimeString().slice(0, 5)} - ${next.toTimeString().slice(0, 5)}`);
      current = next;
    }
    return slots;
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    alert(`You selected: ${slot}`);
  };

  return (

    <>
    <Navbar />
    <div className="counsellor-detail-page">
      
      {profile ? (
        <div className="counsellor-detail-card">
          <div className="profile-section">
            <div className="profile-icon">
              <FaUserCircle className="icon" />
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="profession">{profile.profession}</p>
              <p className="bio">{profile.bio}</p>
            </div>
          </div>

          <div className="availability-section">
            <h3>Available Time Slots</h3>
            {availability.length > 0 ? (
              availability.map((day) => (
                <div key={day.day_of_week} className="day-section">
                  <h4>{day.day_of_week}</h4>
                  <div className="time-slots">
                    {day.timeSlots &&
                      day.timeSlots.map((slotSet, i) =>
                        generateTimeSlots(slotSet.start_time, slotSet.end_time).map((slot) => (
                          <button
                            key={slot + i}
                            className={`time-slot-btn ${selectedSlot === slot ? "selected" : ""}`}
                            onClick={() => handleSlotClick(slot)}
                          >
                            {slot}
                          </button>
                        ))
                      )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-slots">No available slots yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading counsellor details...</p>
      )}
    </div>
    </>
  );
};

export default CounsellorDetail;
