import Icon from "./Icon";

export function EmptyState({ title = "No Data Found", subtitle = "There is nothing to show here yet." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-8">
      <div className="h-24 w-24 rounded-full bg-ink-50 flex items-center justify-center mb-4">
        <Icon name="inbox" size={36} className="text-ink-200" />
      </div>
      <p className="text-sm font-semibold text-ink-700">{title}</p>
      <p className="text-xs text-ink-400 mt-1">{subtitle}</p>
    </div>
  );
}

export function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 z-20 mx-auto max-w-md h-14 w-14 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition"
      style={{ right: "calc(50% - 14rem + 1rem)" }}
    >
      <Icon name="plus" size={24} />
    </button>
  );
}
