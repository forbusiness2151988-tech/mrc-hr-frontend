const styles = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-emerald-50 text-emerald-600",
  Declined: "bg-rose-50 text-rose-600",
  Rejected: "bg-rose-50 text-rose-600",
  Canceled: "bg-ink-100 text-ink-500",
  Passed: "bg-ink-100 text-ink-500",
  Paid: "bg-emerald-50 text-emerald-600",
  Unpaid: "bg-rose-50 text-rose-600",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-ink-100 text-ink-500"
      }`}
    >
      {status}
    </span>
  );
}
