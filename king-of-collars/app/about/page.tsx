import type { Metadata } from "next";
import Link from "next/link";
import { PawIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "אודות — אלוף הקולרים",
  description: "מי אנחנו ולמה הקמנו את אלוף הקולרים — חנות ישראלית לאביזרים איכותיים לכלבים.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-l from-brand-dark via-brand to-brand-light text-white">
        <div className="max-w-content mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">מי אנחנו</h1>
          <p className="text-lg text-white/85">החנות של מי שבאמת אוהב כלבים</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 space-y-6 leading-relaxed">
        <p>
          <strong>אלוף הקולרים</strong> נולד מאהבה פשוטה לכלבים — ומהתסכול למצוא בארץ אביזרים
          איכותיים במחיר הוגן. במקום מבחר אינסופי של מוצרים בינוניים, בחרנו לבנות קטלוג קטן
          ומוקפד: כל מוצר בחנות נבדק על ידינו, על הכלבים שלנו, לפני שהוא נכנס למדף.
        </p>
        <p>
          אנחנו עסק ישראלי קטן, והשירות אצלנו אישי באמת: שאלה על מידה? התלבטות בין שתי רצועות?
          כתבו לנו בוואטסאפ ותקבלו תשובה מאדם, לא מבוט. ואם משהו לא מתאים — מחזירים תוך 30 יום,
          בלי שאלות מיותרות.
        </p>

        <div className="grid md:grid-cols-3 gap-4 py-4">
          {[
            { Icon: PawIcon, title: "נבחר בקפידה", sub: "כל מוצר נבדק לפני שנכנס לקטלוג" },
            { Icon: TruckIcon, title: "משלוח מהיר", sub: "1–4 ימי עסקים לכל הארץ" },
            { Icon: ShieldIcon, title: "שירות אישי", sub: "מענה אנושי בוואטסאפ" },
          ].map(({ Icon, title, sub }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-brand/10 text-brand grid place-items-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold">{title}</div>
              <div className="text-sm text-gray-500 mt-1">{sub}</div>
            </div>
          ))}
        </div>

        <p>
          אפשר גם לאסוף עצמאית מהנקודה שלנו — <strong>אור המדבר, קיבוץ אורים</strong> — ולחסוך את
          דמי המשלוח. אנחנו זמינים בוואטסאפ{" "}
          <a href="https://wa.me/972543376605" className="text-brand underline" target="_blank" rel="noopener noreferrer">
            054-337-6605
          </a>{" "}
          בימים א׳–ה׳ בין 9:00 ל־18:00.
        </p>

        <div className="text-center pt-4">
          <Link
            href="/products/"
            className="inline-block bg-brand text-white font-bold rounded-full px-9 py-3.5 shadow hover:bg-brand-dark transition"
          >
            לחנות ←
          </Link>
        </div>
      </section>
    </div>
  );
}
