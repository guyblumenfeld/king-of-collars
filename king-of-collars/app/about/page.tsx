import type { Metadata } from "next";
import Link from "next/link";
import { PawIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "אודות - אלוף הקולרים",
  description: "מי אנחנו ולמה הקמנו את אלוף הקולרים - חנות ישראלית לאביזרים איכותיים לכלבים.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "אודות - אלוף הקולרים",
    description: "מי אנחנו ולמה הקמנו את אלוף הקולרים - חנות ישראלית לאביזרים איכותיים לכלבים.",
  },
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
        <figure className="md:float-left md:ml-6 mb-4 w-full md:w-64 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/foster-dog.jpg"
            alt="הכלב שהעלה את הרעיון לאלוף הקולרים"
            className="w-full rounded-2xl shadow-sm object-cover aspect-square"
          />
        </figure>
        <p>
          הכל התחיל בכלב חמוד אחד שננטש והגיע לכלבייה - ואני לקחתי אותו לאומנה בבית שלי. רציתי
          לקנות לו כמה אביזרים בסיסיים, ומה שגיליתי זעזע אותי: אפילו רצועה קצרה ופשוטה עלתה
          בחנויות בארץ מעל 50 ש״ח, ושאר האביזרים היו יקרים עוד יותר.
        </p>
        <p>
          מאותו רגע ידעתי שאני רוצה לפתוח חנות שעוזרת לאנשים לקבל תוך ימים ספורים את מה שהכלב
          שלהם צריך - במחיר הוגן. דברים פשוטים כמו שקיות קקי ורצועות, וגם אביזרים שעוזרים לכלב
          להיות רגוע ומאושר יותר - כמו לוחיות ליקוק, צעצועי האכלה איטית ועוד. כך נולד
          <strong> אלוף הקולרים</strong>.
        </p>
        <p>
          אנחנו עסק ישראלי קטן, והשירות אצלנו אישי באמת: שאלה על מידה? התלבטות בין שתי רצועות?
          כתבו לנו בוואטסאפ ותקבלו תשובה מאדם, לא מבוט. ואם משהו לא מתאים - מחזירים תוך 30 יום,
          בלי שאלות מיותרות.
        </p>

        <div className="grid md:grid-cols-3 gap-4 py-4">
          {[
            { Icon: PawIcon, title: "נבחר בקפידה", sub: "כל מוצר נבדק לפני שנכנס לקטלוג" },
            { Icon: TruckIcon, title: "משלוח מהיר", sub: "1-5 ימי עסקים לכל הארץ" },
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
          אפשר גם לאסוף עצמאית - <strong>קיבוץ אורים</strong> - ולחסוך את
          דמי המשלוח.
          <br />
          אנחנו זמינים בוואטסאפ{" "}
          <a href="https://wa.me/972553186689" className="text-brand underline" target="_blank" rel="noopener noreferrer">
            055-318-6689
          </a>{" "}
          בימים א׳-ה׳ בין 9:00 ל־18:00.
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
