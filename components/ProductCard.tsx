"use client";

// ---------------------------------------------------------------------------
// components/ProductCard.tsx — Phase 12B
// ---------------------------------------------------------------------------
// Product listing card — used on /products and /products/[category].
// Three interactive elements per card:
//   1. Heart save button (top-right of image area, 44×44 tap target)
//   2. Add to Inquiry (devices) or Add to Cart (accessories) — 44px min-height
//   3. Ask on WhatsApp — 44px min-height
//
// IMPLEMENTATION_LOCK §8  — devices: "Add to Inquiry" (never "Add to Cart")
// IMPLEMENTATION_LOCK §10 — accessories: "Add to Cart"
// IMPLEMENTATION_LOCK §12 — no "Buy Now", no "Checkout"
// ---------------------------------------------------------------------------

import { useState } from "react";
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
import { whatsappLink } from "@/lib/constants";
import { useShopActions } from "@/context/ShopActionsContext";

// ---------------------------------------------------------------------------
// Icon map
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
// WhatsApp CTA — accepts fill prop to stretch inside a flex row
// ---------------------------------------------------------------------------

function WhatsAppCTA({
  name,
  message,
  fill = false,
}: {
  name: string;
  message: string;
  fill?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ask about ${name} on WhatsApp`}
      className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "0 12px",
        background: hovered ? "#1DAE56" : "#25D366",
        color: "#FFFFFF",
        borderRadius: 9999,
        minHeight: 44,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "normal",
        textDecoration: "none",
        transition: "background 0.18s ease",
        flex: fill ? 1 : undefined,
        flexShrink: fill ? undefined : 0,
        whiteSpace: "nowrap",
      }}
    >
      <MessageCircle
        size={14}
        aria-hidden="true"
        focusable="false"
        strokeWidth={2}
      />
      Ask on WhatsApp
    </a>
  );
}

// ---------------------------------------------------------------------------
// ProductCard
// ---------------------------------------------------------------------------

export default function ProductCard({ product }: { product: Product }) {
  const [cardHovered, setCardHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);

  const { isSaved, toggleSaved, addToCart, openCartDrawer, openDetailsDrawer } = useShopActions();
  const Icon = ICON_MAP[product.categorySlug] ?? Package;
  const saved = isSaved(product.id);
  const isAccessory = product.categorySlug === "accessories";

  // IMPLEMENTATION_LOCK §8 §9 §10
  const addLabel = isAccessory ? "Add to Cart" : "Add to Inquiry";

  const productInput = {
    id: product.id,
    name: product.name,
    categorySlug: product.categorySlug,
    category: product.category,
  };

  const handleToggleSaved = () => toggleSaved(productInput);

  const handleAddToCart = () => {
    addToCart(productInput);
    openCartDrawer();
  };

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
      {/* ── Visual area — icon/image + drawer trigger + heart button ── */}
      <div
        style={{
          height: 176,
          background: "#F9F9F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #E8E8ED",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.80)",
          flexShrink: 0,
          position: "relative",
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
            size={48}
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
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
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
          {/* Visual circle — 28×28 inside the 44×44 button */}
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
              transition: "transform 0.15s ease",
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
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        {/* ── Name + tag row ── */}
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
                letterSpacing: "normal",
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
              letterSpacing: "normal",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {product.tag}
          </span>
        </div>

        {/* ── Short description — minHeight ensures first line always visible, no clipping ── */}
        <p
          style={{
            fontSize: 13,
            color: "#6E6E73",
            lineHeight: 1.5,
            letterSpacing: "normal",
            wordSpacing: "normal",
            margin: 0,
            // Reserve 2 lines so grid rows stay aligned; overflow hidden prevents clipping
            minHeight: "calc(1.5 * 2 * 13px)", // = 39px ≈ 2 lines
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.shortDescription}
        </p>

        {/* ── Detail bullets (max 2–3 safe chips) ── */}
        {product.detailBullets && product.detailBullets.length > 0 && (
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
            {product.detailBullets.slice(0, 3).map((bullet) => (
              <li
                key={bullet}
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
                {bullet}
              </li>
            ))}
          </ul>
        )}

        {/* ── "Details" text trigger ── */}
        <button
          onClick={() => openDetailsDrawer(product)}
          aria-label={`View details for ${product.name}`}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            color: "#0071E3",
            lineHeight: 1.4,
            textDecoration: "none",
            minHeight: 20,
          }}
          className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded hover:underline hover:[text-underline-offset:2px]"
        >
          View details →
        </button>

        {/* ── Button row: Add to Inquiry/Cart + Ask on WhatsApp ── */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {/* Add to Inquiry / Add to Cart */}
          <button
            onClick={handleAddToCart}
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            aria-label={`${addLabel} — ${product.name}`}
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              padding: "0 10px",
              minHeight: 44,
              borderRadius: 9999,
              border: "1.5px solid #0071E3",
              color: "#0071E3",
              background: addHovered ? "rgba(0,113,227,0.06)" : "transparent",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "normal",
              cursor: "pointer",
              transition: "background 0.18s ease",
              whiteSpace: "nowrap",
            }}
            className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
          >
            {addLabel}
          </button>

          {/* Ask on WhatsApp — fills remaining space */}
          <WhatsAppCTA
            name={product.name}
            message={product.whatsappMessage}
            fill
          />
        </div>
      </div>
    </article>
  );
}
