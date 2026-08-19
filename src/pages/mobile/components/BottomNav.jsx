import Icon from "./Icon";

const tabs = [
  { key: "home", label: "Home", icon: "home" },
  { key: "statistics", label: "Statistics", icon: "chart" },
  { key: "__clock__", label: "", icon: "" }, // central action placeholder
  { key: "requests", label: "Requests", icon: "request" },
  { key: "more", label: "More", icon: "more" },
];

export default function BottomNav({ active, onChange, shiftActive, onClockAction }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-md relative">
        <div className="bg-white border-t border-ink-100 rounded-t-2xl shadow-[0_-4px_16px_rgba(17,28,46,0.06)] px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex items-end justify-between">
          {tabs.map((tab) =>
            tab.key === "__clock__" ? (
              <button
                key={tab.key}
                onClick={onClockAction}
                className="flex flex-col items-center -mt-8"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ${
                    shiftActive ? "bg-amber-500" : "bg-ink-900"
                  }`}
                >
                  <Icon name="arrowRight" size={22} />
                </span>
                <span className="text-[11px] mt-1 text-ink-500 font-medium">
                  {shiftActive ? "Clock Out" : "Clock In"}
                </span>
              </button>
            ) : (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className="flex flex-1 flex-col items-center gap-1 py-1.5"
              >
                <Icon
                  name={tab.icon}
                  size={22}
                  className={active === tab.key ? "text-amber-500" : "text-ink-300"}
                />
                <span
                  className={`text-[11px] font-medium ${
                    active === tab.key ? "text-ink-900" : "text-ink-300"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
