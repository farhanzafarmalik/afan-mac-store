# Phase 3A — Navbar Implementation Plan

**Type:** Planning document only. No code written.  
**Sources:** BRAND_DIRECTION.md v1.1, DESIGN_SYSTEM.md v1.1, BUILD_PHASES.md v1.2  
**Status:** Awaiting user approval before Phase 3B code implementation.

---

## 1. Approved Navbar Structure

### Layout (left → center → right)

```
[ Afan Mac Store ]    [ Home  Products  Reviews  Location  Contact ]    [ Buy on WhatsApp  ♡  🛍 ]
```

### Dimensions

| Breakpoint | Height |
|---|---|
| Desktop (≥ 768px) | 64px |
| Mobile (< 768px) | 56px |

### Position & Z-index
- `position: fixed`, `top: 0`, `left: 0`, `right: 0`
- `z-index: 1000`
- No layout shift: the `<main>` content area gets `padding-top` equal to navbar height so content is not hidden beneath it

---

### Left — Wordmark

| Property | Value |
|---|---|
| Text | `Afan Mac Store` |
| Font size | 17px |
| Weight | 600 |
| Color (default) | `#1D1D1F` |
| Color (over dark hero) | `#F5F5F7` → transitions back to `#1D1D1F` after 60px scroll |
| Color transition | `color 0.3s ease` |
| No image | Text wordmark only — no icon mark in Phase 3 |

---

### Center — Desktop Navigation Links

| Item | Notes |
|---|---|
| Home | Plain link |
| Products | Has dropdown on hover — the only link with a dropdown |
| Reviews | Plain link (anchor to reviews section) |
| Location | Plain link (anchor to location section) |
| Contact | Plain link (anchor to contact section) |

| Property | Value |
|---|---|
| Font size | 14px (`nav` token) |
| Weight | 400 at rest; 500 on active page |
| Color | `#1D1D1F` |
| Hover color | `#0071E3` |
| Hover transition | `color 0.15s ease` |
| Underline | None — ever |
| Gap between links | 32px |
| Alignment | Centered via flex with `margin: auto` |

---

### Right — Utility Items (Desktop)

Required items, left to right:

| Position | Item | Icon | Size | Color | Hover | aria-label |
|---|---|---|---|---|---|---|
| 1st (leftmost) | Buy on WhatsApp | — | Pill button | — | — | — |
| 2nd | Wishlist | Heart (Lucide `Heart`) | 20px | `#1D1D1F` | `#0071E3` | `"Wishlist"` |
| 3rd (rightmost) | Cart / Inquiry | Shopping bag (Lucide `ShoppingBag`) | 20px | `#1D1D1F` | `#0071E3` | `"Inquiry cart"` |

Gap between items: 20px

**"Buy on WhatsApp" button (outline pill style):**

| Property | Value |
|---|---|
| Background | `transparent` |
| Border | `1.5px solid #25D366` |
| Text | `Buy on WhatsApp` |
| Text color | `#25D366` |
| Font | 14px, weight 500 |
| Border radius | `9999px` (pill) |
| Padding | `8px 16px` |
| Min height | `44px` (approved minimum for all buttons — no exceptions) |
| Hover background | `rgba(37, 211, 102, 0.08)` |
| Hover transition | `background-color 0.2s ease` |

Note: Search icon is not included in Phase 3. It is listed as optional in approved documents and requires search functionality to be meaningful.

---

## 2. Products Dropdown Plan

### Trigger
- Hover on the **Products** nav link only
- No other nav link has a dropdown — not Home, Reviews, Location, or Contact
- 100ms delay before closing on mouse leave (prevents flicker when moving cursor from link to dropdown)

### Dropdown Links (9 items)

```
All Products
MacBook
iPhone
iPad
Mac mini
iMac
Apple Watch
AirPods
Accessories
```

These map to `/products/[category]` routes (built in Phase 7). In Phase 3 the links exist but the destination pages are not yet built — links point forward to their eventual routes.

### Dropdown Visual Spec

| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Border radius | `12px` (`radius-md`) |
| Border | `1px solid #E8E8ED` |
| Box shadow | `0 8px 32px rgba(0,0,0,0.12)` (from DESIGN_SYSTEM.md §10 dropdown spec) |
| Padding | `8px` (inner) |
| Min width | `200px` |
| Position | `absolute`, below the Products link, left-aligned |

**Dropdown link items:**

| Property | Value |
|---|---|
| Font | 15px, weight 400 |
| Color | `#1D1D1F` |
| Hover color | `#0071E3` |
| Hover background | `#F5F5F7` |
| Padding per item | `10px 12px` |
| Border radius per item | `8px` |

### Dropdown Animation

| Property | Value |
|---|---|
| Appear | `opacity: 0, translateY(6px)` → `opacity: 1, translateY(0)` |
| Duration | `200ms` |
| Easing | `ease-out` |
| Disappear | Reverse (or instant hide after delay) |

Implementation approach: CSS transition or Framer Motion `AnimatePresence` with `initial`/`animate`/`exit` variants.

### What the Dropdown Is NOT
- No images or product thumbnails inside the dropdown
- No mega menu layout
- No columns or sections within the dropdown
- No separate dropdowns for Mac, iPhone, iPad, or any other link

---

## 3. Desktop Behavior

### Scroll States

**State 1 — Top of page (0–60px scroll)**

| Property | Value |
|---|---|
| Background | `transparent` |
| Border bottom | `none` |
| Backdrop filter | `none` |
| Text/logo color | `#1D1D1F` (light hero) or `#F5F5F7` (dark hero — Phase 4 concern) |

**State 2 — Scrolled (> 60px)**

| Property | Value |
|---|---|
| Background | `rgba(255,255,255,0.85)` |
| Backdrop filter | `blur(20px) saturate(180%)` |
| Border bottom | `1px solid rgba(0,0,0,0.08)` |
| Text/logo color | Always `#1D1D1F` |
| Transition | `background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease` |

Scroll threshold is detected via `window.scrollY > 60` with a `scroll` event listener (or `useScroll` from Framer Motion). A `useState` boolean `scrolled` drives the conditional class or style.

### Alignment & Spacing

```
|─ 32px ─|─ [Wordmark] ─|─ auto ─|─ [Nav Links centered] ─|─ auto ─|─ [Utilities] ─|─ 32px ─|
```

Max content width: `1200px`, centered, with `32px` horizontal padding on desktop.

---

## 4. Mobile Behavior

### Hamburger Trigger
- Visible on screens < 768px
- Position: top-right of the navbar, aligned to the right edge
- Icon: Lucide `Menu` (3 lines) at rest, `X` when open
- Size: 24px
- Color: `#1D1D1F`
- Min tap target: 44px × 44px (padding added around the icon)
- No complex icon animation — the icon simply swaps between `Menu` and `X`

### Mobile Menu Layout

| Property | Value |
|---|---|
| Position | `fixed`, full screen (`top: 0, left: 0, right: 0, bottom: 0`) |
| Background | `#FFFFFF` |
| Z-index | `999` (below navbar at 1000, so navbar sits on top) |
| Animation | Fade in + `translateY(-8px → 0)` or slide down from top, `0.3s ease-in-out` |
| Open trigger | Hamburger button click |
| Close trigger | X button, Escape key, or link tap |

### Mobile Menu Contents (top to bottom)

```
1. [Close button — top right corner]
2. [Nav links — full width, large tap targets]
   Home
   Products  (with an expand toggle → reveals category sub-links inline)
   Reviews
   Location
   Contact
3. [Divider — 1px solid #E8E8ED]
4. [Utility row — Wishlist icon + Cart/Inquiry icon]
5. [WhatsApp CTA button — full width, green pill]
```

### Mobile Nav Link Style

| Property | Value |
|---|---|
| Font | 20px, weight 500 |
| Color | `#1D1D1F` |
| Min height per item | `52px` |
| Full width | Yes — entire row is tappable |
| Dividers between groups | `1px solid #E8E8ED` |

### Products Sub-links on Mobile

When the user taps "Products" in the mobile menu:
- An inline expand reveals the 9 category links below the Products item
- Category links: 16px, weight 400, indented 16px, same 44px tap height
- Expand/collapse with a chevron icon that rotates 180° (`0.2s ease`)

### WhatsApp CTA in Mobile Menu

| Property | Value |
|---|---|
| Style | Full-width solid green pill button |
| Background | `#25D366` |
| Text | `WhatsApp Us` |
| Text color | `#FFFFFF` |
| Border radius | `9999px` |
| Height | `48px` |
| Margin | `16px` on all sides from menu edges |

### Wishlist & Cart on Mobile

Both icons are present in the mobile menu as a horizontal row above the WhatsApp button. They are `24px` icons with `44px` × `44px` tap targets, labeled below with `Wishlist` and `Inquiry` in 12px caption text.

---

## 5. Accessibility Plan

### Semantic Structure

```html
<header>
  <nav aria-label="Main navigation">
    <!-- logo, links, utilities -->
  </nav>
</header>
```

- `<header>` wraps the entire navbar
- `<nav aria-label="Main navigation">` wraps the link area
- Logo is an `<a href="/">` with `aria-label="Afan Mac Store — Home"`

### Mobile Menu Toggle Button

```html
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? "Close menu" : "Open menu"}
>
  {isOpen ? <X /> : <Menu />}
</button>

<div id="mobile-menu" role="dialog" aria-label="Navigation menu" aria-modal="true">
  ...
</div>
```

### Products Dropdown (Desktop)

```html
<button
  aria-expanded={dropdownOpen}
  aria-haspopup="true"
  aria-controls="products-dropdown"
>
  Products
</button>

<ul id="products-dropdown" role="menu">
  <li role="menuitem"><a href="/products">All Products</a></li>
  ...
</ul>
```

### Keyboard Navigation

| Key | Action |
|---|---|
| `Tab` | Move between all interactive elements in logical order |
| `Enter` / `Space` | Activate buttons, open dropdown |
| `Escape` | Close dropdown (desktop) or close mobile menu |
| `Tab` inside mobile menu | Cycle only within mobile menu (focus trap) |

### Focus Trap (Mobile Menu)

When the mobile menu is open:
- `Tab` and `Shift+Tab` cycle only through elements inside the mobile menu
- Focus does not reach elements behind the overlay
- On close, focus returns to the hamburger button that opened the menu

Implementation: a small custom focus-trap written directly inside `Navbar.tsx` using `useEffect` and `keydown` event handling. No new packages or dependencies will be added for Phase 3B.

### Focus Ring Style (all interactive elements)

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.35); /* shadow-focus token */
}
```

Applied to: logo link, all nav links, dropdown items, icon buttons, WhatsApp button, mobile menu links.

### Icon Button Labels

All icon-only buttons get `aria-label`:
- Wishlist button: `aria-label="Wishlist"`
- Cart/Inquiry button: `aria-label="Inquiry cart"`

---

## 6. Files Created or Changed in Phase 3B

**New files:**

| File | Purpose |
|---|---|
| `components/Navbar.tsx` | Complete navbar component — logo, desktop nav, dropdown, mobile menu, scroll behavior |
| `lib/constants.ts` | `WHATSAPP_NUMBER` placeholder constant and `whatsappLink()` helper — single source of truth for all WhatsApp hrefs |

**Modified files:**

| File | Change |
|---|---|
| `app/layout.tsx` | Import and render `<Navbar />` above `{children}`; add `pt-16` (64px) or `pt-14` (56px) to `<main>` so content is not hidden behind the fixed navbar |

**No other files are touched.** `app/page.tsx`, `globals.css`, `lib/utils.ts`, and all empty folders remain unchanged.

---

## 7. Reference Needed?

**Reference is required before Phase 3B implementation.**

Phase 3A planning does not require a visual reference — the planning document is written from the approved specs alone. However, Phase 3B code implementation should not start until navbar direction is visually approved by the user.

Before Phase 3B begins, the user should provide:

| Reference | Required | Notes |
|---|---|---|
| Desktop navbar screenshot | **Required** | Full-width navbar at rest and/or on scroll — confirms layout, spacing, button placement |
| Products dropdown screenshot | **Required** | Dropdown open state — confirms list style, width, shadow, link treatment |
| Mobile menu screenshot | Provide if available | Full-screen menu open — confirms layout, tap targets, WhatsApp CTA placement |

These references are used to confirm that the implementation matches the user's visual intent, not just the written spec. All documented specs (dimensions, colors, transitions) remain authoritative — the references help resolve anything the spec cannot fully capture (relative proportions, visual weight, feel).

If no reference screenshots are available, implementation will proceed strictly from the approved documents and the user will review the result in the browser before Phase 4 begins.

---

## 8. Open Questions (Needs Confirmation Before 3B)

These are the only items not fully resolved by the existing approved documents:

| # | Question | Options | Default if no answer |
|---|---|---|---|
| 1 | **WhatsApp phone number** — what number should all WhatsApp `href` links use? | User provides the number before Phase 3B | Declare a clearly marked placeholder constant (see below) — do not hardcode a fake number anywhere |
| 2 | **Hero background for Phase 3 testing** — since the hero does not exist yet, the navbar will float over the `#F5F5F7` background of `page.tsx`. Is this acceptable for Phase 3 testing, with dark-hero color behavior added in Phase 4? | Yes / No | Yes — test on light background only in Phase 3 |

**WhatsApp number handling:**

The phone number will be declared as a single exported constant in `lib/constants.ts`, not hardcoded into any component:

```ts
// lib/constants.ts
// TODO: Replace with actual WhatsApp number before launch
export const WHATSAPP_NUMBER = "PLACEHOLDER";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

Every WhatsApp `href` across the entire site — navbar button, mobile menu, product cards, hero — will call `whatsappLink()` from this one file. Updating the number at launch requires changing one line only.

If no answer is provided, the defaults above will be used and noted in the Phase 3B completion report.

---

## 9. Phase 3B Completion Checklist (Preview)

This is what will be verified after code is written:

- [ ] Navbar renders at 375px, 768px, 1280px, 1440px with no overflow
- [ ] Logo "Afan Mac Store" visible, left-aligned, correct weight and color
- [ ] All 5 nav links present: Home, Products, Reviews, Location, Contact
- [ ] Products dropdown appears on hover with all 9 category links
- [ ] No other nav link has a dropdown
- [ ] Dropdown closes on mouse leave (with 100ms delay)
- [ ] Dropdown closes on Escape key
- [ ] Right utilities order correct: "Buy on WhatsApp" button → Wishlist icon → Cart/Inquiry icon
- [ ] Navbar is transparent at page top
- [ ] Blur background activates after 60px scroll
- [ ] Border bottom appears on scroll
- [ ] Hamburger icon visible on mobile (< 768px), hidden on desktop
- [ ] Mobile menu opens and closes with animation
- [ ] Mobile menu has all 5 nav links, WhatsApp CTA, Wishlist and Cart icons
- [ ] Products expand works in mobile menu
- [ ] Escape key closes mobile menu
- [ ] Focus is trapped inside mobile menu
- [ ] Focus returns to hamburger on menu close
- [ ] All icon buttons have `aria-label`
- [ ] `aria-expanded` updates on mobile toggle
- [ ] `nav aria-label="Main navigation"` present
- [ ] All interactive elements have visible focus rings
- [ ] No TypeScript errors
- [ ] No console errors

---

## 10. Approval Status

**Phase 3A (this document) — Awaiting user approval.**

Phase 3B (code implementation) will not begin until this plan is explicitly approved. No Navbar.tsx will be created, no layout.tsx will be modified, and no other Phase 3 work will be started until approval is given.

---

*Document version: 1.2 · Revised: Phase 3A · Status: Awaiting Approval*
