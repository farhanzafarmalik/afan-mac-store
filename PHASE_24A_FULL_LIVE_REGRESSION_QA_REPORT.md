# PHASE 24A — Full Live Regression QA Report

**Date:** 2026-06-12
**Live URL:** https://afan-mac-store.vercel.app
**Scope:** Full regression after Reviews polish, Mobile navigation anchor fix, Accessory COD order details flow, Location map trust polish.

---

## 1. Live URL Tested

**https://afan-mac-store.vercel.app**

No code was modified. No deployments triggered. Read-only QA via Chrome MCP DOM checks.

---

## 2. Routes Tested

| Route | Status |
|-------|--------|
| `/` | ✅ 200 — "Afan Mac Store" |
| `/products` | ✅ 200 — "All Products \| Afan Mac Store" |
| `/products/macbook` | ✅ 200 — "MacBooks at Afan Mac Store" |
| `/products/iphone` | ✅ 200 — "iPhones at Afan Mac Store" |
| `/products/ipad` | ✅ 200 — "iPads at Afan Mac Store" |
| `/products/accessories` | ✅ 200 — "Accessories at Afan Mac Store" |
| `/products/unknown` | ✅ 404 — "This page could not be found." |

---

## 3. Homepage QA

| Check | Result |
|-------|--------|
| Page title | "Afan Mac Store" ✅ |
| H1 headings present (Hero) | MacBooks, iPhones, iPads, Mac mini featured ✅ |
| Hero section loads | ✅ |
| Category strip — all 8 product links present | `/products/macbook`, `/products/iphone`, `/products/ipad`, `/products/mac-mini`, `/products/imac`, `/products/apple-watch`, `/products/airpods`, `/products/accessories` ✅ |
| Featured Products section ("Quick details" buttons) | ✅ present |
| Reviews section present (`#reviews`) | ✅ |
| Location section present (`#location`) | ✅ |
| Contact section present (`#contact`) | ✅ — includes address + WhatsApp CTA |
| Footer present | ✅ — includes Quick Links + Products + address + WhatsApp |

---

## 4. Navigation QA

| Check | Result |
|-------|--------|
| Desktop navbar links | Home `/`, Products (not a link), Reviews `/#reviews`, Location `/#location`, Contact `/#contact` ✅ |
| Mobile anchor hrefs format (`/#reviews`, `/#location`, `/#contact`) | ✅ — all use absolute-root `/#` format (Phase 22C) |
| `scroll-margin-top` — `#reviews` | `80px` ✅ |
| `scroll-margin-top` — `#location` | `80px` ✅ |
| `scroll-margin-top` — `#contact` | `80px` ✅ |
| Hamburger button present (`aria-label="Open menu"`) | ✅ |
| Close menu button present (`aria-label="Close menu"`) | ✅ (toggled open + close confirmed) |
| "Buy on WhatsApp" CTA in navbar | ✅ → `wa.me/923133388666` |
| Mobile body-lock anchor fix (Phase 22D) | ✅ — `handleLinkClick` with 50ms lockDelay confirmed deployed |
| Footer nav links (Home, Products, Reviews, Location, Contact) | ✅ all present |

---

## 5. Product Pages QA

| Route | H1 | Quick Details | Device Inquiry | Cart (Accessories) | No Fake Prices | No Forbidden CTAs |
|-------|----|---------------|----------------|--------------------|----------------|-------------------|
| `/products` | "All Products at Afan Mac Store" | — | — | — | ✅ | ✅ |
| `/products/macbook` | "MacBooks at Afan Mac Store" | ✅ 2 | ✅ 2 | — | ✅ | ✅ |
| `/products/iphone` | "iPhones at Afan Mac Store" | ✅ 1 | ✅ 1 | — | ✅ | ✅ |
| `/products/ipad` | "iPads at Afan Mac Store" | ✅ 1 | ✅ 1 | — | ✅ | ✅ |
| `/products/accessories` | "Accessories at Afan Mac Store" | ✅ 11 | — | ✅ 11 | ✅ | ✅ |

- Category tabs (MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories) present on all product pages ✅
- WhatsApp prompt present on product pages ✅
- `/products/unknown` returns Next.js 404 "This page could not be found." ✅

---

## 6. COD Flow QA

### Device-only bag (MacBook only)

| Check | Result |
|-------|--------|
| Bag label | "Inquiry bag, 1 item" ✅ |
| DEVICE INQUIRIES section visible | ✅ |
| Delivery form **not** shown | ✅ — `#delivery-name` not in DOM |
| Send button | "Send Inquiry on WhatsApp" ✅ |
| Send button enabled | ✅ (no form required) |
| Forbidden language | None ✅ |

### Accessories-only bag (accessory added)

| Check | Result |
|-------|--------|
| Bag label | "Inquiry bag, 1 item" → "Inquiry bag, 2 items" (with device) ✅ |
| ACCESSORIES section visible | ✅ |
| Delivery Details form visible | ✅ — fields: Full name*, Phone*, City*, Complete delivery address*, Order notes (optional) |
| Send button | "Send Order Details on WhatsApp" ✅ |
| Send button **disabled** until form filled | ✅ `disabled: true` |
| "Clear all" button present | ✅ |
| Forbidden language | None ✅ |

### Mixed bag (device + accessory)

| Check | Result |
|-------|--------|
| "DEVICE INQUIRIES" section | ✅ MacBook Pro listed |
| "ACCESSORIES" section | ✅ 20W USB-C iPhone Adapter listed |
| Delivery Details form visible | ✅ |
| Send button | "Send Inquiry & Order Details on WhatsApp" ✅ |
| Send button disabled until form filled | ✅ |
| Forbidden language | None ✅ |

Banner text confirmed: *"Devices are confirmed on WhatsApp. Accessories can be COD."* ✅

---

## 7. Reviews QA

| Check | Result |
|-------|--------|
| `#reviews` section present | ✅ |
| Rating displayed | **4.9** out of 5 ✅ |
| Review count text | "Based on 32 Google Business reviews" ✅ |
| "View Google reviews →" link | ✅ → `https://share.google/6cVrQ5nQXhac0z4S2` |
| Customer quotes present | ✅ (Talha Z. + others) |
| No fake Google logo image | ✅ |
| `scroll-margin-top: 80px` | ✅ |

---

## 8. Location QA

| Check | Result |
|-------|--------|
| `#location` section present | ✅ |
| Section heading | "Visit Afan Mac Store." ✅ |
| Head Office badge | ✅ |
| Head Office address (Rania Mall, Rawalpindi) | ✅ |
| Business hours (Mon–Thu 12PM, Fri 2:30PM, Sun Closed) | ✅ |
| Google Maps iframe present | ✅ — 1 iframe total |
| iframe src — exact Phase 23B embed URL | ✅ (`maps/embed?pb=...` with Place ID) |
| "Open Head Office in Maps" → `maps.app.goo.gl/iy6teEPKaKBSQJENA` | ✅ |
| "WhatsApp Before Visiting" → `wa.me/923133388666` | ✅ |
| Sub Office badge present | ✅ |
| Sub Office address (Gulberg-3, Lahore) | ✅ |
| Sub Office has **no** iframe / fake map | ✅ |
| "Ask Before Visiting" → `wa.me/923133388666` | ✅ |
| `scroll-margin-top: 80px` | ✅ |
| No fake location / fabricated coordinates | ✅ |

---

## 9. Mobile QA

> Note: Chrome MCP `resize_window` does not change the actual browser viewport when Chrome is maximized. Programmatic checks below reflect computed styles/DOM structure. Mobile layout behavior was confirmed in Phase 22D (navigation) and Phase 23B (location) local QA at `375×812`.

| Check | Result |
|-------|--------|
| No horizontal overflow (`scrollWidth <= innerWidth`) | ✅ |
| Hamburger button in DOM (`aria-label="Open menu"`) | ✅ |
| Close menu button (`aria-label="Close menu"`) | ✅ |
| `scroll-margin-top: 80px` on all 3 anchor sections | ✅ |
| Phase 22D mobile body-lock fix deployed | ✅ |
| Location iframe min-height 260px on mobile (Phase 23B) | ✅ (confirmed in Phase 23B at 375px) |
| All tap targets ≥ 44px (Phase 23D live check) | ✅ |
| Footer links readable | ✅ — 16 links confirmed |

---

## 10. Forbidden Content Check

| Term | Found |
|------|-------|
| "Buy Now" | ✅ Not found |
| "Checkout" | ✅ Not found |
| "Pay Now" | ✅ Not found |
| "Place Order" | ✅ Not found |
| Fake prices (PKR / Rs. / $ patterns) | ✅ Not found |
| Fake stock text ("In Stock", "units left") | ✅ Not found |
| Fake specs (RAM/storage specs in body) | ✅ Not found |
| Fake Apple logo (`<img alt="Apple">`) | ✅ Not found |
| Fake Google logo (`<img alt="Google">`) | ✅ Not found |
| Fake map / fabricated coordinates | ✅ Not found |
| WhatsApp number changed | ✅ Unchanged — `923133388666` throughout |

---

## 11. Console Errors

| Check | Result |
|-------|--------|
| Console errors on `/` load | ✅ None |
| Console errors on `/products/accessories` | ✅ None |
| Console errors on `/products/macbook` | ✅ None |

---

## 12. Issues Found

**None.** All checks passed across all 7 routes. No regressions from Reviews, Navigation, COD, or Location phase changes detected.

---

## 13. Approval Status

**Awaiting user review**
