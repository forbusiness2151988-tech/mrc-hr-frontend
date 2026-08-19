import { useState } from "react";

export default function NewRequestForm({ category, item, onCancel, onSubmit }) {
  const [form, setForm] = useState({ from: "", to: "", reason: "" });

  return (
    <div className="px-4 pb-6">
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-5">
        <p className="text-xs font-semibold text-ink-400 uppercase">{category}</p>
        <p className="text-lg font-semibold text-ink-900 mt-1">{item.label}</p>

        <div className="mt-5 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-ink-500">From</label>
              <input
                type="date"
                value={form.from}
                onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-700"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-ink-500">To</label>
              <input
                type="date"
                value={form.to}
                onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-500">Reason / Notes</label>
            <textarea
              rows={4}
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="Add details for your manager..."
              className="mt-1 w-full rounded-xl border border-ink-200 px-3 py-2.5 text-sm text-ink-700 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl border border-ink-200 text-ink-600 py-3 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(form)}
          className="flex-1 rounded-xl bg-amber-500 text-white py-3 text-sm font-semibold"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}
