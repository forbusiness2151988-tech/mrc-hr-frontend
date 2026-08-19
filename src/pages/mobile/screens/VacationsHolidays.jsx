import Icon from "../components/Icon";
import StatusBadge from "../components/StatusBadge";
import { vacationBalances as vb, holidays } from "../mockData";

function QuotaCard({ label, used, total, color }) {
  const pct = Math.min(100, (used / total) * 100);
  return (
    <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
      <p className="text-xs text-ink-400">{label}</p>
      <p className="text-lg font-bold text-ink-900 mt-1">
        {total - used} <span className="text-xs font-normal text-ink-400">days left</span>
      </p>
      <div className="mt-2 h-1.5 rounded-full bg-ink-50 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <p className="text-[11px] text-ink-300 mt-1.5">{used} of {total} used</p>
    </div>
  );
}

export default function VacationsHolidays() {
  const nextHoliday = holidays.find((h) => h.status === "Pending");

  return (
    <div className="px-4 pb-6">
      {nextHoliday && (
        <div className="rounded-2xl bg-ink-900 text-white p-4 flex items-center gap-3 mb-4">
          <span className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon name="gift" size={19} />
          </span>
          <div>
            <p className="text-xs text-ink-300">Upcoming Official Holiday</p>
            <p className="text-sm font-semibold mt-0.5">{nextHoliday.name} · {nextHoliday.date}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <QuotaCard label="Normal Vacation" used={vb.normal.used} total={vb.normal.total} color="#d99730" />
        <QuotaCard label="Unpaid Vacation" used={vb.unpaid.used} total={vb.unpaid.total} color="#5c7aa3" />
        <QuotaCard label="Urgent Vacation" used={vb.urgent.used} total={vb.urgent.total} color="#e15b64" />
        <QuotaCard
          label="Permission Hours"
          used={vb.permissionHours.used}
          total={vb.permissionHours.total}
          color="#2f9e6f"
        />
      </div>

      <p className="text-sm font-semibold text-ink-900 mt-6 mb-3">Official Holidays</p>
      <div className="space-y-3">
        {holidays.map((h) => (
          <div key={h.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink-900">{h.name}</p>
              <p className="text-xs text-ink-400 mt-0.5">{h.date}</p>
            </div>
            <StatusBadge status={h.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
