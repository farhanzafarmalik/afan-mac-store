// ---------------------------------------------------------------------------
// Featured Products data — Phase 6B
// ---------------------------------------------------------------------------
// image: null until real local/licensed product assets are available.
// When an image is provided, place it in public/products/ and set the path here.
// The FeaturedProducts component renders the Lucide icon fallback when image is null.
//
// categorySlug is the URL param segment only — e.g. "macbook", "mac-mini".
// Never a full path. Consistent with the Product interface in data/products.ts.
// ---------------------------------------------------------------------------

export interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  /** URL param segment only — e.g. "macbook", "mac-mini". Never a full path. */
  categorySlug: string;
  description: string;
  /** Short condition/quality label displayed as a badge on the card */
  tag: string;
  /** Lucide icon component name — used as fallback when image is null */
  icon: string;
  /** Pre-filled WhatsApp message passed to whatsappLink() */
  whatsappMessage: string;
  /** Local image path e.g. "/products/macbook-pro.webp" — null until assets are ready */
  image: string | null;
}

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "macbook-pro",
    name: "MacBook Pro",
    category: "MacBook",
    categorySlug: "macbook",
    description: "Powerful MacBooks for pro work.",
    tag: "Verified device",
    icon: "Laptop",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in MacBook Pro. Please share current availability and details.",
    image: null,
  },
  {
    id: "macbook-air",
    name: "MacBook Air",
    category: "MacBook",
    categorySlug: "macbook",
    description: "Lightweight MacBooks for daily use.",
    tag: "Verified device",
    icon: "Laptop",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in MacBook Air. Please share current availability and details.",
    image: null,
  },
  {
    id: "iphone",
    name: "iPhone",
    category: "iPhone",
    categorySlug: "iphone",
    description: "Trusted iPhones, ready to use.",
    tag: "Genuine product",
    icon: "Smartphone",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in iPhone. Please share current availability and details.",
    image: null,
  },
  {
    id: "ipad",
    name: "iPad",
    category: "iPad",
    categorySlug: "ipad",
    description: "iPads for work and study.",
    tag: "Genuine product",
    icon: "TabletSmartphone",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in iPad. Please share current availability and details.",
    image: null,
  },
  {
    id: "mac-mini",
    name: "Mac mini",
    category: "Mac mini",
    categorySlug: "mac-mini",
    description: "Compact power for your desk.",
    tag: "Verified device",
    icon: "Server",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in Mac mini. Please share current availability and details.",
    image: null,
  },
  {
    id: "apple-watch",
    name: "Apple Watch",
    category: "Apple Watch",
    categorySlug: "apple-watch",
    description: "Smartwatch for daily use.",
    tag: "Genuine product",
    icon: "Watch",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in Apple Watch. Please share current availability and details.",
    image: null,
  },
  {
    id: "airpods",
    name: "AirPods",
    category: "AirPods",
    categorySlug: "airpods",
    description: "Wireless audio, easy pairing.",
    tag: "Genuine product",
    icon: "Headphones",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in AirPods. Please share current availability and details.",
    image: null,
  },
  {
    id: "accessories",
    name: "Accessories",
    category: "Accessories",
    categorySlug: "accessories",
    description: "Chargers, cables, cases, and more.",
    tag: "Curated selection",
    icon: "Package",
    whatsappMessage:
      "Hi Afan Mac Store, I'm interested in your Accessories. Please share what's currently available.",
    image: null,
  },
];
