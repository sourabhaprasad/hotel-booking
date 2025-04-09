import express from "express";
import {
  createBooking,
  getUserBookings,
  getConfirmedBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);
router.get("/confirmed/:propertyId", protect, getConfirmedBooking);

export default router;
