
import { useState } from "react";
import {
  Flag,
  Heart,
  MessageCircle,
  MapPin,
  Send,
} from "lucide-react";
import Card from "./Card";
import api from "../services/api";

export default function CommunityPost({
  post,
  onLike,
  onReport,
  onCommentAdded,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const postId = post._id || post.id;

  // Fetch comments for this post
  const loadComments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(
        `/community/posts/${postId}/comments`
      );

      setComments(res.data.data.comments || []);
    } catch (err) {
      console.error(
        "Failed to load comments:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
          "Could not load comments."
      );
    } finally {
      setLoading(false);
    }
  };

  // Open or close the comments section
  const toggleComments = async () => {
    const opening = !showComments;
    setShowComments(opening);

    if (opening) {
      await loadComments();
    }
  };

  // Submit a comment to the backend
  const submitComment = async (e) => {
    e.preventDefault();

    const content = draft.trim();

    if (!content || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await api.post(
        `/community/posts/${postId}/comments`,
        { content }
      );

      const newComment = res.data.data.comment;

      setComments((prev) => [...prev, newComment]);
      setDraft("");

      onCommentAdded?.(postId);
    } catch (err) {
      console.error(
        "Failed to post comment:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
          "Could not post comment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const authorName =
    post.author || post.user?.name || "Traveller";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac text-sm font-semibold text-forest">
            {post.avatar ||
              authorName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
          </span>

          <div>
            <p className="font-semibold text-forest">
              {authorName}
            </p>

            <p className="flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              {post.destination || "Somewhere new"} ·{" "}
              {post.time
                ? new Date(post.time).toLocaleString()
                : "Recently"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onReport?.(post)}
          className="rounded-xl p-2 text-muted hover:bg-cream"
          aria-label="Report post"
        >
          <Flag className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-ink">
        {post.content}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onLike?.(postId)}
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
            post.liked
              ? "bg-coral/10 text-coral"
              : "bg-cream text-muted hover:text-forest"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${
              post.liked ? "fill-coral" : ""
            }`}
          />
          {post.likes || 0}
        </button>

        <button
          type="button"
          onClick={toggleComments}
          className="inline-flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-sm text-muted hover:text-forest"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments || 0}
          <span>Comments</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 border-t border-line pt-4">
          <form
            onSubmit={submitComment}
            className="flex gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a comment..."
              maxLength={1000}
              className="min-w-0 flex-1 rounded-xl border border-line px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={!draft.trim() || submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-forest px-3 py-2 text-sm text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Sending..." : "Post"}
            </button>
          </form>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {loading ? (
            <p className="mt-3 text-sm text-muted">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              No comments yet. Start the conversation!
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment._id || comment.id}
                  className="rounded-xl bg-cream p-3"
                >
                  <p className="text-sm font-semibold text-forest">
                    {comment.user?.name || "Traveller"}
                  </p>

                  <p className="mt-1 break-words text-sm text-ink">
                    {comment.content}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {comment.createdAt
                      ? new Date(
                          comment.createdAt
                        ).toLocaleString()
                      : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
