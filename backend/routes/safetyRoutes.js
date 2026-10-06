const express = require("express");
const { checkIn, getStatus, triggerSos } = require("../controllers/safetyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/check-in", checkIn);
router.get("/status", getStatus);
router.post("/sos", triggerSos);

module.exports = router;
