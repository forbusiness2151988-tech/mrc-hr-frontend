import Icon from "./Icon";

export default function BottomSheet({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink-950/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-3xl bg-white max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-ink-50">
          <span className="w-8" />
          <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="text-ink-400 p-1">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 flex-1">{children}</div>
        {footer && (
          <div className="px-5 py-4 border-t border-ink-50 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
