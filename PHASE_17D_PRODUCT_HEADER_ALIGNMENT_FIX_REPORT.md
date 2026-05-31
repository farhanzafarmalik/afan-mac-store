# Phase 17D — Product Listing Header Alignment Fix Report

**Date:** 2026-05-31
**Status:** Awaiting user review

---

## 1. Files Changed

| File | Change |
|---|---|
| `app/products/page.tsx` | Added `minHeight: "2.2em"` on `<h1>` · Added `minHeight: "3.2em"` on subtext `<p>` |
| `app/products/[category]/page.tsx` | Same additions on `<h1>` and subtext `<p>` |
| `lib/product-utils.ts` | Updated 5 subtexts to follow consistent pattern |

---

## 2. What Caused the Vertical Jump

Two independent causes combined:

**Cause 1 — h1 wrapping:**
At desktop (1280px), the h1 renders at `clamp(2rem, 4vw + 0.5rem, 3.5rem)` ≈ 56px. With `maxWidth: 640px`, longer titles like "All Products at Afan Mac Store" (30 chars) wrapped to 2 lines (~121px), while shorter titles like "iMacs at Afan Mac Store" (23 chars) stayed on 1 line (~61px). This created a ~60px vertical difference in the h1 element height.

**Cause 2 — Subtext length variance:**
Subtexts ranged from very short single-line strings ("Compact desktop power. Message us for current stock." — ~51 chars) to longer 2-line strings ("Browse MacBooks, iPhones, iPads, accessories, and more. Message us on WhatsApp for current availability." — ~103 chars). At 20px font with `lineHeight: 1.5`, the difference between 1 line (30px) and 2 lines (60px) added up to ~30px more vertical shift.

The combined effect: switching between categories like `/products` and `/products/ipad` caused the category tabs and product grid to jump up or down by up to ~90px.

---

## 3. How Header Alignment Was Fixed

**Fix A — `minHeight: "2.2em"` on `<h1>` in both page files:**

```jsx
<h1 style={{
  fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
  minHeight: "2.2em",
  display: "flex",
  alignItems: "flex-start",
  // ...other existing styles
}}>
  {title}
</h1>
```

At any font size produced by `clamp`, `2.2em` = 2.2 × font-size. With `lineHeight: 1.08`, 2 lines = 2 × 1.08 × font-size = 2.16em. So `2.2em` reliably reserves exactly 2 lines of h1 height. Short single-line titles now occupy the same vertical space as long 2-line titles. `display: flex` + `alignItems: flex-start` keeps text anchored to the top rather than centered.

**Fix B — `minHeight: "3.2em"` on subtext `<p>` in both page files:**

```jsx
<p style={{
  fontSize: "clamp(1rem, 1.25vw + 0.125rem, 1.25rem)",
  lineHeight: 1.5,
  minHeight: "3.2em",
  // ...other existing styles
}}>
  {subtext}
</p>
```

At any font size produced by `clamp`, `3.2em` = 3.2 × font-size. With `lineHeight: 1.5`, 2 lines = 2 × 1.5 × font-size = 3.0em. So `3.2em` reliably reserves 2 lines of subtext with a small buffer. Short 1-line subtexts now hold the same vertical space as 2-line subtexts.

Both `minHeight` values are `em`-based — they scale correctly with the `clamp()` font-size across all viewport widths.

---

## 4. Copy Changes

5 subtexts updated in `lib/product-utils.ts` to be more consistent in tone and length:

| Category | Before | After |
|---|---|---|
| iPhone | "Trusted iPhones, ready to use. Ask us for current options." | "Trusted iPhones, ready to use. Message us for current availability." |
| Mac mini | "Compact desktop power. Message us for current stock." | "Compact Apple desktop power. Message us for current availability." |
| iMac | "All-in-one desktop. Message us to check availability." | "All-in-one desktop power. Message us for current availability." |
| Apple Watch | "Smartwatches for daily use. Ask us for current options." | "Apple Watches for daily use. Message us for current availability." |
| AirPods | "Wireless audio, easy pairing. Message us for availability." | "AirPods for everyday listening. Message us for current availability." |

Unchanged (already consistent):
- All Products, MacBook, iPad, Accessories — no changes needed

---

## 5. Confirmation: Product Grid Alignment Improved

**Desktop browser measurements at 1280px (all confirmed equal):**

| Route | Header Section Height | Nav Top |
|---|---|---|
| `/products` | 418px | 482px |
| `/products/ipad` | 418px | 482px |
| `/products/imac` | 418px | 482px |
| `/products/macbook` | 418px | 482px |

All routes produce identical `sectionH: 418` and `navTop: 482`. Zero vertical jump between categories.

---

## 6. Confirmation: Category Tabs Unchanged

- `ProductCategoryTabs.tsx` — not modified
- Tab row position is now consistent because the header section above it has uniform height
- Active tab still determined by `activeSlug` prop — unchanged
- Tab links/routes — unchanged

---

## 7. Confirmation: Product Cards / Drawers Unchanged

| Component | Modified | Status |
|---|---|---|
| `components/ProductCard.tsx` | ❌ No | Unchanged |
| `components/ProductQuickDetailsDrawer.tsx` | ❌ No | Unchanged |
| `components/SavedDrawer.tsx` | ❌ No | Unchanged |
| `components/CartInquiryDrawer.tsx` | ❌ No | Unchanged |
| `context/ShopActionsContext.tsx` | ❌ No | Unchanged |
| `sections/FeaturedProducts.tsx` | ❌ No | Unchanged |
| `data/products.ts` | ❌ No | Unchanged |

---

## 8. Desktop QA Result

| Check | Result |
|---|---|
| `/products` header height | 418px ✅ |
| `/products/ipad` header height | 418px ✅ — was shorter before fix |
| `/products/imac` header height | 418px ✅ — was shorter before fix |
| `/products/macbook` header height | 418px ✅ |
| Category tabs `navTop` consistent | 482px across all routes ✅ |
| No horizontal overflow | ✅ |
| Category tabs still visible | ✅ |
| Product cards render below tabs | ✅ |
| Updated subtexts are clean and professional | ✅ — screenshot confirmed |

---

## 9. Mobile QA Result

| Check | Result |
|---|---|
| `/products/macbook` header height | 315px ✅ |
| `/products/ipad` header height | 315px ✅ |
| Mobile `navTop` consistent | 371px across tested routes ✅ |
| No page horizontal overflow | ✅ `bodyScrollWidth === innerWidth` |
| No excessive blank space | ✅ — screenshot confirmed clean layout |
| iPad page screenshot | Clean: heading, subtext, WhatsApp CTA, tabs, product card all visible without gaps ✅ |

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

## 12. Issues / Risks

**None identified.**

- The `em`-based `minHeight` values scale with the `clamp()` font-size, so they remain correct at all viewport widths — no magic pixel values that could break at uncommon screen sizes.
- `display: flex` + `alignItems: flex-start` on `<h1>` is standard and semantically neutral — it does not change how the heading reads or appears to assistive technology.
- If a future page has an unusually long title that wraps to 3 lines, it will naturally overflow past the `minHeight` without breaking layout — `minHeight` does not cap the height, only establishes a floor.

---

## 13. Approval Status

**Awaiting user review.**

Phase 17D summary:
- Root cause identified: h1 line-wrap variance (~60px) + subtext line-count variance (~30px) = up to 90px vertical jump ✅
- Fix: `minHeight: "2.2em"` on h1, `minHeight: "3.2em"` on subtext — em-based, clamp-aware ✅
- Desktop: all 4 tested routes confirmed at identical `sectionH: 418`, `navTop: 482` ✅
- Mobile: all 2 tested routes confirmed at identical `sectionH: 315`, `navTop: 371`, no overflow ✅
- 5 subtexts updated for consistency — clean English, no keyword stuffing ✅
- Product cards, drawers, tabs, routes — all unchanged ✅
- Zero TypeScript errors · Zero build errors · 13/13 pages ✅

---

*Phase 17D · Product Header Alignment Fix · Report version 1.0 · 2026-05-31*
