export function formatCurrency(value: number) {
  const n = 2;
  const x = 3;
  const re = "\\d(?=(\\d{" + x + "})+" + (n > 0 ? "\\." : "$") + ")";
  return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
}
