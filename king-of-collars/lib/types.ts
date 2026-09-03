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
  totals: {
    total_price: string;
    total_items: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
}
