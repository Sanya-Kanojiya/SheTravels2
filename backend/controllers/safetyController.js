const User = require("../models/User");
const EmergencyContact = require("../models/EmergencyContact");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

const tips = [
  "Share your day’s route with one trusted contact before you leave the stay.",
  "Keep a local SIM / eSIM and offline maps, even when Wi-Fi looks fine.",
  "Choose stays with 24-hour desks or women hosts for first nights in a new city.",
  "Use official taxi stands or in-app rides after dark. Skip unmarked cars.",
  "Have a code word with family or friends that means “call me now, I need an exit.”",
];

const checkIn = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.lastCheckIn = new Date();
  user.sosActive = false;
  await user.save();
  return sendSuccess(res, { lastCheckIn: user.lastCheckIn, sosActive: false }, "Check-in recorded");
});

const getStatus = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({ user: req.user._id }).sort({ primary: -1 });
  return sendSuccess(res, {
    checkedIn: Boolean(req.user.lastCheckIn),
    lastCheckIn: req.user.lastCheckIn,
    sosActive: req.user.sosActive,
    lastSosAt: req.user.lastSosAt,
    contacts,
    tips,
  });
});

const triggerSos = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.sosActive = true;
  user.lastSosAt = new Date();
  await user.save();
  const contacts = await EmergencyContact.find({ user: req.user._id });
  return sendSuccess(res, {
    sosActive: true,
    notifiedContacts: contacts.map((c) => ({ name: c.name, phone: c.phone })),
    note: "Simulated alert only. No emergency service was contacted.",
  }, "SOS alert activated");
});

module.exports = { checkIn, getStatus, triggerSos };
