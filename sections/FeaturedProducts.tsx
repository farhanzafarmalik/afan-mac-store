"use client";

// ---------------------------------------------------------------------------
// sections/FeaturedProducts.tsx — Phase 17B
// ---------------------------------------------------------------------------
// Static responsive grid replacing the marquee. 4-col desktop, 2-col tablet,
// 1-col mobile. Sources products from data/products.ts (featured: true).
//
// Per-card: media area + icon fallback + tag + name + description +
//           up to 2 safe chips + Details link + Ask on WhatsApp.
//
// No Add to Inquiry. No Add to Cart. No Buy Now. No price. No stock.
// Heart save + Quick Details drawer + WhatsApp only.
// ---------------------------------------------------------------------------

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Heart,
  Laptop,
  MessageCircle,
  Monitor,
  Package,
  Server,
  Smartphone,
  TabletSmartphone,
  Watch,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/data/products";
import { getFeaturedProducts } from "@/lib/product-utils";
import { whatsappLink } from "@/lib/constants";
import { useShopActions } from "@/context/ShopActionsContext";

// ---------------------------------------------------------------------------
// Icon map — keyed by categorySlug (same as ProductCard)
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  macbook: Laptop,
  iphone: Smartphone,
  ipad: TabletSmartphone,
  "mac-mini": Server,
  imac: Monitor,
  "apple-watch": Watch,
  airpods: Headphones,
  accessories: Package,
};

// ---------------------------------------------------------------------------
// FeaturedCard
// ---------------------------------------------------------------------------

function FeaturedCard({ product }: { product: Product }) {
  const [cardHovered, setCardHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  const { isSaved, toggleSaved, openDetailsDrawer } = useShopActions();
  const Icon = ICON_MAP[product.categorySlug] ?? Package;
  const saved = isSaved(product.id);

  const handleToggleSaved = () =>
    toggleSaved({
      id: product.id,
      name: product.name,
      categorySlug: product.categorySlug,
      category: product.category,
    });

  const chips = product.detailBullets?.slice(0, 2) ?? [];

  return (
    <article
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 18,
        border: `1px solid ${cardHovered ? "#D2D2D7" : "#E8E8ED"}`,
        boxShadow: cardHovered
          ? "0 2px 10px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: cardHovered ? "translateY(-2px)" : "translateY(0)",
        transition:
          "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Media area — 220px tall, image-ready ── */}
      <div
        style={{
          height: 220,
          background: "#F9F9F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #E8E8ED",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background button — opens drawer; sits below heart (z-index 0) */}
        <button
          onClick={() => openDetailsDrawer(product)}
          aria-label={`View details for ${product.name}`}
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 0,
          }}
          className="focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_3px_rgba(0,113,227,0.35)]"
        />

        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.imageAlt ?? `${product.name} product image`}
            loading="lazy"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 16,
              pointerEvents: "none",
            }}
          />
        ) : (
          <Icon
            size={56}
            color="#6E6E73"
            aria-hidden="true"
            focusable="false"
            strokeWidth={1.5}
            style={{ pointerEvents: "none" }}
          />
        )}

        {/* Heart save button — 44×44 tap target, z-index 1 keeps it above drawer trigger */}
        <button
          onClick={handleToggleSaved}
          aria-label={
            saved
              ? `Remove ${product.name} from saved`
              : `Save ${product.name}`
          }
          aria-pressed={saved}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 1,
          }}
          className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-full"
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.90)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            }}
          >
            <Heart
              size={14}
              fill={saved ? "#FF3B30" : "none"}
              strokeWidth={saved ? 0 : 1.5}
              color={saved ? "#FF3B30" : "#6E6E73"}
              aria-hidden="true"
              focusable="false"
            />
          </span>
        </button>
      </div>

      {/* ── Content area ── */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {/* Name + tag row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <h3
            style={{
              margin: 0,
              minHeight: "calc(1.25 * 2 * 17px)",
            }}
          >
            <button
              onClick={() => openDetailsDrawer(product)}
              aria-label={`View details for ${product.name}`}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: 17,
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.25,
                textAlign: "left",
                display: "block",
                width: "100%",
                transition: "color 0.15s ease",
              }}
              className="hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-[4px]"
            >
              {product.name}
            </button>
          </h3>
          <span
            style={{
              fontSize: 11,
              color: "#AEAEB2",
              background: "#F5F5F7",
              border: "1px solid #E8E8ED",
              borderRadius: 9999,
              padding: "2px 8px",
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {product.tag}
          </span>
        </div>

        {/* Short description — minHeight keeps rows aligned, no clipping */}
        <p
          style={{
            fontSize: 13,
            color: "#6E6E73",
            lineHeight: 1.5,
            margin: 0,
            minHeight: "calc(1.5 * 2 * 13px)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.shortDescription}
        </p>

        {/* Safe detail chips — max 2, no fake data */}
        {chips.length > 0 && (
          <ul
            aria-label={`Key details for ${product.name}`}
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {chips.map((chip) => (
              <li
                key={chip}
                style={{
                  fontSize: 11,
                  color: "#6E6E73",
                  background: "#F5F5F7",
                  border: "1px solid #E8E8ED",
                  borderRadius: 9999,
                  padding: "2px 8px",
                  lineHeight: 1.5,
                  whiteSpace: "nowrap",
                }}
              >
                {chip}
              </li>
            ))}
          </ul>
        )}

        {/* Details text link — opens existing Quick Details drawer */}
        <button
          onClick={() => openDetailsDrawer(product)}
          aria-label={`View details for ${product.name}`}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            color: "#0071E3",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
          className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded hover:underline hover:[text-underline-offset:2px]"
        >
          View details →
        </button>

        {/* Ask on WhatsApp — only CTA on featured cards */}
        <a
          href={whatsappLink(product.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${product.name} on WhatsApp`}
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "0 16px",
            background: waHovered ? "#1DAE56" : "#25D366",
            color: "#FFFFFF",
            borderRadius: 9999,
            minHeight: 44,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.18s ease",
            marginTop: "auto",
          }}
          className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
        >
          <MessageCircle
            size={15}
            aria-hidden="true"
            focusable="false"
            strokeWidth={2}
          />
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// FeaturedProducts — section
// ---------------------------------------------------------------------------

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section
      className="w-full bg-[#F5F5F7]"
      style={{
        paddingTop: "clamp(24px, 3vw, 40px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
      }}
      aria-labelledby="featured-heading"
    >
      {/* ── Section header ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-8">
        <p
          className="uppercase font-semibold tracking-[0.10em]"
          style={{ fontSize: "11px", color: "#AEAEB2", marginBottom: "8px" }}
        >
          Featured Products
        </p>
        <h2
          id="featured-heading"
          className="font-semibold text-[#1D1D1F] leading-[1.08] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 3rem)",
            maxWidth: "640px",
            marginBottom: "12px",
          }}
        >
          Popular Apple picks at Afan Mac Store.
        </h2>
        <p
          style={{
            fontSize: "clamp(1rem, 1.25vw + 0.125rem, 1.25rem)",
            color: "#6E6E73",
            maxWidth: "560px",
            margin: 0,
            lineHeight: 1.5,
            letterSpacing: "normal",
            wordSpacing: "normal",
          }}
        >
          Browse selected MacBooks, iPhones, iPads, and accessories. Message
          us on WhatsApp for current availability.
        </p>
      </div>

      {/* ── Static responsive grid ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            // On mobile show only first 4; sm+ shows all 8
            <div key={product.id} className={index >= 4 ? "hidden sm:block" : ""}>
              <FeaturedCard product={product} />
            </div>
          ))}
        </div>

        {/* "View all products" — visible on mobile only, below the 4 shown cards */}
        <div
          className="flex justify-center sm:hidden"
          style={{ marginTop: "32px" }}
        >
          <Link
            href="/products"
            aria-label="View all products"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border-[1.5px] border-[#0071E3] text-[#0071E3] text-[14px] font-semibold no-underline hover:bg-[rgba(0,113,227,0.06)] transition-colors duration-[180ms] ease focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
