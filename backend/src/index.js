const express = require("express");
require('dotenv').config(); // No need to assign dotenv to a variable
const dbConnect = require("./config/dbConnect"); // Import db connection function
const app = express();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Connect to the database
dbConnect();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Catch-all route for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found/Received request: ${req.method} ${req.url}` });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
