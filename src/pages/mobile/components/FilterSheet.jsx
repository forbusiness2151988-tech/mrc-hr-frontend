import { useState } from "react";
import BottomSheet from "./BottomSheet";

const TYPES = ["Attendance", "Financial", "Vacation"];
const SORTS = [
  { key: "newest", label: "Creation Date (Newest)" },
  { key: "oldest", label: "Creation Date (Oldest)" },
];

const emptyFilters = { from: "", to: "", types: [], sort: "newest" };

export default function FilterSheet({ open, onClose, onApply }) {
  const [filters, setFilters] = useState(emptyFilters);

  const toggleType = (t) =>
    setFilters((f) => ({
      ...f,
      types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t],
    }));

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Filter Requests"
      footer={
        <div className="flex gap-3">
          <button
            onClick={() => setFilters(emptyFilters)}
            className="flex-1 rounded-xl border border-ink-200 text-ink-600 py-3 text-sm font-semibold"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply(filters);
              onClose();
            }}
            className="flex-1 rounded-xl bg-amber-500 text-white py-3 text-sm font-semibold"
          >
            Apply Filters
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase mb-2">Date Range</p>
          <div className="flex gap-3">
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
              className="flex-1 rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-700"
            />
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
              className="flex-1 rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-700"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase mb-2">Request Type</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium border ${
                  filters.types.includes(t)
                    ? "bg-ink-900 text-white border-ink-900"
                    : "border-ink-200 text-ink-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ink-400 uppercase mb-2">Sort By</p>
          <div className="space-y-2">
            {SORTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setFilters((f) => ({ ...f, sort: s.key }))}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium ${
                  filters.sort === s.key ? "bg-ink-50 text-ink-900" : "text-ink-500"
                }`}
              >
                {s.label}
                <span
                  className={`h-4 w-4 rounded-full border-2 ${
                    filters.sort === s.key ? "border-amber-500 bg-amber-500" : "border-ink-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
