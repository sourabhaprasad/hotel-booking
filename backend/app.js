import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hotel Booking Management Backend");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
