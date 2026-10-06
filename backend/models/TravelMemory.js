const mongoose = require("mongoose");

const travelMemorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", default: null },
    destination: { type: String, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    visitedPlaces: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("TravelMemory", travelMemorySchema);
