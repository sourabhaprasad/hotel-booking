"use client";
import { useState } from "react";

const BookingSection = ({ price }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const calculateTotalPrice = () => {
    if (checkIn && checkOut) {
      const diffTime = new Date(checkOut) - new Date(checkIn);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays > 0 ? diffDays * price : 0;
    }
    return 0;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="bg-[#1D84B5]/40 p-3 rounded space-y-2 mt-4">
      <div className="flex gap-2 flex-wrap">
        <label className="font-bold">Check In:</label>
        <input
          type="date"
          className="bg-white px-2 py-1 rounded"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <label className="font-bold">Check Out:</label>
        <input
          type="date"
          className="bg-white px-2 py-1 rounded"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button className="bg-[#265073] text-white px-4 py-1 rounded hover:bg-[#1e3a5f]">
          Search
        </button>
      </div>

      {totalPrice > 0 && (
        <div className="flex justify-between items-center">
          <p className="font-bold">
            Price for the specified days: ₹{totalPrice}
          </p>
          <button className="bg-[#265073] text-white px-4 py-1 rounded hover:bg-[#1e3a5f]">
            Book now
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSection;
