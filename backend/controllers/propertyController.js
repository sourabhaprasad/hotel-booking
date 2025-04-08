import Property from "../models/Property.js";

// POST: Create a new property
export const createProperty = async (req, res) => {
  try {
    // ✅ Restrict non-managers
    if (req.user.role !== "manager") {
      return res
        .status(403)
        .json({ error: "Only property managers can upload" });
    }

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

    const newProperty = new Property({
      ...propertyData,
      user: req.user.id,
    });

    const savedProperty = await newProperty.save(); // <- You forgot to save it!

    res.status(201).json({
      message: "Property listed successfully",
      property: savedProperty,
    });
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

    const updateData = {
      ...req.body,
    };

    // Validate and convert numeric fields
    const numericFields = ["guests", "bedrooms", "bathrooms", "price"];
    for (const field of numericFields) {
      if (req.body[field] !== undefined) {
        const value = Number(req.body[field]);
        if (isNaN(value)) {
          return res
            .status(400)
            .json({ error: `${field} must be a valid number` });
        }
        updateData[field] = value;
      }
    }

    // Convert amenities to array if needed
    if (typeof req.body.amenities === "string") {
      updateData.amenities = req.body.amenities.split(",").map((a) => a.trim());
    }

    const updated = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property updated", property: updated });
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(500).json({ error: "Failed to update property" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error("Error fetching property by ID:", err);
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

// GET: Fetch properties by logged-in host (Property Manager)
export const getPropertiesByHost = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error fetching host properties:", err);
    res.status(500).json({ error: "Failed to fetch host properties" });
  }
};
