# PHASE 23D — Live Location Map QA Report

**Date:** 2026-06-12
**Live URL:** https://afan-mac-store.vercel.app
**Commit tested:** 3998880 (Phase 23A + 23B)

---

## 1. QA Method

- Chrome MCP (`javascript_tool`) executing DOM/style checks on the live deployed page
- Tab loaded: `https://afan-mac-store.vercel.app` (readyState: complete)
- Console errors checked via `read_console_messages` after fresh page load
- All checks run against production DOM — not local build

---

## 2. iframe (Map Embed) — Live Check

| Check | Expected | Result |
|-------|----------|--------|
| `iframe` count in `#location` | 1 | ✅ 1 |
| `iframe.src` | Exact Phase 23B embed URL | ✅ Match |
| `iframe.title` | `"Afan Mac Store Head Office location map"` | ✅ Match |
| `iframe.loading` | `lazy` | ✅ |
| `iframe.allowFullscreen` | `true` | ✅ |

**Exact src confirmed live:**
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.3798526274645!2d73.0533107!3d33.5954474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf7ac133962d%3A0xfafdc286f7909dd0!2sAfan%20Mac%20Store!5e0!3m2!1sen!2s!4v1780391862547!5m2!1sen!2s
```

---

## 3. Section Structure — Live Check

| Check | Expected | Result |
|-------|----------|--------|
| `section#location` exists | ✅ | ✅ |
| `h2` text | "Visit Afan Mac Store." | ✅ |
| Head Office badge | "Head Office" | ✅ |
| Sub Office badge | "Sub Office" | ✅ |
| Head Office address contains "Rania Mall" | ✅ | ✅ |
| Sub Office address contains "Gulberg" | ✅ | ✅ |
| Business hours — Mon–Thu / Sat `12 PM` | ✅ | ✅ |
| Business hours — Friday `2:30 PM` | ✅ | ✅ |
| Sunday `Closed` | ✅ | ✅ |
| `scroll-margin-top` on `#location` | `80px` | ✅ `80px` |

---

## 4. Buttons / Links — Live Check

| Label | href | aria-label | Result |
|-------|------|------------|--------|
| Open Head Office in Maps | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` | "Open Head Office in Google Maps" | ✅ |
| WhatsApp Before Visiting | `https://wa.me/923133388666?text=...Rawalpindi...` | "Chat on WhatsApp before visiting Head Office" | ✅ |
| Ask Before Visiting | `https://wa.me/923133388666?text=...Lahore...` | "Ask on WhatsApp before visiting Sub Office" | ✅ |

WhatsApp number confirmed: **923133388666** — unchanged. ✅

All 3 links have `target="_blank" rel="noopener noreferrer"`. ✅

---

## 5. Tap Targets — Live Check

| Button | Height |
|--------|--------|
| Open Head Office in Maps | 44px ✅ |
| WhatsApp Before Visiting | 44px ✅ |
| Ask Before Visiting | 44px ✅ |

All tap targets meet 44px minimum. ✅

---

## 6. Console Errors — Live Check

| Check | Result |
|-------|--------|
| Console errors on page load | ✅ None |

---

## 7. No Fake Content Confirmation

| Check | Result |
|-------|--------|
| Sub Office has no `<iframe>` | ✅ Exactly 1 iframe total (Head Office map only) |
| No fabricated coordinates in DOM | ✅ |
| Map embed Place ID from user-provided source | ✅ `0x38dfbf7ac133962d:0xfafdc286f7909dd0` |
| `data/locations.ts` unchanged | ✅ Not modified in any phase |

---

## 8. Mobile Layout Note

`resize_window` to 375px did not affect the live Chrome viewport (physical window remains maximized). Mobile layout was verified in Phase 23B local QA at `375×812`:

| Check | Phase 23B Result |
|-------|-----------------|
| iframe height | 260px ✅ |
| iframe width | 341px (full card width) ✅ |
| No horizontal overflow | `scrollWidth === 375` ✅ |
| All tap targets ≥ 44px | ✅ |
| Head Office card → Map → Sub Office stacked | ✅ |

Phase 23B local build and Phase 23D live build are from the same commit (`3998880`). Mobile behavior is consistent.

---

## 9. Navigation Anchor — Live Check

| Check | Result |
|-------|--------|
| `id="location"` on section | ✅ |
| `scroll-margin-top: 80px` computed | ✅ |
| Navbar "Location" `href="/#location"` | ✅ (Phase 22C, unchanged) |
| Phase 22D mobile body-lock fix in Navbar | ✅ (Navbar.tsx untouched in Phase 23A/23B/23C) |

---

## 10. Summary

All live checks passed. The Location section on production matches the Phase 23A + 23B implementation exactly:

- ✅ Exact Google Maps place embed (Place ID pin, not search)
- ✅ Head Office card with real address, real hours, correct CTAs
- ✅ Sub Office compact card — no fake map, address only + WhatsApp CTA
- ✅ All 3 buttons correct labels, hrefs, and aria-labels
- ✅ WhatsApp number unchanged (`923133388666`)
- ✅ `scroll-margin-top: 80px` active for navbar clearance
- ✅ `id="location"` anchor intact
- ✅ No console errors on live site
- ✅ No fake locations, no fabricated content

---

## 11. Phase Status

**Phase 23D — COMPLETE ✅**
