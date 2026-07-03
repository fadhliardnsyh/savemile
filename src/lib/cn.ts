/** Gabungkan className secara kondisional tanpa dependensi tambahan. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
