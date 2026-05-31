// ---------------------------------------------------------------------------
// components/ProductCategoryTabs.tsx — Phase 16B
// ---------------------------------------------------------------------------
// Apple-style horizontal pill navigation tabs for product listing pages.
// Server Component — no "use client" needed.
//
// Usage:
//   <ProductCategoryTabs activeSlug={null} />          — on /products (All active)
//   <ProductCategoryTabs activeSlug="macbook" />        — on /products/macbook
//   <ProductCategoryTabs activeSlug="accessories" />    — on /products/accessories
//
// Active tab: charcoal #1D1D1F pill, white text, aria-current="page"
// Inactive tab: transparent, #6E6E73 text, #E8E8ED border
// Mobile: horizontally scrollable, no page overflow, hidden scrollbar
// ---------------------------------------------------------------------------

import Link from "next/link";

// ---------------------------------------------------------------------------
// Tab definitions — order is fixed, All first, Accessories last
// ---------------------------------------------------------------------------

const TABS: { label: string; slug: string | null; href: string }[] = [
  { label: "All",         slug: null,          href: "/products" },
  { label: "MacBook",     slug: "macbook",      href: "/products/macbook" },
  { label: "iPhone",      slug: "iphone",       href: "/products/iphone" },
  { label: "iPad",        slug: "ipad",         href: "/products/ipad" },
  { label: "Mac mini",    slug: "mac-mini",     href: "/products/mac-mini" },
  { label: "iMac",        slug: "imac",         href: "/products/imac" },
  { label: "Apple Watch", slug: "apple-watch",  href: "/products/apple-watch" },
  { label: "AirPods",     slug: "airpods",      href: "/products/airpods" },
  { label: "Accessories", slug: "accessories",  href: "/products/accessories" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProductCategoryTabsProps {
  /** categorySlug from the URL param — null on /products (All Products) */
  activeSlug: string | null;
}

export default function ProductCategoryTabs({ activeSlug }: ProductCategoryTabsProps) {
  return (
    <nav
      aria-label="Product categories"
      className="w-full bg-[#F5F5F7]"
      style={{ paddingBottom: "24px" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/*
          Outer wrapper: hides the scrollbar while keeping the row scrollable.
          overflow-x: auto on the inner ul handles the actual scroll.
          This wrapper clips the scrollbar visually.
        */}
        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            // Hide scrollbar cross-browser
            scrollbarWidth: "none",          // Firefox
            msOverflowStyle: "none",         // IE/Edge legacy
          }}
          // Webkit scrollbar hidden via className below
          className="[&::-webkit-scrollbar]:hidden"
        >
          <ul
            role="list"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "8px",
              margin: 0,
              padding: "0 0 2px",           // 2px bottom so focus ring isn't clipped
              listStyle: "none",
              // Right padding so last tab doesn't clip at scroll edge on mobile
              paddingRight: "16px",
            }}
          >
            {TABS.map((tab) => {
              const isActive = tab.slug === activeSlug;

              return (
                <li key={tab.href} style={{ flexShrink: 0 }}>
                  <Link
                    href={tab.href}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "44px",
                      padding: "0 16px",
                      borderRadius: "9999px",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                      // Active styles
                      ...(isActive
                        ? {
                            background: "#1D1D1F",
                            color: "#FFFFFF",
                            border: "1.5px solid #1D1D1F",
                          }
                        : {
                            background: "transparent",
                            color: "#6E6E73",
                            border: "1.5px solid #E8E8ED",
                          }),
                    }}
                    className={
                      isActive
                        ? "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                        : "hover:bg-[#F0F0F2] hover:text-[#1D1D1F] hover:border-[#D2D2D7] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    }
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
