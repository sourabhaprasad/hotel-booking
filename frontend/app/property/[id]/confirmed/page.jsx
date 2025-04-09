"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookingConfirmation from "@/app/components/BookingConfirmation";

const BookingConfirmedPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/bookings/confirmed/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setBooking(data.booking);
        } else {
          console.error("Booking fetch failed:", data.error);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
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
