const express = require("express");
const {
  dashboard,
  getUsers,
  deleteUser,
  getReports,
  reviewReport,
  deleteReportedPost,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, adminOnly);
router.get("/dashboard", dashboard);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.get("/reports", getReports);
router.put("/reports/:id", reviewReport);
router.delete("/community/posts/:id", deleteReportedPost);

module.exports = router;
