const CommunityPost = require("../models/CommunityPost");
const Comment = require("../models/Comment");
const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

function shapePost(post, userId, commentCount = 0) {
  const likes = post.likes || [];
  const author = post.user;
  const name = author?.name || "Traveller";
  return {
    id: post._id,
    content: post.content,
    destination: post.destination,
    image: post.image,
    likes: likes.length,
    liked: likes.some((id) => id.toString() === userId.toString()),
    comments: commentCount,
    author: name,
    avatar: name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    time: post.createdAt,
    userId: author?._id || post.user,
    createdAt: post.createdAt,
  };
}

const createPost = asyncHandler(async (req, res) => {
  const { content, destination, image } = req.body;
  if (!content || !content.trim()) {
    return sendError(res, "Post content is required.", 400);
  }
  const post = await CommunityPost.create({
    user: req.user._id,
    content: content.trim(),
    destination: destination || "",
    image: image || "",
  });
  const populated = await post.populate("user", "name");
  return sendSuccess(res, { post: shapePost(populated, req.user._id, 0) }, "Post created", 201);
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await CommunityPost.find().sort({ createdAt: -1 }).populate("user", "name");
  const ids = posts.map((p) => p._id);
  const counts = await Comment.aggregate([
    { $match: { post: { $in: ids } } },
    { $group: { _id: "$post", count: { $sum: 1 } } },
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [c._id.toString(), c.count]));
  return sendSuccess(res, {
    posts: posts.map((p) => shapePost(p, req.user._id, countMap[p._id.toString()] || 0)),
  });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id).populate("user", "name");
  if (!post) return sendError(res, "Post not found.", 404);
  const commentCount = await Comment.countDocuments({ post: post._id });
  return sendSuccess(res, { post: shapePost(post, req.user._id, commentCount) });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return sendError(res, "Post not found.", 404);
  if (post.user.toString() !== req.user._id.toString()) {
    return sendError(res, "You can only edit your own posts.", 403);
  }
  if (req.body.content !== undefined) post.content = req.body.content;
  if (req.body.destination !== undefined) post.destination = req.body.destination;
  if (req.body.image !== undefined) post.image = req.body.image;
  await post.save();
  const populated = await post.populate("user", "name");
  return sendSuccess(res, { post: shapePost(populated, req.user._id) }, "Post updated");
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return sendError(res, "Post not found.", 404);
  if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return sendError(res, "You can only delete your own posts.", 403);
  }
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  return sendSuccess(res, {}, "Post deleted");
});

const likePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id).populate("user", "name");
  if (!post) return sendError(res, "Post not found.", 404);
  const uid = req.user._id.toString();
  const already = post.likes.some((id) => id.toString() === uid);
  if (already) {
    post.likes = post.likes.filter((id) => id.toString() !== uid);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  const commentCount = await Comment.countDocuments({ post: post._id });
  return sendSuccess(res, { post: shapePost(post, req.user._id, commentCount) }, already ? "Like removed" : "Post liked");
});

const reportPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return sendError(res, "Post not found.", 404);
  const reason = req.body.reason || "Inappropriate or unsafe content";
  const report = await Report.create({
    post: post._id,
    reportedBy: req.user._id,
    reason,
  });
  return sendSuccess(res, { report }, "Post reported", 201);
});

const addComment = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.postId);
  if (!post) return sendError(res, "Post not found.", 404);
  if (!req.body.content || !req.body.content.trim()) {
    return sendError(res, "Comment is required.", 400);
  }
  const comment = await Comment.create({
    post: post._id,
    user: req.user._id,
    content: req.body.content.trim(),
  });
  const populated = await comment.populate("user", "name");
  return sendSuccess(res, { comment: populated }, "Comment added", 201);
});

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 }).populate("user", "name");
  return sendSuccess(res, { comments });
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return sendError(res, "Comment not found.", 404);
  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return sendError(res, "You can only delete your own comments.", 403);
  }
  await comment.deleteOne();
  return sendSuccess(res, {}, "Comment deleted");
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  reportPost,
  addComment,
  getComments,
  deleteComment,
};
