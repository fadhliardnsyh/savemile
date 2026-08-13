"use client";

import { useEffect } from "react";

export function WhatsAppTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a") as HTMLAnchorElement | null;
      const trackElem = target.closest("[data-wa-location]") as HTMLElement | null;

      const href = link?.href || "";
      const isWaLink =
        /wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:/i.test(href);

      if (!isWaLink && !trackElem) return;

      const urlParams = new URLSearchParams(window.location.search);
      const buttonLocation =
        trackElem?.dataset.waLocation ||
        link?.dataset.waLocation ||
        link?.getAttribute("aria-label") ||
        link?.innerText?.trim()?.slice(0, 50) ||
        "WhatsApp Button";

      const buttonLabel =
        link?.innerText?.trim()?.slice(0, 100) ||
        trackElem?.innerText?.trim()?.slice(0, 100) ||
        link?.getAttribute("aria-label") ||
        "";

      const data = {
        page: window.location.pathname,
        buttonLocation,
        buttonLabel,
        targetUrl: href || "",
        referrer: document.referrer || "",
        utmSource: urlParams.get("utm_source") || "",
        utmMedium: urlParams.get("utm_medium") || "",
        utmCampaign: urlParams.get("utm_campaign") || "",
      };

      const payload = JSON.stringify(data);

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/track-wa", blob);
      } else {
        fetch("/api/track-wa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
