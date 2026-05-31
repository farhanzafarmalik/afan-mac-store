# PHASE_7A_PRODUCT_LISTING_PLAN.md
**Phase 7A — Product Listing Pages · Planning Document**

---

## 1. Page Purpose

Product Listing Pages are the first real destination pages on the site — they sit below the homepage and give users a focused, category-scoped view of what Afan Mac Store carries.

Each page serves three goals:
- **Inform** — show what product types exist in a category, clearly and honestly
- **Build trust** — premium layout, genuine condition labels, no fake pricing or fake inventory
- **Convert** — every card and page header offers a direct WhatsApp inquiry path

These pages are **not** a checkout system. They are WhatsApp-led inquiry pages. There are no prices, no cart, no payment flow, and no fake stock numbers. A user who lands on `/products/macbook` should immediately understand what's available and be one tap away from asking on WhatsApp.

**Relationship to existing sections:**
- Category Strip (Phase 5B): currently links to these slugs — links are dead. Phase 7B activates them.
- Featured Products Strip (Phase 6B): `categorySlug` stored in data but not linked. Phase 7B can activate if approved.
- Navbar Products dropdown (Phase 3B): already links to these exact routes. Phase 7B makes them live.

---

## 2. Approved Category Routes

| # | Category | Route | Page h1 |
|---|---|---|---|
| 1 | MacBook | `/products/macbook` | MacBooks at Afan Mac Store |
| 2 | iPhone | `/products/iphone` | iPhones at Afan Mac Store |
| 3 | iPad | `/products/ipad` | iPads at Afan Mac Store |
| 4 | Mac mini | `/products/mac-mini` | Mac mini at Afan Mac Store |
| 5 | iMac | `/products/imac` | iMacs at Afan Mac Store |
| 6 | Apple Watch | `/products/apple-watch` | Apple Watch at Afan Mac Store |
| 7 | AirPods | `/products/airpods` | AirPods at Afan Mac Store |
| 8 | Accessories | `/products/accessories` | Accessories at Afan Mac Store |

All 8 pages are generated from a single dynamic route: `app/products/[category]/page.tsx`.

**`/products` (All Products) page:** The Navbar links to "All Products" as the first dropdown item. This page is in scope for Phase 7B and is implemented as `app/products/page.tsx`. It renders all 19 products from `data/products.ts` in the same 3-column grid used on category pages. The `<h1>` reads "All Products at Afan Mac Store". The same `ProductCard` component is reused. No prices, no checkout — identical rules apply.

**Note on AGENTS.md:** The project's `AGENTS.md` requires reading the relevant guide in `node_modules/next/dist/docs/` before writing routing code. Phase 7B must verify the `params` API, `generateStaticParams`, and dynamic segment conventions for the installed Next.js 16 version before implementation.

---

## 3. Product Data Strategy

### Interface — `data/products.ts`

```ts
export interface Product {
  id: string;
  name: string;
  /** Display category name e.g. "MacBook" */
  category: string;
  /** URL param segment only — e.g. "macbook", "mac-mini". Used as the [category] param in dynamic routes and in getProductsByCategory() comparisons. Never a full path. */
  categorySlug: string;
  /** Full href for navigation — e.g. "/products/macbook". Derived from categorySlug for use in Links and categoryHref lookups. */
  categoryHref: string;
  shortDescription: string;
  /** Condition/quality badge e.g. "Verified device" */
  tag: string;
  /** Optional extended condition label — not shown until real data available */
  conditionLabel?: string;
  /** null until real local/licensed assets are ready */
  image: string | null;
  /** Pre-filled WhatsApp inquiry message */
  whatsappMessage: string;
  /** true if this product appears in homepage Featured Products strip */
  featured?: boolean;
  /** Reserved for Phase 8+ product detail pages — not used in Phase 7B */
  detailsSlug?: string;
  /** Reserved for real spec data — empty array until specs are available */
  specs?: string[];
}
```

### Data rules

- `image` is always `null` in Phase 7B — icon fallback renders instead
- `specs` is always `[]` in Phase 7B — no fake specifications rendered
- `conditionLabel` is omitted unless real condition info is provided
- `detailsSlug` is reserved for Phase 8 — not rendered as a link in Phase 7B
- `featured: true` marks products that appear in the homepage strip — allows filtering without a separate data file
- `price` field does not exist on this interface — no accidental price rendering

### Utility — `lib/product-utils.ts` (planned)

```ts
// Planned helper functions — written in Phase 7B

/** Returns all products across all categories — used by /products (All Products) page */
getAllProducts(): Product[]

/** Returns products whose categorySlug param matches the given slug — e.g. "macbook", "mac-mini".
 *  The slug is the [category] dynamic param, NOT a full path. */
getProductsByCategory(categorySlug: string): Product[]

/** Returns page copy for a given category param slug — e.g. "macbook", "mac-mini".
 *  Returns undefined / triggers notFound() for unknown slugs. */
getCategoryMeta(categorySlug: string): CategoryMeta | undefined
```

`CategoryMeta` holds per-category page copy:
```ts
interface CategoryMeta {
  slug: string;         // "macbook" — param only, matches [category] segment
  name: string;         // "MacBook"
  h1: string;           // "MacBooks at Afan Mac Store"
  subtext: string;      // short sentence about the category
  whatsappMessage: string; // category-level inquiry message
}
```

This separates page copy from product data, keeping `data/products.ts` focused on product records only.

---

## 4. Starter Product List

Exactly the products below. No additions without user approval.

### MacBook — `/products/macbook`

| id | name | tag | featured |
|---|---|---|---|
| `macbook-pro` | MacBook Pro | Verified device | true |
| `macbook-air` | MacBook Air | Verified device | true |

### iPhone — `/products/iphone`

| id | name | tag | featured |
|---|---|---|---|
| `iphone` | iPhone | Genuine product | true |

### iPad — `/products/ipad`

| id | name | tag | featured |
|---|---|---|---|
| `ipad` | iPad | Genuine product | true |

### Mac mini — `/products/mac-mini`

| id | name | tag | featured |
|---|---|---|---|
| `mac-mini` | Mac mini | Verified device | true |

### iMac — `/products/imac`

| id | name | tag | featured |
|---|---|---|---|
| `imac` | iMac | Verified device | false |

### Apple Watch — `/products/apple-watch`

| id | name | tag | featured |
|---|---|---|---|
| `apple-watch` | Apple Watch | Genuine product | true |

### AirPods — `/products/airpods`

| id | name | tag | featured |
|---|---|---|---|
| `airpods` | AirPods | Genuine product | true |

### Accessories — `/products/accessories`

| id | name | tag | featured |
|---|---|---|---|
| `adapter-20w` | 20W USB-C iPhone Adapter | Genuine product | false |
| `adapter-30w` | 30W USB-C iPhone Adapter | Genuine product | false |
| `adapter-45w` | 45W USB-C MacBook Adapter | Genuine product | false |
| `adapter-67w` | 67W USB-C MacBook Adapter | Genuine product | false |
| `adapter-96w` | 96W USB-C MacBook Adapter | Genuine product | false |
| `cable-usbc-usbc` | Braided USB-C to USB-C Cable | Genuine product | false |
| `cable-usbc-lightning` | Braided USB-C to Lightning Cable | Genuine product | false |
| `magsafe-charger` | MagSafe Charger | Genuine product | false |
| `macbook-sleeve` | MacBook Sleeve | Curated selection | false |
| `macbook-case` | Hard Shell MacBook Case | Curated selection | false |
| `laptop-stand` | Foldable Laptop Stand | Curated selection | false |

**Total: 19 products across 8 categories.**

---

## 5. Accessories Catalog Rule

The Accessories starter catalog is **exactly the 11 items listed above**. No variations, bundles, or additional items are invented.

Tags used for accessories:
- `Genuine product` — for Apple-branded or Apple-compatible adapters, cables, MagSafe
- `Curated selection` — for third-party accessories (sleeve, case, stand)

If new accessories are added in future, they require explicit user approval with name and tag defined before code is written.

---

## 6. Product Listing Page Layout

Each category page renders as a full Next.js App Router page (Server Component at the top level). It does not modify the shared layout — the Navbar and future Footer are inherited from `app/layout.tsx`.

### Page structure (top to bottom)

```
[Navbar — inherited from layout, fixed 64px]

┌───────────────────────────────────────────┐
│  CATEGORY HEADER                          │  ← section, pt to clear navbar (~80px)
│  "Products"              overline         │
│  MacBooks at Afan Mac Store.       h1     │
│  Subtext sentence.                        │
│  [Ask about MacBook on WhatsApp]   CTA    │
└───────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│  PRODUCT GRID                             │  ← section
│  [Card] [Card] [Card]                     │
│  [Card] [Card] [Card]                     │
│  ...                                      │
└───────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│  EMPTY STATE (conditional)                │  ← shown only when no products found
│  "Current availability changes quickly.   │
│   Message us on WhatsApp for latest       │
│   options."                               │
│  [Message us on WhatsApp]  CTA            │
└───────────────────────────────────────────┘
```

### Category header detail

| Element | Spec |
|---|---|
| Overline | "Products" — 11px, uppercase, `tracking-[0.10em]`, `#AEAEB2` |
| `<h1>` | `clamp(2rem, 4vw + 0.5rem, 3.5rem)`, `font-semibold`, `#1D1D1F`, `tracking-[-0.02em]` |
| Subtext | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`, `#6E6E73`, `max-width: 560px` |
| WhatsApp CTA | `#25D366` solid pill, `#FFFFFF` text, MessageCircle icon, `min-height: 44px`, `whatsappLink()` |
| Section padding | `clamp(64px, 8vw, 96px)` top (accounts for fixed navbar) / `clamp(40px, 5vw, 56px)` bottom |
| Max width | `1200px`, centered, `px-4 md:px-8` |
| Section background | `#F5F5F7` |

### Category subtext strings

| Category | Subtext |
|---|---|
| MacBook | Genuine MacBooks for work, study, and creativity. Message us to find the right one. |
| iPhone | Trusted iPhones, ready to use. Ask us for current options. |
| iPad | iPads for work and study. Message us for availability. |
| Mac mini | Compact desktop power. Message us for current stock. |
| iMac | All-in-one desktop. Message us to check availability. |
| Apple Watch | Smartwatches for daily use. Ask us for current options. |
| AirPods | Wireless audio, easy pairing. Message us for availability. |
| Accessories | Cables, adapters, cases, and more. Ask us what's in stock. |

### Category WhatsApp messages

| Category | Message |
|---|---|
| MacBook | `Hi Afan Mac Store, I'm looking for MacBook. Please share current options and availability.` |
| iPhone | `Hi Afan Mac Store, I'm looking for iPhone. Please share current options and availability.` |
| iPad | `Hi Afan Mac Store, I'm looking for iPad. Please share current options and availability.` |
| Mac mini | `Hi Afan Mac Store, I'm looking for Mac mini. Please share current options and availability.` |
| iMac | `Hi Afan Mac Store, I'm looking for iMac. Please share current options and availability.` |
| Apple Watch | `Hi Afan Mac Store, I'm looking for Apple Watch. Please share current options and availability.` |
| AirPods | `Hi Afan Mac Store, I'm looking for AirPods. Please share current options and availability.` |
| Accessories | `Hi Afan Mac Store, I'm looking for Accessories. Please share what's currently available.` |

### Product grid detail

- CSS Grid layout — same token system as homepage sections
- Equal card height: `align-items: stretch` (default grid behavior)
- Section padding: `clamp(40px, 5vw, 64px)` top / `clamp(64px, 8vw, 96px)` bottom
- Max width: `1200px`, centered, `px-4 md:px-8`
- Section background: `#F5F5F7`

### Empty state detail

Rendered when `getProductsByCategory(categorySlug)` returns an empty array.

| Element | Spec |
|---|---|
| Icon | `PackageSearch` (Lucide), 48px, `#AEAEB2`, `aria-hidden` |
| Heading | "Nothing listed yet." — `<h2>`, 20px, `font-semibold`, `#1D1D1F` |
| Body | "Current availability changes quickly. Message us on WhatsApp for latest options." — 15px, `#6E6E73` |
| CTA | `#25D366` WhatsApp pill, `whatsappLink()` with category-level message |
| Container | Centered, `max-width: 400px`, `padding: clamp(64px, 8vw, 96px) 0` |

---

## 7. Product Card Structure

Each product card is a standalone `<article>` — **not** wrapped in a `<Link>`. The WhatsApp CTA is the only interactive element. No nested links.

```
┌──────────────────────────────────────────┐
│                                          │
│           [ Icon — 48px ]               │  ← Visual area: #F9F9F9, ~200px, top radius
│                                          │
├──────────────────────────────────────────┤  ← 1px solid #E8E8ED
│  Product Name                  [Tag]    │  ← h3, 17px, semibold; tag: 11px pill badge
│  Short description (1–2 lines)          │  ← 13px, #6E6E73, line-clamp-2
│                                          │
│  [Ask on WhatsApp ↗]                   │  ← full-width #25D366 pill, min-h 44px
└──────────────────────────────────────────┘
```

### Field rendering

| Field | Element | Style |
|---|---|---|
| Visual area | `<div>` | `#F9F9F9` bg, `200px` height, `radius-lg` top corners, `inset 0 1px 0 rgba(255,255,255,0.80)` inner highlight |
| Icon | Lucide component, centered in visual area | 48px, `#6E6E73`, `strokeWidth: 1.5`, `aria-hidden` |
| `name` | `<h3>`, 17px, `font-weight: 600`, `#1D1D1F` | `letterSpacing: "normal"` |
| `tag` | `<span>` pill badge, right of name | 11px, `#AEAEB2`, `#F5F5F7` bg, `border: 1px solid #E8E8ED`, `radius-full` |
| `shortDescription` | `<p>`, 13px, `#6E6E73`, `line-clamp-2` | `letterSpacing: "normal"`, `wordSpacing: "normal"` |
| WhatsApp CTA | `<a>`, full-width pill | `#25D366` bg, `#FFFFFF` text, `min-height: 44px`, `whatsappLink()` |

### What product cards do NOT include

- No price
- No sale ribbon or discount badge
- No stock count or "in stock" label
- No model spec detail (storage, RAM, chip)
- No warranty claim
- No "Buy Now" or "Add to Cart"
- No "View details" link in Phase 7B (reserved for Phase 8 if detail pages are approved)
- No `<Link>` wrapping the `<article>` — nested links are invalid HTML
- No Apple logo or trademark

### Card hover

| Property | Rest | Hover |
|---|---|---|
| `transform` | `translateY(0)` | `translateY(-2px)` |
| `box-shadow` | `0 1px 4px rgba(0,0,0,0.05)` | `0 2px 10px rgba(0,0,0,0.07)` |
| `border-color` | `#E8E8ED` | `#D2D2D7` |
| Transition | — | `0.22s ease` on border, shadow, transform |

No scale. Shadow opacity cap: `0.07`.

---

## 8. WhatsApp CTA Behavior

### Per-product CTA

```
Label:    "Ask on WhatsApp"
Icon:     MessageCircle (Lucide), 16px, left of label
Element:  <a> — opens in new tab
target:   _blank
rel:      noopener noreferrer
aria-label: "Ask about [Product Name] on WhatsApp"
href:     whatsappLink(product.whatsappMessage)
```

### Per-category page CTA (header)

```
Label:    "Ask about [Category] on WhatsApp"
Icon:     MessageCircle (Lucide), 16px
Element:  <a>
target:   _blank
rel:      noopener noreferrer
aria-label: "Ask about [Category Name] on WhatsApp"
href:     whatsappLink(categoryMeta.whatsappMessage)
```

### Empty state CTA

```
Label:    "Message us on WhatsApp"
href:     whatsappLink(categoryMeta.whatsappMessage)
```

### Rule

Never hardcode `wa.me/...` in any component or page. All links go through `whatsappLink()` from `lib/constants.ts`. Changing `WHATSAPP_NUMBER` in `lib/constants.ts` updates every link site-wide automatically.

---

## 9. Visual Style Rules

| Element | Value |
|---|---|
| Page background | `#F5F5F7` |
| Card surface | `#FFFFFF` |
| Card border-radius | `18px` (radius-lg) |
| Card border at rest | `1px solid #E8E8ED` |
| Card shadow at rest | `0 1px 4px rgba(0,0,0,0.05)` |
| Card border on hover | `1px solid #D2D2D7` |
| Card shadow on hover | `0 2px 10px rgba(0,0,0,0.07)` — never heavier |
| Visual area background | `#F9F9F9` |
| Visual area height | `~200px` fixed |
| Icon | 48px, `#6E6E73`, `strokeWidth: 1.5` |
| Text primary | `#1D1D1F` |
| Text secondary | `#6E6E73` |
| Text muted / tag | `#AEAEB2` |
| Accent CTA | `#0071E3` — not used on product cards (WhatsApp replaces it as primary CTA) |
| WhatsApp CTA bg | `#25D366`, hover `#1DAE56` |

**Forbidden on product listing pages:**
- External product images — none until real assets are provided
- Apple logo or trademark anywhere
- Loud gradients on cards or page
- Dark or black section
- "Your Apple Store" or any phrasing implying official Apple retail status
- Fake prices, discounts, stock counts, or warranty claims

---

## 10. Responsive Behavior

### Grid breakpoints

| Viewport | Columns | Gap |
|---|---|---|
| Mobile (`< 640px`) | 1 column | `24px` |
| Tablet (`640px – 1023px`) | 2 columns | `24px` |
| Desktop (`≥ 1024px`) | **3 columns** | `32px` |

3 columns on desktop chosen over 4 — product cards carry more content than homepage strip tiles (visual area + name + description + CTA). At 1200px container width with 32px padding and 2×32px gaps, each card is ≈ 363px, which gives the content space to breathe.

Tailwind: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

### Container

```
Max width:     1200px
Pad desktop:   32px   (md:px-8)
Pad mobile:    16px   (px-4)
Background:    #F5F5F7
Overflow:      no horizontal page overflow at any breakpoint
```

Equal card height: CSS Grid `align-items: stretch` default — no JavaScript needed.

### Navbar clearance

Page header section must add top padding of at least `80px` (64px navbar height + 16px breathing room) so content is not hidden behind the fixed navbar.

---

## 11. Accessibility Rules

| Concern | Rule |
|---|---|
| Heading hierarchy | Page has exactly one `<h1>` — the category headline. Product names use `<h3>`. Never `<h1>` for product names. |
| No nested links | `<article>` is non-interactive. WhatsApp CTA `<a>` is the sole interactive element per card. |
| CTA aria-label | `aria-label="Ask about [Product Name] on WhatsApp"` on every product CTA |
| Page CTA aria-label | `aria-label="Ask about [Category] on WhatsApp"` on the category header CTA |
| Icon accessibility | All Lucide icons: `aria-hidden="true"` + `focusable="false"` |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Min tap target | WhatsApp CTA min-height `44px`, full card width — satisfies WCAG |
| External links | `target="_blank"` + `rel="noopener noreferrer"` on all WhatsApp `<a>` elements |
| Semantic page structure | `<main>` wraps page content; `<section>` for header and grid; `aria-labelledby` on sections |
| Color contrast | `#1D1D1F` on `#FFFFFF` = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). `#FFFFFF` on `#25D366` = 3.03:1 (AA large). All pass. |
| Page metadata | `generateMetadata` exports dynamic `title` and `description` per category for SEO |

---

## 12. Files to Create / Change in Phase 7B

| File | Action | Notes |
|---|---|---|
| `app/products/page.tsx` | **Create** | All Products page — renders all 19 products, h1 "All Products at Afan Mac Store", same grid and card component as category pages |
| `app/products/[category]/page.tsx` | **Create** | Dynamic route — 8 category pages from one file. Verify params API in installed Next.js 16 docs before writing. |
| `data/products.ts` | **Create** | 19 product objects, typed `Product` interface. `categorySlug` = param only (e.g. `"macbook"`). `categoryHref` = full path (e.g. `"/products/macbook"`). |
| `lib/product-utils.ts` | **Create** | `getAllProducts()`, `getProductsByCategory()`, and `getCategoryMeta()` helpers |
| `components/ProductCard.tsx` | **Create** | Shared product card component — reusable across `/products` and `/products/[category]` pages |
| `PHASE_7B_PRODUCT_LISTING_REPORT.md` | **Create** | Phase 7B completion report |

### Files explicitly NOT touched in Phase 7B

| File | Status |
|---|---|
| `sections/Hero.tsx` | ✅ Not modified |
| `sections/Categories.tsx` | ✅ Not modified — links already point to approved routes and will automatically work once `/products` and `/products/[category]` pages exist |
| `sections/FeaturedProducts.tsx` | ✅ Not modified — `categorySlug` in data is reserved for future use |
| `components/Navbar.tsx` | ✅ Not modified — already links to correct routes |
| `app/layout.tsx` | ✅ Not modified |
| `app/globals.css` | ✅ Not modified |
| `data/categories.ts` | ✅ Not modified |
| `data/featured-products.ts` | ✅ Not modified |
| `lib/constants.ts` | ✅ Not modified |

### Note on `sections/Categories.tsx` link activation

The Category Strip renders `<Link href={category.slug}>` for each tile. These links are already correct (`/products/macbook`, etc.) — they simply pointed to nonexistent routes in Phases 5B and 6B. Once Phase 7B creates `app/products/[category]/page.tsx`, Next.js will resolve them automatically. No code change to `Categories.tsx` is required.

---

## 13. What NOT to Build in Phase 7B

| Item | Why excluded |
|---|---|
| Product detail pages (`/products/[category]/[id]`) | Phase 8 — requires separate planning and approval |
| `data/products.ts` spec data | No real specs available — field exists but empty |
| "View details" link on cards | No detail pages in Phase 7B — do not add dead navigation |
| Prices of any kind | Not provided — fake prices forbidden |
| Discount / sale badges | Explicitly forbidden — bazaar-style |
| Stock counts or availability status | Not real inventory — forbidden |
| Warranty claims | Not provided — forbidden |
| "Buy Now" or "Add to Cart" | No checkout — forbidden |
| Checkout, payment, backend | Permanently out of scope |
| Cart or wishlist pages | Frontend-only helpers, not product listing scope |
| Admin panel, CMS, database | Permanently out of scope |
| Reviews section | Separate phase |
| Location section | Separate phase |
| Footer | Separate phase |
| Hero redesign | Paused — separate approval required |
| External product images | Forbidden — icon placeholder until real assets provided |
| Apple logo or trademark | Forbidden — no exceptions |
| New npm packages | None required for Phase 7B |

---

## 14. Completion Checklist

*(To be verified at end of Phase 7B)*

**Routing**
- [ ] `app/products/page.tsx` exists and renders the All Products page
- [ ] `app/products/[category]/page.tsx` exists and handles all 8 category slugs
- [ ] `generateStaticParams` exports all 8 category params
- [ ] `generateMetadata` exports dynamic title + description per category (and for All Products page)
- [ ] Unknown category slug renders a 404 or notFound() — not a blank page
- [ ] Dynamic route uses the `[category]` param slug (e.g. `"macbook"`) to call `getProductsByCategory()` — not a full path

**Category page header**
- [ ] Overline reads "Products"
- [ ] `<h1>` renders correct category headline (e.g. "MacBooks at Afan Mac Store")
- [ ] Subtext renders correct per-category copy
- [ ] Category WhatsApp CTA renders with correct pre-filled message
- [ ] Category CTA uses `whatsappLink()` — no hardcoded wa.me links
- [ ] Category CTA aria-label: "Ask about [Category] on WhatsApp"
- [ ] Category CTA opens `_blank` with `rel="noopener noreferrer"`

**Product grid**
- [ ] All products for the category render
- [ ] Grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- [ ] Gap: 32px desktop, 24px mobile
- [ ] All cards equal height within each row

**Product cards**
- [ ] Visual area: `~200px`, `#F9F9F9` bg, centered 48px Lucide icon
- [ ] Product name: `<h3>`, 17px, `font-semibold`, `#1D1D1F`
- [ ] Tag badge: 11px, `#AEAEB2`, pill
- [ ] Description: 13px, `#6E6E73`, `line-clamp-2`, `letterSpacing: normal`
- [ ] WhatsApp CTA: `#25D366` pill, min-height 44px, full card width
- [ ] WhatsApp CTA uses `whatsappLink()` with product-specific message
- [ ] CTA aria-label: "Ask about [Product Name] on WhatsApp"
- [ ] CTA opens `_blank` with `rel="noopener noreferrer"`
- [ ] `<article>` is NOT wrapped in `<Link>` or `<a>`
- [ ] No nested links — one interactive element per card
- [ ] No price anywhere
- [ ] No discount badges
- [ ] No stock counts
- [ ] No specs rendered
- [ ] No "Buy Now" or "Add to Cart"
- [ ] No "View details" link

**Empty state**
- [ ] Empty state renders when category has no products
- [ ] Empty state has icon, heading, body copy, WhatsApp CTA
- [ ] Empty state CTA uses `whatsappLink()`

**Accessories**
- [ ] Exactly 11 accessory products render on `/products/accessories`
- [ ] No invented accessories beyond the approved catalog

**Visual**
- [ ] Page background `#F5F5F7`
- [ ] Card surface `#FFFFFF`, border `#E8E8ED`, radius `18px`
- [ ] Card rest shadow `0 1px 4px rgba(0,0,0,0.05)`
- [ ] Card hover shadow `0 2px 10px rgba(0,0,0,0.07)` — not heavier
- [ ] No external images, no Apple logo, no loud gradients, no black section

**Accessibility**
- [ ] One `<h1>` per page
- [ ] Product names use `<h3>`
- [ ] All Lucide icons `aria-hidden` + `focusable={false}`
- [ ] Focus rings visible on all interactive elements
- [ ] Sections have `aria-labelledby`
- [ ] Navbar clearance: page header top padding accounts for fixed 64px navbar

**All Products page (`/products`)**
- [ ] `app/products/page.tsx` exists
- [ ] `<h1>` reads "All Products at Afan Mac Store"
- [ ] All 19 products render in the same 3-column grid
- [ ] Same `ProductCard` component used — no duplication
- [ ] Category-level WhatsApp CTA in page header uses a general inquiry message via `whatsappLink()`
- [ ] No prices, no checkout, no "Add to Cart"

**Data integrity**
- [ ] Every product in `data/products.ts` has `categorySlug` as a param-only string (e.g. `"macbook"`, `"mac-mini"`) — no leading slash, no full path
- [ ] Every product has `categoryHref` as a full path (e.g. `"/products/macbook"`) for navigation use
- [ ] `getProductsByCategory("macbook")` returns only MacBook products — param comparison works correctly
- [ ] `getCategoryMeta("mac-mini")` returns Mac mini meta — hyphenated param works correctly

**Files**
- [ ] `app/products/page.tsx` created
- [ ] `data/products.ts` created with all 19 products and `Product` interface
- [ ] `lib/product-utils.ts` created with `getAllProducts()`, `getProductsByCategory()`, and `getCategoryMeta()`
- [ ] `components/ProductCard.tsx` created
- [ ] `sections/Categories.tsx` visually unchanged (links activate automatically)
- [ ] `sections/Hero.tsx` unchanged
- [ ] `sections/FeaturedProducts.tsx` unchanged
- [ ] `components/Navbar.tsx` unchanged
- [ ] `app/layout.tsx` unchanged
- [ ] `app/globals.css` unchanged
- [ ] TypeScript compiles with zero errors
- [ ] No horizontal page overflow at any breakpoint

---

## 15. Approval Status

**Awaiting user approval before Phase 7B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 7A · Product Listing Pages Plan · Version 1.1 · 2026-05-24*
