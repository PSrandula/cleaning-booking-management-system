const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.use(auth);
router.get("/", getBookings);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
