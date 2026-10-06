const Trip = require("../models/Trip");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");
const { generateItinerary } = require("../utils/aiService");

const tones = ["sage", "peach", "lilac"];

function pickTone(destination = "") {
  const index = destination.length % tones.length;
  return tones[index];
}

const createTrip = asyncHandler(async (req, res) => {
  const { destination, startDate, endDate, budget, interests, travelType, travelStyle, itinerary, safetyTips, placesToVisit, summary, suggestions, recommendations, status } = req.body;

  if (!destination || !startDate || !endDate) {
    return sendError(res, "Destination, start date and end date are required.", 400);
  }

  const trip = await Trip.create({
    user: req.user._id,
    destination,
    startDate,
    endDate,
    budget: Number(budget) || 0,
    interests: interests || "",
    travelType: travelType || "Solo",
    travelStyle: travelStyle || "Independent & unhurried",
    itinerary: itinerary || [],
    safetyTips: safetyTips || [],
    placesToVisit: placesToVisit || [],
    suggestions: suggestions || [],
    recommendations: recommendations || [],
    summary: summary || "",
    status: status || "planned",
    coverTone: pickTone(destination),
  });

  return sendSuccess(res, { trip }, "Trip created", 201);
});

const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).sort({ startDate: -1 });
  return sendSuccess(res, { trips });
});

const getTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Trip not found.", 404);
  }
  return sendSuccess(res, { trip });
});

const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Trip not found.", 404);
  }

  const allowed = ["destination", "startDate", "endDate", "budget", "interests", "travelType", "travelStyle", "itinerary", "safetyTips", "placesToVisit", "suggestions", "recommendations", "summary", "status"];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) trip[key] = req.body[key];
  });
  await trip.save();
  return sendSuccess(res, { trip }, "Trip updated");
});

const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Trip not found.", 404);
  }
  await trip.deleteOne();
  return sendSuccess(res, {}, "Trip deleted");
});

const generateTrip = asyncHandler(async (req, res) => {
  const { destination, startDate, endDate, budget, interests, travelType, travelStyle, duration } = req.body;
  if (!destination) {
    return sendError(res, "Destination is required.", 400);
  }
  const plan = await generateItinerary({
    destination,
    startDate,
    endDate,
    budget,
    interests,
    travelType,
    travelStyle,
    duration,
  });
  return sendSuccess(res, { plan }, plan.usedFallback ? "Generated with fallback plan" : "Generated itinerary");
});

module.exports = { createTrip, getTrips, getTrip, updateTrip, deleteTrip, generateTrip };
