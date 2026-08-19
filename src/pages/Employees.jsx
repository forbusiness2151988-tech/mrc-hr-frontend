import { useEffect, useState } from "react";
import { employeesApi, officesApi } from "../api/endpoints";
import Modal from "../components/Modal";
import { formatCurrency } from "../utils/currency";

const CONTRACT_LABELS = { FULL_TIME: "Full-time", PART_TIME: "Part-time", CONTRACTOR: "Contractor", INTERN: "Intern" };
const STATUS_LABELS = { ACTIVE: "Active", ON_LEAVE: "On Leave", SUSPENDED: "Suspended", TERMINATED: "Terminated" };
const STATUS_COLORS = {
  ACTIVE: "bg-green-100 text-green-700",
  ON_LEAVE: "bg-amber-100 text-amber-700",
  SUSPENDED: "bg-red-100 text-red-700",
  TERMINATED: "bg-ink-200 text-ink-600",
};

const emptyForm = {
  fullName: "", employeeCode: "", jobTitle: "", department: "", joiningDate: "",
  baseSalary: "", contractType: "FULL_TIME", officeId: "",
  shiftStart: "", shiftEnd: "",
  phone: "", personalEmail: "", address: "", nationalId: "",
  bankAccountNumber: "", emergencyContactName: "", emergencyContactPhone: "",
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    const { data } = await employeesApi.list();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    officesApi.list().then(({ data }) => setOffices(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await employeesApi.create({
      ...form,
      baseSalary: Number(form.baseSalary),
      officeId: form.officeId || undefined,
    });
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  const handleStatusChange = async (id, status) => {
    await employeesApi.update(id, { status });
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    await employeesApi.remove(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ink-900">Employees</h2>
        <button onClick={() => setShowForm(true)} className="btn-accent">+ Create Employee</button>
      </div>

      <div className="card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-ink-50 text-ink-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Code</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Job Title</th>
              <th className="text-left px-4 py-3 font-medium">Department</th>
              <th className="text-left px-4 py-3 font-medium">Office</th>
              <th className="text-left px-4 py-3 font-medium">Contract</th>
              <th className="text-left px-4 py-3 font-medium">Base Salary</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan="9" className="text-center py-8 text-ink-400">Loading...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan="9" className="text-center py-8 text-ink-400">No employees yet</td></tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 text-ink-500 text-xs">{emp.employeeCode || "—"}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{emp.fullName}</td>
                  <td className="px-4 py-3 text-ink-600">{emp.jobTitle}</td>
                  <td className="px-4 py-3 text-ink-600">{emp.department || "—"}</td>
                  <td className="px-4 py-3 text-ink-600">{emp.office?.name || "—"}</td>
                  <td className="px-4 py-3 text-ink-600">{CONTRACT_LABELS[emp.contractType]}</td>
                  <td className="px-4 py-3 text-amber-600 font-semibold">
                    {formatCurrency(emp.baseSalary)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={emp.status}
                      onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                      className={`badge border-0 cursor-pointer ${STATUS_COLORS[emp.status]}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(emp.id)} className="text-red-500 hover:text-red-700 text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal title="Create Employee" onClose={() => setShowForm(false)} wide>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input className="input-field" placeholder="Full Name *" required
                value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <input className="input-field" placeholder="Employee Code"
                value={form.employeeCode} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} />
              <input className="input-field" placeholder="Job Title *" required
                value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} />
              <input className="input-field" placeholder="Department"
                value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
              <div>
                <label className="block text-xs text-ink-500 mb-1">Joining Date *</label>
                <input className="input-field" type="date" required
                  value={form.joiningDate} onChange={(e) => setForm({ ...form, joiningDate: e.target.value })} />
              </div>
              <input className="input-field" type="number" placeholder="Base Salary *" required
                value={form.baseSalary} onChange={(e) => setForm({ ...form, baseSalary: e.target.value })} />
              <select className="input-field" value={form.contractType}
                onChange={(e) => setForm({ ...form, contractType: e.target.value })}>
                {Object.entries(CONTRACT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select className="input-field" value={form.officeId}
                onChange={(e) => setForm({ ...form, officeId: e.target.value })}>
                <option value="">— Assign Office (for attendance) —</option>
                {offices.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
              <div>
                <label className="block text-xs text-ink-500 mb-1">Shift Start (optional — overrides company default)</label>
                <input className="input-field" type="time"
                  value={form.shiftStart} onChange={(e) => setForm({ ...form, shiftStart: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-ink-500 mb-1">Shift End (optional — overrides company default)</label>
                <input className="input-field" type="time"
                  value={form.shiftEnd} onChange={(e) => setForm({ ...form, shiftEnd: e.target.value })} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="text-sm text-ink-600 border border-ink-200 rounded-lg px-4 py-2 hover:bg-ink-50 w-full"
            >
              Contact & Personal Details {showMore ? "▲" : "▼"}
            </button>

            {showMore && (
              <div className="grid grid-cols-2 gap-3 border-t border-ink-100 pt-3">
                <input className="input-field" placeholder="Phone"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="input-field" placeholder="Personal Email"
                  value={form.personalEmail} onChange={(e) => setForm({ ...form, personalEmail: e.target.value })} />
                <input className="input-field col-span-2" placeholder="Address"
                  value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <input className="input-field" placeholder="National ID"
                  value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} />
                <input className="input-field" placeholder="Bank Account Number"
                  value={form.bankAccountNumber} onChange={(e) => setForm({ ...form, bankAccountNumber: e.target.value })} />
                <input className="input-field" placeholder="Emergency Contact Name"
                  value={form.emergencyContactName} onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })} />
                <input className="input-field" placeholder="Emergency Contact Phone"
                  value={form.emergencyContactPhone} onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })} />
              </div>
            )}

            <button type="submit" className="btn-primary w-full">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
