const express = require("express");
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/emergencyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createContact);
router.get("/", getContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
