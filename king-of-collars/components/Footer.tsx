import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-16">
      <div className="max-w-content mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2.5 text-lg font-extrabold mb-3">
            <Logo size={34} />
            אלוף הקולרים
          </div>
          <p className="text-white/70 leading-relaxed">
            אביזרים איכותיים לכלבים — רצועות, קולרים, ביגוד ומשחקים. נבחרים בקפידה, נשלחים באהבה.
          </p>
        </div>
        <div>
          <div className="font-bold mb-3">ניווט</div>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/products" className="hover:text-white transition">החנות</Link></li>
            <li><Link href="/about" className="hover:text-white transition">אודות</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">הבלוג</Link></li>
            <li><Link href="/accessibility-statement" className="hover:text-white transition">הצהרת נגישות</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-3">משלוחים והחזרות</div>
          <p className="text-white/70 leading-relaxed">
            משלוח חינם מעל ₪199 לנקודת חלוקה / ₪299 עד הבית.
            <br />
            אספקה 1–4 ימי עסקים · החזרה תוך 30 יום.
            <br />
            איסוף עצמי: אור המדבר, קיבוץ אורים.
          </p>
        </div>
        <div>
          <div className="font-bold mb-3">שירות לקוחות</div>
          <p className="text-white/70 leading-relaxed">
            וואטסאפ:{" "}
            <a href="https://wa.me/972543376605" className="underline hover:text-white transition" target="_blank" rel="noopener noreferrer">
              054-337-6605
            </a>
            <br />
            ימים א׳–ה׳, 9:00–18:00
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-white/50 text-xs py-5">
        © {new Date().getFullYear()} אלוף הקולרים · כל הזכויות שמורות
      </div>
    </footer>
  );
}
