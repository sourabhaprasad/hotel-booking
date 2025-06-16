"use client";

import { useEffect, useState } from "react";
import { fetchHostBookings } from "@lib/api";

const BookingsReceived = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrevious, setShowPrevious] = useState(false); // toggle state

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchHostBookings(token);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const now = new Date();
  const upcomingBookings = bookings.filter((b) => new Date(b.checkOut) >= now);
  const previousBookings = bookings.filter((b) => new Date(b.checkOut) < now);

  const toggleView = () => setShowPrevious((prev) => !prev);

  const renderBookingCard = (booking) => (
    <div
      key={booking._id}
      className="bg-[#f0f9fc] border border-[#cbe6ef] p-4 sm:p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#1b4b66]">
        {booking.property.title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
        <p>
          <span className="font-medium">Guest:</span>{" "}
          {booking.user?.name || booking.user?.email || "Unknown User"}
        </p>
        <p>
          <span className="font-medium">Guests:</span> {booking.guests}
        </p>
        <p>
          <span className="font-medium">Check-in:</span>{" "}
          {new Date(booking.checkIn).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Check-out:</span>{" "}
          {new Date(booking.checkOut).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Total Price:</span> ₹
          {booking.totalPrice}
        </p>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600 text-sm sm:text-base">
        Loading bookings...
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 text-sm sm:text-base">
        No bookings received yet.
      </div>
    );

  const bookingsToShow = showPrevious ? previousBookings : upcomingBookings;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {showPrevious ? "Previous Bookings" : "Upcoming Bookings"}
        </h2>
        <button
          onClick={toggleView}
          className="text-sm sm:text-xs bg-[#1b4b66] hover:bg-[#14384e] text-white px-2 py-2 rounded-md transition"
        >
          {showPrevious ? "Show Upcoming" : "Show Previous"}
        </button>
      </div>

      {bookingsToShow.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookingsToShow.map(renderBookingCard)}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No {showPrevious ? "previous" : "upcoming"} bookings.
        </p>
      )}
    </div>
  );
};

export default BookingsReceived;
