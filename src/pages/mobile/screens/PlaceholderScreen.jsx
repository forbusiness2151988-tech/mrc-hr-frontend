import Icon from "../components/Icon";

export default function PlaceholderScreen({ title, icon = "policy" }) {
  return (
    <div className="px-4 pb-6">
      <div className="rounded-2xl bg-white border border-ink-50 shadow-sm p-10 flex flex-col items-center text-center">
        <span className="h-14 w-14 rounded-2xl bg-ink-50 flex items-center justify-center text-ink-400 mb-3">
          <Icon name={icon} size={24} />
        </span>
        <p className="text-sm font-semibold text-ink-800">{title}</p>
        <p className="text-xs text-ink-400 mt-1">This section is coming soon.</p>
      </div>
    </div>
  );
}
