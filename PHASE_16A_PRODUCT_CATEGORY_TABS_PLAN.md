# Phase 16A — Product Category Tabs Strategy Plan

**Date:** 2026-05-31
**Status:** Awaiting user approval
**Scope:** Strategy only. No code. No Phase 16B.

---

## 1. Problem

The `/products` page and all `/products/[category]` pages currently display a page heading, a short intro sentence, a WhatsApp CTA button, and then the product grid. There is no persistent category navigation between those pages. Users who land on `/products/macbook` and want to browse accessories must go back to the Navbar dropdown or know the URL — there is no in-page way to switch categories.

This creates unnecessary friction. The product listing experience should let users move between categories in one tap without leaving the page context.

---

## 2. Recommended Solution

Add a `ProductCategoryTabs` component that renders a horizontal scrollable row of pill-style navigation links. It sits between the page intro block and the product grid on every product listing page.

- On `/products` — "All" tab is active.
- On `/products/macbook` — "MacBook" tab is active.
- On `/products/accessories` — "Accessories" tab is active.

These are real `<a>` / `<Link>` navigation tabs — not client-side filters. Clicking a tab routes the user to the corresponding existing page. No new routes are created. No JavaScript filtering of products is needed.

The component receives the current category slug (or `null` for All Products) as a prop to determine which tab is active.

---

## 3. Exact Tabs and Routes

| Tab Label | Route | Category Slug |
|---|---|---|
| All | `/products` | `null` (no slug — all products page) |
| MacBook | `/products/macbook` | `macbook` |
| iPhone | `/products/iphone` | `iphone` |
| iPad | `/products/ipad` | `ipad` |
| Mac mini | `/products/mac-mini` | `mac-mini` |
| iMac | `/products/imac` | `imac` |
| Apple Watch | `/products/apple-watch` | `apple-watch` |
| AirPods | `/products/airpods` | `airpods` |
| Accessories | `/products/accessories` | `accessories` |

Total: 9 tabs. Order fixed as listed above — All first, Accessories last.

---

## 4. Active State Behavior

Active tab is determined by comparing the current route against each tab's href:

| Current Route | Active Tab |
|---|---|
| `/products` | All |
| `/products/macbook` | MacBook |
| `/products/iphone` | iPhone |
| `/products/ipad` | iPad |
| `/products/mac-mini` | Mac mini |
| `/products/imac` | iMac |
| `/products/apple-watch` | Apple Watch |
| `/products/airpods` | AirPods |
| `/products/accessories` | Accessories |

**Active tab styles:**
- Background: `#1D1D1F` (charcoal) — dark pill, white text
- Text: `#FFFFFF`
- Font weight: `600`
- No underline

**Inactive tab styles:**
- Background: `transparent`
- Text: `#6E6E73` (secondary text)
- Border: `1px solid #E8E8ED`
- Font weight: `500`
- Hover: background `#F5F5F7`, text `#1D1D1F`

**Active link accessibility:**
- Active tab `<Link>` receives `aria-current="page"`
- Inactive tabs have no `aria-current` attribute

**No JavaScript** is needed for active detection — the component receives the active slug as a prop from the server-rendered page. The comparison is a simple string equality check.

---

## 5. Desktop Layout

- Single horizontal row of pill tabs.
- Tabs flow left-to-right in the order defined in Section 3.
- Gap between tabs: `8px`.
- Each tab: `border-radius: 9999px` (pill), `min-height: 44px`, `padding: 0 16px`.
- Row: `display: flex`, `flex-wrap: nowrap`, `overflow-x: auto` — scrollable if viewport is narrow.
- On wide desktops (≥ 1024px) all 9 tabs fit in one row without scrolling.
- Row does **not** have visible scrollbar on desktop (`::-webkit-scrollbar { display: none }` with `scrollbar-width: none` for Firefox).
- No dropdown. No multi-row wrap. No mega menu.
- Tab font size: `14px`.
- Row sits in the same max-width container as the product grid (`max-width: 1200px`, `padding: 0 32px`).
- Vertical spacing: `32px` gap above the product grid, `24px` below the page intro block.

---

## 6. Mobile Layout

- Same horizontal pill row.
- Row is horizontally scrollable (`overflow-x: auto`, `-webkit-overflow-scrolling: touch`).
- Scrollbar hidden on mobile (same as desktop).
- Active tab is not auto-scrolled into view on mount — this is acceptable given 9 tabs and normal phone widths. If needed in a future phase, `scrollIntoView()` can be added.
- Each tab: same `min-height: 44px`, same pill shape, `font-size: 13px` on mobile.
- Row does **not** cause horizontal page overflow — the row itself scrolls internally, the page does not.
- Padding: `0 16px` at mobile (matching card grid mobile padding).
- The row should have `padding-right: 16px` at the end so the last tab doesn't clip at the scroll edge.

---

## 7. Accessibility Rules

| Requirement | Implementation |
|---|---|
| Semantic wrapper | `<nav aria-label="Product categories">` |
| Active link | `aria-current="page"` on the active `<Link>` |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on every tab link |
| Minimum tap target | `min-height: 44px` on every tab |
| Horizontal scroll | Applied to the inner scroll container only — page `<body>` has no horizontal overflow |
| Screen reader | Nav landmark is labelled; active page is indicated via `aria-current` |
| Keyboard navigation | Tab key moves between links; Enter/Space activates |
| Reduced motion | No animation on the tab row itself — no transition on active state change needed |

---

## 8. Files Likely Needed in Phase 16B

| File | Action | Notes |
|---|---|---|
| `components/ProductCategoryTabs.tsx` | Create new | Renders the full `<nav>` tab row. Accepts `activeSlug: string \| null` prop. |
| `app/products/page.tsx` | Modify | Import and render `<ProductCategoryTabs activeSlug={null} />` between the intro block and the product grid. |
| `app/products/[category]/page.tsx` | Modify | Import and render `<ProductCategoryTabs activeSlug={params.category} />` between the intro block and the product grid. |
| `data/categories.ts` | Check / reuse | If a categories array already exists (slugs, labels, hrefs), reuse it. If not, define the tab data inline in `ProductCategoryTabs.tsx` — do not duplicate in a new file unless it provides real reuse value. |

No new routes. No new page files. No changes to product data, product cards, drawers, or Hero.

---

## 9. Forbidden Work

- No new routes or pages
- No client-side product filtering (JavaScript filter on the product array)
- No changes to product data (`data/products.ts`)
- No changes to `ProductCard.tsx`
- No changes to `SavedDrawer`, `CartInquiryDrawer`, or `ProductQuickDetailsDrawer`
- No changes to Hero
- No changes to Navbar (tabs are not part of the Navbar)
- No dropdown inside the tab row
- No large category card thumbnails in this row
- No fake prices, stock, or specs
- No product detail pages
- No icons required (optional only if genuinely subtle — not required)
- No new npm packages

---

## 10. Approval Status

**Awaiting user approval.**

Once approved, Phase 16B begins with:
1. Creating `components/ProductCategoryTabs.tsx` with the full tab array and active state logic
2. Adding the component to `app/products/page.tsx`
3. Adding the component to `app/products/[category]/page.tsx`
4. Visual and accessibility verification in the browser
