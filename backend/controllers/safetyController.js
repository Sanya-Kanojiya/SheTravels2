const { sendSosEmail } = require("../utils/emailService");
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

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.lastCheckIn = new Date();

  // Don't deactivate an active SOS during normal check-in.
  await user.save();

  return sendSuccess(
    res,
    {
      lastCheckIn: user.lastCheckIn,
      sosActive: user.sosActive,
    },
    "Check-in recorded successfully"
  );
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
  const { location } = req.body || {};

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  let latitude = null;
  let longitude = null;

  // Validate GPS coordinates
  if (location) {
    latitude = Number(location.latitude);
    longitude = Number(location.longitude);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid GPS coordinates",
      });
    }
  }

  // Activate SOS
  user.sosActive = true;
  user.lastSosAt = new Date();

  user.sosLocation = {
    latitude,
    longitude,
  };

  await user.save();

  // Fetch emergency contacts
  const contacts = await EmergencyContact.find({
    user: req.user._id,
  }).sort({ primary: -1 });


  const mapLink =
    latitude !== null && longitude !== null
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : null;

  // Send SOS email to emergency contacts
  const emailResults = await Promise.allSettled(
    contacts
      .filter((contact) => contact.email)
      .map((contact) =>
        sendSosEmail({
          to: contact.email,
          userName: user.name,
          mapLink,
          timestamp: user.lastSosAt.toLocaleString(),
        })
      )
  );


  return sendSuccess(
    res,
    {
      sosActive: true,
      lastSosAt: user.lastSosAt,
      location: user.sosLocation,
      mapLink,
      notifiedContacts: contacts.map((contact) => ({
        name: contact.name,
        phone: contact.phone,
        relationship: contact.relationship,
      })),

      emailStatus: {
        attempted: emailResults.length,
        sent: emailResults.filter((result) => result.status === "fulfilled").length,
        failed: emailResults.filter((result) => result.status === "rejected").length,
      },
      note: "SOS activated. Email notification attempts completed.",
    },
    "Emergency SOS activated successfully"
  );
});

module.exports = { checkIn, getStatus, triggerSos };


module.exports = { checkIn, getStatus, triggerSos };
