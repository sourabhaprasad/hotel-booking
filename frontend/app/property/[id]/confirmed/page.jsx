"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingConfirmation from "@components/BookingConfirmation";
import { fetchConfirmedBooking } from "@lib/api";

const BookingConfirmedPage = () => {
  const params = useParams();
  console.log("Route params:", params);
  const { id } = params;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const getBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchConfirmedBooking(id, token);
        setBooking(data.booking);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [id]);

  if (loading) return <div className="p-6">Loading booking details...</div>;
  if (!booking) return <div className="p-6">Booking not found.</div>;

  return (
    <div className="p-6">
      <BookingConfirmation booking={booking} />
    </div>
  );
};

export default BookingConfirmedPage;
