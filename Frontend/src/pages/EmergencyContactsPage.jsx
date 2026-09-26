import { useState } from "react";
import Button from "../components/Button";
import ContactCard from "../components/ContactCard";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useApp } from "../context/AppContext";

const empty = { name: "", relationship: "", phone: "" };

export default function EmergencyContactsPage() {
  const { contacts, setContacts, notify } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (editing) {
      setContacts((prev) => prev.map((c) => (c.id === editing ? { ...c, ...form } : c)));
      notify("Contact updated.");
    } else {
      setContacts((prev) => [...prev, { ...form, id: `c-${Date.now()}`, primary: false }]);
      notify("Contact added.");
    }
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Emergency contacts</p>
          <h1 className="font-display text-4xl text-forest">People who know the plan</h1>
        </div>
        <Button
          onClick={() => {
            setForm(empty);
            setEditing(null);
            setOpen(true);
          }}
        >
          Add contact
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={(c) => {
              setEditing(c.id);
              setForm({ name: c.name, relationship: c.relationship, phone: c.phone });
              setOpen(true);
            }}
            onDelete={(id) => {
              setContacts((prev) => prev.filter((c) => c.id !== id));
              notify("Contact removed.");
            }}
          />
        ))}
      </div>
      <Modal open={open} title={editing ? "Edit contact" : "Add contact"} onClose={() => setOpen(false)}>
        <form className="space-y-3" onSubmit={save}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input
            label="Relationship"
            value={form.relationship}
            onChange={(e) => setForm({ ...form, relationship: e.target.value })}
          />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}
