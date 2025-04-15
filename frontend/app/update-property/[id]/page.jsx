"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateProperty = ({ params }) => {
  const { id } = params; // Extract the property ID from the URL params
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    amenities: "",
    address: "",
    city: "",
    contact: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch property");

        const data = await res.json();
        setProperty(data);
        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
          guests: data.guests,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          price: data.price,
          amenities: data.amenities.join(", "),
          address: data.address,
          city: data.city,
          contact: data.contact || "",
          images: data.images || [],
        });
      } catch (err) {
        console.error("Error fetching property:", err);
        toast.error("Failed to fetch property data");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset"); // Use your Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, data.secure_url],
      }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to upload image");
    }
  };

  const handleImageDelete = async (imgUrl) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/properties/delete-image`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: imgUrl }),
        }
      );

      if (!res.ok) throw new Error("Failed to delete image");

      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imgUrl),
      }));
      toast.success("Image deleted successfully");
    } catch (err) {
      console.error("Error deleting image:", err);
      toast.error("Failed to delete image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      amenities: formData.amenities.split(",").map((a) => a.trim()),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update property");

      toast.success("Property updated successfully");
      router.push("/dashboard/host");
    } catch (err) {
      console.error("Error updating property:", err);
      toast.error("Failed to update property");
    }
  };

  if (loading) return <div className="p-6">Loading property data...</div>;

  return (
    <div className="bg-[#d1ecf3] min-h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="type" className="block">
            Property Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="guests" className="block">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="bedrooms" className="block">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bathrooms" className="block">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 mt-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="amenities" className="block">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="address" className="block">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="city" className="block">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded"
          />
        </div>

        {/* Upload Image Section */}
        <div className="mt-6">
          <label htmlFor="images" className="block mb-2">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageUpload}
            className="w-full p-2 bg-white border rounded"
          />
          {formData.images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Uploaded Images:</h3>
              <div className="flex gap-4 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Uploaded ${index}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => handleImageDelete(img)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push("/properties")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0b4c61] text-white px-4 py-2 rounded"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
