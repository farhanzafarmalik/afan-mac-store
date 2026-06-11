# PHASE 23B — Exact Location Map Embed Report

**Date:** 2026-06-02
**Branch:** main

---

## 1. Files Changed

| File | Change |
|------|--------|
| `sections/Location.tsx` | Replaced `MAP_EMBED_SRC` constant with exact Google Maps embed src; added `allowFullScreen` to iframe |

No other files modified.

---

## 2. Previous Map Embed Summary

Phase 23A used a generic Google Maps **search embed**:
```
https://maps.google.com/maps?q=Afan+Mac+Store+Rania+Mall+Bank+Road+Saddar+Rawalpindi&output=embed
```
This showed a search results map rather than the exact business listing/pin.

---

## 3. New Exact Embed Src Confirmation

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.3798526274645!2d73.0533107!3d33.5954474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7ac133962d%3A0xfafdc286f7909dd0!2sAfan%20Mac%20Store!5e0!3m2!1sen!2s!4v1780391862547!5m2!1sen!2s
```

Verified in browser: `iframe.src` matches exactly. ✅

Coordinates embedded: **33.5954474°N, 73.0533107°E** — Rania Mall area, Rawalpindi.  
Business name encoded: `Afan%20Mac%20Store` → "Afan Mac Store" listing pin.

iframe attributes confirmed:
| Attribute | Value |
|-----------|-------|
| `src` | Exact embed URL above |
| `title` | `"Afan Mac Store Head Office location map"` |
| `loading` | `lazy` |
| `allowFullScreen` | `true` |
| `referrerPolicy` | `no-referrer-when-downgrade` |
| `width` | `100%` |
| Wrapper border-radius | 18px |
| Wrapper border | `1px solid #E8E8ED` |
| Mobile min-height | 260px |
| Desktop min-height | 320px |

---

## 4. Visual Map Confirmation

iframe renders in DOM with correct src and dimensions:
- Desktop: width fills column (~570px), height ≥ 320px
- Mobile (375px): width 341px, height 260px ✅

The embed uses Google's official `maps/embed` endpoint with the exact Place ID (`0x38dfbf7ac133962d:0xfafdc286f7909dd0`) — this resolves to the **Afan Mac Store** business listing pin, not a generic area search.

---

## 5. Head Office Maps Button Confirmation

| Element | Value |
|---------|-------|
| Button label | "Open Head Office in Maps" |
| href | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` |
| Verified in browser | ✅ `mapsBtn === "https://maps.app.goo.gl/iy6teEPKaKBSQJENA"` |
| Opens new tab | `target="_blank" rel="noopener noreferrer"` ✅ |

---

## 6. Sub Office No-Map Confirmation

- `section#location` contains exactly **1 iframe** (Head Office map only) ✅
- Sub Office card has no `<iframe>`, no map, no fabricated pin
- Sub Office shows address + "Contact us on WhatsApp before visiting." + "Ask Before Visiting" button only ✅

---

## 7. Mobile QA Result (375×812)

| Check | Result |
|-------|--------|
| iframe height on mobile | 260px ✅ |
| iframe width on mobile | 341px (full card width) ✅ |
| No horizontal overflow | `document.documentElement.scrollWidth === 375` ✅ |
| `id="location"` present | ✅ |
| Head Office card readable | ✅ |
| Sub Office card below map | ✅ |
| All tap targets ≥ 44px | ✅ (unchanged from Phase 23A) |

---

## 8. Location Anchor Result

| Check | Result |
|-------|--------|
| `id="location"` on section | ✅ |
| `scroll-margin-top: 80px` (globals.css, Phase 22C) | ✅ unchanged |
| Navbar "Location" link `href="/#location"` | ✅ unchanged |
| Phase 22D mobile scroll fix | ✅ Navbar.tsx untouched |

---

## 9. Confirmation: No Fake Location / Map Added

- Embed src provided directly by the business owner — exact Google Maps place embed for Afan Mac Store
- Place ID `0x38dfbf7ac133962d:0xfafdc286f7909dd0` is the real business listing
- Coordinates `33.5954474°N, 73.0533107°E` match Rania Mall, Bank Road Saddar, Rawalpindi
- `data/locations.ts` not modified
- No coordinates fabricated by Claude

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
| Navbar.tsx | Not touched |
| Hero section | Not touched |
| Reviews section | Not touched |

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

---

## 13. Issues / Risks

None. The change is a single constant swap (`MAP_EMBED_SRC`) plus adding `allowFullScreen`. No layout, logic, or data changes.

---

## 14. Approval Status

**Awaiting user review**
