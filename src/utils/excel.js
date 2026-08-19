import * as XLSX from "xlsx";

/**
 * Exports an array of objects to an Excel file and downloads it
 * to the user's device.
 * rows: [{ colLabel1: value, colLabel2: value, ... }]
 */
export function exportToExcel(rows, filename, sheetName = "Sheet1") {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Reads the first sheet of an Excel/CSV file uploaded by the user and
 * returns an array of objects (the first row becomes the object keys).
 */
export function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}
