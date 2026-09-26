import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toasts } = useApp();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[min(92vw,360px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-2xl border border-white bg-forest px-4 py-3 text-sm text-white shadow-xl"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
