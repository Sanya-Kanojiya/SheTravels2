
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CommunityPost from "../components/CommunityPost";
import { useApp } from "../context/AppContext";
import api from "../services/api";

export default function CommunityPage() {
  const { posts, setPosts, notify, user } = useApp();

  const [draft, setDraft] = useState({
    destination: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  // Fetch community posts from the backend
  useEffect(() => {
    let active = true;

    const fetchPosts = async () => {
      try {
        const res = await api.get("/community/posts");

        if (active) {
          setPosts(res.data.data.posts || []);
        }
      } catch (error) {
        console.error(
          "Failed to load community posts:",
          error.response?.data || error
        );

        if (active) {
          notify(
            error.response?.data?.message ||
              "Could not load community posts."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  // Publish a post to the backend
  const publish = async (e) => {
    e.preventDefault();

    if (!draft.content.trim() || publishing) return;

    setPublishing(true);

    try {
      const res = await api.post("/community/posts", {
        destination: draft.destination.trim(),
        content: draft.content.trim(),
      });

      const newPost = res.data.data.post;

      setPosts((prev) => [newPost, ...prev]);

      setDraft({
        destination: "",
        content: "",
      });

      notify("Post shared with the community.");
    } catch (error) {
      console.error(
        "Failed to create post:",
        error.response?.data || error
      );

      notify(
        error.response?.data?.message ||
          "Could not publish post."
      );
    } finally {
      setPublishing(false);
    }
  };

  // Like or unlike a post through the backend
  const handleLike = async (postId) => {
    try {
      const res = await api.post(
        `/community/posts/${postId}/like`
      );

      const updatedPost = res.data.data.post;

      setPosts((prev) =>
        prev.map((post) =>
          String(post._id || post.id) ===
          String(postId)
            ? updatedPost
            : post
        )
      );
    } catch (error) {
      console.error(
        "Failed to like post:",
        error.response?.data || error
      );

      notify(
        error.response?.data?.message ||
          "Could not update like."
      );
    }
  };

  // Update the displayed comment count
  const handleCommentAdded = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        String(post._id || post.id) === String(postId)
          ? {
              ...post,
              comments: (post.comments || 0) + 1,
            }
          : post
      )
    );
  };

  // Report a post through the backend
  const handleReport = async (post) => {
    try {
      await api.post(
        `/community/posts/${post._id || post.id}/report`,
        {
          reason: "Inappropriate or unsafe content",
        }
      );

      notify("Post reported successfully.");
    } catch (error) {
      console.error(
        "Failed to report post:",
        error.response?.data || error
      );

      notify(
        error.response?.data?.message ||
          "Could not report post."
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Community
        </p>

        <h1 className="font-display text-4xl text-forest">
          Notes from the road
        </h1>
      </div>

      <Card className="p-5">
        <form className="space-y-3" onSubmit={publish}>
          <input
            className="w-full rounded-2xl border border-line px-4 py-3 text-sm"
            placeholder="Destination"
            value={draft.destination}
            onChange={(e) =>
              setDraft({
                ...draft,
                destination: e.target.value,
              })
            }
          />

          <textarea
            className="min-h-24 w-full rounded-2xl border border-line px-4 py-3 text-sm"
            placeholder="Share a stay tip, a street that felt safe, or a cafe with a window seat."
            value={draft.content}
            onChange={(e) =>
              setDraft({
                ...draft,
                content: e.target.value,
              })
            }
          />

          <Button type="submit" disabled={publishing}>
            {publishing ? "Publishing..." : "Create post"}
          </Button>
        </form>
      </Card>

      {loading ? (
        <p className="py-6 text-center text-sm text-muted">
          Loading community posts...
        </p>
      ) : posts.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted">
            No posts yet. Share your first travel experience!
          </p>
        </Card>
      ) : (
        posts.map((post) => (
          <CommunityPost
            key={post._id || post.id}
            post={post}
            onLike={handleLike}
            onReport={handleReport}
            onCommentAdded={handleCommentAdded}
          />
        ))
      )}
    </div>
  );
}
