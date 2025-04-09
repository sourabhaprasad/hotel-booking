"use client";
import { useEffect, useState } from "react";
import PropertyDetails from "@/app/components/PropertyDetails";

const HostDashboard = () => {
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
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#265073]">
        Your Listed Properties
      </h1>

      {properties.map((property) => (
        <div key={property._id}>
          <PropertyDetails property={property} showBooking={false} />
          <hr className="my-6 border-t border-gray-400" />
        </div>
      ))}
    </div>
  );
};

export default HostDashboard;
