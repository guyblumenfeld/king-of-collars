"use client";
import type { PickupPoint } from "./types";

// Pickup points come from a WP-side proxy (WPCode snippet, storefront/v1/pickup-points)
// because the ship.co.il Bearer token must never reach the browser.
const PUBLIC_WP = process.env.NEXT_PUBLIC_WP_ORIGIN || "";
const ENDPOINT = PUBLIC_WP
  ? `${PUBLIC_WP}/wp-json/storefront/v1/pickup-points`
  : "/wpapi/storefront/v1/pickup-points";

// ponytail: dev-only mock so the checkout flow is testable before the WP snippet is
// activated; production always goes through the proxy.
const DEV_MOCK: PickupPoint[] = [
  { PointNumber: "101", PointName: "סופר יודה", PointType: "Store", CityName: "באר שבע", StreetName: "רינגלבלום", HouseNumber: "28", Distance: 0.4, Phone: "08-1234567" },
  { PointNumber: "102", PointName: "לוקר UPS קניון הנגב", PointType: "Locker", CityName: "באר שבע", StreetName: "שדרות דוד טוביהו", HouseNumber: "125", Distance: 1.2 },
  { PointNumber: "103", PointName: "מינימרקט הצפון", PointType: "Store", CityName: "באר שבע", StreetName: "יעקב כהן", HouseNumber: "3", Distance: 2.1, Phone: "08-7654321" },
];

export async function getPickupPoints(
  city: string,
  street: string,
  houseNumber: string
): Promise<PickupPoint[]> {
  const q = new URLSearchParams({ city, street, houseNumber });
  try {
    const res = await fetch(`${ENDPOINT}?${q}`, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`pickup-points ${res.status}`);
    const data = await res.json();
    return (data.Points ?? []) as PickupPoint[];
  } catch (e) {
    if (process.env.NODE_ENV === "development") return DEV_MOCK;
    throw e;
  }
}
