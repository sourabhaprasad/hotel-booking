"use client";

import { useEffect, useState } from "react";

const BookingsReceived = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/bookings/host", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostBookings();
  }, []);

  if (loading) return <div className="p-6">Loading bookings...</div>;

  if (bookings.length === 0)
    return <div className="p-6">No bookings received yet.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bookings Received</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{booking.property.title}</h3>
            <p>
              <span className="font-semibold">Guest:</span>{" "}
              {booking.user.name || booking.user.email}
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
              <span className="font-semibold">Guests:</span>{" "}
              {booking.totalGuests}
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
