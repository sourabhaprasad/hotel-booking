"use client";

import React from "react";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import PropCard from "../components/PropCard";

// Dummy data with all fields
const dummyProperties = [
  {
    _id: "1",
    title: "Cozy Villa by the Beach",
    type: "Villa",
    guestsAllowed: 6,
    bedrooms: 3,
    city: "Goa",
    pricePerNight: 3500,
  },
  {
    _id: "2",
    title: "Modern Apartment in City Center",
    type: "Apartment",
    guestsAllowed: 4,
    bedrooms: 2,
    city: "Bangalore",
    pricePerNight: 2800,
  },
  {
    _id: "3",
    title: "Spacious House with Garden",
    type: "House",
    guestsAllowed: 8,
    bedrooms: 4,
    city: "Pune",
    pricePerNight: 4200,
  },
];

const AllPropertiesPage = () => {
  const properties = dummyProperties;

  return (
    <>
      <div className="p-6">
        <FilterBar />
      </div>

      {/* Ensure spacing is consistent */}
      <div className="p-6 space-y-6">
        {properties.map((prop) => (
          <div key={prop._id}>
            <Link href={`/property/${prop._id}`}>
              <div className="hover:scale-[1.01] transition-all">
                <PropCard property={prop} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPropertiesPage;
