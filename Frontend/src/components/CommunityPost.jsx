import { Flag, Heart, MessageCircle, MapPin } from "lucide-react";
import Card from "./Card";

export default function CommunityPost({ post, onLike, onReport }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lilac text-sm font-semibold text-forest">
            {post.avatar}
          </span>
          <div>
            <p className="font-semibold text-forest">{post.author}</p>
            <p className="flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" />
              {post.destination} · {post.time}
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
      <p className="mt-4 text-sm leading-6 text-ink">{post.content}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onLike?.(post.id)}
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
            post.liked ? "bg-coral/10 text-coral" : "bg-cream text-muted hover:text-forest"
          }`}
        >
          <Heart className={`h-4 w-4 ${post.liked ? "fill-coral" : ""}`} />
          {post.likes}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-sm text-muted"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </button>
      </div>
    </Card>
  );
}
