import express from "express";
import {
  createBooking,
  getUserBookings,
  getConfirmedBooking,
  getHostBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);
router.get("/confirmed/:propertyId", protect, getConfirmedBooking);
router.get("/host", protect, getHostBookings);

export default router;
