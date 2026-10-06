const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendError } = require("../utils/response");

async function protect(req, res, next) {
  try {
    const cookieToken = req.cookies?.token;
    const header = req.headers.authorization;
    const headerToken = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    const token = cookieToken || headerToken;

    if (!token) {
      return sendError(res, "Not authorized. Please log in.", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return sendError(res, "User not found.", 401);
    }

    req.user = user;
    next();
  } catch (_err) {
    return sendError(res, "Not authorized. Token is invalid.", 401);
  }
}

module.exports = { protect };
