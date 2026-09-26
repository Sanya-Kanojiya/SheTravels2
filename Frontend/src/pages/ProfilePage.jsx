import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { currentUser } from "../data/mock";
import { useApp } from "../context/AppContext";

export default function ProfilePage() {
  const { user, notify } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || currentUser.name);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-lilac font-display text-3xl text-forest">
            {name[0]}
          </span>
          <div className="flex-1">
            <h1 className="font-display text-4xl text-forest">{name}</h1>
            <p className="text-muted">{user?.email || currentUser.email}</p>
          </div>
          <Button variant="ghost" onClick={() => setEditing((v) => !v)}>
            {editing ? "Close" : "Edit profile"}
          </Button>
        </div>
        {editing ? (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setEditing(false);
              notify("Profile updated locally.");
            }}
          >
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="submit">Save changes</Button>
          </form>
        ) : null}
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-display text-2xl text-forest">Travel preferences</h2>
          <p className="mt-2 text-sm text-muted">{currentUser.preferences.style}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentUser.preferences.interests.map((item) => (
              <span key={item} className="rounded-full bg-sage px-3 py-1 text-xs text-forest">
                {item}
              </span>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-2xl text-forest">Emergency contact</h2>
          <p className="mt-2 font-semibold text-forest">{currentUser.emergencySummary.name}</p>
          <p className="text-sm text-muted">
            {currentUser.emergencySummary.relationship} · {currentUser.emergencySummary.phone}
          </p>
        </Card>
      </div>
    </div>
  );
}
