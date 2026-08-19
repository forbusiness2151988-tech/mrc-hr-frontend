import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import StatusBadge from "../components/StatusBadge";
import MonthSelectorModal from "../components/MonthSelectorModal";
import FilterSheet from "../components/FilterSheet";
import { EmptyState, FAB } from "../components/EmptyState";
import { myRequests } from "../mockData";

const STATUS_TABS = ["Pending", "Approved", "Declined", "Canceled"];

export default function MyRequests({ onNewRequest }) {
  const [status, setStatus] = useState("Pending");
  const [monthOpen, setMonthOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [month, setMonth] = useState({ year: 2026, monthIndex: 7, label: "Aug" });
  const [filters, setFilters] = useState(null);

  const filtered = useMemo(() => {
    let rows = myRequests.filter((r) => r.status === status);
    if (filters?.types?.length) {
      rows = rows.filter((r) => filters.types.includes(r.category));
    }
    if (filters?.from) rows = rows.filter((r) => r.from >= filters.from);
    if (filters?.to) rows = rows.filter((r) => r.to <= filters.to);
    rows = [...rows].sort((a, b) =>
      filters?.sort === "oldest"
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt)
    );
    return rows;
  }, [status, filters]);

  return (
    <div className="px-4 pb-24">
      {/* Month + filter row */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthOpen(true)}
          className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-sm font-medium text-ink-700"
        >
          <Icon name="calendar" size={15} className="text-ink-400" />
          {month.label} {month.year}
          <Icon name="chevronDown" size={13} className="text-ink-300" />
        </button>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-sm font-medium text-ink-700"
        >
          <Icon name="filter" size={15} className="text-ink-400" />
          Filter
          {filters && (filters.types.length || filters.from || filters.to) ? (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          ) : null}
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
              status === s ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState subtitle={`No ${status.toLowerCase()} requests for ${month.label} ${month.year}.`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{r.type}</p>
                  <p className="text-xs text-ink-400 mt-0.5">
                    {r.from} {r.to !== r.from ? `→ ${r.to}` : ""}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-xs text-ink-500 mt-2">{r.reason}</p>
              <p className="text-[11px] text-ink-300 mt-2">Submitted {r.createdAt}</p>
            </div>
          ))}
        </div>
      )}

      <FAB onClick={onNewRequest} />

      <MonthSelectorModal
        open={monthOpen}
        onClose={() => setMonthOpen(false)}
        value={month}
        onSelect={(m) => {
          setMonth(m);
          setMonthOpen(false);
        }}
      />
      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setFilters} />
    </div>
  );
}
