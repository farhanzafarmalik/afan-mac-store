// ---------------------------------------------------------------------------
// Product data — Phase 7B
// ---------------------------------------------------------------------------
// image: null until real local/licensed product assets are available.
//
// categorySlug: URL param segment only — e.g. "macbook", "mac-mini".
//   Used as the [category] dynamic param and in getProductsByCategory().
//   Never a full path.
//
// categoryHref: full navigation path — e.g. "/products/macbook".
//   Used for Links and navigation; never stored as categorySlug.
//
// price field does not exist on this interface — no accidental price rendering.
// ---------------------------------------------------------------------------

export interface Product {
  id: string;
  name: string;
  /** Display category name e.g. "MacBook" */
  category: string;
  /** URL param segment only — e.g. "macbook", "mac-mini". Never a full path. */
  categorySlug: string;
  /** Full navigation href — e.g. "/products/macbook" */
  categoryHref: string;
  shortDescription: string;
  /** Condition/quality badge e.g. "Verified device" */
  tag: string;
  /** Optional extended condition label — not shown until real data available */
  conditionLabel?: string;
  /** null until real local/licensed assets are ready */
  image: string | null;
  /** Pre-filled WhatsApp inquiry message */
  whatsappMessage: string;
  /** true if this product appears in homepage Featured Products strip */
  featured?: boolean;
  /** Reserved for Phase 8+ product detail pages — not used in Phase 7B */
  detailsSlug?: string;
  /** Reserved for real spec data — empty array until specs are available */
  specs?: string[];
}

export const PRODUCTS: Product[] = [
  // ── MacBook ──────────────────────────────────────────────────────────────
  {
    id: "macbook-pro",
    name: "MacBook Pro",
    category: "MacBook",
    categorySlug: "macbook",
    categoryHref: "/products/macbook",
    shortDescription: "Powerful MacBooks for pro work.",
    tag: "Verified device",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in MacBook Pro. Please share current availability and details.",
    featured: true,
  },
  {
    id: "macbook-air",
    name: "MacBook Air",
    category: "MacBook",
    categorySlug: "macbook",
    categoryHref: "/products/macbook",
    shortDescription: "Lightweight MacBooks for daily use.",
    tag: "Verified device",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in MacBook Air. Please share current availability and details.",
    featured: true,
  },

  // ── iPhone ───────────────────────────────────────────────────────────────
  {
    id: "iphone",
    name: "iPhone",
    category: "iPhone",
    categorySlug: "iphone",
    categoryHref: "/products/iphone",
    shortDescription: "Trusted iPhones, ready to use.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in iPhone. Please share current availability and details.",
    featured: true,
  },

  // ── iPad ─────────────────────────────────────────────────────────────────
  {
    id: "ipad",
    name: "iPad",
    category: "iPad",
    categorySlug: "ipad",
    categoryHref: "/products/ipad",
    shortDescription: "iPads for work and study.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in iPad. Please share current availability and details.",
    featured: true,
  },

  // ── Mac mini ─────────────────────────────────────────────────────────────
  {
    id: "mac-mini",
    name: "Mac mini",
    category: "Mac mini",
    categorySlug: "mac-mini",
    categoryHref: "/products/mac-mini",
    shortDescription: "Compact power for your desk.",
    tag: "Verified device",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in Mac mini. Please share current availability and details.",
    featured: true,
  },

  // ── iMac ─────────────────────────────────────────────────────────────────
  {
    id: "imac",
    name: "iMac",
    category: "iMac",
    categorySlug: "imac",
    categoryHref: "/products/imac",
    shortDescription: "All-in-one desktop power.",
    tag: "Verified device",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in iMac. Please share current availability and details.",
    featured: false,
  },

  // ── Apple Watch ──────────────────────────────────────────────────────────
  {
    id: "apple-watch",
    name: "Apple Watch",
    category: "Apple Watch",
    categorySlug: "apple-watch",
    categoryHref: "/products/apple-watch",
    shortDescription: "Smartwatch for daily use.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in Apple Watch. Please share current availability and details.",
    featured: true,
  },

  // ── AirPods ──────────────────────────────────────────────────────────────
  {
    id: "airpods",
    name: "AirPods",
    category: "AirPods",
    categorySlug: "airpods",
    categoryHref: "/products/airpods",
    shortDescription: "Wireless audio, easy pairing.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in AirPods. Please share current availability and details.",
    featured: true,
  },

  // ── Accessories (exactly 11 items) ───────────────────────────────────────
  {
    id: "adapter-20w",
    name: "20W USB-C iPhone Adapter",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Fast charging adapter for iPhone.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the 20W USB-C iPhone Adapter. Please share current availability and details.",
    featured: false,
  },
  {
    id: "adapter-30w",
    name: "30W USB-C iPhone Adapter",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Fast charging adapter for iPhone and iPad.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the 30W USB-C iPhone Adapter. Please share current availability and details.",
    featured: false,
  },
  {
    id: "adapter-45w",
    name: "45W USB-C MacBook Adapter",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Compact adapter for MacBook charging.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the 45W USB-C MacBook Adapter. Please share current availability and details.",
    featured: false,
  },
  {
    id: "adapter-67w",
    name: "67W USB-C MacBook Adapter",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Fast charging adapter for MacBook Pro and Air.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the 67W USB-C MacBook Adapter. Please share current availability and details.",
    featured: false,
  },
  {
    id: "adapter-96w",
    name: "96W USB-C MacBook Adapter",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "High-power adapter for MacBook Pro.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the 96W USB-C MacBook Adapter. Please share current availability and details.",
    featured: false,
  },
  {
    id: "cable-usbc-usbc",
    name: "Braided USB-C to USB-C Cable",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Durable braided cable for charging and data.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the Braided USB-C to USB-C Cable. Please share current availability and details.",
    featured: false,
  },
  {
    id: "cable-usbc-lightning",
    name: "Braided USB-C to Lightning Cable",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Braided cable for iPhone and older devices.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the Braided USB-C to Lightning Cable. Please share current availability and details.",
    featured: false,
  },
  {
    id: "magsafe-charger",
    name: "MagSafe Charger",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Magnetic wireless charging for iPhone.",
    tag: "Genuine product",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the MagSafe Charger. Please share current availability and details.",
    featured: false,
  },
  {
    id: "macbook-sleeve",
    name: "MacBook Sleeve",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Slim protective sleeve for MacBook.",
    tag: "Curated selection",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the MacBook Sleeve. Please share current availability and details.",
    featured: false,
  },
  {
    id: "macbook-case",
    name: "Hard Shell MacBook Case",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Hard shell protection for MacBook.",
    tag: "Curated selection",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the Hard Shell MacBook Case. Please share current availability and details.",
    featured: false,
  },
  {
    id: "laptop-stand",
    name: "Foldable Laptop Stand",
    category: "Accessories",
    categorySlug: "accessories",
    categoryHref: "/products/accessories",
    shortDescription: "Adjustable stand for better posture.",
    tag: "Curated selection",
    image: null,
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in the Foldable Laptop Stand. Please share current availability and details.",
    featured: false,
  },
];
