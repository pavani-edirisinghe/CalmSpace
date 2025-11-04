import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ProfileForm from "./ProfileForm";
import AvailabilityForm from "./AvailabilityForm";
import "./CounsellorDashboard.css";

const CounsellorDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileForm />;
      case "availability":
        return <AvailabilityForm />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h3>Counsellor Panel</h3>
          <ul>
            <li
              className={activeSection === "profile" ? "active" : ""}
              onClick={() => setActiveSection("profile")}
            >
              My Profile
            </li>
            <li
              className={activeSection === "availability" ? "active" : ""}
              onClick={() => setActiveSection("availability")}
            >
              Add Available Times
            </li>
          </ul>
        </aside>

        <main className="dashboard-content">{renderSection()}</main>
      </div>
      <Footer />
    </div>
  );
};

export default CounsellorDashboard;
