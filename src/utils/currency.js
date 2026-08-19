// Currency formatting for the whole app — Egyptian Pound (ج.م)
export function formatCurrency(amount) {
  const value = Number(amount || 0);
  return `${value.toLocaleString("en-EG", { maximumFractionDigits: 2 })} ج.م`;
}
