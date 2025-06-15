"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const FilterBar = ({ onFilterChange }) => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);

  const amenitiesRef = useRef(null);

  const handleFilter = (e) => {
    e.preventDefault();
    const filters = {
      city,
      checkIn,
      checkOut,
      guests,
      sortBy,
      selectedAmenities,
    };
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setCity("");
    setCheckIn("");
    setCheckOut("");
    setGuests("");
    setSortBy("");
    setSelectedAmenities([]);
    setShowAmenities(false);
    onFilterChange({});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        amenitiesRef.current &&
        !amenitiesRef.current.contains(event.target)
      ) {
        setShowAmenities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prev) => prev.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities((prev) => [...prev, amenity]);
    }
  };

  const amenitiesList = [
    "Parking",
    "Wi-Fi",
    "AC",
    "Heater",
    "Bathtub",
    "Pet Friendly",
    "Washing machine & iron",
    "Refrigerator & oven",
    "Balcony",
    "Outdoor Seating",
    "Swimming Pool",
    "BBQ",
    "Fire Pit",
    "Security Camera",
    "Breakfast included",
    "Gym & Spa",
    "Board Games",
    "House Keeping",
  ];

  return (
    <form onSubmit={handleFilter}>
      <div className="w-full p-4 bg-[#1D84B566] grid grid-cols-6 gap-4 rounded-md">
        <div>
          <label htmlFor="city" className="block font-semibold mb-1">
            City:
          </label>
          <input
            type="text"
            placeholder="Search City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/40"
          />
        </div>

        <div>
          <label htmlFor="checkIn" className="block font-semibold mb-1">
            Check In:
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/40"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="block font-semibold mb-1">
            Check Out:
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/40"
          />
        </div>

        <div>
          <label htmlFor="guests" className="block font-semibold mb-1">
            Guests:
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/40"
          >
            <option value="">Select</option>
            <option value="1-5">1-5</option>
            <option value="5-10">5-10</option>
            <option value="10-20">10-20</option>
            <option value="20-30">20-30</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block font-semibold mb-1">
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/40"
          >
            <option value="">Select</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="distance-near">Distance: Near</option>
            <option value="distance-far">Distance: Far</option>
          </select>
        </div>

        <div className="relative" ref={amenitiesRef}>
          <label htmlFor="amenities" className="block font-semibold mb-1">
            Amenities:
          </label>
          <button
            type="button"
            onClick={() => setShowAmenities((prev) => !prev)}
            className="w-full px-3 py-2 rounded-md bg-white/40 text-left"
          >
            {selectedAmenities.length > 0
              ? selectedAmenities.join(", ")
              : "Select Amenities"}
          </button>
          {showAmenities && (
            <div className="absolute z-20 mt-1 bg-white/90 shadow-lg p-4 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto w-full">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="text-sm flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-6 flex justify-center mt-4 gap-4">
        <button
          type="submit"
          className="bg-[#1D84B5] hover:bg-teal-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClearFilters}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-800 hover:text-white"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
};
FilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterBar;
