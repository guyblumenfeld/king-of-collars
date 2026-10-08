import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/woo";
import ProductCard from "@/components/ProductCard";
import CategoryBadge from "@/components/CategoryBadge";

export const dynamic = "force-static";

// Matches the WP "care" category (טיפוח ובריאות) used by WP-sourced posts — kept as a
// plain string since this post isn't in WP and has no category id to look up.
const CATEGORY = "טיפוח ובריאות";

const TITLE = "10 רעיונות להעסקת הכלב כשאתם לא בבית";
const DESCRIPTION =
  "10 דרכים פשוטות וזולות להעסיק את הכלב כשאתם לא בבית - עצמות, משטחי ליקוק, צעצועי האכלה איטית וטריקים נוספים לכלב רגוע ומאושר.";
const IMAGE = "/images/dog-busy.jpg";

export const metadata: Metadata = {
  title: `${TITLE} - אלוף הקולרים`,
  description: DESCRIPTION,
  alternates: { canonical: "/blog/10-ways-to-keep-your-dog-busy" },
  openGraph: { title: TITLE, description: DESCRIPTION, images: [IMAGE] },
};

const CONTENT_PART1 = `
<p class="wp-content">יוצאים מהבית ומרגישים רע שהכלב נשאר לבד? זה טבעי לדאוג. אבל עם קצת תכנון, אפשר להפוך את הזמן הזה לחוויה חיובית עבורו, במקום שעמום. הנה 10 רעיונות פשוטים וזולים שישמרו עליו עסוק, מאושר ורגוע עד שתחזרו.</p>

<h2>1. עצם מהקצב</h2>
<p>עצם גדולה ללעיסה היא מהדברים הכי פשוטים ויעילים שיש. אפשר לקנות אצל הקצב בדרך כלל ב-10-20 ₪ לקילו. חשוב: עצם בקר בלבד, לא עוף ולא הודו, כי אלה נוטים להישבר לרסיסים חדים ומסוכנים. גם חשוב שהעצם תהיה נא ולא מבושלת, כי בישול מרכך את העצם והופך אותה לשבירה. בכל מקרה, מומלץ להתייעץ עם הווטרינר לפני שמתחילים, כי זה לא מתאים לכל כלב (למשל כלבים עם בעיות שיניים או נטייה לבלוע חתיכות גדולות). עדיף לחפש אצל קצבים של פעם ולא בקצביות של סופרים. אם אתם בתל אביב, אנחנו ממליצים לכם ללכת ל<a href="https://share.google/W3zcHlfJbK70l1VvD" target="_blank" rel="noopener noreferrer">שמשון כהן בשר היהלום</a>.</p>

<h2>2. משטח ליקוק עם ממרח</h2>
<p>מרחו מעט יוגורט טבעי, גבינת שמנת או חמאת בוטנים (ללא קסיליטול!) על משטח ליקוק והדביקו למקרר או לקיר חלק. הליקוק הממושך מרגיע כלבים רבים ממש כמו מדיטציה, ואפשר גם להקפיא אותו מראש לעוד כמה דקות טובות.</p>
`;

const CONTENT_PART2 = `
<h2>3. צעצוע שמפיל חטיפים</h2>
<p>זה אחד הפתרונות האהובים עלינו: צעצוע אכילה איטית שאפשר למלא בחטיפים קטנים, והכלב צריך "לעבוד" כדי להוציא אותם. אנחנו שמים בפנים חתיכות כבד בקר מבושל. הכלב שלנו פשוט מת על זה, זה זול מאוד וגם בריא.</p>
`;

const CONTENT_PART3 = `
<h2>4. קוביות קפואות עם תבשיל בשר</h2>
<p>מבשלים תבשיל בשר לכלב (כ-3 שעות בסיר לחץ, עם כמה עצמות או שאריות בשר), ואז מקפיאים במנות קטנות בכוסות חד-פעמיות. בכל פעם שיוצאים, שולפים כוס אחת מהמקפיא. הליקוק האיטי של הקרח המומס עם הבשר יכול להעסיק את הכלב לאורך זמן רב, וגם מקרר אותו בימים חמים.</p>

<h2>5. חיפוש אוכל (Snuffle)</h2>
<p>פזרו כמה גרגרי מזון יבש על שטיח או בתוך מגבת מקופלת, ותנו לכלב "לחפש" אותם באף. זה מפעיל את חוש הריח שלו ועוזר לפרוק אנרגיה מנטלית, ולעיתים זה מעייף יותר מטיול.</p>

<h2>6. צעצוע קונג ממולא</h2>
<p>ממלאים צעצוע קונג (או דומה) בתערובת של מזון רטוב, יוגורט וחטיפים קטנים, ומקפיאים ללילה. ההוצאה האיטית של המילוי הקפוא יכולה להעסיק כלב גם שעה ומעלה.</p>

<h2>7. רדיו או טלוויזיה ברקע</h2>
<p>רעשי רקע עדינים (רדיו, פודקאסט, או ערוץ טלוויזיה שקט) יכולים להרגיע כלבים שסובלים מחרדת נטישה, ולמנוע את התחושה של שקט מוחלט ומלחיץ בבית ריק.</p>

<h2>8. בגד או שמיכה עם הריח שלכם</h2>
<p>השאירו חולצה לבושה או שמיכה עם הריח שלכם ליד מקום המנוחה של הכלב. הריח המוכר נותן תחושת ביטחון ויכול להפחית מתח במהלך השעות לבד.</p>

<h2>9. טיול ארוך לפני היציאה</h2>
<p>כלב עייף הוא כלב רגוע. טיול ארוך ומאמץ (ריצה, משחק אינטנסיבי) ממש לפני שיוצאים לעבודה משמעותית מפחית אנרגיה עודפת שעלולה להפוך לחרדה או להרס בבית.</p>

<h2>10. סבב "חפצים מתחלפים"</h2>
<p>אל תשאירו את כל הצעצועים בחוץ כל הזמן. שימרו 2-3 "בתפוצה" והחליפו אותם מדי כמה ימים. צעצוע שחוזר אחרי הפסקה מרגיש כמו חדש, וזה שומר על הסקרנות של הכלב.</p>

<p>שילוב של כמה מהרעיונות האלה, למשל עצם ללעיסה בתחילת היום וקונג קפוא לפני שיוצאים, יכול לעשות הבדל גדול. בחנות שלנו תמצאו עוד כמה אביזרים שעוזרים לשמור את הכלב עסוק ומאושר, במחירים הוגנים.</p>
`;

export default async function Post() {
  const [lickMat, dropToy] = await Promise.all([
    getProductBySlug("lick-mat"),
    getProductBySlug("2340"),
  ]);

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog/" className="text-brand text-sm">← חזרה לבלוג</Link>
      <div className="mt-3"><CategoryBadge name={CATEGORY} /></div>
      <h1 className="text-3xl font-extrabold my-4">{TITLE}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMAGE} alt="" className="w-full rounded-2xl mb-6" />
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: CONTENT_PART1 }} />
      {lickMat && (
        <div className="max-w-xs my-6">
          <ProductCard product={lickMat} />
        </div>
      )}
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: CONTENT_PART2 }} />
      {dropToy && (
        <div className="max-w-xs my-6">
          <ProductCard product={dropToy} />
        </div>
      )}
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: CONTENT_PART3 }} />
    </article>
  );
}
