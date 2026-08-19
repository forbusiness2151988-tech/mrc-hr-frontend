import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { dailyReport } from "../mockData";
import BottomSheet from "../components/BottomSheet";

const ROLES = ["Business Partner", "Senior Sales"];

export default function DailyReport() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState([]);

  const toggleRole = (r) =>
    setRoleFilter((f) => (f.includes(r) ? f.filter((x) => x !== r) : [...f, r]));

  const rows = useMemo(
    () =>
      dailyReport.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) &&
          (roleFilter.length === 0 || roleFilter.includes(r.role))
      ),
    [query, roleFilter]
  );

  return (
    <div className="px-4 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-white border border-ink-100 px-3.5 py-2.5">
          <Icon name="search" size={16} className="text-ink-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by candidate"
            className="flex-1 text-sm outline-none placeholder:text-ink-300"
          />
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="h-11 w-11 rounded-xl bg-white border border-ink-100 flex items-center justify-center text-ink-500 relative"
        >
          <Icon name="filter" size={17} />
          {roleFilter.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500" />
          )}
        </button>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{r.name}</p>
                <p className="text-[11px] text-ink-400">{r.role}</p>
              </div>
              <div className="text-right text-xs text-ink-400">
                <p>{r.checkIn} → {r.checkOut}</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-ink-50 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${r.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <BottomSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="Filter by Role"
        footer={
          <button
            onClick={() => setFilterOpen(false)}
            className="w-full rounded-xl bg-amber-500 text-white py-3 text-sm font-semibold"
          >
            Apply
          </button>
        }
      >
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => toggleRole(r)}
              className={`rounded-full px-3.5 py-2 text-sm font-medium border ${
                roleFilter.includes(r) ? "bg-ink-900 text-white border-ink-900" : "border-ink-200 text-ink-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
