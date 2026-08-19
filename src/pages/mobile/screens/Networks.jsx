import { useState } from "react";
import Icon from "../components/Icon";
import { allowedNetworks } from "../mockData";

export default function Networks() {
  const [networks, setNetworks] = useState(allowedNetworks);

  const toggle = (id) =>
    setNetworks((ns) => ns.map((n) => (n.id === id ? { ...n, active: !n.active } : n)));

  return (
    <div className="px-4 pb-6">
      <p className="text-sm text-ink-500 mb-4">
        Employees checking in from these Wi-Fi networks are verified as on-site automatically.
      </p>

      <div className="space-y-3">
        {networks.map((n) => (
          <div key={n.id} className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-ink-50 flex items-center justify-center text-ink-700">
              <Icon name="wifi" size={18} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">{n.ssid}</p>
              <p className="text-xs text-ink-400 mt-0.5">{n.mac}</p>
            </div>
            <button
              onClick={() => toggle(n.id)}
              className={`h-6 w-11 rounded-full flex items-center px-0.5 transition ${
                n.active ? "bg-emerald-500 justify-end" : "bg-ink-100 justify-start"
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-white shadow" />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 rounded-xl border border-dashed border-ink-200 text-ink-500 py-3 text-sm font-semibold flex items-center justify-center gap-2">
        <Icon name="plus" size={16} />
        Add Network
      </button>
    </div>
  );
}
