"use client";

// ---------------------------------------------------------------------------
// components/CartInquiryDrawer.tsx — Phase 21B
// ---------------------------------------------------------------------------
// Right-side drawer for the Inquiry Bag (devices + accessories).
//
// Bag modes:
//   Devices only   → no delivery form  · CTA: "Send Inquiry on WhatsApp"
//   Accessories    → delivery form     · CTA: "Send Order Details on WhatsApp"
//   Mixed          → delivery form     · CTA: "Send Inquiry & Order Details on WhatsApp"
//
// RULES (never violate):
//   - No checkout, no payment, no "Place Order", no "Pay Now", no "Buy Now"
//   - Delivery details live in component state only — never localStorage
//   - Final action is WhatsApp — wa.me/923133388666
//   - Device inquiry flow unchanged
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Headphones,
  Laptop,
  MessageCircle,
  Minus,
  Monitor,
  Package,
  Plus,
  Server,
  ShoppingBag,
  Smartphone,
  TabletSmartphone,
  Watch,
  X,
  type LucideIcon,
} from "lucide-react";
import { useShopActions } from "@/context/ShopActionsContext";
import { whatsappLink } from "@/lib/constants";
import {
  buildInquiryMessage,
  isDeliveryComplete,
  type CartItem,
  type DeliveryDetails,
} from "@/lib/shopUtils";

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
// Empty delivery state
// ---------------------------------------------------------------------------

const EMPTY_DELIVERY: DeliveryDetails = {
  name: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
};

// ---------------------------------------------------------------------------
// CartInquiryDrawer
// ---------------------------------------------------------------------------

export default function CartInquiryDrawer() {
  const {
    activeDrawer,
    cartItems,
    closeDrawers,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useShopActions();

  const isOpen = activeDrawer === "cart";
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Delivery details — component memory only, never persisted to localStorage.
  // Component is always mounted (AnimatePresence is internal), so state
  // persists across open/close cycles within the same page session.
  const [delivery, setDelivery] = useState<DeliveryDetails>(EMPTY_DELIVERY);

  const updateDelivery = useCallback(
    (field: keyof DeliveryDetails, value: string) => {
      setDelivery((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetDelivery = useCallback(() => setDelivery(EMPTY_DELIVERY), []);

  // ── Focus management ──
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

  // ── Escape key ──
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawers();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawers]);

  // Body scroll lock managed centrally in ShopActionsContext.

  // ── Derived state ──
  const devices = cartItems.filter((i) => i.productType === "device");
  const accessories = cartItems.filter((i) => i.productType === "accessory");
  const showSections = devices.length > 0 && accessories.length > 0;
  const hasItems = cartItems.length > 0;
  const hasAccessories = accessories.length > 0;
  const formComplete = !hasAccessories || isDeliveryComplete(delivery);
  const ctaEnabled = hasItems && formComplete;

  // CTA label adapts to bag composition
  const ctaLabel =
    devices.length > 0 && accessories.length > 0
      ? "Send Inquiry & Order Details on WhatsApp"
      : accessories.length > 0
      ? "Send Order Details on WhatsApp"
      : "Send Inquiry on WhatsApp";

  // Build WhatsApp message — includes delivery details when accessories present
  const waMessage = buildInquiryMessage(
    cartItems,
    hasAccessories ? delivery : undefined
  );

  // ── Handlers ──
  const handleClearAll = useCallback(() => {
    clearCart();
    resetDelivery();
  }, [clearCart, resetDelivery]);

  const handleSend = useCallback(() => {
    if (!ctaEnabled) return;
    window.open(whatsappLink(waMessage), "_blank", "noopener,noreferrer");
    resetDelivery();
  }, [ctaEnabled, waMessage, resetDelivery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay (desktop/tablet only) ── */}
          <motion.div
            key="cart-overlay"
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
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry Bag"
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
                  Inquiry Bag
                </h2>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6E6E73",
                    letterSpacing: "normal",
                    margin: "2px 0 0",
                  }}
                >
                  Devices are confirmed on WhatsApp. Accessories can be COD.
                </p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeDrawers}
                aria-label="Close Inquiry Bag"
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

            {/* ── Scrollable body ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "8px 0 0",
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
                  <ShoppingBag
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
                    Your Inquiry Bag is empty. Add devices to inquire or
                    accessories to order.
                  </p>
                </div>
              ) : (
                <>
                  {/* Device inquiries */}
                  {devices.length > 0 && (
                    <>
                      {showSections && <SectionHeading label="Device Inquiries" />}
                      {devices.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          onRemove={removeFromCart}
                          onUpdateQty={updateQuantity}
                        />
                      ))}
                    </>
                  )}

                  {/* Accessories */}
                  {accessories.length > 0 && (
                    <>
                      {showSections && <SectionHeading label="Accessories" />}
                      {accessories.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          onRemove={removeFromCart}
                          onUpdateQty={updateQuantity}
                        />
                      ))}
                    </>
                  )}

                  {/* Delivery Details form — only when accessories present */}
                  {hasAccessories && (
                    <DeliveryForm
                      details={delivery}
                      onChange={updateDelivery}
                    />
                  )}
                </>
              )}
            </div>

            {/* ── Footer ── */}
            <div
              style={{
                flexShrink: 0,
                borderTop: "1px solid #E8E8ED",
                padding: "12px 20px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Helper text — shown only when accessories present and form incomplete */}
              {hasAccessories && !formComplete && (
                <p
                  aria-live="polite"
                  style={{
                    fontSize: 12,
                    color: "#6E6E73",
                    letterSpacing: "normal",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Fill in delivery details to continue.
                </p>
              )}

              {/* Clear all */}
              {hasItems && (
                <button
                  onClick={handleClearAll}
                  aria-label="Clear all items from Inquiry Bag"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "#AEAEB2",
                    letterSpacing: "normal",
                    padding: "2px 0",
                    textAlign: "left",
                  }}
                  className="hover:text-[#6E6E73] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                >
                  Clear all
                </button>
              )}

              {/* WhatsApp CTA — button with proper disabled attribute */}
              <button
                onClick={handleSend}
                disabled={!ctaEnabled}
                aria-label={ctaLabel}
                aria-describedby={
                  hasAccessories && !formComplete
                    ? "delivery-helper"
                    : undefined
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 52,
                  width: "100%",
                  borderRadius: 9999,
                  border: "none",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "normal",
                  cursor: ctaEnabled ? "pointer" : "not-allowed",
                  opacity: ctaEnabled ? 1 : 0.45,
                  transition: "opacity 0.15s ease, background-color 0.15s ease",
                }}
                className={
                  ctaEnabled
                    ? "hover:bg-[#1DAE56] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                    : "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                }
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  focusable="false"
                  strokeWidth={2}
                />
                {ctaLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// SectionHeading
// ---------------------------------------------------------------------------

function SectionHeading({ label }: { label: string }) {
  return (
    <div style={{ padding: "10px 20px 4px" }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#AEAEB2",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CartItemRow
// ---------------------------------------------------------------------------

function CartItemRow({
  item,
  onRemove,
  onUpdateQty,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}) {
  const Icon = getIcon(item.categorySlug);
  const isAccessory = item.productType === "accessory";
  const badgeLabel = isAccessory ? "Accessory item" : "Inquiry item";

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
            margin: "0 0 6px",
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
          {/* Badge */}
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
            {badgeLabel}
          </span>

          {/* Accessory quantity controls */}
          {isAccessory ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                disabled={item.quantity <= 1}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: item.quantity <= 1 ? "default" : "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
                className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-full"
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9999,
                    border: "1px solid #E8E8ED",
                    background: "transparent",
                    color: item.quantity <= 1 ? "#D2D2D7" : "#1D1D1F",
                    pointerEvents: "none",
                  }}
                >
                  <Minus size={12} aria-hidden="true" focusable="false" />
                </span>
              </button>

              <span
                style={{
                  minWidth: 24,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1D1D1F",
                  letterSpacing: "normal",
                }}
              >
                {item.quantity}
              </span>

              <button
                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                disabled={item.quantity >= 9}
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  cursor: item.quantity >= 9 ? "default" : "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
                className="focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-full"
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9999,
                    border: "1px solid #E8E8ED",
                    background: "transparent",
                    color: item.quantity >= 9 ? "#D2D2D7" : "#1D1D1F",
                    pointerEvents: "none",
                  }}
                >
                  <Plus size={12} aria-hidden="true" focusable="false" />
                </span>
              </button>
            </div>
          ) : (
            <span
              style={{
                fontSize: 12,
                color: "#AEAEB2",
                letterSpacing: "normal",
              }}
            >
              Qty: 1
            </span>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from Inquiry Bag`}
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

// ---------------------------------------------------------------------------
// DeliveryForm
// ---------------------------------------------------------------------------

function DeliveryForm({
  details,
  onChange,
}: {
  details: DeliveryDetails;
  onChange: (field: keyof DeliveryDetails, value: string) => void;
}) {
  return (
    <div
      style={{
        padding: "16px 20px 20px",
        borderTop: "1px solid #E8E8ED",
        marginTop: 8,
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#1D1D1F",
          letterSpacing: "normal",
          margin: "0 0 14px",
          lineHeight: 1.3,
        }}
      >
        Delivery Details
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Full name */}
        <FieldGroup
          id="delivery-name"
          label="Full name"
          required
        >
          <input
            id="delivery-name"
            type="text"
            value={details.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Your full name"
            required
            aria-required="true"
            autoComplete="name"
            style={inputStyle}
            className={inputClass}
          />
        </FieldGroup>

        {/* Phone */}
        <FieldGroup
          id="delivery-phone"
          label="WhatsApp / phone number"
          required
        >
          <input
            id="delivery-phone"
            type="tel"
            value={details.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="03XX-XXXXXXX"
            required
            aria-required="true"
            autoComplete="tel"
            style={inputStyle}
            className={inputClass}
          />
        </FieldGroup>

        {/* City */}
        <FieldGroup id="delivery-city" label="City" required>
          <input
            id="delivery-city"
            type="text"
            value={details.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="e.g. Rawalpindi, Lahore"
            required
            aria-required="true"
            autoComplete="address-level2"
            style={inputStyle}
            className={inputClass}
          />
        </FieldGroup>

        {/* Address */}
        <FieldGroup
          id="delivery-address"
          label="Complete delivery address"
          required
        >
          <textarea
            id="delivery-address"
            value={details.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Street, area, landmark…"
            required
            aria-required="true"
            autoComplete="street-address"
            rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            className={inputClass}
          />
        </FieldGroup>

        {/* Notes — optional */}
        <FieldGroup id="delivery-notes" label="Order notes" optional>
          <textarea
            id="delivery-notes"
            value={details.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Any special instructions (optional)"
            rows={2}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            className={inputClass}
          />
        </FieldGroup>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FieldGroup — label + input wrapper
// ---------------------------------------------------------------------------

function FieldGroup({
  id,
  label,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "#6E6E73",
          letterSpacing: "normal",
          lineHeight: 1.3,
        }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "#FF3B30", marginLeft: 2 }}>
            *
          </span>
        )}
        {optional && (
          <span style={{ color: "#AEAEB2", marginLeft: 4, fontWeight: 400 }}>
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared input styles
// ---------------------------------------------------------------------------

const inputStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 44,
  padding: "10px 12px",
  fontSize: 14,
  color: "#1D1D1F",
  backgroundColor: "#FFFFFF",
  border: "1.5px solid #D2D2D7",
  borderRadius: 12,
  outline: "none",
  fontFamily: "inherit",
  letterSpacing: "normal",
  boxSizing: "border-box",
};

const inputClass =
  "focus:border-[#0071E3] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] placeholder:text-[#AEAEB2]";
