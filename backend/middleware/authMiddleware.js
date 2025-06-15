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

      if (!token || token === "null") {
        return res.status(401).json({ error: "Invalid token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = user;
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
