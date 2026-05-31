# Afan Mac Store — Build Phases
**Phase 1 Document · Master plan for all development work**

---

## Overview

| Phase | Name                        | Status      |
|------|-----------------------------|-------------|
| 1    | Brand Direction + Design System | ✅ Complete |
| 2    | Project Setup               | Pending     |
| 3    | Header / Navigation         | Pending     |
| 4    | Hero Section                | Pending     |
| 5    | Category Cards              | Pending     |
| 6    | Featured Products           | Pending     |
| 7    | Product Listing Pages       | Pending     |
| 8    | Product Detail Page         | Pending     |
| 9    | Reviews / Trust / Location / Footer | Pending |
| 10   | Mobile QA + Final Polish    | Pending     |

---

## Permanent Out-of-Scope (All Phases)

The following are **never** part of this build without explicit written approval from the user. Any phase that starts moving toward these areas must stop and request a scope review.

| Out of scope                   | Reason                                                          |
|-------------------------------|------------------------------------------------------------------|
| Checkout / cart flow           | Sales happen via WhatsApp — no ecommerce checkout needed         |
| Payment gateway integration    | No Stripe, JazzCash, EasyPaisa, or any payment processing        |
| Backend database               | Product data is static files — no database, no CMS, no API       |
| User accounts / login          | No authentication, no sessions, no profiles                      |
| Admin panel / CMS              | No dashboard, no content management system                       |
| Wishlist (backend-persisted)   | Frontend-only inquiry helper is acceptable; no server state       |
| Inventory management           | Stock status is manually set in static data files                 |
| Order tracking system          | Orders are handled entirely via WhatsApp conversation            |
| Multi-vendor / marketplace     | This is a single-seller catalog, not a marketplace               |

Any scope change beyond this table requires user approval before a single line of new code is written.

---

## Phase 1 — Brand Direction + Design System

### Goal
Establish the complete visual identity, design language, and build roadmap before a single line of code is written. This ensures every developer decision is guided by a documented standard, not guesswork.

### Scope
Written documentation only. No code, no project files, no components.

### What to Build
- `BRAND_DIRECTION.md` — Brand positioning, personality, visual principles, and design anti-patterns
- `DESIGN_SYSTEM.md` — Full design token reference: typography, color, spacing, shadows, borders, cards, buttons, navbar, images, animations, responsive rules, accessibility
- `BUILD_PHASES.md` — This document. Phased build plan with goals, scope, and checklists

### What NOT to Touch
- No Next.js project setup
- No `package.json` or dependencies
- No Tailwind configuration
- No React components
- No page files
- No assets or images

### Completion Checklist
- [x] Brand positioning and personality defined
- [x] Visual design principles established (6 principles)
- [x] Typography scale documented (all tokens, weights, sizes)
- [x] Font stack defined
- [x] Full color palette with hex codes (background, surface, text, border, accent, status, dark)
- [x] Spacing scale documented (8px grid, all tokens)
- [x] Container and breakpoint rules defined
- [x] Border radius tokens defined
- [x] Shadow tokens defined
- [x] Button styles (primary, secondary, ghost, WhatsApp, dark, disabled)
- [x] Card styles (product, feature, dark, category tile)
- [x] Header/navbar rules documented
- [x] Dropdown style rules documented
- [x] Product image and mockup rules documented
- [x] Animation and motion rules documented (allowed, forbidden, timing tokens)
- [x] Mobile responsive rules documented
- [x] Accessibility basics documented
- [x] Design anti-patterns documented
- [x] Per-section design checklist created
- [x] Recommended website structure defined
- [x] Build phases plan created
- [x] Non-negotiable design rules documented
- [x] Permanent out-of-scope items defined (no checkout, payment, backend, accounts, admin)
- [ ] **User approval received — required before Phase 2 begins**

---

## Phase 2 — Project Setup

### Goal
Initialize a production-ready Next.js project with all dependencies, design tokens, and base configuration in place. After this phase, the project is ready for component and section development.

### Scope
Project scaffolding and configuration only. No visible UI except the default blank page.

### What to Build

**Project initialization**
- Initialize Next.js project with TypeScript and App Router
- Install Tailwind CSS and configure `tailwind.config.ts`
- Install Framer Motion (for animations)
- Install Lucide React (for icons)
- Install `clsx` and `tailwind-merge` (for conditional class handling)
- Create `cn()` utility helper in `lib/utils.ts`

**Design token configuration**
- Extend Tailwind theme with all color tokens from `DESIGN_SYSTEM.md`
- Extend Tailwind theme with custom spacing scale
- Extend Tailwind theme with border radius tokens
- Extend Tailwind theme with box shadow tokens
- Extend Tailwind theme with font family and type scale
- Configure `@layer base` in global CSS with font stack and base text styles

**Project structure**
```
app/
  layout.tsx         — Root layout (metadata, font, global wrapper)
  globals.css        — Base styles, Tailwind imports, CSS custom properties
  page.tsx           — Blank root page (placeholder)
components/          — Empty (ready for Phase 3)
sections/            — Empty (ready for Phase 4+)
data/                — Empty (ready for product data)
lib/
  utils.ts           — cn() helper
assets/              — Empty (ready for images)
```

**Base layout**
- Configure `app/layout.tsx` with correct metadata (title, description, Open Graph)
- Set default `<html lang="en">` and `<body>` background `#F5F5F7`
- Apply font stack via CSS custom property or Tailwind config

**Quality checks**
- TypeScript strict mode enabled
- ESLint configured
- Dev server starts without errors on `npm run dev`

### What NOT to Touch
- No Navbar component yet
- No Hero section yet
- No product data yet
- No pages other than the blank root `page.tsx`
- No images or assets yet

### Completion Checklist
- [ ] `next.config.ts` created and configured
- [ ] `tailwind.config.ts` extended with all design tokens
- [ ] `globals.css` with Tailwind base, components, utilities layers
- [ ] All color tokens in Tailwind config match `DESIGN_SYSTEM.md` exactly
- [ ] `lib/utils.ts` with `cn()` helper
- [ ] `app/layout.tsx` with correct metadata and font stack
- [ ] Dev server runs at `http://localhost:3000` without errors
- [ ] TypeScript compiles without errors
- [ ] Background is `#F5F5F7` (not white) on the blank page
- [ ] No unused dependencies installed

---

## Phase 3 — Header / Navigation

### Goal
Build a polished, fully responsive, accessible sticky navbar that works correctly at all breakpoints and feels premium from day one.

### Scope
Navbar component and mobile menu only. No page content changes.

### What to Build

**Navbar component (`components/Navbar.tsx`)**
- Logo: wordmark "Afan Mac Store" (text, not image)
- Desktop nav links: Home · Products · Reviews · Location · Contact
- Right utilities (required): Wishlist icon · Cart/Inquiry icon · "WhatsApp Us" button (pill outline, `#25D366`)
- Right utilities (optional): Search icon — only if search is implemented
- Sticky positioning with correct z-index
- Scroll behavior: transparent → blurred white after 60px scroll
- Light hero: navbar text starts dark (`#1D1D1F`), no color override needed
- Dark hero: navbar text starts white (`#F5F5F7`), transitions to dark after 60px scroll
- Smooth color/background transition on scroll (0.3s ease)

**Products dropdown (desktop)**
- Triggered by the **Products** nav link only — no separate dropdowns for any other link
- Fade in + translateY(6px → 0) animation, 0.2s ease-out
- Correct shadow (`shadow-lg`), border (`1px solid #E8E8ED`), and border-radius (12px) from design system
- Close on mouse leave with 100ms delay (prevents flicker)
- No image-heavy mega menu — category text links only:
  All Products · MacBook · iPhone · iPad · Mac mini · iMac · Apple Watch · AirPods · Accessories

**Mobile menu**
- Hamburger icon button (top-right on mobile)
- Full-screen overlay with all nav links, large tap targets
- WhatsApp CTA button inside mobile menu
- Open/close animation: slide down or fade, 0.3s ease-in-out
- Accessible: `aria-expanded`, focus trap, Escape key closes

**Accessibility**
- `<nav aria-label="Main navigation">`
- `aria-expanded` and `aria-controls` on mobile menu toggle
- All links reachable by keyboard
- Visible focus ring on all interactive elements
- Mobile menu traps focus while open

### What NOT to Touch
- No Hero section yet
- No page body content
- No product data
- No other components

### Completion Checklist
- [ ] Navbar renders correctly at 375px, 768px, 1280px, 1440px
- [ ] All 5 nav links present and clickable (Home, Products, Reviews, Location, Contact)
- [ ] Logo displayed correctly
- [ ] Sticky behavior works correctly
- [ ] Transparent at top of page, blurred white after 60px scroll
- [ ] Blur background is `rgba(255,255,255,0.85)` with `backdrop-filter: blur(20px) saturate(180%)`
- [ ] Bottom border appears on scroll (1px solid rgba(0,0,0,0.08))
- [ ] Products dropdown appears on hover (Products link only — no other dropdowns)
- [ ] Products dropdown contains all 9 category links (All Products through Accessories)
- [ ] Products dropdown closes correctly on mouse leave
- [ ] Wishlist icon, Cart/Inquiry icon, and WhatsApp button render in right utilities
- [ ] Mobile hamburger icon visible on screens < 768px
- [ ] Mobile menu opens and closes with animation
- [ ] Mobile menu has WhatsApp CTA button
- [ ] Escape key closes mobile menu
- [ ] Focus is trapped inside mobile menu when open
- [ ] All interactive elements have visible focus ring
- [ ] Correct aria attributes on menu toggle
- [ ] No horizontal overflow caused by navbar

---

## Phase 4 — Hero Section

### Goal
Build a cinematic, premium hero section that immediately communicates that Afan Mac Store is a high-end, trustworthy Apple reseller. This is the most important visual impression on the site.

### Scope
Hero section only. Homepage `page.tsx` is updated to include the Hero below the Navbar.

### What to Build

**Hero section (`sections/Hero.tsx`)**
- Full-width, either dark (black) or white/light background — confirm with user
- Large display headline (clamp from 52px mobile to 96px desktop)
- Subheadline / supporting copy (body-lg token, muted color)
- Two CTAs: Primary button + WhatsApp button side-by-side
- Hero product image — centered, large, Apple product render
- Smooth page-load entrance: hero image fades in (0.8s ease-out), text stagger-reveals after image
- Responsive: stacked on mobile (text above, image below), side-by-side or centered on desktop

**Hero content (placeholder — to be finalized)**
- Headline: e.g. "The Best of Apple. In Pakistan."
- Subheadline: e.g. "Genuine products. Expert guidance. Fast delivery."
- Primary CTA: "Shop MacBooks" or "Browse All Products"
- WhatsApp CTA: "Chat on WhatsApp"
- Featured product: MacBook Pro or iPhone image

**Animation**
- Hero image: `opacity: 0 → 1`, duration 0.8s, ease-out, page load
- Headline: `opacity: 0, y: 20px → opacity: 1, y: 0`, 0.6s, ease-out, 0.2s delay
- Sub-copy: same as headline, 0.1s additional delay
- CTA buttons: same reveal, further delay
- All entrance animations use `prefers-reduced-motion` fallback

### What NOT to Touch
- No category section yet
- No product cards yet
- No footer yet
- No other sections

### Completion Checklist
- [ ] Hero renders correctly at 375px, 768px, 1280px, 1440px
- [ ] Headline uses display font size (clamp from 52px to 96px)
- [ ] Sub-copy is legible and correctly sized
- [ ] Both CTA buttons render correctly (primary + WhatsApp)
- [ ] Product image is centered, correct aspect ratio, not cropped
- [ ] Hero entrance animation works on page load (image, then text)
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Hero background is the intended color (dark or light — confirm)
- [ ] Mobile layout is stacked correctly (no overflow, correct order)
- [ ] Navbar sits correctly above the hero (z-index, overlap if dark hero)
- [ ] No layout shift (CLS) during image load
- [ ] Hero image has correct `alt` text
- [ ] Hero image uses `loading="eager"` (above the fold)

---

## Phase 5 — Category Cards

### Goal
Build a clean, responsive category grid that lets users navigate to any product category instantly. This section must feel organized, premium, and easy to scan.

### Scope
Category grid section only. Below the hero on the homepage.

### What to Build

**Category section (`sections/Categories.tsx`)**
- Section overline label: e.g. "Shop by Category"
- Section headline: e.g. "Find your next Apple device."
- Category grid: 8 tiles — MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories
- Deals is NOT part of the first-build category grid
- Each tile: product image (render/icon) + category name label
- Grid layout: exactly 2 columns on mobile, 2 columns on tablet, 4 columns on desktop
- All tiles must be equal height — use CSS Grid `align-items: stretch`
- Hover: `translateY(-2px)` + shadow-sm → shadow-md only, 0.3s ease-out
- Scroll-triggered staggered entrance (each tile fades in with 80ms delay)

**Category data (`data/categories.ts`)**
- Array of category objects: `{ name, slug, image, description }`
- 8 categories: MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories
- No Deals category in this file for the first build
- Slugs map to `/products/[category]` routes (Phase 7)
- Image paths pointing to placeholder assets (or actual renders if available)

**Placeholder images**
- Use `#F5F5F7` background + centered Lucide category icon in `#AEAEB2` — consistent treatment across all tiles

### What NOT to Touch
- No product listing pages yet
- No routing beyond the homepage
- No product cards (product grid) yet

### Completion Checklist
- [ ] Section overline and headline display correctly
- [ ] All 8 category tiles render (MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories)
- [ ] No Deals tile present in the first-build grid
- [ ] Grid layout: 2 col mobile, 2 col tablet, exactly 4 col desktop
- [ ] All tiles are equal height within the grid
- [ ] Category images are consistent aspect ratio (1:1 preferred)
- [ ] Category names are legible and styled correctly
- [ ] Hover effect works (translateY + shadow)
- [ ] Staggered scroll entrance animation works
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Category tiles link to correct slug (can be dead links at this stage)
- [ ] No layout overflow or broken grid at any breakpoint
- [ ] Images load without distortion or cropping

---

## Phase 6 — Featured Products

### Goal
Build the main product card grid on the homepage — the section that drives the most commercial intent. Cards must feel premium, consistent, and WhatsApp-purchase-ready.

### Scope
Featured products section on the homepage. This includes the product card component, which will be reused in Phase 7.

### What to Build

**Product card component (`components/ProductCard.tsx`)**
- All elements per card style rules in `DESIGN_SYSTEM.md`
- Image container (4:3 aspect, `#F9F9F9` bg, `contain` fit)
- Category overline, product name, spec line, price, CTA button
- Hover: `translateY(-2px)` + shadow-md (`0 2px 10px rgba(0,0,0,0.07)`), 0.3s ease-out — no heavy shadows, never shadow-lg
- WhatsApp button as CTA (primary action is WhatsApp inquiry)
- "In Stock" / "Low Stock" / "Out of Stock" badge support

**Featured products section (`sections/FeaturedProducts.tsx`)**
- Section overline + headline
- 4–6 product cards in a responsive grid (1 col mobile, 2 col tablet, 3–4 col desktop)
- Staggered scroll entrance animation
- Optional "View all products" link at bottom

**Product data (`data/products.ts`)**
- Array of product objects:
  ```
  { id, name, category, slug, image, specs, price, priceFormatted, inStock, stockLevel }
  ```
- 6 sample products (2 MacBooks, 1–2 iPhones, 1 iPad, 1 AirPods or Watch)
- Prices in PKR with correct formatting

**Accessories starter catalog (add to `data/products.ts` when Accessories entries are created)**
The following is the approved first-build accessories list. Do not add accessories beyond this list without approval.
```
- 20W USB-C iPhone Adapter
- 30W USB-C iPhone Adapter
- 45W USB-C MacBook Adapter
- 67W USB-C MacBook Adapter
- 96W USB-C MacBook Adapter
- Braided USB-C to USB-C Cable
- Braided USB-C to Lightning Cable
- MagSafe Charger
- MacBook Sleeve
- Hard Shell MacBook Case
- Foldable Laptop Stand
```
Rules for accessories entries:
- Follow the same product card rules as all other products (same schema, same card component)
- No external image URLs — use approved product renders or consistent CSS/SVG placeholders
- Placeholder standard: `#F5F5F7` container + centered Lucide icon in `#AEAEB2`

### What NOT to Touch
- No product listing/category pages yet (Phase 7)
- No product detail page yet (Phase 8)
- No reviews section yet

### Completion Checklist
- [ ] ProductCard component renders correctly at all breakpoints
- [ ] All card elements present: image, overline, name, specs, price, CTA
- [ ] Card hover animation works (translateY + shadow transition)
- [ ] Image uses `object-fit: contain` and correct aspect ratio
- [ ] Price displays in PKR format (e.g. PKR 3,49,000)
- [ ] WhatsApp CTA button functions (links to WhatsApp with product name in message)
- [ ] Stock badge renders in correct color (green/orange/red)
- [ ] Cards in grid are equal height (price + CTA pinned to bottom)
- [ ] Section staggered entrance animation works
- [ ] Animation respects `prefers-reduced-motion`
- [ ] Grid is 1 col mobile, 2 col tablet, 3–4 col desktop
- [ ] "View all" link renders correctly
- [ ] All product data is in `data/products.ts` — no hardcoded data in components

---

## Phase 7 — Product Listing Pages

### Goal
Build individual category pages where users can browse all products in a category. Each page shows the full product grid for that category, with basic filtering.

### Scope
Category-level listing pages under `/products/[category]`. One page template used for all 8 categories.

### What to Build

**Category page template (`app/products/[category]/page.tsx`)**
- Dynamic route handling for all 8 category slugs under `/products/`
- Category hero: name + short description + product count
- Product grid: all products in that category using `ProductCard` (from Phase 6)
- Basic filter bar: sort by price (low to high / high to low), filter by in-stock
- "Chat on WhatsApp to order" sticky or inline CTA
- SEO metadata per category page

**Category page data**
- Filter `data/products.ts` by category slug
- Pass filtered products to the page grid

**Filter bar (`components/FilterBar.tsx`)**
- Sort dropdown: "Price: Low to High" | "Price: High to Low" | "Featured"
- In Stock toggle (checkbox or pill toggle)
- Client-side filtering only — no server-side filtering needed at this phase
- Filter bar is sticky below the navbar on desktop

**Empty state**
- If no products match filters: clean empty state message + "Clear filters" button

### What NOT to Touch
- No product detail page yet (Phase 8)
- No reviews or location section yet
- No homepage changes

### Completion Checklist
- [ ] Dynamic route `/products/[category]` works for all 8 category slugs
- [ ] Category hero renders with name and description
- [ ] Product grid uses `ProductCard` component from Phase 6
- [ ] Products correctly filtered by category from `data/products.ts`
- [ ] Filter bar renders: sort dropdown + in-stock toggle
- [ ] Sort by price (ascending and descending) works correctly
- [ ] In-stock filter works correctly
- [ ] Empty state renders when no products match
- [ ] "Clear filters" button resets to default
- [ ] SEO metadata (title, description) correct for each category
- [ ] Page renders correctly at all breakpoints
- [ ] No horizontal overflow
- [ ] WhatsApp CTA is present on the page

---

## Phase 8 — Product Detail Page

### Goal
Build a dedicated product page where users can see full product details, specs, and a prominent WhatsApp CTA to buy. This is the highest-intent page on the site.

### Scope
Product detail page template only.

### What to Build

**Product detail page (`app/products/[category]/[product]/page.tsx`)**
- Dynamic route for individual products under `/products/[category]/[product]`
- Left column: product image gallery (or single image for Phase 1)
- Right column: category label, product name, price, key specs list, stock badge, WhatsApp CTA, secondary info CTA
- Below fold: Full technical specifications table
- Below specs: "You may also like" — related products (same category, 3–4 cards)
- SEO metadata: product-specific title, description, OG image

**Image gallery (`components/ProductGallery.tsx`)**
- Main large image + optional thumbnail row (if multiple images available)
- For Phase 1: single image is acceptable if only one render is available
- Image: white/neutral background, `contain` fit, high quality

**Specifications table**
- Clean two-column table: spec name | spec value
- Subtle border between rows (`#E8E8ED`)
- Alternating row background: white / `#F9F9F9`
- Full spec data from product data file

**WhatsApp CTA treatment**
- Prominent WhatsApp button with product name pre-filled in message:
  `"Hi! I'm interested in [Product Name]. Can you share availability and price?"`
- Sticky CTA on mobile (fixed bottom bar with product name + WhatsApp button)

**Related products**
- 3–4 cards from same category, excluding current product
- Uses existing `ProductCard` component

### What NOT to Touch
- No reviews section yet (Phase 9)
- No location/footer yet (Phase 9)
- No checkout flow (WhatsApp is the purchase channel)

### Completion Checklist
- [ ] Dynamic route `/products/[category]/[product]` works for all products
- [ ] Product image renders correctly (full size, correct aspect ratio)
- [ ] Product name, category, price display correctly
- [ ] Key specs render clearly in right column
- [ ] Stock badge renders correctly
- [ ] WhatsApp button links to correct WhatsApp URL with pre-filled message
- [ ] Mobile sticky CTA bar renders correctly at bottom of screen
- [ ] Full specifications table renders below fold
- [ ] Related products grid renders (3–4 cards, correct category)
- [ ] SEO metadata is product-specific
- [ ] Page renders correctly at all breakpoints
- [ ] No layout overflow at any breakpoint
- [ ] Product data pulled from `data/products.ts` — no hardcoded data

---

## Phase 9 — Reviews / Trust / Location / Footer

### Goal
Complete the homepage and site with trust-building sections and a full site footer. These sections convert skeptical users into buyers by addressing concerns about authenticity, service, and location.

### Scope
Homepage trust sections + global footer. No new pages.

### What to Build

**Trust signals section (`sections/TrustSignals.tsx`)**
- 4 feature cards with icons:
  1. "Verified Product Details" — Clear condition, specs, and model info before you buy
  2. "WhatsApp Guidance" — Expert help and answers before purchase, via WhatsApp
  3. "Delivery Across Pakistan" — Delivery support available where applicable
  4. "Warranty & Support Info" — Warranty and support details shared clearly for each product
- Do not use claims like "100% genuine", "authorized supplier", or "official manufacturer warranty" without explicit approval
- Clean 2×2 (mobile) or 4-column (desktop) card layout
- Icon: 40px Lucide React icon in accent blue
- Clean feature card style from design system

**Customer reviews section (`sections/Reviews.tsx`)**
- 3–4 customer testimonials in card layout
- Each card: quote text, customer name, city, star rating (5 stars)
- Clean quote card style (white, subtle shadow, border)
- Data from `data/reviews.ts`
- Optional: source label (e.g. "via WhatsApp" or "Google Review")

**WhatsApp CTA section (`sections/WhatsAppCTA.tsx`)**
- Full-width dark or accent section
- Headline: e.g. "Ready to order? Chat with us on WhatsApp."
- Supporting line: response time / hours / friendly tone
- Large WhatsApp button (centered)
- Phone number displayed below the button
- Simple, clean — no distractions

**Location / About strip (`sections/LocationStrip.tsx`)**
- Optional: brief "About Afan Mac Store" — 2–3 lines
- City / location served: e.g. "Serving customers across Pakistan"
- Clean, minimal — not a full about page

**Footer (`components/Footer.tsx`)**
- Logo (wordmark) + short brand tagline
- Three-column link sections: Shop (product categories) | Company (About, Contact) | Connect (WhatsApp, social links)
- Bottom bar: copyright line + "Pakistan's home for genuine Apple"
- Background: `#1D1D1F` (near-black) or `#F5F5F7` (light) — confirm with user
- Links styled appropriately for footer background

### What NOT to Touch
- No new pages beyond what exists
- No product catalog changes
- No new component types beyond those listed

### Completion Checklist
- [ ] Trust signals section renders with all 4 items
- [ ] Icons render correctly (Lucide React, accent blue)
- [ ] Trust section grid is 2 col mobile / 4 col desktop
- [ ] Reviews section renders with 3–4 cards
- [ ] Review cards show quote, name, city, stars
- [ ] WhatsApp CTA section renders correctly
- [ ] WhatsApp button links to correct WhatsApp URL
- [ ] Phone number displayed correctly in WhatsApp CTA
- [ ] Location/about strip renders (if included)
- [ ] Footer renders with all three column sections
- [ ] Footer links are correct and point to correct routes
- [ ] Copyright and tagline in footer bottom bar
- [ ] Footer background and text colors are correct and accessible
- [ ] All sections render correctly at all breakpoints
- [ ] No layout overflow in any section

---

## Phase 10 — Mobile QA + Final Polish

### Goal
Ensure the site is production-quality across all devices, browsers, and user contexts. Fix all visual inconsistencies, optimize performance, and confirm the site feels premium on real hardware.

### Scope
No new features. Pure QA, refinement, and performance optimization.

### What to Audit & Fix

**Mobile QA (test on real devices or accurate emulation)**
- iPhone 14 / 15 (390px) — check every section, every interaction
- iPad (768px) — check grid layouts, typography scaling
- Android mid-range (360px) — check spacing, font rendering
- Confirm no horizontal scroll at any breakpoint
- Confirm all tap targets are ≥ 44px
- Confirm mobile menu works correctly
- Confirm sticky mobile CTA on product detail page works

**Cross-browser testing**
- Safari (macOS + iOS) — check backdrop-filter, animations
- Chrome (macOS + Windows)
- Firefox
- Edge
- Safari on iOS is most critical — Apple reseller site will be viewed on iPhones

**Visual consistency pass**
- Typography: confirm all text sizes match design system
- Spacing: confirm section paddings are consistent
- Colors: confirm no unintended off-palette colors
- Cards: confirm all cards are equal height within grids
- Shadows: confirm no shadow is too heavy
- Borders: confirm all borders use correct color tokens
- Buttons: confirm all buttons are pill-shaped, correct colors

**Animation refinement**
- Confirm all scroll animations work correctly
- Confirm stagger delays feel natural (not too fast, not too slow)
- Confirm hover transitions are smooth (no jank)
- Confirm `prefers-reduced-motion` is respected across all animations
- Reduce or remove any animation that feels cheap or distracting

**Performance optimization**
- Convert all images to WebP format
- Add `width` and `height` attributes to all images (prevents CLS)
- Confirm hero image uses `loading="eager"`, all others `loading="lazy"`
- Run Lighthouse audit — target: Performance ≥ 85, Accessibility ≥ 95
- Confirm no render-blocking resources
- Confirm Tailwind CSS is purged (no unused classes in production bundle)
- Confirm Framer Motion is tree-shaken (no unused features included)

**SEO**
- Confirm `<title>` tags are unique and descriptive per page
- Confirm `<meta name="description">` on all pages
- Confirm Open Graph tags for social sharing
- Confirm `<html lang="en">` on root layout
- Confirm all images have `alt` text
- Confirm heading hierarchy (`h1` → `h2` → `h3`) on all pages

**Accessibility final check**
- Run axe or Lighthouse accessibility audit
- Fix all critical and serious issues
- Confirm all interactive elements have focus rings
- Confirm mobile menu focus trap works
- Confirm color contrast passes AA on all text
- Confirm skip-to-content link exists (optional but recommended)

**WhatsApp integration check**
- Confirm all WhatsApp links open correctly on mobile
- Confirm pre-filled messages are correct per product
- Confirm WhatsApp number is correct on all CTAs

### Completion Checklist
- [ ] iPhone 14/15 tested — all sections pass
- [ ] iPad tested — all grids and layouts pass
- [ ] No horizontal scroll at any breakpoint
- [ ] All tap targets ≥ 44px on mobile
- [ ] Safari (iOS) — backdrop-filter and animations work
- [ ] Chrome and Firefox — no visual regressions
- [ ] All typography matches design system tokens
- [ ] All section spacings are consistent
- [ ] All cards are equal height within grids
- [ ] All buttons are pill-shaped and correct colors
- [ ] All scroll animations work and feel natural
- [ ] `prefers-reduced-motion` respected everywhere
- [ ] All images converted to WebP
- [ ] Lighthouse Performance ≥ 85
- [ ] Lighthouse Accessibility ≥ 95
- [ ] All pages have unique title and meta description
- [ ] All images have alt text
- [ ] All WhatsApp links open correctly on mobile
- [ ] Pre-filled WhatsApp messages are correct
- [ ] Site feels premium — no cheap or template-like sections
- [ ] User has reviewed and approved the final site

---

*Document version: 1.2 · Revised: Phase 1 · Status: Approved*
