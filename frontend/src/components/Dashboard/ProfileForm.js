import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileForm.css";
import "./CounsellorDashboard.css";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false); 
  const [viewMode, setViewMode] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  

useEffect(() => {
  const fetchProfile = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/counsellor/profile/${user.id}`
      );

      if (res.data && res.data.name) {
        setProfile({
          name: res.data.name,
          profession: res.data.profession,
          bio: res.data.bio,
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setProfileFetched(true);
    }
  };

  fetchProfile();
}, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in!");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/counsellor/profile",
        {
          user_id: user.id,
          name: profile.name,
          profession: profile.profession,
          bio: profile.bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        alert("Profile saved successfully!");
        setViewMode(true);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!profileFetched) {
    return <p>Loading profile...</p>;
  }

  if (viewMode) {
    return (
      <div className="profile-view">
        <h2>My Profile</h2>
        {profile.name ? (
          <div className="profile-card">
            <p><strong>Full Name:</strong> {profile.name}</p>
            <p><strong>Profession:</strong> {profile.profession}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio added yet."}</p>
            <button className="edit-btn" onClick={() => setViewMode(false)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="no-profile">
            <p>No profile found. Please create your profile.</p>
            <button className="create-btn" onClick={() => setViewMode(false)}>
              Create Profile
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>{profile.name ? "Edit Profile" : "Create Profile"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Profession:
          <input
            type="text"
            name="profession"
            value={profile.profession}
            onChange={handleChange}
            required
          />
        </label>

        <br />

        <label>
          Bio:
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Short introduction..."
          />
        </label>
<br />
        <div className="btn-group">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setViewMode(true)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
