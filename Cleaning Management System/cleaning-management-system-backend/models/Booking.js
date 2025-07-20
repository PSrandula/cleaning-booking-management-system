const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer_name: String,
  address: String,
  date_time: Date,
  service: String,
  notes: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed"],
    default: "pending"
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
