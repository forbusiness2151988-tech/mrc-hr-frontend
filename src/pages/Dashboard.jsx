import { useEffect, useState } from "react";
import { employeesApi, attendanceApi, leavesApi, permissionsApi } from "../api/endpoints";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0, activeEmployees: 0, presentToday: 0,
    pendingLeaves: 0, pendingPermissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const today = new Date().toISOString().slice(0, 7);
        const [empRes, attRes, leaveRes, permRes] = await Promise.all([
          employeesApi.list(),
          attendanceApi.list({ month: today }),
          leavesApi.list({ status: "PENDING" }),
          permissionsApi.list({ status: "PENDING" }),
        ]);

        const todayStr = new Date().toISOString().slice(0, 10);
        const presentToday = attRes.data.filter(
          (r) => new Date(r.date).toISOString().slice(0, 10) === todayStr && r.checkIn
        ).length;

        setStats({
          totalEmployees: empRes.data.length,
          activeEmployees: empRes.data.filter((e) => e.status === "ACTIVE").length,
          presentToday,
          pendingLeaves: leaveRes.data.length,
          pendingPermissions: permRes.data.length,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: "Total Employees", value: stats.totalEmployees, accent: "text-ink-800" },
    { label: "Active Employees", value: stats.activeEmployees, accent: "text-green-600" },
    { label: "Present Today", value: stats.presentToday, accent: "text-amber-600" },
    { label: "Pending Leave Requests", value: stats.pendingLeaves, accent: "text-ink-800" },
    { label: "Pending Permissions", value: stats.pendingPermissions, accent: "text-ink-800" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900 mb-1">Welcome, {user?.fullName} 👋</h2>
      <p className="text-ink-500 text-sm mb-8">Here's a quick look at today's HR activity</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <p className="text-xs text-ink-500 mb-2">{c.label}</p>
            <p className={`text-2xl font-bold ${c.accent}`}>
              {loading ? "…" : c.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
