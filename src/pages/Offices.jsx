import { useEffect, useState } from "react";
import { officesApi } from "../api/endpoints";
import Modal from "../components/Modal";

const emptyForm = { name: "", address: "", latitude: "", longitude: "", radiusMeters: "50" };

export default function Offices() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [locating, setLocating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await officesApi.list();
    setOffices(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await officesApi.create(form);
    setForm(emptyForm);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this office?")) return;
    await officesApi.remove(id);
    load();
  };

  const useMyLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({ ...form, latitude: pos.coords.latitude.toFixed(6), longitude: pos.coords.longitude.toFixed(6) });
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Offices</h2>
          <p className="text-ink-500 text-sm">Attendance geofence — each office has a check-in radius (meters)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-accent">+ Create Office</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-ink-500">Loading...</p>
        ) : offices.length === 0 ? (
          <p className="text-ink-400">No offices yet — add one so Online Attendance can verify location.</p>
        ) : (
          offices.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-ink-900">{o.name}</h3>
                <button onClick={() => handleDelete(o.id)} className="text-red-400 hover:text-red-600 text-xs">
                  Delete
                </button>
              </div>
              <p className="text-xs text-ink-500 mb-2">{o.address || "No address set"}</p>
              <p className="text-xs text-ink-600 mb-1">
                {o.latitude.toFixed(5)}, {o.longitude.toFixed(5)}
              </p>
              <p className="text-xs text-amber-600 font-medium mb-2">Radius: {o.radiusMeters}m</p>
              <p className="text-xs text-ink-500">{o._count?.employees ?? 0} employees assigned</p>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <Modal title="Create Office" onClose={() => setShowForm(false)}>
          <form onSubmit={handleCreate} className="space-y-3">
            <input className="input-field" placeholder="Office Name *" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input-field" placeholder="Address"
              value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input-field" type="number" step="any" placeholder="Latitude *" required
                value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
              <input className="input-field" type="number" step="any" placeholder="Longitude *" required
                value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
            </div>
            <button type="button" onClick={useMyLocation} disabled={locating}
              className="text-sm text-ink-600 border border-ink-200 rounded-lg px-4 py-2 hover:bg-ink-50 w-full disabled:opacity-50">
              {locating ? "Locating..." : "📍 Use My Current Location"}
            </button>
            <div>
              <label className="block text-xs text-ink-500 mb-1">Check-in Radius (meters)</label>
              <input className="input-field" type="number" placeholder="50"
                value={form.radiusMeters} onChange={(e) => setForm({ ...form, radiusMeters: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary w-full">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
