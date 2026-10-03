import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "יצירת קשר - אלוף הקולרים",
  description: "פרטי יצירת קשר עם אלוף הקולרים - וואטסאפ, שעות פעילות ונקודת איסוף עצמי.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-l from-brand-dark via-brand to-brand-light text-white">
        <div className="max-w-content mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">יצירת קשר</h1>
          <p className="text-lg text-white/85">נשמח לעזור - כתבו לנו</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 space-y-6 leading-relaxed">
        <p>
          הדרך הכי מהירה לקבל מענה היא וואטסאפ:{" "}
          <a href="https://wa.me/972553186689" className="text-brand underline" target="_blank" rel="noopener noreferrer">
            055-318-6689
          </a>
          , בימים א׳-ה׳ בין 9:00 ל־18:00.
        </p>
        <p>
          ניתן גם לאסוף הזמנה עצמאית מהנקודה שלנו - <strong>אור המדבר, קיבוץ אורים</strong> -
          בתיאום מראש מול אותו מספר וואטסאפ.
        </p>
      </section>
    </div>
  );
}
