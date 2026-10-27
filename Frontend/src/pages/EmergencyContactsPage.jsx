
import { useState } from "react";
import Button from "../components/Button";
import ContactCard from "../components/ContactCard";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useApp } from "../context/AppContext";

const empty = {
  name: "",
  relationship: "",
  phone: "",
};

export default function EmergencyContactsPage() {
  const {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    notify,
  } = useApp();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  // Add or update contact in MongoDB
  const save = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      if (editing) {
        await updateContact(editing, form);
        notify("Contact updated successfully.");
      } else {
        await addContact(form);
        notify("Contact added successfully.");
      }

      setOpen(false);
      setEditing(null);
      setForm(empty);
    } catch (error) {
      console.error("Failed to save contact:", error);

      notify(
        error.response?.data?.message ||
          "Unable to save contact. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Open edit modal
  const handleEdit = (contact) => {
    setEditing(contact._id || contact.id);

    setForm({
      name: contact.name || "",
      relationship: contact.relationship || "",
      phone: contact.phone || "",
    });

    setOpen(true);
  };

  // Delete contact from MongoDB
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      notify("Contact removed successfully.");
    } catch (error) {
      console.error("Failed to delete contact:", error);

      notify(
        error.response?.data?.message ||
          "Unable to delete contact. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Emergency contacts
          </p>

          <h1 className="font-display text-4xl text-forest">
            People who know the plan
          </h1>
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

      {/* Contacts list */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {(contacts || []).map((contact) => (
          <ContactCard
            key={contact._id || contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={() =>
              handleDelete(contact._id || contact.id)
            }
          />
        ))}
      </div>

      {/* Add/Edit modal */}
      <Modal
        open={open}
        title={editing ? "Edit contact" : "Add contact"}
        onClose={() => {
          if (saving) return;

          setOpen(false);
          setEditing(null);
          setForm(empty);
        }}
      >
        <form className="space-y-3" onSubmit={save}>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            label="Relationship"
            value={form.relationship}
            onChange={(e) =>
              setForm({
                ...form,
                relationship: e.target.value,
              })
            }
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <Button
            type="submit"
            className="w-full"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editing
                ? "Update contact"
                : "Save contact"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
