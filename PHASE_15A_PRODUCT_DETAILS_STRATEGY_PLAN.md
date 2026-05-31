# Phase 15A — Product Card Detail / Quick Details Strategy Plan

**Date:** 2026-05-31
**Status:** Awaiting User Approval
**Scope:** Strategy only. No code. No Phase 15B.

---

## 1. Problem

Current product cards are functional and approved but feel generic. Users can see a product name, category image, and CTA buttons — but nothing that helps them understand what they are inquiring about before reaching out on WhatsApp. There is no middle step between "browsing" and "asking on WhatsApp."

This creates friction: users who want a little more context before committing to a WhatsApp conversation have no way to get it.

The goal is a lightweight improvement — slightly richer cards and a quick details drawer — without building full product detail pages prematurely or adding fake/invented data.

---

## 2. Recommended Solution

Two small additions:

**A. Short detail layer on product cards**
Add 2–3 safe, honest bullets or chips to each card that communicate what kind of product this is and how the buying process works — without inventing specs, prices, or stock.

**B. Quick Details drawer**
Clicking the product image or name opens a right-side drawer. The drawer shows structured guidance for what to confirm on WhatsApp. It mirrors the existing Saved/Inquiry Bag drawer style. No new full-page routes. No `/products/[slug]`.

Both additions preserve the WhatsApp-led sales flow. No checkout. No fake data.

---

## 3. Card-Level Detail Rules

**Trigger for detail bullets:** Only add a chip/bullet if it is universally true for that product type. Never invent per-product facts.

**Max per card:** 2–3 chips or one short line of supporting text. Do not increase card height significantly.

**Placement:** Below the product name / above the CTA buttons. Small, secondary text weight.

**Device card — safe details to show:**
- "Multiple conditions available"
- "WhatsApp inquiry required"
- "15-day checking warranty" *(only if confirmed as a business-wide policy)*
- "Availability changes quickly"
- Best-use tag (one of: Work / Study / Office / Creator) — derived from category, not invented per product

**Accessory card — safe details to show:**
- "Compatible with Apple devices"
- "COD available after WhatsApp confirmation"
- "Price and availability confirmed on WhatsApp"
- Category label (e.g. "Accessory Item")

**What never appears on cards:**
- RAM, storage, processor, battery cycle, PTA status, model year, exact price, stock count — none of these unless sourced from real business data.

---

## 4. Quick Details Drawer Structure

**Trigger — recommended approach:**
- Primary: clicking the product image or product name opens the drawer.
- Secondary (optional): a small "Details" text link below the short description on the card.
- Do NOT add a third full CTA button. Cards already have two primary actions. A text link or image/name click is sufficient.

**Recommended label:** "Details" (short) or "Quick Details" (slightly more descriptive). Either works. "Details" is cleaner for a card context.

**Drawer position:** Right-side slide-in drawer. Matches existing Saved / Inquiry Bag drawer style exactly — same overlay, same panel width, same animation direction and timing.

**Drawer header:** Product name + category badge. Close (×) button top-right, 44px minimum tap target.

---

## 5. Device Drawer Content

```
[ Product Name ]
[ Category Badge ]

──────────────────────────────
About This Product
──────────────────────────────
Short guidance sentence.
Example: "Refurbished and pre-owned Mac devices
available in multiple conditions. All units go
through a physical inspection before listing."

What to confirm on WhatsApp:
  • Current availability
  • Condition (e.g. Open Box, Refurbished, Used)
  • Exact price for selected condition
  • Warranty / checking period details

──────────────────────────────
[ Add to Inquiry ]   [ Ask on WhatsApp ]
──────────────────────────────
```

Note: No specs. No price. No stock count. No model year. No PTA status. These do not exist reliably in current data.

---

## 6. Accessory Drawer Content

```
[ Product Name ]
[ Category Badge ]

──────────────────────────────
About This Product
──────────────────────────────
Short guidance sentence.
Example: "Apple-compatible accessory. Availability
and pricing vary — confirm via WhatsApp before ordering."

Compatibility:
  Compatible with Apple devices.

What to confirm on WhatsApp:
  • Current price
  • Stock availability
  • COD delivery details and coverage area

──────────────────────────────
[ Add to Cart ]   [ Ask on WhatsApp ]
──────────────────────────────
```

Note: No battery specs, no connector version, no certification details unless sourced from real data.

---

## 7. Why Not Product Detail Pages Yet

Full `/products/[slug]` pages should NOT be built in the current phase for these reasons:

- **Products are category-level, not inventory-level.** Current data represents product types (e.g. "MacBook Air"), not specific units. A detail page for a generic category entry would be thin and misleading.
- **No real product photography.** Detail pages built on placeholder images would look unprofessional and damage brand trust.
- **No exact specs per unit.** RAM, storage, condition, and year vary per unit. A static spec table would be inaccurate.
- **No prices in data.** Detail pages typically anchor around price. Without it, the page has no clear purpose.
- **No live inventory.** A detail page implies "this specific item is available." Current data cannot make that claim.
- **SEO value is low now.** Category-level pages with no real content would not rank meaningfully and could dilute domain authority.

Building detail pages now would create pages that feel incomplete — which is worse than not having them.

---

## 8. When to Create Product Detail Pages Later

Product detail pages become the right move when:

- **Exact inventory is tracked.** Each listed item has a real unit ID, condition, and availability state.
- **Real specs exist per product.** RAM, storage, model year, condition grade — sourced from actual stock data.
- **Real photos exist.** At least one authentic photo per product or condition variant.
- **Prices are stable enough to publish.** Even a "starting from" price gives the page purpose.
- **SEO or ads are a priority.** When running Google Ads or targeting organic search, landing pages per product become essential.
- **COD / checkout flow is ready.** If users can transact on-site, a detail page becomes the conversion anchor.

At that point, `/products/[slug]` pages should be generated statically from real inventory data, with full image galleries, spec tables, condition selectors, and WhatsApp pre-fill per exact product.

---

## 9. Data Fields Needed

New safe fields to add to `data/products.ts` (or equivalent) per product entry:

| Field | Type | Purpose |
|---|---|---|
| `detailSummary` | `string` | One or two honest sentences about the product type. |
| `detailBullets` | `string[]` | 2–3 safe bullets shown on the card. |
| `confirmationPoints` | `string[]` | What user should confirm on WhatsApp. Shown in drawer. |
| `compatibilityNote` | `string` (accessories only) | e.g. "Compatible with Apple devices." |
| `conditionNote` | `string` (devices only) | e.g. "Available in multiple conditions." |
| `bestFor` | `string` (devices only) | One tag: Work / Study / Office / Creator. Derived from category. |
| `productType` | `'device' \| 'accessory'` | Derived from `categorySlug`. Controls which drawer variant renders. |

**Fields that must NOT be added without real data:**
- `price`, `stock`, `ram`, `storage`, `batteryHealth`, `ptaStatus`, `modelYear`, `serialNumber`

---

## 10. Visual Rules

- Cards stay premium and clean. No heavy e-commerce look.
- Short detail text: secondary weight, small size (`text-sm`), muted color (`#6E6E73`).
- Max 2–3 chips or one short supporting line. No stacked paragraphs on the card.
- Card height increase: minimal. Acceptable if content genuinely needs it; do not force it.
- Drawer matches the existing Saved / Inquiry Bag drawer: right-side slide, overlay, same panel width, same close behavior, white background.
- No dark panels, no heavy shadows, no "Add to Cart" / "Buy Now" / "Checkout" language on device cards.
- WhatsApp green (`#25D366`) remains the WhatsApp CTA color.
- Primary inquiry CTA remains `#0071E3`.
- Pill-shaped buttons (`border-radius: 980px`). No gradients.
- Animation: `translateX(100%) → translateX(0)`, `0.6s ease-out`. Matches brand animation rules.

---

## 11. Accessibility Rules

- Drawer uses `role="dialog"` and `aria-modal="true"`.
- Drawer has `aria-labelledby` pointing to the product name heading inside it.
- Escape key closes the drawer.
- Focus is trapped inside the drawer while open.
- On close, focus returns to the trigger element (image/name/Details link).
- Close button: minimum 44×44px tap target. `aria-label="Close details"`.
- Image/name trigger: `aria-label="View quick details for [Product Name]"`.
- Overlay click closes the drawer (same as existing drawers).
- Focus ring visible on all interactive elements inside the drawer.

---

## 12. Files Likely Needed in Phase 15B

| File | Action | Notes |
|---|---|---|
| `components/ProductDetailsDrawer.tsx` | Create new | Right-side drawer. Accepts product object. Renders device or accessory variant. |
| `components/ProductCard.tsx` | Modify | Add trigger (image/name click), short detail bullets/chips. |
| `data/products.ts` | Modify | Add safe new fields: `detailSummary`, `detailBullets`, `confirmationPoints`, `compatibilityNote`, `conditionNote`, `bestFor`, `productType`. |
| `sections/FeaturedProducts.tsx` | Modify only if needed | Wire drawer open state if featured cards also need the trigger. |
| `context/ShopActionsContext.tsx` | Reuse or extend | Manage `detailsDrawerOpen` and `detailsProduct` state. Prefer extending existing context over creating a new one. |

No new routes. No new pages. No new layout files.

---

## 13. Forbidden Work

The following are explicitly out of scope for Phase 15A and Phase 15B:

- No `/products/[slug]` product detail pages
- No checkout flow
- No payment integration
- No backend or API
- No fake prices on any component
- No fake stock counts
- No fake specs (RAM, storage, PTA, battery, model year)
- No changes to Hero section
- No dark mode or dark design panels
- No "Buy Now" or "Checkout" buttons
- No full redesign of existing approved components

---

## 14. Approval Status

**Awaiting user approval.**

Once approved, Phase 15B begins with:
1. Adding safe data fields to `data/products.ts`
2. Building `ProductDetailsDrawer.tsx`
3. Wiring image/name click trigger on `ProductCard.tsx`
4. Adding short detail bullets/chips to cards
