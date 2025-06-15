"use client";
import { useEffect, useState } from "react";
import UpcomingBookings from "./components/UpcomingBookings";
import BookingHistory from "./components/BookingHistory";
import { getGuestBookings } from "@lib/api";

const GuestDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("upcoming");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await getGuestBookings(token);
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading bookings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const toggleView = () =>
    setView((prev) => (prev === "upcoming" ? "history" : "upcoming"));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="mb-6">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-teal-700 text-white rounded"
        >
          {view === "upcoming"
            ? "Show Booking History"
            : "Show Upcoming Bookings"}
        </button>
      </div>
      {view === "upcoming" ? (
        <UpcomingBookings bookings={bookings} />
      ) : (
        <BookingHistory bookings={bookings} />
      )}
    </div>
  );
};

export default GuestDashboard;
