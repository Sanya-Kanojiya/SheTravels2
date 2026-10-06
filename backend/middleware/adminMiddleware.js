const { sendError } = require("../utils/response");

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return sendError(res, "Admin access only.", 403);
  }
  next();
}

module.exports = { adminOnly };
