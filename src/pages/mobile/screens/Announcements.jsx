import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { announcements } from "../mockData";

const CHIPS = ["All", "Department", "Location", "Company"];

export default function Announcements() {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState("All");

  const totalSent = announcements.reduce((s, a) => s + a.notificationsSent, 0);
  const deptSent = announcements
    .filter((a) => a.scope === "Department")
    .reduce((s, a) => s + a.notificationsSent, 0);

  const rows = useMemo(
    () =>
      announcements.filter(
        (a) =>
          (chip === "All" || a.scope === chip) &&
          (a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.body.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, chip]
  );

  return (
    <div className="px-4 pb-6">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
          <p className="text-xs text-ink-400">Notifications Sent</p>
          <p className="text-xl font-bold text-ink-900 mt-1">{totalSent}</p>
        </div>
        <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
          <p className="text-xs text-ink-400">Department Notifications</p>
          <p className="text-xl font-bold text-ink-900 mt-1">{deptSent}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-white border border-ink-100 px-3.5 py-2.5 mb-3">
        <Icon name="search" size={16} className="text-ink-300" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search announcements"
          className="flex-1 text-sm outline-none placeholder:text-ink-300"
        />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium ${
              chip === c ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((a) => (
          <div key={a.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
            <div className="flex items-start gap-3">
              <span className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Icon name="megaphone" size={17} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{a.title}</p>
                <p className="text-xs text-ink-500 mt-1">{a.body}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] rounded-full bg-ink-50 text-ink-500 px-2 py-0.5 font-medium">
                    {a.scope}
                  </span>
                  <span className="text-[11px] text-ink-300">{a.sentAt}</span>
                  <span className="text-[11px] text-ink-300">{a.notificationsSent} sent</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
