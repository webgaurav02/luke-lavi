import mongoose from "mongoose";

const RsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  guestName: { type: String }, // Optional, from query param
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite on hot reloads (Next.js dev)
export default mongoose.models.Rsvp || mongoose.model("Rsvp", RsvpSchema);