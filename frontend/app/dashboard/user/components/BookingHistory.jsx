"use client";
import React from "react";
import PropTypes from "prop-types";

const BookingHistory = ({ bookings }) => {
  const today = new Date();

  const past = bookings.filter((b) => new Date(b.checkOut) < today);

  if (!past.length) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-[#176087]">
          Booking History
        </h2>
        <p className="text-gray-500">No past bookings yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#53A2BE]">
        Booking History
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {past.map((booking) => (
          <div
            key={booking._id}
            className=" p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-gray-50 hover:bg-[#53A2BE]/30"
          >
            {booking.property ? (
              <>
                <h3 className="text-lg font-medium text-[#333]">
                  {booking.property.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {booking.property.address}
                </p>
              </>
            ) : (
              <p className="text-sm text-red-500">
                Property deleted or unavailable.
              </p>
            )}

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
BookingHistory.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      property: PropTypes.shape({
        title: PropTypes.string,
        address: PropTypes.string,
      }),
    })
  ).isRequired,
};
export default BookingHistory;
