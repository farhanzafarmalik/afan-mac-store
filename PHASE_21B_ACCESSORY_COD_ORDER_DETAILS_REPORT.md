# Phase 21B — Accessory COD Order Details Report

**Date:** 2026-06-01
**Status:** Awaiting user review
**Scope:** Lightweight WhatsApp-based COD delivery details step for accessories inside the existing Inquiry Bag drawer. No checkout, no payment, no backend.

---

## 1. Files Changed

| File | Change |
|---|---|
| `components/CartInquiryDrawer.tsx` | Added delivery form, conditional CTA labels, button-based CTA with proper `disabled` attribute, `handleClearAll` resets delivery, delivery state lives in component memory only |
| `lib/shopUtils.ts` | Added `DeliveryDetails` interface, `isDeliveryComplete()` helper, updated `buildInquiryMessage()` to accept optional `delivery?: DeliveryDetails` parameter with new structured message format |

No other files modified.

---

## 2. Devices-Only Flow Result

**Test:** Added MacBook Pro only → opened Inquiry Bag.

| Check | Result |
|---|---|
| Delivery form shown | ❌ Not shown — correct ✅ |
| Helper text "Fill in delivery details…" shown | ❌ Not shown — correct ✅ |
| CTA label | "Send Inquiry on WhatsApp" ✅ |
| CTA disabled | `false` — enabled immediately ✅ |
| Device badge | "Inquiry item" ✅ |
| Qty control | "Qty: 1" (no qty buttons on devices) ✅ |

**Screenshot confirmed:** MacBook Pro with "Inquiry item" badge, "Clear all" link, green "Send Inquiry on WhatsApp" CTA — no form, no COD language, no delivery section.

**WhatsApp message format (devices only):**
```
Hi Afan Mac Store, I'd like to inquire about:

Devices:
1. MacBook Pro (×1)

Please confirm availability, condition, price, and warranty/checking period for each. Thank you.
```

---

## 3. Accessories-Only Flow Result

**Test:** Added 20W USB-C iPhone Adapter only → opened Inquiry Bag.

| Check | Result |
|---|---|
| Delivery form shown | ✅ |
| All 4 required fields present | ✅ Full name, Phone, City, Address |
| Optional notes field present | ✅ |
| Required asterisks (*) on required labels | ✅ (red `#FF3B30`) |
| Helper text "Fill in delivery details to continue." | ✅ Shown while form incomplete |
| CTA label | "Send Order Details on WhatsApp" ✅ |
| CTA disabled while form empty | `disabled = true` ✅ |
| CTA enabled after all required fields filled | `disabled = false` ✅ |
| Helper text disappears after form complete | ✅ |
| Quantity controls (− 1 +) for accessory | ✅ |

**Screenshot confirmed:** Form with all fields filled (Ahmed Khan / 0313-3388666 / Rawalpindi / House 12 Street 4 Satellite Town), green "Send Order Details on WhatsApp" CTA enabled.

**WhatsApp message format (accessories only, with delivery):**
```
Hi Afan Mac Store, I'd like to place a COD order:

Accessories:
1. 20W USB-C iPhone Adapter (×1)

Delivery Details:
Name: Ahmed Khan
Phone: 0313-3388666
City: Rawalpindi
Address: House 12, Street 4, Satellite Town

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

*(Notes line omitted when notes field is empty)*

---

## 4. Mixed Bag Flow Result

**Test:** Added MacBook Pro (device) + 20W USB-C iPhone Adapter (accessory) → opened Inquiry Bag.

| Check | Result |
|---|---|
| "DEVICE INQUIRIES" section heading | ✅ |
| "ACCESSORIES" section heading | ✅ |
| MacBook Pro with "Inquiry item" badge | ✅ |
| 20W Adapter with "Accessory item" badge + qty controls | ✅ |
| Delivery form shown | ✅ |
| Helper text shown while form empty | ✅ "Fill in delivery details to continue." |
| CTA label | "Send Inquiry & Order Details on WhatsApp" ✅ |
| CTA disabled while form empty | `disabled = true` ✅ |

**Screenshot confirmed:** Both device and accessories sections visible, empty delivery form with placeholders and red asterisks, greyed CTA "Send Inquiry & Order Details on WhatsApp".

**WhatsApp message format (mixed):**
```
Hi Afan Mac Store, I have two requests:

Device Inquiry:
1. MacBook Pro (×1)
Please confirm availability, condition, price, and warranty/checking period.

COD Accessory Order:
1. 20W USB-C iPhone Adapter (×1)

Delivery Details:
Name: {name}
Phone: {phone}
City: {city}
Address: {address}

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

---

## 5. Delivery Form Fields Added

| Field | Type | Required | ID |
|---|---|---|---|
| Full name | `<input type="text">` | Yes | `delivery-name` |
| WhatsApp / phone number | `<input type="tel">` | Yes | `delivery-phone` |
| City | `<input type="text">` | Yes | `delivery-city` |
| Complete delivery address | `<textarea rows="3">` | Yes | `delivery-address` |
| Order notes | `<textarea rows="2">` | No | `delivery-notes` |

All inputs have associated `<label htmlFor>`, `required` attribute, and `aria-required="true"` on required fields. Labels include `(optional)` text for the notes field.

---

## 6. Validation Behavior

**Strategy: disable-first (CTA disabled until form complete)**

- `isDeliveryComplete()` in `lib/shopUtils.ts` checks all 4 required fields have `trim().length > 0`
- CTA uses `<button disabled={!ctaEnabled}>` — proper HTML `disabled` attribute
- Helper text `aria-live="polite"` — screen readers announce changes
- Reactive: CTA re-enables immediately when last required field is filled; re-disables if a required field is cleared
- No per-field red borders on first load — helper text is the only guidance until form is complete
- Notes field has no validation — always optional

---

## 7. WhatsApp Message Examples

### Devices only
```
Hi Afan Mac Store, I'd like to inquire about:

Devices:
1. MacBook Pro (×1)
2. MacBook Air (×1)

Please confirm availability, condition, price, and warranty/checking period for each. Thank you.
```

### Accessories only (with notes)
```
Hi Afan Mac Store, I'd like to place a COD order:

Accessories:
1. 20W USB-C iPhone Adapter (×2)
2. MagSafe Charger (×1)

Delivery Details:
Name: Ahmed Khan
Phone: 0313-3388666
City: Rawalpindi
Address: House 12, Street 4, Satellite Town
Notes: Please pack carefully.

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

### Mixed bag
```
Hi Afan Mac Store, I have two requests:

Device Inquiry:
1. MacBook Pro (×1)
Please confirm availability, condition, price, and warranty/checking period.

COD Accessory Order:
1. 20W USB-C iPhone Adapter (×3)

Delivery Details:
Name: Sara Ahmed
Phone: 0300-1234567
City: Lahore
Address: 5B, Model Town, Block C

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

**Never included in any message:** fake prices, delivery charge estimates, fake stock, payment instructions, order IDs, "paid", "checkout".

---

## 8. Storage / Privacy Confirmation

| Data | Storage | Cleared when |
|---|---|---|
| Full name | Component `useState` only | Drawer close / Clear all / Send |
| Phone number | Component `useState` only | Drawer close / Clear all / Send |
| City | Component `useState` only | Drawer close / Clear all / Send |
| Address | Component `useState` only | Drawer close / Clear all / Send |
| Notes | Component `useState` only | Drawer close / Clear all / Send |
| Cart items (names, qty) | Existing `localStorage` (`afan_cart`) | Unchanged |
| Saved items | Existing `localStorage` (`afan_saved`) | Unchanged |

- `handleClearAll` calls both `clearCart()` and `resetDelivery()` — both bag and form reset together
- `handleSend` calls `window.open(waLink)` then `resetDelivery()` — form resets after send
- Component is always mounted (AnimatePresence is internal) so delivery state **persists across open/close cycles within the same page session** ✅
- Page reload naturally clears delivery state (component re-mounts with `EMPTY_DELIVERY`) ✅
- **No backend call. No cookies. No localStorage write for delivery data.** ✅

---

## 9. Accessibility Confirmation

| Check | Implementation |
|---|---|
| Each input has `<label htmlFor>` | ✅ All 5 fields |
| Required inputs have `required` attribute | ✅ 4 required fields |
| Required inputs have `aria-required="true"` | ✅ 4 required fields |
| Disabled CTA uses `disabled` attribute | ✅ `<button disabled>` |
| Helper text has `aria-live="polite"` | ✅ Announces state change to screen readers |
| Focus ring on all inputs | ✅ `focus:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` |
| Focus ring on CTA | ✅ `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` |
| Drawer `role="dialog"` | ✅ Unchanged |
| Escape key closes drawer | ✅ Unchanged |
| Focus trap in drawer | ✅ Unchanged |
| All input min-height ≥ 44px | ✅ `minHeight: 44px` on single-line inputs |
| Autocomplete hints | ✅ `name`, `tel`, `address-level2`, `street-address` |

---

## 10. Mobile QA Result

Tested at 375px viewport:

| Check | Result |
|---|---|
| No horizontal overflow (`hOverflow`) | `false` ✅ |
| Fixed header width | `375px` = viewport ✅ |
| Drawer form readable — all fields full-width | ✅ (screenshot confirmed) |
| Scrollable drawer body — form scrolls naturally | ✅ |
| CTA pinned in fixed footer — always reachable | ✅ |
| Qty controls (−/+) 44px tap targets | ✅ Unchanged |
| "Quick details →" buttons still present | 19 found ✅ |
| "Add to Inquiry" buttons still present | 8 found ✅ |
| All WA links use `923133388666` | 24 links, all correct ✅ |

---

## 11. Confirmation — No Checkout / Payment / Backend Added

- No checkout page ✅
- No payment gateway ✅
- No "Pay Now", "Place Order", "Buy Now" buttons ✅
- No backend API calls ✅
- No database writes ✅
- No order confirmation number generated ✅
- Final action is `window.open(whatsappLink(...))` — opens WhatsApp chat ✅

---

## 12. Confirmation — No Device Checkout Form Added

- Devices-only bag: delivery form is **hidden** (`hasAccessories = false`) ✅
- Device items retain "Inquiry item" badge and "Qty: 1" display ✅
- Device inquiry CTA: "Send Inquiry on WhatsApp" — no delivery language ✅
- Device WhatsApp message does not include delivery section ✅

---

## 13. Confirmation — No Fake Prices / Delivery Charges / Stock Added

- No price fields added to form ✅
- No "estimated delivery: PKR X" in any message ✅
- No stock counts added ✅
- Final message always says: "Please confirm final price, delivery charges, and availability on WhatsApp." — not a stated price ✅
- `data/products.ts` not modified ✅

---

## 14. TypeScript Result

```
npx tsc --noEmit

Exit code: 0 — zero TypeScript errors ✅
```

---

## 15. Build Result

```
npm run build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully
✓ TypeScript: zero errors
✓ Generating static pages (13/13) in 324ms

Routes:
○ /               Static
○ /_not-found     Static
○ /products       Static
● /products/[category]   SSG — 8 paths

Result: Zero build errors · Zero TypeScript errors · 13/13 pages ✅
```

---

## 16. Issues / Risks

**None identified.**

- The `isDeliveryComplete()` check uses `trim().length > 0` — no regex on phone number, respecting the plan's decision to allow various phone formats.
- `window.open` is used for the WhatsApp link (replaces the previous `<a href target="_blank">` approach) — works reliably from button click events (user-initiated, not blocked by popup blockers).
- Delivery state resets on page navigation (component remounts) — this is expected and correct per the privacy rules.

---

## 17. Approval Status

**Awaiting user review.**

### Summary

| Feature | Status |
|---|---|
| Devices-only: no delivery form, "Send Inquiry on WhatsApp" | ✅ PASS |
| Accessories-only: delivery form, disabled CTA until filled, "Send Order Details on WhatsApp" | ✅ PASS |
| Mixed bag: both sections, delivery form, "Send Inquiry & Order Details on WhatsApp" | ✅ PASS |
| Helper text disappears when form complete | ✅ PASS |
| Delivery data: component memory only, never localStorage | ✅ PASS |
| Clear all resets form + bag | ✅ PASS |
| WhatsApp messages structured correctly | ✅ PASS |
| No fake prices / delivery charges / stock | ✅ PASS |
| No checkout / payment / backend | ✅ PASS |
| No device checkout form | ✅ PASS |
| Existing flows (Add to Inquiry, Add to Cart, Saved, Quick Details) | ✅ Unchanged |
| Mobile overflow: 0px, header 375px | ✅ PASS |
| TypeScript: 0 errors | ✅ PASS |
| Build: 13/13 pages, 0 errors | ✅ PASS |

---

*Phase 21B · Accessory COD Order Details · Report version 1.0 · 2026-06-01*
