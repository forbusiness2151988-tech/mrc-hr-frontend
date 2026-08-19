import { useEffect, useState } from "react";
import { employeesApi, leavesApi } from "../api/endpoints";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const TYPE_LABELS = { SICK: "Sick", ANNUAL: "Annual", EXCUSE: "Excuse", UNPAID: "Unpaid" };
const STATUS_LABELS = { PENDING: "Pending", APPROVED: "Approved", REJECTED: "Rejected" };
const STATUS_COLORS = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const emptyForm = { employeeId: "", type: "ANNUAL", startDate: "", endDate: "", reason: "" };

export default function Leaves() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "HR_MANAGER";

  const load = async () => {
    setLoading(true);
    const { data } = await leavesApi.list();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    employeesApi.list().then(({ data }) => setEmployees(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await leavesApi.create(form);
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  const handleStatus = async (id, status) => {
    await leavesApi.updateStatus(id, status);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ink-900">Leave Requests</h2>
        <button onClick={() => setShowForm(true)} className="btn-accent">+ New Leave Request</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Employee</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-left px-4 py-3 font-medium">From</th>
              <th className="text-left px-4 py-3 font-medium">To</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              {canManage && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8 text-ink-400">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-ink-400">No requests yet</td></tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 font-medium text-ink-900">{r.employee?.fullName}</td>
                  <td className="px-4 py-3 text-ink-600">{TYPE_LABELS[r.type]}</td>
                  <td className="px-4 py-3 text-ink-600">{new Date(r.startDate).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3 text-ink-600">{new Date(r.endDate).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${STATUS_COLORS[r.status]}`}>{STATUS_LABELS[r.status]}</span>
                  </td>
                  {canManage && (
                    <td className="px-4 py-3 text-right space-x-2">
                      {r.status === "PENDING" && (
                        <>
                          <button onClick={() => handleStatus(r.id, "APPROVED")} className="text-green-600 hover:text-green-800 text-xs">
                            Approve
                          </button>
                          <button onClick={() => handleStatus(r.id, "REJECTED")} className="text-red-500 hover:text-red-700 text-xs">
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal title="New Leave Request" onClose={() => setShowForm(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            <select className="input-field" required value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
              <option value="">— Select Employee —</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
            </select>
            <select className="input-field" value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <label className="block text-xs text-ink-500 -mb-2">From Date</label>
            <input className="input-field" type="date" required
              value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <label className="block text-xs text-ink-500 -mb-2">To Date</label>
            <input className="input-field" type="date" required
              value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            <textarea className="input-field" placeholder="Reason (optional)" rows="2"
              value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
            <button type="submit" className="btn-primary w-full">Submit Request</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
