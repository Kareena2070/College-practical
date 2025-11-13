// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // new import
import userRoutes from "./routes/userRoutes.js"; // new import

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("EduConnect Backend Running Successfully");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server http://localhost:5000/ ${PORT}`));
