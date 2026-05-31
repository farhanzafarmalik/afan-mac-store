# PHASE_12B_WISHLIST_CART_INQUIRY_REPORT.md
**Phase 12B — Wishlist + Cart / Inquiry Bag Implementation · Completion Report**

---

## 1. Files Created / Changed

### Created

| File | Type | Notes |
|---|---|---|
| `lib/shopUtils.ts` | New | Types + pure utility functions |
| `context/ShopActionsContext.tsx` | New | Global state provider + `useShopActions` hook |
| `components/SavedDrawer.tsx` | New | Saved products right-side drawer |
| `components/CartInquiryDrawer.tsx` | New | Inquiry Bag right-side drawer |
| `PHASE_12B_WISHLIST_CART_INQUIRY_REPORT.md` | New | This file |

### Modified

| File | Change |
|---|---|
| `app/layout.tsx` | Added `ShopActionsProvider` wrapper, `<SavedDrawer />`, `<CartInquiryDrawer />` |
| `components/Navbar.tsx` | Replaced placeholder WA links with drawer openers; added count badges; removed dead constants |
| `components/ProductCard.tsx` | Added heart save button + "Add to Inquiry/Cart" button alongside existing WhatsApp CTA |
| `sections/FeaturedProducts.tsx` | Added heart save button only (no Add to Inquiry/Cart on featured cards); added `Monitor` icon |

---

## 2. Implementation Locks Verified

| Lock | Requirement | Status |
|---|---|---|
| §1 | `localStorage` saved key exactly `"afan_saved"` | ✅ `SAVED_KEY = "afan_saved"` in `ShopActionsContext.tsx` line 32 |
| §2 | `localStorage` cart key exactly `"afan_cart"` | ✅ `CART_KEY = "afan_cart"` in `ShopActionsContext.tsx` line 33 |
| §3 | Old key `"afan_saved_items"` never used | ✅ Zero functional usage — appears only in a guard comment |
| §4 | Badge count 1–9 shown exactly | ✅ `formatBadge(n)` returns `String(n)` when `n <= 9` |
| §5 | Badge shows `"9+"` above 9 | ✅ `formatBadge(n)` returns `"9+"` when `n > 9` |
| §6 | Accessory drawer badge text: `"Accessory item"` | ✅ `CartInquiryDrawer.tsx` line 409: `const badgeLabel = isAccessory ? "Accessory item" : "Inquiry item"` |
| §7 | No badge text `"COD accessory"` | ✅ Zero functional usage — appears only in guard comments |
| §8 | Devices: `"Add to Inquiry"` | ✅ `ProductCard.tsx` line 119: `isAccessory ? "Add to Cart" : "Add to Inquiry"` |
| §9 | Devices never say `"Add to Cart"` | ✅ Only accessories get `"Add to Cart"` via the ternary |
| §10 | Accessories: `"Add to Cart"` | ✅ `isAccessory === true` → `"Add to Cart"` |
| §11 | Final CTA: `"Send on WhatsApp"` | ✅ `CartInquiryDrawer.tsx` line 360; `SavedDrawer.tsx` line 332 |
| §12 | No `"Checkout"`, `"Buy Now"`, `"Pay Now"` | ✅ Zero functional usage anywhere |

---

## 3. Provider / Layout Summary

`app/layout.tsx` now wraps the full app with `<ShopActionsProvider>`:

```tsx
<ShopActionsProvider>
  <Navbar />
  {children}
  <SavedDrawer />
  <CartInquiryDrawer />
  <Footer />
</ShopActionsProvider>
```

- `SavedDrawer` and `CartInquiryDrawer` render at layout level — always mounted, visible only when `activeDrawer` matches.
- `ShopActionsProvider` is a client component that reads/writes `localStorage` only after mount (SSR-safe).
- No changes to `metadata`, `<html>`, or `<body>` padding beyond the provider wrapper.

---

## 4. Navbar Icon Behavior Summary

### Desktop

| Element | Before (Phase 11C) | After (Phase 12B) |
|---|---|---|
| Heart icon | `<a>` → WhatsApp placeholder | `<button>` → opens Saved drawer |
| Bag icon | `<a>` → WhatsApp placeholder | `<button>` → opens Inquiry Bag drawer |
| Count badge | None | Shown when `savedCount > 0` / `cartCount > 0` |
| Badge value | — | `1–9` exact, `"9+"` above 9 |
| `aria-label` | Static | `"Saved products, {n} items"` / `"Inquiry bag, {n} items"` |

### Mobile menu

| Element | Before | After |
|---|---|---|
| Heart + "Wishlist" | `<a>` → WhatsApp | `<button>` → closes menu first, opens Saved drawer |
| Bag + "Inquiry" | `<a>` → WhatsApp | `<button>` → closes menu first, opens Inquiry Bag drawer |
| Label | "Wishlist" | "Saved" |

### Removed from Navbar
- `WISHLIST_WA_MSG` constant
- `INQUIRY_WA_MSG` constant

### Z-index allocation
- Navbar header: `z-[1000]`
- Mobile menu: `z-[1001]`
- Drawer overlay: `z-[1002]`
- Drawer panel: `z-[1003]`

Drawers render above all Navbar layers on every viewport.

---

## 5. ProductCard Action Summary (`components/ProductCard.tsx`)

New layout — three interactive elements per card:

| Element | Location | Type | Tap target |
|---|---|---|---|
| Heart save button | Top-right of image area (absolute) | `<button>` | 44×44px clickable area; 28×28px visual circle inside |
| Add to Inquiry (devices) | Bottom button row, flex-1 left | `<button>` | `min-height: 44px` |
| Add to Cart (accessories) | Bottom button row, flex-1 left | `<button>` | `min-height: 44px` |
| Ask on WhatsApp | Bottom button row, flex-1 right | `<a>` | `min-height: 44px` |

### Heart state
- Hollow `Heart` (strokeWidth 1.5, no fill) — not saved
- Filled `Heart` (fill `#FF3B30`, strokeWidth 0) — saved
- `aria-pressed`: `true` / `false`

### Add button click flow
1. `addToCart(productInput)` — adds to Inquiry Bag (or increments accessory qty)
2. `openCartDrawer()` — opens drawer immediately

### WhatsApp button
- Unchanged direct link to `whatsappLink(product.whatsappMessage)`
- `fill={true}` prop added to `WhatsAppCTA` to stretch in the new two-button flex row

---

## 6. FeaturedProducts Action Summary (`sections/FeaturedProducts.tsx`)

Featured cards get a **lighter** action set:

| Element | Included | Notes |
|---|---|---|
| Heart save button | ✅ Yes | 44×44px tap target; absolutely positioned top-right of card |
| Ask on WhatsApp | ✅ Yes | Unchanged from previous implementation |
| Add to Inquiry | ❌ No | Only on product listing pages |
| Add to Cart | ❌ No | Only on product listing pages |

- Heart state (saved/unsaved) is shared with product listing cards via the same `useShopActions()` context — saving from Featured Products card updates the same global state.
- `paddingRight: 32` added to icon+tag row so the tag badge doesn't overlap the heart button.
- `Monitor` icon added to `ICON_MAP` for iMac (was missing in FeaturedProducts previously).

---

## 7. Saved Drawer Summary (`components/SavedDrawer.tsx`)

| Property | Value |
|---|---|
| Trigger | `activeDrawer === "saved"` |
| Panel width | Mobile: `100vw` · Tablet/Desktop: `max(400px, 90vw)` |
| Z-index | Panel: `z-[1003]` · Overlay: `z-[1002]` |
| Overlay click | Closes drawer (desktop/tablet via `className="hidden sm:block"`) |
| Title | "Saved" |
| Empty state | "No saved products yet. Tap the ♡ on any product to save it." |
| Item badge | "Device" or "Accessory" |
| Move action | "Add to Inquiry" (device) / "Add to Cart" (accessory) → `moveSavedToCart()` → removes from saved, adds to cart, opens cart drawer |
| Remove action | `×` button (44×44 tap target) |
| Clear all | Visible only when items exist |
| Final CTA | "Send Saved List on WhatsApp" — disabled (grey, `pointer-events: none`) when empty |
| Escape | Closes drawer via `keydown` listener |
| Focus | Opens to close button; returns to triggering element on close |
| Body scroll | Locked when open |

---

## 8. Inquiry Bag Drawer Summary (`components/CartInquiryDrawer.tsx`)

| Property | Value |
|---|---|
| Trigger | `activeDrawer === "cart"` |
| Title | "Inquiry Bag" |
| Subtitle | "Devices are confirmed on WhatsApp. Accessories can be COD." |
| Empty state | "Your Inquiry Bag is empty. Add devices to inquire or accessories to order." |
| Device item badge | `"Inquiry item"` |
| Accessory item badge | `"Accessory item"` (never "COD accessory") |
| Device quantity | Fixed 1 — no controls — displays "Qty: 1" |
| Accessory quantity | `−` / count / `+` controls · min 1 · max 9 · buttons 28×28px |
| Section headings | "Device Inquiries" / "Accessories" — shown only when both types present |
| Remove action | `×` button (44×44 tap target) |
| Clear all | Visible only when items exist |
| Final CTA | "Send on WhatsApp" — disabled when empty |
| Escape | Closes via `keydown` |
| Focus / scroll / overlay | Same as Saved drawer |

---

## 9. WhatsApp Message Summary

All messages pass through `whatsappLink()` from `lib/constants.ts`. Zero hardcoded `wa.me` URLs outside `lib/constants.ts`.

### `buildSavedMessage()` — `lib/shopUtils.ts`
```
Hi Afan Mac Store, I have saved the following products and want to know more:

1. Product A
2. Product B

Please share current availability and details.
```

### `buildInquiryMessage()` — devices only
```
Hi Afan Mac Store, I want to inquire about the following Apple products:

Device inquiries:
1. MacBook Pro

Please confirm current availability, condition, and price.
```

### `buildInquiryMessage()` — accessories only
```
Hi Afan Mac Store, I want to order the following accessories via COD:

Accessories:
1. 20W USB-C iPhone Adapter x 2

Please confirm availability, price, and COD delivery details.
```

### `buildInquiryMessage()` — mixed
```
Hi Afan Mac Store, I want to inquire/order the following items:

Device inquiries:
1. MacBook Pro

Accessories (COD):
1. 20W USB-C iPhone Adapter x 2

Please confirm current availability, condition, price, and COD delivery details for accessories.
```

---

## 10. localStorage Summary

| Key | Value | Notes |
|---|---|---|
| `"afan_saved"` | `SavedItem[]` | Saved products |
| `"afan_cart"` | `CartItem[]` | Inquiry Bag items |

- Hydrated once after mount via `useEffect` (SSR-safe: `typeof window !== "undefined"` guard in `readStorage`)
- Written on every state change, gated on `state.hydrated` to prevent overwriting on mount
- `try/catch` on all reads and writes — silently fails in private browsing or when storage quota is exceeded
- Persists across page refresh and tab close

---

## 11. Accessibility Summary

| Concern | Implementation |
|---|---|
| SavedDrawer role | `role="dialog"`, `aria-modal="true"`, `aria-label="Saved products"` |
| CartInquiryDrawer role | `role="dialog"`, `aria-modal="true"`, `aria-label="Inquiry Bag"` |
| Escape to close | `keydown` listener on both drawers |
| Focus on open | Moves to close button (50ms setTimeout for animation) |
| Focus on close | Returns to triggering element (`triggerRef`) |
| Heart button | `aria-pressed={saved}`, `aria-label="Save {name}"` / `"Remove {name} from saved"` |
| Add to Inquiry/Cart | `aria-label="{addLabel} — {product.name}"` |
| Navbar heart | `aria-label="Saved products, {n} items"` |
| Navbar bag | `aria-label="Inquiry bag, {n} items"` |
| Count badges | `aria-hidden="true"` — count is in parent `aria-label` |
| Drawer close buttons | `width: 44`, `height: 44` — 44px tap target |
| Item remove buttons | `width: 44`, `height: 44` |
| Quantity controls | `aria-label="Decrease/Increase quantity of {name}"` |
| Overlay | `aria-hidden="true"` |
| Focus rings | `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` on all interactive elements |
| Overflow | `overflow-x: hidden` on both drawer panels; `overflow-y: auto` on item lists |
| Body scroll lock | `document.body.style.overflow = "hidden"` when either drawer is open |

---

## 12. Forbidden Work Confirmation

| Item | Status |
|---|---|
| Checkout page or flow | ✅ Not created |
| Payment or payment icons | ✅ Not added |
| Backend / API / database | ✅ Not created |
| User account / login | ✅ Not created |
| Cart page (`/cart`) | ✅ Not created — drawer only |
| Wishlist/Saved page (`/saved`) | ✅ Not created — drawer only |
| Product detail pages | ✅ Not created |
| Fake prices | ✅ Not added anywhere |
| Fake stock counts | ✅ Not added anywhere |
| "Buy Now" label | ✅ Zero occurrences (functional) |
| "Checkout" label | ✅ Zero occurrences (functional) |
| "COD accessory" badge | ✅ Zero occurrences (functional) |
| Apple logo | ✅ Not added |
| Google logo | ✅ Not added |
| Hero modifications | ✅ Not touched |
| New npm packages | ✅ None — Framer Motion already available |
| Hardcoded `wa.me` outside `lib/constants.ts` | ✅ Zero occurrences |

---

## 13. TypeScript Result

```
npx tsc --noEmit → exit code 0 — zero errors
```

---

## 14. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 2.2s
✓ TypeScript: Finished in 1601ms — zero errors
✓ Generating static pages (13/13) in 306ms

Routes:
○ / (Static)
○ /_not-found (Static)
○ /products (Static)
● /products/[category] — 8 SSG paths

Result: Zero build errors. Zero TypeScript errors. All 13 pages generated.
```

---

## 15. Manual Test Checklist

| Test | Expected behaviour |
|---|---|
| Heart on product listing card | Saves item; heart turns red; savedCount badge appears in Navbar |
| Heart toggle (already saved) | Removes item; heart turns hollow; badge decrements |
| Navbar Heart opens drawer | Saved drawer slides in from right |
| Saved drawer empty state | "No saved products yet…" message shown |
| Saved item "Add to Inquiry" | Item moves to Inquiry Bag; Inquiry Bag drawer opens |
| Saved item "Add to Cart" (accessory) | Item moves to Inquiry Bag as accessory; Inquiry Bag drawer opens |
| Saved drawer "Send Saved List on WhatsApp" | Opens WhatsApp with saved product list |
| Saved "Clear all" | Empties saved list; localStorage `"afan_saved"` is cleared |
| Device "Add to Inquiry" on product card | Adds to Inquiry Bag; Inquiry Bag drawer opens |
| Accessory "Add to Cart" on product card | Adds to Inquiry Bag as accessory; drawer opens |
| Same device added twice | Quantity stays 1 (no duplicate) |
| Same accessory added twice | Quantity increments to 2 |
| Accessory quantity + button | Increments up to max 9 |
| Accessory quantity − button | Decrements; disabled and greyed at 1 |
| Inquiry Bag "Send on WhatsApp" | Opens WhatsApp with correct mixed/devices-only/accessories-only message |
| Inquiry Bag "Clear all" | Empties cart; localStorage `"afan_cart"` is cleared |
| Navbar Bag count badge | Shows exact count 1–9; shows "9+" above 9 |
| Escape key on Saved drawer | Closes drawer; focus returns to triggering element |
| Escape key on Inquiry Bag | Closes drawer; focus returns to triggering element |
| Overlay click (desktop) | Closes open drawer |
| Page refresh | Saved items and cart items restored from localStorage |
| localStorage keys | Exactly `"afan_saved"` and `"afan_cart"` confirmed |
| Featured Products heart | Saves item; updates same global saved count |
| Featured Products — no Add to Inquiry/Cart | Only heart + Ask on WhatsApp visible |
| No product says "Buy Now" | Verified: zero occurrences |
| No "Checkout" wording | Verified: zero occurrences |
| No hardcoded `wa.me` outside constants.ts | Verified: zero occurrences |
| Mobile Navbar Heart | Closes mobile menu first; then opens Saved drawer |
| Mobile Navbar Bag | Closes mobile menu first; then opens Inquiry Bag drawer |

---

## 16. Issues / Risks

**None identified.**

- No TypeScript errors
- No build errors
- All IMPLEMENTATION_LOCKS verified
- No forbidden strings in functional code
- Body scroll is managed by both the Navbar mobile menu and the drawers — since drawers use `z-[1003]` (above mobile menu `z-[1001]`), they render on top correctly. The mobile close-first flow prevents both open simultaneously.

---

## 17. Approval Status

**Awaiting user review.**

Phase 12B summary:
- 5 new files created, 4 existing files modified
- All 12 IMPLEMENTATION_LOCKS verified ✅
- `localStorage` keys: `"afan_saved"` and `"afan_cart"` ✅
- Count badges: 1–9 exact, `"9+"` above 9 ✅
- Accessory badge: `"Accessory item"` ✅
- Device buttons: `"Add to Inquiry"` ✅
- Accessory buttons: `"Add to Cart"` ✅
- Final CTAs: `"Send on WhatsApp"` / `"Send Saved List on WhatsApp"` ✅
- Zero TypeScript errors · Zero build errors · All 13 pages generated ✅

---

*Phase 12B · Wishlist + Cart / Inquiry Bag Implementation · Report version 1.0 · 2026-05-29*
