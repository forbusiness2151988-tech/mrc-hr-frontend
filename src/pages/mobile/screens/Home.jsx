import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import ArcGauge, { FingerprintPrompt } from "../components/ArcGauge";

function formatElapsed(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  return `${h}:${m}`;
}

export default function Home({ shift, onStartShift }) {
  const [tick, setTick] = useState(shift.elapsedSeconds);

  useEffect(() => {
    if (shift.status !== "working") return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [shift.status]);

  const targetSeconds = shift.shiftTargetHours * 3600;
  const progress = shift.status === "working" ? tick / targetSeconds : 0;

  return (
    <div className="px-4 pb-6">
      {/* Date selector pill */}
      <div className="flex justify-center mb-4">
        <button className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-sm">
          <Icon name="calendar" size={16} className="text-ink-400" />
          Today 15 Aug 2026
          <Icon name="chevronDown" size={14} className="text-ink-300" />
        </button>
      </div>

      {/* Clock-in arc gauge card */}
      <div className="rounded-3xl bg-white border border-ink-50 shadow-sm px-6 pt-8 pb-6 flex flex-col items-center">
        <ArcGauge
          progress={progress}
          label={shift.status === "working" ? formatElapsed(tick) : "00:00"}
          sublabel={shift.status === "working" ? "Elapsed today" : "Start your day"}
        />
        {shift.status === "not_started" ? (
          <FingerprintPrompt onCheckIn={onStartShift} />
        ) : (
          <div className="mt-2 flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-600 px-4 py-2 text-xs font-semibold">
            <Icon name="check" size={14} />
            Checked in at {shift.checkIn || "09:02"}
          </div>
        )}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-2xl bg-ink-900 text-white p-4">
          <p className="text-xs text-ink-200">This month</p>
          <p className="text-xl font-bold mt-1">168.5h</p>
          <p className="text-[11px] text-ink-300 mt-1">Worked hours</p>
        </div>
        <div className="rounded-2xl bg-white border border-ink-50 p-4">
          <p className="text-xs text-ink-400">Vacation balance</p>
          <p className="text-xl font-bold mt-1 text-ink-900">15 days</p>
          <p className="text-[11px] text-ink-400 mt-1">Normal quota left</p>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-ink-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: "sun", label: "Vacation" },
            { icon: "clock", label: "Excuse" },
            { icon: "coins", label: "Overtime" },
            { icon: "wallet", label: "Advance" },
          ].map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2">
              <span className="h-12 w-12 rounded-2xl bg-ink-50 flex items-center justify-center text-ink-700">
                <Icon name={a.icon} size={20} />
              </span>
              <span className="text-[11px] text-ink-500 font-medium">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
