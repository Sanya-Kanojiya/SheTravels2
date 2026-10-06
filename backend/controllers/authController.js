const { validationResult, body } = require("express-validator");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const { sendSuccess, sendError } = require("../utils/response");

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    travelPreferences: user.travelPreferences,
    role: user.role,
    createdAt: user.createdAt,
  };
}

const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

const loginRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, errors.array()[0].msg, 400);
  }

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    return sendError(res, "An account with this email already exists.", 400);
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const role = adminEmail && email.toLowerCase() === adminEmail ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const token = generateToken(res, user._id);
  return sendSuccess(res, { user: publicUser(user), token }, "Account created", 201);
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, errors.array()[0].msg, 400);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, "Invalid email or password.", 401);
  }

  const token = generateToken(res, user._id);
  return sendSuccess(res, { user: publicUser(user), token }, "Logged in");
});

const me = asyncHandler(async (req, res) => {
  return sendSuccess(res, { user: publicUser(req.user) }, "Current user");
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return sendSuccess(res, {}, "Logged out");
});

module.exports = { register, login, me, logout, registerRules, loginRules };
