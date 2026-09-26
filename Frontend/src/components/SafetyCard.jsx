import Card from "./Card";

export default function SafetyCard({ title, body, icon: Icon, tone = "sage" }) {
  const tones = {
    sage: "bg-sage",
    peach: "bg-peach",
    lilac: "bg-lilac",
  };

  return (
    <Card className="p-5">
      <span className={`mb-4 inline-flex rounded-2xl p-3 ${tones[tone]}`}>
        {Icon ? <Icon className="h-5 w-5 text-forest" /> : null}
      </span>
      <h3 className="font-display text-xl text-forest">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </Card>
  );
}
