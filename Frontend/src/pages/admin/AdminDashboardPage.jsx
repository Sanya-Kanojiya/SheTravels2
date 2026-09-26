import { Flag, Map, MessageSquare, Users } from "lucide-react";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import { adminUsers, communityPosts, reports, trips } from "../../data/mock";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-forest">Admin overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={adminUsers.length} icon={Users} />
        <StatCard label="Total trips" value={trips.length} icon={Map} tone="peach" />
        <StatCard label="Community posts" value={communityPosts.length} icon={MessageSquare} tone="lilac" />
        <StatCard label="Open reports" value={reports.length} icon={Flag} tone="coral" />
      </div>
      <Card className="p-6">
        <h2 className="font-display text-2xl text-forest">Activity (placeholder)</h2>
        <div className="mt-6 flex h-40 items-end gap-3">
          {[40, 65, 50, 80, 55, 72, 48].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-2xl bg-sage" style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">Weekly mock sign-ups — chart is decorative for the demo.</p>
      </Card>
    </div>
  );
}
