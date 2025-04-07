// components/PropertyDetails.jsx
"use client";
import React, { useState } from "react";

const PropertyDetails = ({ property }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {
    if (checkIn && checkOut) {
      const diffTime = new Date(checkOut) - new Date(checkIn);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays > 0 ? diffDays * property.pricePerNight : 0;
    }
    return 0;
  };

  const totalPrice = handleSearch();

  return (
    <div className="bg-[#53A2BE99]/50 p-6 rounded-md flex flex-col md:flex-row gap-6">
      {/* Left - Images */}
      <div className="md:w-[40%] space-y-4">
        <div className="w-full h-[300px] bg-gray-300 rounded-md" />
        <div className="flex justify-between gap-4">
          <div className="w-1/3 h-[100px] bg-gray-300 rounded-md" />
          <div className="w-1/3 h-[100px] bg-gray-300 rounded-md" />
          <div className="w-1/3 h-[100px] bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* Right - Details */}
      <div className="md:w-1/2 space-y-3 text-black">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">{property.title}</h2>
          <p className="font-bold">₹{property.pricePerNight} / night</p>
        </div>

        <p>
          <span className="font-bold">Description:</span>{" "}
          {property.description || "N/A"}
        </p>
        <p>
          <span className="font-bold">Type:</span> {property.type}
        </p>
        <p>
          <span className="font-bold">Guest Allowed:</span>{" "}
          {property.guestsAllowed}
        </p>
        <p>
          <span className="font-bold">No. of bedroom:</span> {property.bedrooms}
        </p>
        <p>
          <span className="font-bold">Amenities:</span>{" "}
          {property.amenities?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-bold">Address:</span>{" "}
          {property.address || "N/A"}
        </p>
        <p>
          <span className="font-bold">Contact:</span>{" "}
          {property.contact || "N/A"}
        </p>

        {/* Booking Section */}
        <div className="bg-[#1D84B5]/40 p-3 rounded space-y-2 mt-4">
          <div className="flex gap-2">
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
            <button
              className="bg-[#265073] text-white px-4 py-1 rounded hover:bg-[#1e3a5f]"
              onClick={handleSearch}
            >
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
      </div>
    </div>
  );
};

export default PropertyDetails;
