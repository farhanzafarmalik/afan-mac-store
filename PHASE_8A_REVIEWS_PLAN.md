# PHASE_8A_REVIEWS_PLAN.md
**Phase 8A — Reviews / Trust Section · Planning Document**

---

## 1. Section Purpose

The Reviews section is a trust-building layer placed between Featured Products and the eventual footer. Its job is not to look impressive — it is to feel reliable.

A user who has browsed products and is considering messaging on WhatsApp needs one final confirmation that Afan Mac Store is a real, trustworthy business. This section uses **real excerpts from Afan Mac Store's Google Business reviews** — not invented testimonials or marketing copy.

Three goals:
- **Credibility** — real Google reviews, real names (first name + initial), unpolished natural language
- **Reassurance** — confirms the purchase process is smooth and professional, from real buyers
- **Momentum** — gives the undecided user a gentle nudge toward the CTA

The tone must reflect what real reviewers actually wrote. No over-polishing, no invented language, no invented names.

---

## 2. Homepage Placement

```
[Hero — paused]
[Category Strip — Phase 5B ✅]
[Featured Products — Phase 6B ✅]
──────────────────────────────── ← Reviews section placed here (Phase 8B)
[Future: Location / Footer]
```

- **Homepage only** — `app/page.tsx`
- Inserted after `<FeaturedProducts />`, before any future location or footer sections
- Section receives `id="reviews"` — the Navbar "Reviews" anchor link (`href="#reviews"`) will scroll to this section automatically once the section exists. No Navbar code change required.

---

## 3. Real Google Review Source

The review content is sourced from Afan Mac Store's verified Google Business profile.

| Source | Value |
|---|---|
| Platform | Google Business |
| Overall rating | 4.9 |
| Total reviews | 32 |
| Review type | Real customer reviews — not invented |

**Display rules:**
- The text "Google Reviews" appears as the section overline — text only, no logo
- No Google logo, Google icon, or Google trademark of any kind
- No "Verified Purchase" badge (implies a checkout transaction — this is a Google review, not a purchase verification system)
- No profile photos or avatars
- Long reviews may be shortened to excerpts — but the meaning must remain the same
- Where a review is shortened, the plan and code must treat it as a **"review excerpt"**, not a full quote

---

## 4. Review Content Strategy

### Naming convention

- First name + last initial only (e.g. "Talha Z.") — not full public names
- This matches what was visible in the provided screenshots while reducing full-name exposure

### Review length rule

- Use the reviewer's own words — do not rewrite, improve, or clean up the language
- Shortened excerpts are allowed but must preserve the original meaning
- No superlatives may be added that were not in the original
- No product specs, no prices, no stock claims may be added

### Product label convention

- Optional label beneath name (e.g. "MacBook Buyer", "Customer Review")
- Matches the context of the original review or is left as "Customer Review" if no specific product is mentioned
- Not a link — decorative/informational only

### Star rating convention

- 5 filled star icons per card — all 6 displayed reviews are 5-star reviews
- Uses Lucide `Star` icon, filled with `#FF9F0A` (iOS amber)
- No fractional ratings per card (the aggregate "4.9" appears in the stats row only)
- No numerical rating inside the card

---

## 5. Approved Real Review Excerpts

Exactly 6 reviews from real Google Business reviewers. No additions without user approval.

| # | Reviewer | Rating | Label | Review text | Excerpt? |
|---|---|---|---|---|---|
| 1 | Talha Z. | 5 | Customer Review | "Good experience, would definitely buy from again." | No — full review |
| 2 | Chaudhary I. | 5 | iPhone Buyer | "The staff was polite, knowledgeable, and very cooperative. They guided me honestly according to my budget and needs." | Yes — shortened Google review excerpt |
| 3 | Aqib K. | 5 | Customer Review | "The store is in a good location and very easy to reach. The staff is friendly and cooperative." | Yes — shortened Google review excerpt |
| 4 | Usama Z. | 5 | Apple Products Buyer | "The staff is very professional, cooperative, and knowledgeable. Customer service and after-sales support are excellent." | Yes — shortened Google review excerpt |
| 5 | Samar E. | 5 | MacBook Buyer | "Excellent service and product. The team was helpful, and the MacBook is in great condition." | Yes — shortened Google review excerpt |
| 6 | Zeeshan A. | 5 | MacBook Buyer | "They explained all details about the laptop before I purchased. Such a nice and cooperative experience." | Yes — shortened Google review excerpt |

### Optional backup review (available if a primary review is removed)

| Reviewer | Rating | Label | Text | Excerpt? |
|---|---|---|---|---|
| Ahmad I. | 5 | Customer Review | "Afan Mac Store is a good experienced Mac store. The people working here are very cooperative." | Yes — shortened Google review excerpt |

The 6 approved reviews cover a natural spread: two MacBook references, one iPhone, one Apple Products (general), and two general customer experience reviews. No reviewer name is duplicated.

---

## 6. Recommended Layout

**Static 3-column × 2-row card grid.**

```
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE REVIEWS · HEADING · SUBTEXT                         │
└─────────────────────────────────────────────────────────────┘

┌───────────┐  ┌───────────┐  ┌───────────┐
│ ★★★★★    │  │ ★★★★★    │  │ ★★★★★    │
│ "Review…" │  │ "Review…" │  │ "Review…" │
│ Name · Label│ │ Name · Label│ │ Name · Label│
└───────────┘  └───────────┘  └───────────┘
┌───────────┐  ┌───────────┐  ┌───────────┐
│ ★★★★★    │  │ ★★★★★    │  │ ★★★★★    │
│ "Review…" │  │ "Review…" │  │ "Review…" │
│ Name · Label│ │ Name · Label│ │ Name · Label│
└───────────┘  └───────────┘  └───────────┘

┌─────────────────────────────────────────────────────────────┐
│  4.9 Rating · 32 Reviews · WhatsApp Support                 │
└─────────────────────────────────────────────────────────────┘
```

| Viewport | Columns | Gap |
|---|---|---|
| Mobile (`< 640px`) | 1 column | `24px` |
| Tablet (`640px – 1023px`) | 2 columns | `24px` |
| Desktop (`≥ 1024px`) | 3 columns | `32px` |

Tailwind: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

- 6 cards, 3×2 on desktop — no orphaned cards at any breakpoint
- No carousel, no auto-cycle, no horizontal scroll
- `useInView` stagger entrance: cards fade in and rise `8px` on scroll (one-time)
- Mobile: 1 column, full-width cards stacked

---

## 7. Animation Rules

### Entrance animation (scroll-triggered, one-time)

| Property | Value |
|---|---|
| Trigger | `useInView` with `once: true`, `margin: "-60px"` |
| Effect | `opacity: 0 → 1`, `translateY: 8px → 0` |
| Duration | `360ms` |
| Easing | `ease-out` |
| Stagger | `40ms` per card (index × 40ms delay) |
| Wrapper | `<MotionConfig reducedMotion="user">` — all animations resolve instantly when OS preference is set |

### Hover animation (card)

| Property | Rest | Hover |
|---|---|---|
| `transform` | `translateY(0)` | `translateY(-2px)` |
| `box-shadow` | `0 1px 4px rgba(0,0,0,0.05)` | `0 2px 10px rgba(0,0,0,0.07)` |
| `border-color` | `#E8E8ED` | `#D2D2D7` |
| Transition | — | `0.22s ease` |

### No auto-cycle

Auto-cycling reviews are explicitly not planned. The section is a trust display, not a carousel. Static, readable cards build more credibility than rotating ones.

### Forbidden animations

Consistent with `PROJECT_LOCKED_RULES.md`:
- No bounce, spring, elastic, spin, flash
- No parallax
- No looping or continuous motion
- No horizontal slide
- No scale transform on cards

---

## 8. Visual Style Rules

### Section

| Element | Value |
|---|---|
| Section background | `#F5F5F7` |
| Section vertical padding | `clamp(64px, 8vw, 96px)` top and bottom |
| Max content width | `1200px`, centered, `px-4 md:px-8` |
| Section `id` | `"reviews"` — for Navbar anchor link |

### Section header

| Element | Value |
|---|---|
| Overline | "Google Reviews" — 11px, uppercase, `tracking-[0.10em]`, `#AEAEB2` |
| Heading `<h2>` | `clamp(1.75rem, 3.5vw + 0.25rem, 3rem)`, `font-semibold`, `#1D1D1F`, `tracking-[-0.02em]` |
| Heading copy | "Trusted by Apple buyers in Pakistan." |
| Subtext | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`, `#6E6E73`, `max-width: 560px` |
| Subtext copy | "Real customer feedback from Afan Mac Store's Google Business reviews." |
| Header margin bottom | `clamp(40px, 5vw, 56px)` |

### Review cards

| Element | Value |
|---|---|
| Card surface | `#FFFFFF` |
| Card border-radius | `18px` |
| Card border at rest | `1px solid #E8E8ED` |
| Card border on hover | `1px solid #D2D2D7` |
| Card shadow at rest | `0 1px 4px rgba(0,0,0,0.05)` |
| Card shadow on hover | `0 2px 10px rgba(0,0,0,0.07)` |
| Card padding | `20px` |
| Card min-height | `auto` — height driven by content, `align-items: stretch` via grid |
| Stars | 5× `Star` icon (Lucide), `14px`, `#FF9F0A` (amber), filled via `fill` prop |
| Review text `<p>` | `15px`, `#1D1D1F`, `line-height: 1.6`, `letterSpacing: "normal"` |
| Reviewer name `<span>` | `13px`, `font-weight: 600`, `#1D1D1F`, `letterSpacing: "normal"` |
| Product label `<span>` | `12px`, `#AEAEB2`, `letterSpacing: "normal"` |

**Cards are non-interactive** — no link wrapping the card. Cards have `onMouseEnter/Leave` for the subtle hover lift only. No CTA inside individual review cards.

### Trust stats row

Placed below the review grid, separated by `margin-top: clamp(40px, 5vw, 56px)`.

| Stat | Value | Source |
|---|---|---|
| 4.9 Rating | Real — from Google Business profile | ✅ |
| 32 Reviews | Real — from Google Business profile | ✅ |
| WhatsApp Support | Brand claim — consistently used across site | ✅ |

Stats row style:
- Horizontal flex row, `justify-content: center`, `gap: clamp(24px, 4vw, 48px)`
- Each stat: value in `#1D1D1F`, `font-semibold`, ~`18px`; label in `#6E6E73`, `13px`
- Subtle `1px solid #E8E8ED` top border above the row
- No card surface — rendered on section background directly
- No interactive elements

**Note:** "10K+ Happy Customers" is not included in this section. If it should appear here, the user must confirm separately. It was present in the original Hero spec but has not been approved for the Reviews stats row.

### Forbidden visuals

- No profile photos — no avatars, silhouettes, or placeholder person images
- No Apple logo or trademark
- No Google logo or Google icon
- No dark / black section
- No loud gradients
- No external images of any kind
- No "Verified Purchase" badge (implies purchase transaction)
- No star count variations — all 5 stars, no half-stars per card
- No invented review text — only the approved real excerpts in Section 5

---

## 9. Accessibility Rules

| Concern | Rule |
|---|---|
| Section heading | `<h2 id="reviews-heading">` — `<section>` has `aria-labelledby="reviews-heading"` |
| Section anchor | `id="reviews"` on `<section>` — Navbar `href="#reviews"` links to it |
| Review cards | `<article>` elements — semantically standalone, non-interactive wrappers |
| Star icons | `aria-label="5 out of 5 stars"` on the star container; individual `Star` icons `aria-hidden="true"` |
| Reviewer name | `<span>` — not an interactive element |
| Reduced motion | `<MotionConfig reducedMotion="user">` wraps the section — all stagger animations instantly resolve |
| Focus ring | Not applicable to review cards (non-interactive). If a future CTA is added, `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` applies |
| Color contrast | `#1D1D1F` on `#FFFFFF` = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). `#AEAEB2` on `#FFFFFF` = 2.73:1 — used only for labels at 12px+ (decorative context). All primary text passes. |
| Semantic structure | `<section>` → `<div>` header → `<div>` grid → `<article>` per review |

---

## 10. Files to Create / Change in Phase 8B

| File | Action | Notes |
|---|---|---|
| `data/reviews.ts` | **Create** | `Review` interface + 6 review objects (real Google review excerpts only) |
| `sections/Reviews.tsx` | **Create** | `"use client"` — stagger entrance, hover state, trust stats row |
| `app/page.tsx` | **Update** | Add `<Reviews />` import and render after `<FeaturedProducts />` |
| `PHASE_8B_REVIEWS_REPORT.md` | **Create** | Phase 8B completion report |

### Files explicitly NOT touched in Phase 8B

| File | Status |
|---|---|
| `sections/Hero.tsx` | ✅ Not modified — Hero is paused |
| `sections/Categories.tsx` | ✅ Not modified |
| `sections/FeaturedProducts.tsx` | ✅ Not modified |
| `components/Navbar.tsx` | ✅ Not modified — `href="#reviews"` already in `NAV_LINKS`; anchor scroll activates automatically when `id="reviews"` section exists |
| `app/layout.tsx` | ✅ Not modified |
| `app/globals.css` | ✅ Not modified |
| `data/categories.ts` | ✅ Not modified |
| `data/featured-products.ts` | ✅ Not modified |
| `data/products.ts` | ✅ Not modified |
| `lib/constants.ts` | ✅ Not modified |
| `components/ProductCard.tsx` | ✅ Not modified |
| Any product listing page | ✅ Not modified |

### Note on Navbar "Reviews" link

`Navbar.tsx` already contains `{ label: "Reviews", href: "#reviews" }` in `NAV_LINKS`. Once `<section id="reviews">` exists on the homepage, the browser's native anchor scroll behavior activates automatically. No Navbar code change is required.

---

## 11. What NOT to Build in Phase 8B

| Item | Why excluded |
|---|---|
| Reviews page (`/reviews`) | Not planned — homepage section only |
| Review submission form | No backend — permanently out of scope |
| Review aggregation (live Google/Facebook API) | External data — not planned |
| Auto-cycling / carousel behavior | Rejected — static grid is cleaner and more trustworthy |
| Profile photos or avatars | Forbidden — no fake or real person images |
| Verified Purchase badges | Implies checkout transaction — forbidden |
| Star rating below 5 | All displayed reviews are real 5-star reviews |
| Fractional star ratings per card | Aggregate "4.9" shown in stats row only |
| WhatsApp CTA inside review cards | Cards are non-interactive display elements |
| Links of any kind inside review cards | Non-interactive — no nested links |
| Dark section or black background | Explicitly forbidden by locked rules |
| External images | Forbidden |
| Apple logo or trademark | Forbidden — no exceptions |
| Google logo or Google icon | Forbidden — "Google Reviews" as text only |
| Invented or synthetic review text | Forbidden — only the 6 approved real excerpts in Section 5 |
| "10K+ Happy Customers" stat | Not approved for this section — requires separate user confirmation |
| New npm packages | None required |
| Checkout, payment, backend, CMS, admin | Permanently out of scope |
| Footer | Separate phase |
| Location section | Separate phase |
| Phase 9 or later work | Not started |

---

## 12. Completion Checklist

*(To be verified at end of Phase 8B)*

**Data**
- [ ] `data/reviews.ts` created with `Review` interface
- [ ] Exactly 6 review objects — no more, no fewer (unless backup review is explicitly approved)
- [ ] Each review has: `id`, `text`, `name`, `label`, `rating: 5`
- [ ] No `price`, `photo`, `avatar`, or external URL fields
- [ ] All 6 review texts match the approved excerpts in Section 5 exactly — no rewriting, no added superlatives
- [ ] No invented names — all 6 names match the approved list in Section 5

**Section structure**
- [ ] `<section id="reviews">` — anchor for Navbar link
- [ ] `aria-labelledby="reviews-heading"` on section
- [ ] `<h2 id="reviews-heading">` reads "Trusted by Apple buyers in Pakistan."
- [ ] Overline reads "Google Reviews"
- [ ] Subtext reads "Real customer feedback from Afan Mac Store's Google Business reviews."
- [ ] Review cards use `<article>` — non-interactive wrappers
- [ ] No `<Link>` or `<a>` wrapping any review card
- [ ] No interactive elements inside review cards

**Review cards**
- [ ] 5 filled star icons per card, amber `#FF9F0A`, `aria-label="5 out of 5 stars"` on container
- [ ] Individual `Star` icons: `aria-hidden="true"`, `focusable="false"`
- [ ] Review text: 15px, `#1D1D1F`, `letterSpacing: "normal"`
- [ ] Reviewer name: 13px, `font-weight: 600`, `#1D1D1F`, `letterSpacing: "normal"`
- [ ] Product label: 12px, `#AEAEB2`, `letterSpacing: "normal"`
- [ ] No profile photos
- [ ] No "Verified Purchase" badge
- [ ] No Google logo or icon

**Grid**
- [ ] 1 column mobile, 2 columns tablet, 3 columns desktop
- [ ] Gap: 24px mobile/tablet, 32px desktop
- [ ] Equal card height via CSS Grid `align-items: stretch`
- [ ] No horizontal page overflow
- [ ] 6 cards render with no orphaned cards on desktop (3×2)

**Trust stats row**
- [ ] "4.9 Rating" renders (real Google Business data)
- [ ] "32 Reviews" renders (real Google Business data)
- [ ] "WhatsApp Support" renders
- [ ] Stats row has `border-top: 1px solid #E8E8ED`, no card surface
- [ ] "10K+ Happy Customers" does NOT appear in this section

**Animation**
- [ ] `<MotionConfig reducedMotion="user">` wraps section
- [ ] `useInView` with `once: true` triggers stagger entrance
- [ ] Cards animate `opacity: 0→1` + `translateY: 8→0`
- [ ] Stagger: `index × 40ms`
- [ ] Duration: `360ms`, easing: `ease-out`
- [ ] No looping, no auto-cycle, no bounce

**Visual**
- [ ] Section background `#F5F5F7`
- [ ] Card surface `#FFFFFF`, border `#E8E8ED`, radius `18px`
- [ ] Card hover: `translateY(-2px)`, shadow `0 2px 10px rgba(0,0,0,0.07)`, border `#D2D2D7`
- [ ] No dark section, no external images, no Apple logo, no Google logo

**Navbar anchor**
- [ ] `id="reviews"` present on section — confirms Navbar `href="#reviews"` works
- [ ] `components/Navbar.tsx` NOT modified

**Homepage integration**
- [ ] `<Reviews />` imported and rendered in `app/page.tsx` after `<FeaturedProducts />`
- [ ] `sections/Hero.tsx`, `sections/Categories.tsx`, `sections/FeaturedProducts.tsx` NOT modified

**TypeScript**
- [ ] `npx tsc --noEmit` → zero errors

---

## 13. Approval Status

**Awaiting user approval before Phase 8B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 8A · Reviews / Trust Section Plan · Version 1.1 · 2026-05-25*
