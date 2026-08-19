import { useEffect, useState } from "react";
import { employeesApi, permissionsApi } from "../api/endpoints";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const STATUS_LABELS = { PENDING: "Pending", APPROVED: "Approved", REJECTED: "Rejected" };
const STATUS_COLORS = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const emptyForm = { employeeId: "", date: "", fromTime: "", toTime: "", reason: "" };

export default function Permissions() {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const canManage = user?.role === "SUPER_ADMIN" || user?.role === "HR_MANAGER";

  const load = async () => {
    setLoading(true);
    const { data } = await permissionsApi.list();
    setPermissions(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    employeesApi.list().then(({ data }) => setEmployees(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await permissionsApi.create(form);
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  const handleStatus = async (id, status) => {
    await permissionsApi.updateStatus(id, status);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Permissions</h2>
          <p className="text-ink-500 text-sm">Short excuses (e.g. leaving early), separate from full-day leave</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-accent">+ New Permission</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Employee</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">From</th>
              <th className="text-left px-4 py-3 font-medium">To</th>
              <th className="text-left px-4 py-3 font-medium">Reason</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              {canManage && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan="7" className="text-center py-8 text-ink-400">Loading...</td></tr>
            ) : permissions.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-8 text-ink-400">No permissions yet</td></tr>
            ) : (
              permissions.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 font-medium text-ink-900">{p.employee?.fullName}</td>
                  <td className="px-4 py-3 text-ink-600">{new Date(p.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3 text-ink-600">{p.fromTime}</td>
                  <td className="px-4 py-3 text-ink-600">{p.toTime}</td>
                  <td className="px-4 py-3 text-ink-500 text-xs max-w-[160px] truncate">{p.reason || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${STATUS_COLORS[p.status]}`}>{STATUS_LABELS[p.status]}</span>
                  </td>
                  {canManage && (
                    <td className="px-4 py-3 text-right space-x-2">
                      {p.status === "PENDING" && (
                        <>
                          <button onClick={() => handleStatus(p.id, "APPROVED")} className="text-green-600 hover:text-green-800 text-xs">
                            Approve
                          </button>
                          <button onClick={() => handleStatus(p.id, "REJECTED")} className="text-red-500 hover:text-red-700 text-xs">
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
        <Modal title="New Permission" onClose={() => setShowForm(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            <select className="input-field" required value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
              <option value="">— Select Employee —</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
            </select>
            <input className="input-field" type="date" required
              value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-ink-500 mb-1">From</label>
                <input className="input-field" type="time" required
                  value={form.fromTime} onChange={(e) => setForm({ ...form, fromTime: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-ink-500 mb-1">To</label>
                <input className="input-field" type="time" required
                  value={form.toTime} onChange={(e) => setForm({ ...form, toTime: e.target.value })} />
              </div>
            </div>
            <textarea className="input-field" placeholder="Reason (optional)" rows="2"
              value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
            <button type="submit" className="btn-primary w-full">Submit</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
