import Icon from "../components/Icon";

const items = [
  { id: 1, title: "Your leave request was approved", time: "10m ago", icon: "check" },
  { id: 2, title: "Eid Al-Fitr Holiday announced", time: "2h ago", icon: "megaphone" },
  { id: 3, title: "Payslip for August is ready", time: "1d ago", icon: "wallet" },
  { id: 4, title: "Mona Khaled requested vacation", time: "2d ago", icon: "request" },
];

export default function Notifications() {
  return (
    <div className="px-4 pb-6">
      <div className="space-y-3">
        {items.map((n) => (
          <div key={n.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Icon name={n.icon} size={17} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-800">{n.title}</p>
              <p className="text-[11px] text-ink-300 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
