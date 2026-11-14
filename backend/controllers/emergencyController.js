const EmergencyContact = require("../models/EmergencyContact");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

const createContact = asyncHandler(async (req, res) => {
  const { name, relationship, phone, email, primary } = req.body;

  if (!name?.trim() || !relationship?.trim() || !phone?.trim()) {
    return sendError(
      res,
      "Name, relationship and phone are required.",
      400
    );
  }

  // If this contact is primary, remove primary status
  // from the user's other contacts.
  if (primary === true) {
    await EmergencyContact.updateMany(
      { user: req.user._id },
      { $set: { primary: false } }
    );
  }

  const contact = await EmergencyContact.create({
    user: req.user._id,
    name: name.trim(),
    relationship: relationship.trim(),
    phone: phone.trim(),
    email: email?.trim().toLowerCase() || "",
    primary: Boolean(primary),
  });

  return sendSuccess(res, { contact }, "Contact added", 201);
});


const getContacts = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({ user: req.user._id }).sort({ primary: -1, createdAt: -1 });
  return sendSuccess(res, { contacts });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!contact) {
    return sendError(res, "Contact not found.", 404);
  }

  const { name, relationship, phone, email, primary } = req.body;

  if (name !== undefined) {
    if (!name.trim()) return sendError(res, "Name is required.", 400);
    contact.name = name.trim();
  }

  if (relationship !== undefined) {
    if (!relationship.trim()) {
      return sendError(res, "Relationship is required.", 400);
    }
    contact.relationship = relationship.trim();
  }

  if (phone !== undefined) {
    if (!phone.trim()) return sendError(res, "Phone is required.", 400);
    contact.phone = phone.trim();
  }

  if (email !== undefined) {
    contact.email = email.trim().toLowerCase();
  }

  if (primary === true) {
    await EmergencyContact.updateMany(
      { user: req.user._id, _id: { $ne: contact._id } },
      { $set: { primary: false } }
    );
  }

  if (primary !== undefined) {
    contact.primary = primary;
  }

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
