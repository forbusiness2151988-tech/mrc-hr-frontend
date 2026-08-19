import Icon from "./Icon";

// Semi-circular progress gauge for the "Clock-In" widget on the Home screen.
// progress: 0..1 fraction of the shift target completed.
export default function ArcGauge({ progress = 0, label, sublabel }) {
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * r; // half circle
  const clamped = Math.max(0, Math.min(1, progress));
  const dash = circumference * clamped;

  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size / 2 + stroke} viewBox={`0 0 ${size} ${size / 2 + stroke}`}>
        <path
          d={arcPath}
          fill="none"
          stroke="#e7edf5"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={arcPath}
          fill="none"
          stroke="#d99730"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
      </svg>
      <div className="absolute top-[52%] flex flex-col items-center">
        <span className="text-2xl font-bold text-ink-900">{label}</span>
        {sublabel && <span className="text-xs text-ink-400 mt-1">{sublabel}</span>}
      </div>
    </div>
  );
}

export function FingerprintPrompt({ onCheckIn }) {
  return (
    <button
      onClick={onCheckIn}
      className="mt-2 flex items-center gap-2 rounded-full bg-ink-900 text-white px-5 py-3 text-sm font-medium active:scale-95 transition"
    >
      <Icon name="fingerprint" size={18} />
      Checkin today using fingerprint
    </button>
  );
}
