"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import Button from "@components/Button";
import { getPropertyById, updatePropertyById } from "@lib/api";

const UpdateProperty = ({ params }) => {
  const { id } = React.use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getPropertyById(id, token);

        reset({
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
        setSelectedAmenities(data.amenities || []);
      } catch (err) {
        console.error("Error fetching property:", err);
        toast.error("Failed to fetch property data");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dusoaobns/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok || !data?.secure_url)
        throw new Error(data?.error?.message || "Failed to upload image");

      const currentImages = watch("images") || [];
      const updatedImages = currentImages
        .filter((img) => img)
        .concat(data.secure_url);
      setValue("images", updatedImages);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Failed to upload image");
    }
  };

  const handleImageDelete = (imgUrl) => {
    const updatedImages = watch("images").filter((img) => img !== imgUrl);
    setValue("images", updatedImages);
    toast.success("Image deleted successfully");
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      amenities: selectedAmenities,
      images: (watch("images") || []).filter((img) => img),
    };

    try {
      const token = localStorage.getItem("token");
      await updatePropertyById(id, updatedData, token);
      toast.success("Property updated successfully");
      router.push("/dashboard/host");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update property");
    }
  };

  if (loading) return <div className="p-6">Loading property data...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#53A2BE]/30 rounded-xl p-10 w-full max-w-3xl space-y-6 shadow-xl"
      >
        <h2 className="text-center text-2xl font-bold">Update Property</h2>

        {/* Text Fields */}
        {[
          { name: "title", label: "Title", placeholder: "Enter title" },
          {
            name: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          { name: "guests", label: "Guests", placeholder: "Number of guests" },
          { name: "bedrooms", label: "Bedrooms", placeholder: "e.g. 3" },
          { name: "bathrooms", label: "Bathrooms", placeholder: "e.g. 2" },
          { name: "address", label: "Address", placeholder: "Enter address" },
          { name: "city", label: "City", placeholder: "Enter city" },
          { name: "contact", label: "Contact", placeholder: "Phone or email" },
          { name: "price", label: "Price", placeholder: "Enter price" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="font-semibold">{label}</label>
            <input
              {...register(name, { required: `${label} is required` })}
              placeholder={placeholder}
              className="w-full px-3 py-2 bg-white/30 rounded-md focus:outline-none"
            />
          </div>
        ))}

        {/* Type */}
        <div>
          <label className="font-semibold">Type:</label>
          <div className="flex gap-6 mt-2">
            {["Villa", "House", "Apartment"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={type}
                  {...register("type", { required: "Select one type" })}
                  className="accent-[#53A2BE]"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="relative">
          <label className="font-semibold">Amenities:</label>
          <button
            type="button"
            onClick={() => setShowAmenities((prev) => !prev)}
            className="w-full mt-2 bg-white/30 px-4 py-2 rounded-md text-left"
          >
            {selectedAmenities.length > 0
              ? selectedAmenities.join(", ")
              : "Select Amenities"}
          </button>
          {showAmenities && (
            <div className="absolute z-10 mt-1 bg-white/90 rounded-md shadow-md p-4 grid grid-cols-2 gap-2 max-h-60 overflow-y-scroll w-full">
              {[
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
              ].map((amenity) => (
                <label key={amenity} className="text-sm">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="mr-1"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold block mb-2">Upload Images:</label>
          <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/30 rounded-md cursor-pointer hover:bg-white/40 transition-all">
            <UploadCloud className="w-5 h-5" />
            <span>
              {watch("images")?.length > 0
                ? `${watch("images").length} image${
                    watch("images").length > 1 ? "s" : ""
                  } uploaded`
                : "Choose images"}
            </span>
            <input
              type="file"
              {...register("images")}
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Display Images */}
        <div className="mt-4">
          {watch("images")?.length > 0 ? (
            watch("images").map((img, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <img
                  src={img}
                  alt={`uploaded-image-${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(img)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit">Update Property</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
