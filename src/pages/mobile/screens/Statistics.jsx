import Icon from "../components/Icon";
import { weeklyAttendance, office } from "../mockData";

export default function Statistics({ onOpenNetworks }) {
  const today = { total: 7.4, previous: 8.0, checkIn: "09:02", checkOut: "—" };
  const diff = (today.total - today.previous).toFixed(1);
  const undertimeHours = Math.max(0, today.previous - today.total).toFixed(1);
  const distanceM = 0.0;
  const maxBar = Math.max(...weeklyAttendance.map((d) => d.hours), 1);

  return (
    <div className="px-4 pb-6">
      {/* Daily working hours tracker */}
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-ink-400">Today's working hours</p>
            <p className="text-3xl font-bold text-ink-900 mt-1">{today.total}h</p>
          </div>
          <span
            className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
              diff >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}
          >
            {diff >= 0 ? "+" : ""}
            {diff}h vs yesterday
          </span>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Icon name="arrowRight" size={14} />
            </span>
            <div>
              <p className="text-[11px] text-ink-400">Checkin</p>
              <p className="text-sm font-semibold text-ink-900">{today.checkIn}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-ink-50 flex items-center justify-center text-ink-500">
              <Icon name="arrowRight" size={14} />
            </span>
            <div>
              <p className="text-[11px] text-ink-400">Checkout</p>
              <p className="text-sm font-semibold text-ink-900">{today.checkOut}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-600 px-3 py-1.5 text-xs font-semibold">
          <Icon name="clock" size={13} />
          {undertimeHours}h Undertime
        </div>
      </div>

      {/* Weekly chart */}
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-5 mt-4">
        <p className="text-sm font-semibold text-ink-900 mb-4">This Week</p>
        <div className="flex items-end justify-between h-28 gap-2">
          {weeklyAttendance.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-md bg-ink-900"
                  style={{ height: `${(d.hours / maxBar) * 100}%`, backgroundColor: d.hours ? undefined : "#e7edf5" }}
                />
              </div>
              <span className="text-[10px] text-ink-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GPS geofencing */}
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-5 mt-4">
        <p className="text-sm font-semibold text-ink-900 mb-3">Location Verification</p>
        <div className="rounded-xl overflow-hidden h-36 relative bg-ink-50">
          <iframe
            title="office-map"
            className="w-full h-full border-0"
            loading="lazy"
            src={`https://www.google.com/maps?q=${office.lat},${office.lng}&z=16&output=embed`}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-ink-600">
            <Icon name="pin" size={16} className="text-emerald-500" />
            <span className="text-sm font-medium">{distanceM.toFixed(1)}M away</span>
          </div>
          <span className="text-xs text-ink-400">Acceptance {office.radiusM}M</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-600 px-3 py-1.5 text-xs font-semibold">
          <Icon name="check" size={13} />
          Within office range
        </div>
      </div>

      {/* Wi-Fi verification shortcut */}
      <button
        onClick={onOpenNetworks}
        className="w-full mt-4 rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-ink-50 flex items-center justify-center text-ink-700">
            <Icon name="wifi" size={18} />
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-ink-900">Networks</p>
            <p className="text-xs text-ink-400">Manage allowed office Wi-Fi</p>
          </div>
        </div>
        <Icon name="chevronRight" size={18} className="text-ink-300" />
      </button>
    </div>
  );
}
