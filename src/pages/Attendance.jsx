import { useEffect, useState } from "react";
import { employeesApi, attendanceApi } from "../api/endpoints";
import Modal from "../components/Modal";

const STATUS_LABELS = {
  PRESENT: "Present", ABSENT: "Absent", LATE: "Late", ON_LEAVE: "On Leave",
  HOLIDAY: "Holiday", PAID_LEAVE: "Paid Leave",
};
const STATUS_COLORS = {
  PRESENT: "bg-green-100 text-green-700",
  ABSENT: "bg-red-100 text-red-700",
  LATE: "bg-amber-100 text-amber-700",
  ON_LEAVE: "bg-ink-100 text-ink-600",
  HOLIDAY: "bg-blue-100 text-blue-700",
  PAID_LEAVE: "bg-purple-100 text-purple-700",
};

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [locating, setLocating] = useState(false);
  const [showPaidLeaveForm, setShowPaidLeaveForm] = useState(false);
  const [paidLeaveForm, setPaidLeaveForm] = useState({ employeeId: "", date: "", reason: "" });

  const loadRecords = async () => {
    setLoading(true);
    const { data } = await attendanceApi.list();
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    employeesApi.list().then(({ data }) => setEmployees(data));
    loadRecords();
  }, []);

  const handleCheckIn = async () => {
    if (!selectedEmployee) return setMsg("Please select an employee first");
    setLocating(true);
    setMsg("Getting your location...");
    try {
      const coords = await getCurrentPosition();
      const { data } = await attendanceApi.checkIn(selectedEmployee, coords);
      if (data.geofence) {
        setMsg(
          data.geofence.inRange
            ? `Check-in recorded ✅ (${Math.round(data.geofence.distanceM)}m from ${data.geofence.officeName})`
            : `⚠️ Check-in recorded, but you are ${Math.round(data.geofence.distanceM)}m away from ${data.geofence.officeName} (allowed: ${data.geofence.radiusMeters}m)`
        );
      } else {
        setMsg("Check-in recorded ✅ (no office assigned — location not verified)");
      }
    } catch (err) {
      // Fall back to a location-less check-in if the browser/device denies GPS access
      if (err.code !== undefined) {
        await attendanceApi.checkIn(selectedEmployee, {});
        setMsg("Check-in recorded (location unavailable) ⚠️");
      } else {
        setMsg(err.response?.data?.error || "An error occurred");
      }
    } finally {
      setLocating(false);
      loadRecords();
    }
  };

  const handleCheckOut = async () => {
    if (!selectedEmployee) return setMsg("Please select an employee first");
    try {
      const coords = await getCurrentPosition().catch(() => ({}));
      await attendanceApi.checkOut(selectedEmployee, coords);
      setMsg("Check-out recorded ✅");
    } catch (err) {
      setMsg(err.response?.data?.error || "An error occurred");
    }
    loadRecords();
  };

  const handleMarkPaidLeave = async (e) => {
    e.preventDefault();
    if (!paidLeaveForm.employeeId || !paidLeaveForm.date) return;
    await attendanceApi.markPaidLeave(paidLeaveForm);
    setPaidLeaveForm({ employeeId: "", date: "", reason: "" });
    setShowPaidLeaveForm(false);
    setMsg("Day marked as paid leave ✅");
    loadRecords();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900 mb-1">Online Attendance</h2>
      <p className="text-ink-500 text-sm mb-6">
        Check-in/out uses your device GPS and is verified against the employee's assigned office radius.
      </p>

      <div className="card p-5 mb-6 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-ink-700 mb-1">Employee</label>
          <select
            className="input-field"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">— Select an employee —</option>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
          </select>
        </div>
        <button onClick={handleCheckIn} disabled={locating} className="btn-primary disabled:opacity-50">
          {locating ? "Locating..." : "Check In"}
        </button>
        <button onClick={handleCheckOut} className="btn-accent">Check Out</button>
        <button
          onClick={() => setShowPaidLeaveForm(true)}
          className="text-sm text-ink-600 border border-ink-200 rounded-lg px-4 py-2 hover:bg-ink-50"
        >
          Mark Paid Leave (Admin)
        </button>
      </div>

      {msg && <p className="text-sm text-ink-600 mb-4">{msg}</p>}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Employee</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Check In</th>
              <th className="text-left px-4 py-3 font-medium">Check Out</th>
              <th className="text-left px-4 py-3 font-medium">Location</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8 text-ink-400">Loading...</td></tr>
            ) : records.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-ink-400">No records yet</td></tr>
            ) : (
              records.map((r) => (
                <tr key={r.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3 font-medium text-ink-900">{r.employee?.fullName}</td>
                  <td className="px-4 py-3 text-ink-600">{new Date(r.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3 text-ink-600">
                    {r.checkIn ? new Date(r.checkIn).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {r.checkOut ? new Date(r.checkOut).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r.checkInInRange === true && <span className="badge bg-green-100 text-green-700">In range</span>}
                    {r.checkInInRange === false && (
                      <span className="badge bg-red-100 text-red-700">
                        {r.checkInDistanceM ? `${Math.round(r.checkInDistanceM)}m away` : "Out of range"}
                      </span>
                    )}
                    {r.checkInInRange === null && <span className="text-ink-400 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${STATUS_COLORS[r.status]}`}>{STATUS_LABELS[r.status]}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPaidLeaveForm && (
        <Modal title="Mark Paid Leave" onClose={() => setShowPaidLeaveForm(false)}>
          <p className="text-xs text-ink-500 mb-3">
            Marks a single day as a paid absence/leave for one employee, even if they never checked in.
            No salary deduction will apply for that day.
          </p>
          <form onSubmit={handleMarkPaidLeave} className="space-y-3">
            <select className="input-field" required value={paidLeaveForm.employeeId}
              onChange={(e) => setPaidLeaveForm({ ...paidLeaveForm, employeeId: e.target.value })}>
              <option value="">— Select Employee —</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.fullName}</option>)}
            </select>
            <input className="input-field" type="date" required
              value={paidLeaveForm.date} onChange={(e) => setPaidLeaveForm({ ...paidLeaveForm, date: e.target.value })} />
            <input className="input-field" placeholder="Reason (optional)"
              value={paidLeaveForm.reason} onChange={(e) => setPaidLeaveForm({ ...paidLeaveForm, reason: e.target.value })} />
            <button type="submit" className="btn-primary w-full">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
