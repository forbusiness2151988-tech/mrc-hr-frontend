import { useState } from "react";
import Icon from "../components/Icon";
import { managerRequests as initial } from "../mockData";

export default function ManagerRequests() {
  const [requests, setRequests] = useState(initial);
  const [tab, setTab] = useState("all");

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const visible = tab === "pending" ? requests.filter((r) => r.status === "Pending") : requests;

  const act = (id, status) =>
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="px-4 pb-6">
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setTab("all")}
          className={`rounded-2xl p-4 text-left ${tab === "all" ? "bg-ink-900 text-white" : "bg-white border border-ink-50"}`}
        >
          <p className={`text-xs ${tab === "all" ? "text-ink-200" : "text-ink-400"}`}>All Requests</p>
          <p className="text-2xl font-bold mt-1">{requests.length}</p>
        </button>
        <button
          onClick={() => setTab("pending")}
          className={`rounded-2xl p-4 text-left ${tab === "pending" ? "bg-amber-500 text-white" : "bg-white border border-ink-50"}`}
        >
          <p className={`text-xs ${tab === "pending" ? "text-amber-50" : "text-ink-400"}`}>Pending Requests</p>
          <p className="text-2xl font-bold mt-1">{pendingCount}</p>
        </button>
      </div>

      <div className="space-y-3">
        {visible.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.employee} className="h-11 w-11 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-900">{r.employee}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-medium rounded-full bg-ink-50 text-ink-500 px-2 py-0.5">
                    {r.tag}
                  </span>
                  <span className="text-[11px] text-ink-400">{r.type}</span>
                </div>
              </div>
              <span className="text-[11px] text-ink-300">{r.submittedAt}</span>
            </div>
            <p className="text-xs text-ink-500 mt-3">{r.reason}</p>

            {r.status === "Pending" ? (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => act(r.id, "Approved")}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 text-white py-2.5 text-sm font-semibold"
                >
                  <Icon name="check" size={16} /> Approve
                </button>
                <button
                  onClick={() => act(r.id, "Declined")}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 text-rose-600 py-2.5 text-sm font-semibold"
                >
                  <Icon name="close" size={16} /> Reject
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
