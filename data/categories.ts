// ---------------------------------------------------------------------------
// Category data — Phase 5B
// ---------------------------------------------------------------------------
// image: null until real local/licensed product assets are available (Phase 4B).
// When an image is provided, place it in public/categories/ and set the path here.
// The Categories component renders the Lucide icon fallback when image is null.
// ---------------------------------------------------------------------------

export interface Category {
  name: string;
  slug: string;
  description: string;
  /** Lucide icon component name — used as fallback when image is null */
  icon: string;
  /** Local image path e.g. "/categories/macbook.webp" — null until assets are ready */
  image: string | null;
}

export const CATEGORIES: Category[] = [
  {
    name: "MacBook",
    slug: "/products/macbook",
    description: "Laptops for work, study, and creativity.",
    icon: "Laptop",
    image: null,
  },
  {
    name: "iPhone",
    slug: "/products/iphone",
    description: "Smartphones for every need and budget.",
    icon: "Smartphone",
    image: null,
  },
  {
    name: "iPad",
    slug: "/products/ipad",
    description: "Tablets for work, study, and entertainment.",
    icon: "TabletSmartphone",
    image: null,
  },
  {
    name: "Mac mini",
    slug: "/products/mac-mini",
    description: "Compact desktop power for any setup.",
    icon: "Server",
    image: null,
  },
  {
    name: "iMac",
    slug: "/products/imac",
    description: "All-in-one desktop performance.",
    icon: "Monitor",
    image: null,
  },
  {
    name: "Apple Watch",
    slug: "/products/apple-watch",
    description: "Smartwatches for health and connectivity.",
    icon: "Watch",
    image: null,
  },
  {
    name: "AirPods",
    slug: "/products/airpods",
    description: "Wireless audio, effortlessly connected.",
    icon: "Headphones",
    image: null,
  },
  {
    name: "Accessories",
    slug: "/products/accessories",
    description: "Cables, chargers, cases, and more.",
    icon: "Package",
    image: null,
  },
];
