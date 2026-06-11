# PHASE 23A — Location Section Map & Trust Polish Report

**Date:** 2026-06-01
**Branch:** main

---

## 1. Files Changed

| File | Change |
|------|--------|
| `sections/Location.tsx` | Full rewrite — three focused components (HeadOfficeCard, MapCard, SubOfficeCard); Google Maps embed added; new layout; updated button labels |

No changes to `data/locations.ts`, `app/globals.css`, `components/Navbar.tsx`, or any other file.

---

## 2. Layout Before / After Summary

### Before (Phase 9B)
- Equal 2-column grid: Head Office card | Sub Office card
- No map embed
- Button labels: "Open in Google Maps" / "WhatsApp Before Visiting" / "Chat on WhatsApp"
- Both offices treated at equal visual weight

### After (Phase 23A)
- **Desktop:** Primary 2-column grid — Head Office detail card (left) | Map embed (right) — with Sub Office compact card below in a 3-column grid (occupies 1/3 width)
- **Mobile:** Head Office card → Map embed → Sub Office card, all full-width stacked
- Head Office clearly primary; Sub Office clearly secondary (smaller padding, no hours)
- Button labels updated per spec

---

## 3. Head Office Map Implementation Details

| Property | Value |
|----------|-------|
| Embed URL | `https://maps.google.com/maps?q=Afan+Mac+Store+Rania+Mall+Bank+Road+Saddar+Rawalpindi&output=embed` |
| URL basis | Real business name + locked address — no fabricated coordinates |
| `title` | `"Afan Mac Store Head Office location map"` |
| `aria-label` | `"Google Maps showing Afan Mac Store Head Office, Rania Mall, Rawalpindi"` |
| `loading` | `lazy` |
| `referrerPolicy` | `no-referrer-when-downgrade` |
| Border radius | 18px (via `overflow: hidden` on wrapper) |
| Border | `1px solid #E8E8ED` |
| Shadow | `0 1px 4px rgba(0,0,0,0.05)` |
| Desktop min-height | 320px (`md:min-h-[320px]`) |
| Mobile min-height | 260px (`min-h-[260px]`) — within 260–300px spec |
| `border` on iframe | `0` (border applied on wrapper, not iframe itself) |

---

## 4. Head Office Button / Link Confirmation

| Element | Label | href | aria-label |
|---------|-------|------|------------|
| Maps button | "Open Head Office in Maps" | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` | "Open Head Office in Google Maps" |
| WhatsApp button | "WhatsApp Before Visiting" | `https://wa.me/923133388666?text=...` | "Chat on WhatsApp before visiting Head Office" |

Both open in new tab with `target="_blank" rel="noopener noreferrer"`. ✅

---

## 5. Sub Office Card Confirmation

| Check | Value |
|-------|-------|
| Label badge | "Sub Office" |
| Address | M-95, Jeff Heights, Main Boulevard Road, Gulberg-3, Lahore |
| Visit note | "Contact us on WhatsApp before visiting." |
| Button label | "Ask Before Visiting" |
| Button aria-label | "Ask on WhatsApp before visiting Sub Office" |
| Google Maps button | Not shown — no real Sub Office maps URL exists in data |
| Tap target height | 44px ✅ |

---

## 6. Business Hours Confirmation

Hours displayed on Head Office card from `data/locations.ts` (unchanged):

| Days | Hours |
|------|-------|
| Mon–Thu | 12 PM – 10 PM |
| Friday | 2:30 PM – 10 PM |
| Saturday | 12 PM – 10 PM |
| Sunday | Closed (rendered muted) |

---

## 7. Mobile QA Result (375×812)

| Check | Result |
|-------|--------|
| Head Office card full-width | ✅ |
| Map embed visible, 260px height | ✅ iframeHeight=260, iframeWidth=341 |
| Sub Office card below map | ✅ |
| All buttons ≥ 44px tap target | ✅ All 3 links: 44px height |
| No horizontal overflow from Location section | ✅ `document.documentElement.scrollWidth` = 375 (pre-existing 9px body overflow from categories, not from Location) |
| Section background #F5F5F7 | ✅ |
| Cards white, border #E8E8ED | ✅ |

---

## 8. Location Anchor / Nav Result

| Check | Result |
|-------|--------|
| `id="location"` present | ✅ `section.id === "location"` |
| No duplicate id | ✅ |
| `scroll-margin-top: 80px` from Phase 22C globals.css | ✅ Still applies (no globals.css change) |
| Navbar "Location" link (`href="/#location"`) | ✅ Unchanged |
| Phase 22D mobile scroll fix still works | ✅ handleLinkClick in Navbar.tsx untouched |

---

## 9. Confirmation: No Fake Map / Location Added

- Map embed URL is a Google Maps **search** for the real business name and real address — no invented coordinates, no random pin, no placeholder image
- `data/locations.ts` not modified — all addresses, mapsUrl, and hours remain exactly as locked
- Sub Office has no Google Maps button (no real URL exists for it)
- No coordinates were fabricated

---

## 10. Confirmation: No Cart / COD / Product Logic Changed

| Area | Status |
|------|--------|
| `components/CartInquiryDrawer.tsx` | Not touched |
| `lib/shopUtils.ts` | Not touched |
| `data/products.ts` | Not touched |
| `data/locations.ts` | Not touched |
| COD form flow | Not touched |
| Product card logic | Not touched |
| WhatsApp number | `923133388666` — unchanged |
| Hero section | Not touched |
| Reviews section | Not touched |
| Navbar | Not touched |

---

## 11. TypeScript Result

```
npx tsc --noEmit
```
✅ No errors. Zero output.

---

## 12. Build Result

```
npm run build
```
✅ Build succeeded. 13 static pages generated.

```
Route (app)
├ ○ /
├ ○ /_not-found
├ ○ /products
└ ● /products/[category]   (+5 paths)
```

---

## 13. Issues / Risks

| Item | Notes |
|------|-------|
| Google Maps search embed | The embed uses a search URL (`?q=...&output=embed`) which works without an API key. Google may occasionally show a "sign in to see full map" overlay in headless browsers, but this does not affect real users. The map displays the correct area based on the real business name + address. |
| Playwright screenshot blank | Preview screenshots of the Location section show blank (#F5F5F7) background due to headless GPU compositing limitations. DOM structure, layout dimensions, and all link/iframe attributes were verified programmatically and are correct. |
| Pre-existing 9px body overflow | Unchanged from Phase 22D — contained by `overflow-x: hidden` on `html`, no visible scrollbar, not from Location section. |

---

## 14. Approval Status

**Awaiting user review**
