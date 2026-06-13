"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, MotionConfig, useInView } from "framer-motion";
import {
  Laptop,
  Smartphone,
  TabletSmartphone,
  Server,
  Monitor,
  Watch,
  Headphones,
  Package,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, type Category } from "@/data/categories";

// ---------------------------------------------------------------------------
// Icon map
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

const SCROLL_AMOUNT = 300;

// ---------------------------------------------------------------------------
// CategoryItem — icon tile + name, no description, no Browse text
// ---------------------------------------------------------------------------

function CategoryItem({
  category,
  index,
  sectionInView,
}: {
  category: Category;
  index: number;
  sectionInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[category.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        duration: 0.36,
        delay: sectionInView ? index * 0.05 : 0,
        ease: "easeOut",
      }}
      style={{ flexShrink: 0 }}
    >
      <Link
        href={category.slug}
        aria-label={`Shop ${category.name}`}
        className="flex flex-col items-center gap-[10px] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-[12px] active:scale-[0.97] transition-transform duration-100"
        style={{ width: 104, textDecoration: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Icon tile ── */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 18,
            background: "#FFFFFF",
            border: `1px solid ${hovered ? "#D2D2D7" : "#E8E8ED"}`,
            boxShadow: hovered
              ? "0 4px 12px rgba(0,0,0,0.09)"
              : "0 1px 4px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            transition:
              "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          }}
        >
          {Icon && (
            <Icon
              size={36}
              strokeWidth={1.75}
              aria-hidden="true"
              focusable="false"
              style={{
                color: hovered ? "#0071E3" : "#6E6E73",
                transition: "color 0.2s ease",
              }}
            />
          )}
        </div>

        {/* ── Category name ── */}
        <span
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#1D1D1F",
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ArrowButton — circular scroll control, invisible when not scrollable
// ---------------------------------------------------------------------------

function ArrowButton({
  direction,
  visible,
  onClick,
}: {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
}) {
  const ArrowIcon = direction === "left" ? ChevronLeft : ChevronRight;
  const label =
    direction === "left"
      ? "Scroll categories left"
      : "Scroll categories right";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className="flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
      style={{
        width: 44,
        height: 44,
        flexShrink: 0,
        background: "#FFFFFF",
        border: "1px solid #E8E8ED",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        cursor: visible ? "pointer" : "default",
        color: "#1D1D1F",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <ArrowIcon size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Categories — horizontal strip section
// ---------------------------------------------------------------------------

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Trigger stagger once the section enters the viewport (vertical scroll)
  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const handleScroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="w-full bg-[#FFFFFF]"
        style={{
          paddingTop: "clamp(64px, 8vw, 96px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
        }}
        aria-labelledby="categories-heading"
      >
        <div ref={sectionRef} className="max-w-[1200px] mx-auto px-4 md:px-8">

          {/* ── Section header ── */}
          <div className="mb-6 lg:mb-8">
            <p
              className="uppercase font-semibold tracking-[0.10em]"
              style={{ fontSize: "11px", color: "#AEAEB2", marginBottom: "8px" }}
            >
              Shop by Category
            </p>
            <div className="flex items-end justify-between gap-4">
              <h2
                id="categories-heading"
                className="font-semibold text-[#1D1D1F] leading-[1.08] tracking-[-0.02em]"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw + 0.25rem, 3rem)",
                  maxWidth: "560px",
                }}
              >
                Find your next Apple device.
              </h2>
              {/* Mobile-only swipe hint — hidden on md+ where arrows are visible */}
              <span
                className="md:hidden flex-shrink-0 self-end"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6E6E73",
                  paddingBottom: "4px",
                  whiteSpace: "nowrap",
                }}
                aria-hidden="true"
              >
                Swipe to browse →
              </span>
            </div>
          </div>

          {/* ── Strip row: [left arrow] [scroll container] [right arrow] ── */}
          {/* Arrows are desktop-only; mobile uses touch-swipe with a gradient fade hint */}
          <div className="flex items-center gap-3">

            <div className="hidden md:flex">
              <ArrowButton
                direction="left"
                visible={canScrollLeft}
                onClick={() => handleScroll("left")}
              />
            </div>

            {/* Scroll container — relative so gradient fade can overlay on mobile */}
            <div className="relative flex-1 min-w-0">
              {/* Mobile right-edge fade: hints more content, never covers a tile */}
              {canScrollRight && (
                <div
                  className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.96))",
                  }}
                />
              )}
              {canScrollLeft && (
                <div
                  className="md:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10"
                  style={{
                    background:
                      "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.96))",
                  }}
                />
              )}

              {/* Horizontal scroll strip — scrollbar hidden across all browsers */}
              <div
                ref={scrollRef}
                className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" } as React.CSSProperties}
              >
                <div
                  className="flex md:justify-center"
                  style={{ gap: "clamp(12px, 2vw, 28px)", paddingBottom: "4px" }}
                >
                  {CATEGORIES.map((category, index) => (
                    <CategoryItem
                      key={category.slug}
                      category={category}
                      index={index}
                      sectionInView={sectionInView}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex">
              <ArrowButton
                direction="right"
                visible={canScrollRight}
                onClick={() => handleScroll("right")}
              />
            </div>

          </div>

        </div>
      </section>
    </MotionConfig>
  );
}
