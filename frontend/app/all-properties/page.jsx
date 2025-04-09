"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import PropCard from "../components/PropCard";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});

  const fetchProperties = async (activeFilters = {}) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (activeFilters.city) queryParams.append("city", activeFilters.city);
      if (activeFilters.guests)
        queryParams.append("guests", activeFilters.guests);
      if (activeFilters.sortBy)
        queryParams.append("sortBy", activeFilters.sortBy);
      if (activeFilters.selectedAmenities?.length > 0) {
        queryParams.append(
          "amenities",
          activeFilters.selectedAmenities.join(",")
        );
      }

      const res = await fetch(
        `http://localhost:5000/api/properties?${queryParams}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      setProperties(data);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [filters]);
  return (
    <>
      <div className="p-6">
        <FilterBar onFilterChange={setFilters} />
      </div>

      <div className="p-6 space-y-6">
        {loading && <p>Loading properties...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && properties.length === 0 && (
          <p>No properties found.</p>
        )}

        {!loading &&
          !error &&
          properties.map((prop) => (
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
