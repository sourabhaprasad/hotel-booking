import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/property.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hotel Booking Management Backend");
});

app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
