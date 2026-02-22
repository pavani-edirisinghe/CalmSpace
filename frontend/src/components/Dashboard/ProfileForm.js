import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [viewMode, setViewMode] = useState(true);

  const [hoverSave, setHoverSave] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  // --- FIX 1: Extract userId here so we don't need 'user' inside useEffect ---
  const userId = user?.id;
  const token = localStorage.getItem("token");

  const baseUrl = process.env.REACT_APP_API_URL || "http://54.92.192.253:5000";

  useEffect(() => {
    const fetchProfile = async () => {
      // --- FIX 2: Check userId instead of user ---
      if (!userId) return;
      try {
        const res = await axios.get(
          `${baseUrl}/api/counsellor/profile/${userId}` // Use userId variable
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
    
    // --- FIX 3: Dependency is now just userId. No more warning! ---
  }, [userId, baseUrl]); 

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
        `${baseUrl}/api/counsellor/profile`,
        {
          user_id: user.id,
          name: profile.name,
          profession: profile.profession,
          bio: profile.bio,
        },
        { headers: { Authorization: `Bearer ${token}` } }
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

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "25px",
      fontWeight: "700",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "15px",
      boxSizing: "border-box", 
    },
    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "15px",
      boxSizing: "border-box",
      minHeight: "100px",
      resize: "vertical",
    },
    btnGroup: {
      display: "flex",
      gap: "15px",
      marginTop: "10px",
      width: "100%",
      alignItems: "center",
    },
    primaryBtn: {
      flex: 1,
      height: "48px",
      border: "1px solid transparent", 
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      transition: "background 0.2s",
      backgroundColor: hoverSave || hoverEdit ? "#1565c0" : "#1976d2",
      color: "white",
      boxShadow: "0 2px 6px rgba(25, 118, 210, 0.3)",
    },
    cancelBtn: {
      flex: 1,
      height: "48px",
      border: "1px solid #ddd", 
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      transition: "background 0.2s",
      backgroundColor: hoverCancel ? "#e0e0e0" : "#f5f5f5",
      color: "#333",
    },
    profileCard: {
      padding: "10px 0",
    },
    profileText: {
      margin: "10px 0",
      fontSize: "16px",
      lineHeight: "1.5",
      color: "#444",
    },
  };

  if (!profileFetched) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;
  }

  if (viewMode) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>My Profile</h2>
        {profile.name ? (
          <div style={styles.profileCard}>
            <p style={styles.profileText}><strong>Full Name:</strong> {profile.name}</p>
            <p style={styles.profileText}><strong>Profession:</strong> {profile.profession}</p>
            <p style={styles.profileText}><strong>Bio:</strong> {profile.bio || "No bio added yet."}</p>
            
            <div style={styles.btnGroup}>
              <button
                style={styles.primaryBtn}
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
                onClick={() => setViewMode(false)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={styles.profileText}>No profile found. Please create your profile.</p>
            <div style={styles.btnGroup}>
              <button
                style={styles.primaryBtn}
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
                onClick={() => setViewMode(false)}
              >
                Create Profile
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{profile.name ? "Edit Profile" : "Create Profile"}</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>
          Full Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Profession:
          <input
            type="text"
            name="profession"
            value={profile.profession}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Bio:
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Short introduction..."
            style={styles.textarea}
          />
        </label>

        <div style={styles.btnGroup}>
          <button
            type="submit"
            disabled={loading}
            style={{...styles.primaryBtn, opacity: loading ? 0.7 : 1}}
            onMouseEnter={() => setHoverSave(true)}
            onMouseLeave={() => setHoverSave(false)}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          <button
            type="button"
            style={styles.cancelBtn}
            onMouseEnter={() => setHoverCancel(true)}
            onMouseLeave={() => setHoverCancel(false)}
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