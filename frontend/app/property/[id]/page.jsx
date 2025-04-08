"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyDetails from "@/app/components/PropertyDetails";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
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
