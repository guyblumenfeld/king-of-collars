// All blog posts are plain Next.js pages in this repo (not fetched from WP) — see
// app/blog/(posts)/<slug>/page.tsx. Keep this list, app/sitemap.ts's post slugs, and
// each post folder in sync when adding or removing one.
export const LOCAL_POSTS = [
  {
    slug: "10-ways-to-keep-your-dog-busy",
    title: "10 רעיונות להעסקת הכלב כשאתם לא בבית",
    excerpt:
      "10 דרכים פשוטות וזולות להעסיק את הכלב כשאתם לא בבית - עצמות, משטחי ליקוק, צעצועי האכלה איטית וטריקים נוספים.",
    category: "טיפוח ובריאות",
    image: "/images/dog-busy.jpg" as string | null,
  },
  {
    slug: "how-to-choose-dog-collar",
    title: "איך לבחור קולר מתאים לכלב שלכם — המדריך המלא",
    excerpt:
      "בחירת קולר לכלב היא החלטה חשובה יותר ממה שנדמה. הקולר הנכון משפיע על הנוחות, הבטיחות והבריאות של הכלב.",
    category: "טיפוח ובריאות",
    image: "/images/how-to-choose-dog-collar.jpg",
  },
  {
    slug: "stop-dog-peeing-at-home",
    title: "15 דרכים ללמד את הכלב שלכם לא לעשות צרכים בבית",
    excerpt:
      "גור חדש או כלב מבוגר שעדיין עושה צרכים בבית? הנה 15 טיפים מעשיים שיעזרו לכם ללמד אותו הרגלי שירותים נכונים, בסבלנות ובעקביות.",
    category: "טיפוח ובריאות",
    // ponytail: card uses a letterboxed/padded version so object-cover's wide h-44 box
    // never crops the dog out of this portrait-oriented photo; post body uses the
    // original full photo (app/blog/(posts)/stop-dog-peeing-at-home/page.tsx).
    image: "/images/dog-house-training-card.jpg" as string | null,
  },
];
