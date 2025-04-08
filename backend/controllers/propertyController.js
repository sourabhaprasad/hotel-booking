import Property from "../models/Property.js";

// POST: Create a new property
export const createProperty = async (req, res) => {
  try {
    // Get Cloudinary image URLs from uploaded files
    const imageUrls = req.files.map((file) => file.path);

    // Parse and sanitize incoming data
    const propertyData = {
      ...req.body,
      images: imageUrls,
      guests: Number(req.body.guests),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      price: Number(req.body.price),
    };

    // Handle amenities (may come as a string if one value is selected)
    if (typeof req.body.amenities === "string") {
      propertyData.amenities = [req.body.amenities];
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    res
      .status(201)
      .json({ message: "Property listed successfully", property: newProperty });
  } catch (err) {
    console.error("Error creating property:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while listing property" });
  }
};

// GET: Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// DELETE: Delete a property by ID
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("Error deleting property:", err);
    res.status(500).json({ error: "Failed to delete property" });
  }
};

// PUT: Update a property by ID
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = {
      ...req.body,
      guests: Number(req.body.guests),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      price: Number(req.body.price),
    };

    if (typeof req.body.amenities === "string") {
      updatedData.amenities = [req.body.amenities];
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res
      .status(200)
      .json({
        message: "Property updated successfully",
        property: updatedProperty,
      });
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(500).json({ error: "Failed to update property" });
  }
};
