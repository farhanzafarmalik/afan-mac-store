# Afan Mac Store — Brand Direction & Visual Design System
**Phase 1 Document · For Review Before Any Code**

---

## 1. Brand Positioning

**What it is:**
Afan Mac Store is Pakistan's trusted premium Apple reseller — the go-to destination for genuine Apple products, expert guidance, and a frictionless buying experience over WhatsApp.

**One-line brand statement:**
> "Pakistan's home for genuine Apple."

**Brand promise:**
Every customer gets a premium, trustworthy experience — from browsing the website to receiving their product — that feels on par with international Apple retailers.

**Target customer:**
- Professionals, students, and creators who want genuine Apple products
- People who distrust gray-market or unverified sellers
- First-time Apple buyers who need guidance
- Existing Apple users upgrading their devices
- Gift buyers looking for reliability

**Competitive position:**
Not a marketplace. Not a gray-market shop. Not a cheap price aggregator.
A curated, expert, premium reseller — the trusted middle ground between Apple.com (unavailable locally) and unreliable local shops.

**Brand personality:**
Trusted · Premium · Modern · Expert · Clean · Reliable · International-feeling

**Brand anti-personality (what it must never feel like):**
Cheap · Bazaar-style · Cluttered · Pushy · Generic template · Overloaded · Flashy · Fake Apple clone

---

## 2. Visual Design Principles

These principles govern every design decision on the website.

### Principle 1 — Whitespace is not empty space
Generous whitespace communicates premium. Every section must breathe. Do not fill space for the sake of filling it.

### Principle 2 — Let the product speak
Apple products are beautiful objects. Feature them large, clean, and uncluttered. No busy backgrounds, no heavy shadows behind product images.

### Principle 3 — Typography carries the weight
Use type hierarchy to communicate, not decorative elements. Large, confident headlines. Readable body copy. Restrained use of color for text.

### Principle 4 — Calm, not cold
The site should feel warm and approachable — not sterile or robotic. Subtle warmth in the off-white background, generous line spacing, and human copywriting.

### Principle 5 — Trust through restraint
Cheap sites over-design to compensate. Premium sites restrain. Every element must justify its existence. If it does not add clarity or beauty, remove it.

### Principle 6 — Motion is punctuation
Animations should feel like a natural breath — not a performance. Motion guides attention; it never demands it.

---

## 3. Typography System

### Font Stack
```
Primary:   -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Geist", sans-serif
Body:      -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Geist", sans-serif
Monospace: "SF Mono", "Fira Code", monospace (for technical specs only)
```

### Type Scale

| Role             | Size (desktop) | Size (mobile) | Weight      | Line Height | Letter Spacing |
|-----------------|---------------|---------------|-------------|-------------|----------------|
| Display / Hero   | 72–96px       | 40–52px       | 600–700     | 1.05        | -0.03em        |
| Section Headline | 48–56px       | 32–40px       | 600         | 1.1         | -0.02em        |
| Card Title       | 24–28px       | 20–24px       | 600         | 1.2         | -0.01em        |
| Body Large       | 18–20px       | 16–18px       | 400         | 1.65        | 0              |
| Body Default     | 16px          | 15px          | 400         | 1.6         | 0              |
| Caption / Label  | 12–13px       | 12px          | 500         | 1.4         | 0.04em (caps)  |
| Button Text      | 15–17px       | 15px          | 500         | 1           | 0              |
| Price            | 20–24px       | 18–20px       | 600         | 1.2         | -0.01em        |
| Spec Text        | 13–14px       | 13px          | 400         | 1.5         | 0              |

### Typography Rules
- Headlines are never all-caps except for small labels/categories
- Do NOT use decorative fonts, serif fonts, or script fonts anywhere
- Avoid using more than 2 font weights in a single section
- Maximum line length for body text: 68 characters (readable column width)
- Use optical letter-spacing (negative) only on large display text
- Section overlines (small category labels above headlines) use 0.1em letter-spacing, uppercase, muted gray, 11–12px

### Responsive Typography (clamp() values)
All display and headline text must scale fluidly using CSS `clamp()`. Never use fixed pixel sizes on headline elements.

| Role             | clamp() value                               | Mobile floor | Desktop ceiling |
|-----------------|---------------------------------------------|-------------|-----------------|
| Display / Hero   | `clamp(2.75rem, 7vw + 1rem, 6rem)`         | ~44px        | ~96px           |
| Section Headline | `clamp(2rem, 4vw + 0.5rem, 3.5rem)`        | ~32px        | ~56px           |
| Sub-Headline     | `clamp(1.75rem, 3vw + 0.5rem, 3rem)`       | ~28px        | ~48px           |
| Card Title       | `clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)`  | ~20px        | ~24px           |
| Body Large       | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`  | ~16px        | ~20px           |

Tablet behavior (768px): clamp() resolves naturally to the midpoint — no manual override needed. Test at 768px to confirm no overflow or line-break awkwardness.

---

## 4. Color Palette

### Core Palette

| Token             | Hex       | Usage                                          |
|------------------|-----------|------------------------------------------------|
| `background`      | `#F5F5F7` | Site base background (Apple's signature off-white) |
| `surface`         | `#FFFFFF` | Cards, navbars, modals, inputs                 |
| `surface-elevated`| `#FFFFFF` | Cards with drop shadow — same white, shadow differentiates |
| `text-primary`    | `#1D1D1F` | Main headlines and primary text                |
| `text-secondary`  | `#6E6E73` | Subheadings, descriptions, labels              |
| `text-tertiary`   | `#AEAEB2` | Captions, placeholder text, specs              |
| `border`          | `#D2D2D7` | Subtle dividers and card outlines              |
| `border-light`    | `#E8E8ED` | Ultra-subtle separators inside sections        |

### Accent Palette

| Token             | Hex       | Usage                                          |
|------------------|-----------|------------------------------------------------|
| `accent`          | `#0071E3` | Primary CTA buttons, links, highlights (Apple blue) |
| `accent-hover`    | `#0077ED` | Hover state of accent color                    |
| `accent-pressed`  | `#005BB5` | Active/pressed state                           |
| `accent-subtle`   | `#E8F1FC` | Light accent background for badges, tags       |
| `accent-text`     | `#0071E3` | Text links and interactive labels              |

### Semantic / Status Colors

| Token       | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| `success`   | `#34C759` | "In Stock", verified badge     |
| `warning`   | `#FF9500` | "Low Stock", deal badge        |
| `error`     | `#FF3B30` | Out of stock                   |
| `whatsapp`  | `#25D366` | WhatsApp CTA button            |

### Dark Section (Optional — Hero or Premium Highlight)

| Token             | Hex       | Usage                                          |
|------------------|-----------|------------------------------------------------|
| `dark-bg`         | `#000000` | Full-bleed dark hero section background        |
| `dark-surface`    | `#1C1C1E` | Dark card or panel surface                     |
| `dark-text`       | `#F5F5F7` | Text on dark sections                          |
| `dark-secondary`  | `#98989D` | Secondary text on dark sections                |
| `dark-border`     | `#38383A` | Borders on dark sections                       |

### Color Rules
- Background is `#F5F5F7`, not pure white — this is important for the premium off-white feel
- Cards sit on `#FFFFFF` to create gentle lift from the background
- Never use gradients as primary backgrounds — gradients are for product highlight accents only
- Never use neon, vibrant, or saturated colors except for status indicators
- Accent blue is used sparingly — primarily on primary CTA buttons and links only
- WhatsApp green (`#25D366`) appears exclusively on WhatsApp call-to-action elements

---

## 5. Spacing & Layout Rules

### Base Spacing Scale (8px grid)

| Token  | Value  | Usage                                  |
|--------|--------|----------------------------------------|
| `xs`   | 4px    | Tight internal gaps (icon + label)    |
| `sm`   | 8px    | Small internal padding                |
| `md`   | 16px   | Standard padding, gap between items  |
| `lg`   | 24px   | Card internal padding                 |
| `xl`   | 32px   | Section sub-element spacing           |
| `2xl`  | 48px   | Between cards in a grid               |
| `3xl`  | 64px   | Section padding (top/bottom)          |
| `4xl`  | 96px   | Large section vertical rhythm         |
| `5xl`  | 128px  | Hero padding                          |
| `6xl`  | 160px  | Maximum section breathing room        |

### Layout Grid

| Breakpoint | Columns | Gutter | Max Content Width |
|-----------|---------|--------|-------------------|
| Mobile    | 4       | 16px   | 100% - 32px       |
| Tablet    | 8       | 24px   | 100% - 48px       |
| Desktop   | 12      | 32px   | 1200px            |
| Wide      | 12      | 40px   | 1440px            |

### Section Rhythm Rules
- Every section has a minimum of 96px vertical padding (top + bottom) on desktop
- Hero sections have 128–160px vertical padding
- Section overlines (small label above headline) have 12px margin-bottom
- Section headlines have 16px margin-bottom before subtext
- Subtext has 40px margin-bottom before the first content block
- Card grids have 24px gap on mobile, 32px on desktop
- Never stack two visually heavy sections back-to-back without a light/minimal separator section

---

## 6. Card Style Rules

### Product Card (Primary)
- Background: `#FFFFFF`
- Border: `1px solid #E8E8ED` — this is the primary card differentiator, not the shadow
- Border radius: `18px`
- Box shadow: `0 1px 4px rgba(0,0,0,0.05)` at rest (barely visible — border carries the weight)
- Box shadow on hover: `0 2px 10px rgba(0,0,0,0.07)` with `translateY(-2px)` — smooth 0.3s ease (minimal lift)
- Internal padding: `24px`
- Image area: top-aligned, centered product image on white or very light gray background (`#F9F9F9`)
- Product image padding: `24px all sides` inside the image container
- Below image: category label (small, muted), product name (bold), specs line (muted), price (primary colored), CTA button or WhatsApp link

### Info / Feature Card
- Background: `#FFFFFF`
- Border: `1px solid #E8E8ED` — border is the primary differentiator, not shadow
- Border radius: `18px`
- Padding: `32px`
- Icon: 40px, accent color or muted
- Shadow: `shadow-xs` (`0 1px 3px rgba(0,0,0,0.06)`) or none — never a heavy shadow

### Dark Feature Card (optional premium sections)
- Background: `#1C1C1E`
- Border radius: `18px`
- Text: `#F5F5F7`
- Padding: `32px`

### Card Rules
- Cards differentiate from the background primarily via white surface + subtle border (`#E8E8ED`) — shadow is secondary
- Shadows are extremely soft at rest; hover adds only a gentle increase, not a dramatic jump
- No gradient backgrounds inside cards
- Image containers inside cards have consistent aspect ratios (prefer 4:3 or 1:1 for products)
- Card hover animation: `transform: translateY(-2px)` + shadow increase (shadow-sm → shadow-md only, never shadow-lg or heavier), 0.3s ease-out — never use scaling
- Cards in a grid must be the same height — use flex column layout with price and CTA pinned to bottom

---

## 7. Button Style Rules

### Primary Button (Accent CTA)
- Background: `#0071E3`
- Text color: `#FFFFFF`
- Font: 15px, weight 500
- Padding: `12px 22px`
- Border radius: `980px` (pill shape — Apple convention)
- Hover: background `#0077ED`, no transform
- Active: background `#005BB5`
- Transition: background 0.2s ease
- No box shadow on buttons

### Secondary Button (Outline)
- Background: transparent
- Border: `1.5px solid #0071E3`
- Text color: `#0071E3`
- Same sizing as primary
- Hover: background `rgba(0,113,227,0.06)`

### Ghost / Text Button (Link-style)
- Background: transparent
- Text color: `#0071E3`
- Underline: none at rest, underline on hover
- Used for secondary navigation actions

### WhatsApp Button
- Background: `#25D366`
- Text color: `#FFFFFF`
- Icon: WhatsApp icon to the left
- Same sizing and border-radius as primary
- Hover: background `#1DAE56`

### Destructive / Alert
- Background: `#FF3B30`
- Text: `#FFFFFF`
- Rare use only

### Button Rules
- All buttons use pill border-radius (`border-radius: 980px`) — no square buttons
- Button text is always sentence case or title case — never uppercase, never all-caps
- Correct examples: "Shop MacBooks" · "Explore iPhones" · "WhatsApp Us" · "View All Deals" · "Learn More" · "Chat with Us"
- Wrong examples: "SHOP NOW" · "BUY NOW" · "EXPLORE" · "CLICK HERE"
- Buttons never have decorative gradients or glow
- Minimum tap target on mobile: 44px height
- Disabled state: 40% opacity, cursor not-allowed

---

## 8. Header / Navigation Style Rules

### Structure
- Sticky on scroll (after 60px scroll distance — subtle background blur activates)
- Height: 64px on desktop, 56px on mobile
- Background: `rgba(255,255,255,0.85)` with `backdrop-filter: blur(20px) saturate(180%)`
- Bottom border: `1px solid rgba(0,0,0,0.08)` — activates on scroll only
- Z-index: 1000

### Logo
- Left-aligned
- Text logo: "Afan Mac Store" or a wordmark — no icon-only mark needed at this stage
- Font: system font, weight 600, size 17px, color `#1D1D1F`

### Navigation Links (Desktop)
- Center-aligned links
- Font: 14px, weight 400, color `#1D1D1F`
- Hover: color `#0071E3`, transition 0.15s ease
- Active page: weight 500
- No underlines at rest

### Primary Navigation Items
`Home · Products · Reviews · Location · Contact`

### Products Dropdown (on hover/click)
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

### Right-Side Utilities (Desktop)
Required items (left to right):
- Wishlist icon — heart/bookmark icon, links to frontend wishlist
- Cart / Inquiry icon — bag icon, links to frontend inquiry cart
- "WhatsApp Us" or "Buy on WhatsApp" button — pill outline, `#25D366`

Optional item:
- Search icon — only if search is implemented

Note: Mobile menu icon replaces nav links on tablet/mobile.
Note: Wishlist and Inquiry Cart are frontend-only helpers — no backend, no user accounts.

### Mobile Menu
- Full-screen slide-down or side-drawer
- Background: `#FFFFFF`
- Links: large, 20px, full-width tap targets
- Close button top-right
- Smooth 0.3s ease animation

### Navbar Rules
- Never use a colored or dark navbar as the default — it is white/translucent
- The navbar gets its visual weight from blur + subtle border, not opacity or color
- **Light hero background:** navbar text and logo start dark (`#1D1D1F`) — no color override needed
- **Dark hero background:** navbar text and logo start white (`#F5F5F7`) and transition to dark after 60px scroll
- Do not force white navbar text when the hero is light — this causes a contrast failure
- No hamburger icon animation complexity — keep it clean
- No image-heavy mega menu in the first build. Use a clean Products dropdown with category links only.

---

## 9. Product Image / Mockup Style Rules

### Image Treatment
- Product images are always on a clean white or very light neutral background (`#FFFFFF` or `#F9F9F9`)
- No dark product photography backgrounds on cards
- No lifestyle/context photography on catalog cards (save for hero and feature sections)
- No harsh drop shadows under products
- Use Apple's official product renders where available (PNG with transparent background)
- Products should be centered, with equal padding on all sides inside the image container

### Hero / Feature Images
- Large, cinematic product imagery
- Either full-width product shot on dark background OR large centered product on white
- No text overlaid on complex backgrounds — ensure contrast at all times

### Image Aspect Ratios
- Product card image containers: `4:3` or `1:1` — consistent per section
- Hero images: full-width or `16:9` at most
- Category thumbnail images: `1:1`

### Placeholder / Fallback
- If no image is available: a clean `#F5F5F7` rectangle with centered product category icon in `#AEAEB2`
- No broken image icons, no alt text overflow

### Fallback & Mockup Rules
- If official product renders are not available, use clean CSS device frames or SVG outlines — never random external image URLs
- Never mix image styles within the same section (no mixing photography, flat icons, and 3D renders in one grid)
- Every card in a grid must use identical image treatment: same background color, same aspect ratio, same internal padding
- CSS mockup standard: `#F9F9F9` container, `border: 1px solid #E8E8ED`, `border-radius: 12px`, centered device outline
- Placeholder standard: `#F5F5F7` fill + centered Lucide category icon in `#AEAEB2` — always consistent, never broken

### Image Rules
- Never stretch or distort product images
- Never add drop shadows directly to product PNG images
- Lifestyle imagery only in hero, editorial, and "about" sections
- All images must be optimized (WebP preferred), lazy-loaded except hero
- No external image URLs — all images must be local assets or explicitly sourced and approved

---

## 10. Animation / Motion Rules

### Core Principles
Motion supports clarity — it does not entertain. When in doubt, remove the animation entirely.

Allowed: fade-in, slight translateY (max 20px upward), opacity transitions, subtle hover lift (2–4px max).
Forbidden: bounce, spring, spin, flash, aggressive parallax, horizontal sliding, random or decorative movement.

### Allowed Animations

| Animation                  | Trigger      | Duration | Easing              | Notes                          |
|---------------------------|--------------|----------|---------------------|--------------------------------|
| Fade in + translateY(20px) | Scroll enter | 0.6s     | ease-out            | For sections and cards         |
| Staggered card reveal      | Scroll enter | 0.4–0.8s | ease-out, 80ms delay per item | Product grids only      |
| Opacity fade in            | Scroll enter | 0.5s     | ease-out            | For text blocks                |
| Card hover lift            | Hover        | 0.3s     | ease-out            | translateY(-2px) + shadow-sm → shadow-md only |
| Button background change   | Hover        | 0.2s     | ease                | Color transition only          |
| Navbar blur activation     | Scroll       | 0.3s     | ease                | Backdrop-filter appears        |
| Hero image entrance        | Page load    | 0.8–1.0s | ease-out            | Slow, cinematic fade           |
| Mobile menu slide          | Toggle       | 0.3s     | ease-in-out         | Slide down or slide right      |
| Dropdown menu appear       | Hover/Focus  | 0.2s     | ease-out            | Fade + slight translateY       |
| Image scale on hover       | Hover        | 0.4s     | ease-out            | Scale 1.0 → 1.03 inside container |

### Forbidden Animations
- No bounce, spring, or elastic easing
- No spinning elements (loading states excepted)
- No flashing or blinking
- No heavy parallax scrolling
- No animations faster than 0.15s (feels glitchy)
- No animations slower than 1.2s (feels broken)
- No entrance animations that move elements more than 24px
- No animations that repeat or loop on the page

### Scroll Animation Rules
- Use IntersectionObserver for scroll-triggered animations
- Threshold: 0.15 (animate when 15% of element is visible)
- Once: true (animate only once — do not re-animate on scroll up)
- Respect `prefers-reduced-motion` — all animations must degrade to instant appearance when this media query is set

---

## 11. Things to Avoid (Design Anti-patterns)

### Layout Anti-patterns
- Multiple columns of text without clear hierarchy
- Rows of products with no breathing room between sections
- Carousels as the primary content mechanism (a few are acceptable, not dominant)
- Sticky banners or bars other than the navbar
- Pop-ups or modals on page load
- Cookie consent popups (Pakistan context — not required)

### Typography Anti-patterns
- More than 3 font sizes in a single section
- Using bold on entire paragraphs
- Using italic for emphasis (use weight instead)
- All-caps headlines (small labels only)
- Text smaller than 13px anywhere
- Dark text on image backgrounds without a scrim/overlay

### Color Anti-patterns
- Using more than 2 accent colors in a section
- Gradient backgrounds as section fills
- Colored section backgrounds other than `#F5F5F7` or `#FFFFFF` (dark sections are the exception)
- Green used for anything other than WhatsApp CTAs or "in stock" status
- Shadows darker than `rgba(0,0,0,0.10)` — the approved maximum from the design system

### Image Anti-patterns
- Stretched or cropped product images
- Inconsistent aspect ratios within the same card grid
- Product images with colored or busy backgrounds
- Hero sections without a proper fallback for slow connections

### Interaction Anti-patterns
- Hover states that move entire page sections
- Click targets smaller than 44px × 44px
- Forms without proper error states
- Buttons without visible focus rings (accessibility requirement)

---

## 12. Design Checklist (For Every Section)

Before any section is considered complete, it must pass all of these:

**Layout**
- [ ] Does the section breathe? (minimum 96px vertical padding on desktop)
- [ ] Is the content width capped at 1200px and centered?
- [ ] Does it work correctly at 375px (mobile), 768px (tablet), and 1440px (desktop)?
- [ ] Are all grid gaps consistent with the spacing scale?

**Typography**
- [ ] Is the headline large enough to feel confident (min 40px on mobile)?
- [ ] Is body text legible at 16px with 1.6 line height?
- [ ] Are there no more than 3 distinct type sizes in the section?
- [ ] Is all text color from the defined color palette?

**Color**
- [ ] Is the background `#F5F5F7` or `#FFFFFF` (or intentional dark section)?
- [ ] Are all text colors from the defined palette?
- [ ] Is accent blue used only for CTAs and interactive elements?
- [ ] Are there no unapproved gradients or colors?

**Cards / Components**
- [ ] Do all cards in a grid share the same height?
- [ ] Do product images have consistent aspect ratios?
- [ ] Is the card hover state working (translateY + shadow)?
- [ ] Are all buttons pill-shaped with correct colors?

**Animation**
- [ ] Do scroll-triggered animations use fade + translateY(20px) only?
- [ ] Is `prefers-reduced-motion` respected?
- [ ] Are all transitions within 0.2–0.8s range?
- [ ] Does the page feel calm, not busy?

**Trust & Commercial**
- [ ] Is there a clear CTA (WhatsApp or primary button) in the section?
- [ ] Does the section feel trustworthy (not cheap or overly salesy)?
- [ ] Is product information accurate and legible?
- [ ] Are prices clearly displayed in PKR?

---

## 13. Recommended Website Structure

### Pages
```
/               → Homepage
/mac            → Mac category (MacBook Air, MacBook Pro, Mac mini, iMac)
/iphone         → iPhone category
/ipad           → iPad category
/watch          → Apple Watch category
/airpods        → AirPods category
/accessories    → Accessories
/deals          → Current deals and offers
/about          → About Afan Mac Store
/contact        → Contact & WhatsApp
```

### Homepage Sections — First Build (ordered)
```
1. Header / Navbar (sticky, translucent, Products dropdown)
2. Hero — Hero product (MacBook Pro or iPhone) with headline + CTA
3. Product Category Cards — 4-column grid of category tiles
4. Featured Products — 4–6 current bestsellers with WhatsApp CTA
5. Why Afan Mac Store — Trust signals (Genuine, Warranty, WhatsApp, Delivery)
6. Customer Reviews — 3–4 testimonials
7. Location / Contact section — where we serve, how to reach us
8. Footer — links, WhatsApp, contact info
```

### Moved to Future Phases (not first build)
```
— Deals / Offers strip
— Product Spotlight / editorial feature section
— FAQ section
— Advanced search
— Full catalog expansion beyond homepage grid
```

### Navigation Structure
```
Primary nav:    Home | Products | Reviews | Location | Contact
Products dropdown: All Products · MacBook · iPhone · iPad · Mac mini
                   iMac · Apple Watch · AirPods · Accessories
Utilities:      Wishlist icon | Cart/Inquiry icon | "WhatsApp Us" button
Optional:       Search icon (if search is implemented)
```

### First Build Scope
This website is a **premium catalog + WhatsApp sales platform**. The first build has no checkout, no payment gateway, no backend database, no user accounts, and no admin panel. Wishlist and Cart/Inquiry are frontend-only helpers that let customers collect items before messaging on WhatsApp.

---

## 14. Recommended Build Phases

### Phase 1 (Current) — Brand Direction ✓
- Brand positioning document
- Visual design system
- Typography, color, spacing, component rules
- Website structure plan

### Phase 2 — Project Setup
- Initialize Next.js project with TypeScript and Tailwind CSS
- Install Framer Motion, Lucide React, and clsx
- Configure Tailwind with custom design tokens (colors, spacing, typography)
- Set up base layout (fonts, metadata, global styles)
- Create base components: Button, Card shell, Section wrapper

### Phase 3 — Core Layout
- Navbar (sticky, translucent, mobile menu)
- Footer (links, contact info, WhatsApp)
- Page layout wrapper
- Responsive grid system setup

### Phase 4 — Homepage
- Hero section
- Category grid section
- Featured products section
- Why Afan Mac Store (trust signals)
- WhatsApp CTA section
- Basic scroll animations

### Phase 5 — Product Catalog
- Category pages with product grid
- Product card component (polished, with hover)
- Filter/sort bar (basic)
- Product detail view (modal or page)

### Phase 6 — Supporting Pages
- Deals page
- About page
- Contact page with WhatsApp integration

### Phase 7 — Polish & Performance
- Image optimization (WebP, lazy loading)
- SEO metadata per page
- Performance audit
- Cross-browser testing
- Mobile experience final review
- Animation refinement and `prefers-reduced-motion` pass

### Phase 8 — Deals & Features Strip
- Running deal banner (dismissible)
- Highlighted deals section
- Stock availability indicators

---

## 15. Non-Negotiable Design Rules

These rules cannot be overridden at any phase. If any design decision conflicts with one of these, the decision must be revised.

1. **Apple-inspired, not Apple copy** — The site draws from Apple's design language but is its own distinct brand with its own identity
2. **No Apple logo** — Never use the Apple logo, Apple wordmark, or any Apple trademark anywhere on the site
3. **No fake Apple branding** — Do not imply official Apple authorization, use Apple's exact marketing slogans, or replicate Apple.com layouts
4. **No generic ecommerce template feel** — Every section must feel intentional and custom; if it looks like a theme, redesign it
5. **No loud gradients** — Gradients are banned as section backgrounds and primary card treatments; white, off-white, and near-black surfaces only
6. **No cheap shadows** — Shadows must be extremely subtle; borders and white surfaces carry the structural work, not dramatic drop shadows
7. **No overloaded sections** — Each section serves one purpose; do not combine two ideas into one section
8. **No random stock images** — All imagery must be official product renders, approved photography, CSS mockups, or consistent SVG placeholders
9. **No inconsistent typography** — All text uses defined tokens from the type scale; no arbitrary sizes, no mixing of typefaces
10. **No scope jumps without approval** — No checkout, payment gateway, user accounts, admin panel, or backend database in the first build; any addition to scope requires explicit user approval before work begins

---

*Document version: 1.1 · Revised: Phase 1 · Status: Awaiting Approval*
