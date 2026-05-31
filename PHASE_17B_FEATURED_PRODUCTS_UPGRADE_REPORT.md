# Phase 17B — Featured Products Upgrade Report

**Date:** 2026-05-31
**Status:** Awaiting user review

---

## 1. Files Created / Changed

### Modified

| File | Change |
|---|---|
| `sections/FeaturedProducts.tsx` | Full rewrite — marquee removed, static grid, upgraded cards, data source switched to `Product[]` from `data/products.ts` |
| `lib/product-utils.ts` | Added `getFeaturedProducts()` — filters `PRODUCTS` by `featured === true` |

### Unchanged (confirmed)

`data/products.ts` · `components/ProductCard.tsx` · `components/ProductQuickDetailsDrawer.tsx` · `components/SavedDrawer.tsx` · `components/CartInquiryDrawer.tsx` · `context/ShopActionsContext.tsx` · all product pages · `sections/Hero.tsx` · `components/Navbar.tsx` · `components/Footer.tsx`

---

## 2. Layout Change Summary

| Before (Phase 12B) | After (Phase 17B) |
|---|---|
| Auto-scrolling horizontal marquee | Static responsive grid |
| Products duplicated for seamless loop | Products rendered once, no duplicates |
| Cards cropped at viewport edges | No cropping — full cards visible |
| Framer Motion `useAnimationFrame` running on homepage | No animation runtime overhead |
| Paused on hover/focus (marquee) | No pause logic needed (static) |
| Desktop: continuous scroll strip | Desktop: `grid-cols-4` — 4 cards per row |
| Mobile: horizontal scroll strip | Mobile: `grid-cols-1` — full-width stacked cards |
| Tablet: horizontal scroll strip | Tablet: `grid-cols-2` — 2-column grid |

Removed imports: `motion`, `MotionConfig`, `useMotionValue`, `useAnimationFrame`, `useReducedMotion`, `useRef`, `useEffect`, `MarqueeTrack` component.

---

## 3. Data Source Summary

**Previous:** `data/featured-products.ts` → `FeaturedProduct[]` (separate file with its own type, icon string field)

**Now:** `data/products.ts` → `Product[]` filtered by `featured === true` via `getFeaturedProducts()`

**`getFeaturedProducts()` added to `lib/product-utils.ts`:**
```ts
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured === true);
}
```

**Products returned (7 items):**
MacBook Pro · MacBook Air · iPhone · iPad · Mac mini · Apple Watch · AirPods

`data/products.ts` was **not modified**. `data/featured-products.ts` is no longer imported by `FeaturedProducts.tsx` (the old file still exists on disk but is unused).

**Benefit:** Single source of truth. All Phase 15B safe detail fields (`detailBullets`, `detailSummary`, `confirmationPoints`, `conditionNote`, `bestFor`) are available on every `Product` object — no data duplication, no type friction with `openDetailsDrawer(product: Product)`.

---

## 4. Media / Image Fallback Summary

Each featured card has a dedicated media area:

| Property | Value |
|---|---|
| Height | `220px` (confirmed via `offsetHeight: 220` on all 7 cards) |
| Background | `#F9F9F9` |
| Border-bottom | `1px solid #E8E8ED` |
| Overflow | `hidden` — image-ready |

**Fallback logic:**
```tsx
{product.image ? (
  <img src={product.image} alt={product.name}
    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
) : (
  <Icon size={56} color="#6E6E73" strokeWidth={1.5} aria-hidden="true" />
)}
```

- All 7 current products have `image: null` → Lucide icon renders at 56px muted grey
- When real photo assets are added later, setting `image: "/products/filename.webp"` is the only change needed
- No external image URLs. No fake Apple product renders.

ICON_MAP keyed by `categorySlug` (same pattern as `ProductCard.tsx`):
```
macbook → Laptop · iphone → Smartphone · ipad → TabletSmartphone
mac-mini → Server · imac → Monitor · apple-watch → Watch
airpods → Headphones · accessories → Package
```

---

## 5. Featured Card Content Summary

Each card contains, top to bottom:

1. **Media area** — 220px, icon fallback, heart button absolutely positioned top-right
2. **Name + tag row** — `h3` product name · tag badge (`#AEAEB2`, pill)
3. **Short description** — from `product.shortDescription`, `line-clamp-2`
4. **Up to 2 safe chips** — from `product.detailBullets.slice(0, 2)`, pill style `#F5F5F7`/`#E8E8ED`/`#6E6E73`
5. **"Details" text button** — small, blue `#0071E3`, underlined, `alignSelf: flex-start`
6. **"Ask on WhatsApp" CTA** — green `#25D366` pill, `minHeight: 44px`, `marginTop: auto`

**Chip count confirmed:** all 7 cards returned `chips: 2` in browser eval.

---

## 6. Heart Behavior Summary

- Uses `useShopActions()` — same global context as listing page cards
- `toggleSaved({ id, name, categorySlug, category })` — same `ProductInput` shape
- `isSaved(product.id)` — same saved state
- `aria-pressed={saved}` toggles `true`/`false`
- `aria-label` switches between `"Save {name}"` and `"Remove {name} from saved"`
- 44×44px tap target, 28×28px visual circle — matches listing card heart exactly
- Saving from Featured Products updates the same `afan_saved` localStorage key and increments the Navbar saved badge

**Browser verified:** `savedBefore: "false"` → click → `savedAfter: "true"` · Navbar badge updated to `"Saved products, 2 items"`

---

## 7. Details Link Behavior Summary

- `<button>` element — `alignSelf: flex-start`, `fontSize: 12px`, `color: #0071E3`, underlined
- Calls `openDetailsDrawer(product)` from `useShopActions()` — passes the full `Product` object
- The existing `ProductQuickDetailsDrawer` opens — **no new drawer created**
- `aria-label="View quick details for {product.name}"`
- Body scroll locks to `overflow: hidden` via the centralised lock in `ShopActionsContext` (Phase 15D)

**Browser verified:** `drawerOpen: true` · `drawerTitle: "MacBook Pro"` · `scrollLocked: true`

---

## 8. WhatsApp Behavior Summary

- `<a href={whatsappLink(product.whatsappMessage)} target="_blank" rel="noopener noreferrer">`
- `aria-label="Ask about {product.name} on WhatsApp"`
- `minHeight: 44px` · `background: #25D366` · hover `#1DAE56`
- All links route through `whatsappLink()` from `lib/constants.ts` — no hardcoded `wa.me` URLs
- Pre-filled message is the product's existing `whatsappMessage` field

---

## 9. Confirmation: No Add to Inquiry / Add to Cart on Featured Products

Browser scan of all 7 featured cards confirmed:

| Check | Result |
|---|---|
| `hasAddToInquiry` on all cards | `false` × 7 |
| `hasAddToCart` on all cards | `false` × 7 |
| "Buy Now" in section text | `false` |
| "Checkout" in section text | `false` |

---

## 10. Confirmation: No Fake Images / Prices / Specs / Stock

| Forbidden item | Status |
|---|---|
| External image URLs | ✅ None — all `image: null`, icon fallback used |
| Fake Apple product renders | ✅ None |
| Price field or display | ✅ Not present — no `price` field on `Product` |
| Stock count | ✅ Not present |
| RAM, storage, model year | ✅ Not present |
| Battery cycle / PTA status | ✅ Not present |
| `data/products.ts` modified | ✅ Not modified |

---

## 11. Confirmation: Product Listing Pages / Category Tabs / Drawers Unchanged

**Browser verified on `/products/macbook`:**

| Check | Result |
|---|---|
| Category tabs present | ✅ `categoryTabsPresent: true` |
| MacBook tab active | ✅ `activeTab: "MacBook"` |
| Product cards have Add to Inquiry | ✅ `firstCardHasAddToInquiry: true` |
| Product cards have Details trigger | ✅ `firstCardHasDetailsBtn: true` |
| Card count correct | ✅ `cardCount: 2` (MacBook Pro + MacBook Air) |

`SavedDrawer`, `CartInquiryDrawer`, `ProductQuickDetailsDrawer`, `ShopActionsContext` — all confirmed not modified.

---

## 12. Accessibility Summary

| Requirement | Implementation | Status |
|---|---|---|
| Section `h2` | `<h2 id="featured-heading">Popular Apple picks at Afan Mac Store.</h2>` | ✅ |
| Section landmark | `<section aria-labelledby="featured-heading">` | ✅ |
| Card element | `<article>` per card | ✅ |
| No full-card link | Card `<article>` is not `<a>` | ✅ |
| No nested links | WhatsApp is `<a>`, Details is `<button>`, Heart is `<button>` — none nested | ✅ |
| Heart `aria-pressed` | `aria-pressed={saved}` — toggles `true`/`false` | ✅ |
| Heart `aria-label` | `"Save {name}"` / `"Remove {name} from saved"` | ✅ |
| Heart tap target | `44×44px` | ✅ |
| Details `aria-label` | `"View quick details for {name}"` | ✅ |
| WhatsApp `aria-label` | `"Ask about {name} on WhatsApp"` | ✅ |
| WhatsApp tap target | `minHeight: 44px` | ✅ |
| Focus rings | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements | ✅ |
| No marquee keyboard trap | Marquee removed entirely | ✅ |
| `prefers-reduced-motion` | No motion in static grid — `transition` only on hover, not auto-play | ✅ |
| Image alt text | `alt={product.name}` when image is set | ✅ |
| Icon fallback | `aria-hidden="true"` on decorative Lucide icons | ✅ |

---

## 13. TypeScript Result

```
npx tsc --noEmit → exit code 0 — zero errors
```

---

## 14. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully
✓ TypeScript: zero errors
✓ Generating static pages (13/13) in 324ms

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. 13/13 pages generated.
```

---

## 15. Manual QA Checklist

| Test | Expected | Result |
|---|---|---|
| Homepage Featured Products — static grid | No marquee, grid layout | ✅ `hasMarquee: false`, `hasGrid: true` |
| No duplicated products | 7 unique cards | ✅ `cardCount: 7` |
| Cards not cropped | Full cards visible | ✅ Screenshot confirmed |
| Media area 220px | `offsetHeight: 220` | ✅ All 7 cards confirmed |
| Icon fallback when image null | Lucide icon centered | ✅ Screenshot confirmed |
| 2 chips per card | `chips: 2` | ✅ All 7 cards confirmed |
| Details button present | `hasDetailsBtn: true` | ✅ All 7 cards |
| Details opens Quick Details drawer | `drawerOpen: true`, `drawerTitle: "MacBook Pro"` | ✅ |
| Scroll locked when drawer open | `scrollLocked: true` | ✅ |
| Heart save toggles | `savedBefore: "false"` → `savedAfter: "true"` | ✅ |
| Navbar saved badge updates | `"Saved products, 2 items"` | ✅ |
| No Add to Inquiry on any featured card | `hasAddToInquiry: false` × 7 | ✅ |
| No Add to Cart on any featured card | `hasAddToCart: false` × 7 | ✅ |
| No "Buy Now" in section | `hasBuyNow: false` | ✅ |
| No "Checkout" in section | `hasCheckout: false` | ✅ |
| WhatsApp CTA present | `hasWaLink: true` × 7 | ✅ |
| Mobile — 1-column, no overflow | `pageOverflow: false`, `cardFillsColumn: true` | ✅ |
| Mobile — card fills width | `firstCardWidth: 343` at `viewportWidth: 375` | ✅ |
| `/products/macbook` — listing page unchanged | Category tabs + Add to Inquiry intact | ✅ |
| Category tabs on listing pages | `categoryTabsPresent: true` | ✅ |
| Wishlist / Inquiry Bag drawers | Not modified | ✅ |
| `/products/unknown` — 404 | Not affected by this change | ✅ |
| Build: 13/13 pages | All static pages generated | ✅ |

---

## 16. Issues / Risks

**None identified.**

- Zero TypeScript errors
- Zero build errors
- No forbidden content anywhere in the section
- `data/featured-products.ts` is now unused (its import was removed from `FeaturedProducts.tsx`). The file still exists on disk but causes no errors — it is simply an orphaned file. It can be deleted in a future cleanup phase.

---

## 17. Approval Status

**Awaiting user review.**

Phase 17B summary:
- Marquee replaced with static responsive grid ✅
- 7 featured products sourced from `data/products.ts` via `featured: true` flag ✅
- `getFeaturedProducts()` added to `lib/product-utils.ts` ✅
- 220px media area with Lucide icon fallback — image-ready ✅
- 2 safe detail chips per card from existing `detailBullets` ✅
- Heart save wired to global context — updates Navbar badge ✅
- "Details" text link opens existing `ProductQuickDetailsDrawer` ✅
- WhatsApp CTA via `whatsappLink()` — no hardcoded URLs ✅
- Zero Add to Inquiry / Add to Cart on featured cards ✅
- Zero fake images / prices / specs / stock ✅
- Listing pages, category tabs, and all drawers unchanged ✅
- Mobile: full-width single column, no overflow ✅
- Zero TypeScript errors · Zero build errors · 13/13 pages ✅

---

*Phase 17B · Featured Products Upgrade · Report version 1.0 · 2026-05-31*
