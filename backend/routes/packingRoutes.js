const express = require("express");
const { generate, getByTrip, updateByTrip } = require("../controllers/packingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/generate", generate);
router.get("/:tripId", getByTrip);
router.put("/:tripId", updateByTrip);

module.exports = router;
