# Phase 15C — Product Quick Details Real Browser QA Report

**Date:** 2026-05-31
**Status:** Awaiting user review
**Tested against:** Phase 15B implementation (dev server, localhost:3000)

---

## 1. Files / Areas Inspected

| Area | File |
|---|---|
| Product data | `data/products.ts` |
| Context state | `context/ShopActionsContext.tsx` |
| Product card | `components/ProductCard.tsx` |
| Quick Details drawer | `components/ProductQuickDetailsDrawer.tsx` |
| Layout mount | `app/layout.tsx` |
| Existing drawers | `components/SavedDrawer.tsx`, `components/CartInquiryDrawer.tsx` |
| Featured products | `sections/FeaturedProducts.tsx` (via homepage) |

---

## 2. Routes Tested

| Route | Result |
|---|---|
| `/products` | ✅ Loads correctly, all product cards render |
| `/products/macbook` | ✅ Device cards with correct chips and Details trigger |
| `/products/accessories` | ✅ Accessory cards with correct chips and Details trigger |
| `/products/iphone` | ✅ Loads correctly (checked via Navbar navigation) |
| `/products/unknown` | ✅ Returns 404 — "This page could not be found." — no crash, Navbar intact |
| `/` (homepage) | ✅ Featured Products section unaffected |

---

## 3. Product Card QA

### Device cards (`/products/macbook`)

| Check | Result |
|---|---|
| 3 safe device chips shown | ✅ "Multiple conditions available", "WhatsApp inquiry required", "15-day checking warranty" |
| No fake specs, price, or stock | ✅ None present |
| "Details" text link visible | ✅ Present below chips, styled as small blue underlined text |
| "Details" is not a large third CTA button | ✅ Correct — small text link only |
| Add to Inquiry button present | ✅ `aria-label="Add to Inquiry — MacBook Pro"` etc. |
| Ask on WhatsApp button present | ✅ Present, correct `wa.me/923133388666` link |
| Heart save button present | ✅ Top-right of image area, 44×44px |
| Card not wrapped in `<a>` | ✅ `article` element — `isCardLink: false` confirmed |
| No nested links | ✅ `nestedLinks: 0` confirmed on all cards |
| Button row not overflowing | ✅ No overflow observed on desktop or mobile |

### Accessory cards (`/products/accessories`)

| Check | Result |
|---|---|
| 3 safe accessory chips shown | ✅ "Apple-device compatible", "Price confirmed on WhatsApp", "COD available after confirmation" |
| No fake specs, price, or stock | ✅ None present |
| "Details" text link visible | ✅ Present, correct style |
| Add to Cart button present | ✅ Correct label for accessories |
| Ask on WhatsApp button present | ✅ Present |
| Heart save button present | ✅ Present |
| Card not wrapped in `<a>` | ✅ Confirmed |

---

## 4. Device Quick Details Drawer QA (`/products/macbook`)

Tested on MacBook Pro and MacBook Air.

| Check | Result |
|---|---|
| Drawer opens from right on click | ✅ Slide-in animation observed |
| Product name correct in header | ✅ "MacBook Pro" / "MacBook Air" |
| Category badge correct | ✅ "MacBook" |
| "Best for" badge visible | ✅ "Best for Work" / "Best for Work / Study" — blue accent badge |
| `detailSummary` paragraph visible | ✅ Correct text shown |
| `conditionNote` block visible | ✅ "Available in multiple conditions — confirm via WhatsApp." |
| Confirmation points — current availability | ✅ Present |
| Confirmation points — condition | ✅ "Condition (e.g. Open Box, Refurbished, Used)" |
| Confirmation points — price | ✅ "Price for selected condition" |
| Confirmation points — warranty/checking | ✅ "Warranty and checking period" |
| "Add to Inquiry" button in drawer | ✅ `aria-label="Add to Inquiry — MacBook Pro"` |
| "Add to Inquiry" adds to Inquiry Bag | ✅ Item present in `afan_cart` after click |
| Inquiry Bag opens after Add to Inquiry | ✅ `CartInquiryDrawer` opened — visually confirmed |
| WhatsApp link correct | ✅ `wa.me/923133388666` with pre-filled message |
| Close X closes drawer | ✅ Confirmed |
| Escape closes drawer | ✅ Confirmed — `activeDrawer` set to null, `body.style.overflow` cleared |
| Focus returns to Details trigger after Escape | ✅ `document.activeElement` aria-label matched "View quick details for MacBook Pro" |
| Overlay click closes on desktop | ✅ Overlay present with `hidden sm:block` — click closes drawer |
| No horizontal overflow in drawer | ✅ `scrollWidth (399) ≤ panelWidth (400)`, `overflow-x: hidden` |
| No fake price or stock displayed | ✅ Confirmed — no PKR, no stock count |
| `role="dialog"` | ✅ Confirmed |
| `aria-modal="true"` | ✅ Confirmed |
| `aria-labelledby="details-drawer-title"` | ✅ Confirmed |
| Close button 44×44px | ✅ `{ w: 44, h: 44 }` confirmed |

---

## 5. Accessory Quick Details Drawer QA (`/products/accessories`)

Tested on 20W USB-C iPhone Adapter.

| Check | Result |
|---|---|
| Drawer opens from right | ✅ Confirmed |
| Product name correct | ✅ "20W USB-C iPhone Adapter" |
| Category badge shows "Accessories" | ✅ Confirmed |
| No "Best for" badge | ✅ Confirmed — `hasBestForBadge: false` |
| `detailSummary` visible | ✅ "Apple-compatible charging adapter available for order..." |
| `compatibilityNote` visible | ✅ "Compatible with Apple devices." |
| Confirmation point — current price | ✅ "Current price" |
| Confirmation point — stock availability | ✅ "Stock availability" |
| Confirmation point — COD delivery | ✅ "COD delivery details and coverage area" |
| "Add to Cart" button in drawer | ✅ `aria-label="Add to Cart — 20W USB-C iPhone Adapter"` |
| WhatsApp link correct | ✅ `wa.me/923133388666` |
| No fake price displayed | ✅ `hasFakePrice: false` confirmed |
| No fake stock displayed | ✅ No stock count anywhere |
| Escape / overlay close works | ✅ Confirmed (same as device drawer) |
| No horizontal overflow | ✅ `hasHorizontalOverflow: false` |

---

## 6. Existing Systems Regression QA

| System | Check | Result |
|---|---|---|
| Saved drawer | Opens via Navbar heart icon | ✅ Unmodified |
| Inquiry Bag drawer | Opens via Navbar bag icon | ✅ Unmodified |
| Navbar saved count badge | Reflects saved items | ✅ Showed "1" correctly |
| Navbar cart count badge | Reflects cart items | ✅ Showed "3" correctly |
| `localStorage` key `afan_saved` | Correct key in use | ✅ Confirmed |
| `localStorage` key `afan_cart` | Correct key in use | ✅ Confirmed |
| Old key `afan_saved_items` | Not present | ✅ `oldKeyExists: false` |
| Saved item fields | Only safe fields stored | ✅ `id, name, categorySlug, category, productType, savedAt` |
| Cart item fields | Only safe fields stored | ✅ `id, name, categorySlug, category, productType, cartMode, quantity, addedAt` |
| No forbidden fields in localStorage | price, stock, ram, etc. absent | ✅ `hasForbiddenField: false` |
| Product card heart (listing page) | Saves/unsaves item | ✅ Functional |
| Featured Products heart | Saves item, updates global count | ✅ Functional |
| Featured Products — no Add to Inquiry | Not shown on featured cards | ✅ Confirmed via DOM scan — `hasAddToInquiry: false` on all 8 featured cards |
| Featured Products — no Add to Cart | Not shown on featured cards | ✅ Confirmed — `hasAddToCart: false` |
| Featured Products — no Details trigger | Not shown on featured cards | ✅ Confirmed — `hasDetailsBtn: false` |
| Footer links | Render correctly | ✅ Observed in screenshots |
| Navbar links | Render correctly | ✅ Observed across all routes |
| WhatsApp links | All via `wa.me/923133388666` | ✅ 26 links scanned — all correct number, `allWaLinksCorrectNumber: true` |

---

## 7. Forbidden Route / Content QA

| Forbidden Item | Check Method | Result |
|---|---|---|
| `/products/[slug]` route | `grep -rn 'products/\[slug\]'` | ✅ Zero occurrences |
| Product detail page route | Build output routes list | ✅ Not present — only `/`, `/_not-found`, `/products`, `/products/[category]` |
| SSG product detail pages | Build output | ✅ Not generated |
| Image gallery | DOM scan + source search | ✅ Not present |
| Variant selector | DOM scan + source search | ✅ Not present |
| Related products | DOM scan | ✅ Not present |
| `"price":` field in code | `grep -rn '"price":'` | ✅ Zero occurrences |
| `"stock":` field in code | `grep -rn '"stock":'` | ✅ Zero occurrences |
| RAM, storage, chip fields | Checked `data/products.ts` interface | ✅ Not present |
| `modelYear` field | Checked interface | ✅ Not present |
| `batteryHealth` field | Checked interface | ✅ Not present |
| `ptaStatus` field | Checked interface | ✅ Not present |
| "Buy Now" in functional code | `grep` | ✅ Zero functional occurrences (guard comment only in `ProductCard.tsx:14`) |
| "Checkout" in functional code | `grep` | ✅ Zero functional occurrences (comment-only in `CartInquiryDrawer.tsx`) |
| "Pay Now" | `grep` | ✅ Zero occurrences |
| Hardcoded `wa.me` outside `lib/constants.ts` | `grep -rn "wa\.me"` excluding `constants.ts` | ✅ Zero occurrences |

---

## 8. Visual QA

### Desktop

| Check | Result |
|---|---|
| Cards remain premium and clean | ✅ White surface, subtle border, chip style is muted and small |
| Detail chips look subtle (not loud) | ✅ Small pill chips in `#F5F5F7` background, `#6E6E73` text |
| "Details" link not loud | ✅ Small 12px underlined blue text — clearly secondary to CTA buttons |
| Drawer matches Saved/Inquiry drawer style | ✅ Same right-side slide, white background, `#E8E8ED` border, overlay, z-index |
| Drawer bottom action buttons visible | ✅ Pinned at bottom, not blocked |
| No dark ecommerce look | ✅ Confirmed |
| No loud animation | ✅ 0.28s easeInOut slide, matches existing drawers |
| No "Buy Now", "Checkout", "Pay Now" labels | ✅ None present |
| No horizontal scroll on page | ✅ `bodyScrollWidth (1440) === windowWidth (1440)` |

### Mobile (375px viewport)

| Check | Result |
|---|---|
| Cards single-column, not overflowing | ✅ Cards render correctly, chips wrap neatly |
| Drawer fills full width | ✅ `panelWidth (375) === viewportWidth (375)` — `isFullWidth: true` |
| Drawer action buttons visible at bottom | ✅ "Add to Inquiry" + "WhatsApp" pinned at bottom, fully visible |
| No overlay on mobile | ✅ `hidden sm:block` — overlay hidden at mobile viewport |
| No horizontal scroll on mobile | ✅ Confirmed |

---

## 9. Accessibility QA

| Check | Result |
|---|---|
| "Details" trigger `aria-label` | ✅ `"View quick details for {name}"` on every card |
| Drawer `role="dialog"` | ✅ Confirmed |
| Drawer `aria-modal="true"` | ✅ Confirmed |
| `aria-labelledby` points to product title | ✅ `"details-drawer-title"` — maps to `<h2>` with product name |
| Close button min 44px | ✅ `{ w: 44, h: 44 }` — confirmed via `offsetWidth/offsetHeight` |
| Escape closes drawer | ✅ Confirmed — `drawerStillMounted: false` after Escape |
| Focus returns to trigger after close | ✅ `document.activeElement` aria-label matched the "Details" trigger after Escape |
| Add to Inquiry/Cart `aria-label` | ✅ `"Add to Inquiry — {name}"` / `"Add to Cart — {name}"` |
| WhatsApp link `aria-label` | ✅ `"Ask about {name} on WhatsApp"` |
| Focus ring on interactive elements | ✅ `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Drawer panel `overflow-x: hidden` | ✅ Confirmed |

---

## 10. TypeScript Result

```
npx tsc --noEmit → exit code 0 — zero errors
```

---

## 11. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 2.1s
✓ TypeScript: Finished — zero errors
✓ Generating static pages (13/13) in 331ms

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. 13/13 pages generated.
No new routes. No product detail pages.
```

---

## 12. Issues Found

### Critical
**None.**

---

### Important

#### ISSUE-1: Body scroll lock lost during Details → Inquiry Bag transition

**Severity:** Important  
**Reproducible:** Yes — confirmed via `document.body.style.overflow` check immediately after clicking "Add to Inquiry" inside the Quick Details drawer.

**What happens:**
When the user clicks "Add to Inquiry" (or "Add to Cart") inside the Quick Details drawer, the following sequence occurs:
1. `addToCart()` dispatches `ADD_TO_CART`
2. `openCartDrawer()` dispatches `OPEN_CART_DRAWER` — sets `activeDrawer: "cart"`
3. `ProductQuickDetailsDrawer`'s `isOpen` changes to `false` — its `useEffect` cleanup fires: `document.body.style.overflow = ""`
4. `CartInquiryDrawer`'s `isOpen` changes to `true` — its `useEffect` sets: `document.body.style.overflow = "hidden"`

Steps 3 and 4 are React effects and may execute in either order during the same render cycle. When step 3 runs after step 4, it wipes the scroll lock set by the Inquiry Bag drawer.

**Observed result:** `body.style.overflow === ""` with the Inquiry Bag visually open — user can scroll the page behind the open Inquiry Bag drawer.

**Impact:** The Inquiry Bag does open correctly and all its functionality works. The scroll lock is simply not applied, making the experience slightly inconsistent. Users on mobile may accidentally scroll behind the open drawer.

**Not a data/content issue. No fake data involved. Functional flow is correct — only the scroll lock state is affected.**

**Recommended fix (for Phase 15D or patch):** Centralise body scroll lock in `ShopActionsContext` — apply `overflow: hidden` whenever `activeDrawer !== null`, and release only when `activeDrawer === null`. Remove per-drawer `useEffect` scroll lock from `ProductQuickDetailsDrawer`, `SavedDrawer`, and `CartInquiryDrawer`. This eliminates the race entirely.

---

### Minor

#### ISSUE-2: Large empty white space in drawer on mobile (sparse content)

**Severity:** Minor  
**Where:** Quick Details drawer on mobile (375px viewport)

**What happens:** The scrollable body area uses `flex: 1` to fill remaining vertical space between the header and the pinned action row. On mobile (full-height drawer), the content (summary + condition note + 4 confirmation points) does not fill this space, leaving a large blank white area before the action buttons.

**Impact:** Visual only. All content and actions are accessible and correct. No data or functionality affected.

**Recommended fix (for Phase 15D or later):** Add `justifyContent: "space-between"` or a `flex: 1` spacer before the confirmation section, or add a brief guidance note ("Message us on WhatsApp to get started.") that fills the space without inventing fake data.

---

#### ISSUE-3: Drawer conditionNote box background detection fragile

**Severity:** Minor — test-infrastructure only, no user-facing impact  
**Where:** QA eval query `div[style*="F5F5F7"]`

The QA test targeted the condition/compatibility note box via `div[style*="F5F5F7"]`. This works but is fragile for automated testing. The element has no semantic class or `data-*` attribute. Not a user-facing issue.

**Recommended fix (optional):** Add `data-testid="condition-note"` or `data-testid="compat-note"` attributes in a future pass for easier test targeting.

---

## 13. Recommended Fixes

| # | Severity | Fix | Phase |
|---|---|---|---|
| ISSUE-1 | Important | Move body scroll lock to `ShopActionsContext` — single effect on `activeDrawer` change eliminates the race between all three drawers | Phase 15D patch or 16 |
| ISSUE-2 | Minor | Add a spacer or short guidance note to fill empty mobile drawer space without inventing data | Phase 15D or later |
| ISSUE-3 | Minor | Add `data-testid` attributes to condition/compat note boxes | Optional |

---

## 14. Approval Status

**Awaiting user review.**

Phase 15C QA summary:
- 6 routes tested, all correct ✅
- Device card chips: 3 safe bullets, no fake data ✅
- Accessory card chips: 3 safe bullets, no fake data ✅
- Device drawer: all content correct, Escape/close/focus/a11y all pass ✅
- Accessory drawer: all content correct, Add to Cart routes through Inquiry Bag ✅
- Featured Products unchanged: no Add to Inquiry, no Add to Cart, no Details ✅
- `localStorage` keys unchanged: `afan_saved`, `afan_cart` ✅
- No forbidden routes, content, or fields ✅
- Mobile: full-width drawer, no overflow ✅
- Zero TypeScript errors · Zero build errors · 13/13 pages ✅
- **1 Important issue found:** body scroll lock lost during Details → Inquiry Bag transition (functional flow correct; scroll lock only)
- **2 Minor issues found:** empty mobile drawer space; fragile test selector

---

*Phase 15C · Product Quick Details Real Browser QA · Report version 1.0 · 2026-05-31*
