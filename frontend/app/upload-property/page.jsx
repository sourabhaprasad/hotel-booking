"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import Button from "../components/Button";
import { createProperty } from "@lib/api";

export default function ListPropertyForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  const onSubmit = async (data) => {
    try {
      const maxSizeMB = 2;
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (data.images && data.images.length > 0) {
        for (let file of data.images) {
          if (!allowedTypes.includes(file.type)) {
            toast.error(`Unsupported file type: ${file.type}`);
            return;
          }
          if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`${file.name} is too large (max ${maxSizeMB}MB)`);
            return;
          }
        }
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
      });

      selectedAmenities.forEach((amenity) =>
        formData.append("amenities[]", amenity)
      );
      for (const image of data.images) {
        formData.append("images", image);
      }

      const token = localStorage.getItem("homestayToken");
      const submissionPromise = createProperty(formData, token);

      await toast.promise(submissionPromise, {
        loading: "Submitting...",
        success: "Property submitted successfully!",
        error: (err) => err.message || "Failed to submit property.",
      });

      reset();
      setSelectedAmenities([]);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const amenitiesRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (amenitiesRef.current && !amenitiesRef.current.contains(e.target)) {
        setShowAmenities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const watchImages = watch("images");

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#53A2BE]/30 rounded-xl px-4 py-6 sm:px-8 sm:py-10 w-full max-w-3xl space-y-6 shadow-xl"
      >
        <h2 className="text-center text-xl sm:text-2xl font-bold">
          List your property
        </h2>

        {/* Text Fields */}
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
            <label
              htmlFor={name}
              className="block font-semibold mb-1 text-sm sm:text-base"
            >
              {label}
            </label>
            <input
              id={name}
              {...register(name, { required: `${label} is required` })}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm sm:text-base bg-white/30 rounded-md focus:outline-none placeholder:text-gray-600 placeholder:opacity-80"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Property Type */}
        <div>
          <label
            htmlFor="type"
            className="block font-semibold mb-1 text-sm sm:text-base"
          >
            Type:
          </label>
          <div className="flex flex-wrap gap-4">
            {["Villa", "House", "Apartment"].map((type) => (
              <label
                key={type}
                htmlFor={`type-${type}`}
                className="flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <input
                  type="radio"
                  id={`type-${type}`}
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

        {/* Amenities Dropdown */}
        <div className="relative" ref={amenitiesRef}>
          <label
            htmlFor="amenities"
            className="block font-semibold mb-1 text-sm sm:text-base"
          >
            Amenities:
          </label>
          <button
            id="amenities"
            type="button"
            onClick={() => setShowAmenities((prev) => !prev)}
            className="w-full mt-2 bg-white/30 px-4 py-2 rounded-md text-left"
          >
            {selectedAmenities.length > 0
              ? selectedAmenities.join(", ")
              : "Select Amenities"}
          </button>
          {showAmenities && (
            <div className="absolute z-10 mt-1 bg-white/90 rounded-md shadow-md p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-scroll w-full">
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
                <label
                  key={amenity}
                  className="text-sm cursor-pointer flex items-center"
                >
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
          <label
            htmlFor="images"
            className="block font-semibold mb-2 text-sm sm:text-base"
          >
            Upload images:
          </label>
          <label
            htmlFor="images"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/30 rounded-md cursor-pointer hover:bg-white/40 transition-all text-sm sm:text-base"
          >
            <UploadCloud className="w-5 h-5" />
            <span>
              {watchImages && watchImages.length > 0
                ? (() => {
                    const pluralSuffix = watchImages.length > 1 ? "s" : "";
                    return `${watchImages.length} image${pluralSuffix} uploaded`;
                  })()
                : "Choose images"}
            </span>
          </label>
          <input
            id="images"
            type="file"
            {...register("images", {
              required: "At least one image is required",
            })}
            accept="image/*"
            multiple
            className="hidden"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">
              {errors.images?.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit" className="px-6 py-2 text-sm sm:text-base">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
