# Phase 4A — Hero Section Implementation Plan

**Type:** Planning document only. No code written.  
**Sources:** PROJECT_LOCKED_RULES.md, BRAND_DIRECTION.md v1.1, DESIGN_SYSTEM.md v1.1, BUILD_PHASES.md v1.2  
**Status:** Awaiting user approval before Phase 4B code implementation.

> **Phase 4B will build a campaign-style hero slider — not a static two-column hero.**

---

## 1. Hero Layout Structure

### Hero type: 4-slide campaign slider

The hero is a full-width, campaign-style slider. Each slide is a standalone premium product moment with a dominant device visual and a compact text block. The slider auto-advances every 4 seconds, supports manual dot navigation, and pauses on hover and keyboard focus.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     [Fixed Navbar — z-1000]                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Hero Slider — full-width, min-height 90vh, bg #F5F5F7]           │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Container: max-w-[1200px] · centered · px-8                  │ │
│  │                                                                │ │
│  │  ┌──────────────────────┐   ┌─────────────────────────────┐   │ │
│  │  │  LEFT — compact text │   │  RIGHT — product visual     │   │ │
│  │  │  (bottom-left block) │   │  (dominant, large, premium) │   │ │
│  │  │                      │   │                             │   │ │
│  │  │  [Overline]          │   │  [CSS device frame for      │   │ │
│  │  │  [Headline]          │   │   this slide's product]     │   │ │
│  │  │  [Sub-copy]          │   │                             │   │ │
│  │  │  [CTA row]           │   │                             │   │ │
│  │  └──────────────────────┘   └─────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  [Trust stats — fixed row below the slide area, always visible]    │
│  [Slide dot indicators — centered below trust stats]               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Slides

| # | Product | Device visual |
|---|---|---|
| 1 | MacBook | MacBook CSS frame — laptop lid + base |
| 2 | iPhone | iPhone CSS frame — tall portrait |
| 3 | iPad | iPad CSS frame — tablet portrait |
| 4 | Mac mini | Mac mini CSS frame — compact cube |

### Spacing

| Property | Mobile | Desktop |
|---|---|---|
| Section min-height | `85vh` | `90vh` |
| Section padding-top | `48px` | `80px` |
| Section padding-bottom | `48px` | `80px` |
| Navbar offset | Handled by `pt-14 md:pt-16` on `<body>` — no extra offset needed |
| Column gap (desktop) | — | `64px` (`gap-16`) |
| Max content width | `100%` | `1200px` |

### Grid layout

| Breakpoint | Layout |
|---|---|
| Mobile (< 768px) | Single column — text block on top, device visual below |
| Tablet (768px–1023px) | Single column — text left-aligned, device visual below (centered, ~70% width) |
| Desktop (≥ 1024px) | Two columns — text block left (45%), device visual right (55%) |
| Wide (≥ 1440px) | Same two-column — device visual scales larger |

**Text position on desktop:** The text block sits at bottom-left or left-center — compact, not dominant. The product visual is the hero element, not the text. Keep the text block narrow and let the device breathe.

---

## 2. Hero Background — Locked

### Light Hero — Phase 4B Default (Locked)

```
Background:        #F5F5F7 (site base background)
Text:              #1D1D1F (text-primary)
Navbar behavior:   Starts transparent with dark text — no override needed
Device visuals:    CSS device frames on the #F5F5F7 surface
Tone:              Bright, approachable, premium
```

**Status: Locked for Phase 4B.** All 4 slides use the same `#F5F5F7` background. No dark or colored slide backgrounds.

Dark hero (`#000000`) remains a future refinement option — not in Phase 4B.

---

## 3. Approved Slide Copy

**Copywriting rules for all slides:**
- Four-element compact block per slide: overline · headline · sub-copy · CTA row
- Headline: one line maximum on desktop — no thesis statements, no multi-line blocks
- Sub-copy: one line maximum on desktop
- No long paragraphs
- Do NOT use "Your Apple Store" or any phrasing implying official Apple retail status
- Do NOT use "Buy Now" — there is no checkout or payment

---

### Slide 1 — MacBook
```
Overline:  Premium MacBooks
Headline:  MacBooks, Verified and Ready to Use.
Sub-copy:  Clear specs, trusted condition, and fast WhatsApp support.
CTA:       [Buy on WhatsApp]  [View Products]
```

### Slide 2 — iPhone
```
Overline:  Trusted iPhones
Headline:  Genuine iPhones, Simple Buying.
Sub-copy:  Get expert guidance before you buy.
CTA:       [Buy on WhatsApp]  [View Products]
```

### Slide 3 — iPad
```
Overline:  iPad for Work and Study
Headline:  iPads for Work, Study, and Creativity.
Sub-copy:  Find the right iPad with clear advice and support.
CTA:       [Buy on WhatsApp]  [View Products]
```

### Slide 4 — Mac mini
```
Overline:  Compact Power
Headline:  Mac mini for Your Desk Setup.
Sub-copy:  Compact Apple performance for work, business, and home.
CTA:       [Buy on WhatsApp]  [View Products]
```

---

## 4. Hero Content Block (Per Slide)

Each slide renders the same compact content structure. The text block is intentionally short — the product visual carries the visual weight of the slide.

### Per-slide content layout (top to bottom in left column)

```
[Overline — 12px, uppercase, letter-spacing 0.08em, color #AEAEB2]

[Headline — clamp(2rem, 4vw + 0.5rem, 3.5rem), weight 600, #1D1D1F]
  One line maximum on desktop.

[Sub-copy — clamp(1rem, 1.25vw + 0.125rem, 1.25rem), weight 400, #6E6E73]
  One line maximum on desktop.

[CTA row — gap 12px, flex-row desktop / flex-col mobile]
  [Primary]   "Buy on WhatsApp"  ← #25D366 solid pill, 44px min-height
  [Secondary] "View Products"    ← #0071E3 outline pill, 44px min-height
```

**Headline size:** Slides use the `headline-lg` clamp token — not the full `display` token. This keeps the text compact so the device visual dominates.

### CTA behavior

**"Buy on WhatsApp" (primary):**
| Property | Value |
|---|---|
| Background | `#25D366` |
| Text | `#FFFFFF` |
| Icon | WhatsApp SVG icon, left-aligned, 18px, gap 8px |
| Hover | `#1DAE56` |
| Action | `whatsappLink()` from `lib/constants.ts` |
| Message | `"Hi Afan Mac Store! I'd like to order an Apple product. Can you help me?"` |
| Min-height | `44px` |
| Border radius | `9999px` |

**"View Products" (secondary):**
| Property | Value |
|---|---|
| Background | `transparent` |
| Border | `1.5px solid #0071E3` |
| Text | `#0071E3` |
| Hover bg | `rgba(0,113,227,0.06)` |
| Action | `href="/products"` — Next.js `<Link>` |
| Min-height | `44px` |
| Border radius | `9999px` |

### Trust stats placement

Trust stats appear as a **fixed row below the entire slider** — outside the slide area, always visible regardless of which slide is active. This prevents the compact per-slide text block from becoming cluttered.

| Stat | Number style | Label style |
|---|---|---|
| 10K+ Happy Customers | 24px · weight 600 · `#1D1D1F` | 12px · weight 500 · `#6E6E73` |
| 100% Genuine | Same | Same |
| 4.9 ★ Rating | Same · ★ in `#0071E3` | Same |

Layout: horizontal flex row with `1px solid #E8E8ED` pipe separators between each stat. On mobile: 3-column grid, no pipes.

---

## 5. Visual Composition Plan

Each slide features one product — dominant, large, and premium. No multi-device layered compositions within a slide. One product per slide, rendered with intentional depth and quality.

### Per-slide device frames (CSS)

> **WARNING — No placeholder boxes.**
> Every device frame must feel intentional and premium. No flat empty gray rectangles. No broken elements. No external image URLs. No Apple logo or Apple trademark.
>
> - **Do:** Soft gradients on device bodies and screen areas for dimensionality
> - **Do:** Subtle edge highlights (lighter inner stroke or top-edge gradient) per device
> - **Do:** Ambient shadow beneath each device to ground it on the surface
> - **Do:** Simple structural details (keyboard strip on MacBook, side buttons on iPhone, vent slots on Mac mini)
> - **Do not:** Flat gray boxes with no internal detail
> - **Do not:** External image URLs
> - **Do not:** Apple logo or any Apple trademark symbol
>
> If any device looks like a cheap placeholder in-browser, it must be revised before Phase 4B is complete.

---

**Slide 1 — MacBook frame:**
```
Lid/body:
  max-width: 520px, fills ~55% of right column
  aspect-ratio: 16/10
  border-radius: 12px
  border: 1px solid #E0E0E4
  background: linear-gradient(160deg, #FFFFFF 0%, #F0F0F2 100%)
  padding: 14px 14px 26px  ← simulates lid bezel

Screen area (inside lid):
  background: linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)
  border-radius: 8px
  flex-grow: 1
  top inner highlight: 1px solid rgba(255,255,255,0.85)

Base/hinge strip:
  height: 24px
  background: linear-gradient(to bottom, #D8D8DC, #C4C4C8)
  border-radius: 0 0 12px 12px

Ambient shadow:
  box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)
```

**Slide 2 — iPhone frame:**
```
max-width: 220px, fills ~40% of right column
aspect-ratio: 9/19.5
border-radius: 36px
border: 1px solid #3A3A3C
background: linear-gradient(160deg, #3A3A3C 0%, #1D1D1F 100%)
padding: 14px 10px

Side buttons: 2px wide strips, #4A4A4C, positioned left/right

Screen area:
  border-radius: 26px
  background: linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)
  overflow: hidden
  top inner highlight: 1px solid rgba(255,255,255,0.10)

Dynamic Island pill (top): 10px × 26px, #1D1D1F, border-radius: 6px, centered

Ambient shadow:
  box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.07)
```

**Slide 3 — iPad frame:**
```
max-width: 380px
aspect-ratio: 3/4
border-radius: 20px
border: 1px solid #3A3A3C
background: linear-gradient(160deg, #3A3A3C 0%, #1D1D1F 100%)
padding: 18px 14px

Screen area:
  border-radius: 12px
  background: linear-gradient(135deg, #F5F5F7 0%, #E5E5EA 100%)
  overflow: hidden

Face ID pill at top: 8px × 22px, #1D1D1F, border-radius: 4px, centered

Side button strip (right): 3px wide, #4A4A4C

Ambient shadow:
  box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)
```

**Slide 4 — Mac mini frame:**
```
Top-view or front-angled box:
  max-width: 320px
  aspect-ratio: 1/0.3
  border-radius: 14px
  border: 1px solid #D2D2D7
  background: linear-gradient(160deg, #FAFAFA 0%, #E6E6E8 100%)

Top surface:
  inset shadow: inset 0 1px 3px rgba(0,0,0,0.06)
  vent slot band (centered): repeating-linear-gradient rows, 1px #D8D8DC, 3px gap

Front face strip:
  height: ~22% of total height
  background: linear-gradient(to bottom, #D4D4D8, #C0C0C4)
  border-radius: 0 0 14px 14px

Power LED: 4px circle, rgba(0,200,80,0.75), box-shadow: 0 0 5px rgba(0,200,80,0.5)
USB-C ports: 2 small rectangles, #B8B8BC, bottom-right of front face

Ambient shadow:
  box-shadow: 0 16px 48px rgba(0,0,0,0.10), 0 2px 10px rgba(0,0,0,0.06)
```

### When real product renders become available

Each slide's device frame is a self-contained CSS container. Real PNG renders slot in by replacing the screen gradient area with a `<Image>` component using `object-fit: contain`. No structural changes to the slider are needed.

---

## 6. Responsive Behavior

### Desktop (≥ 1024px)
- Two-column layout per slide: compact text block left (45%), product visual right (55%)
- Text block is bottom-aligned or vertically centered — not top-aligned
- Device visual is large and dominant in the right column
- CTAs side-by-side in a single row
- Trust stats: single horizontal row below the full slider
- Slide dots centered below trust stats

### Tablet (768px–1023px)
- Single column per slide: text block above, device visual below
- Text is left-aligned (not centered — prevents awkward single-word lines)
- Device visual scaled to ~70% width, centered
- CTAs side-by-side
- Trust stats horizontal

### Mobile (< 768px)
- Single column per slide: text block on top, device visual below
- Text is left-aligned
- Headline resolves to ~32–36px via clamp() at 375px — appropriate and readable
- Sub-copy resolves to ~16px
- CTAs stack vertically, full-width each
- Device visual scales to ~80% width, centered below text
- Trust stats: 3-column grid below the slider, no pipe separators
- Section min-height: `85vh`

### CTA layout by breakpoint

| Breakpoint | CTA layout |
|---|---|
| Desktop | `flex-row`, side-by-side |
| Tablet | `flex-row`, side-by-side |
| Mobile | `flex-col`, each full-width |

---

## 7. Animation Rules

All animations use Framer Motion. All must respect `prefers-reduced-motion` — instant state, no transforms, no auto-advance.

### Slider transition (slide change)

| Property | Value |
|---|---|
| Transition type | Cross-fade — opacity only. Outgoing: `opacity 1 → 0`. Incoming: `opacity 0 → 1`. |
| Duration | `500ms ease-out` |
| No horizontal slide | Slides never move left or right |
| No vertical translate | No translateY on slide transitions |
| Auto-advance interval | 4 seconds per slide |
| Pause on hover | Mouse over slider area pauses timer |
| Pause on focus | Any keyboard focus inside slider pauses timer |
| Resume | Mouse leave or focus leaving slider area resumes timer |
| `prefers-reduced-motion` | Auto-advance disabled; transitions instant; manual dot navigation only |

### Per-slide text entrance (on each slide appear)

| Element | Initial | Final | Duration | Delay |
|---|---|---|---|---|
| Device frame | `opacity: 0` | `opacity: 1` | `600ms` | `0ms` — device loads first |
| Overline | `opacity: 0, y: 12px` | `opacity: 1, y: 0` | `400ms` | `100ms` |
| Headline | `opacity: 0, y: 16px` | `opacity: 1, y: 0` | `500ms` | `200ms` |
| Sub-copy | `opacity: 0, y: 16px` | `opacity: 1, y: 0` | `400ms` | `300ms` |
| CTA row | `opacity: 0, y: 12px` | `opacity: 1, y: 0` | `400ms` | `380ms` |

All easing: `ease-out`. Max translateY: `16px` — within the approved 20px maximum.

### Slide dot indicators

| Property | Value |
|---|---|
| Position | Centered below trust stats |
| Inactive dot | 8px diameter, `#D2D2D7` |
| Active dot | Expands to 16px width (pill shape), `#1D1D1F` — `200ms ease` |
| Click/tap | Immediately navigates to that slide (cross-fade) |
| Accessible | `aria-label="Go to slide N"` per dot, `role="tab"` pattern |

### Hover states

| Element | Animation |
|---|---|
| "Buy on WhatsApp" | `background-color` → `#1DAE56`, `200ms ease` |
| "View Products" | `background-color` → `rgba(0,113,227,0.06)`, `200ms ease` |

### Forbidden

- No bouncing, spring, or elastic easing
- No spinning or rotating device frames
- No parallax of any kind
- No looping decorative animation
- No horizontal slide or swipe transition between slides
- No entrance animations faster than `150ms` or slower than `1000ms`

### prefers-reduced-motion implementation

Use Framer Motion's `MotionConfig reducedMotion="user"` at the layout level — automatically disables all transforms and transitions. Additionally, in `Hero.tsx`: detect `prefers-reduced-motion` via `window.matchMedia` and stop the auto-advance interval entirely when active. Users navigate via dot controls only.

---

## 8. Files Created / Changed in Phase 4B

### New files

| File | Purpose |
|---|---|
| `sections/Hero.tsx` | Campaign-style hero slider — 4 slides, per-slide text + device frame, trust stats row, dot navigation, auto-advance with hover/focus pause, prefers-reduced-motion support |

### Modified files

| File | Change |
|---|---|
| `app/page.tsx` | Import and render `<Hero />` as the first section. Replace "Phase 2 setup complete." placeholder entirely. |

### Not touched

`components/Navbar.tsx`, `app/layout.tsx`, `lib/constants.ts`, `lib/utils.ts`, `app/globals.css` — all unchanged.

No new npm packages. `framer-motion`, `lucide-react`, `clsx`, and `tailwind-merge` are already installed.

---

## 9. Open Questions — Must Be Confirmed Before Phase 4B

| # | Question | Status |
|---|---|---|
| 1 | **Hero background** | **Locked: `#F5F5F7` (Light)** |
| 2 | **Slide copy** | **Locked: 4 slides as written in Section 3** |
| 3 | **Product render images** | Awaiting — if any PNG/WebP renders are available, provide before Phase 4B. Default: CSS device frames as planned. |
| 4 | **Trust stat wording** | Awaiting — default: **"Happy Customers"** |
| 5 | **Per-slide WhatsApp message** | One shared generic message used for all 4 slides (see Section 4). Confirm if each slide should use a product-specific message (e.g. "I'm interested in a MacBook…"). Default: shared message. |

---

## 10. Reference Interpretation

References provided are used for quality calibration and feel only — not copied directly.

| Reference | What to take from it | What NOT to take |
|---|---|---|
| Apple MacBook Air screenshot | Premium visual quality · clean spacing · product scale · calm high-end feel | Exact Apple campaign copy · Apple logo · official branding |
| iPhone 17 Pro style screenshot | Dramatic product scale · strong product focus · visual dominance | Dark background · giant "PRO" typography · official Apple campaign identity |
| MacFinder screenshot | Trust and sales confidence cues | Crowded layout · heavy cards · busy navigation |
| Apple Mac lineup screenshot | Product discovery grid direction — save for Phase 5 category section | Not applicable to Phase 4B hero slider |

---

## 11. Phase 4B Completion Checklist

Verified in-browser after code is written:

**Slider structure**
- [ ] 4 slides present: MacBook · iPhone · iPad · Mac mini
- [ ] Slides auto-advance every 4 seconds
- [ ] Slider pauses on mouse hover
- [ ] Slider pauses when any slider element receives keyboard focus
- [ ] Slider resumes when hover/focus leaves
- [ ] 4 dot indicators render — correct active state highlighted
- [ ] Clicking/tapping a dot navigates to the correct slide with fade transition

**Per-slide content**
- [ ] Overline renders correctly — uppercase, muted, 12px
- [ ] Headline is one line on desktop — uses `headline-lg` clamp token
- [ ] Sub-copy is one line on desktop — uses `body-lg` clamp token
- [ ] "Buy on WhatsApp" button — green solid pill, WhatsApp icon, 44px min-height
- [ ] "View Products" button — outline pill, accent blue, 44px min-height
- [ ] WhatsApp link uses `whatsappLink()` from `lib/constants.ts` — not hardcoded
- [ ] No "Buy Now" label used anywhere

**Device visuals**
- [ ] Each slide shows the correct device: MacBook / iPhone / iPad / Mac mini
- [ ] Each device frame uses gradients, highlights, and ambient shadow — not flat gray
- [ ] No external image URLs used anywhere
- [ ] No Apple logo or Apple trademark on any frame
- [ ] Each device feels intentional and premium in-browser — if not, revise before sign-off

**Trust stats**
- [ ] Trust stats row visible below the slider at all breakpoints
- [ ] All 3 stats: `10K+ Happy Customers` · `100% Genuine` · `4.9 ★ Rating`
- [ ] Pipe separators visible on desktop, absent on mobile

**Responsive**
- [ ] Desktop (≥ 1024px): two-column — text left compact, device right dominant
- [ ] Mobile (< 768px): single column — text above, device below
- [ ] CTAs stack full-width on mobile
- [ ] No horizontal overflow at any breakpoint
- [ ] Renders correctly at 375px · 768px · 1024px · 1280px · 1440px

**Animation**
- [ ] Per-slide entrance: device first, then text sequence
- [ ] Slide transition is cross-fade only — no horizontal movement
- [ ] `prefers-reduced-motion`: no transitions, no auto-advance, dot navigation only
- [ ] Active dot indicator animates width correctly

**Code quality**
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No new npm packages installed

---

## 12. Approval Status

**Phase 4A (this document) — Awaiting user approval.**

Phase 4B (hero slider implementation) will not begin until this plan is explicitly approved.

No `sections/Hero.tsx` will be created, `app/page.tsx` will not be edited, and no Phase 5 work will begin until approval is received.

---

*Document version: 2.0 · Created: Phase 4A · Updated: 2026-05-24 · Status: Awaiting Approval*
