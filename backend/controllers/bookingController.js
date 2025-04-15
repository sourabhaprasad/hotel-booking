import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

export const createBooking = async (req, res) => {
  console.log("Logged-in user details:", req.user);

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

    // 1. Find the property
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: "Property not found" });

    // 2. Validate check-in/check-out dates
    if (new Date(checkOut) <= new Date(checkIn)) {
      return res
        .status(400)
        .json({ error: "Check-out must be after check-in." });
    }

    // 3. Validate guest limit
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

    // 5. Calculate price
    const days =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * property.price;

    // 6. Create the booking
    const booking = await Booking.create({
      property: propertyId,
      user: req.user.id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    // 7. Send confirmation response
    res.status(201).json({
      message: "Booking confirmed",
      booking: {
        _id: booking._id,
        property: {
          title: property.title,
          pricePerNight: property.price,
          images: property.images,
          address: property.address,
        },
        checkIn,
        checkOut,
        guests,
        totalPrice,
      },
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getUserBookings = async (req, res) => {
  console.log("Logged-in user details:", req.user);

  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property")
      .sort({ checkIn: 1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings: ", err });
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

    const {
      title,
      type,
      address,
      city,
      state,
      pinCode,
      price: pricePerNight,
    } = booking.property;

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
  console.log("Logged-in Manager ID:", req.user.id);

  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Access denied. Managers only." });
    }

    const properties = await Property.find({ user: req.user.id }).select("_id");
    console.log("Properties owned by manager:", properties);

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
