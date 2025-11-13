import express from "express";
import jwt from "jsonwebtoken";
import Material from "../models/Material.js";

const router = express.Router();

// Middleware for authentication
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Upload material
router.post("/upload", verifyToken, async (req, res) => {
  try {
    const { title, subject, description, fileUrl } = req.body;
    const material = await Material.create({
      title,
      subject,
      description,
      fileUrl,
      uploadedBy: req.userId
    });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().populate("uploadedBy", "name");
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
