import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res
        .status(403)
        .json({ error: "Only property managers can upload" });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path); // Cloudinary provides `path` field

    const propertyData = {
      ...req.body,
      images: imageUrls,
      guests: Number(req.body.guests),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      price: Number(req.body.price),
    };

    if (typeof req.body.amenities === "string") {
      propertyData.amenities = [req.body.amenities];
    }

    const newProperty = new Property({
      ...propertyData,
      user: req.user.id,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json({
      message: "Property listed successfully",
      property: savedProperty,
    });
  } catch (err) {
    console.error("❌ Error creating property:", err);

    // Always send JSON errors
    res.status(500).json({
      error: err?.message || "Something went wrong while listing property",
    });
  }
};

// GET: Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const { city, guests, sortBy, amenities } = req.query;

    let filter = {};
    if (city) filter.city = new RegExp(city, "i");

    if (guests) {
      if (guests.includes("-")) {
        const [minGuests, maxGuests] = guests.split("-").map(Number);
        filter.guests = { $gte: minGuests, $lte: maxGuests };
      } else {
        filter.guests = Number(guests);
      }
    }

    if (amenities) {
      const amenitiesArray = amenities.split(",");
      filter.amenities = { $all: amenitiesArray };
    }

    let query = Property.find(filter);

    if (sortBy === "price-low-high") {
      query = query.sort({ price: 1 });
    } else if (sortBy === "price-high-low") {
      query = query.sort({ price: -1 });
    }

    const properties = await query.exec();
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
    if ("images" in req.body && Array.isArray(req.body.images)) {
      updateData.images = req.body.images.filter(
        (img) => img !== null && img !== ""
      );
    } else {
      console.log("No valid images array received.");
    }

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
