# Bloom Portfolio Hero — Design Doc
**Date:** 2026-03-16
**Status:** Approved

## Overview
Replace the current multi-section portfolio with a single full-screen "Bloom" liquid glass hero that encapsulates all portfolio content in a two-panel split layout over a looping video background.

## Architecture

### Single-page layout
- `App.tsx` renders only `<HeroBloom />` — no Nav, no separate section components
- One full-viewport component with internal layout

### Video background
- URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4`
- `autoPlay muted loop playsInline`, `object-cover w-full h-full`, `z-0 absolute inset-0`

### Two-panel split
- `flex-row min-h-screen`
- Left: `w-[52%]`, Right: `w-[48%] hidden lg:flex`

## Fonts
- `@import` Poppins (400, 500, 600) + Source Serif 4 (400 italic) from Google Fonts
- Tailwind: `fontFamily: { display: ['Poppins', 'sans-serif'], serif: ['Source Serif 4', 'serif'] }`
- Headings: `font-display font-medium`
- Italic emphasis within headings: `font-serif italic text-white/80`

## Color Palette
- Strict grayscale only in the new hero
- Text hierarchy: `text-white`, `text-white/80`, `text-white/60`, `text-white/50`
- No colored accents

## Liquid Glass CSS (in `@layer components`)

### `.liquid-glass` (light)
```css
background: rgba(255,255,255,0.01);
backdrop-filter: blur(4px);
box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
position: relative; overflow: hidden;
::before { gradient border, 1.4px padding, mask-composite: exclude }
```

### `.liquid-glass-strong` (heavy)
```css
backdrop-filter: blur(50px);
box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
::before { same structure, 0.5/0.2 alpha }
```

## Left Panel

### Nav
- Left: "SC" placeholder div (32×32, rounded-full bg-white/10) + "suryadev" (semibold 2xl tracking-tighter)
- Right: "Menu" button with `<Menu />` icon, `liquid-glass` pill

### Hero center (flex-1, centered)
- "SC" placeholder div (80×80, rounded-full bg-white/15)
- `<h1>`: `text-6xl lg:text-7xl tracking-[-0.05em] font-medium font-display text-white`
  ```
  Building /
  <em>intelligent</em> /
  systems.
  ```
- CTA: "Download CV" button (`<a href="/cv.pdf">`) with `<Download />` icon in `w-7 h-7 rounded-full bg-white/15`. `liquid-glass-strong rounded-full hover:scale-105 active:scale-95`
- 3 pills: "Computer Vision", "AI Systems", "Edge Inference" — `liquid-glass rounded-full text-xs text-white/80`

### Bottom quote
- Label: `VISIONARY ENGINEERING` (text-xs tracking-widest uppercase text-white/50)
- Quote: `"We built where code meets the physical world."` — mixed font-display/font-serif italic
- Author: `SURYADEV CHIPPADA` with horizontal lines on each side

## Right Panel (lg only)

### Top bar
- Social pill: GitHub, Linkedin, Mail icons in `liquid-glass` pill + `<ArrowRight />`
- Account button: `<Sparkles />` icon, `liquid-glass`

### Community card
- `liquid-glass w-56`
- Title: "Enter my ecosystem"
- Body: "CS @ TU Darmstadt · Co-founder of FLARE — wildfire detection on edge hardware"

### Bottom feature section (mt-auto)
- Outer `liquid-glass rounded-[2.5rem]`
- Two side-by-side cards:
  - "FLARE" (`<Zap />` icon) — "Wildfire CV system on edge hardware. YOLO-based detection."
  - "Tech Stack" (`<Code2 />` icon) — "Python · YOLO · React · OpenCV · PyTorch"
- Bottom card:
  - Placeholder image div (96×64, bg-white/10 rounded-xl)
  - Title: "TU Darmstadt"
  - Body: "BSc Computer Science · Oct 2023–Present"
  - "+" button (`liquid-glass` rounded-full)

## Icons (lucide-react)
`Sparkles, Download, Zap, Code2, ArrowRight, Github, Linkedin, Mail, Menu`

## Files to Modify
1. `src/index.css` — fonts, liquid-glass classes, remove old glow-orb styles
2. `tailwind.config.js` — add display/serif font families, keep existing colors for backward compat
3. `src/App.tsx` — render only `<HeroBloom />`
4. `src/components/Hero.tsx` — full rewrite as the Bloom two-panel layout

## Files to Delete
- `src/components/Nav.tsx`
- `src/components/Experience.tsx`
- `src/components/Skills.tsx`
- `src/components/Education.tsx`
- `src/CVModal.tsx`

## Interactive States
- All cards/buttons: `hover:scale-105 transition-transform`
- Social icons: `text-white hover:text-white/80 transition-colors`
- Icon containers: `w-8 h-8 rounded-full bg-white/10 flex items-center justify-center`
