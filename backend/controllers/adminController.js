const User = require("../models/User");
const Trip = require("../models/Trip");
const CommunityPost = require("../models/CommunityPost");
const Report = require("../models/Report");
const Comment = require("../models/Comment");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

const dashboard = asyncHandler(async (req, res) => {
  const [totalUsers, totalTrips, totalPosts, totalReports] = await Promise.all([
    User.countDocuments(),
    Trip.countDocuments(),
    CommunityPost.countDocuments(),
    Report.countDocuments(),
  ]);
  return sendSuccess(res, { totalUsers, totalTrips, totalPosts, totalReports });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  const trips = await Trip.aggregate([{ $group: { _id: "$user", count: { $sum: 1 } } }]);
  const tripMap = Object.fromEntries(trips.map((t) => [t._id.toString(), t.count]));
  const data = users.map((u) => ({
    id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    trips: tripMap[u._id.toString()] || 0,
    status: "Active",
    createdAt: u.createdAt,
  }));
  return sendSuccess(res, { users: data });
});

const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return sendError(res, "You cannot delete your own admin account.", 400);
  }
  const user = await User.findById(req.params.id);
  if (!user) return sendError(res, "User not found.", 404);
  await user.deleteOne();
  return sendSuccess(res, {}, "User deleted");
});

const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find()
    .sort({ createdAt: -1 })
    .populate("post", "content destination")
    .populate("reportedBy", "name email");
  return sendSuccess(res, { reports });
});

const reviewReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return sendError(res, "Report not found.", 404);
  report.status = req.body.status || "reviewed";
  await report.save();
  return sendSuccess(res, { report }, "Report updated");
});

const deleteReportedPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return sendError(res, "Post not found.", 404);
  await Comment.deleteMany({ post: post._id });
  await Report.updateMany({ post: post._id }, { status: "resolved" });
  await post.deleteOne();
  return sendSuccess(res, {}, "Post deleted");
});

module.exports = { dashboard, getUsers, deleteUser, getReports, reviewReport, deleteReportedPost };
