"use client";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useRef, useEffect } from "react";
import Button from "../components/Button";

export default function ListPropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showAmenities, setShowAmenities] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = (data) => {
    data.amenities = selectedAmenities; // add manually selected amenities
    console.log("Form submitted:", data);
    toast.success("Property submitted successfully!", {
      position: "top-center",
    });
  };

  // Inside your component:
  const amenitiesRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        amenitiesRef.current &&
        !amenitiesRef.current.contains(event.target)
      ) {
        setShowAmenities(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#53A2BE]/30 rounded-xl p-10 w-full max-w-3xl space-y-6 shadow-xl"
      >
        <h2 className="text-center text-2xl font-bold">List your property</h2>

        {[
          { name: "title", label: "Title", placeholder: "Enter title" },
          {
            name: "description",
            label: "Description",
            placeholder: "Enter description",
          },
          {
            name: "guests",
            label: "Guest allowed",
            placeholder: "Number of guests",
          },
          { name: "bedrooms", label: "No. of bedrooms", placeholder: "e.g. 3" },
          {
            name: "bathrooms",
            label: "No. of bathrooms",
            placeholder: "e.g. 2",
          },
          {
            name: "address",
            label: "Address",
            placeholder: "Enter full address",
          },
          { name: "city", label: "City", placeholder: "Enter city" },
          { name: "state", label: "State", placeholder: "Enter state" },
          {
            name: "pincode",
            label: "Pin Code",
            placeholder: "Enter postal code",
          },
          {
            name: "price",
            label: "Price per night",
            placeholder: "e.g. ₹1500",
          },
          {
            name: "contact",
            label: "Contact Details",
            placeholder: "Phone or email",
          },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="font-semibold">{label}</label>
            <input
              {...register(name, { required: `${label} is required` })}
              placeholder={placeholder}
              className="w-full px-3 py-2 bg-white/30 rounded-md focus:outline-none"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Type - radio buttons */}
        <div>
          <label className="font-semibold">Type:</label>
          <div className="flex gap-6 mt-2">
            {["Villa", "House", "Apartment"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={type}
                  {...register("type", {
                    required: "Select one type",
                  })}
                  className="accent-[#53A2BE]"
                />
                {type}
              </label>
            ))}
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type?.message}</p>
          )}
        </div>

        {/* Amenities - dropdown with checkboxes */}
        {/* Amenities - dropdown with checkboxes */}
        <div className="relative" ref={amenitiesRef}>
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
          <label className="font-semibold block mb-2">Upload images:</label>
          <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/30 rounded-md cursor-pointer hover:bg-white/40 transition-all">
            <UploadCloud className="w-5 h-5" />
            <span>Choose images</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="hidden"
            />
          </label>
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
