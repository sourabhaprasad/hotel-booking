"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createBooking } from "@lib/api";

const BookingSection = ({ price, propertyId, maxGuests }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }
  }, []);

  const calculateTotalPrice = () => {
    if (checkIn && checkOut) {
      const diffTime = new Date(checkOut) - new Date(checkIn);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays > 0) {
        let totalPrice = diffDays * price;
        let discountMessage = "";

        if (diffDays >= 30) {
          totalPrice *= 0.8;
          discountMessage = "20% discount applied";
        } else if (diffDays >= 7) {
          totalPrice *= 0.9;
          discountMessage = "10% discount applied";
        }

        return { totalPrice, discountMessage };
      }
    }
    return { totalPrice: 0, discountMessage: "" };
  };

  const { totalPrice, discountMessage } = calculateTotalPrice();

  const handleBooking = async () => {
    if (!guests || guests < 1) {
      toast.error("Number of guests must be at least 1.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || token === "null") {
      toast.error("❌ You must be signed in to book.");
      return;
    }

    if (userRole !== "guest") {
      toast.error("Only guests can book properties.");
      return;
    }

    const payload = { propertyId, checkIn, checkOut, guests };

    toast.promise(
      createBooking(payload, token).then(() => {
        setTimeout(() => {
          router.push(`/property/${propertyId}/confirmed`);
        }, 1000);
      }),
      {
        loading: "Booking your stay...",
        success: "Booking confirmed!",
        error: (err) => `${err.message}`,
      }
    );
  };

  return (
    <div className="bg-[#1D84B5]/20 p-3 rounded space-y-2 mt-4">
      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex items-center gap-2">
          <label className="font-bold">Check In:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-white px-2 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold">Check Out:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-white px-2 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold">Guests:</label>
          <input
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-white px-2 py-1 rounded w-20"
          />
        </div>
      </div>

      {totalPrice > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="font-bold">Total price: ₹{totalPrice}</p>
            {discountMessage && (
              <p className="text-green-700 font-bold">{discountMessage}</p>
            )}
          </div>
          <button
            onClick={handleBooking}
            className="bg-[#265073] text-white px-4 py-1 rounded hover:bg-[#1e3a5f]"
          >
            Book now
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSection;
