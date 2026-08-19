import { useEffect, useState } from "react";
import { settingsApi, holidaysApi } from "../api/endpoints";

const WEEKDAY_LABELS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const emptyHoliday = { name: "", startDate: "", endDate: "", notes: "" };

export default function HrSettings() {
  const [settings, setSettings] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [holidayForm, setHolidayForm] = useState(emptyHoliday);
  const [msg, setMsg] = useState("");

  const loadSettings = async () => {
    const { data } = await settingsApi.get();
    setSettings(data);
  };

  const loadHolidays = async () => {
    setLoadingHolidays(true);
    const { data } = await holidaysApi.list();
    setHolidays(data);
    setLoadingHolidays(false);
  };

  useEffect(() => {
    loadSettings();
    loadHolidays();
  }, []);

  const toggleWeekendDay = (day) => {
    const current = settings.weekendDays || [];
    const next = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    setSettings({ ...settings, weekendDays: next });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    const { data } = await settingsApi.update({
      shiftStart: settings.shiftStart,
      shiftEnd: settings.shiftEnd,
      weekendDays: settings.weekendDays,
    });
    setSettings(data);
    setSavingSettings(false);
    setMsg("Company work settings saved ✅");
  };

  const handleCreateHoliday = async (e) => {
    e.preventDefault();
    await holidaysApi.create({
      ...holidayForm,
      endDate: holidayForm.endDate || holidayForm.startDate,
    });
    setHolidayForm(emptyHoliday);
    setMsg("Holiday saved — all active employees have been marked as paid holiday for these dates ✅");
    loadHolidays();
  };

  const handleDeleteHoliday = async (id) => {
    if (!confirm("Remove this holiday? (Attendance already marked HOLIDAY will not be reverted automatically)")) return;
    await holidaysApi.remove(id);
    loadHolidays();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ink-900">Work Settings & Holidays</h2>
        <p className="text-ink-500 text-sm">Default working hours, weekend days, and official paid holidays</p>
      </div>

      {msg && <p className="text-sm text-green-600 mb-4">{msg}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global shift + weekend days */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-1">Default Working Hours</h3>
          <p className="text-xs text-ink-500 mb-4">
            Applies to every employee unless a custom shift is set on their profile.
          </p>
          {!settings ? (
            <p className="text-ink-400 text-sm">Loading...</p>
          ) : (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Shift Start</label>
                  <input className="input-field" type="time" required
                    value={settings.shiftStart}
                    onChange={(e) => setSettings({ ...settings, shiftStart: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Shift End</label>
                  <input className="input-field" type="time" required
                    value={settings.shiftEnd}
                    onChange={(e) => setSettings({ ...settings, shiftEnd: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-ink-500 mb-2">
                  Weekend Days (excluded from working-day salary calculation)
                </label>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAY_LABELS.map((d) => (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => toggleWeekendDay(d.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        settings.weekendDays?.includes(d.value)
                          ? "bg-amber-500 border-amber-500 text-ink-950"
                          : "border-ink-200 text-ink-600 hover:bg-ink-50"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={savingSettings} className="btn-primary w-full disabled:opacity-50">
                {savingSettings ? "Saving..." : "Save Work Settings"}
              </button>
            </form>
          )}
        </div>

        {/* Official holidays */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-1">Official Paid Holidays</h3>
          <p className="text-xs text-ink-500 mb-4">
            Employees are automatically marked as paid holiday for these dates — no check-in needed, no deduction.
          </p>

          <form onSubmit={handleCreateHoliday} className="space-y-3 mb-5">
            <input className="input-field" placeholder="Holiday Name (e.g. Eid Al-Fitr) *" required
              value={holidayForm.name} onChange={(e) => setHolidayForm({ ...holidayForm, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-ink-500 mb-1">Start Date *</label>
                <input className="input-field" type="date" required
                  value={holidayForm.startDate} onChange={(e) => setHolidayForm({ ...holidayForm, startDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-ink-500 mb-1">End Date (optional, for ranges)</label>
                <input className="input-field" type="date"
                  value={holidayForm.endDate} onChange={(e) => setHolidayForm({ ...holidayForm, endDate: e.target.value })} />
              </div>
            </div>
            <input className="input-field" placeholder="Notes (optional)"
              value={holidayForm.notes} onChange={(e) => setHolidayForm({ ...holidayForm, notes: e.target.value })} />
            <button type="submit" className="btn-accent w-full">+ Add Holiday</button>
          </form>

          <div className="divide-y divide-ink-100 max-h-72 overflow-y-auto">
            {loadingHolidays ? (
              <p className="text-ink-400 text-sm py-4">Loading...</p>
            ) : holidays.length === 0 ? (
              <p className="text-ink-400 text-sm py-4">No holidays added yet</p>
            ) : (
              holidays.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm font-medium text-ink-900">{h.name}</p>
                    <p className="text-xs text-ink-500">
                      {new Date(h.startDate).toLocaleDateString("en-GB")}
                      {h.endDate && h.endDate !== h.startDate && ` — ${new Date(h.endDate).toLocaleDateString("en-GB")}`}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteHoliday(h.id)} className="text-red-400 hover:text-red-600 text-xs">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
