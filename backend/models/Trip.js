const mongoose = require("mongoose");

const itineraryDaySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    items: [String],
  },
  { _id: false },
);

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, default: 0 },
    interests: { type: String, default: "" },
    travelType: {
      type: String,
      enum: ["Solo", "Friends", "Family", "Group"],
      default: "Solo",
    },
    travelStyle: { type: String, default: "Independent & unhurried" },
    itinerary: { type: [itineraryDaySchema], default: [] },
    placesToVisit: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    safetyTips: { type: [String], default: [] },
    recommendations: { type: [String], default: [] },
    summary: { type: String, default: "" },
    status: {
      type: String,
      enum: ["planned", "ongoing", "completed"],
      default: "planned",
    },
    coverTone: { type: String, enum: ["sage", "peach", "lilac"], default: "sage" },
    safetyScore: { type: Number, default: 80 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
