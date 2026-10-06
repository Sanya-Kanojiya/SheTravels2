const TravelMemory = require("../models/TravelMemory");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

const createMemory = asyncHandler(async (req, res) => {
  const { trip, destination, title, description, image, visitedPlaces } = req.body;
  if (!destination) return sendError(res, "Destination is required.", 400);
  const memory = await TravelMemory.create({
    user: req.user._id,
    trip: trip || null,
    destination,
    title: title || "",
    description: description || "",
    image: image || "",
    visitedPlaces: visitedPlaces || [],
  });
  return sendSuccess(res, { memory }, "Memory saved", 201);
});

const getMemories = asyncHandler(async (req, res) => {
  const memories = await TravelMemory.find({ user: req.user._id }).sort({ createdAt: -1 });
  return sendSuccess(res, { memories });
});

const getMemory = asyncHandler(async (req, res) => {
  const memory = await TravelMemory.findById(req.params.id);
  if (!memory || memory.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Memory not found.", 404);
  }
  return sendSuccess(res, { memory });
});

const updateMemory = asyncHandler(async (req, res) => {
  const memory = await TravelMemory.findById(req.params.id);
  if (!memory || memory.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Memory not found.", 404);
  }
  ["destination", "title", "description", "image", "visitedPlaces", "trip"].forEach((key) => {
    if (req.body[key] !== undefined) memory[key] = req.body[key];
  });
  await memory.save();
  return sendSuccess(res, { memory }, "Memory updated");
});

const deleteMemory = asyncHandler(async (req, res) => {
  const memory = await TravelMemory.findById(req.params.id);
  if (!memory || memory.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Memory not found.", 404);
  }
  await memory.deleteOne();
  return sendSuccess(res, {}, "Memory deleted");
});

module.exports = { createMemory, getMemories, getMemory, updateMemory, deleteMemory };
