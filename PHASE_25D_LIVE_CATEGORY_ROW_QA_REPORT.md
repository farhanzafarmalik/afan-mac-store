# PHASE 25D — Live Category Icon Row QA Report

**Date:** 2026-06-12
**Live URL:** https://afan-mac-store.vercel.app
**Commit tested:** df09b85 (Phase 25A + 25B)

---

## 1. Live URL Tested

**https://afan-mac-store.vercel.app**

No code modified. No deployments triggered. Read-only QA via Chrome MCP DOM checks.

---

## 2. Desktop Category QA

| Check | Expected | Result |
|-------|----------|--------|
| Section exists (`aria-labelledby="categories-heading"`) | ✅ | ✅ |
| Section heading | "Find your next Apple device." | ✅ |
| Overline | "Shop by Category" | ✅ |
| Total category links | 8 | ✅ |
| Icon tile dimensions | 76×76px | ✅ |
| Category item link width | 104px | ✅ |
| Arrow wrappers in categories section | 2 (`hidden md:flex`) | ✅ |
| Arrow class correct (`hidden md:flex`) | ✅ | ✅ |
| Arrow `display` at desktop (1728px) | `flex` | ✅ |
| Gradient fades at desktop | `display: none` (not rendered, `canScrollRight` false when all fit) | ✅ |
| No horizontal overflow | ✅ | ✅ |
| No `<img>` elements in section | 0 | ✅ |
| Forbidden CTAs (Buy Now / Checkout etc.) | None | ✅ |
| Scroll container width (flex-1 min-w-0) | 1024px (fills container minus padding) | ✅ |
| `relative flex-1 min-w-0` wrapper present | ✅ | ✅ |

---

## 3. Mobile Category QA

> Chrome MCP `resize_window` does not change the actual browser viewport when Chrome is maximized. Mobile behavior was confirmed via local preview server at 375×812 during Phase 25B. Live CSS class verification confirms correct behavior.

**CSS class verification (live site):**

| Check | Class | Behavior at <768px | Result |
|-------|-------|-------------------|--------|
| Left arrow wrapper | `hidden md:flex` | `display: none` | ✅ correct class |
| Right arrow wrapper | `hidden md:flex` | `display: none` | ✅ correct class |
| Right gradient fade | `md:hidden pointer-events-none absolute` | `display: block` when `canScrollRight` | ✅ correct class |
| Left gradient fade | `md:hidden pointer-events-none absolute` | `display: block` when `canScrollLeft` | ✅ correct class |

**Phase 25B local preview (375px) confirmed:**

| Check | Result |
|-------|--------|
| Arrow wrappers `display: none` at 375px | ✅ |
| Right gradient fade in DOM when content overflows | ✅ |
| Scroll container full viewport width (375px) | ✅ `scrollWidth === 375` |
| No horizontal page overflow | ✅ |
| Tile dimensions 76×76px | ✅ |
| No arrow overlapping any tile or label | ✅ |
| iPad label not cut behind arrow | ✅ |
| All 8 categories reachable by horizontal swipe | ✅ |

---

## 4. Link / Route QA

| aria-label | href | Status |
|------------|------|--------|
| Shop MacBook | `/products/macbook` | ✅ |
| Shop iPhone | `/products/iphone` | ✅ |
| Shop iPad | `/products/ipad` | ✅ |
| Shop Mac mini | `/products/mac-mini` | ✅ |
| Shop iMac | `/products/imac` | ✅ |
| Shop Apple Watch | `/products/apple-watch` | ✅ |
| Shop AirPods | `/products/airpods` | ✅ |
| Shop Accessories | `/products/accessories` | ✅ |

All 8 routes unchanged. `data/categories.ts` not modified.

---

## 5. Hover / Focus / Mobile Scroll Result

| State | Behavior | Live Confirmation |
|-------|----------|-------------------|
| Hover (desktop) | Tile lifts 3px, shadow deepens, border → `#D2D2D7`, icon → `#0071E3` | ✅ CSS transitions present in live DOM |
| Focus-visible | `shadow: 0 0 0 3px rgba(0,113,227,0.35)` on Link wrapper | ✅ class confirmed |
| Active/click | `active:scale-[0.97]` CSS | ✅ class confirmed |
| Mobile swipe | `overflow-x-auto` on scroll container | ✅ |
| Mobile gradient right | `linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.96))` | ✅ class + style confirmed |
| Mobile gradient left | `linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.96))` | ✅ class + style confirmed |
| Reduced motion | `<MotionConfig reducedMotion="user">` wraps section | ✅ unchanged |

---

## 6. Icons Kept — No Images Added

| Check | Result |
|-------|--------|
| `<img>` elements in section | 0 ✅ |
| Product photos | None ✅ |
| Apple logo images | None ✅ |
| Icons are Lucide SVG components | ✅ (8 icons: Laptop, Smartphone, TabletSmartphone, Server, Monitor, Watch, Headphones, Package) |

---

## 7. Confirmation: No Product / COD / Cart Logic Changed

| Area | Status |
|------|--------|
| `sections/Hero.tsx` | Not touched |
| `sections/FeaturedProducts.tsx` | Not touched |
| `sections/Reviews.tsx` | Not touched |
| `sections/Location.tsx` | Not touched |
| `components/Navbar.tsx` | Not touched |
| `components/CartInquiryDrawer.tsx` | Not touched |
| `data/products.ts` | Not touched |
| `data/categories.ts` | Not touched |
| `lib/shopUtils.ts` | Not touched |
| WhatsApp number | `923133388666` — unchanged |
| COD / inquiry flow | Not touched |

---

## 8. Console Result

| Check | Result |
|-------|--------|
| Console errors on live page load | ✅ None |

---

## 9. Issues Found

None. All live checks passed.

---

## 10. Approval Status

**Awaiting user review**
