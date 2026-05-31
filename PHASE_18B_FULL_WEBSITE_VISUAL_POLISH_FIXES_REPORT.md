# Phase 18B — Full Website Visual Polish Fixes Report

**Date:** 2026-05-31
**Status:** Awaiting user review

---

## 1. Files Changed

| File | Change |
|---|---|
| `components/ProductCard.tsx` | `<h3>` min-height 2 lines; `<p>` description min-height 2 lines, proper line-clamp |
| `sections/FeaturedProducts.tsx` | Same `<h3>` and `<p>` min-height; mobile 4-card cap + "View all products" link |
| `sections/Categories.tsx` | Border-radius 6px → 12px; background `#F5F5F7` → `#FFFFFF` |
| `sections/Reviews.tsx` | Background `#F5F5F7` → `#FFFFFF` |
| `sections/Contact.tsx` | Background `#F5F5F7` → `#FFFFFF` |
| `components/Footer.tsx` | Main grid `grid-cols-1` → `grid-cols-2` on mobile |
| `components/Navbar.tsx` | "Buy on WhatsApp" font-size `14px` → `15px` |
| `app/products/page.tsx` | End-of-grid WhatsApp prompt added; grid section bottom padding adjusted |
| `app/products/[category]/page.tsx` | End-of-grid WhatsApp prompt added; grid section bottom padding adjusted |

---

## 2. Product Card Title / Description Alignment Fix

**Root cause:** `<h3>` product names like "Braided USB-C to Lightning Cable" wrap to 2 lines while "MagSafe Charger" stays on 1 line. Without a minimum height, shorter-named products produce shorter cards, misaligning the grid row.

**Fix applied to `components/ProductCard.tsx`:**

```jsx
// h3 — 2-line reserve
minHeight: "calc(1.25 * 2 * 17px)"  // = 42.5px

// description p — 2-line reserve, proper clamp
minHeight: "calc(1.5 * 2 * 13px)"  // = 39px
overflow: "hidden"
display: "-webkit-box"
WebkitLineClamp: 2
WebkitBoxOrient: "vertical"
```

**Removed:** `className="line-clamp-2"` (replaced with equivalent inline style that also sets `minHeight`).

**Browser verified on `/products/accessories`:**
- `h3Heights`: all 11 cards at exactly `43px` ✅
- `cardHeightVariance`: **0px** (was 22px before) ✅
- All 11 accessory cards: `offsetHeight: 463` (perfectly uniform) ✅

**Browser verified on `/products/macbook`:**
- Both cards `h3Height: 43px`, `descHeight: 39px` ✅

---

## 3. Featured Card Alignment Fix

**Same fix applied to `sections/FeaturedProducts.tsx`:**

```jsx
// h3
minHeight: "calc(1.25 * 2 * 17px)"

// description p
minHeight: "calc(1.5 * 2 * 13px)"
display: "-webkit-box"
WebkitLineClamp: 2
WebkitBoxOrient: "vertical"
```

Cards in the 4-column desktop grid now hold uniform name and description height regardless of product name length. "20W USB-C iPhone Adapter" (long accessory name) and "iPhone" (short name) both reserve the same 2-line space.

---

## 4. Category Strip Radius Fix

**Before:** `border-radius: 6px` on category link focus ring wrapper — inconsistent with design system.

**After:** `border-radius: 12px` (`radius-md` per design system).

**Browser verified:** `catRadius: "12px"` ✅

The icon tile itself retains `border-radius: 18px` (the white square icon box) — this was already correct and unchanged.

---

## 5. Section Separation / Background Rhythm

**Before:** All 6 homepage sections on `#F5F5F7` — no visual rhythm, one continuous grey page.

**After — Apple-style alternating pattern:**

| Section | Before | After |
|---|---|---|
| Hero | `#F5F5F7` | `#F5F5F7` (unchanged — locked) |
| Category Strip | `#F5F5F7` | `#FFFFFF` |
| Featured Products | `#F5F5F7` | `#F5F5F7` (unchanged) |
| Reviews | `#F5F5F7` | `#FFFFFF` |
| Location | `#F5F5F7` | `#F5F5F7` (unchanged) |
| Contact | `#F5F5F7` | `#FFFFFF` |
| Footer | `#FFFFFF` | `#FFFFFF` (unchanged — was already correct) |

**Pattern:** grey → white → grey → white → grey → white → white

**Browser verified:**
```
categories-heading: rgb(255, 255, 255) ✅
featured-heading:   rgb(245, 245, 247) ✅
reviews-heading:    rgb(255, 255, 255) ✅
location-heading:   rgb(245, 245, 247) ✅
contact-heading:    rgb(255, 255, 255) ✅
footer:             rgb(255, 255, 255) ✅
```

No `<hr>` lines added. No gradients. No harsh borders between sections. Section rhythm created purely by background colour alternation.

---

## 6. Featured Products Mobile Length Fix

**Before:** 8 cards stacked vertically on mobile = ~4101px section height.

**After:** 4 cards visible on mobile + "View all products" link. Section height dropped to **2411px** (41% reduction).

**Implementation in `sections/FeaturedProducts.tsx`:**

```jsx
// Wrap each card in a div — first 4 visible on mobile, last 4 hidden
<div key={product.id} className={index >= 4 ? "hidden sm:block" : ""}>
  <FeaturedCard product={product} />
</div>

// "View all products" button — mobile only (hidden on sm+)
<div className="flex justify-center sm:hidden" style={{ marginTop: "32px" }}>
  <Link href="/products" className="...blue outline pill...">
    View all products
  </Link>
</div>
```

**Desktop behaviour unchanged:** All 8 cards visible at `sm:block` (tablet+). The 4 + 4 balanced grid is preserved.

**Browser verified (mobile 375px):**
- `visibleOnMobile: 4` ✅
- `hiddenOnMobile: 4` ✅
- `viewAllLinkPresent: true` ✅
- `viewAllLinkText: "View all products"` ✅
- `viewAllLinkHref: "/products"` ✅
- `featSectionH: 2411px` (was 4101px) ✅

Screenshot confirmed: 4th card (iPad) visible → "View all products" blue outline button → Reviews section begins with `#FFFFFF` background — clean visual break.

---

## 7. Footer Mobile Compactness Fix

**Before:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — on mobile, all 4 footer columns stack vertically = 1078px.

**After:** `grid-cols-2 lg:grid-cols-4` — mobile uses 2 columns from the start = **768px** (29% reduction).

The Brand column and the Visit/Hours column both span 1 column each. Quick Links and Products columns also side-by-side on mobile. No content removed.

**Browser verified (mobile):** `footerH: 768px` (was 1078px) ✅

---

## 8. Navbar CTA Font-Size Fix

**Before:** "Buy on WhatsApp" in navbar used `text-[14px]` while all product page WhatsApp CTAs used `15px`.

**After:** Changed to `text-[15px]` — consistent with all other WhatsApp CTAs on the site.

**Browser verified:** `navWaFontSize: "15px"` ✅

Navbar height, outline style, 44px min-height, green border — all unchanged.

---

## 9. End-of-Grid WhatsApp Prompt

Added to both `/products` and `/products/[category]` pages, below the product grid, separated by a subtle `1px solid #E8E8ED` top border.

**Content:**
- Heading: "Didn't find what you're looking for?"
- Body: "Message us on WhatsApp and we'll help you find the right Apple product."
- CTA: "Message on WhatsApp" — green pill, 44px, `whatsappLink()` — pre-filled message includes the page context

**All Products page** message: "Hi Afan Mac Store, I couldn't find what I was looking for. Can you help me find the right Apple product?"

**Category pages** message: "Hi Afan Mac Store, I was looking at {meta.name} but couldn't find what I needed. Can you help?"

No fake product claims. No checkout/payment/order language. Text is compact and premium.

**Browser verified on `/products/macbook`:** `endPromptPresent: true` ✅
**Browser verified on `/products/accessories`:** `endPromptPresent: true` ✅

---

## 10. Confirmation: No Hero Changes

`sections/Hero.tsx` — **not modified**. ✅

---

## 11. Confirmation: No Fake Data Added

- No fake prices ✅
- No fake stock counts ✅
- No fake specs (RAM, storage, PTA, battery) ✅
- No fake product images ✅
- `data/products.ts` — **not modified** ✅

---

## 12. Confirmation: Product Routes Unchanged

All existing routes intact: `/`, `/products`, `/products/[category]` (8 SSG paths). No new routes. No product detail pages.

Build confirmed: **13/13 pages generated** — same as before Phase 18B. ✅

---

## 13. Confirmation: Wishlist / Cart / Drawers Unchanged

| File | Modified | Status |
|---|---|---|
| `components/SavedDrawer.tsx` | ❌ No | Unchanged |
| `components/CartInquiryDrawer.tsx` | ❌ No | Unchanged |
| `components/ProductQuickDetailsDrawer.tsx` | ❌ No | Unchanged |
| `context/ShopActionsContext.tsx` | ❌ No | Unchanged |
| `lib/constants.ts` | ❌ No | Unchanged |

WhatsApp number: `923133388666` — unchanged. All WhatsApp links via `whatsappLink()` from `lib/constants.ts`. ✅

---

## 14. Desktop QA Result

| Check | Result |
|---|---|
| `/products/macbook` — h3 heights uniform | `43px × 2` — all uniform ✅ |
| `/products/accessories` — card height variance | **0px** (was 22px) ✅ |
| `/products/accessories` — all 11 cards same height | `463px × 11` ✅ |
| Homepage sections — background rhythm | Grey/white alternation confirmed ✅ |
| Category strip radius | `12px` (was 6px) ✅ |
| Navbar WA font-size | `15px` (was 14px) ✅ |
| End-of-grid prompt present | Both `/products` and `/products/macbook` ✅ |
| Featured Products 8 cards desktop | All 8 visible (4+4 grid) ✅ |
| Category tabs still work | Active tab correct, no regressions ✅ |
| Quick Details drawer | Still opens correctly ✅ |
| No page horizontal overflow | ✅ |

---

## 15. Mobile QA Result

| Check | Result |
|---|---|
| Featured Products — visible cards | 4 only ✅ |
| Featured Products — hidden cards | 4 (`hidden sm:block`) ✅ |
| "View all products" button | Present, `href="/products"`, blue outline pill ✅ |
| Section height reduction | 4101px → 2411px (41% shorter) ✅ |
| Section background rhythm | Visible in screenshot — grey/white break ✅ |
| Footer mobile height | 1078px → 768px (29% shorter) ✅ |
| No page horizontal overflow | ✅ |
| Product cards fill viewport | ✅ |

---

## 16. TypeScript Result

```
npx tsc --noEmit → exit code 0 — zero errors
```

---

## 17. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully
✓ TypeScript: zero errors
✓ Generating static pages (13/13)

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. 13/13 pages generated.
```

---

## 18. Issues / Risks

**None identified.**

- `WebkitLineClamp` and `WebkitBoxOrient` are React-valid inline style properties and render correctly in all modern browsers. The `display: "-webkit-box"` approach is the standard cross-browser line-clamp method when `minHeight` also needs to be set (pure CSS `line-clamp` alone cannot coexist with `minHeight` cleanly).
- Section background alternation does not affect any interactive component — drawers, tabs, and cards are unaffected.
- The `hidden sm:block` pattern on Featured Products card wrappers uses standard Tailwind responsive classes — no JavaScript, no state, no layout shift.

---

## 19. Approval Status

**Awaiting user review.**

Phase 18B summary:
- Product card height variance: 22px → **0px** on all pages ✅
- Featured card alignment: consistent across 4-col grid ✅
- Category strip radius: 6px → 12px ✅
- Homepage sections: clean grey/white alternating rhythm ✅
- Featured Products mobile: 4 cards + "View all products" (section 41% shorter) ✅
- Footer mobile: 1078px → 768px (29% shorter) ✅
- Navbar WA font-size: 14px → 15px ✅
- End-of-grid WhatsApp prompt: on all product pages ✅
- No Hero changes ✅ · No fake data ✅ · No routes changed ✅ · Drawers unchanged ✅
- Zero TypeScript errors · Zero build errors · 13/13 pages ✅

---

*Phase 18B · Full Website Visual Polish Fixes · Report version 1.0 · 2026-05-31*
