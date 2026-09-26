export default function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="rounded-[28px] border border-dashed border-line bg-white/50 px-6 py-14 text-center">
      {Icon ? (
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-forest">
          <Icon className="h-5 w-5" />
        </span>
      ) : null}
      <h3 className="font-display text-2xl text-forest">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
