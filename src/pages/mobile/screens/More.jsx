import Icon from "../components/Icon";

const groups = [
  {
    title: "HR System",
    items: [
      { key: "schedule", label: "My Schedule", icon: "calendar" },
      { key: "salary", label: "Payroll", icon: "wallet" },
      { key: "dailyReport", label: "Daily Report", icon: "chart" },
      { key: "announcements", label: "Announcements", icon: "megaphone" },
    ],
  },
  {
    title: "Leave Management",
    items: [
      { key: "vacationsHolidays", label: "Vacations & Holidays", icon: "sun" },
      { key: "myRequests", label: "My Requests", icon: "request" },
      { key: "managerRequests", label: "Manager Requests", icon: "users" },
    ],
  },
  {
    title: "Company",
    items: [
      { key: "networks", label: "Networks", icon: "wifi" },
      { key: "orgChart", label: "Organization Chart", icon: "building" },
      { key: "companyPolicy", label: "Company Policy", icon: "policy" },
      { key: "departmentPolicy", label: "Department Policy", icon: "policy" },
    ],
  },
];

export default function More({ user, onNavigate, onLogout }) {
  return (
    <div className="px-4 pb-6">
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex items-center gap-3 mb-5">
        <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-ink-900">{user.name}</p>
          <p className="text-xs text-ink-400">{user.role} · {user.branch}</p>
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.title} className="mb-5">
          <p className="text-xs font-semibold text-ink-400 uppercase mb-2">{g.title}</p>
          <div className="rounded-2xl bg-white border border-ink-50 shadow-sm divide-y divide-ink-50 overflow-hidden">
            {g.items.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="w-full flex items-center gap-3 px-4 py-3.5"
              >
                <span className="h-9 w-9 rounded-xl bg-ink-50 flex items-center justify-center text-ink-700">
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="flex-1 text-left text-sm font-medium text-ink-800">{item.label}</span>
                <Icon name="chevronRight" size={16} className="text-ink-300" />
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-100 text-rose-600 py-3.5 text-sm font-semibold"
      >
        <Icon name="logout" size={16} />
        Log Out
      </button>
    </div>
  );
}
