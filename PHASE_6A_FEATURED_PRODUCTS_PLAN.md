# PHASE_6A_FEATURED_PRODUCTS_PLAN.md
**Phase 6A — Featured Products · Planning Document**

---

## 1. Section Purpose

The Featured Products section is the homepage's primary conversion surface. It sits directly below the Category Strip and answers the user's next question after identifying a category: *"What does Afan Mac Store actually carry, and how do I ask about it?"*

This section is **not** a product listing page. It is a curated product showcase designed to:

- Surface popular Apple product types in a visually premium way
- Convert browsing intent into a WhatsApp inquiry in one tap
- Reinforce brand trust — genuine, verified, human-led sales process
- Signal inventory breadth without faking exact stock, prices, or specs

**Key distinction from the Category Strip:**
- Category Strip = navigation aid ("where do I go?")
- Featured Products = conversion surface ("what do I want, and how do I ask?")

The two sections must not look the same. Category items are small icon + name tiles. Product cards are content-rich panels with a visual area, name, description, condition tag, and a WhatsApp CTA.

---

## 2. Final Product / Card List

Exactly 8 cards. No additions without user approval. No Deals card. No price cards.

| # | Display Name | Category | Category Slug | Icon (Lucide) | Tag |
|---|---|---|---|---|---|
| 1 | MacBook Pro | MacBook | `/products/macbook` | `Laptop` | Verified device |
| 2 | MacBook Air | MacBook | `/products/macbook` | `Laptop` | Verified device |
| 3 | iPhone | iPhone | `/products/iphone` | `Smartphone` | Genuine product |
| 4 | iPad | iPad | `/products/ipad` | `TabletSmartphone` | Genuine product |
| 5 | Mac mini | Mac mini | `/products/mac-mini` | `Server` | Verified device |
| 6 | Apple Watch | Apple Watch | `/products/apple-watch` | `Watch` | Genuine product |
| 7 | AirPods | AirPods | `/products/airpods` | `Headphones` | Genuine product |
| 8 | Accessories | Accessories | `/products/accessories` | `Package` | Curated selection |

All `image` fields are `null`. Lucide icon is the visual fallback until real product assets are available.

---

## 3. Product Card Content Structure

Each card is a standalone `<article>` element — it is **not** wrapped in a `<Link>` or `<a>`. The only interactive element inside the card is the WhatsApp CTA link. `categorySlug` stays in the data for Phase 7 routing but is not used as a link in Phase 6B. It renders top-to-bottom:

```
┌──────────────────────────────────────┐
│                                      │
│          [ Icon — 48px ]             │  ← Visual area: #F9F9F9 bg, ~190px height,
│                                      │     icon centered, radius-xl top corners only
│  [ Category label ]                  │  ← Bottom-left of visual area, small pill
├──────────────────────────────────────┤  ← 1px solid #E8E8ED (border between zones)
│  Product Name               [ Tag ]  │  ← name: 17px semibold #1D1D1F; tag: badge right
│  Short description (1–2 lines)       │  ← 13px #6E6E73, line-clamp-2
│                                      │
│  [ Ask on WhatsApp ↗ ]              │  ← WhatsApp pill button, full-width, min-h 44px
└──────────────────────────────────────┘
```

### Field definitions

| Field | Rendering | Notes |
|---|---|---|
| `name` | `<h3>`, 17px, semibold, `#1D1D1F` | e.g. "MacBook Pro" |
| `category` | Small pill inside visual area, bottom-left | e.g. "MacBook" — `#6E6E73`, 11px |
| `description` | 13px, `#6E6E73`, `line-clamp-2` | Short, clean — no specs, no claims, no fluff |
| `tag` | Inline badge beside name | 11px, `#AEAEB2` text, `#F5F5F7` bg, border `#E8E8ED`, `radius-full` pill |
| `icon` | Lucide icon, 48px, `#6E6E73`, `strokeWidth: 1.5` | Centered in visual area |
| `whatsappMessage` | Encoded into `href` via `whatsappLink()` | Not displayed, used for CTA link only |

### Description strings (per card)

| Product | Description |
|---|---|
| MacBook Pro | Powerful MacBooks for pro work. |
| MacBook Air | Lightweight MacBooks for everyday use. |
| iPhone | Trusted iPhones, ready to use. |
| iPad | iPads for work and study. |
| Mac mini | Compact power for your desk. |
| Apple Watch | Smart watch for daily use. |
| AirPods | Wireless audio, easy pairing. |
| Accessories | Chargers, cables, cases, and more. |

### WhatsApp message strings (per card)

| Product | Message |
|---|---|
| MacBook Pro | `Hi Afan Mac Store, I'm interested in MacBook Pro. Please share current availability and details.` |
| MacBook Air | `Hi Afan Mac Store, I'm interested in MacBook Air. Please share current availability and details.` |
| iPhone | `Hi Afan Mac Store, I'm interested in iPhone. Please share current availability and details.` |
| iPad | `Hi Afan Mac Store, I'm interested in iPad. Please share current availability and details.` |
| Mac mini | `Hi Afan Mac Store, I'm interested in Mac mini. Please share current availability and details.` |
| Apple Watch | `Hi Afan Mac Store, I'm interested in Apple Watch. Please share current availability and details.` |
| AirPods | `Hi Afan Mac Store, I'm interested in AirPods. Please share current availability and details.` |
| Accessories | `Hi Afan Mac Store, I'm interested in your Accessories. Please share what's currently available.` |

### What cards do NOT include

- No price — no fake price, no "from PKR…", no "call for price"
- No discount badge, no sale ribbon, no percentage off
- No stock count — no "3 left", no "in stock", no "limited"
- No model spec detail — no storage, no RAM, no chip identifier
- No warranty claim — no "1-year warranty" unless real data is provided
- No "Buy Now" button — there is no checkout or payment
- No "Add to Cart" button
- No Apple logo or trademark
- No external image URLs
- No "View details" link in Phase 6B — Phase 7 routes do not exist yet
- No `<Link>` or `<a>` wrapping the card — the card article is non-clickable; nested links are invalid HTML and break accessibility

---

## 4. Visual Placeholder Strategy

Final product images are not available. The placeholder must look intentional and premium — not a gray empty box.

### Approach: tall icon visual zone

Each card's visual area:

| Property | Value |
|---|---|
| Height | ~`190px` fixed (or `aspect-ratio: 4/3` on the container — whichever renders more uniformly across all breakpoints) |
| Background | `#F9F9F9` (product image bg token) |
| Border-radius | `18px` top-left, `18px` top-right, `0` bottom — flush with card body below |
| Icon | 48px, `#6E6E73`, `strokeWidth: 1.5`, centered horizontally and vertically |
| Inner highlight | `box-shadow: inset 0 1px 0 rgba(255,255,255,0.80)` — prevents visual area from looking flat |
| Category label | Absolute-positioned bottom-left: `8px` from bottom, `12px` from left; `11px` font, `#6E6E73`, `background: rgba(255,255,255,0.80)`, `border: 1px solid #E8E8ED`, `border-radius: 9999px`, `padding: 2px 8px` |

### Why this works

- All 8 cards render identically — nothing looks missing or broken
- The `#F9F9F9` background matches the approved product image bg token exactly
- Tall visual area (vs. the Category Strip's small 72×72 tile) creates clear visual hierarchy between the two sections
- Category label pill inside the visual area adds information density without crowding the text zone

### Future image swap

When real product assets are available, replace the icon + `#F9F9F9` background with a Next.js `<Image>` in the same fixed-height container. The card structure does not change. The `image` field in `data/featured-products.ts` is `null` until then.

---

## 5. Grid / Responsive Behavior

### Breakpoints

| Viewport | Columns | Gap |
|---|---|---|
| Mobile (`< 768px`) | 1 column | `24px` |
| Tablet (`768px – 1023px`) | 2 columns | `24px` |
| Desktop (`≥ 1024px`) | **4 columns** | `32px` |

8 cards at 4 columns = 2 clean rows of 4 on desktop. No orphaned cards, no unbalanced final row.

Implementation: CSS Grid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` via Tailwind.

Equal card height: automatic via CSS Grid `align-items: stretch` (default). Cards within each row match the tallest card's height — no JavaScript needed.

### Section container

```
Max width:       1200px
Horizontal pad:  32px desktop / 16px mobile  →  md:px-8 px-4
Section bg:      #F5F5F7 (site background — no separate section panel)
Vertical pad:    clamp(64px, 8vw, 96px) top and bottom
```

### Section header

```
Overline:    "Featured Products"
             — 11px, uppercase, tracking-[0.10em], #AEAEB2
Headline:    "Popular Apple picks at Afan Mac Store."
             — clamp(1.75rem, 3.5vw + 0.25rem, 3rem), font-semibold, #1D1D1F
             — same size token as Phase 5B category strip headline — consistent section rhythm
             — max-width: 640px
Subtext:     "Browse selected MacBooks, iPhones, iPads, and accessories.
              Message us on WhatsApp for current availability."
             — clamp(1rem, 1.25vw + 0.125rem, 1.25rem), #6E6E73
             — max-width: 560px
Gap overline → headline: 8px
Gap headline → subtext:  12px
Gap subtext  → grid:     48px desktop / 32px mobile
```

Overline rendered as `<p>`, not a heading. Headline uses `<h2>` — never `<h1>`.

---

## 6. WhatsApp CTA Behavior

### CTA button per card

```
Label:         "Ask on WhatsApp"
Icon:          WhatsApp SVG icon, left of text, 16px — or Lucide `MessageCircle` as fallback
Style:         #25D366 background, #FFFFFF text, border-radius: 9999px (pill), min-height: 44px
Hover bg:      #1DAE56
Width:         Full card width (100%)
Element:       <a> tag (not <button>) — opens WhatsApp in new tab
target:        _blank
rel:           noopener noreferrer
```

### Link construction

```ts
// Phase 6B will call:
import { whatsappLink } from "@/lib/constants";

const href = whatsappLink(product.whatsappMessage);
// whatsappLink() is the single source of truth — never hardcode wa.me/... in the component
```

`whatsappLink()` must be verified to accept an optional message parameter in Phase 6B. If the current implementation in `lib/constants.ts` does not accept a message argument, it will need a non-breaking update in Phase 6B (add optional `message?: string` parameter, encode it into the URL).

### No hardcoded WhatsApp links

Never write `href="https://wa.me/923133388666?text=..."` directly in any component. All WhatsApp links across the site route through `whatsappLink()`.

---

## 7. Hover and Animation Rules

### Card hover (mouse)

| Property | Rest | Hover |
|---|---|---|
| `transform` | `translateY(0)` | `translateY(-2px)` |
| `box-shadow` | `0 1px 4px rgba(0,0,0,0.05)` | `0 2px 10px rgba(0,0,0,0.07)` |
| `border-color` | `#E8E8ED` | `#D2D2D7` |
| Transition | — | `border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease` |

No scale. No heavy shadow. Shadow opacity cap: `0.07` (within `≤ 0.10` rule). No surface color change.

### WhatsApp button hover

| Property | Rest | Hover |
|---|---|---|
| `background` | `#25D366` | `#1DAE56` |
| Transition | — | `background 0.18s ease` |

### Scroll entrance animation (Framer Motion)

Same pattern as Category Strip — reliable across grid-based layout:

```
Strategy:    useInView on sectionRef → sectionInView boolean → controlled animate prop on each card
Initial:     { opacity: 0, y: 16 }
Animate:     { opacity: 1, y: 0 }
Duration:    0.40s
Ease:        easeOut
Stagger:     60ms × card index (0ms → 420ms across 8 cards)
Trigger:     once: true, margin: "-60px"
```

Using `useInView` on the section container (not per-card `whileInView`) ensures cards not yet in the viewport still animate correctly without fighting CSS Grid layout.

Wrap entire section in `<MotionConfig reducedMotion="user">` — all Framer Motion animations inside instantly resolve when OS preference is set.

---

## 8. Accessibility Rules

| Concern | Rule |
|---|---|
| Heading hierarchy | Section uses `<h2>` — one per section. Card product name uses `<h3>`. Never `<h1>` (reserved for hero). |
| Card element | `<article>` — semantically correct for a standalone product item. **Not wrapped in `<Link>` or `<a>`.** The article itself is non-interactive. |
| No nested links | `<article>` contains exactly one interactive element: the WhatsApp CTA `<a>`. No card-level link. No category link. No detail link. Nested interactive elements are invalid HTML and break keyboard navigation. |
| CTA link | `<a>` with `aria-label="Ask about [Product Name] on WhatsApp"` (product-specific) — the sole interactive element per card |
| Icon (visual area) | `aria-hidden="true"` and `focusable="false"` on all Lucide icons — decorative |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on the WhatsApp CTA — the only focusable element per card |
| Min tap target | WhatsApp button min-height `44px`, full card width — easily satisfied |
| External link | `target="_blank"` + `rel="noopener noreferrer"` on all WhatsApp `<a>` links |
| Color contrast | `#1D1D1F` on `#FFFFFF` = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). Both pass. |
| Section label | `aria-labelledby="featured-heading"` on `<section>`, matching `id` on `<h2>` |

---

## 9. Files Created / Changed in Phase 6B

| File | Action | Notes |
|---|---|---|
| `data/featured-products.ts` | **Create** | 8 product objects; `image: null` until real assets |
| `sections/FeaturedProducts.tsx` | **Create** | Full featured products section component |
| `app/page.tsx` | **Modify** | Add `<FeaturedProducts />` import and render below `<Categories />` |
| `lib/constants.ts` | **Verify / minor update** | Confirm `whatsappLink()` accepts optional `message` param — add if missing |
| `PHASE_6B_FEATURED_PRODUCTS_REPORT.md` | **Create** | Phase 6B completion report |

No other files touched. Specifically:
- `sections/Hero.tsx` — not modified
- `sections/Categories.tsx` — not modified
- `components/Navbar.tsx` — not modified
- `app/layout.tsx` — not modified
- `app/globals.css` — not modified
- `data/categories.ts` — not modified

---

## 10. What NOT to Build in Phase 6B

| Item | Why excluded |
|---|---|
| Product listing pages (`/products/[category]`) | Phase 7 |
| Product detail pages (`/products/[category]/[id]`) | Phase 7 |
| `data/products.ts` (full inventory) | Phase 7 |
| "View details" card link | No detail pages exist — do not add dead navigation |
| Card-level `<Link>` wrapping `<article>` | Creates a nested link with the WhatsApp CTA — invalid HTML, accessibility failure — forbidden |
| Category link inside card | `categorySlug` is in data for Phase 7 only — not rendered as a link in Phase 6B |
| Price display of any kind | Not provided — fake prices forbidden |
| Discount / sale badges | Explicitly forbidden — bazaar-style |
| Stock counts | Not real inventory — forbidden |
| Model spec detail | Not provided in data — forbidden |
| Warranty claims | Not provided — forbidden |
| "Buy Now" button | No checkout — forbidden |
| "Add to Cart" / cart integration | Out of scope — frontend-only inquiry helpers only |
| External product images | Forbidden — icon placeholder strategy only |
| Apple logo or trademark | Forbidden — locked rule, no exceptions |
| Reviews section | Separate phase |
| Location section | Separate phase |
| Footer | Separate phase |
| New npm packages | None required |
| Dark section or black background | Forbidden — section uses `#F5F5F7` |
| Loud gradients on cards | Forbidden |

---

## 11. Completion Checklist

*(To be verified at end of Phase 6B)*

- [ ] Section overline reads "Featured Products"
- [ ] Section headline reads "Popular Apple picks at Afan Mac Store."
- [ ] Subtext reads "Browse selected MacBooks, iPhones, iPads, and accessories. Message us on WhatsApp for current availability."
- [ ] Section uses `<h2>` — not `<h1>`; card names use `<h3>`
- [ ] Section has `aria-labelledby="featured-heading"`
- [ ] Exactly 8 cards render
- [ ] Card order: MacBook Pro, MacBook Air, iPhone, iPad, Mac mini, Apple Watch, AirPods, Accessories
- [ ] Grid: 1 column mobile, 2 columns tablet, 4 columns desktop
- [ ] Grid gap: 32px desktop, 24px mobile
- [ ] All cards equal height within each row
- [ ] Visual area: ~190px height, `#F9F9F9` bg, icon centered, radius-xl top corners only
- [ ] Category label pill inside visual area, bottom-left
- [ ] Product name: 17px, font-semibold, `#1D1D1F`
- [ ] Description: 13px, `#6E6E73`, `line-clamp-2`
- [ ] Condition tag: 11px, `#AEAEB2`, pill badge beside name
- [ ] No price anywhere
- [ ] No discount/sale badges
- [ ] No stock counts
- [ ] No "Buy Now" or "Add to Cart"
- [ ] WhatsApp CTA button: `#25D366` bg, `#FFFFFF` text, full-width pill, min-height 44px
- [ ] WhatsApp CTA uses `whatsappLink()` from `lib/constants.ts` — no hardcoded wa.me links
- [ ] Each card CTA has product-specific WhatsApp message
- [ ] CTA `<a>` has `aria-label="Ask about [Product Name] on WhatsApp"`
- [ ] CTA opens in `_blank` with `rel="noopener noreferrer"`
- [ ] Product card `<article>` is not wrapped in `<Link>` or `<a>`
- [ ] No nested links — only one interactive element per card
- [ ] WhatsApp CTA is the only clickable element inside each product card
- [ ] Card hover: `translateY(-2px)` + `0 2px 10px rgba(0,0,0,0.07)`
- [ ] Hover transition: `0.22s ease`
- [ ] No hover shadow exceeds `rgba(0,0,0,0.10)` opacity
- [ ] Scroll entrance: `useInView` on section → controlled `animate` prop on cards
- [ ] Entrance: `opacity: 0, y: 16` → `opacity: 1, y: 0`, `0.40s easeOut`
- [ ] Stagger: 60ms per card index
- [ ] `MotionConfig reducedMotion="user"` wraps the section
- [ ] Lucide icons: `aria-hidden="true"` and `focusable="false"`
- [ ] Focus ring on all interactive elements
- [ ] Section vertical padding: `clamp(64px, 8vw, 96px)` top and bottom
- [ ] Max content width: `1200px`, centered
- [ ] No horizontal page overflow
- [ ] `sections/Hero.tsx` unchanged
- [ ] `sections/Categories.tsx` unchanged
- [ ] `components/Navbar.tsx` unchanged
- [ ] `app/layout.tsx` unchanged
- [ ] `app/globals.css` unchanged
- [ ] TypeScript compiles with zero errors

---

## 12. Approval Status

**Awaiting user approval before Phase 6B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 6A · Featured Products Plan · Version 1.0 · 2026-05-24*
