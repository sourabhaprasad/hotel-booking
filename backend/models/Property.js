import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["Villa", "House", "Apartment"],
      required: true,
    },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    price: { type: Number, required: true },
    contact: { type: String, required: true },
    images: { type: [String], required: true }, // cloudinary URLs
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
