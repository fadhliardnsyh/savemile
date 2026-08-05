export function getWaUrl(phoneOrUrl?: string, customMessage?: string): string {
  const base = phoneOrUrl || "https://wa.me/6281234567890";
  let cleanBase = base.trim();

  if (/^\+?\d+$/.test(cleanBase)) {
    let digits = cleanBase.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "62" + digits.slice(1);
    }
    cleanBase = `https://wa.me/${digits}`;
  } else {
    cleanBase = cleanBase.split("?")[0];
  }

  if (!customMessage) return cleanBase;
  return `${cleanBase}?text=${encodeURIComponent(customMessage.trim())}`;
}
