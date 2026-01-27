import React, { useState, useEffect } from "react";
import "./AvailabilityForm.css";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AvailabilityForm = () => {
  const [availability, setAvailability] = useState(
    daysOfWeek.map((day) => ({
      day,
      available: false,
      startTime: "",
      endTime: "",
    }))
  );

  const [bookedDays, setBookedDays] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const counsellorId = user?.id;

  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      if (!counsellorId) return;

      try {
        const availRes = await fetch(
          `${baseUrl}/api/counsellor/availability/${counsellorId}`
        );
        const availData = await availRes.json();

        const bookingRes = await fetch(
          `${baseUrl}/api/appointments/${counsellorId}`
        );
        const bookingData = await bookingRes.json();

        const activeBookings = bookingData.map((b) => b.appointment_date);
        setBookedDays(activeBookings);

        if (availData && availData.length > 0) {
          const updated = daysOfWeek.map((day) => {
            const dayData = availData.find((d) => d.day_of_week === day);
            return {
              day,
              available: !!dayData,
              startTime: dayData?.timeSlots?.[0]?.start_time || "",
              endTime: dayData?.timeSlots?.[0]?.end_time || "",
            };
          });
          setAvailability(updated);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setProfileFetched(true);
      }
    };

    fetchData();
  }, [counsellorId, baseUrl]);

  const isDayBooked = (dayName) => {
    return bookedDays.includes(dayName);
  };

  const handleCheckboxChange = (index) => {
    const dayName = availability[index].day;
    const currentlyAvailable = availability[index].available;

    if (currentlyAvailable && isDayBooked(dayName)) {
      alert(
        `You cannot remove ${dayName} because you have pending appointments on this day.`
      );
      return; 
    }

    const updated = [...availability];
    updated[index].available = !updated[index].available;

    if (!updated[index].available) {
      updated[index].startTime = "";
      updated[index].endTime = "";
    }

    setAvailability(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const dayName = availability[index].day;

    if (isDayBooked(dayName)) {
      alert(
        `You cannot modify the time for ${dayName} because you have active bookings. Booked users expect the original time slot.`
      );
      return; 
    }

    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!counsellorId) {
      alert("User not logged in!");
      return;
    }

    const incompleteDay = availability.find(
      (d) => d.available && (!d.startTime || !d.endTime)
    );

    if (incompleteDay) {
      alert(`Please select both Start Time and End Time for ${incompleteDay.day}`);
      return;
    }

    const selectedDays = availability
      .filter((d) => d.available)
      .map((d) => ({
        day: d.day,
        timeSlots: [{ startTime: d.startTime, endTime: d.endTime }],
      }));

    try {
      setLoading(true);
      
      const res = await fetch(
        `${baseUrl}/api/counsellor/availability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ counsellorId, availability: selectedDays }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Availability saved successfully!");
        setViewMode(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving availability");
    } finally {
      setLoading(false);
    }
  };

  if (!profileFetched) return <p>Loading availability...</p>;

  if (viewMode) {
    const availableDays = availability.filter((d) => d.available);

    return (
      <div className="availability-view">
        <h2>My Availability</h2>
        {availableDays.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {availableDays.map((d) => (
                <tr key={d.day}>
                  <td>{d.day} {isDayBooked(d.day) && <span style={{color:'red', fontSize:'0.8em'}}>(Booked)</span>}</td>
                  <td>{d.startTime}</td>
                  <td>{d.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No availability set yet.</p>
        )}
        <button
          onClick={() => setViewMode(false)}
          className="save-btn"
          style={{ marginTop: "20px" }}
        >
          Edit Availability
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Set Your Availability</h2>
      <form onSubmit={handleSubmit}>
        <div className="availability-table">
          <div className="table-header">
            <span>Day</span>
            <span>Available</span>
            <span>Start Time</span>
            <span>End Time</span>
          </div>

          {availability.map((dayObj, index) => {
            const hasBooking = isDayBooked(dayObj.day);
            
            return (
              <div key={dayObj.day} className="table-row">
                <span>
                  {dayObj.day} 
                  {hasBooking && <span style={{color: 'red', fontSize: '10px', display:'block'}}> (Has Bookings)</span>}
                </span>
                <input
                  type="checkbox"
                  checked={dayObj.available}
                  onChange={() => handleCheckboxChange(index)}
                />

                <input
                  type="time"
                  value={dayObj.startTime}
                  onChange={(e) =>
                    handleTimeChange(index, "startTime", e.target.value)
                  }
                  disabled={!dayObj.available} 
                  required={dayObj.available}
                />

                <input
                  type="time"
                  value={dayObj.endTime}
                  onChange={(e) =>
                    handleTimeChange(index, "endTime", e.target.value)
                  }
                  disabled={!dayObj.available}
                  required={dayObj.available}
                />
              </div>
            );
          })}
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Availability"}
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;