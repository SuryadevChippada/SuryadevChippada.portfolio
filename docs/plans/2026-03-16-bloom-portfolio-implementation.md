# Bloom Portfolio Hero — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing multi-section portfolio with a full-screen Bloom liquid glass two-panel hero page that encapsulates all portfolio content.

**Architecture:** Single `HeroBloom.tsx` component renders the entire page — a full-viewport video background (z-0) with a flex-row two-panel overlay (z-10). Left panel (52%) has the main hero content; right panel (48%, desktop only) has feature cards. All existing section components are deleted; `App.tsx` renders only `HeroBloom`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v3, Framer Motion v12, lucide-react (to install), Vite 7

---

## Pre-flight checks

Before starting, confirm:
- `npm run dev` starts the dev server successfully
- The video URL is accessible: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4`

---

### Task 1: Install lucide-react

**Files:**
- Modify: `package.json` (via npm install)

**Step 1: Install the package**

```bash
npm install lucide-react
```

Expected output: `added N packages` with no errors.

**Step 2: Verify the import works**

Temporarily add to any existing `.tsx` file and remove:
```ts
import { Download } from 'lucide-react'
```
Run `npm run build` — should compile with no errors. Then remove the test import.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react dependency"
```

---

### Task 2: Update Tailwind config — add font families

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Open and read the current config**

Current content at `tailwind.config.js`. The `fontFamily` block currently only has `mono`.

**Step 2: Add display and serif font families**

Replace the `fontFamily` block:

```js
fontFamily: {
  mono: ['"JetBrains Mono"', 'monospace'],
  display: ['Poppins', 'sans-serif'],
  serif: ['"Source Serif 4"', 'serif'],
},
```

This enables `font-display` and `font-serif` Tailwind utility classes.

**Step 3: Verify no build errors**

```bash
npm run build
```

Expected: compiles successfully.

**Step 4: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add Poppins and Source Serif 4 font families to Tailwind"
```

---

### Task 3: Rewrite index.css — fonts + liquid glass classes

**Files:**
- Modify: `src/index.css`

**Step 1: Replace the entire file**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Source+Serif+4:ital@1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000;
  -webkit-font-smoothing: antialiased;
}

@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      transparent 40%,
      transparent 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .liquid-glass-strong {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    box-shadow:
      4px 4px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 1px rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      transparent 40%,
      transparent 60%,
      rgba(255, 255, 255, 0.2) 80%,
      rgba(255, 255, 255, 0.5) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add liquid-glass CSS components and Poppins/Source Serif 4 fonts"
```

---

### Task 4: Rewrite App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Replace the entire file**

```tsx
import HeroBloom from './components/HeroBloom'

export default function App() {
  return <HeroBloom />
}
```

Note: This will cause a TypeScript error since `HeroBloom.tsx` doesn't exist yet. That's expected — fix in Task 5.

---

### Task 5: Create HeroBloom.tsx — video background + layout shell

**Files:**
- Create: `src/components/HeroBloom.tsx`

**Step 1: Create the file with the video background and layout shell**

```tsx
import { Github, Linkedin, Mail, Menu, Download, Zap, Code2, ArrowRight, Sparkles } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'

export default function HeroBloom() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-display">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content layer */}
      <div className="relative z-10 flex min-h-screen">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}

function LeftPanel() {
  return (
    <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
      {/* Glass overlay behind all left content */}
      <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl" />

      {/* All content sits above the glass overlay */}
      <div className="relative z-10 flex flex-col min-h-full">
        <LeftNav />
        <HeroCenter />
        <BottomQuote />
      </div>
    </div>
  )
}

function LeftNav() {
  return (
    <nav className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2">
        {/* Logo placeholder */}
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">SC</span>
        </div>
        <span className="text-white font-semibold text-2xl tracking-tighter">suryadev</span>
      </div>
      <button className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform">
        <Menu className="w-4 h-4" />
        <span>Menu</span>
      </button>
    </nav>
  )
}

function HeroCenter() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 px-4 text-center">
      {/* Logo mark placeholder */}
      <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
        <span className="text-white text-2xl font-semibold">SC</span>
      </div>

      {/* Main headline */}
      <h1 className="text-6xl lg:text-7xl font-medium font-display text-white tracking-[-0.05em] leading-tight">
        Building<br />
        <em className="font-serif not-italic italic text-white/80">intelligent</em><br />
        systems.
      </h1>

      {/* CTA button */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noreferrer"
        className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
          <Download className="w-4 h-4" />
        </span>
        Explore Now
      </a>

      {/* Pill tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {['Computer Vision', 'AI Systems', 'Edge Inference'].map((tag) => (
          <span
            key={tag}
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function BottomQuote() {
  return (
    <div className="px-6 pb-6 flex flex-col items-center gap-3 text-center">
      <p className="text-xs tracking-widest uppercase text-white/50">Visionary Engineering</p>
      <p className="text-sm text-white/80 font-display">
        "We built where <em className="font-serif italic text-white/60">code meets</em> the physical world."
      </p>
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-white/20" />
        <span className="text-xs tracking-widest uppercase text-white/50">Suryadev Chippada</span>
        <div className="h-px w-12 bg-white/20" />
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="hidden lg:flex w-[48%] flex-col p-6 gap-4">
      <RightTopBar />
      <CommunityCard />
      <FeatureSection />
    </div>
  )
}

function RightTopBar() {
  return (
    <div className="flex items-center justify-between">
      {/* Social icons pill */}
      <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3">
        {[
          { icon: Github, href: 'https://github.com/SuryadevChippada' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/suryadev-chippada' },
          { icon: Mail, href: 'mailto:chippadasurya8@gmail.com' },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <ArrowRight className="w-4 h-4 text-white/50" />
      </div>

      {/* Resume button */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noreferrer"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Sparkles className="w-4 h-4" />
        <span>Resume</span>
      </a>
    </div>
  )
}

function CommunityCard() {
  return (
    <div className="liquid-glass rounded-2xl p-4 w-56">
      <p className="text-white text-sm font-medium mb-1">Enter my ecosystem</p>
      <p className="text-white/60 text-xs leading-relaxed">
        CS @ TU Darmstadt · Co-founder of FLARE — wildfire detection on edge hardware
      </p>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
      {/* Two side-by-side cards */}
      <div className="flex gap-3">
        <div className="liquid-glass rounded-3xl flex-1 p-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <p className="text-white text-xs font-medium">FLARE</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Wildfire CV system on edge hardware. YOLO-based detection.</p>
        </div>

        <div className="liquid-glass rounded-3xl flex-1 p-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <p className="text-white text-xs font-medium">Tech Stack</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Python · YOLO · React · OpenCV · PyTorch</p>
        </div>
      </div>

      {/* Bottom card */}
      <div className="liquid-glass rounded-3xl p-4 flex gap-3 items-start">
        {/* Image placeholder */}
        <div className="w-24 h-16 rounded-xl bg-white/10 shrink-0" />
        <div className="flex-1">
          <p className="text-white text-xs font-medium">TU Darmstadt</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">BSc Computer Science · Oct 2023–Present</p>
        </div>
        <button className="liquid-glass w-7 h-7 rounded-full flex items-center justify-center text-white text-sm hover:scale-105 transition-transform shrink-0">
          +
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Run dev server to verify it renders**

```bash
npm run dev
```

Open `http://localhost:5173`. Expected: full-screen video background with two-panel glass layout visible.

**Step 3: Run build to verify TypeScript compiles**

```bash
npm run build
```

Expected: no TypeScript errors.

**Step 4: Commit**

```bash
git add src/components/HeroBloom.tsx src/App.tsx
git commit -m "feat: add Bloom liquid glass portfolio hero layout"
```

---

### Task 6: Delete unused components

**Files:**
- Delete: `src/components/Nav.tsx`
- Delete: `src/components/Experience.tsx`
- Delete: `src/components/Skills.tsx`
- Delete: `src/components/Education.tsx`
- Delete: `src/CVModal.tsx`

**Step 1: Delete the files**

```bash
rm src/components/Nav.tsx src/components/Experience.tsx src/components/Skills.tsx src/components/Education.tsx src/CVModal.tsx
```

**Step 2: Verify build still passes**

```bash
npm run build
```

Expected: no errors (App.tsx no longer imports these).

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old section components replaced by HeroBloom"
```

---

### Task 7: Polish pass — typography, spacing, mobile

**Files:**
- Modify: `src/components/HeroBloom.tsx`

**Step 1: Verify mobile layout**

Open devtools, set viewport to 375px width. The right panel should be hidden (`hidden lg:flex`). The left panel should fill full width. Adjust any padding/font size issues found.

**Step 2: Verify the `em` italic rendering**

The `<em>` tags use `font-serif italic text-white/80`. Verify Source Serif 4 is rendering (not falling back to a generic serif). If fallback detected, add `font-style: italic` explicitly in CSS.

**Step 3: Verify glass effect**

The `::before` pseudo-element gradient border should be visible as a thin shimmer around glass cards. If not visible, check that `border-radius` is set on the element (not just inherited) and `overflow: hidden` is present.

**Step 4: Final build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/components/HeroBloom.tsx
git commit -m "polish: adjust HeroBloom spacing and typography"
```

---

## Done

After Task 7, the portfolio is fully replaced with the Bloom liquid glass hero. To add real images later:
- Profile photo: place at `public/profile.jpg`, reference as `src="/profile.jpg"` in the logo placeholder divs
- Education thumbnail: place at `public/edu-thumb.jpg`, reference as `src="/edu-thumb.jpg"` in the bottom card image placeholder
