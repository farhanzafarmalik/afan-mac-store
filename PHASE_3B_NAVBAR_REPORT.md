# Phase 3B — Navbar Implementation Report

**Status:** Complete — Awaiting user review  
**Date:** 2026-05-24  
**Localhost URL:** `http://localhost:3001`

---

## 1. Files Created / Changed

### New files

| File | Purpose |
|---|---|
| `components/Navbar.tsx` | Full navbar component — wordmark, desktop nav + dropdown, mobile menu, scroll behavior, accessibility |
| `lib/constants.ts` | `WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, and `whatsappLink()` helper — single source of truth |

### Modified files

| File | Change |
|---|---|
| `app/layout.tsx` | Imported `<Navbar />`, rendered above `{children}`, added `pt-14 md:pt-16` to `<body>` so fixed navbar does not obscure content |

### Untouched files

`app/page.tsx`, `app/globals.css`, `lib/utils.ts`, `BRAND_DIRECTION.md`, `DESIGN_SYSTEM.md`, `BUILD_PHASES.md`, all empty folders — unchanged.

---

## 2. Navbar Behavior

| Behavior | Implementation |
|---|---|
| Height | `56px` mobile (`h-14`) · `64px` desktop (`h-16`) |
| Position | `fixed top-0 left-0 right-0 z-[1000]` |
| Max content width | `1200px`, centered, `16px` horizontal padding mobile / `32px` desktop |
| Transparent at top | `background: transparent` — default state |
| Scroll trigger | `window.scrollY > 60` via passive scroll listener |
| Scrolled background | `rgba(255,255,255,0.85)` via `bg-white/85` |
| Backdrop filter | `blur(20px) saturate(180%)` via inline style (avoids Tailwind v4 compatibility edge cases) |
| Border bottom | `1px solid rgba(0,0,0,0.08)` — activates with scroll |
| Transition | `transition-all duration-300` on the header element |
| Left | "Afan Mac Store" — 17px, weight 600, `#1D1D1F`, hover opacity 80% |
| Center | Home · Products · Reviews · Location · Contact — 14px, gap 32px, hover `#0071E3` |
| Right (order) | "Buy on WhatsApp" button → Wishlist icon → Cart/Inquiry icon |

---

## 3. Dropdown Behavior

| Property | Value |
|---|---|
| Trigger | Hover on "Products" nav item only — no other link has a dropdown |
| Close delay | 100ms timer on mouse leave — prevents flicker when moving cursor from button to dropdown |
| Mouse re-enter | Timer cancelled via `onMouseEnter={openDropdown}` on both the wrapper div and the dropdown itself |
| Escape key | `keydown` listener closes dropdown instantly |
| Click toggle | Clicking "Products" also toggles dropdown (keyboard-friendly fallback) |
| Links | All Products · MacBook · iPhone · iPad · Mac mini · iMac · Apple Watch · AirPods · Accessories (9 items) |
| Background | `#FFFFFF` |
| Border | `1px solid #E8E8ED` |
| Border radius | `12px` |
| Shadow | `0 8px 32px rgba(0,0,0,0.12)` (per DESIGN_SYSTEM.md §10 dropdown spec) |
| Width | `208px` (`w-52`) |
| Link padding | `10px 12px`, `8px` border radius, 15px text |
| Link hover | background `#F5F5F7`, text `#0071E3` |
| Animation (appear) | `opacity: 0, y: 6px` → `opacity: 1, y: 0` — 200ms ease-out (Framer Motion `AnimatePresence`) |
| Animation (exit) | Reverse — `opacity: 1, y: 0` → `opacity: 0, y: 6px` |
| Chevron | Rotates 180° when dropdown is open — 200ms ease |

---

## 4. Mobile Menu Behavior

| Property | Value |
|---|---|
| Trigger | Hamburger button (`Menu` icon) — visible on screens < 768px, hidden on desktop |
| Icon swap | `Menu` ↔ `X` on toggle |
| Menu type | Full-screen overlay — `fixed inset-0 z-[1001]` (above navbar) |
| Background | `#FFFFFF` |
| Animation | `opacity: 0, y: -8px` → `opacity: 1, y: 0` — 300ms ease-in-out |
| Header row | Logo wordmark + close (`X`) button — `h-14`, `border-b #E8E8ED` |
| Nav links | Home · Products · Reviews · Location · Contact — 20px, weight 500, full-width, `min-h: 52px` |
| Dividers | `1px solid #E8E8ED` between each link row |
| Products expand | Tap "Products" → ChevronDown rotates → 9 category sub-links slide in — `maxHeight: 0 → 520px`, 200ms |
| Sub-links | 16px, indented 16px, `min-h: 44px` tap targets |
| Close behavior | X button, link tap (any link), Escape key |
| Body scroll | `document.body.style.overflow = "hidden"` while menu is open — restored on close |
| Wishlist + Cart | Row of icon + label buttons above WhatsApp CTA |
| WhatsApp CTA | Full-width pill button — `#25D366` background, 48px height, "Buy on WhatsApp" label |

---

## 5. Accessibility Implementation

| Requirement | Implementation |
|---|---|
| Semantic structure | `<header>` wraps everything · `<nav aria-label="Main navigation">` wraps links |
| Logo | `<a aria-label="Afan Mac Store — Home">` |
| Mobile toggle | `aria-expanded={mobileOpen}` · `aria-controls="mobile-menu"` · `aria-label` switches "Open menu" / "Close menu" |
| Mobile menu | `role="dialog"` · `aria-label="Navigation menu"` · `aria-modal="true"` · `id="mobile-menu"` |
| Products button | `aria-expanded={dropdownOpen}` · `aria-haspopup="true"` · `aria-controls="products-dropdown"` |
| Dropdown | `role="menu"` · `id="products-dropdown"` — each link has `role="menuitem"` |
| Icon buttons | Wishlist: `aria-label="Wishlist"` · Cart: `aria-label="Inquiry cart"` |
| Focus ring | `focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Escape key — dropdown | `keydown` listener added/removed with `dropdownOpen` state |
| Escape key — mobile menu | Handled inside the focus trap `keydown` listener |
| Custom focus trap | `useEffect` on `mobileOpen` queries all focusable elements inside `menuRef` on each `Tab` press (dynamic — adapts as Products sub-links expand). On `Shift+Tab` at first element → focus wraps to last. On `Tab` at last → focus wraps to first. On `Escape` → closes menu, returns focus to hamburger button via `hamburgerRef` |
| No new packages | Focus trap implemented with `useRef`, `useEffect`, and `document.addEventListener` — no `focus-trap-react` or any new dependency |

---

## 6. WhatsApp Number Implementation

| Detail | Value |
|---|---|
| File | `lib/constants.ts` |
| `WHATSAPP_NUMBER` | `"923133388666"` (no `+` sign — required by `wa.me` format) |
| `WHATSAPP_DISPLAY` | `"+92 313 3388666"` (human-readable, for display in footer/contact sections) |
| Helper | `whatsappLink(message: string)` — returns `https://wa.me/923133388666?text=...` with URL-encoded message |
| Usage in Navbar | `whatsappLink(WHATSAPP_MSG)` — number is never hardcoded in `Navbar.tsx` |
| Navbar message | `"Hi Afan Mac Store, I want to buy an Apple product. Please guide me."` |
| Rendered URL | `https://wa.me/923133388666?text=Hi%20Afan%20Mac%20Store%2C%20I%20want%20to%20buy%20an%20Apple%20product.%20Please%20guide%20me.` — confirmed via curl |
| Future updates | Change `WHATSAPP_NUMBER` in `lib/constants.ts` only — all links across the site update automatically |

---

## 7. Localhost URL

**`http://localhost:3001`**

Port 3001 is used because port 3000 was already occupied by another process (Next.js auto-assigned 3001). The dev server compiled the Navbar without errors:

```
✓ Compiled in 557ms
GET / 200 in 257ms
```

---

## 8. Errors Found and Fixed

| Error | Fix |
|---|---|
| `TS2554: Expected 1 arguments, but got 0` on `useRef<ReturnType<typeof setTimeout>>()` | Changed to `useRef<ReturnType<typeof setTimeout> \| undefined>(undefined)` — explicit initial value required when generic type does not include `undefined` |
| Mobile expanded Products state pushed WhatsApp CTA out of viewport | Restructured mobile menu into a three-zone flex column: header (`flex-none`), nav area (`flex-1 overflow-y-auto min-h-0`), utilities (`flex-none`). Nav links scroll independently while the WhatsApp CTA remains pinned and always reachable. |

No other TypeScript errors. No runtime errors. `tsc --noEmit` exits clean.

---

## 9. Scope Confirmation

The following were **not** built during Phase 3B:

- No hero section
- No homepage sections
- No category cards or category data
- No product cards or product data
- No product listing pages
- No routing beyond what Next.js provides by default
- No new npm packages installed

The only files changed are the three listed in Section 1. Phase 4 has not been started.

---

## 10. Approval Status

**Phase 3B — Awaiting user review.**

Please open `http://localhost:3001` and verify:
- Navbar is visible above "Phase 2 setup complete."
- "Buy on WhatsApp" button, Wishlist icon, Cart icon appear on desktop
- Scrolling past 60px activates the blur background
- Products dropdown opens on hover with all 9 category links
- Mobile view (< 768px) shows the hamburger icon
- Tapping hamburger opens the full-screen mobile menu
- Products expands inline in the mobile menu

Phase 4 will not begin until this phase is explicitly approved.

---

*Document version: 1.0 · Created: Phase 3B · Status: Awaiting Approval*
