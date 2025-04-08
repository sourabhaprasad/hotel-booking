"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FilterBar from "../components/FilterBar";
import PropCard from "../components/PropCard";

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties");
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

    fetchProperties();
  }, []);

  return (
    <>
      <div className="p-6">
        <FilterBar />
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
