export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const styles = {
    primary:
      "bg-coral text-white shadow-[0_10px_24px_rgba(224,106,85,0.28)] hover:bg-coral-dark",
    dark: "bg-forest text-white hover:bg-ink",
    ghost: "bg-white/70 text-forest border border-line hover:bg-white",
    danger: "bg-sos text-white hover:bg-red-700",
    soft: "bg-sage text-forest hover:bg-sage-deep",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
