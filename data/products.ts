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
  /** Alt text for the product image. Required when image is set. */
  imageAlt?: string;
  /** Pre-filled WhatsApp inquiry message */
  whatsappMessage: string;
  /** true if this product appears in homepage Featured Products strip */
  featured?: boolean;
  /** Reserved for Phase 8+ product detail pages — not used in Phase 7B */
  detailsSlug?: string;
  /** Reserved for real spec data — empty array until specs are available */
  specs?: string[];

  // ── Phase 15B: Quick Details fields (safe — no price/stock/specs) ──────────
  /** One or two honest sentences shown in the Quick Details drawer. */
  detailSummary?: string;
  /** 2–3 safe chips shown on the product card. */
  detailBullets?: string[];
  /** What the customer should confirm on WhatsApp — shown in the drawer. */
  confirmationPoints?: string[];
  /** Accessories only — compatibility note shown in the drawer. */
  compatibilityNote?: string;
  /** Devices only — condition availability note shown in the drawer. */
  conditionNote?: string;
  /** Devices only — one use-case tag e.g. "Work", "Study", "Office / Creator". */
  bestFor?: string;
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
    detailSummary:
      "Pre-owned and refurbished MacBook Pro units available. All devices go through a physical inspection before listing.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Work",
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
    detailSummary:
      "Pre-owned and refurbished MacBook Air units available. Lightweight and reliable — ideal for study and daily use.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Work / Study",
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
    detailSummary:
      "Genuine iPhones available in multiple conditions. All units are physically checked before listing.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Daily use",
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
    detailSummary:
      "iPad units available in multiple conditions. Great for study, work, and creative tasks.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Study / Work",
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
    detailSummary:
      "Pre-owned Mac mini units available. A compact and powerful desktop solution for home and office.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Office",
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
    detailSummary:
      "Pre-owned iMac units available. A capable all-in-one desktop for home, office, and creative work.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Office / Creator",
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
    detailSummary:
      "Genuine Apple Watch units available in multiple conditions. Confirm current model and condition on WhatsApp.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Daily use",
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
    detailSummary:
      "Genuine AirPods available in multiple conditions. Confirm current model and availability on WhatsApp.",
    detailBullets: [
      "Multiple conditions available",
      "WhatsApp inquiry required",
      "15-day checking warranty",
    ],
    confirmationPoints: [
      "Current availability",
      "Condition (e.g. Open Box, Refurbished, Used)",
      "Price for selected condition",
      "Warranty and checking period",
    ],
    conditionNote: "Available in multiple conditions — confirm via WhatsApp.",
    bestFor: "Daily use",
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
    featured: true,
    detailSummary:
      "Apple-compatible charging adapter available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible charging adapter available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible MacBook charging adapter available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible MacBook charging adapter available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible MacBook charging adapter available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible braided cable available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible braided cable available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with Apple devices.",
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
    detailSummary:
      "Apple-compatible MagSafe charger available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with iPhone (MagSafe-compatible models).",
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
    detailSummary:
      "Curated MacBook sleeve available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with MacBook models.",
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
    detailSummary:
      "Curated hard shell MacBook case available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with MacBook models.",
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
    detailSummary:
      "Curated foldable laptop stand available for order. Price and availability confirmed on WhatsApp before shipment.",
    detailBullets: [
      "Apple-device compatible",
      "Price confirmed on WhatsApp",
      "COD available after confirmation",
    ],
    confirmationPoints: [
      "Current price",
      "Stock availability",
      "COD delivery details and coverage area",
    ],
    compatibilityNote: "Compatible with MacBook and other laptops.",
  },
];
