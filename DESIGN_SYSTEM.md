# Afan Mac Store — Design System
**Phase 1 Document · Reference for all future development**

---

## 1. Font Stack

```css
/* Display / Headlines */
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Geist", sans-serif;

/* Body / UI text */
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Geist", sans-serif;

/* Technical specs / monospace */
font-family: "SF Mono", "Fira Code", "Cascadia Code", monospace;
```

**Loading strategy:**
- System fonts load instantly — no FOUT (Flash of Unstyled Text)
- Inter as web font fallback (self-hosted or Google Fonts — subset Latin only)
- Never load more than one external font family

---

## 2. Typography Scale

| Token            | Size (desktop) | Size (mobile) | Weight | Line Height | Letter Spacing | Usage                            |
|-----------------|---------------|---------------|--------|-------------|----------------|----------------------------------|
| `display`        | 96px          | 52px          | 700    | 1.0         | -0.04em        | Hero headlines                   |
| `headline-xl`    | 72px          | 44px          | 600    | 1.05        | -0.03em        | Hero sub-headlines               |
| `headline-lg`    | 56px          | 40px          | 600    | 1.08        | -0.025em       | Section primary headlines        |
| `headline-md`    | 48px          | 34px          | 600    | 1.1         | -0.02em        | Section secondary headlines      |
| `headline-sm`    | 32px          | 26px          | 600    | 1.15        | -0.015em       | Card headings, sub-sections      |
| `title-lg`       | 24px          | 22px          | 600    | 1.2         | -0.01em        | Product card titles              |
| `title-md`       | 20px          | 18px          | 600    | 1.25        | 0              | Section titles, feature names    |
| `title-sm`       | 17px          | 16px          | 600    | 1.3         | 0              | Navigation items, labels         |
| `body-lg`        | 20px          | 18px          | 400    | 1.65        | 0              | Hero sub-copy, feature callouts  |
| `body-md`        | 17px          | 16px          | 400    | 1.6         | 0              | Standard body text               |
| `body-sm`        | 15px          | 14px          | 400    | 1.55        | 0              | Card descriptions, secondary info|
| `caption`        | 13px          | 12px          | 400    | 1.4         | 0              | Image captions, footnotes        |
| `label`          | 12px          | 11px          | 500    | 1.4         | 0.08em         | Category overlines, status tags  |
| `price`          | 22px          | 20px          | 600    | 1.2         | -0.01em        | Product prices in PKR            |
| `price-sm`       | 17px          | 16px          | 500    | 1.2         | 0              | Discounted / secondary pricing   |
| `button`         | 16px          | 15px          | 500    | 1           | 0              | Button labels                    |
| `nav`            | 14px          | 17px          | 400    | 1           | 0              | Desktop nav links / mobile links |
| `spec`           | 13px          | 13px          | 400    | 1.5         | 0              | Technical spec text              |

### Responsive Typography — clamp() Values
All headline tokens must use `clamp()` for fluid scaling. Never apply fixed `px` sizes to display or headline elements in production.

| Token          | clamp() value                               | Mobile floor | Desktop ceiling |
|---------------|---------------------------------------------|-------------|-----------------|
| `display`      | `clamp(2.75rem, 7vw + 1rem, 6rem)`         | ~44px        | ~96px           |
| `headline-xl`  | `clamp(2.25rem, 5.5vw + 0.5rem, 4.5rem)`  | ~36px        | ~72px           |
| `headline-lg`  | `clamp(2rem, 4vw + 0.5rem, 3.5rem)`        | ~32px        | ~56px           |
| `headline-md`  | `clamp(1.75rem, 3vw + 0.5rem, 3rem)`       | ~28px        | ~48px           |
| `headline-sm`  | `clamp(1.375rem, 2vw + 0.5rem, 2rem)`      | ~22px        | ~32px           |
| `title-lg`     | `clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)`  | ~20px        | ~24px           |
| `body-lg`      | `clamp(1rem, 1.25vw + 0.125rem, 1.25rem)`  | ~16px        | ~20px           |

Tablet behavior (768px): clamp() resolves naturally to the midpoint. Test every headline at 768px to confirm no overflow or awkward line breaks.

### Typography Rules
- Maximum body text column width: **68 characters** (use `max-width: 68ch`)
- Negative letter-spacing only on text ≥ 28px
- Category overline labels are always `label` token — uppercase, 0.08em spacing, muted gray
- Never use italic for emphasis — use weight 600 instead
- Never use all-caps on headlines — overlines only
- Never mix more than 2 font weights within a single card or component
- Minimum font size anywhere on the site: **12px**
- Prices always display in PKR with comma formatting: `PKR 3,49,000`

---

## 3. Color Tokens

### Background & Surface

| Token                 | Hex         | RGB                    | Usage                                              |
|----------------------|-------------|------------------------|----------------------------------------------------|
| `color-bg`            | `#F5F5F7`   | rgb(245, 245, 247)     | Site base background                               |
| `color-surface`       | `#FFFFFF`   | rgb(255, 255, 255)     | Cards, navbar, dropdowns, modals                   |
| `color-surface-alt`   | `#F9F9F9`   | rgb(249, 249, 249)     | Product image areas inside cards                   |
| `color-dark-bg`       | `#000000`   | rgb(0, 0, 0)           | Dark hero sections, premium feature sections       |
| `color-dark-surface`  | `#1C1C1E`   | rgb(28, 28, 30)        | Dark cards, dark panels                            |
| `color-dark-surface-2`| `#2C2C2E`   | rgb(44, 44, 46)        | Elevated dark surface                              |

### Text

| Token                  | Hex         | Usage                                              |
|-----------------------|-------------|----------------------------------------------------|
| `color-text-primary`   | `#1D1D1F`   | Main headlines, primary body text                  |
| `color-text-secondary` | `#6E6E73`   | Descriptions, subheadings, secondary labels        |
| `color-text-tertiary`  | `#AEAEB2`   | Captions, placeholders, disabled text              |
| `color-text-inverse`   | `#F5F5F7`   | Text on dark backgrounds                           |
| `color-text-inverse-2` | `#98989D`   | Secondary text on dark backgrounds                 |
| `color-text-link`      | `#0071E3`   | Inline links                                       |

### Border

| Token                | Hex                      | Usage                                              |
|---------------------|---------------------------|----------------------------------------------------|
| `color-border`       | `#D2D2D7`                | Standard borders, dividers                         |
| `color-border-light` | `#E8E8ED`                | Subtle card borders, section separators            |
| `color-border-dark`  | `#38383A`                | Borders on dark sections                           |
| `color-border-focus` | `#0071E3`                | Focus ring on interactive elements                 |

### Accent (Interactive)

| Token                  | Hex         | Usage                                              |
|-----------------------|-------------|----------------------------------------------------|
| `color-accent`         | `#0071E3`   | Primary CTA buttons, links, active states          |
| `color-accent-hover`   | `#0077ED`   | Hover state of accent                              |
| `color-accent-active`  | `#005BB5`   | Pressed/active state                               |
| `color-accent-subtle`  | `#E8F1FC`   | Badge backgrounds, accent tints                    |

### Status

| Token              | Hex         | Usage                                              |
|-------------------|-------------|----------------------------------------------------|
| `color-success`    | `#34C759`   | In stock indicator, verified badge                 |
| `color-warning`    | `#FF9500`   | Low stock, deal badge                              |
| `color-error`      | `#FF3B30`   | Out of stock, error states                         |
| `color-whatsapp`   | `#25D366`   | WhatsApp CTA button background                     |
| `color-whatsapp-h` | `#1DAE56`   | WhatsApp button hover                              |

### Color Usage Rules
- `color-bg` (#F5F5F7) is always the page background — never pure white
- `color-surface` (#FFFFFF) cards sit on top of `color-bg` to create natural lift
- Accent blue appears **only** on: primary buttons, text links, focus rings, active nav states
- WhatsApp green appears **only** on: WhatsApp CTA buttons and "available on WhatsApp" labels
- No gradients as section backgrounds — gradients are limited to optional badge treatments
- Dark sections use `color-dark-bg` or `color-dark-surface` — never a colored dark background
- Status colors are never used for decorative purposes

---

## 4. Spacing Scale

All spacing follows an **8px base grid**.

| Token     | Value  | px  | Usage                                              |
|----------|--------|-----|----------------------------------------------------|
| `space-1` | 0.25rem| 4px | Icon-to-label gap, tight inline spacing            |
| `space-2` | 0.5rem | 8px | Small internal padding, between stacked labels     |
| `space-3` | 0.75rem| 12px| Compact element spacing                            |
| `space-4` | 1rem   | 16px| Default gap, standard internal padding             |
| `space-5` | 1.25rem| 20px| Slightly larger internal gap                       |
| `space-6` | 1.5rem | 24px| Card internal padding (compact)                    |
| `space-8` | 2rem   | 32px| Card internal padding (standard), grid gaps        |
| `space-10`| 2.5rem | 40px| Between headline and first content element         |
| `space-12`| 3rem   | 48px| Between content blocks within a section            |
| `space-16`| 4rem   | 64px| Section vertical padding (mobile)                  |
| `space-20`| 5rem   | 80px| Section vertical padding (tablet)                  |
| `space-24`| 6rem   | 96px| Section vertical padding (desktop — minimum)       |
| `space-32`| 8rem   | 128px| Hero vertical padding                             |
| `space-40`| 10rem  | 160px| Maximum hero / large feature section padding      |

### Spacing Rules
- Every full-width section has **minimum 96px vertical padding** on desktop
- Section overlines have `margin-bottom: 12px` before the headline
- Headlines have `margin-bottom: 16px` before body copy
- Body copy has `margin-bottom: 40px` before the first CTA or content block
- Card grids: `gap: 24px` on mobile, `gap: 32px` on desktop
- Between two adjacent sections, a minimum of `96px` separates them (each section's padding handles this)

---

## 5. Container & Layout Rules

### Breakpoints

| Name     | Min Width | Layout description                         |
|---------|-----------|---------------------------------------------|
| `xs`    | 0px       | Single column, full-width sections          |
| `sm`    | 390px     | Small mobile (iPhone 14 / 15 size)          |
| `md`    | 768px     | Tablet — 2 column grids                     |
| `lg`    | 1024px    | Small desktop                               |
| `xl`    | 1280px    | Standard desktop                            |
| `2xl`   | 1440px    | Wide desktop                                |

### Container Widths

| Breakpoint | Max Content Width | Horizontal Padding |
|-----------|-------------------|--------------------|
| Mobile    | 100%              | 16px each side     |
| Tablet    | 100%              | 24px each side     |
| Desktop   | 1200px            | 32px each side     |
| Wide      | 1440px            | 40px each side     |

### Column Grids

| Use case                  | Mobile  | Tablet  | Desktop |
|--------------------------|---------|---------|---------|
| Category tiles (homepage) | 2 col   | 2 col   | 4 col   |
| Product cards             | 1 col   | 2 col   | 3–4 col |
| Feature / info cards      | 1 col   | 2 col   | 4 col   |
| Editorial / spotlight     | 1 col   | 1 col   | 2 col   |
| Full-width hero           | 1 col   | 1 col   | 1 col   |

**Category tile layout notes:**
- Homepage category grid is always exactly **4 columns on desktop** — never 5, 6, or 7
- Tablet (768px): **2 columns** — tiles are larger, more readable, more tappable
- Mobile: **2 columns** standard; horizontal scroll is acceptable only if tiles have a fixed width and are explicitly designed for it
- All category tiles must be equal height — use CSS Grid `align-items: stretch`

### Layout Rules
- All content is centered within the container
- Full-bleed sections (hero, dark feature) span 100vw, but their inner content uses the container
- No horizontal scrolling at any breakpoint
- Sidebar layouts are not used in Phase 1 — all layouts are full-width stacked sections

---

## 6. Border Radius Rules

| Token        | Value  | Usage                                              |
|-------------|--------|----------------------------------------------------|
| `radius-xs`  | 4px    | Small inline tags, status badges                   |
| `radius-sm`  | 8px    | Small buttons (if ever used), inputs               |
| `radius-md`  | 12px   | Image thumbnails, small cards                      |
| `radius-lg`  | 18px   | Standard product cards, feature cards              |
| `radius-xl`  | 24px   | Large feature cards, hero image containers         |
| `radius-full`| 9999px | Pills — all buttons, tags, badge pills             |

### Border Radius Rules
- All primary buttons use `radius-full` (pill shape) — no exceptions
- Standard cards use `radius-lg` (18px)
- Image containers within cards use `radius-md` (12px) — slightly less than the card itself
- Input fields use `radius-sm` (8px)
- Status tags and labels use `radius-xs` (4px) or `radius-full` depending on context

---

## 7. Shadow Rules

Shadows communicate elevation. Use them sparingly.

| Token           | Value                                      | Usage                                    |
|----------------|--------------------------------------------|-----------------------------------------|
| `shadow-none`   | `none`                                     | Flat elements, dark sections             |
| `shadow-xs`     | `0 1px 3px rgba(0,0,0,0.06)`              | Subtle lift — navbar on scroll           |
| `shadow-sm`     | `0 1px 4px rgba(0,0,0,0.05)`              | Card resting shadow (barely visible — border does the work) |
| `shadow-md`     | `0 2px 10px rgba(0,0,0,0.07)`             | Card hover — gentle lift                 |
| `shadow-lg`     | `0 4px 20px rgba(0,0,0,0.09)`             | Dropdowns, elevated panels               |
| `shadow-xl`     | `0 8px 32px rgba(0,0,0,0.10)`             | Modals only                              |
| `shadow-focus`  | `0 0 0 3px rgba(0,113,227,0.35)`          | Focus ring for accessibility             |

### Shadow Rules
- The **border** (`1px solid #E8E8ED`) is the primary card differentiator — shadow is secondary depth only
- Cards at rest: border + `shadow-sm` (barely perceptible). Do not rely on shadow to separate cards from background
- Cards on hover: add `shadow-md` — a gentle, soft increase. Never jump to `shadow-xl` on hover
- Shadows are always neutral (rgba black) — never colored shadows
- Shadow opacity never exceeds `0.10`
- No `box-shadow: inset` unless specifically needed for an input state
- Dark section components use `shadow-none` — dark surfaces don't need elevation shadows

---

## 8. Button Styles

### Primary Button
```
Background:    #0071E3
Text:          #FFFFFF
Font:          16px / weight 500
Padding:       12px 22px
Border radius: 9999px (pill)
Border:        none
Hover bg:      #0077ED
Active bg:     #005BB5
Transition:    background-color 0.2s ease
Min height:    44px (accessibility tap target)
Focus ring:    shadow-focus (0 0 0 3px rgba(0,113,227,0.35))
```

### Secondary Button (Outline)
```
Background:    transparent
Border:        1.5px solid #0071E3
Text:          #0071E3
Font:          16px / weight 500
Padding:       11px 22px (accounts for border)
Border radius: 9999px
Hover bg:      rgba(0,113,227,0.06)
Transition:    background-color 0.2s ease
Min height:    44px
```

### Ghost / Text Button
```
Background:    transparent
Border:        none
Text:          #0071E3
Font:          16px / weight 500
Underline:     none at rest / underline on hover
Padding:       4px 0
Cursor:        pointer
```

### WhatsApp Button
```
Background:    #25D366
Text:          #FFFFFF
Icon:          WhatsApp SVG icon, left-aligned, 18px
Gap:           8px between icon and label
Font:          16px / weight 500
Padding:       12px 22px
Border radius: 9999px
Hover bg:      #1DAE56
Transition:    background-color 0.2s ease
Min height:    44px
```

### Dark Section Button (on dark backgrounds)
```
Background:    #FFFFFF
Text:          #1D1D1F
Font:          16px / weight 500
Padding:       12px 22px
Border radius: 9999px
Hover bg:      rgba(255,255,255,0.88)
Transition:    background-color 0.2s ease
```

### Disabled State (all buttons)
```
Opacity:       0.4
Cursor:        not-allowed
Pointer events: none
```

### Button Rules
- All buttons are pill-shaped — `border-radius: 9999px` with no exceptions
- Button text is always sentence case or title case — never uppercase, never all-caps
- Correct examples: "Shop MacBooks" · "Explore iPhones" · "WhatsApp Us" · "View All Deals" · "Learn More"
- Wrong examples: "SHOP NOW" · "BUY NOW" · "EXPLORE" · "CLICK HERE"
- No gradients on any button background
- No icons inside primary buttons (WhatsApp button is the exception)
- Buttons never have drop shadows
- Never use a button smaller than 44px height

---

## 9. Card Styles

### Product Card
```
Background:       #FFFFFF
Border:           1px solid #E8E8ED
Border radius:    18px
Box shadow:       0 1px 4px rgba(0,0,0,0.05)
Hover shadow:     0 2px 10px rgba(0,0,0,0.07)
Hover transform:  translateY(-2px)
Hover transition: transform 0.3s ease-out, box-shadow 0.3s ease-out
Overflow:         hidden
Cursor:           pointer

— Image container —
Background:       #F9F9F9
Aspect ratio:     4:3 (or 1:1 for square products)
Padding:          24px
Image fit:        contain (never cover — must show full product)

— Content area —
Padding:          20px 20px 24px
Gap between rows: 6px standard, 12px before price, 16px before CTA

— Category overline —
Font:             12px / weight 500 / uppercase / 0.08em letter-spacing
Color:            #AEAEB2

— Product name —
Font:             title-lg (24px desktop / 20px mobile) / weight 600
Color:            #1D1D1F

— Spec line —
Font:             body-sm (15px) / weight 400
Color:            #6E6E73

— Price —
Font:             price (22px) / weight 600
Color:            #1D1D1F
Format:           PKR X,XX,XXX

— CTA —
Width:            full-width within card
Style:            Primary button or WhatsApp button
Margin top:       16px
```

### Feature / Info Card
```
Background:       #FFFFFF
Border:           1px solid #E8E8ED
Border radius:    18px
Box shadow:       shadow-xs (0 1px 3px rgba(0,0,0,0.06)) or none
Padding:          32px
Icon size:        40px
Icon color:       #0071E3 or #6E6E73 depending on context
```
Note: Feature cards use border as the primary differentiator, same as product cards. Do not rely on shadow alone.

### Dark Feature Card
```
Background:       #1C1C1E
Border radius:    18px
Padding:          32px
Text:             #F5F5F7
Secondary text:   #98989D
No shadow (dark surface)
```

### Category Tile Card
```
Background:       #FFFFFF
Border radius:    18px
Box shadow:       0 1px 4px rgba(0,0,0,0.05)
Hover shadow:     0 2px 10px rgba(0,0,0,0.07)
Hover transform:  translateY(-2px)
Padding:          24px
Image:            Centered product render, 60–80% of tile width
Label:            Below image, title-sm (17px), weight 600
```

### Card Rules
- Cards in a grid must be the same height — use CSS Grid with `align-items: stretch`
- Price and CTA must always be pinned to the bottom using `flex-direction: column` with `margin-top: auto` on the CTA
- Product images inside cards use `object-fit: contain`, never `cover`
- Card hover only translates vertically — no horizontal movement, no rotation
- No card should have a colored or gradient background (dark cards excepted)
- Consistent aspect ratios within any single grid — do not mix 4:3 and 1:1 in the same section

---

## 10. Header / Dropdown Style Rules

### Navbar Structure
```
Height (desktop):  64px
Height (mobile):   56px
Position:          fixed / sticky top-0
Z-index:           1000

— Default state —
Background:        transparent (over hero) or rgba(255,255,255,0.0)

— Scrolled state (after 60px) —
Background:        rgba(255,255,255,0.85)
Backdrop filter:   blur(20px) saturate(180%)
Border bottom:     1px solid rgba(0,0,0,0.08)
Transition:        background 0.3s ease, border 0.3s ease
```

### Logo
```
Position:          Left-aligned
Type:              Wordmark text "Afan Mac Store"
Font:              17px / weight 600 / #1D1D1F
On dark hero:      #FFFFFF (when navbar is over dark section)
Transition:        color 0.3s ease
```

### Desktop Navigation Links
```
Position:          Centered (flex row, margin: auto)
Font:              nav token (14px) / weight 400
Color:             #1D1D1F
Hover color:       #0071E3
Active color:      #0071E3
Active weight:     500
Hover transition:  color 0.15s ease
Gap between links: 32px
No underlines
```

### Right-side Utilities (desktop)
```
Required items (left to right):
  Wishlist icon      — 20px heart/bookmark icon, #1D1D1F, hover #0071E3, aria-label="Wishlist"
  Cart/Inquiry icon  — 20px shopping bag icon, #1D1D1F, hover #0071E3, aria-label="Inquiry cart"
  WhatsApp button    — Pill outline style, "WhatsApp Us", 14px, #25D366 border + text

Optional item:
  Search icon        — 20px magnifier, #1D1D1F, hover #0071E3 (add if search is implemented)

Gap between icons:  20px
```
Note: Wishlist and Cart/Inquiry are frontend-only inquiry helpers — no backend state, no user accounts. They hold products the customer wants to ask about via WhatsApp.

### Dropdown Menu (desktop)
```
Trigger:           Hover on nav link
Appearance:        Fade in + translateY(6px → 0px)
Duration:          0.2s ease-out
Background:        #FFFFFF
Border radius:     12px
Box shadow:        0 8px 32px rgba(0,0,0,0.12)
Border:            1px solid #E8E8ED
Padding:           16px
Min width:         200px
Links:             15px / weight 400 / #1D1D1F / hover #0071E3
Link padding:      10px 12px
Link border radius:8px
Hover bg:          #F5F5F7
```

### Mobile Menu
```
Trigger:           Hamburger icon, top-right
Overlay:           Full screen, #FFFFFF background
Animation:         Slide down from top or fade in — 0.3s ease-in-out
Close button:      Top-right X icon, 24px
Links:             20px / weight 500 / full-width tap targets (min 52px height)
Divider between groups: 1px solid #E8E8ED
```

### Navbar Rules
- The blur background activates **only on scroll** — not on initial page load (unless the navbar is positioned over a non-hero section)
- **Light hero background:** navbar text and logo start dark (`#1D1D1F`) — no color override needed
- **Dark hero background:** navbar text and logo start white (`#F5F5F7`) and transition back to dark (`#1D1D1F`) after 60px scroll
- Do not force white navbar text when the hero background is light — this creates a contrast failure
- The mobile menu must trap keyboard focus while open (accessibility)
- No image-heavy mega menu in the first build. Use a clean premium Products dropdown with category links only.

---

## 11. Product Image / Mockup Rules

### Card Image Treatment
```
Container background:  #F9F9F9
Image padding:         24px all sides
Image sizing:          contain (never crop or cover)
Aspect ratio:          4:3 standard, 1:1 for watches/AirPods
Image format:          PNG (transparent bg) preferred, WebP for photos
Image fit:             object-fit: contain
Centering:             Horizontal and vertical center
```

### Hero / Editorial Image Treatment
```
Layout:                Full-width or large centered
Background:            Black (#000000) or pure white (#FFFFFF)
Image:                 Official Apple product renders or high-quality photography
Max image width:       100% of container, never stretched
Text overlay:          Only over solid color areas — never over complex product imagery
```

### Image Quality Rules
- Minimum resolution: 2x (retina-ready) — use srcset where possible
- Format priority: WebP → PNG → JPEG
- Never use JPEG for product renders on white/transparent backgrounds (compression artifacts are visible)
- All images lazy-loaded except the hero above the fold
- Hero image loads eagerly (`loading="eager"`)
- Alt text required on all product images: format `"[Product name] — [key spec]"`

### Placeholder / Fallback
```
Background:   #F5F5F7
Icon:         Category icon (e.g. laptop, phone), centered, 40px, #AEAEB2
No broken image icons
No alt text overflow into UI
```

### CSS Mockup Rules (when product renders are unavailable)
- Use clean CSS device frames or SVG outlines — no random external image URLs under any circumstances
- All CSS mockups within a section use identical style: same border color, same border-radius, same proportions
- CSS mockup container: `#F9F9F9` background · `border: 1px solid #E8E8ED` · `border-radius: 12px` · centered content
- Never mix CSS mockups with photography or 3D renders in the same grid
- A consistent, honest placeholder is always better than an inconsistent mix of image styles

### Image Rules
- Never distort, crop, or stretch product images
- Never add drop shadows directly to product PNGs — the card handles all shadow
- Lifestyle imagery is allowed only in hero and editorial sections — not on product cards
- Consistent aspect ratios within every grid — never mix ratios in the same grid
- No external image URLs — all images must be local assets or explicitly sourced

---

## 12. Animation & Motion Rules

### Timing Tokens

| Token               | Duration | Easing         | Usage                                      |
|--------------------|----------|----------------|--------------------------------------------|
| `anim-instant`      | 0ms      | —              | For users with prefers-reduced-motion       |
| `anim-fast`         | 150ms    | ease           | Button hover background, link color        |
| `anim-base`         | 200ms    | ease           | Navbar color transition, small UI changes  |
| `anim-medium`       | 300ms    | ease-out       | Card hover lift, dropdown appear           |
| `anim-slow`         | 500ms    | ease-out       | Section fade-in, text block reveal         |
| `anim-cinematic`    | 800ms    | ease-out       | Hero image entrance, large section reveal  |
| `anim-stagger`      | 80ms     | —              | Delay between staggered items              |

### Scroll-Triggered Animations (entrance only)

| Element type         | Transform start         | Transform end | Duration    | Trigger                    |
|--------------------|-------------------------|---------------|-------------|----------------------------|
| Section headline    | `opacity:0, y:20px`    | `opacity:1, y:0` | 500ms    | 15% in viewport            |
| Body text block     | `opacity:0, y:16px`    | `opacity:1, y:0` | 500ms    | 15% in viewport            |
| Product card        | `opacity:0, y:20px`    | `opacity:1, y:0` | 600ms    | 15% in viewport            |
| Cards (staggered)   | Same as above           | Same          | 600ms + 80ms×n | Each card triggers own |
| Feature card        | `opacity:0, y:20px`    | `opacity:1, y:0` | 500ms    | 15% in viewport            |
| Category tile       | `opacity:0, scale:0.97`| `opacity:1, scale:1`| 400ms | 15% in viewport           |
| Hero image          | `opacity:0`            | `opacity:1`   | 800ms    | Page load (no scroll trigger)|

### Hover / Interaction Animations

| Element           | Animation                                         | Duration | Easing   |
|------------------|---------------------------------------------------|----------|----------|
| Product card      | `translateY(-2px)` + shadow `shadow-sm → shadow-md` | 300ms | ease-out |
| Category tile     | `translateY(-2px)` + shadow increase              | 300ms    | ease-out |
| Button bg         | Color transition                                  | 200ms    | ease     |
| Nav link color    | Color transition                                  | 150ms    | ease     |
| Image inside card | `scale(1.0 → 1.03)` clipped by container          | 400ms    | ease-out |
| Dropdown          | `opacity:0, y:6px → opacity:1, y:0`              | 200ms    | ease-out |

### Forbidden Animations
- Bounce, spring, or elastic easing on any element
- Spinning or rotating elements (except loading spinners)
- Flashing, blinking, or pulsing anything
- Parallax scroll effects of any kind
- Horizontal sliding or sidescroll animations
- Animations faster than 150ms (feels glitchy/broken)
- Animations slower than 1000ms (feels broken)
- Entrance transforms larger than 20px distance
- Animations that loop or repeat on the page
- Simultaneous animations on 6+ elements (causes visual noise)
- Any animation added for entertainment or decoration rather than clarity

### `prefers-reduced-motion` Rule
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
All scroll and entrance animations must degrade to instant appearance. Card hover transforms are also removed under this rule.

---

## 13. Mobile Responsive Rules

### Mobile-First Approach
All components are designed mobile-first — desktop styles are added via `min-width` media queries, not the reverse.

### Typography Adjustments
- Display headline: 96px → 52px
- Section headline: 56px → 34–40px
- All headlines scale fluidly — use `clamp()` for smooth scaling
- Body text: 17px → 16px (minimal change — legibility is the priority)
- Line heights stay the same — do not compress line height on mobile

### Spacing Adjustments
- Section vertical padding: 96px → 64px on mobile
- Hero padding: 128px → 80px on mobile
- Card internal padding: 24px → 20px on mobile
- Grid gaps: 32px → 20px on mobile
- Container horizontal padding: 16px on mobile (prevents content touching edge)

### Layout Adjustments
- All multi-column grids collapse to 1 or 2 columns on mobile
- Category tiles: 2-column grid on mobile (3x2 for 6 categories, etc.)
- Product cards: 1 per row on mobile (full-width)
- Hero: stacked layout (text above, image below) on mobile, or text overlaid on image with scrim

### Navigation
- Desktop navbar links hide on mobile
- Hamburger icon appears top-right
- Mobile menu: full-screen overlay, large tap targets (min 52px per item)
- WhatsApp button in mobile menu (prominent)

### Touch Targets
- Minimum tap target: 44px × 44px for all interactive elements
- Buttons are full-width inside product cards on mobile
- Nav links in mobile menu: full-width, 52px height minimum

### Image Handling
- Hero image: responsive, may be hidden or repositioned on small screens
- Product card images: same aspect ratio, images scale within their container
- No horizontal scroll caused by wide images — all images `max-width: 100%`

### Mobile-Specific Rules
- No hover states on touch devices (use `:hover:not(:focus-visible)` if needed)
- Ensure all text is readable without zooming (no text smaller than 13px)
- No fixed elements other than the navbar
- Avoid content that requires horizontal scrolling

---

## 14. Accessibility Basics

### Color Contrast
- Primary text (`#1D1D1F`) on `#F5F5F7` background: **15.1:1 ratio** — AAA ✓
- Secondary text (`#6E6E73`) on `#FFFFFF`: **5.9:1** — AA ✓
- Accent blue (`#0071E3`) on `#FFFFFF`: **4.7:1** — AA ✓
- White text on accent blue (`#0071E3`): **4.7:1** — AA ✓
- All text must meet minimum **4.5:1** for normal text, **3:1** for large text (AA standard)

### Focus States
- All interactive elements have a visible focus ring: `box-shadow: 0 0 0 3px rgba(0,113,227,0.35)`
- Never remove `outline: none` without providing a custom focus visible style
- Use `:focus-visible` (not `:focus`) to show rings only for keyboard users

### Semantic HTML Requirements
- `<nav>` wraps the navigation
- `<main>` wraps page content
- `<header>` wraps the site header
- `<footer>` wraps the site footer
- `<section>` with `aria-label` for each major page section
- Heading hierarchy: one `<h1>` per page, logical `<h2>` / `<h3>` hierarchy
- `<button>` for interactive controls, `<a>` for navigation links
- Never use `<div>` as a click handler without `role="button"` and keyboard support

### Image Accessibility
- All images must have descriptive `alt` text
- Decorative images use `alt=""`
- Product image format: `alt="MacBook Pro 14-inch — M4 Pro chip, Space Black"`

### Keyboard Navigation
- All interactive elements reachable via Tab key
- Logical tab order following visual reading order
- Mobile menu traps focus while open, releases on close
- Escape key closes modals, dropdowns, and the mobile menu

### `prefers-reduced-motion`
- Must be respected — see Animation Rules section above
- No flashing content (epilepsy risk) under any circumstances

### ARIA Roles and Labels
- Mobile menu toggle button: `aria-expanded`, `aria-controls`, `aria-label="Open menu"`
- Navigation: `aria-label="Main navigation"`
- Product grid: `aria-label="Featured products"` (or relevant label)
- Buttons with only icons: always include `aria-label` or visually hidden text

---

## 15. Non-Negotiable Design Rules

These rules cannot be overridden at any phase. If a design decision conflicts with any of these, the decision must be revised — not the rule.

1. **Apple-inspired, not Apple copy** — Draws from Apple's design language; is its own distinct brand
2. **No Apple logo** — Never use the Apple logo, wordmark, or any Apple trademark
3. **No fake Apple branding** — No implied official authorization, no Apple marketing slogans, no Apple.com replicas
4. **No generic ecommerce template feel** — Every section must feel intentional; if it looks like a theme, redesign it
5. **No loud gradients** — Gradients are banned as section or card backgrounds
6. **No cheap shadows** — Shadow opacity never exceeds 0.10; borders carry the structural differentiation
7. **No overloaded sections** — One purpose per section; no cramming multiple ideas together
8. **No random stock images or external image URLs** — All imagery is local, approved, or CSS/SVG placeholder
9. **No inconsistent typography** — All text uses defined tokens; no arbitrary sizes or typeface mixing
10. **No scope jumps without approval** — No checkout, payment, accounts, admin, or database without explicit user sign-off

---

*Document version: 1.1 · Revised: Phase 1 · Status: Awaiting Approval*
