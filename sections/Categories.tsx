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
        aria-label={`Browse ${category.name}`}
        className="flex flex-col items-center gap-[10px] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-[12px]"
        style={{ width: 96, textDecoration: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Icon tile ── */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#FFFFFF",
            border: "1px solid #E8E8ED",
            boxShadow: hovered
              ? "0 2px 10px rgba(0,0,0,0.07)"
              : "0 1px 4px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {Icon && (
            <Icon
              size={34}
              color="#6E6E73"
              aria-hidden="true"
              focusable="false"
              strokeWidth={1.5}
            />
          )}
        </div>

        {/* ── Category name ── */}
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
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
          </div>

          {/* ── Strip row: [left arrow] [scroll container] [right arrow] ── */}
          <div className="flex items-center gap-3">

            <ArrowButton
              direction="left"
              visible={canScrollLeft}
              onClick={() => handleScroll("left")}
            />

            {/* Horizontal scroll strip — scrollbar hidden across all browsers */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" } as React.CSSProperties}
            >
              <div
                className="flex"
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

            <ArrowButton
              direction="right"
              visible={canScrollRight}
              onClick={() => handleScroll("right")}
            />

          </div>

        </div>
      </section>
    </MotionConfig>
  );
}
