const express = require("express");
const { createMemory, getMemories, getMemory, updateMemory, deleteMemory } = require("../controllers/memoryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createMemory);
router.get("/", getMemories);
router.get("/:id", getMemory);
router.put("/:id", updateMemory);
router.delete("/:id", deleteMemory);

module.exports = router;
