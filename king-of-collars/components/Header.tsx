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
        משלוח חינם בקנייה מעל ₪150 לנקודת חלוקה · אספקה תוך 1-5 ימי עסקים
      </div>
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-content mx-auto flex items-center justify-between gap-4 px-4 h-20 md:h-28 lg:h-36">
          <Link href="/" className="flex items-center shrink-0">
            <Logo className="h-16 md:h-24 lg:h-32" />
          </Link>
          <nav aria-label="ניווט ראשי" className="hidden md:flex gap-5 lg:gap-8 text-lg lg:text-xl font-bold whitespace-nowrap">
            <Link href="/" className="hover:text-brand transition">דף הבית</Link>
            <Link href="/products" className="hover:text-brand transition">החנות</Link>
            <Link href="/about" className="hover:text-brand transition">אודות</Link>
            <Link href="/blog" className="hover:text-brand transition">הבלוג</Link>
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label={count > 0 ? `פתיחת עגלת הקניות, ${count} פריטים` : "פתיחת עגלת הקניות"}
            className="relative flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-semibold hover:bg-brand-dark transition"
          >
            <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
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
