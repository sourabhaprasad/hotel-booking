"use client";
import React from "react";
import BookingSection from "./BookingSection";
import PropTypes from "prop-types";

const PropertyDetails = ({ property, showBooking = true }) => {
  return (
    <div className="bg-[#53A2BE99]/50 p-4 sm:p-6 rounded-lg flex flex-col md:flex-row gap-6 text-sm sm:text-base">
      {/* Left - Images */}
      <div className="md:w-[35%] space-y-3">
        {property.images?.length > 0 ? (
          <>
            <img
              src={property.images[0]}
              alt="Main"
              className="w-full h-[250px] sm:h-[300px] object-cover rounded-md"
            />
            <div className="flex justify-between gap-3">
              {property.images.slice(1, 4).map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-1/3 h-[80px] sm:h-[100px] object-cover rounded-md"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-[250px] bg-gray-300 rounded-md flex items-center justify-center text-gray-500 text-center">
            No images available
          </div>
        )}
      </div>

      {/* Right - Details */}
      <div className="flex-1 space-y-3 text-black">
        <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-0">
          <h2 className="font-bold text-lg sm:text-xl">{property.title}</h2>
          <p className="font-semibold text-right text-base sm:text-lg">
            ₹{property.price} <span className="text-sm">/ night</span>
          </p>
        </div>

        <div className="space-y-1 leading-relaxed">
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {property.description || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {property.type}
          </p>
          <p>
            <span className="font-semibold">Guest Allowed:</span>{" "}
            {property.guests}
          </p>
          <p>
            <span className="font-semibold">Bedrooms:</span> {property.bedrooms}
          </p>
          <p>
            <span className="font-semibold">Amenities:</span>{" "}
            {property.amenities?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {property.address || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Contact:</span>{" "}
            {property.contact || "N/A"}
          </p>
        </div>

        {showBooking && (
          <div className="pt-4 border-t border-gray-300">
            <BookingSection
              price={property.price}
              propertyId={property._id}
              maxGuests={property.guests}
            />
          </div>
        )}
      </div>
    </div>
  );
};

PropertyDetails.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    guests: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bedrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    amenities: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.string,
    contact: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  showBooking: PropTypes.bool,
};

export default PropertyDetails;
