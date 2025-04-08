import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Incoming token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    console.warn("No token found in request headers");
    res.status(401).json({ error: "No token, authorization denied" });
  }
};
