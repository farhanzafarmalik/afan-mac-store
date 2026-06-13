# PHASE 26C — Product Listing View Details Consistency Fix Report

**Date:** 2026-06-13
**Branch:** main (not deployed — awaiting Phase 26D)

---

## 1. Files Changed

**None in Phase 26C.** All required changes were already applied in Phase 26B:

| File | Status |
|------|--------|
| `components/ProductCard.tsx` | Already updated in Phase 26B ✅ |
| `sections/FeaturedProducts.tsx` | Already updated in Phase 26B ✅ |
| `components/ProductQuickDetailsDrawer.tsx` | Already updated in Phase 26B ✅ |
| `data/products.ts` | Already updated in Phase 26B ✅ |

---

## 2. Root Cause of Reported Issue

Phase 26B applied all changes to `ProductCard.tsx` correctly. The user's finding that product listing cards still showed "Quick details →" was based on the **live Vercel site** (`afan-mac-store.vercel.app`), which has not been deployed since commit `0e7c345` (Phase 25E). The local dev server at `localhost:3000` correctly shows "View details →" on all product listing pages.

There was no code gap in Phase 26B — the fix was complete in the local codebase but not yet deployed.

---

## 3. Search Result — No "Quick details" Remaining

```bash
grep -rn "Quick details\|View quick details" . --include="*.tsx" --include="*.ts"
```

**Result: 0 matches.** No instance of "Quick details" or "View quick details" exists anywhere in the codebase.

---

## 4. ProductCard.tsx Fix Summary

`components/ProductCard.tsx` contains all three required surfaces wired to `openDetailsDrawer(product)`:

| Surface | Element | aria-label | Status |
|---------|---------|-----------|--------|
| Media/icon area | `<button style="position:absolute;inset:0;zIndex:0">` | `View details for {name}` | ✅ |
| Product title | `<h3><button onClick=...>` | `View details for {name}` | ✅ |
| Text link | `<button>View details →</button>` | `View details for {name}` | ✅ |
| Heart/save | Separate button, zIndex:1 | Unchanged | ✅ |
| Add to Inquiry/Cart | Separate button | Unchanged | ✅ |
| Ask on WhatsApp | `<a>` element | Unchanged | ✅ |

Icon gets `pointerEvents:"none"` so clicks pass through to the background button. Heart sits at `zIndex:1` and intercepts independently.

---

## 5. Drawer Media Zone Consistency

`ProductQuickDetailsDrawer.tsx` media zone renders identically regardless of where it is triggered from (Featured Products section or any product listing/category page):

- **Height:** 200px
- **Background:** #F5F5F7
- **Border radius:** 12px
- **Overflow:** hidden
- **When `product.image` is null:** Large icon (`size={64}`, `strokeWidth={1.25}`) — ✅ confirmed showing
- **When `product.image` is set:** `<img>` with `product.imageAlt` fallback — ready for future real assets

---

## 6. Featured Products QA

- ✅ All 8 featured product cards show "View details →"
- ✅ Media area button opens drawer (aria-label: "View details for {name}")
- ✅ Title button opens drawer (aria-label: "View details for {name}")
- ✅ "View details →" text button opens drawer
- ✅ Drawer opens with 200px media zone, icon fallback showing
- ✅ Ask on WhatsApp works independently

---

## 7. Product Listing / Category Pages QA

| Page | Cards | "View details →" | Media btn | Title btn | "Quick details" | Drawer media zone |
|------|-------|-----------------|-----------|-----------|-----------------|-------------------|
| `/products/macbook` | 2 | 2 ✅ | 2 ✅ | 2 ✅ | 0 ✅ | ✅ confirmed |
| `/products/iphone` | 1 | 1 ✅ | 3 total* ✅ | ✅ | 0 ✅ | ✅ |
| `/products/accessories` | 11 | 11 ✅ | ✅ | ✅ | 0 ✅ | ✅ |

*3 = media + title + text buttons per card, all sharing `aria-label^="View details for"`.

Drawer opened from `/products/macbook` "View details →":
```json
{
  "title": "MacBook Pro",
  "mediaZone": { "height": "200px", "borderRadius": "12px", "hasIcon": true }
}
```

---

## 8. Button Conflict Regression

On `/products/accessories` (11 cards):
- `Add to Cart` buttons: 11 — work independently, do not open drawer ✅
- `Ask on WhatsApp` links: 11 — navigate to WhatsApp, do not open drawer ✅
- `View details →` buttons: 11 — open drawer correctly ✅
- Heart/save buttons: present per card, do not open drawer ✅

No button nesting violations. Card `<article>` is not a button wrapper.

---

## 9. Accessibility Confirmation

| Requirement | Status |
|-------------|--------|
| Media button `aria-label="View details for {name}"` | ✅ |
| Title button `aria-label="View details for {name}"` | ✅ |
| Text button `aria-label="View details for {name}"` | ✅ |
| No nested buttons | ✅ — card is `<article>`, not a button |
| Focus-visible ring on all three surfaces | ✅ (`focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]`) |
| Icon `aria-hidden="true"` | ✅ |
| Escape closes drawer | ✅ — unchanged |
| Focus trap in drawer | ✅ — unchanged |

---

## 10. No Fake Data / Images / Pages

- ✅ No fake prices, specs, or stock added
- ✅ No external image URLs (no Apple CDN, no Unsplash, no picsum)
- ✅ All `product.image` values remain `null` — no placeholder images
- ✅ No new routes or product detail pages created
- ✅ `data/products.ts` — only `imageAlt?: string` field added (Phase 26B), no product data changed

---

## 11. Cart / COD / WhatsApp Logic Unchanged

- ✅ WhatsApp number: `923133388666` — not touched
- ✅ COD delivery form: not touched
- ✅ `CartInquiryDrawer`: not touched
- ✅ `lib/shopUtils.ts`: not touched
- ✅ `data/categories.ts`: not touched
- ✅ Add to Inquiry / Add to Cart flow: unchanged
- ✅ Category routes: unchanged

---

## 12. TypeScript Result

```
npx tsc --noEmit
```
✅ No errors. Zero output.

---

## 13. Build Result

```
npm run build
```
✅ Build succeeded. 13 static pages generated.

```
Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /products
└ ● /products/[category]   (+5 paths including macbook, iphone, ipad, mac-mini, imac, apple-watch, airpods, accessories)
```

---

## 14. Issues Remaining

**None.** The "View details →" label and three-surface drawer trigger are consistent across:
- Featured Products section (homepage)
- `/products` listing page
- All `/products/[category]` pages

The discrepancy the user observed was between localhost (up to date) and the live Vercel site (behind by two commits). Deploying the current `main` branch will resolve it on the live site.

---

## 15. Approval Status

**Awaiting user review**
