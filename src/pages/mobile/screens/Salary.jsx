import { useState } from "react";
import Icon from "../components/Icon";
import { salary } from "../mockData";

function Collapsible({ title, rows, tone = "ink" }) {
  const [open, setOpen] = useState(false);
  const total = rows.reduce((s, r) => s + r.amount, 0);
  const toneClass = tone === "rose" ? "text-rose-600" : tone === "emerald" ? "text-emerald-600" : "text-ink-900";

  return (
    <div className="rounded-2xl bg-white border border-ink-50 shadow-sm overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-4">
        <div className="text-left">
          <p className="text-sm font-semibold text-ink-900">{title}</p>
          <p className={`text-xs mt-0.5 font-medium ${toneClass}`}>
            {tone === "rose" ? "-" : "+"}
            {total.toLocaleString()} EGP
          </p>
        </div>
        <span className="text-xs font-medium text-ink-400 flex items-center gap-1">
          {open ? "Hide" : "Show"}
          <Icon name="chevronDown" size={14} className={open ? "rotate-180 transition" : "transition"} />
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2 border-t border-ink-50 pt-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-ink-500">{r.label}</span>
              <span className="font-medium text-ink-800">{r.amount.toLocaleString()} EGP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Salary() {
  return (
    <div className="px-4 pb-6">
      <div className="flex justify-center mb-4">
        <button className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700">
          <Icon name="calendar" size={15} className="text-ink-400" />
          Current Month {salary.month}
          <Icon name="chevronDown" size={13} className="text-ink-300" />
        </button>
      </div>

      <div className="rounded-3xl bg-ink-900 text-white p-6 text-center">
        <p className="text-xs text-ink-300">Net Payout</p>
        <p className="text-3xl font-bold mt-1">{salary.netSalary.toLocaleString()} EGP</p>
        <p className="text-[11px] text-ink-300 mt-2">via {salary.disbursementMethod}</p>
      </div>

      {/* Basic info */}
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-5 mt-4 space-y-3">
        <p className="text-sm font-semibold text-ink-900 mb-1">Basic Information</p>
        {[
          ["Bank Name", salary.bankName],
          ["Account Number", salary.accountNumber],
          ["Current Salary", `${salary.currentSalary.toLocaleString()} EGP`],
          ["Net Salary", `${salary.netSalary.toLocaleString()} EGP`],
          ["Disbursement Method", salary.disbursementMethod],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <span className="text-ink-400">{label}</span>
            <span className="font-medium text-ink-800 text-right">{value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 mt-4">
        <Collapsible title="Earnings" rows={salary.earnings} tone="emerald" />
        <Collapsible title="Deductions" rows={salary.deductions} tone="rose" />
        <Collapsible title="Adjustments" rows={salary.adjustments} tone="emerald" />
      </div>
    </div>
  );
}
