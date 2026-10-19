import Link from "next/link";

// Single source of truth for shipping text/prices shown on product pages and the cart.
// Keep in sync with the WP free-shipping snippet (pickup free >= 150, home free >= 300).
const METHODS = [
  { name: "נקודת חלוקה (UPS)", detail: "₪15, חינם בהזמנה מעל ₪150" },
  { name: "משלוח עד הבית (Sendit)", detail: "₪30, חינם בהזמנה מעל ₪300" },
  { name: "איסוף עצמי בקיבוץ אורים", detail: "חינם, בתיאום מראש" },
];
const DELIVERY_TIME = "זמן אספקה: 1-5 ימי עסקים";

export default function ShippingInfo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm text-right ${compact ? "p-4 mt-4 text-xs" : "p-5 mt-6 text-sm"}`}>
      <div className="font-bold mb-2">משלוחים</div>
      <ul className="space-y-1 text-gray-700">
        {METHODS.map((m) => (
          <li key={m.name}>
            <span className="font-semibold">{m.name}:</span> {m.detail}
          </li>
        ))}
      </ul>
      <p className="text-gray-500 mt-2">
        {DELIVERY_TIME}. לביטול והחזרות, <Link href="/terms/" className="text-brand underline">ראו תקנון</Link>.
      </p>
    </div>
  );
}
