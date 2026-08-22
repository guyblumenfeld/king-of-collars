"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Israeli-standard accessibility widget (IS 5568): font scaling, contrast,
// grayscale, link underlining, motion stop. Settings persist in localStorage
// and are applied as classes on <html> (styles in globals.css). Visual filters
// target #site-wrap so the fixed floating buttons stay in place.
type A11y = {
  font: 0 | 1 | 2;
  contrast: boolean;
  grayscale: boolean;
  underline: boolean;
  noMotion: boolean;
};

const DEFAULTS: A11y = { font: 0, contrast: false, grayscale: false, underline: false, noMotion: false };
const STORE_KEY = "ahk_a11y";

function apply(s: A11y) {
  const el = document.documentElement;
  el.classList.toggle("a11y-font-1", s.font === 1);
  el.classList.toggle("a11y-font-2", s.font === 2);
  el.classList.toggle("a11y-contrast", s.contrast);
  el.classList.toggle("a11y-grayscale", s.grayscale);
  el.classList.toggle("a11y-underline", s.underline);
  el.classList.toggle("a11y-no-motion", s.noMotion);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<A11y>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved) {
        const merged = { ...DEFAULTS, ...saved };
        setS(merged);
        apply(merged);
      }
    } catch {
      /* corrupt storage → defaults */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function update(patch: Partial<A11y>) {
    const next = { ...s, ...patch };
    setS(next);
    apply(next);
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  }

  const toggle = (key: keyof Omit<A11y, "font">, label: string) => (
    <button
      onClick={() => update({ [key]: !s[key] })}
      aria-pressed={s[key]}
      className={`w-full text-right rounded-lg px-3 py-2 text-sm font-medium border transition ${
        s[key] ? "bg-brand text-white border-brand" : "bg-white border-gray-200 hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="תפריט נגישות"
        className="fixed bottom-5 right-5 z-40 bg-[#1e40af] text-white rounded-full w-14 h-14 grid place-items-center shadow-lg hover:scale-105 transition"
      >
        {/* universal-access figure */}
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2.2" />
          <path d="M12 8c-2.8 0-5.3-.5-7.2-1l-.5 1.9c1.6.4 3.4.8 5.2 1v3.3l-2.4 7.2 1.9.6 2.5-6.5h1l2.5 6.5 1.9-.6-2.4-7.2V9.9c1.8-.2 3.6-.6 5.2-1L19.2 7C17.3 7.5 14.8 8 12 8z" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="הגדרות נגישות"
          className="fixed bottom-24 right-5 z-40 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-2"
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-sm">נגישות</h2>
            <button onClick={() => setOpen(false)} aria-label="סגירת תפריט נגישות" className="text-gray-400 hover:text-ink text-lg leading-none">
              ×
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium flex-1">גודל טקסט</span>
            <button
              onClick={() => update({ font: Math.max(0, s.font - 1) as A11y["font"] })}
              aria-label="הקטנת טקסט"
              disabled={s.font === 0}
              className="w-9 h-9 rounded-lg border border-gray-200 font-bold disabled:opacity-40 hover:border-brand"
            >
              א־
            </button>
            <button
              onClick={() => update({ font: Math.min(2, s.font + 1) as A11y["font"] })}
              aria-label="הגדלת טקסט"
              disabled={s.font === 2}
              className="w-9 h-9 rounded-lg border border-gray-200 font-bold disabled:opacity-40 hover:border-brand"
            >
              א+
            </button>
          </div>

          {toggle("contrast", "ניגודיות מוגברת")}
          {toggle("grayscale", "גווני אפור")}
          {toggle("underline", "הדגשת קישורים")}
          {toggle("noMotion", "עצירת אנימציות")}

          <button
            onClick={() => update(DEFAULTS)}
            className="w-full rounded-lg px-3 py-2 text-sm font-medium text-sale border border-gray-200 hover:border-sale"
          >
            איפוס הגדרות
          </button>

          <Link href="/accessibility-statement/" onClick={() => setOpen(false)} className="block text-center text-xs text-brand underline pt-1">
            הצהרת נגישות
          </Link>
        </div>
      )}
    </>
  );
}
