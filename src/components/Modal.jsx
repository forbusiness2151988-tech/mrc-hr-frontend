export default function Modal({ title, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 bg-ink-950/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`card w-full p-6 max-h-[90vh] overflow-y-auto ${wide ? "max-w-2xl" : "max-w-md"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 text-xl leading-none">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
