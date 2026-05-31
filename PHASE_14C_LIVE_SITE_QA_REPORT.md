# PHASE_14C_LIVE_SITE_QA_REPORT.md
**Phase 14C — Live Vercel Final QA · Report**

---

## 1. Live URL Tested

```
https://afan-mac-store.vercel.app/
```

All tests run against the live Vercel deployment. No localhost used.

---

## 2. Routes Tested

| Route | HTTP Status | Result |
|---|---|---|
| `/` | 200 | ✅ Loads — Hero, Category Strip, Featured Products, Reviews, Location, Contact, Footer |
| `/products` | 200 | ✅ Loads — 19 product cards, h1 "All Products at Afan Mac Store" |
| `/products/macbook` | 200 | ✅ Loads — 2 cards, "Add to Inquiry" buttons |
| `/products/iphone` | 200 | ✅ Confirmed via fetch |
| `/products/ipad` | 200 | ✅ Confirmed via fetch |
| `/products/mac-mini` | 200 | ✅ Confirmed via fetch |
| `/products/imac` | 200 | ✅ Confirmed via fetch |
| `/products/apple-watch` | 200 | ✅ Confirmed via fetch |
| `/products/airpods` | 200 | ✅ Confirmed via fetch |
| `/products/accessories` | 200 | ✅ Loads — 11 cards, "Add to Cart" buttons |
| `/products/unknown` | 404 | ✅ "This page could not be found." — Navbar persists |

All 10 valid routes return HTTP 200. Unknown route correctly returns 404.

---

## 3. Desktop QA Result

### Navbar

| Check | Result |
|---|---|
| Logo "Afan Mac Store" renders | ✅ |
| Home link | ✅ |
| Products dropdown button | ✅ — Opens on click |
| Dropdown items: All Products, MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods, Accessories | ✅ All 9 present (confirmed via screenshot) |
| Reviews link (`/#reviews`) | ✅ |
| Location link (`/#location`) | ✅ |
| Contact link (`/#contact`) | ✅ |
| Buy on WhatsApp CTA | ✅ — `wa.me/923133388666` |
| Heart icon opens Saved drawer | ✅ |
| Bag icon opens Inquiry Bag | ✅ |
| Count badge "1" on Heart | ✅ — Blue badge visible in screenshot |
| Count badge "1" on Bag | ✅ — Blue badge visible in screenshot |
| Badges `aria-hidden` | ✅ |
| `aria-label` singular "1 item" (Phase 13B fix) | ✅ — "Saved products, 1 item" / "Inquiry bag, 1 item" |

### Homepage sections

| Section | Result |
|---|---|
| Hero — renders with MacBook visual, Buy on WhatsApp, View Products | ✅ |
| Hero stats — 10K+ Happy Customers, 100% Genuine, 4.9 Rating | ✅ |
| Hero slide dots (4 dots) | ✅ |
| Category Strip — "SHOP BY CATEGORY" / "Find your next Apple device." | ✅ |
| Category Strip — 8 category links all present in DOM | ✅ |
| Category Strip — arrow buttons present | ✅ (2 found) |
| Featured Products — heading, 8 product cards with hearts + Ask on WhatsApp | ✅ |
| Reviews section (`#reviews`) | ✅ — Present in DOM |
| Location section (`#location`) | ✅ — Present in DOM |
| Contact section (`#contact`) | ✅ — Present in DOM |
| Footer | ✅ — Present with all columns |
| Independent reseller note | ✅ — "Afan Mac Store is an independent Apple reseller." |

### Product listing pages (desktop)

| Check | `/products` | `/products/macbook` | `/products/accessories` |
|---|---|---|---|
| Card count | 19 ✅ | 2 ✅ | 11 ✅ |
| Heart save button | ✅ | ✅ | ✅ |
| "Add to Inquiry" on devices | ✅ | ✅ | — |
| "Add to Cart" on accessories | — | — | ✅ |
| "Ask on WhatsApp" | ✅ | ✅ | ✅ |
| No horizontal overflow | ✅ | ✅ | ✅ |

---

## 4. Mobile QA Result

Mobile behavior is confirmed via:
1. Phase 13A real browser QA on localhost (same codebase)
2. DOM inspection confirming hamburger button is present in DOM on live site
3. All React client-side behavior (drawers, badges, menus) is identical between localhost and Vercel — the code is the same static bundle

| Mobile Check | Basis | Result |
|---|---|---|
| Hamburger `<button aria-label="Open menu">` in DOM | DOM inspection on live | ✅ |
| Mobile menu overlay with nav links | Phase 13A screenshot | ✅ |
| Saved/Inquiry buttons in mobile menu with badges | Phase 13A screenshot | ✅ |
| Mobile drawer full width | Phase 13A DOM (`scrollWidth === clientWidth`) | ✅ |
| No horizontal overflow at 375px | Phase 13A (`body.scrollWidth === 375`) | ✅ |
| Product card button row no overflow | Phase 13A screenshot | ✅ |
| Footer readable | Phase 13A confirmed | ✅ |

---

## 5. Wishlist / Inquiry Bag Live Result

Tested live on `https://afan-mac-store.vercel.app/products/accessories`:

| Check | Result |
|---|---|
| Heart click saves accessory to `afan_saved` | ✅ — `lsSavedCount: 1` confirmed |
| Heart turns red (saved state) | ✅ — Confirmed in screenshot |
| "Add to Cart" adds accessory to `afan_cart` | ✅ — `lsCartCount: 1` confirmed |
| Inquiry Bag drawer opens automatically | ✅ — `drawerOpen: true` confirmed |
| Accessory stored with `cartMode: "cod"` | ✅ |
| Accessory stored with `productType: "accessory"` | ✅ |
| `localStorage` key `"afan_saved"` | ✅ — exists and populated |
| `localStorage` key `"afan_cart"` | ✅ — exists and populated |
| Old key `"afan_saved_items"` absent | ✅ — `oldKeyAbsent: true` |
| Items persist across navigation | ✅ — Counts visible on `/products/unknown` 404 page |
| Singular aria-label "1 item" correct | ✅ — `"Saved products, 1 item"` / `"Inquiry bag, 1 item"` |

---

## 6. WhatsApp Live Result

| Check | Result |
|---|---|
| Total WhatsApp links on homepage | ✅ — 26 links |
| All links use `wa.me` (not hardcoded elsewhere) | ✅ |
| WhatsApp number on live site | ✅ — `923133388666` confirmed in href |
| Nav "Buy on WhatsApp" href | ✅ — `https://wa.me/923133388666?text=Hi%20Afan%20Mac%20Store%2C%20I%20want%20to%20buy...` |
| Footer "Chat on WhatsApp" href | ✅ — `https://wa.me/923133388666?text=Hi%20Afan%20Mac%20Store%2C%20I'm%20interested...` |
| Product page header WhatsApp CTA | ✅ — `/products/macbook`: `"Hi Afan Mac Store, I'm interested%"` |
| Product card WhatsApp CTAs | ✅ — Product-specific messages |
| `target="_blank"` on all WhatsApp links | ✅ |
| `rel="noopener noreferrer"` | ✅ |
| No prices in messages | ✅ |

---

## 7. Footer / Link Result

| Footer Link | `href` | Result |
|---|---|---|
| Chat on WhatsApp (brand column) | `wa.me/923133388666?text=...` | ✅ |
| Home | `/` | ✅ |
| Products | `/products` | ✅ |
| Reviews | `/#reviews` | ✅ — Leading `/` confirmed |
| Location | `/#location` | ✅ — Leading `/` confirmed |
| Contact | `/#contact` | ✅ — Leading `/` confirmed |
| MacBook | `/products/macbook` | ✅ |
| iPhone | `/products/iphone` | ✅ |
| iPad | `/products/ipad` | ✅ |
| Mac mini | `/products/mac-mini` | ✅ |
| (iMac, Apple Watch, AirPods, Accessories) | Correct product hrefs | ✅ |
| Open in Google Maps | `https://maps.app.goo.gl/iy6teEPKaKBSQJENA` | ✅ |
| WhatsApp us | `wa.me/923133388666?text=...` | ✅ |
| Independent reseller note | "Afan Mac Store is an independent Apple reseller." | ✅ |

No dead hrefs, no bare `#anchors`, no empty hrefs found. ✅

---

## 8. Console / Build Notes

| Check | Result |
|---|---|
| Console errors on live site | ✅ — Zero errors captured |
| Console warnings | ✅ — Zero warnings |
| Page title on `/products/macbook` | ✅ — "MacBooks at Afan Mac Store \| Afan Mac Store" |
| Page title on `/products/accessories` | ✅ — "Accessories at Afan Mac Store \| Afan Mac Store" |
| Page title on `/products/unknown` | ✅ — "Afan Mac Store" (404 page) |
| Build type | ✅ — Static (○) + SSG (●) — no server-side runtime |
| Vercel deployment detected Next.js | ✅ — Auto-detected |
| Environment variables required | ✅ — None |
| SSR localStorage errors | ✅ — None (SSR guard working correctly) |
| Hydration errors | ✅ — None observed |

---

## 9. Issues Found

### Critical
None.

### Important
None.

### Minor
None.

**Zero issues found on the live Vercel deployment.**

The single Phase 13A Minor issue (aria-label plural grammar) was resolved in Phase 13B and is confirmed correct on the live site: "Saved products, 1 item" (singular) ✅.

---

## 10. Approval Status

**Awaiting user review.**

### Live QA Summary

| Area | Status |
|---|---|
| Site loads at `https://afan-mac-store.vercel.app/` | ✅ |
| All 10 valid routes return HTTP 200 | ✅ |
| `/products/unknown` returns 404 | ✅ |
| Navbar + Products dropdown (all 9 items) | ✅ |
| All homepage sections present | ✅ |
| Hero functional (visual pending separate phase) | ✅ / ⏸ |
| Product cards: "Add to Inquiry" (devices), "Add to Cart" (accessories) | ✅ |
| Wishlist: save, heart turns red, count badge | ✅ |
| Inquiry Bag: add, drawer opens, correct types | ✅ |
| localStorage `afan_saved` + `afan_cart` on live | ✅ |
| Old key `afan_saved_items` absent | ✅ |
| WhatsApp: 26 links, correct number `923133388666` | ✅ |
| Footer: all links correct including `/#` anchors | ✅ |
| Independent reseller note present | ✅ |
| No horizontal overflow | ✅ |
| Zero console errors | ✅ |
| Page titles correct (SEO) | ✅ |

**The Afan Mac Store is live and fully functional at `https://afan-mac-store.vercel.app/`**

---

*Phase 14C · Live Vercel Final QA · Report version 1.0 · 2026-05-31*
