"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BookingSection = ({ price, propertyId, maxGuests }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [userRole, setUserRole] = useState(""); // Assuming userRole is needed elsewhere
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
          totalPrice = totalPrice * 0.8; // 20% discount
          discountMessage = "20% discount applied";
        } else if (diffDays >= 7) {
          totalPrice = totalPrice * 0.9; // 10% discount
          discountMessage = "10% discount applied";
        }

        return { totalPrice, discountMessage };
      }
    }
    return { totalPrice: 0, discountMessage: "" };
  };

  const { totalPrice, discountMessage } = calculateTotalPrice();

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("❌ You must be signed in to book.");
      return;
    }

    const payload = { propertyId, checkIn, checkOut, guests };

    toast.promise(
      fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Booking failed");

        // Redirect after short delay
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
          <label className="font-bold whitespace-nowrap">Check In:</label>
          <input
            type="date"
            className="bg-white px-2 py-1 rounded"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold whitespace-nowrap">Check Out:</label>
          <input
            type="date"
            className="bg-white px-2 py-1 rounded"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-bold whitespace-nowrap">Guests:</label>
          <input
            type="number"
            min={1}
            max={maxGuests}
            className="bg-white px-2 py-1 rounded w-20"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
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
