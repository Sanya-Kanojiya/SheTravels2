export default function Card({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag
      className={`rounded-[24px] border border-white/70 bg-card shadow-[0_12px_40px_rgba(36,49,43,0.06)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
