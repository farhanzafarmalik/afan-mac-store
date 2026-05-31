# Phase 19A — Final QA After Visual Polish Report

**Date:** 2026-05-31
**Status:** Awaiting user review
**Scope:** Final local QA pass after Phases 15–18 visual polish, before deployment. No source code modified.

---

## 1. Routes Tested

| Route | Method | Result |
|---|---|---|
| `/` (Homepage) | Desktop 1400px + Mobile 375px | Tested |
| `/products` | Desktop + DOM audit | Tested |
| `/products/macbook` | DOM audit | Tested |
| `/products/iphone` | DOM audit | Tested |
| `/products/ipad` | DOM audit | Tested |
| `/products/accessories` | Desktop screenshot + DOM audit | Tested |
| `/products/unknown` | Navigation check | Tested — 404 confirmed |

---

## 2. Homepage QA

### 2a. Desktop (1400px)

| Check | Result |
|---|---|
| Navbar present (logo · nav links · Buy on WhatsApp · Wishlist · Inquiry Bag) | ✅ PASS |
| Hero renders — slide 1 (MacBook) visible with product visual | ✅ PASS |
| Hero CTAs: "Buy on WhatsApp" (green pill) + "View Products" (outline pill) | ✅ PASS |
| Trust stats row: "10K+ Happy Customers · 100% Genuine · 4.9 ★ Rating" | ✅ PASS |
| Section background rhythm — grey/white alternation | ✅ PASS |
| Featured Products section shows exactly 8 cards | ✅ PASS (8 articles confirmed) |
| Featured Products grid is 4 + 4 balanced (two rows of four) | ✅ PASS |
| Footer background: `rgb(255, 255, 255)` | ✅ PASS |
| No horizontal overflow (scrollWidth = clientWidth = 1400px) | ✅ PASS |
| No forbidden phrases ("Your Apple Store", "Official Apple", "Authorized Apple") | ✅ PASS |

**Section background sequence confirmed by DOM:**

| Section | Background |
|---|---|
| Hero | `rgb(245, 245, 247)` — grey ✅ |
| Categories ("Find your next Apple device.") | `rgb(255, 255, 255)` — white ✅ |
| Featured Products ("Popular Apple picks…") | `rgb(245, 245, 247)` — grey ✅ |
| Reviews ("Trusted by Apple buyers…") | `rgb(255, 255, 255)` — white ✅ |
| Location ("Visit Afan Mac Store.") | `rgb(245, 245, 247)` — grey ✅ |
| Contact ("Need help choosing…") | `rgb(255, 255, 255)` — white ✅ |
| Footer | `rgb(255, 255, 255)` — white ✅ |

---

## 3. Product Pages QA

### /products (All Products)

| Check | Result |
|---|---|
| Page title: "All Products at Afan Mac Store" | ✅ |
| Total cards rendered | 19 cards ✅ |
| Category tabs navigation present (All · MacBook · iPhone · iPad · Mac mini · iMac · Apple Watch · AirPods · Accessories) | ✅ 9 tabs |
| Category tab links route to correct `/products/[category]` pages | ✅ |
| End-of-grid "Didn't find what you're looking for?" WhatsApp prompt | ✅ Present |
| No fake prices (PKR, Rs., ₨, $ amounts) | ✅ PASS |
| No "Buy Now / Checkout / Pay Now" | ✅ PASS |
| All WhatsApp links use `923133388666` | ✅ PASS (24 WA links, all correct) |
| Product card text not clipped (`scrollHeight > clientHeight`) | ✅ PASS — 0 clipped on all 19 cards |
| Chips do not overlap description | ✅ PASS — 0 overlaps |

### /products/macbook

| Check | Result |
|---|---|
| Page title: "MacBooks at Afan Mac Store" | ✅ |
| Cards: 2 (MacBook Pro, MacBook Air) | ✅ |
| Active category tab: "MacBook" (dark pill) | ✅ |
| End-of-grid WhatsApp prompt | ✅ |
| No fake prices / Buy Now | ✅ |

### /products/iphone

| Check | Result |
|---|---|
| Page title: "iPhones at Afan Mac Store" | ✅ |
| Cards: 1 (iPhone) | ✅ |
| Active category tab: "iPhone" | ✅ |
| End-of-grid WhatsApp prompt | ✅ |
| No fake prices / Buy Now | ✅ |

### /products/ipad

| Check | Result |
|---|---|
| Page title: "iPads at Afan Mac Store" | ✅ |
| Cards: 1 (iPad) | ✅ |
| Active category tab: "iPad" | ✅ |
| End-of-grid WhatsApp prompt | ✅ |
| No fake prices / Buy Now | ✅ |

### /products/accessories

| Check | Result |
|---|---|
| Page title: "Accessories at Afan Mac Store" | ✅ |
| Cards: 11 (all accessories) | ✅ |
| Active category tab: "Accessories" | ✅ |
| End-of-grid WhatsApp prompt | ✅ |
| All card heights identical: 463px × 11 | ✅ — 0px variance |
| Description not clipped | ✅ PASS on all 11 |
| CTA label: "Add to Cart" (accessories, COD model) — no checkout flow | ✅ Correct |
| No fake prices / Buy Now / Checkout | ✅ |

### /products/unknown

| Check | Result |
|---|---|
| Returns 404 | ✅ — `<h1>404</h1>` confirmed, `is404: true` |
| Navbar still present on 404 page | ✅ |

---

## 4. Mobile QA (375px viewport)

| Check | Result |
|---|---|
| Featured Products: 4 cards visible on mobile | ✅ (4 visible, 4 `hidden sm:block`) |
| "View all products" button visible below 4th card | ✅ Present, `href="/products"` |
| Footer uses 2-column grid on mobile (`grid-cols-2`) | ✅ |
| Navbar renders at mobile width | ✅ |
| Hero CTAs visible on mobile | ✅ (confirmed in snapshot) |
| No horizontal overflow on mobile content sections | ✅ — All section/article elements ≤375px |
| **Minor: Fixed header width 385px on 375px viewport** | ⚠️ See Issue #1 below |

---

## 5. Drawer / Cart / Wishlist QA

### Quick Details Drawer

| Check | Result |
|---|---|
| Opens on "Details" button click | ✅ |
| Shows correct product name ("20W USB-C iPhone Adapter") | ✅ |
| Shows category and description — no fake specs | ✅ |
| CTA: "Confirm on WhatsApp" — no checkout/payment | ✅ |
| Closes via close button | ✅ |

**Drawer content sample:**
> "20W USB-C iPhone Adapter · Accessories · Apple-compatible charging adapter available for order. Price and availability confirmed on WhatsApp before shipment. · Compatible with Apple devices. · Confirm on WhatsApp"

### Saved Drawer (Wishlist)

| Check | Result |
|---|---|
| Opens via navbar wishlist icon | ✅ |
| Shows saved items (MacBook Pro, MacBook Air, 20W Adapter) | ✅ |
| "Add to Inquiry" and "Add to Cart" buttons present | ✅ |
| "Send Saved List on WhatsApp" CTA present | ✅ |
| No checkout / payment language | ✅ |
| Closes via close button | ✅ |

### Inquiry Bag Drawer

| Check | Result |
|---|---|
| Opens via navbar inquiry bag icon | ✅ |
| Shows device inquiries (MacBook Pro, MacBook Air) | ✅ |
| Shows accessories section (20W Adapter) | ✅ |
| Header note: "Devices are confirmed on WhatsApp. Accessories can be COD." | ✅ |
| "Send on WhatsApp" CTA present | ✅ |
| No checkout / payment / "Buy Now" | ✅ |
| Closes via close button | ✅ |

---

## 6. WhatsApp QA

| Check | Result |
|---|---|
| Single WhatsApp number used across entire site | ✅ `923133388666` only |
| All WA links via `whatsappLink()` from `lib/constants.ts` | ✅ (no hardcoded URLs found) |
| Navbar "Buy on WhatsApp" — green outline pill, WhatsApp icon | ✅ |
| Hero "Buy on WhatsApp" — green solid pill | ✅ |
| Product card "Ask on WhatsApp" links | ✅ |
| End-of-grid "Message on WhatsApp" prompt | ✅ Present on all product pages |
| Inquiry Bag "Send on WhatsApp" | ✅ |
| Saved drawer "Send Saved List on WhatsApp" | ✅ |
| Quick Details "Confirm on WhatsApp" | ✅ |
| Total WA links on homepage: 18 | ✅ All correct number |
| Total WA links on /products: 24 | ✅ All correct number |

---

## 7. Forbidden Content Check

| Forbidden Item | Result |
|---|---|
| Fake prices (PKR amounts, Rs. figures, $ amounts) | ✅ None found |
| Fake stock counts ("in stock", "X units left") | ✅ None found |
| Fake specs (RAM, storage, PTA status, battery) | ✅ None found |
| Fake product images (external image URLs) | ✅ None (SVG icons only) |
| "Buy Now" button anywhere on site | ✅ None found |
| "Checkout" / "Pay Now" language | ✅ None found |
| "Your Apple Store" phrase | ✅ None found |
| "Official Apple" / "Authorized Apple" | ✅ None found |
| Apple logo | ✅ None found |
| Chip text "Price confirmed on WhatsApp" | ✅ Correct — indicates WhatsApp pricing model, not a fake price |

---

## 8. TypeScript Result

```
npx tsc --noEmit

Exit code: 0 — zero TypeScript errors
```

---

## 9. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 1837ms
✓ TypeScript: zero errors
✓ Generating static pages (13/13)

Routes:
○ /               Static
○ /_not-found     Static
○ /products       Static
● /products/[category]  SSG — 8 paths:
  /products/macbook
  /products/iphone
  /products/ipad
  /products/accessories
  + 4 more

Result: Zero build errors · Zero TypeScript errors · 13/13 pages ✅
```

---

## 10. Issues Found

### Issue #1 — Low Severity: Fixed header 385px on 375px mobile viewport

**What:** On a 375px mobile viewport, the fixed navbar header measures 385px wide (10px wider than the viewport `clientWidth`).

**Root cause:** The `html` and `body` elements have `overflow-x: visible`. The categories horizontal scroll container (`overflow-x-auto`) causes the browser to register a 9px horizontal scrollbar. The `fixed left-0 right-0` header then inherits `window.innerWidth` (375 + scrollbar = ~385px) rather than `document.clientWidth` (375px).

**User impact:** On iOS, Android, and macOS — all use **overlay scrollbars** that do not consume layout space, so `actualScrollbarWidth = 0`. This issue only manifests in environments with traditional (non-overlay) scrollbars such as Windows Chrome desktop. Since the primary audience is mobile users in Pakistan, this has minimal real-world impact.

**Fix (not applied — out of scope for QA phase):** Add `overflow-x: hidden` to `html` or `body` in `app/globals.css`.

**Recommended action:** Fix in a follow-up Phase 19B or address pre-deployment.

---

### Issue #2 — Informational: "Add to Cart" CTA on accessories (not "Add to Inquiry")

**What:** Accessories cards show "Add to Cart" rather than "Add to Inquiry".

**Clarification:** This is by design. The Inquiry Bag drawer confirms accessories are in a separate "Accessories" section with the note "Accessories can be COD." No checkout or payment flow is triggered — the final action is WhatsApp-based. This is not a rule violation.

---

## 11. Approval Status

**Awaiting user review.**

### Summary Scorecard

| Category | Status |
|---|---|
| Homepage desktop | ✅ PASS |
| Homepage mobile — Featured Products 4 cards + View all | ✅ PASS |
| Section background rhythm | ✅ PASS |
| All product pages (/products, /macbook, /iphone, /ipad, /accessories) | ✅ PASS |
| Product card text visibility (no clipping, no overlap) | ✅ PASS |
| Category tabs routing and active state | ✅ PASS |
| Quick Details drawer | ✅ PASS |
| Saved drawer | ✅ PASS |
| Inquiry Bag drawer | ✅ PASS |
| WhatsApp links — all correct number | ✅ PASS |
| End-of-grid WhatsApp prompt | ✅ PASS |
| Footer mobile 2-column | ✅ PASS |
| Navbar (desktop + mobile structure) | ✅ PASS |
| Forbidden content (prices, Buy Now, Apple branding) | ✅ PASS |
| /products/unknown → 404 | ✅ PASS |
| TypeScript | ✅ 0 errors |
| Build | ✅ 13/13 pages, 0 errors |
| **Mobile horizontal overflow (header 10px wide)** | ⚠️ Low severity — overlay-scrollbar environments unaffected |

**One low-severity issue identified.** All functional, content, and build checks passed. Site is visually polished and content-clean. Ready for user review before deployment decision.

---

*Phase 19A · Final QA After Visual Polish · Report version 1.0 · 2026-05-31*
