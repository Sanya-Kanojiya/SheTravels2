import { Pencil, Phone, Trash2 } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {contact.primary ? "Primary" : contact.relationship}
          </p>
          <h3 className="mt-1 font-display text-2xl text-forest">{contact.name}</h3>
          <p className="mt-1 text-sm text-muted">{contact.relationship}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-forest">
            <Phone className="h-4 w-4" />
            {contact.phone}
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <Button variant="ghost" className="flex-1 py-2" onClick={() => onEdit(contact)}>
          <Pencil className="h-4 w-4" /> Edit
        </Button>
        <Button variant="ghost" className="py-2 text-sos" onClick={() => onDelete(contact.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
