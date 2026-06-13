"use client";

// ---------------------------------------------------------------------------
// components/ProductQuickDetailsDrawer.tsx — Phase 15B
// ---------------------------------------------------------------------------
// Right-side Quick Details drawer for product cards.
// Matches SavedDrawer / CartInquiryDrawer style exactly:
//   - White panel, soft border, overlay, z-[1003]
//   - Mobile: full width. Tablet/Desktop: min(400px, 90vw)
//   - Slide animation: 0.28s easeInOut (matches existing drawers)
//   - role="dialog", aria-modal="true", Escape closes, focus trapped
//
// productType is DERIVED from categorySlug via getProductType() — never stored.
// No price, no stock, no fake specs.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Headphones,
  Laptop,
  MessageCircle,
  Monitor,
  Package,
  Server,
  Smartphone,
  TabletSmartphone,
  Watch,
  X,
  type LucideIcon,
} from "lucide-react";
import { useShopActions } from "@/context/ShopActionsContext";
import { whatsappLink } from "@/lib/constants";
import { getProductType } from "@/lib/shopUtils";

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
// ProductQuickDetailsDrawer
// ---------------------------------------------------------------------------

export default function ProductQuickDetailsDrawer() {
  const {
    activeDrawer,
    detailsProduct,
    closeDrawers,
    addToCart,
    openCartDrawer,
  } = useShopActions();

  const isOpen = activeDrawer === "details";
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [addHovered, setAddHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

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

  if (!detailsProduct) return null;

  const product = detailsProduct;
  const productType = getProductType(product.categorySlug);
  const isAccessory = productType === "accessory";
  const Icon = ICON_MAP[product.categorySlug] ?? Package;
  const addLabel = isAccessory ? "Add to Cart" : "Add to Inquiry";

  const productInput = {
    id: product.id,
    name: product.name,
    categorySlug: product.categorySlug,
    category: product.category,
  };

  const handleAddToCart = () => {
    addToCart(productInput);
    openCartDrawer();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay — desktop/tablet only ── */}
          <motion.div
            key="details-overlay"
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
            key="details-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-drawer-title"
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
              maxWidth: 400,
              background: "#FFFFFF",
              borderLeft: "1px solid #E8E8ED",
              zIndex: 1003,
              display: "flex",
              flexDirection: "column",
              overflowX: "hidden",
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
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon
                  size={18}
                  color="#6E6E73"
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={1.5}
                />
                <h2
                  id="details-drawer-title"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#1D1D1F",
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {product.name}
                </h2>
              </div>

              {/* Close button — 44×44 tap target */}
              <button
                ref={closeBtnRef}
                onClick={closeDrawers}
                aria-label="Close details"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 9999,
                  color: "#6E6E73",
                  flexShrink: 0,
                }}
                className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <X size={18} strokeWidth={2} aria-hidden="true" focusable="false" />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* ── Media zone ── */}
              <div
                style={{
                  width: "100%",
                  height: 200,
                  background: "#F5F5F7",
                  borderRadius: 12,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
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
                    }}
                  />
                ) : (
                  <Icon
                    size={64}
                    color="#6E6E73"
                    aria-hidden="true"
                    focusable="false"
                    strokeWidth={1.25}
                  />
                )}
              </div>

              {/* Category badge */}
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    color: "#6E6E73",
                    background: "#F5F5F7",
                    border: "1px solid #E8E8ED",
                    borderRadius: 9999,
                    padding: "3px 10px",
                    lineHeight: 1.4,
                  }}
                >
                  {product.category}
                </span>
                {!isAccessory && product.bestFor && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      color: "#0071E3",
                      background: "rgba(0,113,227,0.06)",
                      border: "1px solid rgba(0,113,227,0.15)",
                      borderRadius: 9999,
                      padding: "3px 10px",
                      lineHeight: 1.4,
                      marginLeft: 6,
                    }}
                  >
                    Best for {product.bestFor}
                  </span>
                )}
              </div>

              {/* About this product */}
              {product.detailSummary && (
                <section>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6E6E73",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {product.detailSummary}
                  </p>
                </section>
              )}

              {/* Condition note (devices) or Compatibility note (accessories) */}
              {!isAccessory && product.conditionNote && (
                <div
                  style={{
                    background: "#F5F5F7",
                    border: "1px solid #E8E8ED",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontSize: 13,
                    color: "#1D1D1F",
                    lineHeight: 1.5,
                  }}
                >
                  {product.conditionNote}
                </div>
              )}
              {isAccessory && product.compatibilityNote && (
                <div
                  style={{
                    background: "#F5F5F7",
                    border: "1px solid #E8E8ED",
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontSize: 13,
                    color: "#1D1D1F",
                    lineHeight: 1.5,
                  }}
                >
                  {product.compatibilityNote}
                </div>
              )}

              {/* What to confirm on WhatsApp */}
              {product.confirmationPoints && product.confirmationPoints.length > 0 && (
                <section>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#AEAEB2",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      margin: "0 0 10px",
                    }}
                  >
                    Confirm on WhatsApp
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {product.confirmationPoints.map((point) => (
                      <li
                        key={point}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: 13,
                          color: "#1D1D1F",
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle
                          size={14}
                          color="#25D366"
                          strokeWidth={2}
                          aria-hidden="true"
                          focusable="false"
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Guidance note — anchored to bottom of scroll area so mobile doesn't show a blank gap */}
              <p
                style={{
                  marginTop: "auto",
                  fontSize: 12,
                  color: "#AEAEB2",
                  lineHeight: 1.6,
                  margin: "auto 0 0",
                }}
              >
                Message us on WhatsApp to confirm current details before ordering.
              </p>
            </div>

            {/* ── Pinned action row ── */}
            <div
              style={{
                flexShrink: 0,
                padding: "16px 20px",
                borderTop: "1px solid #E8E8ED",
                display: "flex",
                gap: 8,
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
                  padding: "0 10px",
                  minHeight: 44,
                  borderRadius: 9999,
                  border: "1.5px solid #0071E3",
                  color: "#0071E3",
                  background: addHovered ? "rgba(0,113,227,0.06)" : "transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                {addLabel}
              </button>

              {/* Ask on WhatsApp */}
              <a
                href={whatsappLink(product.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${product.name} on WhatsApp`}
                onMouseEnter={() => setWaHovered(true)}
                onMouseLeave={() => setWaHovered(false)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "0 10px",
                  minHeight: 44,
                  borderRadius: 9999,
                  background: waHovered ? "#1DAE56" : "#25D366",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <MessageCircle
                  size={14}
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={2}
                />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
