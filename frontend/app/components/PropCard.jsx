"use client";
import React from "react";
import PropTypes from "prop-types";

const PropCard = ({ property }) => {
  return (
    <div className="flex items-center bg-[#53A2BE99]/40 p-4 rounded-md w-full">
      <div className="w-[200px] h-[200px] bg-gray-300 rounded-md mr-6 flex-shrink-0 overflow-hidden">
        {property.images && property.images.length > 0 && (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex justify-between w-full">
        <div className="space-y-2">
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
            <span className="font-bold">No. of bedroom:</span>{" "}
            {property.bedrooms}
          </p>
          <p>
            <span className="font-bold">City:</span> {property.city}
          </p>
        </div>

        <div className="text-right">
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
    guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    city: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default PropCard;
