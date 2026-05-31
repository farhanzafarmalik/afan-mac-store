# PHASE_12A_WISHLIST_CART_INQUIRY_PLAN.md
**Phase 12A — Wishlist + Cart / Inquiry Bag Strategy Plan**

---

## 1. Purpose

The Navbar currently has two icons — Heart (Wishlist) and ShoppingBag (Cart/Inquiry) — that were temporarily wired to WhatsApp as placeholder behavior in Phase 11C. These icons should become a genuinely useful, lightweight frontend-only saved/inquiry system that reflects the business model: WhatsApp-led, no payment, no checkout, no backend.

This plan defines the full strategy for Phase 12B implementation.

---

## 2. Business Logic

| Product type | Category | Purchase path | Cart label | Final action |
|---|---|---|---|---|
| Device | MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods | Manual WhatsApp inquiry | "Add to Inquiry" | "Send on WhatsApp" |
| Accessory | Accessories | COD (future) or WhatsApp confirmation | "Add to Cart" | "Send on WhatsApp" |

**Key constraints that must never be violated:**
- No online payment at any point
- No fake price shown anywhere
- No stock count shown
- Devices are never called "Add to Cart" — always "Add to Inquiry"
- Accessories can say "Add to Cart" (COD eligible)
- The final action in every drawer is always "Send on WhatsApp" — never "Checkout", "Pay", or "Buy Now"
- No product detail pages created in this phase
- No backend, no database, no user account
- No Apple logo, no Google logo
- Hero is not modified

---

## 3. Recommended UX Option

**Recommendation: Option A — Two separate drawers.**

| Option | Description | Verdict |
|---|---|---|
| **A** | Heart icon opens Saved drawer. Bag icon opens Inquiry Bag drawer. | ✅ **Recommended** |
| B | One drawer with two tabs: Saved / Cart & Inquiry | ❌ Not recommended |

**Rationale for Option A:**

Option A is cleaner because Saved and Inquiry Bag serve fundamentally different user intents. Saved is a holding zone — "I'm interested but not ready". Inquiry Bag is an active intent — "I want to inquire/order these now". Combining them into one tabbed drawer adds unnecessary cognitive load (user must switch tabs) and increases the visual complexity of a premium minimal design. Two small focused drawers are easier to use than one complex one.

Option B would also require a default active tab decision every time the drawer opens, and empty-state handling for each tab — all unnecessary complexity.

---

## 4. Wishlist / Saved Drawer Behavior

### Trigger
- Heart icon in Navbar (desktop + mobile)
- Heart icon on each product card (new — save to wishlist shortcut)

### Drawer content
- Panel title: "Saved" (not "Wishlist" — cleaner, Apple-like)
- List of saved products
- Each item shows:
  - Icon (same Lucide icon as product card, 32px)
  - Product name
  - Category name
  - Type badge: "Device" or "Accessory"
  - Move to Inquiry Bag button (label: "Add to Inquiry" for devices, "Add to Cart" for accessories)
  - Remove from Saved button (small, subtle — `×` or Trash icon)
- Empty state: "No saved products yet. Tap the ♡ on any product to save it."
- "Clear all" link — subtle, bottom of list
- Final CTA: "Send Saved List on WhatsApp"
  - Message format:
    ```
    Hi Afan Mac Store, I have saved the following products:
    1. MacBook Pro
    2. iPhone
    3. 20W USB-C iPhone Adapter
    Please share current availability and details.
    ```

### Persistence
- Stored in `localStorage` key: `"afan_saved_items"`
- Survives page refresh and tab close
- Cleared on "Clear all"

### Navbar heart icon behavior
- When `savedCount > 0`: small count badge over icon (max display "9+")
- Badge: `#0071E3` (blue), `12px`, `min-width 16px`, `border-radius 9999px`
- Accessible: `aria-label="Saved products, {count} items"`

---

## 5. Cart / Inquiry Bag Drawer Behavior

### Trigger
- ShoppingBag icon in Navbar (desktop + mobile)
- "Add to Inquiry" button on device product cards
- "Add to Cart" button on accessory product cards

### Drawer title
- "Inquiry Bag"
- Subtitle (small): "Devices are confirmed on WhatsApp. Accessories can be COD."

### Drawer content — item rows

**Device inquiry item:**
- Icon (Lucide, 32px)
- Product name
- Category name
- Badge: "Inquiry item" — `#F5F5F7` bg, `#6E6E73` text, `#E8E8ED` border
- Quantity: fixed `1` — no quantity control (devices are single-inquiry items)
- Remove button (`×`)

**Accessory item:**
- Icon (Package, Lucide, 32px)
- Product name
- Category name
- Badge: "Accessory item" — `#F5F5F7` bg, `#6E6E73` text, `#E8E8ED` border
  *(not "COD accessory" — prices are not confirmed yet; COD is handled via WhatsApp)*
- Quantity controls: `−` / count / `+` buttons
  - Min quantity: 1
  - Max quantity: 9 (no fake stock, just a reasonable cap)
  - `−` button disabled and visually muted at quantity 1
- Remove button (`×`)

### Sections in drawer
If both device and accessory items are present, render two sub-sections:
1. **Device Inquiries** — labelled heading, all device items
2. **Accessories** — labelled heading, all accessory items

If only one type, no sub-section heading needed — just the flat list.

### Empty state
"Your Inquiry Bag is empty. Add devices to inquire or accessories to order."

### "Clear all" link — subtle, bottom of list, only visible when items exist

### Final CTA: "Send on WhatsApp"
- Full-width pill
- `#25D366` background, `#FFFFFF` text, `MessageCircle` icon
- `hover:bg-[#1DAE56]`
- `min-height: 52px`
- Disabled (greyed, `pointer-events: none`) when bag is empty
- Opens WhatsApp with constructed message (see Section 8)

### Navbar bag icon behavior
- When `cartCount > 0`: small count badge over icon
- Badge matches Saved badge style: `#0071E3`, `12px`, `min-width 16px`
- `aria-label="Inquiry bag, {count} items"`
- `cartCount` = total number of distinct items (accessories count as 1 per item type regardless of quantity — quantity is inside the item, not the count)

---

## 6. Product Card Button Rules

### Two card contexts — different action sets

Product cards appear in two contexts with different action requirements:

| Context | File | Actions |
|---|---|---|
| Product listing pages (`/products`, `/products/[category]`) | `components/ProductCard.tsx` | Heart + Add to Inquiry/Cart + Ask on WhatsApp |
| Homepage Featured Products strip | `sections/FeaturedProducts.tsx` | Heart + Ask on WhatsApp only |

**Reason for Featured Products limitation:** The Featured Products strip is a homepage highlight — compact and premium. Adding a full 3-button layout would overload the card and detract from the clean homepage aesthetic. The heart save icon is low-friction enough to include; the full "Add to Inquiry/Cart" action belongs on the dedicated product listing pages.

---

### Product listing cards — `components/ProductCard.tsx`
Current card has a single `WhatsAppCTA` button. New card will have **three** interactive elements:

**Device product listing cards (MacBook, iPhone, iPad, Mac mini, iMac, Apple Watch, AirPods)**

| Element | Position | Behavior |
|---|---|---|
| Heart icon | Top-right corner of image area | Toggles saved state. Filled heart = saved. |
| "Add to Inquiry" pill | Bottom of card, left/primary | Adds product to Inquiry Bag, opens drawer briefly (or shows brief feedback) |
| "Ask on WhatsApp" pill | Bottom of card, right/secondary | Direct WhatsApp (unchanged from current) |

**Accessory product listing cards (categorySlug === "accessories")**

| Element | Position | Behavior |
|---|---|---|
| Heart icon | Top-right corner of image area | Toggles saved state |
| "Add to Cart" pill | Bottom of card, left/primary | Adds to Inquiry Bag as accessory item, opens drawer briefly |
| "Ask on WhatsApp" pill | Bottom of card, right/secondary | Direct WhatsApp (unchanged) |

---

### Featured Product cards — `sections/FeaturedProducts.tsx`
Featured cards get a **lighter** action set — two interactive elements only:

**All Featured Product cards (devices and accessories)**

| Element | Position | Behavior |
|---|---|---|
| Heart icon | Top-right corner of image area | Toggles saved state. Same behaviour as product listing cards. |
| "Ask on WhatsApp" pill | Bottom of card, full width | Direct WhatsApp (unchanged from current) |

No "Add to Inquiry" or "Add to Cart" button on Featured Product cards. Users who want to add to Inquiry Bag navigate to the product listing page.

### Heart icon states
- Hollow `Heart` (Lucide) — not saved
- Filled heart (`fill="#FF3B30"`, `strokeWidth={0}`) — saved
- Transition: `0.15s ease`
- Icon size: `18px`
- Clickable area: `44px × 44px` minimum — meets the tap target spec
- Visual circle: `28px × 28px` centered within the 44px touch target — `rgba(255,255,255,0.85)` background, `border-radius: 9999px`
- Positioning: `top: 0; right: 0` on a `44px × 44px` absolutely-positioned button — the visual circle appears at `top: 12px; right: 12px` relative to image corner due to the button's own padding/centering
- Pattern: use `padding: 13px` on the button to reach 44px while the visible `28px` circle sits centred inside it
- `aria-label`: `"Save {name}"` / `"Remove {name} from saved"`
- `aria-pressed`: `true` / `false`

### Button sizing
Both "Add to Inquiry" / "Add to Cart" and "Ask on WhatsApp" pills:
- `min-height: 44px` — meets the 44px minimum tap target spec
- Side by side in a `flex gap-2` row

Style differentiation:
- "Add to Inquiry" / "Add to Cart" — outline pill: `1.5px solid #0071E3`, `color: #0071E3`, transparent background, `hover:bg-[rgba(0,113,227,0.06)]`
- "Ask on WhatsApp" — solid green pill: `#25D366`, `color: #FFFFFF`, unchanged from current

### Forbidden button labels
- Never: "Buy Now"
- Never: "Checkout"
- Never: "View Details"
- Never: "Add to Cart" on device cards

---

## 7. Drawer Structure

### Common drawer anatomy (both Saved and Inquiry Bag)

```
[Drawer overlay — semi-transparent, closes drawer on click]
[Drawer panel — right side]
  ┌─────────────────────────────────┐
  │ Header                          │
  │  Title + subtitle               │
  │  × Close button (top-right)     │
  ├─────────────────────────────────┤
  │ Item list (scrollable)          │
  │  [item rows]                    │
  │  — or —                         │
  │  [empty state]                  │
  ├─────────────────────────────────┤
  │ Footer (sticky)                 │
  │  Clear all (if items exist)     │
  │  Send on WhatsApp [CTA]         │
  └─────────────────────────────────┘
```

### Dimensions

| Viewport | Drawer width | Overlay |
|---|---|---|
| Mobile (`< 640px`) | 100vw | None (full screen feels natural) |
| Tablet / Desktop (`≥ 640px`) | `min(400px, 90vw)` | Semi-transparent `rgba(0,0,0,0.28)` |

### Animation
- Drawer slides in from the right: `transform: translateX(100%)` → `translateX(0)`
- Duration: `0.28s ease`
- Overlay fades in: `opacity: 0` → `opacity: 1`, `0.22s ease`
- Use `AnimatePresence` + `motion.div` (Framer Motion already installed)
- `reducedMotion="user"` already active via `MotionConfig` elsewhere — same here

### Z-index layering
- Navbar: `z-50` (current)
- Drawer overlay: `z-[60]`
- Drawer panel: `z-[61]`

This stacks drawer above Navbar so it covers correctly on all views.

### Surface style
- Background: `#FFFFFF`
- Left border: `1px solid #E8E8ED`
- No dark background
- No heavy drop shadow — `box-shadow: -2px 0 12px rgba(0,0,0,0.08)`

---

## 8. WhatsApp Message Format

### Saved list message
```
Hi Afan Mac Store, I have saved the following products and want to know more:

1. MacBook Pro
2. iPhone
3. 20W USB-C iPhone Adapter

Please share current availability and details.
```

### Inquiry Bag message — devices only
```
Hi Afan Mac Store, I want to inquire about the following Apple products:

Device inquiries:
1. MacBook Pro
2. Apple Watch

Please confirm current availability, condition, and price.
```

### Inquiry Bag message — accessories only
```
Hi Afan Mac Store, I want to order the following accessories via COD:

Accessories:
1. 20W USB-C iPhone Adapter x 2
2. Braided USB-C to Lightning Cable x 1

Please confirm availability, price, and COD delivery details.
```

### Inquiry Bag message — mixed (devices + accessories)
```
Hi Afan Mac Store, I want to inquire/order the following items:

Device inquiries:
1. MacBook Pro
2. iPhone

Accessories (COD):
1. 20W USB-C iPhone Adapter x 2
2. Braided USB-C to Lightning Cable x 1

Please confirm current availability, condition, price, and COD delivery details for accessories.
```

**Message building rules:**
- Only include sections that have items (no empty "Device inquiries:" heading if none)
- Accessories include `x {quantity}` quantity suffix
- Devices always quantity 1 — no quantity suffix needed
- Message is built dynamically by a pure function: `buildInquiryMessage(cartItems: CartItem[]): string`
- Message is passed to `whatsappLink()` — never hardcoded
- `target="_blank"`, `rel="noopener noreferrer"` on all WhatsApp links

---

## 9. State / localStorage Strategy

### Data stores
Two separate stores. Do not conflate saved items and cart items.

| Store | `localStorage` key | Type |
|---|---|---|
| Saved items | `"afan_saved"` | `SavedItem[]` |
| Cart/Inquiry items | `"afan_cart"` | `CartItem[]` |

### SavedItem type
```ts
interface SavedItem {
  id: string;           // product id
  name: string;         // product name
  categorySlug: string; // e.g. "macbook", "accessories"
  category: string;     // display name e.g. "MacBook"
  productType: "device" | "accessory";
  savedAt: number;      // Date.now() — for ordering if needed
}
```

### CartItem type
```ts
interface CartItem {
  id: string;
  name: string;
  categorySlug: string;
  category: string;
  productType: "device" | "accessory";
  cartMode: "inquiry" | "cod";  // derived from productType
  quantity: number;     // always 1 for devices, 1–9 for accessories
  addedAt: number;
}
```

### State management approach
Single React Context with `useReducer` — `ShopActionsContext`.

```ts
// Actions
type ShopAction =
  | { type: "SAVE_ITEM"; item: SavedItem }
  | { type: "REMOVE_SAVED"; id: string }
  | { type: "CLEAR_SAVED" }
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "MOVE_TO_CART"; id: string }   // move from saved → cart
  | { type: "OPEN_SAVED_DRAWER" }
  | { type: "OPEN_CART_DRAWER" }
  | { type: "CLOSE_DRAWERS" };
```

### localStorage sync
- On mount: read both keys, hydrate state
- On every reducer action: write updated arrays to localStorage
- `try/catch` around all localStorage reads/writes — silently fails in private browsing or when storage is full
- No server-side localStorage access (SSR guard: `if (typeof window !== "undefined"`)

### Derived product type
Rather than adding a `type` field to `data/products.ts`, derive it at the point of card interaction:

```ts
function getProductType(categorySlug: string): "device" | "accessory" {
  return categorySlug === "accessories" ? "accessory" : "device";
}
```

This avoids touching `data/products.ts` and keeps the logic in the state layer. If the product range expands with new accessory categories, this function is the single update point.

---

## 10. Navbar Icon Behavior

### After Phase 12B

| Element | New behavior |
|---|---|
| Heart icon (desktop) | Opens Saved drawer via `OPEN_SAVED_DRAWER` action |
| ShoppingBag icon (desktop) | Opens Cart/Inquiry drawer via `OPEN_CART_DRAWER` action |
| Heart icon (mobile) | Same — opens Saved drawer (closes mobile menu first) |
| ShoppingBag icon (mobile) | Same — opens Cart drawer (closes mobile menu first) |

### Count badges
- Position: `top-0 right-0` or `top-1 right-1` — absolute positioned child of the icon button wrapper
- Only rendered when count > 0
- Display: `Math.min(count, 9)` — show "9" not "9+" for simplicity (badge is small)
- Style: `12px` font, `#0071E3` background, `#FFFFFF` text, `min-width: 16px`, `height: 16px`, `border-radius: 9999px`, `padding: 0 4px`
- Accessible: count is included in `aria-label` of the parent `<a>` / button

### Replacing placeholder WhatsApp behavior
The `WISHLIST_WA_MSG` and `INQUIRY_WA_MSG` constants added in Phase 11C will be removed from `components/Navbar.tsx`. The icons will open drawers instead.

---

## 11. Data Model

### Changes to `data/products.ts`
**No changes required.** Product type is derived from `categorySlug` at runtime (see Section 9). The `Product` interface remains stable.

### Changes to `data/featured-products.ts`
**No changes required.** Featured products use product `id` values that map 1:1 to `PRODUCTS` items. The heart save action on Featured Product cards reads `categorySlug` to derive type — same derivation logic as product listing cards. No "Add to Inquiry/Cart" action is added to featured cards.

### New type definitions
All new types (`SavedItem`, `CartItem`, `ShopAction`, `ShopState`) live in a new file:
`types/shop.ts` or colocated in `context/ShopActionsContext.tsx`.

### Runtime product type derivation
```ts
// lib/shopUtils.ts (new)
export function getProductType(categorySlug: string): "device" | "accessory" {
  return categorySlug === "accessories" ? "accessory" : "device";
}

export function getCartMode(categorySlug: string): "inquiry" | "cod" {
  return categorySlug === "accessories" ? "cod" : "inquiry";
}

export function buildInquiryMessage(items: CartItem[]): string { ... }
export function buildSavedMessage(items: SavedItem[]): string { ... }
```

---

## 12. Files Likely Needed in Phase 12B

| File | Action | Notes |
|---|---|---|
| `lib/shopUtils.ts` | **Create** | `getProductType`, `getCartMode`, `buildInquiryMessage`, `buildSavedMessage` |
| `context/ShopActionsContext.tsx` | **Create** | Provider, reducer, `useShopActions` hook, types |
| `components/SavedDrawer.tsx` | **Create** | Saved items drawer, `"use client"` |
| `components/CartInquiryDrawer.tsx` | **Create** | Inquiry Bag drawer, `"use client"` |
| `components/DrawerOverlay.tsx` | **Create** or inline | Semi-transparent overlay backdrop |
| `components/ProductCard.tsx` | **Modify** | Add heart save button, add "Add to Inquiry" / "Add to Cart" button alongside existing WhatsApp CTA |
| `components/Navbar.tsx` | **Modify** | Replace placeholder WA links with drawer open actions; add count badges |
| `app/layout.tsx` | **Modify** | Wrap body with `<ShopActionsProvider>`, render `<SavedDrawer />` and `<CartInquiryDrawer />` at body level (above footer, outside page content) |
| `sections/FeaturedProducts.tsx` | **Modify** | Add heart save icon only — no "Add to Inquiry/Cart". Featured cards stay compact: heart + Ask on WhatsApp. |

### File count summary
- 5 new files
- 4 modified files

### Provider placement in `app/layout.tsx`
```tsx
<ShopActionsProvider>
  <Navbar />
  {children}
  <SavedDrawer />
  <CartInquiryDrawer />
  <Footer />
</ShopActionsProvider>
```

Drawers render at layout level so they overlay all page content, including inside product listing pages and the homepage.

---

## 13. Responsive Behavior

### Drawer — mobile (`< 640px`)
- Full width: `width: 100vw`
- Full height: `height: 100dvh` (dynamic viewport height, handles iOS keyboard)
- No overlay (drawer IS the full screen)
- Close button prominent at top-right
- Item list scrollable between header and sticky footer CTA
- Product name may wrap to 2 lines — `line-clamp-2`

### Drawer — tablet/desktop (`≥ 640px`)
- Fixed width: `min(400px, 90vw)`
- Height: `100dvh`
- Positioned right: `0`, top: `0`
- Semi-transparent overlay covers rest of screen
- Clicking overlay closes drawer

### Product card buttons
- Two-button row (`flex gap-2`):
  - At `< 380px`: both buttons wrap to stacked column (`flex-col`)
  - At `≥ 380px`: side by side
- Heart icon: always `top: 12px; right: 12px` — never moves

### Count badges
- Always visible regardless of viewport
- No overflow on Navbar (badges are small and contained within the icon area)

---

## 14. Accessibility Rules

| Concern | Implementation |
|---|---|
| Drawer role | `role="dialog"` |
| Drawer aria | `aria-modal="true"`, `aria-label="Saved products"` / `aria-label="Inquiry Bag"` |
| Escape key | `keydown` listener — closes open drawer, returns focus to triggering icon |
| Focus trap | On drawer open, focus moves to close button or first interactive element inside drawer |
| Focus return | On drawer close, focus returns to the icon that triggered it (stored in `triggerRef`) |
| Count badge | Hidden from screen reader via `aria-hidden="true"` on badge element — count included in parent `aria-label` |
| Heart button | `aria-label="Save {name}"` / `aria-label="Remove {name} from saved"` |
| Heart button state | `aria-pressed="true"` when saved, `aria-pressed="false"` when not |
| Add to Inquiry/Cart | `aria-label="Add {name} to Inquiry Bag"` / `aria-label="Add {name} to Cart"` |
| Quantity controls | `aria-label="Decrease quantity"` / `aria-label="Increase quantity"` |
| Item remove `×` | `aria-label="Remove {name} from {drawer name}"` |
| Clear all | `aria-label="Clear all items"` |
| Send on WhatsApp | `aria-label="Send inquiry on WhatsApp"` |
| Overlay | `aria-hidden="true"` — it is not a focusable element |
| No horizontal overflow | Drawers use `overflow-y-auto` on item list, `overflow-x-hidden` on panel |
| Focus ring | All interactive elements use `focus-visible:shadow-[0_0_0_3px_rgba(0,113,227,0.35)]` |

---

## 15. Forbidden Work

| Item | Status |
|---|---|
| Online payment / checkout page | ❌ Not planned |
| Backend / API / database | ❌ Not planned |
| User account / login | ❌ Not planned |
| Cart page (`/cart`) | ❌ Not planned — drawer only |
| Wishlist page (`/saved`) | ❌ Not planned — drawer only |
| Product detail pages | ❌ Not planned |
| Fake prices | ❌ Not planned — no price shown anywhere |
| Fake stock count | ❌ Not planned |
| "Buy Now" button | ❌ Not planned |
| "Checkout" label | ❌ Not planned |
| COD payment flow / courier integration | ❌ Not planned — WhatsApp confirms COD manually |
| "Add to Cart" on device cards | ❌ Forbidden by business rules |
| Apple logo | ❌ Not added |
| Google logo | ❌ Not added |
| Hero modifications | ❌ Not planned |
| Dark section / dark drawer background | ❌ Not planned |
| New npm packages (unless unavoidable) | ❌ Prefer not — Framer Motion already available |

---

## 16. Decisions and Approval Record

### Decision 1 — Two separate drawers (Option A)
**Status: ✅ Approved**
Heart icon opens Saved drawer. Bag icon opens Inquiry Bag drawer. No combined tabbed drawer.

### Decision 2 — Product listing card layout (3-action)
**Status: ✅ Approved**
Product listing cards (`components/ProductCard.tsx`) get: heart icon + Add to Inquiry/Add to Cart + Ask on WhatsApp.
This applies to `/products` and all `/products/[category]` pages.

### Decision 3 — Featured Products card layout (lighter)
**Status: ✅ Approved with correction**
Homepage Featured Product cards (`sections/FeaturedProducts.tsx`) get: heart icon + Ask on WhatsApp **only**.
"Add to Inquiry/Cart" is NOT added to featured cards — keeps the homepage strip compact and premium.

### Decision 4 — Accessory badge wording
**Status: ✅ Approved with correction**
Badge label in Inquiry Bag drawer: **"Accessory item"** (not "COD accessory").
Accessories show "Add to Cart" on product listing cards and are added to Inquiry Bag as accessory items.
WhatsApp message still asks seller to confirm price, availability, and COD delivery details.
No prices are shown anywhere.

### Decision 5 — WhatsApp message formats
**Status: ✅ Approved**
Message formats in Section 8 are approved with the "Accessory item" wording adjustment. COD framing stays in the message text but not in the in-drawer badge label.

### Risk 6 — Drawer z-index over mobile menu
**Severity: Low**
Z-index allocation: Navbar `z-50`, Drawer overlay `z-[60]`, Drawer panel `z-[61]`. Technical implementation detail — no approval needed. Needs testing.

### Risk 7 — localStorage unavailability
**Severity: Low**
Private browsing mode may block localStorage writes. Graceful degradation: state lives in-memory for the session. No user impact beyond session loss. No approval needed.

---

## 17. Approval Status

**All decisions approved. Phase 12B implementation may begin.**

| # | Decision | Status |
|---|---|---|
| 1 | Option A — two separate drawers | ✅ Approved |
| 2 | Product listing cards — heart + Add to Inquiry/Cart + Ask on WhatsApp | ✅ Approved |
| 3 | Featured Product cards — heart + Ask on WhatsApp only (no Add to Inquiry/Cart) | ✅ Approved |
| 4 | Accessories show "Add to Cart" / badge "Accessory item" / COD confirmed via WhatsApp | ✅ Approved |
| 5 | WhatsApp message formats (Section 8) | ✅ Approved |

No further approval is required. Phase 12B code implementation can begin when the user instructs.

---

---

## 18. Revision v1.1 — Changes from v1.0

Applied following user review and direction:

| # | Section | Change |
|---|---|---|
| 1 | §6 Button sizing | `min-height` corrected from `40px` → `44px` on all product card action buttons (Add to Inquiry, Add to Cart, Ask on WhatsApp) — meets 44px tap target spec |
| 2 | §6 Heart icon | Clickable area corrected from `28px × 28px` → `44px × 44px` minimum. Visual circle remains `28px`, centred inside the larger touch target via `padding: 13px`. Icon remains `18px`. |
| 3 | §5 Accessory badge | Badge label changed from `"COD accessory"` → `"Accessory item"`. Prices not confirmed yet; COD is handled entirely on WhatsApp. WhatsApp message still asks for price/availability/COD delivery confirmation. |
| 4 | §6 Featured Products | Scope corrected. Featured Product cards (`sections/FeaturedProducts.tsx`) receive **heart + Ask on WhatsApp only**. Full 3-action layout (Add to Inquiry/Cart) is limited to product listing pages only. |
| 5 | §11 Data model | FeaturedProducts note updated to reflect heart-only (no Add to Inquiry/Cart). |
| 6 | §12 Files | `sections/FeaturedProducts.tsx` row updated: "heart save icon only — no Add to Inquiry/Cart". |
| 7 | §16 Risks | Section renamed "Decisions and Approval Record". All 5 decisions recorded as approved. COD risk resolved with "Accessory item" wording. |
| 8 | §17 Approval status | Updated from "Awaiting approval" to "All decisions approved — Phase 12B may begin". |

---

*Phase 12A · Wishlist + Cart / Inquiry Bag Strategy Plan · Version 1.1 · 2026-05-29*
