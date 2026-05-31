"use client";

// ---------------------------------------------------------------------------
// components/SavedDrawer.tsx — Phase 12B
// ---------------------------------------------------------------------------
// Right-side drawer for saved/wished products.
// Mobile: full width. Desktop/tablet: max 400px.
// Final CTA: "Send Saved List on WhatsApp" — never "Checkout".
// ---------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Laptop,
  MessageCircle,
  Monitor,
  Package,
  Server,
  Smartphone,
  TabletSmartphone,
  Watch,
  Headphones,
  X,
  type LucideIcon,
} from "lucide-react";
import { useShopActions } from "@/context/ShopActionsContext";
import { whatsappLink } from "@/lib/constants";
import { buildSavedMessage, type SavedItem } from "@/lib/shopUtils";

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

function getIcon(slug: string): LucideIcon {
  return ICON_MAP[slug] ?? Package;
}

// ---------------------------------------------------------------------------
// SavedDrawer
// ---------------------------------------------------------------------------

export default function SavedDrawer() {
  const {
    activeDrawer,
    savedItems,
    closeDrawers,
    removeSaved,
    clearSaved,
    moveSavedToCart,
  } = useShopActions();

  const isOpen = activeDrawer === "saved";
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawers();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawers]);

  // Body scroll lock is managed centrally in ShopActionsContext.

  const waMessage = buildSavedMessage(savedItems);
  const hasItems = savedItems.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay (desktop/tablet only) ── */}
          <motion.div
            key="saved-overlay"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={closeDrawers}
            className="hidden sm:block"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1002,
              background: "rgba(0,0,0,0.28)",
            }}
          />

          {/* ── Drawer panel ── */}
          <motion.div
            key="saved-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Saved products"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              maxWidth: "400px",
              zIndex: 1003,
              backgroundColor: "#FFFFFF",
              borderLeft: "1px solid #E8E8ED",
              boxShadow: "-2px 0 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E8E8ED",
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#1D1D1F",
                    letterSpacing: "normal",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Saved
                </h2>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6E6E73",
                    letterSpacing: "normal",
                    margin: "2px 0 0",
                  }}
                >
                  {hasItems
                    ? `${savedItems.length} product${savedItems.length !== 1 ? "s" : ""}`
                    : "No saved products"}
                </p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeDrawers}
                aria-label="Close saved drawer"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#1D1D1F",
                  flexShrink: 0,
                }}
                className="hover:bg-[#F5F5F7] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <X size={18} aria-hidden="true" focusable="false" />
              </button>
            </div>

            {/* ── Item list ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "8px 0",
              }}
            >
              {!hasItems ? (
                /* Empty state */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "56px 24px",
                    textAlign: "center",
                    gap: 14,
                  }}
                >
                  <Heart
                    size={40}
                    color="#D2D2D7"
                    aria-hidden="true"
                    focusable="false"
                    strokeWidth={1.5}
                  />
                  <p
                    style={{
                      fontSize: 15,
                      color: "#6E6E73",
                      letterSpacing: "normal",
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: 240,
                    }}
                  >
                    No saved products yet. Tap the ♡ on any product to save it.
                  </p>
                </div>
              ) : (
                savedItems.map((item) => (
                  <SavedItemRow
                    key={item.id}
                    item={item}
                    onRemove={removeSaved}
                    onMove={moveSavedToCart}
                  />
                ))
              )}
            </div>

            {/* ── Footer ── */}
            <div
              style={{
                flexShrink: 0,
                borderTop: "1px solid #E8E8ED",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {hasItems && (
                <button
                  onClick={clearSaved}
                  aria-label="Clear all saved items"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "#AEAEB2",
                    letterSpacing: "normal",
                    padding: "4px 0",
                    textAlign: "left",
                  }}
                  className="hover:text-[#6E6E73] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                >
                  Clear all
                </button>
              )}

              {/* IMPLEMENTATION_LOCK §11 — Final CTA */}
              <a
                href={hasItems ? whatsappLink(waMessage) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send saved list on WhatsApp"
                aria-disabled={!hasItems}
                onClick={!hasItems ? (e) => e.preventDefault() : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 52,
                  borderRadius: 9999,
                  backgroundColor: hasItems ? "#25D366" : "#D2D2D7",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "normal",
                  textDecoration: "none",
                  pointerEvents: hasItems ? "auto" : "none",
                  cursor: hasItems ? "pointer" : "default",
                  transition: "background-color 0.15s ease",
                }}
                className={
                  hasItems
                    ? "hover:bg-[#1DAE56] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    : undefined
                }
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={2}
                />
                Send Saved List on WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// SavedItemRow
// ---------------------------------------------------------------------------

function SavedItemRow({
  item,
  onRemove,
  onMove,
}: {
  item: SavedItem;
  onRemove: (id: string) => void;
  onMove: (id: string) => void;
}) {
  const Icon = getIcon(item.categorySlug);
  // IMPLEMENTATION_LOCK §8 §10 — device="Add to Inquiry", accessory="Add to Cart"
  const moveLabel =
    item.productType === "device" ? "Add to Inquiry" : "Add to Cart";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 20px",
        borderBottom: "1px solid #F5F5F7",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F5F7",
          borderRadius: 10,
        }}
      >
        <Icon
          size={22}
          color="#6E6E73"
          aria-hidden="true"
          focusable="false"
          strokeWidth={1.5}
        />
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          className="line-clamp-1"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1D1D1F",
            letterSpacing: "normal",
            margin: "0 0 2px",
            lineHeight: 1.3,
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#6E6E73",
            letterSpacing: "normal",
            margin: "0 0 8px",
          }}
        >
          {item.category}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {/* Type badge */}
          <span
            style={{
              fontSize: 10,
              color: "#6E6E73",
              background: "#F5F5F7",
              border: "1px solid #E8E8ED",
              borderRadius: 9999,
              padding: "2px 8px",
              letterSpacing: "normal",
              whiteSpace: "nowrap",
            }}
          >
            {item.productType === "device" ? "Device" : "Accessory"}
          </span>

          {/* Move to bag */}
          <button
            onClick={() => onMove(item.id)}
            aria-label={`${moveLabel} — ${item.name}`}
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#0071E3",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 0",
              letterSpacing: "normal",
            }}
            className="hover:underline focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
          >
            {moveLabel}
          </button>
        </div>
      </div>

      {/* Remove button — 44×44 tap target */}
      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from saved`}
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#AEAEB2",
          borderRadius: 9999,
        }}
        className="hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
      >
        <X size={16} aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
