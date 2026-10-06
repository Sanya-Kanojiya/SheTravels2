const User = require("../models/User");
const EmergencyContact = require("../models/EmergencyContact");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

const getProfile = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOne({ user: req.user._id }).sort({ primary: -1, createdAt: 1 });
  return sendSuccess(res, {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileImage: req.user.profileImage,
      travelPreferences: req.user.travelPreferences,
      role: req.user.role,
    },
    emergencySummary: contact
      ? { name: contact.name, relationship: contact.relationship, phone: contact.phone }
      : null,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return sendError(res, "User not found.", 404);

  if (typeof req.body.name === "string") user.name = req.body.name;
  if (typeof req.body.profileImage === "string") user.profileImage = req.body.profileImage;
  if (req.body.travelPreferences && typeof req.body.travelPreferences === "object") {
    user.travelPreferences = {
      ...user.travelPreferences.toObject?.() || user.travelPreferences,
      ...req.body.travelPreferences,
    };
  }

  await user.save();
  return sendSuccess(res, { user }, "Profile updated");
});

module.exports = { getProfile, updateProfile };
