// ---------------------------------------------------------------------------
// Product utilities — Phase 7B
// ---------------------------------------------------------------------------
// All slug comparisons use param-only categorySlug values (e.g. "macbook",
// "mac-mini") — never full paths like "/products/macbook".
// ---------------------------------------------------------------------------

import { PRODUCTS, type Product } from "@/data/products";

export interface CategoryMeta {
  /** URL param segment — matches [category] dynamic route segment */
  slug: string;
  /** Display name e.g. "MacBook" */
  name: string;
  /** Page h1 */
  h1: string;
  /** Short subtext shown below h1 */
  subtext: string;
  /** Category-level WhatsApp inquiry message */
  whatsappMessage: string;
}

// ---------------------------------------------------------------------------
// Category meta — one entry per approved category slug
// ---------------------------------------------------------------------------

const CATEGORY_META: CategoryMeta[] = [
  {
    slug: "macbook",
    name: "MacBook",
    h1: "MacBooks at Afan Mac Store",
    subtext:
      "Genuine MacBooks for work, study, and creativity. Message us to find the right one.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for MacBook. Please share current options and availability.",
  },
  {
    slug: "iphone",
    name: "iPhone",
    h1: "iPhones at Afan Mac Store",
    subtext: "Trusted iPhones, ready to use. Message us for current availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for iPhone. Please share current options and availability.",
  },
  {
    slug: "ipad",
    name: "iPad",
    h1: "iPads at Afan Mac Store",
    subtext: "iPads for work and study. Message us for availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for iPad. Please share current options and availability.",
  },
  {
    slug: "mac-mini",
    name: "Mac mini",
    h1: "Mac mini at Afan Mac Store",
    subtext: "Compact Apple desktop power. Message us for current availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for Mac mini. Please share current options and availability.",
  },
  {
    slug: "imac",
    name: "iMac",
    h1: "iMacs at Afan Mac Store",
    subtext: "All-in-one desktop power. Message us for current availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for iMac. Please share current options and availability.",
  },
  {
    slug: "apple-watch",
    name: "Apple Watch",
    h1: "Apple Watch at Afan Mac Store",
    subtext: "Apple Watches for daily use. Message us for current availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for Apple Watch. Please share current options and availability.",
  },
  {
    slug: "airpods",
    name: "AirPods",
    h1: "AirPods at Afan Mac Store",
    subtext: "AirPods for everyday listening. Message us for current availability.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for AirPods. Please share current options and availability.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    h1: "Accessories at Afan Mac Store",
    subtext: "Cables, adapters, cases, and more. Ask us what's in stock.",
    whatsappMessage:
      "Hi Afan Mac Store, I'm looking for Accessories. Please share what's currently available.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns all 19 products — used by /products (All Products) page */
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

/** Returns products marked featured: true — used by the homepage Featured Products section */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured === true);
}

/**
 * Returns products whose categorySlug param matches the given slug.
 * Compare against param-only values — e.g. "macbook", "mac-mini".
 * Never pass a full path like "/products/macbook".
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Returns page copy for a given category param slug.
 * Returns undefined for unknown slugs — callers should call notFound().
 */
export function getCategoryMeta(categorySlug: string): CategoryMeta | undefined {
  return CATEGORY_META.find((m) => m.slug === categorySlug);
}
