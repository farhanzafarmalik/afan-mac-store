"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/constants";
import { useShopActions } from "@/context/ShopActionsContext";

const WHATSAPP_MSG =
  "Hi Afan Mac Store, I want to buy an Apple product. Please guide me.";

const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Reviews", href: "/#reviews", hasDropdown: false },
  { label: "Location", href: "/#location", hasDropdown: false },
  { label: "Contact", href: "/#contact", hasDropdown: false },
];

const PRODUCT_CATEGORIES = [
  { label: "All Products", href: "/products" },
  { label: "MacBook", href: "/products/macbook" },
  { label: "iPhone", href: "/products/iphone" },
  { label: "iPad", href: "/products/ipad" },
  { label: "Mac mini", href: "/products/mac-mini" },
  { label: "iMac", href: "/products/imac" },
  { label: "Apple Watch", href: "/products/apple-watch" },
  { label: "AirPods", href: "/products/airpods" },
  { label: "Accessories", href: "/products/accessories" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Format badge count: 1–9 shown as-is, above 9 shown as "9+". */
function formatBadge(n: number): string {
  return n > 9 ? "9+" : String(n);
}

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  minWidth: 16,
  height: 16,
  borderRadius: 9999,
  backgroundColor: "#0071E3",
  color: "#FFFFFF",
  fontSize: 10,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 3px",
  letterSpacing: "normal",
  pointerEvents: "none",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const {
    savedCount,
    cartCount,
    openSavedDrawer,
    openCartDrawer,
  } = useShopActions();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Custom focus trap + Escape for mobile menu ──
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)[0]?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProductsExpanded(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = Array.from(
        menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  // ── Escape to close desktop dropdown ──
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [dropdownOpen]);

  // ── Prevent body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Clean up dropdown timer on unmount ──
  useEffect(() => () => clearTimeout(dropdownTimerRef.current), []);

  const openDropdown = () => {
    clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const scheduleClose = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 100);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setProductsExpanded(false);
  };

  const handleMobileSaved = () => {
    closeMobileMenu();
    openSavedDrawer();
  };

  const handleMobileCart = () => {
    closeMobileMenu();
    openCartDrawer();
  };

  return (
    <>
      {/* ════════════════════════════════════════
          Fixed navbar
      ════════════════════════════════════════ */}
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-[1000] transition-all duration-300",
          scrolled
            ? "bg-white/85 border-b border-black/[.08]"
            : "bg-transparent"
        )}
        style={
          scrolled
            ? { backdropFilter: "blur(20px) saturate(180%)" }
            : undefined
        }
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:h-16 md:px-8"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Afan Mac Store — Home"
            className="text-[17px] font-semibold text-[#1D1D1F] transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
          >
            Afan Mac Store
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <li key={link.label} className="relative">
                  <div onMouseEnter={openDropdown} onMouseLeave={scheduleClose}>
                    <button
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      aria-controls="products-dropdown"
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 text-[14px] text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                    >
                      Products
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          dropdownOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Desktop dropdown */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          id="products-dropdown"
                          role="menu"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          onMouseEnter={openDropdown}
                          onMouseLeave={scheduleClose}
                          className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-[12px] border border-[#E8E8ED] bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                        >
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              role="menuitem"
                              onClick={() => setDropdownOpen(false)}
                              className="block rounded-[8px] px-3 py-[10px] text-[15px] text-[#1D1D1F] transition-colors duration-150 hover:bg-[#F5F5F7] hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* ── Right utilities (desktop) ── */}
          <div className="hidden md:flex items-center gap-5">
            {/* 1 — Buy on WhatsApp */}
            <a
              href={whatsappLink(WHATSAPP_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center rounded-full border-[1.5px] border-[#25D366] px-4 text-[14px] font-medium text-[#25D366] transition-colors duration-200 hover:bg-[rgba(37,211,102,0.08)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
            >
              Buy on WhatsApp
            </a>

            {/* 2 — Saved / Heart */}
            <div style={{ position: "relative" }}>
              <button
                onClick={openSavedDrawer}
                aria-label={`Saved products, ${savedCount} ${savedCount === 1 ? "item" : "items"}`}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* IMPLEMENTATION_LOCK §4 §5 — 1–9 exact, "9+" above 9 */}
              {savedCount > 0 && (
                <span aria-hidden="true" style={badgeStyle}>
                  {formatBadge(savedCount)}
                </span>
              )}
            </div>

            {/* 3 — Inquiry Bag / ShoppingBag */}
            <div style={{ position: "relative" }}>
              <button
                onClick={openCartDrawer}
                aria-label={`Inquiry bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </button>
              {cartCount > 0 && (
                <span aria-hidden="true" style={badgeStyle}>
                  {formatBadge(cartCount)}
                </span>
              )}
            </div>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            ref={hamburgerRef}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* ════════════════════════════════════════
          Mobile menu — full-screen overlay
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[1001] flex flex-col bg-white md:hidden"
          >
            {/* Menu header */}
            <div className="flex h-14 flex-none items-center justify-between border-b border-[#E8E8ED] px-4">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-[17px] font-semibold text-[#1D1D1F] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
              >
                Afan Mac Store
              </Link>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links — scrollable middle zone */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ul className="px-4" role="list">
                {NAV_LINKS.map((link) =>
                  link.hasDropdown ? (
                    <li key={link.label} className="border-b border-[#E8E8ED]">
                      <button
                        onClick={() => setProductsExpanded((v) => !v)}
                        className="flex w-full items-center justify-between py-4 text-[20px] font-medium text-[#1D1D1F] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                      >
                        Products
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-[#6E6E73] transition-transform duration-200",
                            productsExpanded && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence>
                        {productsExpanded && (
                          <motion.ul
                            initial={{ maxHeight: 0, opacity: 0 }}
                            animate={{ maxHeight: 520, opacity: 1 }}
                            exit={{ maxHeight: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 pb-2"
                          >
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <li key={cat.href}>
                                <Link
                                  href={cat.href}
                                  onClick={closeMobileMenu}
                                  className="flex min-h-[44px] items-center py-2 text-[16px] text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                                >
                                  {cat.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li
                      key={link.label}
                      className="border-b border-[#E8E8ED]"
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="flex min-h-[52px] items-center py-4 text-[20px] font-medium text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Utilities — pinned to bottom */}
            <div className="flex-none border-t border-[#E8E8ED] px-4 pb-8 pt-6">
              {/* Wishlist + Cart row */}
              <div className="mb-5 flex items-center gap-6">
                {/* Saved / Heart */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={handleMobileSaved}
                    aria-label={`Saved products, ${savedCount} ${savedCount === 1 ? "item" : "items"}`}
                    className="flex items-center gap-2 text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                  >
                    <Heart className="h-6 w-6" aria-hidden="true" />
                    <span className="text-[12px] text-[#6E6E73]">Saved</span>
                  </button>
                  {savedCount > 0 && (
                    <span
                      aria-hidden="true"
                      style={{ ...badgeStyle, top: -4, right: -8 }}
                    >
                      {formatBadge(savedCount)}
                    </span>
                  )}
                </div>

                {/* Inquiry Bag */}
                <div style={{ position: "relative" }}>
                  <button
                    onClick={handleMobileCart}
                    aria-label={`Inquiry bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                    className="flex items-center gap-2 text-[#1D1D1F] transition-colors duration-150 hover:text-[#0071E3] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)] rounded-sm"
                  >
                    <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                    <span className="text-[12px] text-[#6E6E73]">Inquiry</span>
                  </button>
                  {cartCount > 0 && (
                    <span
                      aria-hidden="true"
                      style={{ ...badgeStyle, top: -4, right: -8 }}
                    >
                      {formatBadge(cartCount)}
                    </span>
                  )}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink(WHATSAPP_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] text-[16px] font-medium text-white transition-colors duration-200 hover:bg-[#1DAE56] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]"
              >
                Buy on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
