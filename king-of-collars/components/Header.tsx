"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { CartIcon } from "./icons";
import Logo from "./Logo";

export default function Header() {
  const { cart, setOpen } = useCart();
  const count = cart?.items_count ?? 0;
  return (
    <>
      <div className="bg-brand-dark text-white text-center text-sm py-2 px-3">
        משלוח חינם בקנייה מעל ₪199 לנקודת חלוקה · אספקה תוך 1–4 ימי עסקים
      </div>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-content mx-auto flex items-center justify-between gap-4 px-4 h-16">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold text-brand">
            <Logo size={40} />
            אלוף הקולרים
          </Link>
          <nav aria-label="ניווט ראשי" className="hidden md:flex gap-6 text-sm font-semibold">
            <Link href="/" className="hover:text-brand transition">דף הבית</Link>
            <Link href="/products" className="hover:text-brand transition">החנות</Link>
            <Link href="/about" className="hover:text-brand transition">אודות</Link>
            <Link href="/blog" className="hover:text-brand transition">הבלוג</Link>
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label={count > 0 ? `פתיחת עגלת הקניות, ${count} פריטים` : "פתיחת עגלת הקניות"}
            className="relative flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2 text-sm font-semibold hover:bg-brand-dark transition"
          >
            <CartIcon className="w-5 h-5" />
            עגלה
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-2 -left-2 bg-sale text-white rounded-full text-xs w-5 h-5 grid place-items-center"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
