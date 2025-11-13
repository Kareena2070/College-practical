import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Material = mongoose.model("Material", materialSchema);
export default Material;
