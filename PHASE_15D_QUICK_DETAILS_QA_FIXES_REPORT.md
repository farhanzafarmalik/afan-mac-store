# Phase 15D — Product Quick Details QA Fixes Report

**Date:** 2026-05-31
**Status:** Awaiting user review
**Fixes applied from:** PHASE_15C issues ISSUE-1 (Important) and ISSUE-2 (Minor)

---

## 1. Files Changed

| File | Change |
|---|---|
| `context/ShopActionsContext.tsx` | Added centralised body scroll lock `useEffect` watching `state.activeDrawer` |
| `components/ProductQuickDetailsDrawer.tsx` | Removed per-drawer scroll lock effect; added guidance note to fill mobile whitespace |
| `components/SavedDrawer.tsx` | Removed per-drawer scroll lock effect |
| `components/CartInquiryDrawer.tsx` | Removed per-drawer scroll lock effect |

---

## 2. Body Scroll Lock — Before / After

### Before (Phase 15B / Phase 15C finding)

Each of the three drawers (`SavedDrawer`, `CartInquiryDrawer`, `ProductQuickDetailsDrawer`) independently managed body scroll lock with its own `useEffect`:

```ts
useEffect(() => {
  if (isOpen) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "";
  return () => { document.body.style.overflow = ""; };
}, [isOpen]);
```

**Race condition:** When transitioning from the Details drawer to the Inquiry Bag (via "Add to Inquiry"), React processed both state changes in the same cycle. The Details drawer's cleanup set `overflow = ""` after the Inquiry Bag had already set it to `"hidden"`, leaving the page scrollable while the Inquiry Bag was open.

**Observed:** `document.body.style.overflow === ""` with the Inquiry Bag visually open.

---

### After (Phase 15D fix)

All three per-drawer scroll lock blocks replaced with a single comment:

```ts
// Body scroll lock is managed centrally in ShopActionsContext.
```

One `useEffect` in `ShopActionsContext.tsx` owns the lock for all drawers:

```ts
useEffect(() => {
  if (typeof window === "undefined") return;
  document.body.style.overflow = state.activeDrawer !== null ? "hidden" : "";
  return () => {
    document.body.style.overflow = "";
  };
}, [state.activeDrawer]);
```

**Result:** `activeDrawer` is the single authoritative source. It changes atomically in the reducer — there is no window where one drawer's cleanup can conflict with another drawer's lock.

---

## 3. Centralised Scroll Lock Implementation Summary

**Location:** `context/ShopActionsContext.tsx` — inside `ShopActionsProvider`

**Logic:**
- `state.activeDrawer !== null` → `document.body.style.overflow = "hidden"`
- `state.activeDrawer === null` → `document.body.style.overflow = ""`
- Provider unmount cleanup → `document.body.style.overflow = ""`
- SSR guard: `typeof window === "undefined"` check prevents server-side execution

**Why this eliminates the race:**
The `state.activeDrawer` value is set by the reducer in a single dispatch. When `OPEN_CART_DRAWER` fires, `activeDrawer` changes from `"details"` to `"cart"` in one atomic state update. The single `useEffect` reacts to this change — there is no competing cleanup from a second `useEffect` that could overwrite the lock.

---

## 4. Confirmation: Per-Drawer Scroll Lock Race Removed

| Drawer | Per-drawer `useEffect` scroll lock | Status |
|---|---|---|
| `SavedDrawer.tsx` | Removed | ✅ Replaced with comment |
| `CartInquiryDrawer.tsx` | Removed | ✅ Replaced with comment |
| `ProductQuickDetailsDrawer.tsx` | Removed | ✅ Replaced with comment |
| `ShopActionsContext.tsx` | Added (centralised) | ✅ Single source of truth |

---

## 5. Mobile Drawer Spacing Improvement Summary

**Issue (ISSUE-2 from Phase 15C):** On mobile (full-height drawer), the scrollable body area used `flex: 1` but the content (badges + summary + condition note + 4 confirmation points) did not fill the available height, leaving a large blank white area above the pinned action buttons.

**Fix applied:** Added a safe guidance note anchored to the bottom of the scroll area using `margin: "auto 0 0"`:

```
Message us on WhatsApp to confirm current details before ordering.
```

This text:
- Contains no invented data (no price, no stock, no specs)
- Pushes naturally to the bottom of the flex column
- Fills the blank space without adding padding or fake content
- Is styled in muted tertiary color (`#AEAEB2`, 12px) — clearly secondary
- Verified present on mobile: `guidanceNoteText: "Message us on WhatsApp to confirm current details before ordering."`

---

## 6. Confirmation: No Business Logic Changed

| System | Status |
|---|---|
| `activeDrawer` state names (`"saved"`, `"cart"`, `"details"`, `null`) | ✅ Unchanged |
| Drawer open/close actions | ✅ Unchanged |
| `addToCart()`, `toggleSaved()`, `moveSavedToCart()` logic | ✅ Unchanged |
| `localStorage` keys `"afan_saved"` / `"afan_cart"` | ✅ Unchanged |
| WhatsApp link generation via `whatsappLink()` | ✅ Unchanged |
| Inquiry Bag device/accessory badge labels | ✅ Unchanged |
| Saved drawer CTA text | ✅ Unchanged |
| Focus management in all drawers | ✅ Unchanged |
| Escape key close behaviour | ✅ Unchanged |

---

## 7. Confirmation: No Product Data / Fake Specs / Prices Added

- `data/products.ts` — **not modified**
- No `price`, `stock`, `ram`, `storage`, `modelYear`, `batteryHealth`, `ptaStatus` fields added anywhere
- The guidance note text ("Message us on WhatsApp to confirm current details before ordering.") contains no data — it is a safe process instruction

---

## 8. Confirmation: Saved / Inquiry Bag Still Works

Manual QA results (see Section 11):

| Test | Result |
|---|---|
| Saved drawer opens with scroll lock | ✅ `overflow: "hidden"` confirmed (100ms after open) |
| Saved drawer closes and releases lock | ✅ `overflow: ""` confirmed after Escape |
| Quick Details → Inquiry Bag transition | ✅ `overflow: "hidden"` maintained throughout — race eliminated |
| Inquiry Bag closes and releases lock | ✅ `overflow: ""` confirmed |
| `afan_saved` localStorage key | ✅ Unchanged |
| `afan_cart` localStorage key | ✅ Unchanged |

---

## 9. TypeScript Result

```
npx tsc --noEmit → exit code 0 — zero errors
```

---

## 10. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 2.1s
✓ TypeScript: zero errors
✓ Generating static pages (13/13) in 314ms

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. 13/13 pages generated.
```

---

## 11. Manual QA Result

All tests run in browser via dev server (localhost:3000).

| Test | Expected | Result |
|---|---|---|
| Open Quick Details drawer | `overflow: "hidden"` | ✅ `"hidden"` confirmed |
| Click "Add to Inquiry" inside Quick Details | Inquiry Bag opens; `overflow` stays `"hidden"` | ✅ `overflow: "hidden"` at immediate click; `overflow: "hidden"` confirmed after transition |
| Details drawer exits during transition | `overflow` must not drop to `""` | ✅ Lock held throughout — race eliminated |
| Inquiry Bag open after transition | Cart drawer open | ✅ `inquiryBagOpen: true` confirmed |
| Close Inquiry Bag (Escape) | `overflow: ""` | ✅ `overflow: ""` confirmed |
| Open Saved drawer | `overflow: "hidden"` | ✅ `"hidden"` confirmed (100ms delay for React effect) |
| Close Saved drawer (Escape) | `overflow: ""` | ✅ `""` confirmed |
| Open Quick Details on mobile (375px) | Full-width drawer, scroll locked | ✅ `panelWidth: 375 === innerWidth: 375`, `scrollLocked: true` |
| Guidance note visible on mobile | Text present at bottom of scroll area | ✅ `guidanceNoteText: "Message us on WhatsApp to confirm current details before ordering."` |
| Action buttons still present on mobile | Add to Inquiry + WhatsApp visible | ✅ `addBtnVisible: true`, `waLinkVisible: true` |
| Cart localStorage unchanged | `"afan_cart"` key, no forbidden fields | ✅ Confirmed |
| Saved localStorage unchanged | `"afan_saved"` key, no forbidden fields | ✅ Confirmed |
| No product detail pages/routes | 404 on unknown route | ✅ Confirmed |

---

## 12. Issues Remaining

**ISSUE-3 (Minor, carried from Phase 15C):** Condition/compatibility note box has no `data-testid` attribute — fragile for future automated testing. No user-facing impact. Not fixed in this phase per scope.

No new issues identified.

---

## 13. Approval Status

**Awaiting user review.**

Phase 15D summary:
- 4 files modified ✅
- Body scroll lock race condition eliminated — centralised in `ShopActionsContext` ✅
- Per-drawer scroll lock `useEffect` removed from all 3 drawers ✅
- Scroll lock confirmed `"hidden"` throughout Details → Inquiry Bag transition ✅
- Mobile guidance note fills blank space, no fake data ✅
- No business logic changed ✅
- No product data/prices/specs modified ✅
- Saved and Inquiry Bag behaviour unchanged ✅
- Zero TypeScript errors · Zero build errors · 13/13 pages ✅

---

*Phase 15D · Quick Details QA Fixes · Report version 1.0 · 2026-05-31*
