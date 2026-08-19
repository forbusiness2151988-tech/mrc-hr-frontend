import Icon from "../components/Icon";
import { requestCatalog } from "../mockData";

export default function RequestsCatalog({ onSelectType, onOpenMyRequests, onOpenManagerRequests, isManager }) {
  return (
    <div className="px-4 pb-6">
      <div className="flex gap-3 mb-5">
        <button
          onClick={onOpenMyRequests}
          className="flex-1 rounded-2xl bg-ink-900 text-white px-4 py-3.5 text-left"
        >
          <p className="text-sm font-semibold">My Requests</p>
          <p className="text-[11px] text-ink-300 mt-1">Track status &amp; history</p>
        </button>
        {isManager && (
          <button
            onClick={onOpenManagerRequests}
            className="flex-1 rounded-2xl bg-amber-500 text-white px-4 py-3.5 text-left"
          >
            <p className="text-sm font-semibold">Manager Requests</p>
            <p className="text-[11px] text-amber-50 mt-1">Approve your team</p>
          </button>
        )}
      </div>

      <p className="text-sm font-semibold text-ink-900 mb-3">All Requests</p>

      {Object.entries(requestCatalog).map(([category, items]) => (
        <div key={category} className="mb-5">
          <p className="text-xs font-semibold text-ink-400 uppercase mb-2">{category}</p>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => onSelectType(category, item)}
                className="rounded-2xl bg-white border border-ink-50 shadow-sm p-4 flex flex-col gap-3 items-start active:bg-ink-50"
              >
                <span className="h-10 w-10 rounded-xl bg-ink-50 flex items-center justify-center text-ink-700">
                  <Icon name={item.icon} size={18} />
                </span>
                <span className="text-sm font-medium text-ink-900">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
