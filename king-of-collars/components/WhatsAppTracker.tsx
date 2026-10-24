"use client";
import { useEffect } from "react";

// One delegated listener for every wa.me link on the site (floating button, footer, contact/about pages).
// Sends a GA4 `whatsapp_click`; no-op if gtag hasn't loaded or is ad-blocked.
export default function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="https://wa.me/"]');
      if (!a) return;
      const placement = a.closest("footer") ? "footer" : a.className.includes("fixed") ? "floating_button" : "page_content";
      try {
        window.gtag?.("event", "whatsapp_click", { placement, page_path: location.pathname });
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
