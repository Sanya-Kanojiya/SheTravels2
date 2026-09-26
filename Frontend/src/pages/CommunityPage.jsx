import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CommunityPost from "../components/CommunityPost";
import { useApp } from "../context/AppContext";

export default function CommunityPage() {
  const { posts, setPosts, notify } = useApp();
  const [draft, setDraft] = useState({ destination: "", content: "" });

  const publish = (e) => {
    e.preventDefault();
    if (!draft.content.trim()) return;
    setPosts((prev) => [
      {
        id: `post-${Date.now()}`,
        author: "Aanya Mehra",
        avatar: "AM",
        destination: draft.destination || "Somewhere new",
        time: "Just now",
        content: draft.content,
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...prev,
    ]);
    setDraft({ destination: "", content: "" });
    notify("Post shared with the community.");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Community</p>
        <h1 className="font-display text-4xl text-forest">Notes from the road</h1>
      </div>
      <Card className="p-5">
        <form className="space-y-3" onSubmit={publish}>
          <input
            className="w-full rounded-2xl border border-line px-4 py-3 text-sm"
            placeholder="Destination"
            value={draft.destination}
            onChange={(e) => setDraft({ ...draft, destination: e.target.value })}
          />
          <textarea
            className="min-h-24 w-full rounded-2xl border border-line px-4 py-3 text-sm"
            placeholder="Share a stay tip, a street that felt safe, or a cafe with a window seat."
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          />
          <Button type="submit">Create post</Button>
        </form>
      </Card>
      {posts.map((post) => (
        <CommunityPost
          key={post.id}
          post={post}
          onLike={(id) =>
            setPosts((prev) =>
              prev.map((p) =>
                p.id === id
                  ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                  : p,
              ),
            )
          }
          onReport={() => notify("Thanks. This post was flagged for review (mock).")}
        />
      ))}
    </div>
  );
}
