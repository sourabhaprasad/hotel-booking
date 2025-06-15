"use client";
import React from "react";
import BookingSection from "./BookingSection";
import PropTypes from "prop-types";

const PropertyDetails = ({ property, showBooking = true }) => {
  return (
    <div className="bg-[#53A2BE99]/50 p-6 rounded-md flex flex-col md:flex-row gap-6">
      {/* Left - Images */}
      <div className="md:w-[35%] space-y-4">
        {property.images?.length > 0 ? (
          <>
            <img
              src={property.images[0]}
              alt="Main"
              className="w-full h-[300px] object-cover rounded-md"
            />
            <div className="flex justify-between gap-4">
              {property.images.slice(1, 4).map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-1/3 h-[100px] object-cover rounded-md"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-[300px] bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
            No images available
          </div>
        )}
      </div>

      {/* Right - Details */}
      <div className=" space-y-3 text-black">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">{property.title}</h2>
          <p className="font-bold">₹{property.price} / night</p>
        </div>

        <p>
          <span className="font-bold">Description:</span>{" "}
          {property.description || "N/A"}
        </p>
        <p>
          <span className="font-bold">Type:</span> {property.type}
        </p>
        <p>
          <span className="font-bold">Guest Allowed:</span> {property.guests}
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

        {showBooking && (
          <BookingSection
            price={property.price}
            propertyId={property._id}
            maxGuests={property.guests}
          />
        )}
      </div>
    </div>
  );
};

PropertyDetails.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    guests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.string,
    contact: PropTypes.string,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  showBooking: PropTypes.bool,
};

export default PropertyDetails;
