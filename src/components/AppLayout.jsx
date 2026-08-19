import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "▤", end: true },
  { to: "/employees", label: "Employees", icon: "👤" },
  { to: "/attendance", label: "Online Attendance", icon: "🕐" },
  { to: "/offices", label: "Offices", icon: "🏢" },
  { to: "/leaves", label: "Leave Requests", icon: "📋" },
  { to: "/permissions", label: "Permissions", icon: "✋" },
  { to: "/payroll", label: "Payroll", icon: "💰" },
  { to: "/hr-settings", label: "Settings", icon: "⚙️" },
];

const ROLE_LABELS = {
  SUPER_ADMIN: "System Admin",
  HR_MANAGER: "HR Manager",
  ACCOUNTANT: "Accountant",
  EMPLOYEE: "Employee",
};

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-amber-500 text-ink-950"
            : "text-ink-300 hover:bg-ink-900 hover:text-white"
        }`
      }
    >
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </NavLink>
  );
}

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-ink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ink-950 text-ink-100 flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-ink-800">
          <h1 className="text-lg font-bold text-white">MRC HR</h1>
          <p className="text-xs text-ink-400 mt-0.5">HR · Attendance · Payroll</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="px-3 pb-3">
          <a
            href="/mobile-hr"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-400 border border-amber-500/30 hover:bg-ink-900 transition-colors"
          >
            <span className="text-base">📱</span>
            Open Mobile App
          </a>
        </div>

        <div className="px-4 py-4 border-t border-ink-800">
          <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
          <p className="text-xs text-ink-400 mb-3">{ROLE_LABELS[user?.role] || user?.role}</p>
          <button
            onClick={logout}
            className="w-full text-sm text-ink-300 hover:text-white border border-ink-700 rounded-lg py-2 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
