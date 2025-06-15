"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { fetchMyProperties, deletePropertyById } from "@lib/api";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchMyProperties(token);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await deletePropertyById(id, token);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete property");
    }
  };

  const handleUpdate = (id) => {
    router.push(`/update-property/${id}`);
  };

  if (loading) return <div className="p-6">Loading your properties...</div>;

  if (properties.length === 0)
    return <div className="p-6">No properties listed yet.</div>;

  return (
    <div className="bg-[#d1ecf3] min-h-screen p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Listings</h2>
        <button
          onClick={() => router.push("/upload-property")}
          className="bg-[#0b4c61] hover:bg-[#093947] transition text-white px-3 py-1 text-sm rounded"
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
            <div className="flex gap-6">
              <div className="w-1/4 flex flex-col items-start space-y-2">
                {property.images?.length > 0 && (
                  <img
                    src={property.images[0]}
                    alt="Property"
                    className="w-full h-auto object-cover rounded"
                  />
                )}
                {property.images?.length > 1 && (
                  <div className="flex gap-2">
                    {property.images.slice(1, 4).map((img) => (
                      <img
                        key={img}
                        src={img}
                        alt="Thumbnail"
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1 text-sm">
                <p>
                  <strong>Title:</strong> {property.title}
                </p>
                <p>
                  <strong>Description:</strong> {property.description}
                </p>
                <p>
                  <strong>Type:</strong> {property.type}
                </p>
                <p>
                  <strong>Guest Allowed:</strong> {property.guests}
                </p>
                <p>
                  <strong>No. of Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>No. of Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Price per night:</strong> ₹{property.price}
                </p>
                <p>
                  <strong>Amenities:</strong>{" "}
                  {property.amenities?.join(", ") || "None"}
                </p>
                <p>
                  <strong>Address:</strong> {property.address}, {property.city}
                </p>
                <p>
                  <strong>Contact:</strong> {property.contact || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-10 mt-4">
              <button
                onClick={() => handleUpdate(property._id)}
                className="bg-[#0b4c61] hover:bg-[#093947] transition text-white px-4 py-2 text-sm rounded"
              >
                Update Property
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-[#0b4c61] hover:bg-red-600 transition text-white px-4 py-2 text-sm rounded"
              >
                Delete Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
