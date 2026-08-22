export interface WooImage {
  id: number;
  src: string;
  thumbnail?: string;
  srcset?: string;
  sizes?: string;
  alt?: string;
  name?: string;
}

export interface WooPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_minor_unit: number;
  currency_symbol: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface WooAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  taxonomy: string | null;
  has_variations: boolean;
  terms: WooAttributeTerm[];
}

export interface WooVariationRef {
  id: number;
  attributes: { name: string; value: string }[];
}

// WC default variation (from authenticated wc/v3 `default_attributes`; NOT in Store API).
// Stamped onto variable products at build time so listing cards add the true default.
export interface WooDefaultAttribute {
  id: number;
  name: string;
  option: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  type: string; // simple | variable
  permalink: string;
  description: string;
  short_description: string;
  prices: WooPrices;
  price_html: string;
  on_sale: boolean;
  is_in_stock: boolean;
  images: WooImage[];
  categories: { id: number; name: string; slug: string }[];
  attributes: WooAttribute[];
  variations: WooVariationRef[];
  default_attributes?: WooDefaultAttribute[];
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: WooImage | null;
}

export interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
}

export interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  images: WooImage[];
  prices: WooPrices & { raw_prices?: { price: string } };
  totals: { line_total: string; currency_minor_unit: number };
  variation: { attribute: string; value: string }[];
}

export interface Cart {
  items: CartItem[];
  items_count: number;
  needs_shipping?: boolean;
  shipping_rates?: { package_id: number; shipping_rates: ShippingRate[] }[];
  totals: {
    total_price: string;
    total_items: string;
    total_shipping?: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
}

export interface ShippingRate {
  rate_id: string; // e.g. "flat_rate:5"
  name: string;
  price: string; // minor units
  currency_minor_unit: number;
  selected: boolean;
}

export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  postcode?: string;
  country: string; // "IL"
  email?: string;
  phone?: string;
}

// storefront/v1/pickup-points proxy of ship.co.il PickUpPointModel
export interface PickupPoint {
  PointNumber: string;
  PointName: string;
  PointType: string;
  CityName: string;
  StreetName: string;
  HouseNumber: string;
  Distance: number;
  Phone?: string;
}

export interface OrderResponse {
  order_id: number;
  status: string;
  order_key: string;
}
