"use client";
import React from "react";

const UpcomingBookings = ({ bookings = [] }) => {
  const today = new Date();
  const upcoming = bookings.filter((b) => new Date(b.checkIn) >= today);

  if (!upcoming.length) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#176087]">
          Upcoming Bookings
        </h2>
        <p className="text-gray-500">No upcoming bookings found.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#53A2BE]">
        Upcoming Bookings
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((booking) => (
          <div
            key={booking._id}
            className=" p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white hover:bg-[#53A2BE]/30"
          >
            <h3 className="text-lg font-medium text-[#333]">
              {booking.property?.title}
            </h3>
            <p className="text-sm text-gray-600">{booking.property?.address}</p>
            <p className="mt-2 text-sm">
              <strong>Check-in:</strong>{" "}
              {new Date(booking.checkIn).toDateString()}
            </p>
            <p className="text-sm">
              <strong>Check-out:</strong>{" "}
              {new Date(booking.checkOut).toDateString()}
            </p>
            <p className="text-sm">
              <strong>Guests:</strong> {booking.guests}
            </p>
            <p className="mt-4 text-lg font-bold text-[#176087]">
              ₹{booking.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
