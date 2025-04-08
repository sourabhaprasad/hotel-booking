import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
  getPropertiesByHost,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hotel-booking/properties",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

router.post("/", protect, upload.array("images", 5), createProperty);
router.get("/", getAllProperties);
router.delete("/:id", deleteProperty);
router.put("/:id", updateProperty);
router.get("/my-properties", protect, getPropertiesByHost);
router.get("/:id", getPropertyById);

export default router;
