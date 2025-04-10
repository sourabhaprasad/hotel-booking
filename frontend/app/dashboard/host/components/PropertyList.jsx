"use client";

import { useEffect, useState } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/properties/my-properties",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch host properties");
        }

        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching host properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostProperties();
  }, []);

  if (loading) return <div className="p-6">Loading your properties...</div>;

  if (properties.length === 0)
    return <div className="p-6">No properties listed yet.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Properties</h2>
      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p className="text-gray-600">{property.description}</p>
            <p>
              <span className="font-semibold">Type:</span> {property.type}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ₹
              {property.pricePerNight} / night
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {property.address}, {property.city}
            </p>
            <p>
              <span className="font-semibold">Guests Allowed:</span>{" "}
              {property.guests}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
