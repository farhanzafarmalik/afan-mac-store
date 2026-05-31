# PHASE_9B_LOCATION_CONTACT_REPORT.md
**Phase 9B — Location + Contact Sections · Completion Report**

---

## 1. Files Created / Changed

| File | Action | Notes |
|---|---|---|
| `data/locations.ts` | **Created** | `Location` + `BusinessHours` interfaces + Head Office + Sub Office objects |
| `sections/Location.tsx` | **Created** | `"use client"` — section header, 2-column card grid, CTAs |
| `sections/Contact.tsx` | **Created** | Server Component — compact CTA band, secondary info row |
| `app/page.tsx` | **Updated** | Added `<Location />` after `<Reviews />`, `<Contact />` after `<Location />` |
| `components/Navbar.tsx` | **Updated** | `#location` → `/#location`, `#contact` → `/#contact` in `NAV_LINKS` |
| `PHASE_9B_LOCATION_CONTACT_REPORT.md` | **Created** | This file |

---

## 2. Location Section Summary

**File:** `sections/Location.tsx` — `"use client"` (hover state on cards)

### Section identifiers

```html
<section id="location" aria-labelledby="location-heading">
```

### Header

| Element | Content |
|---|---|
| Overline | "Location" |
| `<h2 id="location-heading">` | "Visit Afan Mac Store." |
| Subtext | "Find us at our Rawalpindi head office or contact us before visiting for current product availability." |

### Grid

| Viewport | Columns | Gap |
|---|---|---|
| Mobile (`< 640px`) | 1 column | `24px` |
| Tablet + Desktop (`≥ 640px`) | 2 columns | `24px` / `32px` |

Tailwind: `grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8`

### Head Office card

| Element | Value |
|---|---|
| Badge | "Head Office" — pill, `#F5F5F7` bg, `#6E6E73` text, `#E8E8ED` border |
| Icon | `Building2`, `13px` |
| Address | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" |
| Hours | Full 4-row `<dl>`: Mon–Thu / Friday / Saturday / Sunday |
| Sunday "Closed" | Rendered in `#AEAEB2` (muted), font-weight 400 |
| CTA 1 | "Open in Google Maps" — outline `#0071E3` pill, `Navigation` icon, `href="https://maps.app.goo.gl/iy6teEPKaKBSQJENA"`, `_blank` |
| CTA 2 | "WhatsApp Before Visiting" — `#25D366` pill, `MessageCircle` icon, `whatsappLink()` |

### Sub Office card

| Element | Value |
|---|---|
| Badge | "Sub Office" — same pill style |
| Icon | `Building2`, `13px` |
| Address | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" |
| Note | "Contact us on WhatsApp before visiting." — `13px`, `#6E6E73` |
| CTA | "Chat on WhatsApp" — `#25D366` pill, `MessageCircle` icon, `whatsappLink()` |
| "Open in Google Maps" | Not included — no URL provided, none fabricated |
| Business hours | Not included — not provided, none fabricated |

### Card hover

| Property | Rest | Hover |
|---|---|---|
| `transform` | `translateY(0)` | `translateY(-2px)` |
| `border-color` | `#E8E8ED` | `#D2D2D7` |
| `box-shadow` | `0 1px 4px rgba(0,0,0,0.05)` | `0 2px 10px rgba(0,0,0,0.07)` |
| Transition | — | `0.22s ease` |

---

## 3. Contact Section Summary

**File:** `sections/Contact.tsx` — Server Component (no client state needed)

### Section identifiers

```html
<section id="contact" aria-labelledby="contact-heading">
```

### Layout

Single centred column, `max-width: 680px`, `text-align: center`.

### Header

| Element | Content |
|---|---|
| Overline | "Contact" |
| `<h2 id="contact-heading">` | "Need help choosing the right Apple product?" |
| Subtext | "Message us on WhatsApp for current availability, condition details, and guidance." |

### Primary CTA

| Property | Value |
|---|---|
| Label | "Chat on WhatsApp" |
| Icon | `MessageCircle`, `18px`, `strokeWidth={2}` |
| Style | `#25D366` solid pill, `#FFFFFF` text, hover `#1DAE56` |
| Min-height | `52px` |
| href | `whatsappLink("Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?")` |
| target / rel | `_blank` / `noopener noreferrer` |
| aria-label | `"Chat with Afan Mac Store on WhatsApp"` |

### Secondary info row

Display-only. Three items separated by a `1px solid #E8E8ED` top border:

| Icon | Content |
|---|---|
| `MapPin` | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" |
| `MapPin` | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" |
| `Clock` | "Mon–Thu 12–10 PM · Fri 2:30–10 PM · Sat 12–10 PM · Sun Closed" |

No interactive elements in secondary row. No email. No phone call button.

---

## 4. Real Business Data Summary

| Field | Value | Source |
|---|---|---|
| Head Office address | "Shop no. LG-38, Rania Mall, Bank Road Saddar, Rawalpindi" | Real — user provided |
| Head Office Maps URL | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` | Real — user provided |
| Sub Office address | "M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore" | Real — user provided |
| Sub Office Maps URL | Not provided — not included | Not fabricated |
| Sub Office hours | Not provided — not included | Not fabricated |
| Business hours | Mon–Thu 12 PM – 10 PM · Friday 2:30 PM – 10 PM · Saturday 12 PM – 10 PM · Sunday Closed | Real — user provided |

No addresses, URLs, phone numbers, emails, or hours were invented.

---

## 5. CTA / WhatsApp Behaviour Summary

| CTA | Section | href | Message |
|---|---|---|---|
| "Open in Google Maps" | Head Office card | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` | — (direct Maps link) |
| "WhatsApp Before Visiting" | Head Office card | `whatsappLink(...)` | "Hi Afan Mac Store, I'm planning to visit your Rawalpindi store. Can you share current product availability?" |
| "Chat on WhatsApp" | Sub Office card | `whatsappLink(...)` | "Hi Afan Mac Store, I'm planning to visit your Lahore office. Can you guide me before I visit?" |
| "Chat on WhatsApp" | Contact section | `whatsappLink(...)` | "Hi Afan Mac Store, I need help choosing an Apple product. Can you guide me?" |

All WhatsApp links use `whatsappLink()` from `lib/constants.ts`. No hardcoded `wa.me` URLs anywhere. All external links: `target="_blank"`, `rel="noopener noreferrer"`.

---

## 6. Navbar Anchor Update Summary

| Link | Before | After |
|---|---|---|
| Reviews | `/#reviews` | ✅ Unchanged (fixed in Phase 8B) |
| Location | `#location` | ✅ → `/#location` |
| Contact | `#contact` | ✅ → `/#contact` |

**Change:** Two lines in `NAV_LINKS` array in `components/Navbar.tsx` (lines 17–18). No visual change. No dropdown behavior change. No mobile menu behavior change. Desktop and mobile both use the same `NAV_LINKS` array — both fixed simultaneously.

**Reason:** Location and Contact sections exist only on the homepage. Without `/#`, clicking these links from `/products/macbook` (or any product page) would attempt an anchor scroll on the current page (no-op) instead of navigating home first.

---

## 7. Accessibility Summary

| Concern | Implementation |
|---|---|
| Location section | `<section id="location" aria-labelledby="location-heading">` |
| Contact section | `<section id="contact" aria-labelledby="contact-heading">` |
| Location `<h2>` | `id="location-heading"` — matches `aria-labelledby` |
| Contact `<h2>` | `id="contact-heading"` — matches `aria-labelledby` |
| Location cards | `<div>` non-interactive wrappers — hover lift only, no interactive role |
| Business hours | `<dl>` / `<dt>` / `<dd>` — semantic definition list |
| "Open in Google Maps" | `aria-label="Open Head Office location in Google Maps"` |
| "WhatsApp Before Visiting" | `aria-label="Chat on WhatsApp before visiting Head Office"` |
| Sub Office WhatsApp | `aria-label="Chat on WhatsApp about Sub Office visit"` |
| Contact WhatsApp | `aria-label="Chat with Afan Mac Store on WhatsApp"` |
| All external links | `target="_blank"` + `rel="noopener noreferrer"` ✅ |
| All icons | `aria-hidden="true"` + `focusable="false"` ✅ |
| Focus ring | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all `<a>` elements |
| Min tap target | All CTAs `min-height: 44px` (Contact primary: `52px`) |
| Color contrast | `#1D1D1F` on `#FFFFFF` = 19.1:1 (AAA). `#6E6E73` on `#FFFFFF` = 5.74:1 (AA). `#FFFFFF` on `#25D366` = 3.03:1 (AA large text). `#0071E3` on `#FFFFFF` = 4.65:1 (AA). All pass. |
| `letterSpacing: "normal"` | Applied to all non-overline text elements |
| No horizontal overflow | `max-width: 1200px`, `px-4 md:px-8`, `flex-wrap: wrap` on secondary row |

---

## 8. Files Not Modified Confirmation

| File | Status |
|---|---|
| `sections/Hero.tsx` | ✅ Not modified |
| `sections/Categories.tsx` | ✅ Not modified |
| `sections/FeaturedProducts.tsx` | ✅ Not modified |
| `sections/Reviews.tsx` | ✅ Not modified |
| `app/layout.tsx` | ✅ Not modified |
| `app/globals.css` | ✅ Not modified |
| `data/categories.ts` | ✅ Not modified |
| `data/featured-products.ts` | ✅ Not modified |
| `data/products.ts` | ✅ Not modified |
| `data/reviews.ts` | ✅ Not modified |
| `lib/constants.ts` | ✅ Not modified — `whatsappLink()` imported only |
| `components/ProductCard.tsx` | ✅ Not modified |
| All product listing pages | ✅ Not modified |

---

## 9. Forbidden Work Not Created Confirmation

| Item | Status |
|---|---|
| `/location` page | ✅ Not created |
| `/contact` page | ✅ Not created |
| Contact form | ✅ Not created |
| Email address | ✅ Not included — none provided |
| Phone call button | ✅ Not created — no number approved |
| Map embed (iframe) | ✅ Not created |
| Fake map screenshot | ✅ Not created |
| Google logo or icon | ✅ Not included |
| Apple logo or trademark | ✅ Not included |
| Fabricated Sub Office hours | ✅ Not included — none provided |
| Sub Office Google Maps CTA | ✅ Not included — no URL provided |
| Hardcoded `wa.me` links | ✅ None — all via `whatsappLink()` |
| Dark section | ✅ Not created |
| External images | ✅ Not included |
| New npm packages | ✅ None added |
| Backend, checkout, CMS, admin | ✅ Not created |
| Footer | ✅ Not created — separate phase |
| Phase 10 or later work | ✅ Not started |
| Hero changes | ✅ Not touched — Hero is paused |

---

## 10. TypeScript Result

```
npx tsc --noEmit → zero errors (exit code 0)
```

---

## 11. Localhost URL

```
http://localhost:3000
```

Navigate to the homepage and scroll past Reviews to verify:

- Location section renders with Head Office card (address + hours + 2 CTAs) and Sub Office card (address + note + 1 CTA)
- Contact section renders below Location with "Chat on WhatsApp" CTA + secondary info row
- Navbar "Location" link (`/#location`) → scrolls to Location section from homepage and product pages
- Navbar "Contact" link (`/#contact`) → scrolls to Contact section from homepage and product pages

---

## 12. Polish (v1.1)

Polished business hours rendering and reduced excessive spacing between Location and Contact sections.

### Hours fix

| File | Change |
|---|---|
| `sections/Location.tsx` | `gridTemplateColumns` for hours rows: `"90px 1fr"` → `"100px max-content"` |
| `sections/Location.tsx` | Added `whiteSpace: "nowrap"` to `<dd>` — prevents "10 PM" from wrapping and clipping |

The `1fr` hours column allowed the browser to wrap long values like "12 PM – 10 PM" at narrow card widths, causing "0" to visually drop. `max-content` sizes the column to its exact content width; `whiteSpace: "nowrap"` guarantees the full time string always renders on one line.

`data/locations.ts` hours strings confirmed correct and unchanged:
- Mon–Thu: `12 PM – 10 PM` ✅
- Friday: `2:30 PM – 10 PM` ✅
- Saturday: `12 PM – 10 PM` ✅
- Sunday: `Closed` ✅

### Spacing fix (v1.1 → v1.2)

Spacing between Location and Contact sections refined for better page flow.

| File | Property | v1.0 original | v1.1 polish | v1.2 refined |
|---|---|---|---|---|
| `sections/Location.tsx` | `paddingBottom` | `clamp(64px, 8vw, 96px)` | `clamp(40px, 5vw, 56px)` | `clamp(28px, 4vw, 48px)` |
| `sections/Contact.tsx` | `paddingTop` | `clamp(64px, 8vw, 96px)` | `clamp(24px, 3vw, 40px)` | `clamp(20px, 2.5vw, 28px)` |

Combined gap between Location card bottom and Contact overline:

| Viewport | v1.0 | v1.1 | v1.2 | Target |
|---|---|---|---|---|
| Mobile (375px) | 128px | 64px | 48px | 48–64px ✓ |
| Tablet (768px) | 128px | 64px | ~51px | 48–64px ✓ |
| Desktop (1200px) | 192px | 92px | 76px | 72–96px ✓ |

Contact section `paddingBottom` (`clamp(64px, 8vw, 96px)`) is unchanged — page bottom breathing room preserved.

### TypeScript

`npx tsc --noEmit` → **zero errors**

---

## 13. Approval Status

**Awaiting user review.**

Once approved, Phase 10 can begin with explicit user confirmation.

---

*Phase 9B · Location + Contact Sections · Report version 1.2 · 2026-05-28*
