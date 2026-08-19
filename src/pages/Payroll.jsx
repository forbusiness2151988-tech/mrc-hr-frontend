import { useEffect, useState } from "react";
import { employeesApi, payrollApi } from "../api/endpoints";
import Modal from "../components/Modal";
import { formatCurrency } from "../utils/currency";

const STATUS_LABELS = { DRAFT: "Draft", APPROVED: "Approved", PAID: "Paid" };
const STATUS_COLORS = {
  DRAFT: "bg-ink-100 text-ink-600",
  APPROVED: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
};

const currentMonth = new Date().toISOString().slice(0, 7);

const emptyForm = {
  employeeId: "", month: currentMonth, baseSalary: "", bonus: "",
  allowanceItems: [], deductionItems: [], notes: "",
};

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState(currentMonth);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async (month) => {
    setLoading(true);
    const { data } = await payrollApi.list({ month: month ?? monthFilter });
    setPayrolls(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    employeesApi.list().then(({ data }) => setEmployees(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (month) => {
    setMonthFilter(month);
    load(month);
  };

  const handleGenerateMonth = async () => {
    const { data } = await payrollApi.generateMonth(monthFilter);
    alert(`${data.created} draft payroll records created for ${data.totalActiveEmployees} active employees`);
    load();
  };

  const addLineItem = (key) => {
    setForm({ ...form, [key]: [...form[key], { label: "", amount: "" }] });
  };
  const updateLineItem = (key, idx, field, value) => {
    const items = [...form[key]];
    items[idx] = { ...items[idx], [field]: value };
    setForm({ ...form, [key]: items });
  };
  const removeLineItem = (key, idx) => {
    setForm({ ...form, [key]: form[key].filter((_, i) => i !== idx) });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await payrollApi.create({
      ...form,
      baseSalary: Number(form.baseSalary),
      bonus: form.bonus ? Number(form.bonus) : 0,
      allowanceItems: form.allowanceItems.filter((i) => i.label).map((i) => ({ label: i.label, amount: Number(i.amount || 0) })),
      deductionItems: form.deductionItems.filter((i) => i.label).map((i) => ({ label: i.label, amount: Number(i.amount || 0) })),
    });
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  const handleStatusChange = async (id, status) => {
    await payrollApi.update(id, { status });
    load();
  };

  const handleRecalculate = async (id) => {
    await payrollApi.recalculate(id);
    load();
  };

  const totalNet = payrolls.reduce((sum, p) => sum + Number(p.netSalary), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Payroll</h2>
          <p className="text-ink-500 text-sm">Salaries, allowances, bonuses and deductions per month</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleGenerateMonth} className="btn-primary">Generate Month</button>
          <button onClick={() => setShowForm(true)} className="btn-accent">+ Add Payroll Record</button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-ink-600">Month:</label>
        <input
          type="month"
          className="input-field max-w-[180px]"
          value={monthFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
        />
        <span className="text-sm text-ink-500 ml-auto">
          Total Net: <span className="font-semibold text-amber-600">{formatCurrency(totalNet)}</span>
        </span>
      </div>

      <div className="card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-ink-50 text-ink-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Employee</th>
              <th className="text-left px-4 py-3 font-medium">Base Salary</th>
              <th className="text-left px-4 py-3 font-medium">Working Days</th>
              <th className="text-left px-4 py-3 font-medium">Daily Rate</th>
              <th className="text-left px-4 py-3 font-medium">Allowances</th>
              <th className="text-left px-4 py-3 font-medium">Bonus</th>
              <th className="text-left px-4 py-3 font-medium">Overtime</th>
              <th className="text-left px-4 py-3 font-medium">Deductions</th>
              <th className="text-left px-4 py-3 font-medium">Net Salary</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan="11" className="text-center py-8 text-ink-400">Loading...</td></tr>
            ) : payrolls.length === 0 ? (
              <tr><td colSpan="11" className="text-center py-8 text-ink-400">
                No payroll records for this month — click "Generate Month" to create drafts for all active employees.
              </td></tr>
            ) : (
              payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 font-medium text-ink-900">{p.employee?.fullName}</td>
                  <td className="px-4 py-3 text-ink-600">{formatCurrency(p.baseSalary)}</td>
                  <td className="px-4 py-3 text-ink-500 text-xs">{p.workingDays ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-500 text-xs">{p.dailyRate ? formatCurrency(p.dailyRate) : "—"}</td>
                  <td className="px-4 py-3 text-green-600">+{formatCurrency(p.allowances)}</td>
                  <td className="px-4 py-3 text-green-600">+{formatCurrency(p.bonus)}</td>
                  <td className="px-4 py-3 text-green-600">
                    +{formatCurrency(p.overtimePay)}
                    {Number(p.overtimeHours) > 0 && <span className="text-ink-400 text-xs"> ({Number(p.overtimeHours)}h)</span>}
                  </td>
                  <td className="px-4 py-3 text-red-600">
                    -{formatCurrency(p.deductions)}
                    {Number(p.absenceDays) > 0 && <span className="text-ink-400 text-xs"> ({Number(p.absenceDays)}d absent)</span>}
                  </td>
                  <td className="px-4 py-3 font-semibold text-amber-600">{formatCurrency(p.netSalary)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      className={`badge border-0 cursor-pointer ${STATUS_COLORS[p.status]}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.status === "DRAFT" && (
                      <button onClick={() => handleRecalculate(p.id)} className="text-ink-500 hover:text-ink-800 text-xs">
                        Recalculate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal title="Add Payroll Record" onClose={() => setShowForm(false)} wide>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <select className="input-field" required value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
                <option value="">— Select Employee —</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
              </select>
              <input className="input-field" type="month" required
                value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
              <input className="input-field" type="number" placeholder="Base Salary *" required
                value={form.baseSalary} onChange={(e) => setForm({ ...form, baseSalary: e.target.value })} />
              <input className="input-field" type="number" placeholder="Bonus"
                value={form.bonus} onChange={(e) => setForm({ ...form, bonus: e.target.value })} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-ink-700">Allowances</label>
                <button type="button" onClick={() => addLineItem("allowanceItems")} className="text-xs text-ink-600 hover:underline">
                  + Add allowance
                </button>
              </div>
              {form.allowanceItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input className="input-field" placeholder="Label (e.g. Transport)"
                    value={item.label} onChange={(e) => updateLineItem("allowanceItems", idx, "label", e.target.value)} />
                  <input className="input-field w-32" type="number" placeholder="Amount"
                    value={item.amount} onChange={(e) => updateLineItem("allowanceItems", idx, "amount", e.target.value)} />
                  <button type="button" onClick={() => removeLineItem("allowanceItems", idx)} className="text-red-400 px-2">×</button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-ink-700">Deductions</label>
                <button type="button" onClick={() => addLineItem("deductionItems")} className="text-xs text-ink-600 hover:underline">
                  + Add deduction
                </button>
              </div>
              {form.deductionItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input className="input-field" placeholder="Label (e.g. Late penalty)"
                    value={item.label} onChange={(e) => updateLineItem("deductionItems", idx, "label", e.target.value)} />
                  <input className="input-field w-32" type="number" placeholder="Amount"
                    value={item.amount} onChange={(e) => updateLineItem("deductionItems", idx, "amount", e.target.value)} />
                  <button type="button" onClick={() => removeLineItem("deductionItems", idx)} className="text-red-400 px-2">×</button>
                </div>
              ))}
            </div>

            <textarea className="input-field" placeholder="Notes (optional)" rows="2"
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

            <button type="submit" className="btn-primary w-full">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
