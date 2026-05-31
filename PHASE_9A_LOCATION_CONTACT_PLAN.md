# PHASE_9A_LOCATION_CONTACT_PLAN.md
**Phase 9A — Location + Contact Sections · Planning Document**

---

## 1. Section Purpose

Two adjacent homepage sections that convert browsing intent into action.

**Location** answers: *"Where are you? Can I visit?"*
**Contact** answers: *"How do I get in touch right now?"*

Together they close the trust loop: Reviews confirms Afan Mac Store is reliable, Location confirms it is real and physically present, Contact gives the user a direct, frictionless way to act.

Both sections are homepage-only. Navbar Location and Contact anchor links will point to these sections. No separate `/location` or `/contact` pages will be created.

---

## 2. Placement

```
[Hero — paused]
[Category Strip — Phase 5B ✅]
[Featured Products — Phase 6B ✅]
[Reviews — Phase 8B ✅]
──────────────────────────────── ← Location section (Phase 9B)
──────────────────────────────── ← Contact section (Phase 9B)
[Future: Footer]
```

- **Homepage only** — `app/page.tsx`
- Location renders after `<Reviews />`
- Contact renders after `<Location />`
- `id="location"` on Location section — Navbar `href="/#location"` scrolls here
- `id="contact"` on Contact section — Navbar `href="/#contact"` scrolls here
- No `/location` page, no `/contact` page

---

## 3. Real Business Data

All data is real. Do not invent, alter, or add any address, phone number, email, or hours not listed here.

### Head Office

| Field | Value |
|---|---|
| Label | Head Office |
| Address | Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi |
| Google Maps URL | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` |
| Role | Primary location — featured prominently |

### Sub Office

| Field | Value |
|---|---|
| Label | Sub Office |
| Address | M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore |
| Google Maps URL | None provided — do not fabricate one |
| Role | Secondary location — simplified card |

### Business Hours

| Day(s) | Hours |
|---|---|
| Mon–Thu | 12 PM – 10 PM |
| Friday | 2:30 PM – 10 PM |
| Saturday | 12 PM – 10 PM |
| Sunday | Closed |

Business hours apply to the Head Office. Do not display hours for Sub Office unless user confirms separately.

### WhatsApp

Use `whatsappLink()` from `lib/constants.ts`. Never hardcode a `wa.me` URL.

### What is not provided

- No email address — do not display or fabricate one
- No phone call number — do not display or add a call button without explicit user approval
- No Sub Office Google Maps link — do not fabricate one
- No working hours for Sub Office — do not fabricate or assume

---

## 4. Location Section Structure

### Section identifiers

```html
<section id="location" aria-labelledby="location-heading">
```

### Section header (full-width)

| Element | Value |
|---|---|
| Overline | "Location" — 11px, uppercase, `tracking-[0.10em]`, `#AEAEB2` |
| `<h2>` | "Visit Afan Mac Store." |
| `<h2>` size | `clamp(1.75rem, 3.5vw + 0.25rem, 3rem)`, `font-semibold`, `#1D1D1F`, `tracking-[-0.02em]` |
| Subtext | "Find us at our Rawalpindi head office or contact us before visiting for current product availability." |
| Subtext size | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`, `#6E6E73`, `max-width: 560px` |
| Header margin bottom | `clamp(40px, 5vw, 56px)` |

### Card layout

**Desktop (≥ 1024px):** 2 columns, equal width, `32px` gap
**Tablet (640px – 1023px):** 2 columns, `24px` gap
**Mobile (< 640px):** 1 column, stacked, `24px` gap

Tailwind: `grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8`

---

### Head Office card (primary)

This is the featured card. It carries full detail.

| Element | Content |
|---|---|
| Badge / label | "Head Office" — small pill, `#F5F5F7` bg, `#6E6E73` text, `1px solid #E8E8ED` border |
| Icon | `Building2` (Lucide), `20px`, `#6E6E73` |
| Address | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" |
| Hours label | `Clock` icon + "Business Hours" label |
| Hours display | Mon–Thu: 12 PM – 10 PM · Friday: 2:30 PM – 10 PM · Saturday: 12 PM – 10 PM · Sunday: Closed |
| CTA 1 | **"Open in Google Maps"** — outline pill, `Navigation` icon, `href="https://maps.app.goo.gl/iy6teEPKaKBSQJENA"`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Open Head Office location in Google Maps"` |
| CTA 2 | **"WhatsApp Before Visiting"** — `#25D366` pill, `MessageCircle` icon, `whatsappLink()`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Chat on WhatsApp before visiting Head Office"` |

CTA order: "Open in Google Maps" first (informational) → "WhatsApp Before Visiting" second (conversion).

---

### Sub Office card (secondary)

Simpler card — no hours, no Maps CTA (no URL provided).

| Element | Content |
|---|---|
| Badge / label | "Sub Office" — same small pill style |
| Icon | `Building2` (Lucide), `20px`, `#6E6E73` |
| Address | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" |
| Note | "Contact us on WhatsApp before visiting." — `13px`, `#6E6E73` |
| CTA | **"Chat on WhatsApp"** — `#25D366` pill, `MessageCircle` icon, `whatsappLink()`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Chat on WhatsApp about Sub Office visit"` |

No "Open in Google Maps" on Sub Office — no URL was provided. Do not fabricate.

---

## 5. Contact Section Structure

The Contact section is intentionally compact. It is not a full repeated section with cards — it is a focused CTA band that converts users who have scrolled past Location and are ready to act.

### Section identifiers

```html
<section id="contact" aria-labelledby="contact-heading">
```

### Layout

Single centred column, max-width `680px`, text centred. No grid of cards.

```
[OVERLINE: Contact]
[H2: Need help choosing the right Apple product?]
[Subtext]

[Chat on WhatsApp]    ← primary CTA — full-width on mobile, auto-width on desktop

── divider ──

[Head Office address · Sub Office address · Business hours]
← secondary info row, compact, text-only
```

### Section header

| Element | Value |
|---|---|
| Overline | "Contact" — 11px, uppercase, `tracking-[0.10em]`, `#AEAEB2` |
| `<h2>` | "Need help choosing the right Apple product?" |
| `<h2>` size | `clamp(1.75rem, 3.5vw + 0.25rem, 3rem)`, `font-semibold`, `#1D1D1F`, `tracking-[-0.02em]` |
| Subtext | "Message us on WhatsApp for current availability, condition details, and guidance." |
| Subtext size | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`, `#6E6E73` |
| Header margin bottom | `32px` |

### Primary CTA

| Property | Value |
|---|---|
| Label | "Chat on WhatsApp" |
| Icon | `MessageCircle` (Lucide), `18px`, `strokeWidth={2}`, left of label |
| Style | `#25D366` solid pill, `#FFFFFF` text, hover `#1DAE56` |
| Min-height | `52px` |
| Border-radius | `9999px` |
| href | `whatsappLink()` from `lib/constants.ts` — custom message for Contact section |
| WhatsApp message | "Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?" |
| target | `_blank` |
| rel | `noopener noreferrer` |
| aria-label | `"Chat with Afan Mac Store on WhatsApp"` |

### Secondary info row

Below the CTA, separated by a light `1px solid #E8E8ED` divider, a compact three-item row:

| Item | Content | Icon |
|---|---|---|
| Head Office | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" | `MapPin` |
| Sub Office | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" | `MapPin` |
| Hours | "Mon–Thu 12–10 PM · Fri 2:30–10 PM · Sat 12–10 PM · Sun Closed" | `Clock` |

Row style:
- Horizontal flex, `justify-content: center`, `flex-wrap: wrap`, `gap: clamp(24px, 3vw, 40px)`
- Each item: icon + text, `13px`, `#6E6E73`
- Icons: `14px`, `aria-hidden="true"`, `focusable="false"`
- No interactive elements in secondary row (addresses are display-only)
- Compact — this is reference information, not a feature block

---

## 6. CTA Behaviour

| CTA | Location | Type | Action |
|---|---|---|---|
| "Open in Google Maps" | Head Office card | `<a>` | Opens `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` in new tab |
| "WhatsApp Before Visiting" | Head Office card | `<a>` | `whatsappLink()` with head office visit message |
| "Chat on WhatsApp" | Sub Office card | `<a>` | `whatsappLink()` with sub office visit message |
| "Chat on WhatsApp" | Contact section | `<a>` | `whatsappLink()` with general guidance message |

### WhatsApp message strings (per CTA)

| CTA | Suggested pre-filled message |
|---|---|
| Head Office "WhatsApp Before Visiting" | "Hi Afan Mac Store, I'm planning to visit your Rawalpindi store. Can you share current product availability?" |
| Sub Office "Chat on WhatsApp" | "Hi Afan Mac Store, I'm planning to visit your Lahore office. Can you guide me before I visit?" |
| Contact "Chat on WhatsApp" | "Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?" |

All via `whatsappLink(message)` — no hardcoded `wa.me` URLs anywhere.

All external links (`target="_blank"`): must include `rel="noopener noreferrer"`.

---

## 7. Business Hours Display

Displayed in the Head Office card and the Contact section secondary info row.

### Card format (Head Office card — full detail)

```
Mon–Thu      12 PM – 10 PM
Friday       2:30 PM – 10 PM
Saturday     12 PM – 10 PM
Sunday       Closed
```

Two-column text layout inside the card: day label left, hours right. "Sunday Closed" — "Closed" in `#AEAEB2` (muted) to visually distinguish it from open hours.

### Compact format (Contact section secondary row)

```
Mon–Thu 12–10 PM · Fri 2:30–10 PM · Sat 12–10 PM · Sun Closed
```

Single-line, condensed, `13px`, `#6E6E73`.

---

## 8. Visual Style Rules

### Both sections

| Property | Value |
|---|---|
| Section background | `#F5F5F7` |
| Section vertical padding | `clamp(64px, 8vw, 96px)` top and bottom |
| Max content width | `1200px`, centered, `px-4 md:px-8` |

### Location cards

| Property | Value |
|---|---|
| Card surface | `#FFFFFF` |
| Card border-radius | `18px` |
| Card border at rest | `1px solid #E8E8ED` |
| Card border on hover | `1px solid #D2D2D7` |
| Card shadow at rest | `0 1px 4px rgba(0,0,0,0.05)` |
| Card shadow on hover | `0 2px 10px rgba(0,0,0,0.07)` |
| Card padding | `24px` |
| Card hover transform | `translateY(-2px)` |
| Card hover transition | `0.22s ease` |

Cards are **non-interactive wrappers** — the hover lift applies to the card surface only. The interactive elements are the CTA buttons inside.

### Buttons / CTAs

| Button | Style |
|---|---|
| "Open in Google Maps" | Outline pill — `1.5px solid #0071E3`, `#0071E3` text, `transparent` bg, hover `rgba(0,113,227,0.06)` bg |
| WhatsApp CTAs | `#25D366` pill, `#FFFFFF` text, hover `#1DAE56` |
| All buttons | `border-radius: 9999px`, `min-height: 44px`, `font-weight: 500` |
| Icons in buttons | 16px, `strokeWidth={2}`, left of label, `aria-hidden="true"` |

### Lucide icons (informational)

| Use | Icon | Size | Color |
|---|---|---|---|
| Location marker | `MapPin` | 18–20px | `#6E6E73` |
| Business hours | `Clock` | 18px | `#6E6E73` |
| WhatsApp CTA icon | `MessageCircle` | 16–18px | `#FFFFFF` (in button) |
| Maps CTA icon | `Navigation` | 16px | `#0071E3` (in button) |
| Building / office | `Building2` | 20px | `#6E6E73` |

All decorative icons: `aria-hidden="true"`, `focusable="false"`.

### Forbidden visuals

- No dark section or black background
- No loud gradients
- No external images of any kind
- No Apple logo or trademark
- No Google logo or icon
- No fake map screenshot or map embed image
- No profile photos
- No fabricated addresses or phone numbers

---

## 9. Accessibility Rules

| Concern | Rule |
|---|---|
| Location section | `<section id="location" aria-labelledby="location-heading">` |
| Contact section | `<section id="contact" aria-labelledby="contact-heading">` |
| `<h2>` elements | `id="location-heading"` and `id="contact-heading"` — matching `aria-labelledby` |
| Location cards | `<article>` or `<div>` — non-interactive card wrapper; no role required if not interactive |
| CTA links | `<a>` with `aria-label` describing destination and action (see Section 6) |
| External links | All `target="_blank"` links must have `rel="noopener noreferrer"` |
| Icon accessibility | All Lucide icons: `aria-hidden="true"`, `focusable="false"` |
| Hours table | Plain `<dl>` (definition list) or two-column `<div>` pairs — not `<table>` unless content warrants it |
| Focus ring | All `<a>` and `<button>` elements: `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` |
| Min tap target | All CTAs: `min-height: 44px` |
| Color contrast | `#1D1D1F` on `#FFFFFF` = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). `#FFFFFF` on `#25D366` = 3.03:1 (AA large text at 44px+). `#0071E3` on `#FFFFFF` = 4.65:1 (AA). All pass. |
| No horizontal overflow | `max-width: 1200px`, `px-4 md:px-8`, `flex-wrap: wrap` on info rows |
| `letterSpacing: "normal"` | On all non-overline text elements |

---

## 10. Files to Create / Change in Phase 9B

| File | Action | Notes |
|---|---|---|
| `data/locations.ts` | **Create** | `Location` interface + Head Office + Sub Office objects |
| `sections/Location.tsx` | **Create** | `"use client"` — section header, 2-column card grid, CTAs |
| `sections/Contact.tsx` | **Create** | Can be Server Component if no hover state needed — CTA band, secondary info row |
| `app/page.tsx` | **Update** | Add `<Location />` after `<Reviews />`, add `<Contact />` after `<Location />` |
| `components/Navbar.tsx` | **Update** | Fix `#location` → `/#location` and `#contact` → `/#contact` in `NAV_LINKS` (same pattern as `/#reviews` fix in Phase 8B) |
| `PHASE_9B_LOCATION_CONTACT_REPORT.md` | **Create** | Phase 9B completion report |

### Files explicitly NOT touched in Phase 9B

| File | Status |
|---|---|
| `sections/Hero.tsx` | ✅ Not modified — Hero is paused |
| `sections/Categories.tsx` | ✅ Not modified |
| `sections/FeaturedProducts.tsx` | ✅ Not modified |
| `sections/Reviews.tsx` | ✅ Not modified |
| `app/layout.tsx` | ✅ Not modified |
| `app/globals.css` | ✅ Not modified |
| `data/categories.ts` | ✅ Not modified |
| `data/featured-products.ts` | ✅ Not modified |
| `data/products.ts` | ✅ Not modified |
| `data/reviews.ts` | ✅ Not modified |
| `lib/constants.ts` | ✅ Not modified — `whatsappLink()` imported, not changed |
| `components/ProductCard.tsx` | ✅ Not modified |
| Any product listing page | ✅ Not modified |

---

## 11. Navbar Anchor Note

From Phase 7C QA, current Navbar `NAV_LINKS`:

| Link | Current href | Required href after Phase 9B |
|---|---|---|
| Reviews | `/#reviews` | ✅ Already fixed (Phase 8B) |
| Location | `#location` | ❌ Needs fix → `/#location` |
| Contact | `#contact` | ❌ Needs fix → `/#contact` |

**Phase 9B must update `components/Navbar.tsx`:**
```ts
// Before
{ label: "Location", href: "#location", hasDropdown: false },
{ label: "Contact",  href: "#contact",  hasDropdown: false },

// After
{ label: "Location", href: "/#location", hasDropdown: false },
{ label: "Contact",  href: "/#contact",  hasDropdown: false },
```

This is a one-line change per link — same pattern as the `#reviews` → `/#reviews` fix in Phase 8B. No visual Navbar change. Both desktop and mobile menus use the same `NAV_LINKS` array, so both are fixed simultaneously.

Reason: Location and Contact sections exist only on the homepage. The Navbar is global (rendered on product pages too). Without `/#`, clicking Location from `/products/macbook` would scroll within the product page (no-op) instead of navigating home first.

---

## 12. What NOT to Build in Phase 9B

| Item | Why excluded |
|---|---|
| `/location` page | Not planned — homepage section only |
| `/contact` page | Not planned — homepage section only |
| Contact form | No backend — permanently out of scope |
| Email address field | No email provided by user — do not fabricate |
| Phone call button | No phone number approved for display — do not add |
| Map embed (iframe) | Not approved — requires separate explicit user confirmation |
| Fake map screenshot | Forbidden — no external images |
| Google logo or icon | Forbidden |
| Apple logo or trademark | Forbidden |
| Fabricated Sub Office hours | Sub Office hours not provided — do not invent |
| Sub Office Google Maps CTA | No Maps URL provided for Sub Office — do not fabricate |
| Dark section | Explicitly forbidden |
| External images of any kind | Forbidden |
| New npm packages | None required |
| Checkout, payment, backend, CMS, admin | Permanently out of scope |
| Footer | Separate phase |
| Phase 10 or later work | Not started |
| Hero changes | Hero is paused — not touched |

---

## 13. Completion Checklist

*(To be verified at end of Phase 9B)*

**Data**
- [ ] `data/locations.ts` created with `Location` interface
- [ ] Head Office object: `id`, `label`, `address`, `mapsUrl`, `hours`, `isPrimary: true`
- [ ] Sub Office object: `id`, `label`, `address`, `isPrimary: false` (no `mapsUrl`, no `hours`)
- [ ] No fabricated addresses, no fabricated phone numbers, no fabricated emails
- [ ] Addresses match Section 3 exactly

**Location section**
- [ ] `<section id="location" aria-labelledby="location-heading">`
- [ ] `<h2 id="location-heading">` reads "Visit Afan Mac Store."
- [ ] Overline reads "Location"
- [ ] Subtext matches Section 4
- [ ] 2-column card grid on desktop (sm:grid-cols-2), 1-column mobile
- [ ] Head Office card: address + hours + "Open in Google Maps" CTA + "WhatsApp Before Visiting" CTA
- [ ] "Open in Google Maps" opens `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` in new tab
- [ ] Sub Office card: address + note + "Chat on WhatsApp" CTA
- [ ] No "Open in Google Maps" on Sub Office card (no URL provided)
- [ ] All `<a>` elements: `target="_blank"`, `rel="noopener noreferrer"`, `aria-label`
- [ ] All WhatsApp links use `whatsappLink()` — no hardcoded `wa.me` URLs
- [ ] No map embed, no fake map image, no Google logo

**Contact section**
- [ ] `<section id="contact" aria-labelledby="contact-heading">`
- [ ] `<h2 id="contact-heading">` reads "Need help choosing the right Apple product?"
- [ ] Overline reads "Contact"
- [ ] Subtext matches Section 5
- [ ] "Chat on WhatsApp" primary CTA: `#25D366` pill, `min-height: 52px`, `whatsappLink()`
- [ ] Secondary info row: Head Office address · Sub Office address · Hours
- [ ] Secondary info is display-only — no interactive elements
- [ ] No contact form, no email field, no phone call button

**CTAs (all)**
- [ ] All CTA buttons: `border-radius: 9999px`, `min-height: 44px`
- [ ] "Open in Google Maps": outline `#0071E3` pill
- [ ] WhatsApp CTAs: `#25D366` fill pill, hover `#1DAE56`
- [ ] `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements

**Visual**
- [ ] Both section backgrounds: `#F5F5F7`
- [ ] Location cards: `#FFFFFF`, `border: 1px solid #E8E8ED`, `border-radius: 18px`
- [ ] Card hover: `translateY(-2px)`, border `#D2D2D7`, shadow `0 2px 10px rgba(0,0,0,0.07)`
- [ ] No dark section, no external images, no Apple logo, no Google logo
- [ ] `letterSpacing: "normal"` on all non-overline text

**Navbar**
- [ ] `#location` → `/#location` in `NAV_LINKS`
- [ ] `#contact` → `/#contact` in `NAV_LINKS`
- [ ] No other Navbar changes
- [ ] Navbar visual design unchanged

**Homepage integration**
- [ ] `<Location />` imported and rendered after `<Reviews />` in `app/page.tsx`
- [ ] `<Contact />` imported and rendered after `<Location />` in `app/page.tsx`
- [ ] `sections/Hero.tsx`, `sections/Reviews.tsx`, `sections/FeaturedProducts.tsx`, `sections/Categories.tsx` NOT modified

**TypeScript**
- [ ] `npx tsc --noEmit` → zero errors

---

## 14. Approval Status

**Awaiting user approval before Phase 9B code begins.**

No code will be written until this plan is explicitly approved.

---

*Phase 9A · Location + Contact Sections Plan · Version 1.0 · 2026-05-28*
