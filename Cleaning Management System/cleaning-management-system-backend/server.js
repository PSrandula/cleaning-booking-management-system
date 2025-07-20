// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { port, mongoURI } = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
