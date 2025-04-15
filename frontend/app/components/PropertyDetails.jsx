"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyDetails from "./PropertyDetails"; // Import the PropertyDetails component

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHostProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        // Redirect if token is missing
        if (!token) {
          router.push("/login"); // Assuming you have a login route
          return;
        }

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

        // Check for any errors in response
        if (!res.ok) {
          const errorDetails = await res.json();
          throw new Error(
            errorDetails.error || "Failed to fetch host properties"
          );
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
  }, []); // Use empty dependency array to run once on mount

  if (loading) return <div className="p-6">Loading your properties...</div>;

  if (properties.length === 0)
    return <div className="p-6">No properties listed yet.</div>;

  return (
    <div className="bg-[#d1ecf3] min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Listings</h2>
        <button
          onClick={() => router.push("/upload-property")}
          className="bg-[#0b4c61] text-white px-3 py-1 text-sm"
        >
          Add Property
        </button>
      </div>

      <div className="space-y-10">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-[#d1ecf3] border-t border-gray-300 pt-6"
          >
            <PropertyDetails property={property} showBooking={false} />
            {/* You can choose to set showBooking={true} if you want to include booking functionality */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
