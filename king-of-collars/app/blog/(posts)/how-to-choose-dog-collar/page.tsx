import type { Metadata } from "next";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";

export const dynamic = "force-static";

const CATEGORY = "טיפוח ובריאות";
const TITLE = "איך לבחור קולר מתאים לכלב שלכם — המדריך המלא";
const DESCRIPTION =
  "בחירת קולר לכלב היא החלטה חשובה יותר ממה שנדמה. הקולר הנכון משפיע על הנוחות, הבטיחות והבריאות של הכלב.";
const IMAGE = "/images/how-to-choose-dog-collar.jpg";

export const metadata: Metadata = {
  title: `${TITLE} - אלוף הקולרים`,
  description: DESCRIPTION,
  alternates: { canonical: "/blog/how-to-choose-dog-collar" },
  openGraph: { title: TITLE, description: DESCRIPTION, images: [IMAGE] },
};

const CONTENT = `
<p>בחירת קולר לכלב היא החלטה חשובה יותר ממה שנדמה. הקולר הנכון משפיע על הנוחות, הבטיחות והבריאות של הכלב, ובחירה לא נכונה עלולה לגרום לגירוי בעור, אי נוחות ואף סכנה. במדריך הזה נסביר על כל מה שצריך לדעת.</p>

<h2>סוגי קולרים</h2>
<p>ישנם כמה סוגי קולרים עיקריים, וכל אחד מתאים למטרה אחרת:</p>
<ul>
  <li><strong>קולר שטוח רגיל</strong> - המתאים לרוב הכלבים לשימוש יומיומי ולתליית תג זיהוי.</li>
  <li><strong>קולר מרטינגייל</strong> - מתאים לכלבים עם ראש צר שנשמטים מקולר רגיל.</li>
  <li><strong>רתמה (הרנס)</strong> - מפזרת לחץ על החזה במקום על הצוואר, מומלצת לגזעים קטנים ולכלבים שמושכים.</li>
  <li><strong>קולר רפלקטיבי</strong> - לנראות בטוחה בטיולי ערב ולילה.</li>
</ul>

<h2>איך מודדים מידה נכונה?</h2>
<p>מדדו את היקף צוואר הכלב בעזרת סרט מדידה גמיש, והוסיפו מרווח של שתי אצבעות. הקולר צריך להיות צמוד אך לא חונק, אתם אמורים להחליק בקלות שתי אצבעות בין הקולר לצוואר.</p>

<h2>מאיזה חומר כדאי לבחור?</h2>
<p>ניילון הוא חומר עמיד, קל לניקוי וזול. עור הוא יוקרתי ונוח אך דורש תחזוקה. לכלבים שאוהבים מים, בחרו חומר עמיד למים שלא סופג ריחות.</p>

<h2>טיפ בטיחות חשוב</h2>
<p>שקלו קולר עם תא ל-AirTag או GPS, כך תוכלו לאתר את הכלב במקרה שיברח. בשילוב עם תפרים רפלקטיביים, זהו פתרון בטיחות מצוין לכל בעל כלב.</p>

<p>בחנות שלנו תמצאו מגוון קולרים איכותיים שנבחרו בקפידה. צריכים עזרה בבחירה? אנחנו כאן בשבילכם.</p>
`;

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog/" className="text-brand text-sm">← חזרה לבלוג</Link>
      <div className="mt-3"><CategoryBadge name={CATEGORY} /></div>
      <h1 className="text-3xl font-extrabold my-4">{TITLE}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMAGE} alt="" className="w-full rounded-2xl mb-6" />
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </article>
  );
}
