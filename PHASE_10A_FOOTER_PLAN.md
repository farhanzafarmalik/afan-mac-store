# PHASE_10A_FOOTER_PLAN.md
**Phase 10A — Footer · Planning Document**

---

## 1. Footer Purpose

The footer is the final layer of every page. It serves three jobs:

1. **Completion** — the site no longer ends abruptly after Contact. Every page has a proper close.
2. **Navigation safety net** — users who have scrolled to the bottom can quickly reach products, reviews, location, and WhatsApp without scrolling back to the top.
3. **Trust reinforcement** — business identity, address, hours, and independent reseller note appear persistently on every route.

The tone stays premium and minimal. This is not a marketplace footer with badges, payment icons, and policy links. It is a focused, credible close for a WhatsApp-led Apple reseller.

---

## 2. Global Placement Strategy

### Confirmed layout structure (`app/layout.tsx`)

```tsx
<html>
  <body className="pt-14 md:pt-16">
    <Navbar />        ← already global
    {children}        ← page content
    <Footer />        ← Phase 10B: add here
  </body>
</html>
```

`app/layout.tsx` already renders `<Navbar />` globally before `{children}`. Adding `<Footer />` after `{children}` — and before `</body>` — mirrors this pattern exactly. No changes to Navbar or any page file are required for placement.

**Result:** Footer appears on every route automatically:
- Homepage (`/`)
- All Products page (`/products`)
- All 8 category pages (`/products/macbook`, `/products/iphone`, etc.)
- Any future pages

### No footer-per-page approach

There is no need to import Footer into individual page files. The layout-level placement is the correct approach and requires modifying only `app/layout.tsx`.

### Footer position on homepage

```
[Hero — paused]
[Category Strip]
[Featured Products]
[Reviews]
[Location]
[Contact]
──────────────── ← Footer (via layout)
```

The Contact section ends with `paddingBottom: clamp(64px, 8vw, 96px)`. The footer's `borderTop: 1px solid #E8E8ED` provides a clean visual break from Contact without a gap.

---

## 3. Footer Content Groups

The footer is divided into four content columns on desktop.

### Column 1 — Brand

| Element | Content |
|---|---|
| Store name | "Afan Mac Store" — `font-weight: 600`, `#1D1D1F`, `16px` |
| Brand line | "Trusted Apple products, clear guidance, and WhatsApp support in Pakistan." — `14px`, `#6E6E73`, `max-width: 220px` |
| WhatsApp CTA | "Chat on WhatsApp" — `#25D366` pill, `MessageCircle` icon, `whatsappLink()`, `min-height: 40px` |

No Apple logo. No "Official Apple Store". No trademark claim. No external images.

---

### Column 2 — Quick Links

| Label | href |
|---|---|
| Home | `/` |
| Products | `/products` |
| Reviews | `/#reviews` |
| Location | `/#location` |
| Contact | `/#contact` |

5 links. Matches the Navbar `NAV_LINKS` destinations (using `/#` prefix for anchor links — same fix already applied in Navbar).

---

### Column 3 — Products

| Label | href |
|---|---|
| MacBook | `/products/macbook` |
| iPhone | `/products/iphone` |
| iPad | `/products/ipad` |
| Mac mini | `/products/mac-mini` |
| iMac | `/products/imac` |
| Apple Watch | `/products/apple-watch` |
| AirPods | `/products/airpods` |
| Accessories | `/products/accessories` |

8 links. Matches `PRODUCT_CATEGORIES` in Navbar (the dropdown links).

---

### Column 4 — Visit / Contact

| Element | Content |
|---|---|
| Head Office label | "Head Office" — `12px`, `#AEAEB2`, uppercase |
| Head Office address | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" |
| Sub Office label | "Sub Office" — `12px`, `#AEAEB2`, uppercase |
| Sub Office address | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" |
| Hours label | "Hours" — `12px`, `#AEAEB2`, uppercase |
| Hours | Mon–Thu: 12 PM – 10 PM · Friday: 2:30 PM – 10 PM · Saturday: 12 PM – 10 PM · Sunday: Closed |
| Google Maps link | "Open in Google Maps" → `https://maps.app.goo.gl/iy6teEPKaKBSQJENA`, `target="_blank"`, `rel="noopener noreferrer"` |
| WhatsApp link | "WhatsApp us" → `whatsappLink()`, `target="_blank"`, `rel="noopener noreferrer"` |

No email. No phone number. No fabricated Sub Office hours. No Sub Office Google Maps link.

---

## 4. Exact Links

All internal links use Next.js `<Link>`. All external links use `<a>` with `target="_blank"` and `rel="noopener noreferrer"`.

| Link | Type | href |
|---|---|---|
| Home | Internal | `/` |
| Products | Internal | `/products` |
| Reviews | Internal | `/#reviews` |
| Location | Internal | `/#location` |
| Contact | Internal | `/#contact` |
| MacBook | Internal | `/products/macbook` |
| iPhone | Internal | `/products/iphone` |
| iPad | Internal | `/products/ipad` |
| Mac mini | Internal | `/products/mac-mini` |
| iMac | Internal | `/products/imac` |
| Apple Watch | Internal | `/products/apple-watch` |
| AirPods | Internal | `/products/airpods` |
| Accessories | Internal | `/products/accessories` |
| Open in Google Maps | External | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` |
| Brand column WhatsApp CTA | External | `whatsappLink("Hi Afan Mac Store, I'm interested in Apple products. Can you guide me?")` |
| Visit column WhatsApp link | External | `whatsappLink("Hi Afan Mac Store, I'd like to get in touch. Can you help me?")` |

---

## 5. Real Business Details

All data is real. Do not invent, alter, or add any address, phone number, email, or hours not listed here.

| Field | Value |
|---|---|
| Head Office | Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi |
| Sub Office | M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore |
| Head Office Google Maps | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` |
| Sub Office Google Maps | None — do not fabricate |
| Sub Office hours | None — do not fabricate |
| Mon–Thu hours | 12 PM – 10 PM |
| Friday hours | 2:30 PM – 10 PM |
| Saturday hours | 12 PM – 10 PM |
| Sunday | Closed |
| WhatsApp | `whatsappLink()` from `lib/constants.ts` — never hardcode `wa.me` |

---

## 6. CTA Behaviour

### Brand column WhatsApp CTA

| Property | Value |
|---|---|
| Label | "Chat on WhatsApp" |
| Icon | `MessageCircle`, `15px`, `strokeWidth={2}`, `aria-hidden="true"` |
| Style | `#25D366` pill, `#FFFFFF` text, hover `#1DAE56`, `min-height: 40px` |
| href | `whatsappLink("Hi Afan Mac Store, I'm interested in Apple products. Can you guide me?")` |
| target / rel | `_blank` / `noopener noreferrer` |
| aria-label | `"Chat with Afan Mac Store on WhatsApp"` |

### Visit column WhatsApp link

A smaller text-style link (not a pill button) — keeps the visit column compact.

| Property | Value |
|---|---|
| Label | "WhatsApp us" |
| Style | `#25D366` text color, `13px`, no background, hover underline |
| href | `whatsappLink("Hi Afan Mac Store, I'd like to get in touch. Can you help me?")` |
| target / rel | `_blank` / `noopener noreferrer` |
| aria-label | `"Contact Afan Mac Store on WhatsApp"` |

### Google Maps link (Visit column)

| Property | Value |
|---|---|
| Label | "Open in Google Maps" |
| Style | `#0071E3` text, `13px`, no background, hover underline |
| href | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` |
| target / rel | `_blank` / `noopener noreferrer` |
| aria-label | `"Open Head Office in Google Maps"` |

---

## 7. Visual Style Rules

### Footer wrapper

| Property | Value |
|---|---|
| Background | `#FFFFFF` — clean break from Contact section's `#F5F5F7` |
| Top border | `1px solid #E8E8ED` — visual separator from Contact section |
| No bottom border | — |

Using `#FFFFFF` creates a clear, premium visual break from the `#F5F5F7` Contact section above. The `1px solid #E8E8ED` top border replaces the need for a large spacing gap.

### Footer inner content area

| Property | Value |
|---|---|
| Max width | `1200px`, centered |
| Horizontal padding | `px-4 md:px-8` |
| Top padding | `clamp(40px, 5vw, 56px)` |
| Bottom padding (above bottom bar) | `clamp(32px, 4vw, 48px)` |

### Column headings

| Property | Value |
|---|---|
| Label text | e.g. "Quick Links", "Products", "Visit" |
| Font size | `11px` |
| Color | `#AEAEB2` |
| Text transform | uppercase |
| Letter spacing | `0.10em` |
| Margin bottom | `14px` |

### Footer links (navigation columns)

| Property | Value |
|---|---|
| Font size | `14px` |
| Color at rest | `#6E6E73` |
| Color on hover | `#0071E3` |
| Text decoration | none at rest; none on hover (color change only) |
| Line height | `1.6` |
| Letter spacing | `normal` |
| Transition | `color 0.15s ease` |

### Address / hours text

| Property | Value |
|---|---|
| Font size | `13px` |
| Color | `#6E6E73` |
| Line height | `1.5` |
| Letter spacing | `normal` |
| `whiteSpace` on hours values | `nowrap` (same fix applied in Location section — prevents "10 PM" from clipping) |

### Footer bottom bar

| Property | Value |
|---|---|
| Border top | `1px solid #E8E8ED` |
| Padding | `16px 0` |
| Layout | Flex row — copyright left, reseller note right (stacks on mobile) |
| Copyright font | `12px`, `#AEAEB2` |
| Reseller note | `12px`, `#AEAEB2` |
| Copyright text | `© {currentYear} Afan Mac Store. All rights reserved.` |
| Reseller note text | `"Afan Mac Store is an independent Apple reseller."` |

`currentYear` is rendered dynamically via `new Date().getFullYear()` — never hardcoded.

### Forbidden visuals

- No dark footer or black background
- No Apple logo or trademark
- No Google logo or icon
- No social media icons (no real links provided)
- No payment icons or trust badges
- No newsletter signup
- No external images
- No "Official Apple Store" or any claim of Apple affiliation
- No loud gradients

---

## 8. Responsive Behaviour

| Viewport | Grid | Gap |
|---|---|---|
| Mobile (`< 640px`) | 1 column — all columns stacked | `32px` |
| Tablet (`640px – 1023px`) | 2 columns — Brand+Quick Links top row, Products+Visit bottom row | `32px` |
| Desktop (`≥ 1024px`) | 4 columns, equal or weighted | `32px` |

Tailwind: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8`

### Column width weighting (desktop)

All four columns at `1fr` is acceptable. Alternatively, give Brand and Visit columns slightly more width:

```
grid-template-columns: 1.25fr 0.75fr 0.75fr 1.25fr
```

This gives Brand room for the tagline and Visit room for the addresses. Evaluate during Phase 10B; default to `grid-cols-4` first.

### Bottom bar responsive

- Desktop: single `flex-row` — copyright left, reseller note right
- Mobile: `flex-col gap-2` — stacked, both centred or left-aligned

### Products column on mobile

8 product links stacked will be tall. Consider a 2-column sub-grid inside the Products column on small screens:
- `grid grid-cols-2` inside the Products column when mobile — 4 rows of 2 instead of 8 rows of 1
- This keeps the mobile footer from being excessively long

---

## 9. Accessibility Rules

| Concern | Rule |
|---|---|
| Semantic element | `<footer>` — not `<div>` |
| Navigation groups | Each link column wrapped in `<nav aria-label="...">` or `<div role="navigation" aria-label="...">` |
| Column nav labels | "Quick links", "Product categories", "Visit and contact" |
| All nav links | `<Link>` (Next.js) — correct routing, no full page reloads |
| External links | `target="_blank"` + `rel="noopener noreferrer"` on Maps and WhatsApp links |
| WhatsApp CTA | `aria-label="Chat with Afan Mac Store on WhatsApp"` |
| Maps link | `aria-label="Open Head Office in Google Maps"` |
| Icons | `aria-hidden="true"`, `focusable="false"` on all Lucide icons |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Min tap target | WhatsApp pill CTA: `min-height: 40px` |
| Color contrast | `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). `#AEAEB2` on `#FFFFFF` = 2.73:1 — headings and copyright at 11–12px decorative only. All interactive text `#6E6E73` or `#0071E3` passes AA. |
| No horizontal overflow | `max-width: 1200px`, `px-4 md:px-8`, `flex-wrap` on bottom bar |
| `letterSpacing: "normal"` | All non-overline text |

---

## 10. Files to Create / Change in Phase 10B

| File | Action | Notes |
|---|---|---|
| `components/Footer.tsx` | **Create** | Server Component — static links, no client state needed |
| `app/layout.tsx` | **Update** | Import `Footer`, render after `{children}` |
| `PHASE_10B_FOOTER_REPORT.md` | **Create** | Phase 10B completion report |

### Note on data file

A separate `data/footer-links.ts` is **not recommended**. The footer link arrays (Quick Links, Products) are short and entirely static. Defining them as local `const` arrays inside `components/Footer.tsx` keeps the component self-contained and avoids unnecessary file proliferation. This mirrors how `NAV_LINKS` and `PRODUCT_CATEGORIES` are defined locally in `components/Navbar.tsx`.

### Files explicitly NOT touched in Phase 10B

| File | Status |
|---|---|
| `sections/Hero.tsx` | ✅ Not modified — Hero is paused |
| `sections/Categories.tsx` | ✅ Not modified |
| `sections/FeaturedProducts.tsx` | ✅ Not modified |
| `sections/Reviews.tsx` | ✅ Not modified |
| `sections/Location.tsx` | ✅ Not modified |
| `sections/Contact.tsx` | ✅ Not modified |
| `components/Navbar.tsx` | ✅ Not modified |
| `app/globals.css` | ✅ Not modified |
| `data/` (all files) | ✅ Not modified |
| `lib/constants.ts` | ✅ Not modified — `whatsappLink()` imported only |
| Any product listing page | ✅ Not modified |

---

## 11. What NOT to Build in Phase 10B

| Item | Why excluded |
|---|---|
| Newsletter signup | No backend — permanently out of scope |
| Email field | No email provided — do not fabricate |
| Contact form | No backend — permanently out of scope |
| Phone call button / phone number | Not provided — do not fabricate |
| Social media icons | No real links provided by user |
| Payment icons | No checkout — permanently out of scope |
| Privacy Policy / Terms page | Pages do not exist — do not link to non-existent routes |
| Shipping / return policy links | Pages do not exist — do not link |
| Dark footer or black background | Explicitly forbidden |
| Apple logo or trademark | Forbidden — no exceptions |
| Google logo or icon | Forbidden |
| Fake map image or map embed | Forbidden |
| "Official Apple Store" claim | Forbidden — reseller only |
| Sub Office Google Maps link | Not provided — do not fabricate |
| Sub Office business hours | Not provided — do not fabricate |
| Hardcoded `wa.me` links | Forbidden — all via `whatsappLink()` |
| External images | Forbidden |
| New npm packages | None required |
| Backend, CMS, database, admin | Permanently out of scope |
| Hero changes | Hero is paused — not touched |
| Phase 11 or later work | Not started |
| `/footer` page | No such route — `<footer>` is layout-level only |

---

## 12. Completion Checklist

*(To be verified at end of Phase 10B)*

**Component**
- [ ] `components/Footer.tsx` created as a Server Component (no `"use client"` needed)
- [ ] `app/layout.tsx` updated: `<Footer />` imported and rendered after `{children}`
- [ ] Footer visible on `/`, `/products`, `/products/macbook`, and all other routes

**Structure**
- [ ] `<footer>` semantic element used (not `<div>`)
- [ ] Footer background `#FFFFFF`, top border `1px solid #E8E8ED`
- [ ] 4-column desktop grid, 2-column tablet, 1-column mobile

**Brand column**
- [ ] "Afan Mac Store" store name renders
- [ ] Brand tagline: "Trusted Apple products, clear guidance, and WhatsApp support in Pakistan."
- [ ] WhatsApp CTA: "Chat on WhatsApp" — `#25D366` pill, `min-height: 40px`, `whatsappLink()`
- [ ] No Apple logo, no "Official Apple Store"

**Quick Links column**
- [ ] All 5 links render with correct hrefs: `/`, `/products`, `/#reviews`, `/#location`, `/#contact`
- [ ] Links use Next.js `<Link>` component

**Products column**
- [ ] All 8 product category links render with correct hrefs
- [ ] Links use Next.js `<Link>` component
- [ ] On mobile: sub-grid `grid-cols-2` inside Products column to avoid excessive height

**Visit / Contact column**
- [ ] Head Office address renders exactly: "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi"
- [ ] Sub Office address renders exactly: "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore"
- [ ] Business hours render — Mon–Thu, Friday, Saturday, Sunday (all 4 rows)
- [ ] Hours values have `whiteSpace: "nowrap"` — "10 PM" never clips
- [ ] "Open in Google Maps" → `https://maps.app.goo.gl/iy6teEPKaKBSQJENA`, `_blank`, `noopener noreferrer`
- [ ] "WhatsApp us" text link → `whatsappLink()`, `_blank`, `noopener noreferrer`
- [ ] No Sub Office Maps link, no Sub Office hours

**Bottom bar**
- [ ] `© {currentYear} Afan Mac Store. All rights reserved.` — year via `new Date().getFullYear()`
- [ ] "Afan Mac Store is an independent Apple reseller." note renders
- [ ] `1px solid #E8E8ED` top border on bottom bar
- [ ] Flex row desktop / stacked mobile

**Links and CTAs**
- [ ] All internal links: Next.js `<Link>` — no `<a>` for internal routes
- [ ] All external links: `target="_blank"` + `rel="noopener noreferrer"`
- [ ] All WhatsApp links via `whatsappLink()` — no hardcoded `wa.me`
- [ ] Link hover color: `#0071E3`
- [ ] Focus ring: `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements

**Accessibility**
- [ ] `<footer>` semantic element
- [ ] Navigation column groups have `aria-label`
- [ ] All icons: `aria-hidden="true"`, `focusable="false"`
- [ ] External link `aria-label` values set
- [ ] No horizontal overflow

**Forbidden**
- [ ] No Apple logo, no Google logo
- [ ] No dark background
- [ ] No newsletter, email, contact form, phone number
- [ ] No social icons
- [ ] No payment icons
- [ ] No "Official Apple Store"
- [ ] No hardcoded `wa.me`

**TypeScript**
- [ ] `npx tsc --noEmit` → zero errors

---

## 13. Approval Status

**Awaiting user approval before Phase 10B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 10A · Footer Plan · Version 1.0 · 2026-05-28*
