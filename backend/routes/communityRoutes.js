const express = require("express");
const {
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
} = require("../controllers/communityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.post("/posts/:id/like", likePost);
router.post("/posts/:id/report", reportPost);
router.post("/posts/:postId/comments", addComment);
router.get("/posts/:postId/comments", getComments);
router.delete("/comments/:id", deleteComment);

module.exports = router;
