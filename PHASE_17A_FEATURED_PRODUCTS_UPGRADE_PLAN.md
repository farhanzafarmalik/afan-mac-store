# Phase 17A — Featured Products Upgrade Strategy Plan

**Date:** 2026-05-31
**Status:** Awaiting user approval
**Scope:** Strategy only. No code. No Phase 17B.

---

## 1. Problem

The current Featured Products section on the homepage shows basic cards with:
- A small icon in a grey area
- Product name
- One tag badge
- Heart save button
- "Ask on WhatsApp" CTA

Meanwhile, product listing pages now show richer cards with safe detail chips, a "Details" link, Add to Inquiry/Cart, and a fully functional Quick Details drawer. The Featured Products section has fallen behind. Compared to the listing pages it now feels:

- **Visually thin** — the image/media area is undersized and uses a small grey icon with no visual presence or hierarchy
- **Context-free** — no detail chips, no condition note, no category guidance; users see only a name and generic tag
- **Action-light** — only WhatsApp and heart, which is correct for a homepage showcase, but with no "Details" entry point users have no way to learn more without immediately committing to a WhatsApp conversation
- **Stylistically inconsistent** — the listing page cards feel more considered; homepage cards lag behind in perceived quality

The goal is to close this gap and make the Featured Products section feel like a premium homepage showcase again.

---

## 2. Recommended Solution

Upgrade each Featured Product card to include:

- A **larger media/image area** — tall enough to be visually dominant, image-ready for real product photos in the future, Lucide icon fallback for now
- **Product name** (unchanged)
- **Category badge** (unchanged)
- **1–2 safe detail chips** — pulled from the same `detailBullets` field already on the product
- **Heart save button** — unchanged, same global saved state
- **"Details" text link** — reuses the existing `openDetailsDrawer` from `ShopActionsContext`, no new drawer
- **Ask on WhatsApp CTA** — unchanged

No Add to Inquiry. No Add to Cart. No Buy Now. No Checkout. Featured Products remains a showcase entry point, not a transactional surface.

---

## 3. Image / Media Strategy

**Current state:** `Product` interface already has `image: string | null`. All products currently have `image: null`.

**Rendering logic:**

```
if (product.image) {
  <img src={product.image} alt={product.name} style={{ objectFit: "contain" }} />
} else {
  <CategoryIcon /> — Lucide icon, centered, in a soft visual area
}
```

**Rules:**
- When `image` is a non-null string, render it with `object-contain` so aspect ratios are preserved without cropping
- When `image` is null, render the matching Lucide icon (same ICON_MAP as existing cards) centered in the visual area
- Image background: `#F9F9F9` — consistent with product listing cards
- Do not fetch external images
- Do not use Apple official product renders unless approved assets are provided
- Do not invent or fabricate product imagery
- The layout must be image-ready — when real photos arrive, dropping in the path is the only change needed

---

## 4. Featured Card Content Rules

Content is pulled from existing safe fields already populated in `data/products.ts`. No new data invented.

**Devices (macbook, iphone, ipad, mac-mini, imac, apple-watch, airpods):**

Show up to 2 chips from `detailBullets`:
- "Multiple conditions available"
- "WhatsApp inquiry required"

Optionally show `bestFor` tag if present (e.g. "Best for Work").

**Accessories:**

Show up to 2 chips from `detailBullets`:
- "Apple-device compatible"
- "Price confirmed on WhatsApp"

**Never show:**
- Price (no field exists, never add one)
- Stock count
- RAM, storage, processor, model year
- Battery cycle or health
- PTA status
- Any invented specification

Cards remain honest and general — they guide the user to WhatsApp, not to invented product facts.

---

## 5. Featured Card Action Rules

| Action | Include | Notes |
|---|---|---|
| Heart save button | ✅ Yes | Same global `toggleSaved` from `ShopActionsContext` |
| "Details" text link | ✅ Yes (recommended) | Reuses existing `openDetailsDrawer(product)` — no new drawer |
| Ask on WhatsApp CTA | ✅ Yes | Direct `whatsappLink(product.whatsappMessage)` |
| Add to Inquiry | ❌ No | Stays on product listing pages only |
| Add to Cart | ❌ No | Stays on product listing pages only |
| "View Details" large CTA | ❌ No | Would make cards feel like e-commerce — use small text link only |
| Buy Now | ❌ No | Permanently forbidden |
| Checkout | ❌ No | Permanently forbidden |

The "Details" link trigger is the same `<button>` text link pattern used on product listing cards — small, secondary, underlined blue. Clicking it opens the existing `ProductQuickDetailsDrawer` via `openDetailsDrawer(product)`. This adds a useful interaction without crowding the card or creating a new system.

---

## 6. Layout Recommendation: Marquee vs Static Grid

**Current:** Horizontal auto-scrolling marquee (Framer Motion animation).

**Recommendation: Replace marquee with a static responsive grid.**

**Reasons:**
- The marquee makes cards harder to read — content is in motion, chips and detail text are difficult to scan while scrolling
- Marquee cards are often cropped at viewport edges, making the last visible card feel half-shown
- Keyboard accessibility requires pausing the marquee on focus, which disrupts the reading experience
- A static grid of 4–6 curated cards is more legible, more premium, and requires less JavaScript
- Apple's own homepage uses static showcase layouts for hero product features, not scrolling carousels for product cards
- Static grid scales cleanly: 1 column mobile → 2 tablet → 3 or 4 desktop

**Recommended static layout:**
- **4 featured cards** on desktop — 2×2 grid or 1×4 row
- **2 columns** on tablet
- **1 column** on mobile (full-width cards, vertically stacked)
- `gap: 24px` mobile, `gap: 32px` desktop

If the marquee is kept for any reason, cards must be wide enough that media area and text are fully readable, autoplay must pause on hover/focus, and `prefers-reduced-motion` must disable all motion entirely.

**Decision: recommend static grid.** It is cleaner, more premium, and more accessible.

---

## 7. Card Sizing Rules

| Property | Value |
|---|---|
| Card background | `#FFFFFF` |
| Card border-radius | `18px` (matches listing cards) |
| Card border | `1px solid #E8E8ED` at rest |
| Card hover border | `1px solid #D2D2D7` |
| Card hover shadow | `0 2px 10px rgba(0,0,0,0.07)` |
| Card hover lift | `translateY(-2px)` |
| Media area height | `220px` desktop · `200px` mobile — taller than listing cards (`176px`) |
| Media area background | `#F9F9F9` |
| Icon fallback size | `56px` Lucide icon — slightly larger than listing cards (`48px`) |
| Image fit | `object-contain`, padded `16px` inside media area |
| Content padding | `20px` |
| Chip font size | `11px`, pill shape, muted `#6E6E73` |
| Max chips shown | `2` |
| Details link | `12px`, blue `#0071E3`, underlined, `alignSelf: flex-start` |
| WhatsApp CTA min-height | `44px` |
| Heart tap target | `44×44px` (same as listing cards) |
| Heart visual circle | `28×28px` inside 44px button |

---

## 8. Quick Details Integration Decision

**Decision: Yes — reuse the existing `ProductQuickDetailsDrawer`.**

**Reasoning:**
- The drawer already exists and is mounted globally in `app/layout.tsx`
- `openDetailsDrawer(product: Product)` is already exposed by `ShopActionsContext`
- All featured products are sourced from `data/products.ts` and already have `detailSummary`, `detailBullets`, `confirmationPoints`, `conditionNote`, `compatibilityNote`, and `bestFor` fields populated
- No new drawer component needed
- No data shape mismatch — featured products are full `Product` objects

**Implementation:** `FeaturedProducts.tsx` must be a Client Component (it already is) to call `useShopActions()`. Add `openDetailsDrawer` to the destructured context values. Add a "Details" `<button>` text link to each featured card that calls `openDetailsDrawer(product)`.

The drawer will show the same content it shows on listing pages — correct and consistent by design.

---

## 9. Data Strategy

**Decision: Reuse products directly from `data/products.ts` via the existing `featured: true` flag.**

The `PRODUCTS` array in `data/products.ts` already has `featured: true` on 8 products (MacBook Pro, MacBook Air, iPhone, iPad, Mac mini, Apple Watch, AirPods, Accessories). A utility function `getFeaturedProducts()` (or equivalent) can filter by this flag.

**No separate `data/featured-products.ts` file needed.** All required safe fields (`detailBullets`, `detailSummary`, `confirmationPoints`, `conditionNote`, `compatibilityNote`, `bestFor`) are already populated on every product.

**Benefit:** Single source of truth. Updating a product in `data/products.ts` automatically reflects on both the listing page and the Featured Products section.

**Check before Phase 17B:** Confirm whether `getFeaturedProducts()` or `getProductsByFeatured()` already exists in `lib/product-utils.ts`. If not, add a one-line filter function there — do not duplicate data.

---

## 10. Visual Rules

- **Apple-inspired, clean, not heavy** — no gradients, no thick shadows, no loud color blocks
- Cards are white (`#FFFFFF`) surface with soft `#E8E8ED` border
- Media area is `#F9F9F9` — same as listing cards
- Detail chips: `#F5F5F7` background, `#E8E8ED` border, `#6E6E73` text — same chip style as listing cards
- "Details" link: `#0071E3` text, 12px, underlined — same as listing cards
- WhatsApp CTA: `#25D366` fill, `#1DAE56` hover — same as everywhere
- Heart icon: hollow `#6E6E73` / filled `#FF3B30` — same as listing cards
- Hover lift: `translateY(-2px)`, `0.22s ease` — same timing as listing cards
- Section heading and overline follow PROJECT_LOCKED_RULES typography
- Section spacing: `96px` vertical padding desktop, `64px` mobile
- Grid gap: `32px` desktop, `24px` mobile
- No dark panels, no dark mode, no black cards
- No heavy shadows beyond approved range (`rgba(0,0,0,0.07)` max on hover)
- `prefers-reduced-motion`: all hover transitions instant, no transform

---

## 11. Accessibility Rules

| Requirement | Implementation |
|---|---|
| Heart button | `aria-pressed={saved}` · `aria-label="Save {name}"` / `"Remove {name} from saved"` |
| "Details" button | `aria-label="View quick details for {name}"` |
| WhatsApp link | `aria-label="Ask about {name} on WhatsApp"` |
| Tap targets | Heart: `44×44px` · Details: `minHeight: 20px` acceptable (text link) · WhatsApp: `minHeight: 44px` |
| No nested links | WhatsApp is an `<a>`. Details is a `<button>`. Heart is a `<button>`. No element wraps another interactive element. |
| No full-card link | Card `<article>` is not wrapped in `<a>` |
| Card role | `<article>` with implicit landmark role |
| Focus rings | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Section heading | `<h2>` — "Featured Products" or similar — one per section, logical hierarchy under page `<h1>` |
| If marquee is kept | Must pause on hover and keyboard focus · `prefers-reduced-motion`: no animation, static display |

---

## 12. Files Likely Needed in Phase 17B

| File | Action | Notes |
|---|---|---|
| `sections/FeaturedProducts.tsx` | Modify | Main upgrade — larger media area, chips, Details trigger, static grid layout |
| `lib/product-utils.ts` | Check / add | Confirm or add `getFeaturedProducts()` filter utility |
| `data/products.ts` | Do not modify | All required fields already populated |
| `context/ShopActionsContext.tsx` | Do not modify | `openDetailsDrawer` already exported |
| `components/ProductQuickDetailsDrawer.tsx` | Do not modify | Already handles any full `Product` object |
| `app/page.tsx` (homepage) | Check only | Verify `FeaturedProducts` is imported and rendered — no change expected |

No new routes. No new page files. No new context. No new drawer.

---

## 13. Forbidden Work

- No product detail pages or new routes
- No fake product images (no external URLs, no invented renders)
- No fake prices on any card
- No fake stock counts
- No fake RAM, storage, model year, battery, PTA status
- No Add to Inquiry on Featured Product cards
- No Add to Cart on Featured Product cards
- No "Buy Now" or "Checkout" labels
- No changes to Hero
- No changes to product listing pages, category tabs, or ProductCard
- No changes to SavedDrawer, CartInquiryDrawer, or ShopActionsContext logic
- No new npm packages

---

## 14. Approval Status

**Awaiting user approval.**

Once approved, Phase 17B begins with:
1. Replacing the marquee with a static responsive grid in `sections/FeaturedProducts.tsx`
2. Upgrading card media area height and image-readiness
3. Adding up to 2 safe detail chips from `product.detailBullets`
4. Adding "Details" text link wired to `openDetailsDrawer(product)`
5. Confirming `getFeaturedProducts()` exists in `lib/product-utils.ts` or adding it
6. Browser QA on desktop and mobile
