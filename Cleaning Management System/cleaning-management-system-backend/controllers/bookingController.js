const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.userId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: "Could not create booking" });
  }
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.userId }).sort({ date_time: 1 });
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const updated = await Booking.findOneAndUpdate(
    { _id: id, user: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  await Booking.findOneAndDelete({ _id: id, user: req.userId });
  res.status(204).send();
};
