const PackingList = require("../models/PackingList");
const Trip = require("../models/Trip");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");
const { generatePackingList } = require("../utils/aiService");

function durationLabel(trip) {
  if (!trip.startDate || !trip.endDate) return "few days";
  const days = Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;
  return `${days} days`;
}

const generate = asyncHandler(async (req, res) => {
  const { tripId, destination, duration, travelType, travelStyle } = req.body;
  let trip = null;
  if (tripId) {
    trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return sendError(res, "Trip not found.", 404);
    }
  }

  const plan = await generatePackingList({
    destination: destination || trip?.destination,
    duration: duration || (trip ? durationLabel(trip) : "few days"),
    travelType: travelType || trip?.travelType,
    travelStyle: travelStyle || trip?.travelStyle,
  });

  if (!trip) {
    return sendSuccess(res, { packing: plan }, "Packing list generated");
  }

  const packing = await PackingList.findOneAndUpdate(
    { user: req.user._id, trip: trip._id },
    {
      user: req.user._id,
      trip: trip._id,
      destination: plan.destination,
      duration: plan.duration,
      categories: plan.categories,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return sendSuccess(res, { packing }, "Packing list saved");
});

const getByTrip = asyncHandler(async (req, res) => {
  const packing = await PackingList.findOne({ user: req.user._id, trip: req.params.tripId });
  if (!packing) return sendError(res, "No packing list for this trip yet.", 404);
  return sendSuccess(res, { packing });
});

const updateByTrip = asyncHandler(async (req, res) => {
  const packing = await PackingList.findOne({ user: req.user._id, trip: req.params.tripId });
  if (!packing) return sendError(res, "No packing list for this trip yet.", 404);
  if (req.body.categories) packing.categories = req.body.categories;
  await packing.save();
  return sendSuccess(res, { packing }, "Packing list updated");
});

module.exports = { generate, getByTrip, updateByTrip };
