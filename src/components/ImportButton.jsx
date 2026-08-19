import { useRef, useState } from "react";
import { readExcelFile } from "../utils/excel";

/**
 * onRows(rows) is called with the parsed rows from the uploaded file.
 * This component has no upload logic of its own, so it stays reusable
 * across modules (Leads, Units, ...).
 */
export default function ImportButton({ onRows, label = "Import from Excel" }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    try {
      const rows = await readExcelFile(file);
      await onRows(rows);
    } catch (err) {
      setError("Could not read the file. Make sure it's a valid Excel or CSV file.");
      console.error(err);
    } finally {
      setLoading(false);
      e.target.value = ""; // allow re-uploading the same file after an error
    }
  };

  return (
    <div className="inline-block">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="text-sm text-ink-600 border border-ink-200 rounded-lg px-4 py-2 hover:bg-ink-50 transition-colors disabled:opacity-50"
      >
        ⭱ {loading ? "Importing..." : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
