const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection with retry logic
const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      console.log("MySQL connected successfully!");
    }
  });
};

connectDB();

app.post("/api/signup", (req, res) => {
  const { name, email, password, role } = req.body;

  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, role], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(400).json({ message: "Email already exists" });
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND role = ?";
  db.query(query, [email, role], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = results[0];

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  });
});

app.post("/api/counsellor/profile", (req, res) => {
  const { user_id, name, profession, bio } = req.body;

  if (!user_id || !name || !profession) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = `
    INSERT INTO counsellor_profiles (user_id, name, profession, bio)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      name = VALUES(name),
      profession = VALUES(profession),
      bio = VALUES(bio)
  `;

  db.query(query, [user_id, name, profession, bio], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Profile saved successfully!" });
  });
});


app.post("/api/counsellor/availability", async (req, res) => {
  const { counsellorId, availability } = req.body;
  console.log("Received Availability Data:", req.body);

  if (!counsellorId || !availability || availability.length === 0) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    await db.promise().query("DELETE FROM counsellor_availability WHERE counsellor_id = ?", [counsellorId]);

    for (const dayObj of availability) {
      const [availabilityResult] = await db
        .promise()
        .query("INSERT INTO counsellor_availability (counsellor_id, day_of_week) VALUES (?, ?)", [
          counsellorId,
          dayObj.day,
        ]);

      const availabilityId = availabilityResult.insertId;

      for (const slot of dayObj.timeSlots) {
        await db
          .promise()
          .query("INSERT INTO time_slots (availability_id, start_time, end_time) VALUES (?, ?, ?)", [
            availabilityId,
            slot.startTime,
            slot.endTime,
          ]);
      }
    }

    res.json({ message: "Availability saved successfully!" });
  } catch (error) {
    console.error("Error saving availability:", error);
    res.status(500).json({ message: "Error saving availability" });
  }
});

app.get("/api/counsellor/profile/:userId", (req, res) => {
  const { userId } = req.params;

  const query = "SELECT * FROM counsellor_profiles WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.json({}); 
    res.json(results[0]);
  });
});

app.get("/api/counsellor/availability/:counsellorId", async (req, res) => {
  const { counsellorId } = req.params;

  try {
    const [availabilityRows] = await db
      .promise()
      .query(
        "SELECT * FROM counsellor_availability WHERE counsellor_id = ?",
        [counsellorId]
      );

    const result = [];

    for (const dayRow of availabilityRows) {
      const [timeRows] = await db
        .promise()
        .query(
          "SELECT * FROM time_slots WHERE availability_id = ?",
          [dayRow.id]
        );

      result.push({
        day_of_week: dayRow.day_of_week,
        timeSlots: timeRows.map((t) => ({
          start_time: t.start_time,
          end_time: t.end_time,
        })),
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Error fetching availability" });
  }
});

//  Get all counsellor profiles
app.get("/api/counsellor/all", (req, res) => {
  const query = "SELECT * FROM counsellor_profiles";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching counsellors:", err);
      return res.status(500).json({ message: "Error fetching counsellors" });
    }
    res.json(results);
  });
});



app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
