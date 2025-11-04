import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AboutUs from "./components/About/AboutUs";
import Counselors from "./components/Councelors/Counselors";
import Login from "./components/Login/Login";
import Register from "./components/Login/SignUp";
import Contact from "./components/ContactUs/ContactUs";
import CounsellorDashboard from "./components/Dashboard/CounsellorDashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CounsellorDetail from "./components/Councelors/CounsellorDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/counselors" element={<Counselors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/counsellor/:id" element={<CounsellorDetail />} />
        <Route path="/counsellor/:user_id" element={<CounsellorDetail />} />
        
        <Route
          path="/counsellor-dashboard"
          element={
            <ProtectedRoute role="counsellor">
              <CounsellorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
