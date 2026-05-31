"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
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
import { FEATURED_PRODUCTS, type FeaturedProduct } from "@/data/featured-products";
import { whatsappLink } from "@/lib/constants";
import { useShopActions } from "@/context/ShopActionsContext";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  Laptop,
  Smartphone,
  TabletSmartphone,
  Server,
  Monitor,
  Watch,
  Headphones,
  Package,
};

const CARD_WIDTH = 252;
const CARD_GAP = 16;
const MARQUEE_SPEED = 44; // px/s — slow, premium feel

// ---------------------------------------------------------------------------
// WhatsApp CTA
// ---------------------------------------------------------------------------

function WhatsAppCTA({ name, message }: { name: string; message: string }) {
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
        padding: "0 16px",
        background: hovered ? "#1DAE56" : "#25D366",
        color: "#FFFFFF",
        borderRadius: 9999,
        minHeight: 44,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "normal",
        textDecoration: "none",
        transition: "background 0.18s ease",
      }}
    >
      <MessageCircle size={15} aria-hidden="true" focusable="false" strokeWidth={2} />
      Ask on WhatsApp
    </a>
  );
}

// ---------------------------------------------------------------------------
// ProductCard — compact featured card.
// Heart save + Ask on WhatsApp only. No "Add to Inquiry/Cart" on featured cards.
// ---------------------------------------------------------------------------

function ProductCard({ product }: { product: FeaturedProduct }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[product.icon];

  const { isSaved, toggleSaved } = useShopActions();
  const saved = isSaved(product.id);

  const handleToggleSaved = () =>
    toggleSaved({
      id: product.id,
      name: product.name,
      categorySlug: product.categorySlug,
      category: product.category,
    });

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_WIDTH,
        flexShrink: 0,
        background: "#FFFFFF",
        borderRadius: 18,
        border: `1px solid ${hovered ? "#D2D2D7" : "#E8E8ED"}`,
        boxShadow: hovered
          ? "0 2px 10px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition:
          "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
      }}
    >
      {/* ── Heart save button — 44×44 tap target, absolutely positioned ── */}
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
            background: "rgba(245,245,247,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
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

      {/* ── Icon + tag row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 32, // breathing room so tag doesn't overlap heart button
        }}
      >
        {Icon && (
          <Icon
            size={26}
            color="#6E6E73"
            aria-hidden="true"
            focusable="false"
            strokeWidth={1.5}
          />
        )}
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
          }}
        >
          {product.tag}
        </span>
      </div>

      {/* ── Product name ── */}
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#1D1D1F",
          lineHeight: 1.25,
          letterSpacing: "normal",
          margin: 0,
        }}
      >
        {product.name}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontSize: 13,
          color: "#6E6E73",
          lineHeight: 1.5,
          letterSpacing: "normal",
          wordSpacing: "normal",
          margin: 0,
          flex: 1,
        }}
      >
        {product.description}
      </p>

      {/* ── WhatsApp CTA — only bottom action on featured cards ── */}
      <WhatsAppCTA name={product.name} message={product.whatsappMessage} />
    </article>
  );
}

// ---------------------------------------------------------------------------
// MarqueeTrack — continuous looping strip (desktop only)
// ---------------------------------------------------------------------------

function MarqueeTrack({
  products,
  paused,
}: {
  products: typeof FEATURED_PRODUCTS;
  paused: boolean;
}) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    let next = x.get() - (MARQUEE_SPEED * delta) / 1000;
    // Seamless reset: when we've scrolled one full set, jump back to origin
    if (next <= -halfWidth) next += halfWidth;
    x.set(next);
  });

  // Render twice so the reset is invisible — second set fills the gap
  const doubled = [...products, ...products];

  return (
    <motion.div
      ref={trackRef}
      style={{
        x,
        display: "flex",
        gap: CARD_GAP,
        width: "max-content",
      }}
    >
      {doubled.map((product, i) => (
        <ProductCard key={`${product.id}-${i}`} product={product} />
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FeaturedProducts — section
// ---------------------------------------------------------------------------

export default function FeaturedProducts() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect desktop after mount — prevents SSR/hydration mismatch
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Marquee only on desktop with no motion preference set
  const showMarquee = isDesktop && !shouldReduceMotion;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="w-full bg-[#F5F5F7]"
        style={{
          // Reduced top padding so this connects naturally to the Category Strip
          paddingTop: "clamp(24px, 3vw, 40px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
        }}
        aria-labelledby="featured-heading"
      >
        {/* ── Section header — constrained to content width ── */}
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
            Browse selected MacBooks, iPhones, iPads, and accessories. Message us on WhatsApp for current availability.
          </p>
        </div>

        {/* ── Product strip — constrained to 1200px content rhythm ── */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {showMarquee ? (
            // Desktop: continuous marquee with soft edge fades, pauses on hover/focus
            <div
              style={{
                overflow: "hidden",
                paddingBottom: 8,
                // Gradient masks fade entering/exiting cards — no hard crop
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 56px, black calc(100% - 56px), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 56px, black calc(100% - 56px), transparent 100%)",
              } as React.CSSProperties}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <MarqueeTrack products={FEATURED_PRODUCTS} paused={isPaused} />
            </div>
          ) : (
            // Mobile / reduced-motion: horizontal scroll strip
            <div
              className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{
                paddingBottom: 8,
                scrollbarWidth: "none",
              } as React.CSSProperties}
            >
              <div style={{ display: "flex", gap: CARD_GAP }}>
                {FEATURED_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
