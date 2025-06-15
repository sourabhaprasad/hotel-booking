"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyDetails from "@components/PropertyDetails";
import { fetchPropertyById } from "@lib/api";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    getProperty();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!property) return <div className="p-6">Property not found</div>;

  return (
    <div className="p-6">
      <PropertyDetails property={property} />
    </div>
  );
};

export default PropertyPage;
