import { useState } from "react";
import Icon from "./Icon";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function MonthSelectorModal({ open, onClose, value, onSelect }) {
  const [year, setYear] = useState(value?.year ?? 2026);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-ink-950/40" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink-900">Select Month</h3>
          <button onClick={onClose} className="text-ink-400 p-1">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setYear((y) => y - 1)} className="p-1 text-ink-500">
            <Icon name="chevronLeft" size={18} />
          </button>
          <span className="text-base font-semibold text-ink-900">{year}</span>
          <button onClick={() => setYear((y) => y + 1)} className="p-1 text-ink-500">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((m, i) => {
            const isActive = value?.year === year && value?.monthIndex === i;
            return (
              <button
                key={m}
                onClick={() => onSelect({ year, monthIndex: i, label: m })}
                className={`rounded-xl py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-ink-900 text-white"
                    : "bg-ink-50 text-ink-600 active:bg-ink-100"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-amber-500 text-white py-3 text-sm font-semibold"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
