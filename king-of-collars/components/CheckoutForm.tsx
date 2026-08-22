"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { updateCustomer, selectShippingRate, placeOrder } from "@/lib/cart";
import { getPickupPoints } from "@/lib/pickup";
import { formatPrice } from "@/lib/woo";
import type { Address, PickupPoint } from "@/lib/types";

// Shipping method instance ids in WC zone "ישראל" (zone 2). If a method is re-created
// in wp-admin the instance id changes — update here.
const RATES = {
  pickup: { id: "flat_rate:5", label: "איסוף מנקודת חלוקה (UPS)", cost: 15, freeFrom: 199 },
  home: { id: "flat_rate:2", label: "משלוח עד הבית", cost: 30, freeFrom: 299 },
  self: { id: "local_pickup:4", label: "איסוף עצמי בקיבוץ אורים", cost: 0, freeFrom: 0 },
} as const;
type Method = keyof typeof RATES;

const input =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand";

export default function CheckoutForm() {
  const router = useRouter();
  const { cart } = useCart();
  const items = cart?.items ?? [];

  const [contact, setContact] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [method, setMethod] = useState<Method>("pickup");
  // pickup-point search
  const [search, setSearch] = useState({ city: "", street: "", number: "" });
  const [points, setPoints] = useState<PickupPoint[] | null>(null);
  const [point, setPoint] = useState<PickupPoint | null>(null);
  const [searching, setSearching] = useState(false);
  // home delivery
  const [home, setHome] = useState({ city: "", street: "", number: "", apartment: "", zip: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!cart) return <p className="text-gray-500 py-8 text-center">טוען עגלה…</p>;
  if (items.length === 0)
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">העגלה ריקה — אין מה לשלם 🐾</p>
        <Link href="/products/" className="text-brand font-semibold">לכל המוצרים →</Link>
      </div>
    );

  const minor = cart.totals.currency_minor_unit;
  const subtotalMajor = Number(cart.totals.total_items) / Math.pow(10, minor);
  const rate = RATES[method];
  const shippingMajor = rate.freeFrom && subtotalMajor >= rate.freeFrom ? 0 : rate.cost;
  const totalMinor = Number(cart.totals.total_items) + shippingMajor * Math.pow(10, minor);

  const canSearch = search.city.trim() && search.street.trim();
  const ready =
    contact.firstName.trim() &&
    contact.lastName.trim() &&
    /^0\d{8,9}$/.test(contact.phone.replace(/[- ]/g, "")) &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    (method === "pickup" ? !!point : true) &&
    (method === "home" ? home.city.trim() && home.street.trim() && home.number.trim() : true);

  async function findPoints() {
    setSearching(true);
    setError(null);
    setPoint(null);
    try {
      setPoints(await getPickupPoints(search.city.trim(), search.street.trim(), search.number.trim() || "1"));
    } catch {
      setError("לא הצלחנו לטעון נקודות איסוף כרגע. נסו שוב, או בחרו משלוח עד הבית.");
      setPoints(null);
    } finally {
      setSearching(false);
    }
  }

  async function submit() {
    setPlacing(true);
    setError(null);
    try {
      const base = {
        first_name: contact.firstName.trim(),
        last_name: contact.lastName.trim(),
        country: "IL",
        email: contact.email.trim(),
        phone: contact.phone.trim(),
      };
      let shipping: Address;
      let note = "";
      if (method === "pickup" && point) {
        shipping = {
          ...base,
          address_1: `${point.StreetName} ${point.HouseNumber}`,
          address_2: `נקודת איסוף: ${point.PointName} (#${point.PointNumber})`,
          city: point.CityName,
        };
        note = `משלוח לנקודת איסוף UPS: ${point.PointName} #${point.PointNumber}, ${point.StreetName} ${point.HouseNumber}, ${point.CityName}`;
      } else if (method === "home") {
        shipping = {
          ...base,
          address_1: `${home.street.trim()} ${home.number.trim()}`,
          address_2: home.apartment.trim(),
          city: home.city.trim(),
          postcode: home.zip.trim(),
        };
      } else {
        shipping = { ...base, address_1: "איסוף עצמי — אור המדבר", city: "קיבוץ אורים" };
        note = "איסוף עצמי מאור המדבר, קיבוץ אורים (054-7766343)";
      }
      await updateCustomer(shipping);
      await selectShippingRate(rate.id);
      const order = await placeOrder(shipping, shipping, note);
      router.push(`/checkout/thanks/?order=${order.order_id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "אירעה שגיאה בשליחת ההזמנה. נסו שוב.");
      setPlacing(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Contact */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">פרטי התקשרות</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className={input} placeholder="שם פרטי *" autoComplete="given-name" value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} />
          <input className={input} placeholder="שם משפחה *" autoComplete="family-name" value={contact.lastName} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} />
          <input className={input} placeholder="טלפון נייד *" type="tel" dir="ltr" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          <input className={input} placeholder="אימייל *" type="email" dir="ltr" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
        </div>
      </section>

      {/* Delivery method */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">אופן המשלוח</h2>
        <div className="space-y-3" role="radiogroup" aria-label="אופן המשלוח">
          {(Object.keys(RATES) as Method[]).map((m) => {
            const r = RATES[m];
            const free = r.freeFrom > 0 && subtotalMajor >= r.freeFrom;
            return (
              <label key={m} className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer ${method === m ? "border-brand ring-1 ring-brand" : "border-gray-200"}`}>
                <input type="radio" name="method" className="accent-brand" checked={method === m} onChange={() => setMethod(m)} />
                <span className="flex-1">{r.label}</span>
                <span className="font-semibold text-sm whitespace-nowrap">
                  {r.cost === 0 || free ? "חינם" : `₪${r.cost}`}
                  {r.freeFrom > 0 && !free && <span className="block text-xs font-normal text-gray-500">חינם מעל ₪{r.freeFrom}</span>}
                </span>
              </label>
            );
          })}
        </div>

        {method === "pickup" && (
          <div className="mt-5 border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">איפה נוח לכם לאסוף? נמצא את הנקודות הקרובות לכתובת שלכם.</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input className={`${input} sm:col-span-1`} placeholder="עיר *" value={search.city} onChange={(e) => setSearch({ ...search, city: e.target.value })} />
              <input className={`${input} sm:col-span-1`} placeholder="רחוב *" value={search.street} onChange={(e) => setSearch({ ...search, street: e.target.value })} />
              <input className={`${input} sm:col-span-1`} placeholder="מספר בית" inputMode="numeric" value={search.number} onChange={(e) => setSearch({ ...search, number: e.target.value })} />
              <button type="button" onClick={findPoints} disabled={!canSearch || searching} className="bg-brand text-white rounded-lg px-4 py-2.5 font-semibold disabled:opacity-50">
                {searching ? "מחפש…" : "חיפוש נקודות"}
              </button>
            </div>
            {points && points.length === 0 && <p className="text-sm text-gray-500 mt-3">לא נמצאו נקודות איסוף לכתובת הזו.</p>}
            {points && points.length > 0 && (
              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto" role="radiogroup" aria-label="בחירת נקודת איסוף">
                {points.map((p) => (
                  <label key={p.PointNumber} className={`flex items-start gap-3 border rounded-xl px-4 py-3 cursor-pointer ${point?.PointNumber === p.PointNumber ? "border-brand ring-1 ring-brand" : "border-gray-200"}`}>
                    <input type="radio" name="point" className="accent-brand mt-1" checked={point?.PointNumber === p.PointNumber} onChange={() => setPoint(p)} />
                    <span className="flex-1 text-sm">
                      <span className="font-semibold block">{p.PointName}</span>
                      <span className="text-gray-600">{p.StreetName} {p.HouseNumber}, {p.CityName}</span>
                      <span className="text-gray-400 block text-xs">{p.PointType === "Locker" ? "לוקר" : "חנות"} · {p.Distance.toFixed(1)} ק״מ</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {method === "home" && (
          <div className="mt-5 border-t pt-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input className={input} placeholder="עיר *" autoComplete="address-level2" value={home.city} onChange={(e) => setHome({ ...home, city: e.target.value })} />
            <input className={input} placeholder="רחוב *" autoComplete="address-line1" value={home.street} onChange={(e) => setHome({ ...home, street: e.target.value })} />
            <input className={input} placeholder="מספר בית *" inputMode="numeric" value={home.number} onChange={(e) => setHome({ ...home, number: e.target.value })} />
            <input className={input} placeholder="דירה / כניסה" value={home.apartment} onChange={(e) => setHome({ ...home, apartment: e.target.value })} />
            <input className={input} placeholder="מיקוד (לא חובה)" inputMode="numeric" autoComplete="postal-code" value={home.zip} onChange={(e) => setHome({ ...home, zip: e.target.value })} />
          </div>
        )}
      </section>

      {/* Summary + place order */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">סיכום הזמנה</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt>מוצרים ({cart.items_count})</dt><dd>{formatPrice(cart.totals.total_items, { currency_minor_unit: minor, currency_symbol: cart.totals.currency_symbol })}</dd></div>
          <div className="flex justify-between"><dt>{rate.label}</dt><dd>{shippingMajor === 0 ? "חינם" : `₪${shippingMajor}`}</dd></div>
          <div className="flex justify-between font-bold text-base border-t pt-2"><dt>סה״כ לתשלום</dt><dd>{formatPrice(totalMinor, { currency_minor_unit: minor, currency_symbol: cart.totals.currency_symbol })}</dd></div>
        </dl>
        {error && <p className="text-sale text-sm mt-4" role="alert">{error}</p>}
        <button onClick={submit} disabled={!ready || placing} className="w-full bg-brand hover:bg-brand-dark text-white rounded-full py-3.5 font-bold mt-5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {placing ? "שולח הזמנה…" : "ביצוע הזמנה"}
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          לאחר ביצוע ההזמנה ניצור איתכם קשר בוואטסאפ להשלמת התשלום. תשלום מאובטח באתר — בקרוב.
        </p>
      </section>
    </div>
  );
}
