const EmergencyContact = require("../models/EmergencyContact");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

const createContact = asyncHandler(async (req, res) => {
  const { name, relationship, phone, primary } = req.body;
  if (!name || !relationship || !phone) {
    return sendError(res, "Name, relationship and phone are required.", 400);
  }
  const contact = await EmergencyContact.create({
    user: req.user._id,
    name,
    relationship,
    phone,
    primary: Boolean(primary),
  });
  return sendSuccess(res, { contact }, "Contact added", 201);
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({ user: req.user._id }).sort({ primary: -1, createdAt: -1 });
  return sendSuccess(res, { contacts });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findById(req.params.id);
  if (!contact || contact.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Contact not found.", 404);
  }
  ["name", "relationship", "phone", "primary"].forEach((key) => {
    if (req.body[key] !== undefined) contact[key] = req.body[key];
  });
  await contact.save();
  return sendSuccess(res, { contact }, "Contact updated");
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findById(req.params.id);
  if (!contact || contact.user.toString() !== req.user._id.toString()) {
    return sendError(res, "Contact not found.", 404);
  }
  await contact.deleteOne();
  return sendSuccess(res, {}, "Contact deleted");
});

module.exports = { createContact, getContacts, updateContact, deleteContact };
