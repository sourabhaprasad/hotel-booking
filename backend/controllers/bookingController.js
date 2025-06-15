import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (req.user.role !== "guest") {
      return res.status(403).json({
        error: "Only logged in guests can book properties. Please sign in.",
      });
    }

    // 1. Find the property + populate the manager (host)
    const property = await Property.findById(propertyId).populate(
      "user",
      "name email"
    );
    if (!property) return res.status(404).json({ error: "Property not found" });

    // 2. Check date logic
    if (new Date(checkOut) <= new Date(checkIn)) {
      return res
        .status(400)
        .json({ error: "Check-out must be after check-in." });
    }

    // 3. Guest limit
    if (guests > property.guests) {
      return res.status(400).json({
        error: "Number of guests exceeds limit for this property.",
      });
    }

    // 4. Prevent overlapping bookings
    const overlappingBooking = await Booking.findOne({
      property: propertyId,
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        error: "Property already booked for the selected dates.",
      });
    }

    // 5. Price calculation
    const days =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    let totalPrice = days * property.price;

    if (days > 30) totalPrice *= 0.8;
    else if (days > 7) totalPrice *= 0.9;

    // 6. Create booking
    const booking = await Booking.create({
      property: property._id,
      user: req.user.id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    // 7. Email content
    const guestName = req.user.name || "Guest";
    const managerName = property.user?.name || "Manager";

    const guestEmailContent = `
<h2>Your Booking is Confirmed 🎉</h2>
<p>Hi ${guestName},</p>
<p>Thank you for booking with <strong>HomeStay Finder</strong>!</p>
<p>Here are your booking details:</p>
<ul>
  <li><strong>Property:</strong> ${property.title}</li>
  <li><strong>Address:</strong> ${property.address}</li>
  <li><strong>Check-in:</strong> ${new Date(checkIn).toDateString()}</li>
  <li><strong>Check-out:</strong> ${new Date(checkOut).toDateString()}</li>
  <li><strong>Guests:</strong> ${guests}</li>
  <li><strong>Total Price:</strong> ₹${totalPrice}</li>
</ul>
<br/>
<p>If you have any questions, feel free to reach out to our team.</p>
<p>Enjoy your stay!</p>
`;

    const managerEmailContent = `
<h2>New Booking Received 🛎️</h2>
<p>Hi ${managerName},</p>
<p>You have a new booking for your property: <strong>${
      property.title
    }</strong>.</p>
<p>Booking details:</p>
<ul>
  <li><strong>Guest:</strong> ${guestName} (${req.user.email})</li>
  <li><strong>Check-in:</strong> ${new Date(checkIn).toDateString()}</li>
  <li><strong>Check-out:</strong> ${new Date(checkOut).toDateString()}</li>
  <li><strong>Guests:</strong> ${guests}</li>
  <li><strong>Total Price:</strong> ₹${totalPrice}</li>
</ul>
<br/>
<p>Please make the necessary preparations.</p>
`;

    // 8. Send confirmation to guest
    await sendEmail({
      to: req.user.email,
      subject: "Booking Confirmed!",
      html: guestEmailContent,
    });

    // 9. Send booking alert to manager
    if (property.user?.email) {
      await sendEmail({
        to: property.user.email,
        subject: `New Booking: ${property.title}`,
        html: managerEmailContent,
      });
    }

    // 10. Final response
    res.status(201).json({
      message: "Booking confirmed",
      booking,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property")
      .sort({ checkIn: 1 });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this user." });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err); // Log errors
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

export const getConfirmedBooking = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const booking = await Booking.findOne({
      property: propertyId,
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("property");

    if (!booking) {
      return res.status(404).json({ error: "No confirmed booking found." });
    }

    const { title, type, address, city, state, pinCode } = booking.property;

    res.status(200).json({
      booking: {
        title,
        type,
        address,
        city,
        state,
        pinCode,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
      },
    });
  } catch (err) {
    console.error("Error fetching confirmed booking:", err);
    res.status(500).json({ error: "Server error while fetching booking" });
  }
};

export const getHostBookings = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Access denied. Managers only." });
    }

    const properties = await Property.find({ user: req.user.id }).select("_id");

    const propertyIds = properties.map((property) => property._id);

    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate("property", "title address price")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching host bookings:", err);
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
};
