# PHASE_11A_FULL_SITE_QA_REPORT.md
**Phase 11A — Full Site QA / Pre-Deploy Audit · Report**

---

## 1. Files Inspected

| File | Purpose |
|---|---|
| `PROJECT_LOCKED_RULES.md` | Brand rules, design system, locked decisions |
| `PHASE_7C_NAVIGATION_QA_REPORT.md` | Navigation + product routes QA baseline |
| `PHASE_8B_REVIEWS_REPORT.md` | Reviews section completion record |
| `PHASE_9B_LOCATION_CONTACT_REPORT.md` | Location + Contact sections completion record |
| `PHASE_10B_FOOTER_REPORT.md` | Footer completion record |
| `app/layout.tsx` | Global layout — Navbar + Footer rendering |
| `app/page.tsx` | Homepage section composition order |
| `app/products/page.tsx` | All Products page — h1, grid, CTA |
| `app/products/[category]/page.tsx` | Category pages — routing, 404 guard, CTA |
| `components/Navbar.tsx` | Nav links, dropdown, mobile menu, WhatsApp CTA |
| `components/Footer.tsx` | Footer columns, links, hours, bottom bar |
| `components/ProductCard.tsx` | Card structure, CTA, forbidden content |
| `sections/Hero.tsx` | Slider structure, CTAs, trust stats, dots |
| `sections/Categories.tsx` | Category strip, arrow buttons, icons |
| `sections/FeaturedProducts.tsx` | Marquee, cards, WhatsApp CTA |
| `sections/Reviews.tsx` | Review grid, stats row, animation |
| `sections/Location.tsx` | Location cards, hours, CTAs |
| `sections/Contact.tsx` | CTA band, secondary info row |
| `data/products.ts` | Product data — counts, fields, forbidden content |
| `data/featured-products.ts` | Featured product data |
| `data/categories.ts` | Category slugs |
| `data/locations.ts` | Address, hours, WhatsApp messages |
| `lib/constants.ts` | WhatsApp number, `whatsappLink()` function |
| `lib/product-utils.ts` | `getProductsByCategory`, `getCategoryMeta` |

---

## 2. Routes Tested

| Route | Method | Result |
|---|---|---|
| `/` | Static render (build output) | ✅ 200 — renders |
| `/products` | Static render | ✅ 200 — renders |
| `/products/macbook` | SSG | ✅ 200 — renders |
| `/products/iphone` | SSG | ✅ 200 — renders |
| `/products/ipad` | SSG | ✅ 200 — renders |
| `/products/mac-mini` | SSG | ✅ 200 — renders |
| `/products/imac` | SSG | ✅ 200 — renders |
| `/products/apple-watch` | SSG | ✅ 200 — renders |
| `/products/airpods` | SSG | ✅ 200 — renders |
| `/products/accessories` | SSG | ✅ 200 — renders |
| `/products/unknown` | `dynamicParams = false` | ✅ 404 — `/_not-found` |
| `/_not-found` | Static render | ✅ 200 — renders |

**Total: 11 valid routes ✅ · 1 correct 404 ✅ · 0 blank pages ✅**

Build confirmed all 13 pages generated:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /products
└ ● /products/[category]   (8 SSG paths)
```

---

## 3. Navbar QA Results

### Desktop nav links

| Link | `href` | Result |
|---|---|---|
| Home | `/` | ✅ |
| Products | `/products` + dropdown trigger | ✅ |
| Reviews | `/#reviews` | ✅ — navigates home then scrolls |
| Location | `/#location` | ✅ — navigates home then scrolls |
| Contact | `/#contact` | ✅ — navigates home then scrolls |

All 5 links confirmed in `NAV_LINKS` array in `components/Navbar.tsx` lines 13–19.

### Desktop Products dropdown

| Link label | `href` | Status |
|---|---|---|
| All Products | `/products` | ✅ |
| MacBook | `/products/macbook` | ✅ |
| iPhone | `/products/iphone` | ✅ |
| iPad | `/products/ipad` | ✅ |
| Mac mini | `/products/mac-mini` | ✅ |
| iMac | `/products/imac` | ✅ |
| Apple Watch | `/products/apple-watch` | ✅ |
| AirPods | `/products/airpods` | ✅ |
| Accessories | `/products/accessories` | ✅ |

**9 / 9 dropdown links correct.**

Dropdown behavior:
- Opens on `onMouseEnter` — ✅
- 100ms close delay (`scheduleClose` with `setTimeout(..., 100)`) — ✅
- Closes on `Escape` keydown — ✅
- `aria-expanded`, `aria-haspopup="true"`, `aria-controls="products-dropdown"` on trigger — ✅
- `role="menu"` on dropdown, `role="menuitem"` on links — ✅
- ChevronDown rotates 180° when open — ✅

### Right utility area (desktop)

| Element | Implementation | Status |
|---|---|---|
| Buy on WhatsApp | Outline pill `#25D366`, `whatsappLink()`, `target="_blank"` | ✅ |
| Wishlist | `<button aria-label="Wishlist">`, `Heart` icon, `aria-hidden="true"` | ✅ |
| Cart / Inquiry | `<button aria-label="Inquiry cart">`, `ShoppingBag` icon, `aria-hidden="true"` | ✅ |

Order: Buy on WhatsApp → Wishlist → Cart/Inquiry — **matches locked spec** ✅

Neither Wishlist nor Cart/Inquiry cause crashes — they are non-functional `<button>` placeholders (no state, no side effects). Layout is not broken.

### Mobile menu

| Check | Result |
|---|---|
| Full-screen overlay `fixed inset-0 z-[1001]` | ✅ |
| Hamburger `aria-expanded` + `aria-controls="mobile-menu"` | ✅ |
| Escape closes menu | ✅ |
| Focus trap — custom implementation (no npm package) | ✅ |
| Focus returns to hamburger on close | ✅ |
| Body scroll locked (`document.body.style.overflow = "hidden"`) | ✅ |
| Products expands inline with chevron rotation | ✅ |
| All 9 product links in mobile (`PRODUCT_CATEGORIES` array) | ✅ |
| "Buy on WhatsApp" pinned at bottom (`flex-none border-t` zone) | ✅ |
| Scrollable middle zone (`min-h-0 flex-1 overflow-y-auto`) | ✅ |

---

## 4. Homepage Section Order QA

File: `app/page.tsx`

```tsx
<main>
  <Hero />           // 1
  <Categories />     // 2
  <FeaturedProducts /> // 3
  <Reviews />        // 4
  <Location />       // 5
  <Contact />        // 6
</main>
```

Footer renders in `app/layout.tsx` after `{children}`.

| # | Section | Order | Status |
|---|---|---|---|
| 1 | Hero | First in `<main>` | ✅ |
| 2 | Category Strip | After Hero | ✅ |
| 3 | Featured Products | After Categories | ✅ |
| 4 | Reviews | After FeaturedProducts | ✅ |
| 5 | Location | After Reviews | ✅ |
| 6 | Contact | After Location | ✅ |
| 7 | Footer | Via `app/layout.tsx` after `{children}` | ✅ |

**All 7 elements render in correct order. ✅**

---

## 5. Anchor Link QA

Section IDs confirmed in source:

| Section | File | `id` attribute | Navbar `href` |
|---|---|---|---|
| Reviews | `sections/Reviews.tsx` | `id="reviews"` | `href="/#reviews"` ✅ |
| Location | `sections/Location.tsx` | `id="location"` | `href="/#location"` ✅ |
| Contact | `sections/Contact.tsx` | `id="contact"` | `href="/#contact"` ✅ |

All three use `/#` prefix so they navigate to homepage first, then scroll — works from `/`, `/products`, `/products/macbook`, and all product pages. ✅

---

## 6. Product Listing QA

### Product counts (verified from `data/products.ts`)

| Route | Expected | Actual count | Status |
|---|---|---|---|
| `/products` | 19 | 19 (2+1+1+1+1+1+1+11) | ✅ |
| `/products/macbook` | 2 | 2 (MacBook Pro, MacBook Air) | ✅ |
| `/products/iphone` | 1 | 1 | ✅ |
| `/products/ipad` | 1 | 1 | ✅ |
| `/products/mac-mini` | 1 | 1 | ✅ |
| `/products/imac` | 1 | 1 | ✅ |
| `/products/apple-watch` | 1 | 1 | ✅ |
| `/products/airpods` | 1 | 1 | ✅ |
| `/products/accessories` | 11 | 11 | ✅ |

### Forbidden content check

| Check | Result |
|---|---|
| Price field on `Product` interface | ✅ None — interface has no `price` field |
| Price rendered on any card | ✅ None |
| Fake specs | ✅ None |
| Stock count | ✅ None — "current stock" / "in stock" appear only as WhatsApp inquiry prompts |
| "Buy Now" | ✅ None anywhere |
| "Add to Cart" | ✅ None anywhere |
| "View Details" | ✅ None anywhere |
| Discount badges | ✅ None |
| Checkout / payment | ✅ None |

### Product card structure

Each `ProductCard` is an `<article>` — not wrapped in `<Link>` or `<a>`. ✅
Only interactive element per card: `WhatsAppCTA` (`<a>` with `whatsappLink()`). ✅
No nested links inside any card. ✅

### Page-level h1 verification

| Route | h1 content | Status |
|---|---|---|
| `/products` | "All Products at Afan Mac Store" | ✅ |
| `/products/macbook` | "MacBooks at Afan Mac Store" | ✅ |
| `/products/iphone` | "iPhones at Afan Mac Store" | ✅ |
| `/products/ipad` | "iPads at Afan Mac Store" | ✅ |
| `/products/mac-mini` | "Mac mini at Afan Mac Store" | ✅ |
| `/products/imac` | "iMacs at Afan Mac Store" | ✅ |
| `/products/apple-watch` | "Apple Watch at Afan Mac Store" | ✅ |
| `/products/airpods` | "AirPods at Afan Mac Store" | ✅ |
| `/products/accessories` | "Accessories at Afan Mac Store" | ✅ |

All h1 values provided via `getCategoryMeta()` from `lib/product-utils.ts`. ✅

---

## 7. WhatsApp QA

### Number verification

| Check | Result |
|---|---|
| `WHATSAPP_NUMBER` in `lib/constants.ts` | `"923133388666"` — no `+` sign ✅ |
| `WHATSAPP_DISPLAY` in `lib/constants.ts` | `"+92 313 3388666"` ✅ |
| All links generated via | `whatsappLink()` function ✅ |

### Hardcoded `wa.me` check

Grep result for `wa.me` across all `.ts` and `.tsx` files:

```
Only match: lib/constants.ts line 7
  return `https://wa.me/${WHATSAPP_NUMBER}?text=...`
```

**Zero hardcoded `wa.me` URLs.** All WhatsApp links are constructed dynamically through `whatsappLink()`. ✅

### WhatsApp links across site

| Location | CTA label | Uses `whatsappLink()` | `target="_blank"` | `rel="noopener noreferrer"` |
|---|---|---|---|---|
| Navbar (desktop) | "Buy on WhatsApp" | ✅ | ✅ | ✅ |
| Navbar (mobile) | "Buy on WhatsApp" | ✅ | ✅ | ✅ |
| Hero | "Buy on WhatsApp" | ✅ | ✅ | ✅ |
| `/products` header | "Ask on WhatsApp" | ✅ | ✅ | ✅ |
| `/products/[category]` header | "Ask about [Category] on WhatsApp" | ✅ | ✅ | ✅ |
| `/products/[category]` empty state | "Message us on WhatsApp" | ✅ | ✅ | ✅ |
| `ProductCard` | "Ask on WhatsApp" | ✅ | ✅ | ✅ |
| FeaturedProducts card | "Ask on WhatsApp" | ✅ | ✅ | ✅ |
| Location — Head Office card | "WhatsApp Before Visiting" | ✅ | ✅ | ✅ |
| Location — Sub Office card | "Chat on WhatsApp" | ✅ | ✅ | ✅ |
| Contact section | "Chat on WhatsApp" | ✅ | ✅ | ✅ |
| Footer — Brand column | "Chat on WhatsApp" | ✅ | ✅ | ✅ |
| Footer — Visit column | "WhatsApp us" | ✅ | ✅ | ✅ |

**All 13 WhatsApp CTAs across the site use `whatsappLink()`. Zero exceptions. ✅**

### Pre-filled WhatsApp messages

All messages confirmed present and contextually appropriate:

| Location | Message |
|---|---|
| Navbar | "Hi Afan Mac Store, I want to buy an Apple product. Please guide me." |
| Hero | "Hi Afan Mac Store! I'd like to order an Apple product. Can you help me?" |
| `/products` | "Hi Afan Mac Store, I'd like to browse your products. Please share what's currently available." |
| Category page | "Hi Afan Mac Store, I'm looking for [Category]. Please share current options and availability." |
| Product card | "Hi Afan Mac Store, I'm interested in [Product Name]. Please share current availability and details." |
| Head Office | "Hi Afan Mac Store, I'm planning to visit your Rawalpindi store. Can you share current product availability?" |
| Sub Office | "Hi Afan Mac Store, I'm planning to visit your Lahore office. Can you guide me before I visit?" |
| Contact | "Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?" |
| Footer brand | "Hi Afan Mac Store, I'm interested in Apple products. Can you guide me?" |
| Footer visit | "Hi Afan Mac Store, I'd like to get in touch. Can you help me?" |

---

## 8. Footer QA

Footer renders via `app/layout.tsx` line 29: `<Footer />` after `{children}`. ✅

Appears on all routes — confirmed by layout.tsx placement. ✅

### Column content

| Column | Content | Status |
|---|---|---|
| Brand | Store name, tagline, "Chat on WhatsApp" pill CTA | ✅ |
| Quick Links | Home / Products / Reviews / Location / Contact — `/#` anchor prefix where applicable | ✅ |
| Products | All 8 category links matching Navbar dropdown | ✅ |
| Visit | Head Office + Sub Office addresses, Hours `<dl>`, "Open in Google Maps" link, "WhatsApp us" link | ✅ |

### Hours in Visit column

| Day | Hours | Status |
|---|---|---|
| Mon–Thu | 12 PM – 10 PM | ✅ |
| Friday | 2:30 PM – 10 PM | ✅ |
| Saturday | 12 PM – 10 PM | ✅ |
| Sunday | Closed (muted `#AEAEB2`) | ✅ |

Hours rendered with `gridTemplateColumns: "76px max-content"` and `whiteSpace: "nowrap"` on `<dd>` — no clipping. ✅

### Bottom bar

| Element | Value | Status |
|---|---|---|
| Copyright | `© {currentYear} Afan Mac Store. All rights reserved.` — dynamic year | ✅ |
| Disclaimer | "Afan Mac Store is an independent Apple reseller." | ✅ |
| Year method | `new Date().getFullYear()` — never hardcoded | ✅ |

### Footer forbidden content check

| Item | Status |
|---|---|
| Apple logo | ✅ Not present |
| Google logo | ✅ Not present |
| Social media links | ✅ Not present |
| Phone number | ✅ Not present |
| Email address | ✅ Not present |
| Payment icons | ✅ Not present |
| Fake official Apple branding | ✅ Not present |

---

## 9. Responsive QA

### Layout system audit

All page sections and the footer use the standard width/padding pattern:
- `max-w-[1200px] mx-auto px-4 md:px-8`

No fixed widths wider than viewport are set anywhere in layout code. ✅

### Grid breakpoints

| Component | Mobile | Tablet (≥640px) | Desktop (≥1024px) |
|---|---|---|---|
| Review cards | 1 col | 2 cols | 3 cols |
| Location cards | 1 col | 2 cols | 2 cols |
| Product grid | 1 col | 2 cols | 3 cols |
| Footer columns | 1 col | 2 cols | 4 cols |
| Footer Products sub-grid | 2 cols | 1 col | 1 col |

### Key responsive behaviors

| Check | Status |
|---|---|
| Navbar — hamburger appears on mobile, hidden on desktop (`md:hidden` / `hidden md:flex`) | ✅ |
| Category strip — horizontal scroll with hidden scrollbar on overflow | ✅ |
| FeaturedProducts — marquee (desktop), horizontal scroll strip (mobile) | ✅ |
| Hero — `minHeight: 90vh`, device frames use `clamp()` for sizing | ✅ |
| WhatsApp buttons — full-width on mobile in mobile menu (`w-full`), inline elsewhere | ✅ |
| Footer bottom bar — `flex-wrap: wrap` stacks on narrow viewports | ✅ |
| Text — no fixed `px` on headings; all use `clamp()` or `fontSize: "11px"` minimum | ✅ |
| Contact section — `max-width: 680px` centered column | ✅ |
| No horizontal overflow — all containers respect viewport width | ✅ |

---

## 10. Visual Consistency QA

| Check | Result |
|---|---|
| Background — sections use `#F5F5F7` | ✅ All sections: Hero, Categories, Featured, Reviews, Location, Contact |
| Background — Footer uses `#FFFFFF` (surface color, approved for nav/footer) | ✅ |
| Background — Product pages use `#F5F5F7` | ✅ |
| Card borders — `1px solid #E8E8ED` rest, `#D2D2D7` hover | ✅ All cards |
| Card shadows — `0 1px 4px rgba(0,0,0,0.05)` rest, `0 2px 10px rgba(0,0,0,0.07)` hover | ✅ |
| No dark sections | ✅ — All backgrounds are `#F5F5F7` or `#FFFFFF` |
| No loud gradients | ✅ — Hero device frame gradients are subtle and scoped inside device illustrations |
| No external images | ✅ — All `product.image = null`; Lucide icons used as placeholders |
| No Apple logo | ✅ — Confirmed by source inspection |
| No Google logo | ✅ — "Google Reviews" text only in Reviews section overline |
| Section spacing | ✅ — Each section has `clamp()` vertical padding; no extreme empty gaps except Hero's intentional `minHeight: 90vh` |
| WhatsApp CTA color | ✅ — `#25D366` solid, hover `#1DAE56` — consistent everywhere |
| Blue accent | ✅ — `#0071E3` — used only for links, outline buttons, Maps link |
| Text hierarchy | ✅ — `#1D1D1F` primary, `#6E6E73` secondary, `#AEAEB2` muted/overlines |
| Button shapes | ✅ — All `border-radius: 9999px` (pill) |
| No payment UI | ✅ |

---

## 11. Accessibility QA

### Page structure

| Page | `<h1>` | `<main>` | `aria-labelledby` on `<section>` |
|---|---|---|---|
| `/` | ✅ In Hero (`<motion.h1>` per slide) | ✅ `<main>` wraps all sections | ✅ All sections labeled |
| `/products` | ✅ "All Products at Afan Mac Store" | ✅ | ✅ |
| `/products/[category]` | ✅ Category-specific h1 | ✅ | ✅ |

### Section landmarks

| Section | `id` | `aria-labelledby` | Heading `id` |
|---|---|---|---|
| Hero | `aria-label="Featured products"` (section without static heading) | n/a | h1 ids change per slide |
| Categories | `aria-labelledby="categories-heading"` | ✅ | `id="categories-heading"` ✅ |
| FeaturedProducts | `aria-labelledby="featured-heading"` | ✅ | `id="featured-heading"` ✅ |
| Reviews | `aria-labelledby="reviews-heading"` | ✅ | `id="reviews-heading"` ✅ |
| Location | `aria-labelledby="location-heading"` | ✅ | `id="location-heading"` ✅ |
| Contact | `aria-labelledby="contact-heading"` | ✅ | `id="contact-heading"` ✅ |

### Product cards

| Check | Result |
|---|---|
| `ProductCard` is `<article>`, not wrapped in `<Link>` | ✅ |
| No nested `<a>` or `<Link>` inside `ProductCard` | ✅ |
| WhatsApp CTA has `aria-label={`Ask about ${name} on WhatsApp`}` | ✅ |

### Interactive elements

| Check | Result |
|---|---|
| Focus ring on all CTAs | ✅ `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` everywhere |
| All icons `aria-hidden="true"` + `focusable="false"` | ✅ |
| External links `target="_blank"` + `rel="noopener noreferrer"` | ✅ All 13 WhatsApp links + Maps links |
| Hamburger `aria-expanded` + `aria-controls` | ✅ |
| Mobile menu `role="dialog"` + `aria-modal="true"` | ✅ |
| Desktop dropdown `role="menu"` + `role="menuitem"` | ✅ |
| Hero dots `role="tablist"` / `role="tab"` + `aria-selected` + `aria-label` | ✅ |
| Category strip arrows `aria-label` | ✅ "Scroll categories left/right" |
| Review cards `aria-label="5 out of 5 stars"` on star container | ✅ |
| Business hours as `<dl>/<dt>/<dd>` semantic structure | ✅ Location cards + Footer Visit column |

### Reduced motion

| Component | Implementation |
|---|---|
| Hero | `useReducedMotion()` — disables auto-advance + instant transitions |
| Categories | `<MotionConfig reducedMotion="user">` |
| FeaturedProducts | `useReducedMotion()` — disables marquee entirely |
| Reviews | `<MotionConfig reducedMotion="user">` |

### Tap targets

| Element | Size | Spec | Status |
|---|---|---|---|
| Navbar CTAs (Buy on WhatsApp) | `min-h-[44px]` | 44px ✅ | ✅ |
| Navbar Wishlist / Cart buttons | `h-11 w-11` (44px) | 44px ✅ | ✅ |
| Hamburger button | `h-11 w-11` (44px) | 44px ✅ | ✅ |
| Mobile menu links | `min-h-[52px]` | 44px ✅ | ✅ |
| Product WhatsApp CTAs | `minHeight: 44` | 44px ✅ | ✅ |
| Location CTAs | `minHeight: 44px` | 44px ✅ | ✅ |
| Contact primary CTA | `minHeight: 52px` | 44px ✅ | ✅ |
| Hero dot buttons | `minWidth: 44px, minHeight: 44px` | 44px ✅ | ✅ |
| Footer WhatsApp CTA (Brand col) | `minHeight: 40px` | 44px ⚠️ | See Issues |
| **Category strip arrow buttons** | `width: 36, height: 36` | 44px ✅ spec | ⚠️ See Issues |

---

## 12. TypeScript / Build Result

### TypeScript

```
npx tsc --noEmit → exit code 0 — zero errors
```

### Production build

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 1923ms
✓ TypeScript: Finished in 1429ms — zero errors
✓ Generating static pages (13/13) in 289ms

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. All 13 pages generated.
```

---

## 13. Issues Found

### ⚠️ Minor — Issue 1: Category Strip Arrow Buttons Below Tap Target Minimum

**File:** `sections/Categories.tsx`
**Location:** `ArrowButton` component, `style={{ width: 36, height: 36 }}`
**Spec:** `PROJECT_LOCKED_RULES.md` § Accessibility — "Min tap target: 44px × 44px"
**Actual:** Arrow buttons render at 36×36px — 8px below the 44px minimum on both axes.
**Context:** These buttons are supplementary horizontal scroll controls. On desktop they only appear when the category strip overflows horizontally. On mobile the strip scrolls natively; the arrows may not be visible at all.
**Impact:** Low — functional supplementary buttons on desktop; no crash or broken layout.
**Recommendation:** In a future phase, increase `width` and `height` to `44` (or use `minWidth: 44, minHeight: 44`) while keeping the visible icon size at 36px via padding or inner div.

---

### ⚠️ Minor — Issue 2: Footer Brand Column WhatsApp CTA Below Tap Target Minimum

**File:** `components/Footer.tsx`
**Location:** Brand column WhatsApp pill — `minHeight: "40px"`
**Spec:** `PROJECT_LOCKED_RULES.md` § Buttons — "Min height: 44px on all buttons and interactive elements"
**Actual:** `minHeight: 40px` — 4px below the 44px minimum.
**Impact:** Visually unnoticeable; minor accessibility spec deviation.
**Recommendation:** Change `minHeight: "40px"` → `minHeight: "44px"` in the Footer brand column CTA.

---

### ⚠️ Minor — Issue 3: Hero Slide Transitions — Brief Double `<h1>` in DOM

**File:** `sections/Hero.tsx`
**Location:** `AnimatePresence mode="sync"` wrapping `<motion.h1>` per slide
**Details:** With `mode="sync"`, during the 450ms crossfade between slides, the exiting slide and the entering slide briefly coexist in the DOM simultaneously. Each contains a `<motion.h1>`. This means there are briefly 2 `<h1>` elements on the page during transitions (~450ms window).
**Impact:** Negligible for visual users; screen readers would rarely encounter this during a 450ms window. Existing behavior, not introduced in recent phases.
**Note:** Hero is currently paused / not approved visually. This issue is documented here for the Hero redesign phase.
**Recommendation:** Consider `mode="wait"` in `AnimatePresence` during Hero redesign — exiting slide completes its exit before the entering slide renders, ensuring only one `<h1>` exists at any time. Trade-off: visible gap between slides.

---

### ⚠️ Minor — Issue 4: `data/featured-products.ts` — `categorySlug` Contains Full Paths

**File:** `data/featured-products.ts`
**Details:** The `categorySlug` field in `FeaturedProduct` objects contains full navigation paths (e.g., `"/products/iphone"`) rather than URL segment slugs (e.g., `"iphone"`). This is inconsistent with the `Product` interface contract in `data/products.ts`, which documents: *"URL param segment only — e.g. 'macbook', 'mac-mini'. Never a full path."*
**Impact:** None functional — `categorySlug` is not consumed by `sections/FeaturedProducts.tsx` in any rendering or routing logic. The field is present in the data type but unused.
**Recommendation:** Correct the field values to slug-only strings in a future data cleanup pass, or remove `categorySlug` from the `FeaturedProduct` interface if it serves no purpose.

---

## 14. Recommended Fixes

| Priority | Issue | File | Fix |
|---|---|---|---|
| Minor | Arrow buttons 36px < 44px tap target | `sections/Categories.tsx` | Change `width: 36, height: 36` → `width: 44, height: 44` (keep icon at 36px via inner wrapper or icon size) |
| Minor | Footer brand CTA 40px < 44px tap target | `components/Footer.tsx` | Change `minHeight: "40px"` → `minHeight: "44px"` in Brand column WhatsApp pill |
| Minor | Double `<h1>` during Hero transitions | `sections/Hero.tsx` | Consider `AnimatePresence mode="wait"` during Hero redesign phase |
| Minor | `categorySlug` full paths in featured-products.ts | `data/featured-products.ts` | Correct to slug-only values or remove unused field |

**No Critical fixes required. No Important fixes required.**

The site is stable and ready for final visual review. All routes render, no blank pages, no broken navigation, TypeScript clean, production build clean.

---

## 15. Hero Status

**Hero is paused / not approved visually. It has not been redesigned or modified in this phase.**

Hero functional status:
- Renders without errors ✅
- Does not cause layout overflow ✅
- No console errors introduced by Hero code ✅
- CTAs ("Buy on WhatsApp", "View Products") work correctly ✅
- WhatsApp CTA uses `whatsappLink()` ✅
- Auto-advance, dot navigation, pause on hover/focus all function ✅
- Trust stats row renders below slider ✅
- No "Buy Now" ✅ / No "Your Apple Store" ✅ / No Apple logo ✅
- Reduced motion handled via `useReducedMotion()` ✅

The Hero's visual design (device frames, layout proportions, overall aesthetic) remains under visual review and has not been approved. No visual changes were made in this phase.

---

## 16. Forbidden Work Confirmation

| Item | Status |
|---|---|
| Checkout / payment / backend / CMS / admin | ✅ Not present |
| Fake prices | ✅ Not present — `Product` interface has no `price` field |
| Fake specs | ✅ Not present |
| Stock count display | ✅ Not present — "current stock" is inquiry copy only |
| "Buy Now" | ✅ Not present anywhere |
| "Add to Cart" | ✅ Not present anywhere |
| "View Details" | ✅ Not present anywhere |
| Fake phone number | ✅ Not present — no phone field anywhere |
| Fake email | ✅ Not present |
| Fake social media links | ✅ Not present |
| Payment icons | ✅ Not present |
| Apple logo | ✅ Not present |
| Google logo | ✅ Not present — "Google Reviews" text only, no logo |
| External product images | ✅ Not present — `image: null` on all products |
| New unrelated pages | ✅ Not created |
| Hardcoded `wa.me` URLs | ✅ Not present — all via `whatsappLink()` |

---

## 17. Approval Status

**Awaiting user review.**

The site is structurally complete and pre-deploy stable:
- All 11 routes render correctly, `/products/unknown` → 404
- Zero TypeScript errors
- Zero production build errors
- No broken navigation, no blank pages, no forbidden content
- 4 Minor issues identified — none block deployment or user experience
- Hero paused visually; documented; does not affect other sections

---

*Phase 11A · Full Site QA / Pre-Deploy Audit · Report version 1.0 · 2026-05-29*
