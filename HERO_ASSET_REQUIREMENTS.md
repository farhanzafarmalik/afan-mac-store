# HERO_ASSET_REQUIREMENTS.md
**Hero image asset specification — must be fulfilled before Phase 4B can be approved.**

---

## 1. Required Files

Place all assets inside `public/hero/` before implementing the final hero slider.

| File | Slide |
|---|---|
| `public/hero/macbook.webp` | MacBook slide |
| `public/hero/iphone.webp` | iPhone slide |
| `public/hero/ipad.webp` | iPad slide |
| `public/hero/mac-mini.webp` | Mac mini slide |

---

## 2. Asset Requirements

### Format
- **WebP preferred** — best compression/quality ratio for hero images
- PNG accepted as fallback (larger file, lossless)
- JPEG not recommended — compression artifacts are visible at large display sizes

### Background
- **Transparent background strongly preferred** — allows the hero to breathe against `#F5F5F7`
- Clean light/white background also acceptable — must match or complement `#F5F5F7` without a visible hard edge
- Dark or colored backgrounds: **not acceptable** — the hero background is locked to `#F5F5F7` (light)

### Resolution
- **Minimum width: 1600px** — displayed large on desktop; anything smaller will look soft
- Recommended: 2000–2400px wide for retina/high-DPI displays
- File size target: under 600 KB per asset after WebP compression

### Visual quality
- Product must be **large, sharp, and dominant** within the frame — not a small centered object with lots of padding
- Suitable for campaign-style crop — the product should fill most of the image area
- Premium render quality — professionally lit, clean, no visible jpeg artifacts or web-grab noise

### Content rules
- **No Apple logo** anywhere in the image — ever
- **No trademark-heavy official Apple campaign imagery** — do not use assets lifted from apple.com
- **No low-quality web-grabbed images** — no watermarks, no compression noise, no blurry edges
- **No random stock photos** — must be a clean product render or high-quality product photograph
- **No external image URLs in code** — all assets must be stored locally in `public/hero/`

---

## 3. Hero Layout After Assets Are Provided

The final hero is a **product-first campaign stage** — the image is the hero, text supports it.

### Desktop layout
```
[ Overline · Headline ]     ← compact, centered or upper-left, text-center
                            ← product image fills the dominant visual area
[ Product image — large ]   ← full-quality render, centered and dominant
                            ← takes up majority of slide height/width
[ Sub-copy · CTA row ]      ← compact, centered or lower-center
```

### Key rules
- No left-text / right-image two-column SaaS layout
- No CSS-drawn device frames as final product visuals
- Product image is `<Image>` (Next.js) with `priority` on slide 0, `loading="lazy"` on others
- Image displayed with `object-fit: contain` inside its container so the full product is visible
- Text is compact, supports the product, never competes with it

### Mobile layout
- Text first (overline + headline)
- Product image below text
- Sub-copy + CTA below image
- No horizontal overflow

### Preserved from current implementation
- 4 slides: MacBook · iPhone · iPad · Mac mini
- Current slide copy (overline, headline, subcopy — unchanged)
- Buy on WhatsApp (via `whatsappLink()`) + View Products CTAs
- 4-second auto-advance
- Pause on hover / keyboard focus
- `prefers-reduced-motion` support (timer disabled, transitions instant)
- Trust stats row below slider
- Dot indicators below trust stats
- Light background `#F5F5F7` locked

---

## 4. Temporary State

- **`sections/Hero.tsx` currently uses CSS device frames** — this is a WIP placeholder, not final
- CSS device frame approach has been **rejected** as a final visual direction
- CSS frames may remain in the file temporarily while assets are being sourced
- **Final hero approval is blocked until real local product image assets are added**
- Once `public/hero/*.webp` files are provided, Hero.tsx will be updated to use `<Image>` components

---

## 5. Asset Sourcing Guidance (non-binding)

These are suggestions only — the team decides how to source assets.

- **Official product renders** (PNG/WebP without logo) from press kits or device mockup resources
- **3-D render tools** — Blender, Cinema 4D, or online mockup generators (remove any Apple logo/text)
- **Commissioned photography** — clean white/transparent background product shots
- **Licensed stock renders** — check license for commercial website use

Regardless of source: the final image stored in `public/hero/` must have no Apple logo, no trademark text, and must be locally hosted.

---

*Document version: 1.0 · Created: 2026-05-24 · Status: Blocking Phase 4B approval*
