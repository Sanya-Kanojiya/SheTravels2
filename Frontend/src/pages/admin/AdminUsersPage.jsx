import { useMemo, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { adminUsers as seed } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function AdminUsersPage() {
  const { notify } = useApp();
  const [users, setUsers] = useState(seed);
  const [q, setQ] = useState("");
  const visible = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.includes(q.toLowerCase())),
    [users, q],
  );

  return (
    <div className="space-y-5">
      <h1 className="font-display text-4xl text-forest">Manage users</h1>
      <Input placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sage/60 text-forest">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Trips</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr key={user.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-forest">{user.name}</td>
                <td className="px-4 py-3 text-muted">{user.email}</td>
                <td className="px-4 py-3">{user.trips}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${user.status === "Active" ? "bg-sage" : "bg-peach"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="px-3 py-1.5" onClick={() => notify(`Viewing ${user.name} (mock).`)}>
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 py-1.5 text-sos"
                      onClick={() => {
                        setUsers((prev) => prev.filter((u) => u.id !== user.id));
                        notify("User removed from the mock list.");
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
