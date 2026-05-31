# Phase 18A — Full Website Visual Polish Audit

**Date:** 2026-05-31
**Status:** Awaiting user review
**Scope:** Audit only. No code changes in Phase 18A.

---

## 1. Overall Visual Verdict

The website is in a strong, functional state. It looks premium and clean overall. The core brand direction — Apple-inspired, WhatsApp-led, no fake data — is executing well across all pages. Phase 15–17 additions (Quick Details drawer, category tabs, Featured Products grid upgrade, product header alignment) have meaningfully raised the quality level.

**Three areas need improvement before the site can be considered visually polished:**

1. **Section separation on the homepage** — all 6 homepage sections share the exact same `#F5F5F7` background. There are no dividers, no background shifts, no visual rhythm. The page reads as one continuous grey wall rather than a composed set of sections.
2. **Category strip card radius inconsistency** — the category cards use `border-radius: 6px`, which is inconsistent with the `18px` radius used on product cards, drawers, and all other card surfaces across the site.
3. **Featured Products mobile scroll length** — 8 single-column cards on mobile creates a ~4100px tall section. This is the longest single section on the page and creates a disproportionate scroll burden.

Everything else — button consistency, alignment, tabs, drawer behaviour, WhatsApp flow, colours, typography — is executing correctly.

---

## 2. Homepage Polish Audit

### Navbar
- Height: 65px ✅ (within spec)
- Translucent blur on scroll: implemented ✅
- "Buy on WhatsApp" outline pill: correct outline style, green border, 44px ✅
- Heart and Bag icons with badges: correct ✅
- Products dropdown: correct ✅
- **Minor:** "Buy on WhatsApp" navbar button uses `font-size: 14px`; other WhatsApp CTAs on cards use `15px`. Difference is small but measurable.

### Hero
- Height: 720px desktop, 731px mobile ✅ — full-viewport feel
- `aria-label="Featured products"` on the Hero section is **incorrect** — the Hero is not the Featured Products section. This is an accessibility mislabelling. The label should reflect "Hero" or "Homepage hero" or match the correct content. **Note: Hero modification is out of scope for Phase 18B unless user approves.**
- Trust stats bar below the slider: correct spacing

### Category Strip
- 8 category links, all 98px height (perfectly uniform) ✅
- Padding: 96px top / 48px bottom desktop · 64px top / 32px mobile ✅ — correct spacing rhythm
- `h2`: "Find your next Apple device." ✅ — clean, direct
- **Important issue — `border-radius: 6px` on category cards.** The design system specifies `radius-md: 12px` for thumbnails and `radius-lg: 18px` for standard cards. At 6px, the category strip items look like rectangular chips rather than cards. This is inconsistent with every other card surface on the site.
- Category cards are transparent background links — no white surface. On `#F5F5F7` background, the category area has no card depth. This is intentional (it reads as a grid of icon+label links rather than cards), but the 6px radius still feels too square.

### Featured Products
- 8 cards in 4×2 grid — balanced ✅ (Phase 17C fix)
- Card height variance: 23px (max 495px, min 472px). On a 4-column row, mismatched heights are visible — shorter cards leave empty space at the bottom within their row. Not a critical issue but noticeable.
- Section top padding reduced to `38.4px` (`clamp(24px, 3vw, 40px)`) — this is deliberately tighter to connect the section to Categories above. Acceptable.
- Bottom padding: 96px ✅
- No section separator between Featured Products and Categories above — they blend.
- No separator between Featured Products and Reviews below — they blend.

### Reviews
- Section height: 965px desktop / 1704px mobile
- Internal padding handled within section component
- `paddingTop: 0` and `paddingBottom: 0` on the section wrapper — spacing is managed inside
- Background: same `#F5F5F7` as all other sections — **no visual separation from Featured Products above or Location below**

### Location
- Section height: 729px desktop / 943px mobile
- Same uniform `#F5F5F7` background — blends into Reviews above and Contact below
- **Opportunity:** giving Location or Reviews a `#FFFFFF` background would create clean Apple-style rhythm

### Contact
- Section height: 578px desktop / 536px mobile
- Same `#F5F5F7` background
- Connects directly into the white footer — this transition (grey → white) is the **only visual break on the entire page** apart from the Hero

### Footer
- Background: `#FFFFFF` — this is the **only section with a different background** on the entire page, which is why it reads as a clear break at the bottom ✅
- Height: 517px desktop, 1078px mobile
- 4 columns desktop — verified ✅
- **Mobile issue:** 1078px mobile footer is very tall. Four columns stacking vertically creates an excessive scroll at the bottom of already-long mobile pages. A 2-column layout on mobile would halve the footer scroll length.
- 16 footer links, 1 social icon — appropriate count

---

## 3. Product Pages Polish Audit

### Product Page Header
- Height: 418px desktop / 315px mobile — **consistent across all 9 category routes** ✅ (Phase 17D fixed)
- Overline → h1 → subtext → WhatsApp CTA → category tabs: correct hierarchy ✅
- WhatsApp CTA on product pages: correct green fill, 44px ✅

### Category Tabs
- 9 tabs, all 44px height ✅
- Active tab: charcoal `#1D1D1F` pill ✅
- Inactive tabs: transparent with `#E8E8ED` border ✅
- Desktop: all 9 tabs fit in one row at 1280px ✅
- Mobile: horizontally scrollable, no page overflow ✅
- **Minor:** Active tab is not scrolled into view on mobile when it is one of the last tabs (e.g. Accessories). Noted in Phase 16B as deferred.

### Product Grid
- Grid gap: 32px desktop ✅
- 3-column desktop grid ✅
- Card heights: uniform within same-category pages (e.g. MacBook: 396px × 2) ✅
- Accessories page: 22px height variance across 11 cards — caused by product name length differences (long names like "Braided USB-C to Lightning Cable" wrap to 2 lines while "MagSafe Charger" stays 1 line). Visible but not jarring.

### Product Cards
- 176px image area ✅
- Heart button: 44px tap target ✅
- Add to Inquiry/Add to Cart: 44px ✅
- WhatsApp CTA: 44px ✅
- Detail chips (max 3): pill style, muted ✅
- "Details" text link: 12px blue underlined — correct, secondary ✅
- Border-radius 18px ✅
- Hover lift and shadow: within spec ✅

### Quick Details Drawer
- Right-side panel, 400px max-width ✅
- White surface, `#E8E8ED` border ✅
- Content: category badge, bestFor badge, summary, condition/compatibility note, confirmation points, Add to Inquiry/Cart, WhatsApp ✅
- Scroll lock centralised (Phase 15D fix) ✅
- Close × 44px ✅
- Escape + overlay close ✅

### Saved Drawer / Inquiry Bag Drawer
- Style matches spec ✅
- No regressions since Phase 12B ✅

---

## 4. Section Spacing Audit

| Section transition | Gap (desktop) | Assessment |
|---|---|---|
| Navbar → Hero | 0px (Hero fills to navbar bottom) | ✅ Correct |
| Hero → Category Strip | 0px at boundary | ⚠ No separation — same background |
| Category Strip → Featured Products | Reduced (`38.4px` top on Featured) | ⚠ Feels tight — sections blend |
| Featured Products → Reviews | 0px at boundary | ⚠ No separation — same background |
| Reviews → Location | 0px at boundary | ⚠ No separation — same background |
| Location → Contact | 0px at boundary | ⚠ No separation — same background |
| Contact → Footer | Background shifts `#F5F5F7` → `#FFFFFF` | ✅ Best separation on the page |

**Assessment:** The homepage has exactly one visual section break — at the footer. Every other section transition relies entirely on content change to communicate a new section. This creates a monotone scroll experience.

**Product pages** have fewer sections and this is less of an issue — the tabs and grid provide enough visual anchoring.

---

## 5. Section Separation Recommendation

**Recommended approach: selective background alternation — not dividers.**

Apple.com and most premium sites alternate between `#F5F5F7` and `#FFFFFF` surfaces. Hard divider lines (`<hr>`) are not recommended.

| Section | Current bg | Recommended bg | Reason |
|---|---|---|---|
| Hero | `#F5F5F7` | No change | Locked |
| Category Strip | `#F5F5F7` | `#FFFFFF` | Creates clean break from Hero; white cards on white bg works well |
| Featured Products | `#F5F5F7` | `#F5F5F7` | Keep — white cards on grey feels premium |
| Reviews | `#F5F5F7` | `#FFFFFF` | Alternates cleanly; white gives reviews a "card surface" feel |
| Location | `#F5F5F7` | `#F5F5F7` | Keep — map/location content suits the off-white |
| Contact | `#F5F5F7` | `#FFFFFF` | Alternates; white contact form feels cleaner |
| Footer | `#FFFFFF` | `#FFFFFF` | Keep — correct ✅ |

This creates the rhythm: grey → white → grey → white → grey → white → white (footer blends with Contact).

**Alternative minimal approach** (if above feels like too much change): Keep all sections as-is but add `1px solid #E8E8ED` top border on Reviews, Location, and Contact sections only. This gives a subtle break without changing backgrounds. Less impactful but still an improvement.

---

## 6. Component Consistency Audit

| Component | Issue | Severity |
|---|---|---|
| Category strip card radius | `6px` — should match design system `12px` or `18px` | Important |
| Navbar WA button font-size | `14px` vs product card WA CTAs at `15px` | Minor |
| Featured card height variance | 23px max spread — name wrapping causes inconsistency | Minor |
| Accessory card height variance | 22px max spread — name wrapping | Minor |
| Product name minHeight on listing cards | Not set — could stabilise card height like Phase 17D did for headers | Minor |
| "Details" link position | Correctly `alignSelf: flex-start` ✅ | — |
| WhatsApp buttons | All pill-shaped, green fill, consistent ✅ | — |
| Heart buttons | All 44×44px, aria-pressed, consistent ✅ | — |
| Card border-radius | 18px on product/featured cards ✅ | — |
| Chip pills | `#F5F5F7` background, `#E8E8ED` border, `#6E6E73` text — consistent across all card types ✅ | — |
| Drawer action buttons | Both outline blue (Add) and green (WhatsApp) — consistent with card patterns ✅ | — |
| Focus rings | `0 0 0 3px rgba(0,113,227,0.35)` on all interactive elements ✅ | — |

---

## 7. Mobile Polish Audit

| Check | Measurement | Assessment |
|---|---|---|
| Homepage page overflow | None | ✅ |
| Product page overflow | None | ✅ |
| Product card fills mobile width | 343px in 375px viewport | ✅ |
| Header height consistency | 315px across all category routes | ✅ |
| Category tabs horizontal scroll | Scrollable (838px content in 343px visible) | ✅ |
| Category tab overflow to page | None | ✅ |
| Featured Products mobile height | **4101px** — 8 full-height cards stacked | ⚠ Very long |
| Footer mobile height | **1078px** — 4 columns stacking vertically | ⚠ Excessive |
| Mobile card width | Fills viewport correctly | ✅ |
| WhatsApp CTAs on mobile | Full-width, 44px, visible | ✅ |
| Drawers on mobile | Full-width, scroll locked | ✅ |

**Mobile summary:** No functional issues. Two scroll-length concerns:
1. Featured Products at 4101px on mobile makes the homepage very long before users reach Reviews/Location.
2. Footer at 1078px creates a disproportionate bottom-of-page scroll.

---

## 8. Conversion Clarity Audit

| Flow step | Assessment |
|---|---|
| Land on homepage | Hero with two clear CTAs: "Buy on WhatsApp" (green, prominent) + "View Products" (blue outline) ✅ |
| Scroll to Featured Products | Cards immediately show product names, chips, "Details" link, and green WhatsApp CTA ✅ |
| Browse product categories | Category tabs prominent, active state clear ✅ |
| View product card | Heart + Add to Inquiry/Cart + Ask on WhatsApp — clear hierarchy ✅ |
| Tap "Details" | Quick Details drawer opens, shows safe context, surfaces WhatsApp CTA again ✅ |
| Add to Inquiry/Cart | Opens Inquiry Bag drawer immediately ✅ |
| WhatsApp from Inquiry Bag | Pre-filled message, single tap to WhatsApp ✅ |
| Trust signals | "10K+ Happy Customers | 100% Genuine | 4.9 ★ Rating" below Hero ✅ |
| Reviews section | Social proof before Location/Contact ✅ |
| Contact section | WhatsApp CTA reachable from bottom of page ✅ |

**Conversion flow is solid.** No blockers. The primary flow (Browse → Details → WhatsApp) works without friction. The secondary flow (Browse → Add to Inquiry → Inquiry Bag → WhatsApp) also works cleanly.

**One gap:** When a user is on a product category page (e.g. `/products/ipad`) and scrolls to the bottom of the product grid, there is no section-level CTA below the grid to prompt them to WhatsApp if they didn't find what they wanted. The footer has a WhatsApp link, but it's not prominent.

---

## 9. Critical Issues

**None.**

No broken layouts, no non-functional components, no accessibility blockers, no data errors, no build failures.

---

## 10. Important Polish Fixes

### P1 — Category strip border-radius (inconsistency)
**Issue:** Category strip card links use `border-radius: 6px`. Every other card surface on the site uses 12px or 18px. This is visually inconsistent and makes the category links look "squarer" than everything else.
**Fix:** Change category strip card link border-radius to `12px` (`radius-md` per design system).
**File:** `sections/Categories.tsx`

### P2 — Homepage section separation (monotone scroll)
**Issue:** All 6 homepage sections share the same `#F5F5F7` background. No visual rhythm between sections.
**Fix:** Change Reviews and Contact sections to `#FFFFFF` background (alternating light pattern). Or add a `1px solid #E8E8ED` top border to Reviews, Location, and Contact — whichever approach user prefers.
**Files:** `sections/Reviews.tsx`, `sections/Contact.tsx` (minimum). Optionally `sections/Categories.tsx` and `sections/Location.tsx`.

### P3 — Featured Products mobile length
**Issue:** 8 single-column featured cards = 4101px section on mobile. This is the longest section on the mobile page and creates serious scroll fatigue before users reach Reviews, Location, and Contact.
**Fix option A (preferred):** Show only 4 featured cards on mobile. Add a "View all products →" link to `/products` after the 4th card on small screens.
**Fix option B (simpler):** Keep 8 cards but add a "View All Products" button below the Featured grid on all screen sizes — gives users an escape route.
**File:** `sections/FeaturedProducts.tsx`

---

## 11. Minor Polish Fixes

### M1 — Card height variance on listing pages
**Issue:** Accessory cards have up to 22px variance in height within the same grid row because long product names (e.g. "Braided USB-C to Lightning Cable") wrap to 2 lines while short names stay on 1 line.
**Fix:** Add `minHeight: "1.35em"` (approximately 2 lines at `17px` font) to product name `<h3>` on `ProductCard.tsx`. This ensures uniform name height regardless of character count.
**File:** `components/ProductCard.tsx`

### M2 — Featured card height variance
**Issue:** Same root cause as M1 — 23px variance in featured card heights creates slightly uneven rows in the 4-col grid.
**Fix:** Same `minHeight` on the `<h3>` in `FeaturedCard` inside `sections/FeaturedProducts.tsx`.
**File:** `sections/FeaturedProducts.tsx`

### M3 — Footer mobile height
**Issue:** Footer is 1078px on mobile — four columns stacking vertically creates excessive bottom-of-page scroll.
**Fix:** Use a 2-column layout on mobile (`grid-cols-2` at `sm` breakpoint) instead of 1-column stacking.
**File:** `components/Footer.tsx`

### M4 — Navbar "Buy on WhatsApp" font-size
**Issue:** Navbar outline WhatsApp button uses `14px`; all other WhatsApp CTAs across the site use `15px`.
**Fix:** Align to `15px` for consistency.
**File:** `components/Navbar.tsx`

### M5 — End-of-product-grid call to action
**Issue:** When users scroll to the bottom of a product grid and don't see what they want, there's no prompt below the grid — just the footer.
**Fix:** Add a simple 1–2 line prompt with a WhatsApp CTA at the bottom of the product grid section (e.g. "Didn't find what you're looking for? Message us on WhatsApp."). This is a conversion improvement.
**Files:** `app/products/page.tsx`, `app/products/[category]/page.tsx`

### M6 — Category strip "View All" label
**Current:** Category strip links show icon + label. There is no "View All" or "All Products" link in the strip.
**Observation:** The category tabs on listing pages include an "All" tab, but the homepage Category Strip only shows 8 specific categories. Users on the homepage who want to see all products must use the Navbar dropdown or click a category first.
**Fix (optional):** Consider whether adding an "All Products →" CTA below the category strip is appropriate, or if the Hero's "View Products" CTA is sufficient.
**Assessment:** The Hero already has "View Products" → `/products`. This may be sufficient. Leaving this as optional.

---

## 12. Things That Should NOT Be Changed

- Hero design, content, or animation (locked, pending future approval)
- WhatsApp flow and inquiry/cart logic — works correctly
- Product data structure and safe-data rules
- Quick Details drawer (fully functional, accessible)
- Category tabs (correct active state, accessible, working)
- Product card CTA hierarchy (Add to Inquiry/Cart + WhatsApp — correct priority)
- Featured Products card content (safe chips, no fake data)
- Product header alignment (`minHeight` fix from Phase 17D — working correctly)
- All `aria-label`, `aria-current`, `aria-pressed` attributes — correctly applied
- Focus ring system — correctly applied everywhere
- Body scroll lock centralisation (Phase 15D) — working correctly
- localStorage keys `afan_saved` / `afan_cart` — correct
- `lib/constants.ts` WhatsApp number — single source of truth
- Design tokens (colours, radii, shadows) — correct except Category strip radius noted above
- Drawer z-index stack — working correctly

---

## 13. Recommended Phase 18B Fix List

In priority order:

| # | Fix | Priority | File(s) |
|---|---|---|---|
| 1 | Category strip border-radius: 6px → 12px | Important | `sections/Categories.tsx` |
| 2 | Homepage section background alternation (Reviews + Contact → `#FFFFFF`) | Important | `sections/Reviews.tsx`, `sections/Contact.tsx` |
| 3 | Featured Products mobile — cap at 4 cards + "View All" link on mobile | Important | `sections/FeaturedProducts.tsx` |
| 4 | Card product name `minHeight` on listing cards | Minor | `components/ProductCard.tsx` |
| 5 | Featured card name `minHeight` | Minor | `sections/FeaturedProducts.tsx` |
| 6 | Footer 2-col mobile grid | Minor | `components/Footer.tsx` |
| 7 | End-of-grid WhatsApp prompt on product pages | Minor | `app/products/page.tsx`, `app/products/[category]/page.tsx` |
| 8 | Navbar WA button font-size 14px → 15px | Minor | `components/Navbar.tsx` |

---

## 14. Assets Needed from User

| Asset | Why needed | Priority |
|---|---|---|
| Real product photos (MacBook Pro, MacBook Air, iPhone, iPad, etc.) | All product cards currently show icon fallbacks. Real photos would dramatically improve visual quality of Featured Products and product listing cards. | High — whenever ready |
| Real product photos for accessory items (adapter, cable, charger, etc.) | Same — icon fallback is functional but placeholder | High — whenever ready |
| Business logo or wordmark (optional) | Currently "Afan Mac Store" is text-only in the navbar. A wordmark would increase brand identity. | Optional |
| WhatsApp number confirmation | Current: `923133388666`. Confirm this is the correct live number before deployment. | Required before deploy |

**Without real product photos, icon fallbacks remain and are functional. Phase 18B can proceed without photos.**

---

## 15. Approval Status

**Awaiting user review.**

Phase 18A audit summary:
- Overall verdict: strong, functional, clean — needs targeted polish in 3 areas ✅
- Critical issues: **None** ✅
- Important polish fixes: 3 (category radius, section separation, mobile Featured scroll)
- Minor polish fixes: 5 (card height variance, footer mobile, WA font size, grid CTA, etc.)
- Things that should not change: 15+ confirmed correct items
- Phase 18B recommended fix list: 8 items in priority order
- Assets needed: real product photos (optional before Phase 18B, required for full launch quality)

---

*Phase 18A · Full Website Visual Polish Audit · Report version 1.0 · 2026-05-31*
