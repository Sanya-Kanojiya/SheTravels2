import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { reports as seed } from "../../data/mock";
import { useApp } from "../../context/AppContext";

export default function AdminReportsPage() {
  const { notify } = useApp();
  const [rows, setRows] = useState(seed);

  return (
    <div className="space-y-5">
      <h1 className="font-display text-4xl text-forest">Community reports</h1>
      <div className="space-y-3">
        {rows.map((row) => (
          <Card key={row.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{row.status}</p>
                <h2 className="mt-1 font-display text-2xl text-forest">{row.post}</h2>
                <p className="mt-1 text-sm text-muted">
                  {row.user} · {row.reason}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "Reviewed" } : r)));
                    notify("Marked as reviewed.");
                  }}
                >
                  Review
                </Button>
                <Button
                  variant="ghost"
                  className="text-sos"
                  onClick={() => {
                    setRows((prev) => prev.filter((r) => r.id !== row.id));
                    notify("Report dismissed / post removed (mock).");
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
