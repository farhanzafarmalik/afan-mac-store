# PHASE 25B — Category Mobile Scroll Arrow Fix Report

**Date:** 2026-06-12
**Branch:** main
**File changed:** `sections/Categories.tsx`

---

## 1. Files Changed

| File | Change |
|------|--------|
| `sections/Categories.tsx` | Wrapped ArrowButtons in `hidden md:flex` divs; added mobile gradient fade hints; moved scrollRef onto inner div |

No other files modified.

---

## 2. Mobile Issue Root Cause

The Phase 25A layout placed `<ArrowButton>` elements as direct siblings in the outer flex row:

```
[ArrowButton 44px] [flex-1 scroll container] [ArrowButton 44px]
```

On mobile at 375px, the right ArrowButton occupied 44px + 12px gap = 56px of horizontal space. This shrank the scroll container to ~319px. Because the category items are 104px wide with ~12px gaps, only ~2.7 items were visible. The third item (iPad) was clipped mid-label directly behind the arrow button — making the cut look accidental rather than intentional.

---

## 3. Arrow Placement Fix

**Approach chosen:** Hide arrows on mobile, show only on desktop (`md+`). Add a subtle CSS gradient fade at the right (and left when scrolled) edge on mobile as a non-blocking scroll hint.

**Changes:**

```tsx
{/* Arrows hidden on mobile */}
<div className="hidden md:flex">
  <ArrowButton direction="left" ... />
</div>

{/* Relative wrapper for gradient overlays */}
<div className="relative flex-1 min-w-0">
  {/* Right fade — scroll hint on mobile only */}
  {canScrollRight && (
    <div
      className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
      style={{ background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.96))" }}
    />
  )}
  {/* Left fade — appears after scrolling on mobile */}
  {canScrollLeft && (
    <div
      className="md:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10"
      style={{ background: "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.96))" }}
    />
  )}
  <div ref={scrollRef} className="overflow-x-auto ...">
    ...
  </div>
</div>

<div className="hidden md:flex">
  <ArrowButton direction="right" ... />
</div>
```

**Result:** On mobile, the scroll container is now full-width with no arrow eating into it. The gradient fade at the right edge signals more content naturally without overlapping any tile or label. Touch swipe scrolls all 8 categories. The left fade appears after the user has scrolled right.

---

## 4. Mobile Scroll Behavior Result

| Check | Result |
|-------|--------|
| No horizontal page overflow at 375px | ✅ `scrollWidth === innerWidth === 375` |
| Arrow buttons hidden on mobile | ✅ `display: none` via `hidden md:flex` |
| Right gradient fade present when more content | ✅ 1 gradient element in DOM |
| Gradient is `pointer-events-none` | ✅ — does not block taps |
| Touch swipe works natively | ✅ (overflow-x-auto) |
| No tile or label obscured by arrow | ✅ — full scroll container width |
| Tile dimensions | ✅ 76×76px |
| Tap target ≥ 44px | ✅ (tile is 76px) |

---

## 5. Desktop Unchanged Confirmation

Verified at 900px viewport:

| Check | Result |
|-------|--------|
| Arrow wrappers `display: flex` at md+ | ✅ `flex` for both wrappers |
| Gradient fades `display: none` at desktop | ✅ `none` |
| No horizontal overflow | ✅ |
| All 8 links present and correct | ✅ |
| `md:justify-center` centering preserved | ✅ |
| Phase 25A tile polish (76×76, 36px icon, `#0071E3` hover) | ✅ unchanged |

---

## 6. Mobile 375px QA Result

| Check | Result |
|-------|--------|
| Right arrow does not overlap any tile | ✅ — arrow hidden on mobile |
| iPad label not cut behind arrow | ✅ — no arrow to cut behind |
| MacBook tile visible at scroll start | ✅ |
| Gradient fade at right edge | ✅ — 40px wide, white fade |
| No horizontal page overflow | ✅ |
| Category links are actual `<a>` elements | ✅ |
| All 8 `aria-label` correct ("Shop MacBook" … "Shop Accessories") | ✅ |
| Section heading visible | ✅ "Find your next Apple device." |
| Overline visible | ✅ "SHOP BY CATEGORY" |

---

## 7. Icons Kept — No Images Added

- All 8 Lucide icons unchanged: `Laptop`, `Smartphone`, `TabletSmartphone`, `Server`, `Monitor`, `Watch`, `Headphones`, `Package`
- Zero `<img>` tags added
- No product photos, no Apple logo images

---

## 8. Routes Unchanged

All 8 category routes unchanged. `data/categories.ts` not modified.

---

## 9. TypeScript Result

```
npx tsc --noEmit
```
✅ No errors. Zero output.

---

## 10. Build Result

```
npm run build
```
✅ Build succeeded. 13 static pages generated.

```
Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /products
└ ● /products/[category]   (+5 paths)
```

---

## 11. Issues Remaining

None. The mobile arrow overlap is resolved. The gradient fade approach is Apple-style — no large arrows, no heavy carousel, no autoplay, no animation.

> Screenshot note: Headless Playwright renderer shows partial tile rendering due to GPU compositing limitations (same as Phase 23A/23B). DOM-level checks confirmed all elements, positions, and behaviors are correct.

---

## 12. Approval Status

**Awaiting user review**
