# Phase 21A — Accessory COD Order Details Strategy Plan

**Date:** 2026-06-01
**Type:** Strategy plan only — no code written
**Status:** Awaiting user approval

---

## 1. Problem

The Inquiry Bag drawer currently handles two product types differently:

- **Devices** (MacBook, iPhone, iPad, etc.) use "Add to Inquiry" — confirmed on WhatsApp because availability, condition, price, and warranty must be discussed first.
- **Accessories** use "Add to Cart" — they can be delivered COD, but there is currently no way to collect delivery details before the WhatsApp message is sent.

When a customer taps "Send on WhatsApp" for accessories, the message contains only product names and quantities. The customer then has to type their address and details manually in WhatsApp, which creates friction and increases drop-off.

**The gap:** Accessories need a lightweight delivery details step inside the drawer before the WhatsApp message is sent. Devices must not be affected.

---

## 2. Recommended Solution

Add a **conditional delivery details form** inside the existing Inquiry Bag drawer (`CartInquiryDrawer.tsx`).

- The form appears **only when the bag contains at least one accessory**.
- The form is positioned **after the accessories list, before the bottom CTA**.
- The CTA label and the WhatsApp message content adapt dynamically based on bag composition.
- **No new page**, **no checkout**, **no payment**, **no backend**.
- Form state lives in component memory only — cleared after send or drawer close.

This is a drawer-internal enhancement. The drawer remains `role="dialog"`, Escape still closes it, and the entire flow ends on WhatsApp.

---

## 3. Devices-Only Flow

**Trigger:** Bag contains one or more devices and zero accessories.

**Drawer layout:**
```
[Inquiry Bag heading]
[Device Inquiries section]
  - MacBook Pro · Inquiry item · Qty 1
  - MacBook Air · Inquiry item · Qty 1
[No delivery form — hidden completely]
[Bottom CTA]
  → "Send Inquiry on WhatsApp"  (green pill, 44px)
```

**WhatsApp message format:**
```
Hi Afan Mac Store, I'd like to inquire about:

Devices:
- MacBook Pro (×1)
- MacBook Air (×1)

Please confirm availability, condition, price, and warranty/checking period for each. Thank you.
```

**What does NOT appear:** delivery form, address fields, any COD language.

---

## 4. Accessories-Only Flow

**Trigger:** Bag contains one or more accessories and zero devices.

**Drawer layout:**
```
[Inquiry Bag heading]
[Accessories section]
  - 20W USB-C iPhone Adapter · Accessory item · Qty [−] 3 [+]
  - MagSafe Charger · Accessory item · Qty [−] 1 [+]
[Delivery Details form — visible]
  Full name *
  WhatsApp / phone number *
  City *
  Complete delivery address *
  Order notes (optional)
[Bottom CTA]
  → "Send Order Details on WhatsApp"  (green pill, 44px)
```

**CTA state:**
- Disabled (greyed, not clickable) if any required field is empty.
- Enabled as soon as all four required fields have non-empty values.
- Disabled state approach is preferred over inline validation on submit — it avoids a jarring error flash and guides the user naturally to complete the form. A subtle helper line reads: _"Fill in delivery details to continue."_ which disappears once the form is complete.

**WhatsApp message format:**
```
Hi Afan Mac Store, I'd like to place a COD order:

Accessories:
- 20W USB-C iPhone Adapter (×3)
- MagSafe Charger (×1)

Delivery Details:
Name: Ahmed Khan
Phone: 0313-3388666
City: Rawalpindi
Address: House 12, Street 4, Satellite Town

Notes: Please pack carefully.

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

---

## 5. Mixed Bag Flow

**Trigger:** Bag contains at least one device AND at least one accessory.

**Drawer layout:**
```
[Inquiry Bag heading]
[Device Inquiries section]
  - MacBook Pro · Inquiry item · Qty 1
[Accessories section]
  - 20W USB-C iPhone Adapter · Accessory item · Qty [−] 2 [+]
[Delivery Details form — visible]
  (same four required fields + optional notes)
[Bottom CTA]
  → "Send Inquiry & Order Details on WhatsApp"  (green pill, 44px)
```

**CTA state:** Same disabled/enabled logic as accessories-only — required delivery fields must be filled because accessories are present.

**WhatsApp message format:**
```
Hi Afan Mac Store, I have two requests:

Device Inquiry:
- MacBook Pro (×1)
Please confirm availability, condition, price, and warranty/checking period.

COD Accessory Order:
- 20W USB-C iPhone Adapter (×2)

Delivery Details:
Name: Ahmed Khan
Phone: 0313-3388666
City: Rawalpindi
Address: House 12, Street 4, Satellite Town

Notes: —

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

---

## 6. Delivery Form Fields

| Field | Type | Required | Placeholder |
|---|---|---|---|
| Full name | `<input type="text">` | Yes | "Your full name" |
| WhatsApp / phone number | `<input type="tel">` | Yes | "03XX-XXXXXXX" |
| City | `<input type="text">` | Yes | "e.g. Rawalpindi, Lahore" |
| Complete delivery address | `<textarea rows="3">` | Yes | "Street, area, landmark…" |
| Order notes | `<textarea rows="2">` | No | "Any special instructions (optional)" |

**Total required fields:** 4
**Optional fields:** 1 (notes)

The form section has a subtle heading: **"Delivery Details"** in `#1D1D1F`, `13px`, `500` weight — not a big section heading, just a compact label row.

---

## 7. Validation Rules

**Strategy: disable-first (recommended over submit-time errors)**

- The CTA button is **disabled** when accessories are in the bag and any required field is empty.
- A single helper text below the form reads: _"Fill in delivery details to continue."_ in `#6E6E73`, `12px`.
- Once all required fields are non-empty (trimmed), the CTA becomes enabled and the helper text disappears.
- No per-field red error messages on first render — keep the drawer clean.
- If the user clears a required field after the CTA was enabled, the CTA returns to disabled immediately (reactive, not on-submit).

**Field-level rules:**
- Full name: `value.trim().length > 0`
- Phone: `value.trim().length > 0` (no regex enforced — user might type various formats)
- City: `value.trim().length > 0`
- Address: `value.trim().length > 0`
- Notes: no validation

**Why disable-first over inline validation:**
Inline validation on a small drawer can feel aggressive, especially before the user has had a chance to fill the form. Disabling the CTA with a single calm helper line is the Apple-style approach — the user understands what's needed without red borders or error messages cluttering the UI.

---

## 8. Privacy / Storage Rules

| Data | Storage |
|---|---|
| Full name | Component state (memory only) — **not** localStorage |
| Phone number | Component state (memory only) — **not** localStorage |
| City | Component state (memory only) — **not** localStorage |
| Address | Component state (memory only) — **not** localStorage |
| Notes | Component state (memory only) — **not** localStorage |
| Accessory cart items (names, qty) | Existing localStorage (unchanged) |
| Device inquiry items | Existing localStorage (unchanged) |

**Clearing rules:**
- Delivery form fields reset to empty when:
  - The drawer is closed (unmount or close button)
  - "Clear all" is tapped
  - WhatsApp send button is tapped (immediately after composing the URL)
- Cart/inquiry items clear behaviour is unchanged from current implementation.

**No backend, no server-side storage, no cookies, no analytics capture of delivery details.**

---

## 9. WhatsApp Message Format

### Rules

**Always include:**
- Product names and quantities
- _"Please confirm final price, delivery charges, and availability on WhatsApp."_

**Never include:**
- Fake prices or price estimates
- Fake delivery charges
- Fake stock status ("only 2 left")
- Payment instructions
- Order IDs or confirmation numbers

### Message Templates

**Devices only:**
```
Hi Afan Mac Store, I'd like to inquire about:

Devices:
{deviceList}

Please confirm availability, condition, price, and warranty/checking period for each. Thank you.
```

**Accessories only:**
```
Hi Afan Mac Store, I'd like to place a COD order:

Accessories:
{accessoryList}

Delivery Details:
Name: {name}
Phone: {phone}
City: {city}
Address: {address}
{notesLine}

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

**Mixed:**
```
Hi Afan Mac Store, I have two requests:

Device Inquiry:
{deviceList}
Please confirm availability, condition, price, and warranty/checking period.

COD Accessory Order:
{accessoryList}

Delivery Details:
Name: {name}
Phone: {phone}
City: {city}
Address: {address}
{notesLine}

Please confirm final price, delivery charges, and availability on WhatsApp. Thank you.
```

**Notes line logic:** Only included if notes field is non-empty: `Notes: {notes}`. Omitted entirely (no blank line) if empty.

---

## 10. UI Placement

The delivery form appears **inside the existing Inquiry Bag drawer**, in this vertical order:

```
┌─────────────────────────────────┐
│ Inquiry Bag                  ✕  │  ← drawer header
├─────────────────────────────────┤
│ Device Inquiries (if any)        │  ← existing section
│   - MacBook Pro ×1              │
├─────────────────────────────────┤
│ Accessories (if any)             │  ← existing section (+ qty controls)
│   - 20W Adapter ×2  [− 2 +]    │
├─────────────────────────────────┤
│ ─────────────────────────────── │  ← 1px #E8E8ED divider (only if accessories present)
│ Delivery Details                 │  ← compact section label (only if accessories present)
│   Full name *          [______] │
│   WhatsApp / phone *   [______] │
│   City *               [______] │
│   Address *          [________] │
│                      [________] │
│   Notes              [________] │
├─────────────────────────────────┤
│ Fill in delivery details…        │  ← helper text (disappears when form complete)
│ [Send Order Details on WhatsApp] │  ← green pill CTA, 44px
│ [Clear all]                      │  ← secondary text button
└─────────────────────────────────┘
```

**Drawer scroll:** The drawer body is already `overflow-y-auto`. The form adds height but does not break the scroll — the CTA is always visible via the pinned footer area.

**Mobile:** On 375px, inputs stack full-width. The drawer scrolls naturally. The keyboard opens below the active input without obscuring the CTA.

---

## 11. Visual Rules

| Element | Style |
|---|---|
| Drawer surface | `#FFFFFF` |
| Section divider | `1px solid #E8E8ED` |
| Form section label ("Delivery Details") | `#1D1D1F`, `13px`, `font-weight: 500` |
| Input background | `#FFFFFF` |
| Input border | `1.5px solid #D2D2D7` |
| Input border (focus) | `1.5px solid #0071E3` + focus ring `0 0 0 3px rgba(0,113,227,0.35)` |
| Input border radius | `12px` (`radius-md`) |
| Input min-height | `44px` for single-line; `auto` for textarea |
| Input padding | `12px 14px` |
| Input font size | `14px` |
| Input placeholder color | `#AEAEB2` |
| Label text | `#6E6E73`, `12px`, `font-weight: 500` |
| Required asterisk (*) | `#FF3B30`, `12px` |
| Helper text ("Fill in delivery details…") | `#6E6E73`, `12px` — fades out when form complete |
| CTA (enabled) | Green pill `#25D366` bg, `#FFFFFF` text, `font-weight: 600`, `44px` min-height |
| CTA (disabled) | `opacity: 0.45`, `cursor: not-allowed` |
| No payment icons | ✅ None |
| No COD badge/chip overload | ✅ One inline label in Accessories section header only |
| No dark ecommerce checkout look | ✅ Clean white, minimal |

---

## 12. Accessibility Rules

| Rule | Implementation |
|---|---|
| Each input has an associated `<label>` | `htmlFor` matching input `id` |
| Required fields indicated visually | Asterisk `*` in label |
| Required fields indicated programmatically | `required` attribute on input + `aria-required="true"` |
| CTA disabled state accessible | `disabled` attribute (not just `pointer-events: none`) |
| Disabled CTA has accessible name | `aria-label` still descriptive |
| Helper text associated with CTA | `aria-describedby` pointing to helper text element |
| Error/helper text role | `aria-live="polite"` on helper text container |
| Drawer role | `role="dialog"` — unchanged |
| Escape closes drawer | Unchanged from current implementation |
| Focus trap | Unchanged — already implemented in `CartInquiryDrawer.tsx` |
| Focus ring on inputs | `0 0 0 3px rgba(0,113,227,0.35)` on focus |
| Focus visible on CTA | Standard focus ring |
| Textarea resize | `resize: vertical` or `resize: none` (consistent with drawer width) |
| Mobile keyboard | `scroll-into-view` behaviour natural — no JavaScript overrides needed |
| Touch target | All inputs and CTA min `44px` height |

---

## 13. Files Likely Needed in Phase 21B

### Must modify:

| File | Reason |
|---|---|
| `components/CartInquiryDrawer.tsx` | Primary file — add delivery form, conditional CTA label, conditional form rendering, WhatsApp message builder update, form state (useState), CTA disable logic |

### Likely modify:

| File | Reason |
|---|---|
| `context/ShopActionsContext.tsx` | Only if cart quantity controls (+ / −) for accessories are not yet in the drawer — may need a `updateCartQty` action. If qty controls already exist, no change needed. |

### May need to add:

| File | Reason |
|---|---|
| `lib/whatsapp-message.ts` (new helper, optional) | Extract the WhatsApp message builder into a pure function for cleanliness and testability. Not strictly required — can stay inline in the drawer if the drawer file stays manageable. |

### Do NOT modify:

| File | Reason |
|---|---|
| `components/ProductCard.tsx` | No change needed |
| `sections/FeaturedProducts.tsx` | No change needed |
| `components/ProductQuickDetailsDrawer.tsx` | No change needed |
| `components/SavedDrawer.tsx` | No change needed unless a "saved → add to cart" label sync is identified as broken |
| `components/Navbar.tsx` | No change needed |
| `components/Footer.tsx` | No change needed |
| `sections/Hero.tsx` | Locked — no changes ever |
| `data/products.ts` | No change needed |
| `app/globals.css` | No change needed |

---

## 14. Forbidden Work

The following are explicitly out of scope for Phase 21B and all future phases unless the user approves in writing:

| Forbidden | Reason |
|---|---|
| Checkout page | No checkout exists or will exist |
| Payment gateway | No online payment |
| "Pay Now" / "Place Order" / "Buy Now" buttons | Forbidden by PROJECT_LOCKED_RULES.md |
| Backend order storage | No backend |
| Database (orders, customers) | No backend |
| Admin panel | No backend |
| Order tracking | No backend |
| Server-persisted delivery addresses | No backend |
| Delivery form on device inquiry items | Devices are WhatsApp-confirmed — no form |
| Price display on any product | No fake prices |
| Stock counts | No fake stock |
| Product detail pages | Separate future scope if ever approved |
| Changing WhatsApp number | Locked at `923133388666` |
| Modifying Hero | Locked |

---

## 15. Approval Status

**Awaiting user approval.**

### Summary

| Section | Decision |
|---|---|
| Form placement | Inside existing Inquiry Bag drawer, after accessories, before CTA |
| Form fields | Name, phone, city, address (required) + notes (optional) |
| Validation UX | Disable-first (CTA disabled until form complete) — preferred over submit-time errors |
| Form storage | Component memory only — never localStorage |
| CTA label (devices only) | "Send Inquiry on WhatsApp" |
| CTA label (accessories only) | "Send Order Details on WhatsApp" |
| CTA label (mixed) | "Send Inquiry & Order Details on WhatsApp" |
| WhatsApp message | Structured sections per bag type — always ends with "Please confirm final price, delivery charges, and availability." |
| Primary file for Phase 21B | `components/CartInquiryDrawer.tsx` |
| Forbidden | Checkout, payment, backend, product detail pages, Hero changes |

---

*Phase 21A · Accessory COD Order Details Strategy Plan · Version 1.0 · 2026-06-01*
