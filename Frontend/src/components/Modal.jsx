import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-[28px] bg-cream p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-forest">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted hover:bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
