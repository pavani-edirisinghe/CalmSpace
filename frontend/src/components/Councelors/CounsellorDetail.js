import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaUserCircle } from "react-icons/fa";
import "./CounsellorDetail.css";

const CounsellorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); 
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const baseUrl = process.env.REACT_APP_API_URL || "http://44.200.76.182:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`${baseUrl}/api/counsellor/profile/${id}`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        const availRes = await fetch(`${baseUrl}/api/counsellor/availability/${id}`);
        const availData = await availRes.json();
        setAvailability(availData);

        const bookedRes = await fetch(`${baseUrl}/api/appointments/${id}`);
        const bookedData = await bookedRes.json();
        setBookedSlots(bookedData);

      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchData();
  }, [id, baseUrl]); 

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let current = new Date(`2025-01-01T${startTime}`);
    const end = new Date(`2025-01-01T${endTime}`);

    while (current < end) {
      const next = new Date(current.getTime() + 30 * 60000);
      const timeString = `${current.toTimeString().slice(0, 5)} - ${next.toTimeString().slice(0, 5)}`;
      slots.push(timeString);
      current = next;
    }
    return slots;
  };

  const isSlotBooked = (day, timeSlot) => {
    return bookedSlots.some(
      (booking) => booking.appointment_date === day && booking.time_slot === timeSlot
    );
  };

  const handleSlotClick = (day, slot) => {
    if (!user) {
      alert("Please login to book an appointment.");
      navigate("/login");
      return;
    }
    if (String(user.id) === String(id)) {
      alert("You cannot book an appointment with yourself!");
      return;
    }
    setSelectedSlot({ day, slot });
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;

    try {
      const res = await fetch(`${baseUrl}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          counsellor_id: id,
          appointment_date: selectedSlot.day,
          time_slot: selectedSlot.slot,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Appointment Booked Successfully!");
        
        const bookedRes = await fetch(`${baseUrl}/api/appointments/${id}`);
        const bookedData = await bookedRes.json();
        setBookedSlots(bookedData);
        setSelectedSlot(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book appointment.");
    }
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
              <h3>Select a Time Slot</h3>
              
              {availability.length > 0 ? (
                availability.map((day) => (
                  <div key={day.day_of_week} className="day-section">
                    <h4>{day.day_of_week}</h4>
                    <div className="time-slots">
                      {day.timeSlots &&
                        day.timeSlots.map((slotSet, i) =>
                          generateTimeSlots(slotSet.start_time, slotSet.end_time).map((slot) => {
                            const booked = isSlotBooked(day.day_of_week, slot);
                            const isSelected = selectedSlot?.day === day.day_of_week && selectedSlot?.slot === slot;

                            return (
                              <button
                                key={slot + i}
                                disabled={booked} 
                                className={`time-slot-btn ${booked ? "booked" : "available"} ${isSelected ? "selected" : ""}`}
                                onClick={() => !booked && handleSlotClick(day.day_of_week, slot)}
                                title={booked ? "Already Booked" : "Click to Select"}
                              >
                                {slot} {booked && "(Booked)"}
                              </button>
                            );
                          })
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-slots">No availability set by this counsellor.</p>
              )}
            </div>

            {selectedSlot && (
              <div className="booking-confirmation">
                <p>
                  Selected: <strong>{selectedSlot.day}</strong> at <strong>{selectedSlot.slot}</strong>
                </p>
                <button className="confirm-btn" onClick={handleBooking}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="loading-text">Loading counsellor details...</p>
        )}
      </div>
    </>
  );
};

export default CounsellorDetail;