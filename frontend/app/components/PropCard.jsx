"use client";
import React from "react";

const PropCard = ({ property }) => {
  return (
    <div className="flex items-center bg-[#53A2BE99]/40 p-4 rounded-md w-full">
      {/* Placeholder for image */}
      <div className="w-[200px] h-[200px] bg-gray-300 rounded-md mr-6 flex-shrink-0" />

      {/* Property details */}
      <div className="flex justify-between w-full">
        {/* Left Section */}
        <div className="space-y-2">
          <p>
            <span className="font-bold">Title:</span> {property.title}
          </p>
          <p>
            <span className="font-bold">Type:</span> {property.type}
          </p>
          <p>
            <span className="font-bold">Guest Allowed:</span>{" "}
            {property.guestsAllowed}
          </p>
          <p>
            <span className="font-bold">No. of bedroom:</span>{" "}
            {property.bedrooms}
          </p>
          <p>
            <span className="font-bold">City:</span> {property.city}
          </p>
        </div>

        {/* Right Section: Price */}
        <div className="text-right">
          <p>
            <span className="font-bold">Price per night:</span> ₹
            {property.pricePerNight}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropCard;
