import { exportToExcel } from "../utils/excel";

export default function ExportButton({ rows, filename, sheetName, label = "Export Excel" }) {
  const handleExport = () => {
    if (!rows || rows.length === 0) {
      alert("No data to export");
      return;
    }
    exportToExcel(rows, filename, sheetName);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="text-sm text-ink-600 border border-ink-200 rounded-lg px-4 py-2 hover:bg-ink-50 transition-colors"
    >
      ⭳ {label}
    </button>
  );
}
