# PHASE_5A_CATEGORY_CARDS_PLAN.md
**Phase 5A — Category Cards · Planning Document**

---

## 1. Section Purpose

The Category Cards section is the primary navigation aid on the homepage. It sits directly below the hero area and answers the user's first question: *"What can I buy here?"*

Goals:
- Let users identify and navigate to a product category in one glance
- Establish a clean, premium visual rhythm across all 8 categories
- Support Phase 7 product listing pages by setting up correct slugs now
- Signal reseller credibility — organized, clear, intentional, not bazaar-style

This section is **not** a promotional banner, not a carousel, not a product grid. It is a pure category discovery layer.

---

## 2. Final Category List

Exactly 8 tiles. No Deals tile. No additions without user approval.

| # | Category | Slug | Lucide Icon |
|---|---|---|---|
| 1 | MacBook | `/products/macbook` | `Laptop` |
| 2 | iPhone | `/products/iphone` | `Smartphone` |
| 3 | iPad | `/products/ipad` | `TabletSmartphone` |
| 4 | Mac mini | `/products/mac-mini` | `Server` |
| 5 | iMac | `/products/imac` | `Monitor` |
| 6 | Apple Watch | `/products/apple-watch` | `Watch` |
| 7 | AirPods | `/products/airpods` | `Headphones` |
| 8 | Accessories | `/products/accessories` | `Package` |

Icon library: **Lucide React** — already installed, no new packages needed.

---

## 3. Tile Content Structure

Each tile is a `<Link>` wrapping the following vertical structure:

```
┌──────────────────────────────────┐
│                                  │
│        [ Icon — 48px ]           │  ← Visual area: 1:1 aspect ratio, #F9F9F9 bg
│                                  │
├──────────────────────────────────┤
│  Category Name                   │  ← font-semibold, #1D1D1F, ~15px
│  Short description               │  ← #6E6E73, 13px, 1–2 lines max
│  Browse →                        │  ← #0071E3, 12px, accent link hint
└──────────────────────────────────┘
```

### Field definitions

| Field | Value | Notes |
|---|---|---|
| `name` | e.g. `"MacBook"` | Display name on tile |
| `slug` | e.g. `"/products/macbook"` | `href` for the Link |
| `description` | 1 short sentence | e.g. `"Laptops for work and creativity."` |
| `icon` | Lucide component name | String key used to look up component at render time |

### Tile label text

| Category | Description |
|---|---|
| MacBook | Laptops for work, study, and creativity. |
| iPhone | Smartphones for every need and budget. |
| iPad | Tablets for work, study, and entertainment. |
| Mac mini | Compact desktop power for any setup. |
| iMac | All-in-one desktop performance. |
| Apple Watch | Smartwatches for health and connectivity. |
| AirPods | Wireless audio, effortlessly connected. |
| Accessories | Cables, chargers, cases, and more. |

"Browse →" text is static, the same across all tiles — not data-driven.

---

## 4. Visual Placeholder Strategy

**Final product images are not available.** The placeholder strategy must look intentional and premium, not like empty gray boxes.

### Approach: styled icon container

Each tile's visual area uses a fixed 1:1 container with:
- Background: `#F9F9F9` (product image bg token)
- Border-radius: `12px` (radius-md — same as image thumbnails)
- Lucide icon: `48px`, color `#6E6E73` (secondary text, slightly warmer than `#AEAEB2`)
- Inner border: `1px solid #E8E8ED` (border-light token) — gives the area definition without heaviness
- Subtle inner top highlight: `inset 0 1px 0 rgba(255,255,255,0.80)` — prevents the area from looking flat

### Why this works
- Consistent across all 8 tiles — nothing feels missing or broken
- Icons are semantically correct per category — users can identify the category
- Muted color palette keeps the focus on the name, not the placeholder
- Matches the approved `#F9F9F9` product image background token

### Future image swap
When real product images are available, the icon container is replaced with a Next.js `<Image>` component in the same 1:1 container. The tile structure does not change — only the visual area contents. The data field `icon` in `data/categories.ts` is kept as a string; a separate `image` field (optional, initially `null`) is added to `data/categories.ts`. If `image` is present, render it; otherwise render the icon fallback.

---

## 5. Grid and Responsive Behavior

### Breakpoints

| Viewport | Columns | Gap |
|---|---|---|
| Mobile (`< 768px`) | 2 columns | `24px` |
| Tablet (`768px – 1023px`) | 2 columns | `24px` |
| Desktop (`≥ 1024px`) | **4 columns exactly** | `32px` |

Implementation: CSS Grid — `grid-cols-2 lg:grid-cols-4` via Tailwind.

All tiles use `align-items: stretch` (default CSS Grid behavior) — equal height is automatic within each row without JavaScript.

### Section container

```
Max width:     1200px
Horizontal pad: 32px desktop / 16px mobile
Section bg:    #F5F5F7 (site background — no separate section bg needed)
Vertical pad:  96px top/bottom desktop · 64px top/bottom mobile
```

### Section header

```
Overline:   "Shop by Category"
            — 11px, uppercase, letter-spacing 0.10em, #AEAEB2
Headline:   "Find your next Apple device."
            — clamp(2rem, 4vw + 0.5rem, 3.5rem), font-semibold, #1D1D1F
            — max-width: 560px to prevent overly wide headline line
Gap between overline and headline: 8px
Gap between headline and grid: 48px desktop · 32px mobile
```

Headline uses the section headline token (`clamp(2rem, 4vw + 0.5rem, 3.5rem)`). No h1 — the page h1 is inside the Hero. Section header uses `<h2>`.

---

## 6. Hover and Animation Rules

### Tile hover (mouse)

| Property | Rest | Hover |
|---|---|---|
| `transform` | `translateY(0)` | `translateY(-2px)` |
| `box-shadow` | `0 1px 4px rgba(0,0,0,0.05)` | `0 2px 10px rgba(0,0,0,0.07)` |
| `border-color` | `#E8E8ED` | `#D2D2D7` (border-standard) |
| Transition | — | `all 0.22s ease` |

No scale. No heavy shadow. No color change on the tile surface. Max shadow opacity stays at `0.07` — within the approved `≤ 0.10` cap.

### Scroll entrance animation (Framer Motion)

Each tile enters once when it scrolls into view:

```
initial:  { opacity: 0, y: 16 }
animate:  { opacity: 1, y: 0 }
duration: 0.40s
ease:     easeOut
```

Stagger delay per tile index:

| Tile | Delay |
|---|---|
| 0 (MacBook) | 0ms |
| 1 (iPhone) | 80ms |
| 2 (iPad) | 160ms |
| 3 (Mac mini) | 240ms |
| 4 (iMac) | 320ms |
| 5 (Apple Watch) | 400ms |
| 6 (AirPods) | 480ms |
| 7 (Accessories) | 560ms |

Implementation: Framer Motion `whileInView` with `once: true` and `viewport: { margin: "-60px" }` — triggers slightly before tile fully enters viewport for a natural feel.

### `prefers-reduced-motion`

Use `MotionConfig reducedMotion="user"` wrapping the section — all Framer Motion animations inside are instantly resolved when OS preference is set. No custom checks needed beyond the MotionConfig wrapper.

### Focus (keyboard)

```
focus-visible: box-shadow: 0 0 0 3px rgba(0,113,227,0.35)
```

Applied to the `<Link>` (the tile's outer element). Must be visible at all times.

---

## 7. Accessibility Rules

| Concern | Rule |
|---|---|
| Heading hierarchy | Section uses `<h2>` — never `<h1>` (reserved for hero) |
| Tile element | `<Link>` (renders as `<a>`) — semantically correct, keyboard navigable |
| Aria label | Each tile `<Link>` gets `aria-label="Browse MacBook"` (etc.) — the visible name + "Browse" prefix clarifies the link action |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on tile link |
| Min tap target | Tile link min-height ≥ 44px — naturally satisfied since tiles are much taller |
| Icon accessibility | Lucide icons: `aria-hidden="true"` and `focusable="false"` — decorative, label comes from tile text |
| Overline | Rendered as `<p>` or `<span>`, not a heading — it is a label, not structural |
| Color contrast | `#1D1D1F` on `#FFFFFF` tile surface = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). Both pass. |

---

## 8. Files Created / Changed in Phase 5B

| File | Action | Notes |
|---|---|---|
| `sections/Categories.tsx` | **Create** | Full category grid section component |
| `data/categories.ts` | **Create** | Array of 8 category objects |
| `app/page.tsx` | **Modify** | Add `<Categories />` import and render below `<Hero />` |

No other files touched. Specifically:
- `sections/Hero.tsx` — not modified
- `components/Navbar.tsx` — not modified
- `app/layout.tsx` — not modified
- `lib/constants.ts` — not modified
- `app/globals.css` — not modified

---

## 9. What NOT to Build in Phase 5B

| Item | Why excluded |
|---|---|
| Product listing pages (`/products/[category]`) | Phase 7 — slugs are dead links in Phase 5B, accepted |
| Featured products grid | Phase 6 |
| `data/products.ts` | Phase 6 |
| Carousel or horizontal scroll | Explicitly rejected — static grid only |
| Dropdown on hover | Explicitly rejected — that is Navbar behavior, not page content |
| Deals tile | Excluded from first-build category grid |
| External image URLs | Forbidden — placeholder icon approach covers this |
| New npm packages | None required — Lucide React and Framer Motion already installed |
| Any dark section / black background | Rejected — section uses #F5F5F7 site background |
| Loud gradients on tiles | Rejected — tile surface is flat #FFFFFF with subtle border |
| Product card elements (price, stock badge, CTA) | Category tiles show name + description only |

---

## 10. Completion Checklist

*(To be verified in Phase 5B)*

- [ ] Section overline reads "Shop by Category"
- [ ] Section headline reads "Find your next Apple device."
- [ ] Section uses `<h2>` — not `<h1>`
- [ ] Exactly 8 tiles render (MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories)
- [ ] No Deals tile
- [ ] Grid is 2 columns on mobile and tablet, exactly 4 columns on desktop
- [ ] Card grid gap: 32px desktop, 24px mobile
- [ ] All tiles are equal height within each row
- [ ] Visual area is 1:1 aspect ratio, `#F9F9F9` bg, centered Lucide icon
- [ ] Icon is 48px, color `#6E6E73`
- [ ] Category name renders in font-semibold, `#1D1D1F`
- [ ] Description renders in `#6E6E73`, max 2 lines
- [ ] "Browse →" accent text renders in `#0071E3`
- [ ] Tile surface is `#FFFFFF` with `1px solid #E8E8ED` border
- [ ] Tile border-radius is 18px (radius-lg)
- [ ] Tile rest shadow: `0 1px 4px rgba(0,0,0,0.05)`
- [ ] Tile hover: `translateY(-2px)` + `0 2px 10px rgba(0,0,0,0.07)`
- [ ] Hover transition is 0.22s ease
- [ ] No hover shadow exceeds `rgba(0,0,0,0.10)` opacity
- [ ] Scroll entrance: opacity 0 + y:16 → opacity 1 + y:0, 0.40s easeOut
- [ ] Stagger delay: 80ms per tile
- [ ] `MotionConfig reducedMotion="user"` wraps the section
- [ ] All tile links have `aria-label="Browse [Category]"`
- [ ] Lucide icons have `aria-hidden="true"`
- [ ] Focus ring visible on all tile links
- [ ] All 8 slug hrefs match approved slugs exactly
- [ ] Dead links are acceptable — Phase 7 routes not yet built
- [ ] Section vertical padding: 96px desktop, 64px mobile
- [ ] Max content width: 1200px, centered
- [ ] No horizontal overflow at any breakpoint
- [ ] TypeScript compiles with zero errors
- [ ] `sections/Hero.tsx` unchanged
- [ ] `components/Navbar.tsx` unchanged
- [ ] `app/layout.tsx` unchanged
- [ ] `lib/constants.ts` unchanged
- [ ] `app/globals.css` unchanged

---

## 11. Approval Status

**Awaiting user approval before Phase 5B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 5A · Category Cards Plan · Version 1.0 · 2026-05-24*
