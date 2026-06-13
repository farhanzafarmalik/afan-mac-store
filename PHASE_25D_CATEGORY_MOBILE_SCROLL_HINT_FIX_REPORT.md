# PHASE 25D — Category Mobile Scroll Hint Fix Report

**Date:** 2026-06-12
**Branch:** main
**File changed:** `sections/Categories.tsx`

---

## 1. Files Changed

| File | Change |
|------|--------|
| `sections/Categories.tsx` | Added "Swipe to browse →" text hint in section header, mobile-only (`md:hidden`) |

No other files modified.

---

## 2. Root Cause

Phase 25B hid the scroll arrows on mobile to fix the tile/label overlap. This solved the visual issue but removed the only scroll affordance visible to the user. The gradient fade at the right edge is subtle — visitors might not recognise the row as horizontally scrollable, especially on first visit.

---

## 3. Scroll Hint Implementation

A small `<span>` was added inside the section header row, right-aligned alongside the `<h2>`:

```tsx
<div className="flex items-end justify-between gap-4">
  <h2 id="categories-heading" ...>
    Find your next Apple device.
  </h2>
  <span
    className="md:hidden flex-shrink-0 self-end"
    style={{
      fontSize: "12px",
      fontWeight: 500,
      color: "#6E6E73",
      paddingBottom: "4px",
      whiteSpace: "nowrap",
    }}
    aria-hidden="true"
  >
    Swipe to browse →
  </span>
</div>
```

**Design decisions:**
- `md:hidden` — visible only on mobile (<768px), invisible on desktop
- `aria-hidden="true"` — decorative hint, not read by screen readers (the scroll container is accessible via tab/swipe)
- `flex-shrink-0 self-end` — pinned to the right, baseline-aligned with the heading bottom edge
- `whiteSpace: nowrap` — prevents line-wrap on narrow viewports
- 12px / weight 500 / `#6E6E73` — subtle, Apple-style, does not compete with heading
- No animation, no button, no floating element

---

## 4. Mobile QA Result

Verified at 375×812 via local preview server:

| Check | Result |
|-------|--------|
| "Swipe to browse →" visible on mobile | ✅ `display: block` |
| Hint `aria-hidden="true"` | ✅ |
| Hint does not overlap any category tile | ✅ — placed in heading row above strip |
| Hint does not overlap any category label | ✅ |
| Mobile arrows still hidden (`display: none`) | ✅ |
| Gradient fade still present when content overflows | ✅ |
| No horizontal page overflow | ✅ `scrollWidth === 375` |
| Category row swipes horizontally | ✅ `overflow-x-auto` unchanged |
| All 8 category links reachable by swipe | ✅ |

---

## 5. Desktop Unchanged Confirmation

Verified at 1280px:

| Check | Result |
|-------|--------|
| Swipe hint hidden (`display: none`) | ✅ `md:hidden` applied |
| Desktop arrows visible (`display: flex`) | ✅ |
| No horizontal overflow | ✅ |
| Heading and overline unchanged | ✅ |
| Icon tiles, centering, hover states unchanged | ✅ |

---

## 6. Icons Kept — No Images Added

- All 8 Lucide icons unchanged
- Zero `<img>` tags added to `sections/Categories.tsx`
- No product photos, no Apple logo images

---

## 7. Routes Unchanged

All 8 category routes unchanged. `data/categories.ts` not modified.

---

## 8. TypeScript Result

```
npx tsc --noEmit
```
✅ No errors. Zero output.

---

## 9. Build Result

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

## 10. Issues Remaining

None.

---

## 11. Approval Status

**Awaiting user review**
