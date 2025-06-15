"use client";

import { useEffect, useState } from "react";
import { fetchHostBookings } from "@lib/api";

const BookingsReceived = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-6">Loading bookings...</div>;

  if (bookings.length === 0)
    return <div className="p-6">No bookings received yet.</div>;

  return (
    <div className="p-6">
      <h2 className="text-[25px] font-bold mb-4">Bookings Received</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-[#d1ecf3] p-4 rounded shadow-md "
          >
            <h3 className="text-lg font-bold">{booking.property.title}</h3>
            <p>
              <span className="font-semibold">Guest:</span>{" "}
              {booking.user?.name || booking.user?.email || "Unknown User"}
            </p>
            <p>
              <span className="font-semibold">Check-in:</span>{" "}
              {new Date(booking.checkIn).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Check-out:</span>{" "}
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Guests:</span> {booking.guests}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> ₹
              {booking.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsReceived;
