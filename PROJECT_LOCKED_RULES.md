# PROJECT_LOCKED_RULES.md
**Single reference for all future phases. Read this first, then read only the current phase plan.**

---

## 1. Brand Identity

- **Name:** Afan Mac Store
- **Position:** Premium Apple reseller in Pakistan — genuine products, WhatsApp sales, expert guidance
- **Language:** English only
- **Tone:** Trusted · Premium · Modern · Expert · Calm — never cheap, pushy, or bazaar-style
- **Apple-inspired, not Apple clone** — draws from Apple's design language; is its own distinct brand
- **No Apple logo** anywhere on the site — ever
- **No fake official Apple branding** — do not imply authorization, do not replicate Apple marketing slogans
- **No "Your Apple Store"** or any wording that suggests official Apple retail status

---

## 2. Design System Essentials

### Colors

| Role | Hex |
|---|---|
| Site background | `#F5F5F7` — always off-white, never pure white |
| Surface (cards, navbar) | `#FFFFFF` |
| Product image bg | `#F9F9F9` |
| Text primary | `#1D1D1F` |
| Text secondary | `#6E6E73` |
| Text tertiary / muted | `#AEAEB2` |
| Border standard | `#D2D2D7` |
| Border light | `#E8E8ED` |
| Accent (CTA, links) | `#0071E3` — used sparingly, CTAs and links only |
| WhatsApp | `#25D366` — WhatsApp CTAs only |
| WhatsApp hover | `#1DAE56` |

### Typography

- Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Geist", sans-serif`
- Hero/display headline: `clamp(2.75rem, 7vw + 1rem, 6rem)` — never fixed px on headlines
- Section headline: `clamp(2rem, 4vw + 0.5rem, 3.5rem)`
- Body large: `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`
- Minimum font size anywhere: **12px**
- Headlines are never all-caps (overlines/labels only)
- No decorative, serif, or script fonts
- Max body column width: `68ch`

### Buttons

- All buttons: `border-radius: 9999px` (pill) — no exceptions
- Min height: **44px** on all buttons and interactive elements
- Primary: `#0071E3` bg, `#FFFFFF` text, hover `#0077ED`
- Outline: `transparent` bg, `1.5px solid #0071E3`, hover `rgba(0,113,227,0.06)`
- WhatsApp: `#25D366` bg, `#FFFFFF` text, WhatsApp icon left, hover `#1DAE56`
- Button text: sentence case or title case — **never all-caps, never uppercase**
- No gradients, no drop shadows on buttons

### Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-md` | 12px | Image thumbnails, dropdowns |
| `radius-lg` | 18px | Standard cards |
| `radius-xl` | 24px | Large feature cards |
| `radius-full` | 9999px | All buttons and pills |

### Spacing

- 8px base grid
- Section vertical padding: min `96px` desktop, `64px` mobile
- Hero padding: `128px` desktop, `64px` mobile
- Max content width: `1200px`, centered, `32px` horizontal padding desktop
- Card grid gap: `32px` desktop, `24px` mobile

### Shadows

- Card at rest: `0 1px 4px rgba(0,0,0,0.05)` + `1px solid #E8E8ED` border
- Card hover: `0 2px 10px rgba(0,0,0,0.07)` — never heavier
- Dropdown: `0 8px 32px rgba(0,0,0,0.12)`
- Focus ring: `0 0 0 3px rgba(0,113,227,0.35)`
- General card/hover shadows should stay at or below `rgba` opacity `0.10`. The approved navbar dropdown shadow is the only exception: `0 8px 32px rgba(0,0,0,0.12)`. Do not make shadows heavier than this.

### Animation

- Allowed: fade-in, `translateY` max 20px, opacity transitions, subtle hover lift (2–4px)
- Forbidden: bounce, spring, elastic, spin, flash, parallax, looping, horizontal slide
- Duration range: `150ms` – `1000ms` (outside this range is wrong)
- All animations must respect `prefers-reduced-motion` — instant render with no transforms
- Easing: `ease-out` for entrances, `ease` for hover transitions

### Accessibility

- Focus ring on all interactive elements: `box-shadow: 0 0 0 3px rgba(0,113,227,0.35)`
- Min tap target: `44px × 44px`
- Semantic HTML: `<header>`, `<nav aria-label="Main navigation">`, `<main>`, `<footer>`
- One `<h1>` per page, logical `<h2>`/`<h3>` hierarchy
- All images require `alt` text
- Mobile menu must trap keyboard focus while open; Escape closes it

---

## 3. WhatsApp Rules

```ts
// lib/constants.ts — single source of truth
WHATSAPP_NUMBER = "923133388666"   // no + sign — required by wa.me format
WHATSAPP_DISPLAY = "+92 313 3388666"  // human-readable for display
```

- **All WhatsApp links across the entire site must call `whatsappLink()` from `lib/constants.ts`**
- Never hardcode `wa.me/...` in any component
- `wa.me` format requires the number without `+` sign
- Changing the number in `lib/constants.ts` updates every link on the site automatically

---

## 4. Approved Navbar Rules

**Structure (left → center → right):**
```
[Afan Mac Store]  [Home · Products · Reviews · Location · Contact]  [Buy on WhatsApp · ♡ · 🛍]
```

- Height: 64px desktop / 56px mobile; `fixed top-0 z-[1000]`
- Default: transparent background, dark text `#1D1D1F`
- After 60px scroll: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(20px) saturate(180%)` + `1px solid rgba(0,0,0,0.08)` border — backdrop-filter applied via inline `style` prop (not Tailwind class)
- Right utility order: **"Buy on WhatsApp" pill → Wishlist icon → Cart/Inquiry icon**
- "Buy on WhatsApp" button: outline pill, `1.5px solid #25D366`, text `#25D366`, min-height 44px

**Products dropdown (desktop only):**
- Trigger: hover on "Products" only — no other nav link has a dropdown
- 100ms close delay on mouse leave (prevents flicker)
- Background `#FFFFFF`, `border-radius: 12px`, `border: 1px solid #E8E8ED`, shadow `0 8px 32px rgba(0,0,0,0.12)`
- Links: All Products · MacBook · iPhone · iPad · Mac mini · iMac · Apple Watch · AirPods · Accessories
- No images, no mega menu, no columns

**Mobile menu:**
- Full-screen overlay `fixed inset-0 z-[1001]`, white background
- Three-zone flex column: `flex-none` header → `flex-1 overflow-y-auto min-h-0` scrollable nav → `flex-none` pinned utilities
- "Buy on WhatsApp" CTA always visible at bottom — must not be pushed off-screen when Products expands
- Products expands inline (9 sub-links) — chevron rotates 180°
- Escape key closes; focus trapped; focus returns to hamburger on close
- Custom focus trap implemented in `Navbar.tsx` — no additional npm packages

---

## 5. Approved Hero Rules

**Phase 4B hero is a premium campaign-style 4-slide hero slider — not a static two-column hero.**

### Slider structure
- **Background: `#F5F5F7` (light) — locked for all 4 slides**
- Dark hero (`#000000`) is deferred — not in Phase 4B
- **4 slides:** MacBook · iPhone · iPad · Mac mini
- Auto-advances every **4 seconds** per slide
- Manual **dot indicators** — user can navigate between slides
- **Pauses on hover and keyboard focus** — resumes on mouse leave / focus out
- `prefers-reduced-motion`: auto-advance disabled, transitions instant, dot navigation only

### Per-slide layout
- **Desktop:** compact text block left (bottom-left or left-center, ~45%) · large product visual right (~55%)
- **Mobile:** text block first (top) · product visual below
- Product visual is the dominant element — text must stay compact, not thesis-style
- One overline · one-line headline · one-line sub-copy · CTA row per slide

### CTAs
- Primary: **"Buy on WhatsApp"** — `#25D366` solid pill, `whatsappLink()` from `lib/constants.ts`
- Secondary: **"View Products"** — `#0071E3` outline pill, `href="/products"`
- **"Buy Now" is forbidden** — there is no checkout or payment

### Trust stats
- `10K+ Happy Customers | 100% Genuine | 4.9 ★ Rating`
- Fixed row **below the slider**, always visible regardless of active slide

### Branding rules
- **"Your Apple Store" is forbidden** — reseller-focused copy only
- No Apple logo anywhere
- No phrasing that implies official Apple retail status

### Device visual rules — no plain gray boxes
- Each slide: one product frame, **dominant, premium, intentional**
- **Must use:** soft gradients on device body and screen · subtle edge highlights · ambient shadow beneath device · structural details (keyboard strip, side buttons, vent slots, etc.)
- **Forbidden:** flat empty gray rectangles · misaligned elements · external image URLs · Apple logo or trademark

---

## 6. Strict Build Scope Rules

- **Build one phase at a time. Do not start the next phase without explicit user approval.**
- Do not touch files unrelated to the current phase
- **Permanently out of scope for all phases** (requires explicit written approval to add):
  - Checkout / payment gateway
  - Backend database or CMS
  - User accounts / authentication
  - Admin panel
  - Order tracking
  - Server-persisted wishlist or cart
- Wishlist and Cart/Inquiry are **frontend-only** inquiry helpers — no backend state
- No new npm packages without stating the reason first

---

## 7. Current Project Status

| Phase | Name | Status |
|---|---|---|
| 1 | Brand Direction + Design System | ✅ Approved |
| 2 | Project Setup | ✅ Approved |
| 3A | Navbar Plan | ✅ Approved |
| 3B | Navbar Code | ✅ Approved |
| 4A | Hero Slider Plan | ✅ Approved |
| **4B** | **Hero Slider Code** | **Next — awaiting Phase 4B start** |
| 5–10 | Remaining phases | Pending |

**Tech stack (locked):** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 (CSS-first `@theme {}` in globals.css) · Framer Motion v12 · Lucide React · clsx + tailwind-merge

**Tailwind v4 note:** No `tailwind.config.ts`. All tokens are defined inside `@theme {}` in `app/globals.css`. Use `@import "tailwindcss"` at the top.

---

## 8. Future Prompt Usage

> **In future phases: read `PROJECT_LOCKED_RULES.md` first, then read only the current phase plan. Do not re-read BRAND_DIRECTION.md, DESIGN_SYSTEM.md, BUILD_PHASES.md, or prior phase reports unless the user specifically asks.**

This file is the consolidated single source of all locked decisions. It is updated at the end of each planning phase. If a rule here conflicts with a phase plan document, the phase plan document (which is more recent and more specific) takes precedence — but flag the conflict rather than silently overriding.

---

*Document version: 1.0 · Created: Post Phase 4A · Last updated: 2026-05-24*
