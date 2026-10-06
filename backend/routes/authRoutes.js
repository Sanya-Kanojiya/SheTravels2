const express = require("express");
const { register, login, me, logout, registerRules, loginRules } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerRules, register);
router.post("/login", loginRules, login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

module.exports = router;
