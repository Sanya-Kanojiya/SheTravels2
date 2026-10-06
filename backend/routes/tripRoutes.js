const express = require("express");
const {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  generateTrip,
} = require("../controllers/tripController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/generate", generateTrip);
router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:id", getTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
