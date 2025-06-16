"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingConfirmation from "@components/BookingConfirmation";
import { fetchConfirmedBooking } from "@lib/api";

const BookingConfirmedPage = () => {
  const params = useParams();
  const { id } = params;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

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

  if (loading)
    return (
      <div className="p-4 sm:p-6 text-center text-gray-600">
        Loading booking details...
      </div>
    );

  if (!booking)
    return (
      <div className="p-4 sm:p-6 text-center text-red-500">
        Booking not found.
      </div>
    );

  return (
    <div className="px-4 py-6 sm:px-8 md:px-16 max-w-4xl mx-auto">
      <BookingConfirmation booking={booking} />
    </div>
  );
};

export default BookingConfirmedPage;
