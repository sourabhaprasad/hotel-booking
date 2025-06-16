"use client";
import React from "react";
import PropTypes from "prop-types";

const PropCard = ({ property }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-[#53A2BE99]/40 p-4 rounded-md w-full gap-4 md:gap-6">
      {/* Image Section */}
      <div className="w-full md:w-[200px] h-[200px] bg-gray-300 rounded-md overflow-hidden flex-shrink-0">
        {property.images?.[0] && (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-4">
        {/* Left Info */}
        <div className="space-y-1 text-sm sm:text-base">
          <p>
            <span className="font-bold">Title:</span> {property.title}
          </p>
          <p>
            <span className="font-bold">Type:</span> {property.type}
          </p>
          <p>
            <span className="font-bold">Guest Allowed:</span> {property.guests}
          </p>
          <p>
            <span className="font-bold">No. of Bedroom:</span>{" "}
            {property.bedrooms}
          </p>
          <p>
            <span className="font-bold">City:</span> {property.city}
          </p>
        </div>

        {/* Right Info */}
        <div className="text-right text-sm sm:text-base md:ml-auto">
          <p>
            <span className="font-bold">Price per night:</span> ₹
            {property.price}
          </p>
        </div>
      </div>
    </div>
  );
};
PropCard.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PropCard;
