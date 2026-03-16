# Interactive Modal Layer — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Framer Motion modal system to HeroBloom so every card/button opens a Notion-style animated glass modal with full CV content, and the Menu button becomes a functional navigation overlay.

**Architecture:** Single `activeModal` state in `HeroBloom` drives a shared `ModalShell` (animated backdrop + panel). Six modal content components live in `src/components/modals/`. Props flow down via `openModal`/`closeModal` callbacks. `AnimatePresence` handles mount/unmount animation.

**Tech Stack:** React 19, TypeScript, Framer Motion v12, Tailwind CSS v3, lucide-react, Vite 7

---

## Pre-flight

Confirm `npm run build` passes clean before starting. The current `src/components/HeroBloom.tsx` is the only component file. There are no tests in this project — verification is `npm run build` (TypeScript) + visual check in `npm run dev`.

---

### Task 1: Create ModalShell — shared animated overlay and panel

**Files:**
- Create: `src/components/modals/ModalShell.tsx`

**Step 1: Create the file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalShellProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  wide?: boolean
}

export default function ModalShell({ open, onClose, title, children, wide = false }: ModalShellProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/55"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={`relative liquid-glass-strong rounded-3xl w-full ${wide ? 'max-w-2xl' : 'max-w-xl'} max-h-[85vh] flex flex-col`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 shrink-0">
              <h2 className="text-white font-display font-medium text-lg">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:scale-105 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 pb-6 flex-1">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

Expected: `✓ built in Xms`

**Step 3: Commit**

```bash
git add src/components/modals/ModalShell.tsx
git commit -m "feat: add ModalShell animated glass panel component"
```

---

### Task 2: Create FlareModal

**Files:**
- Create: `src/components/modals/FlareModal.tsx`

**Step 1: Create the file**

```tsx
import ModalShell from './ModalShell'

interface Props { open: boolean; onClose: () => void }

const FLARE_BULLETS = [
  'Contributed to the development of an early-stage real-time computer vision pipeline using YOLO-based object detection for smoke and fire recognition',
  'Trained and fine-tuned models on curated aerial imagery datasets to evaluate the feasibility for field deployment',
  'Implemented edge inference prototype on Raspberry Pi 5 (AI HAT+) for autonomous wildfire monitoring experiments',
  'Collaborated in system testing and iterative performance improvements',
]

const XTRA_BULLETS = [
  'Participated in a national UAV design and flight competition organized by Xtra2 UPV at Universitat Politècnica de València',
  'Collaborated with an interdisciplinary student team during system preparation and testing phases',
  'Gained exposure to UAV integration workflows, field testing procedures, and real-time system constraints',
]

const TECH_TAGS = ['Python', 'YOLO', 'OpenCV', 'Raspberry Pi 5', 'AI HAT+', 'PyTorch', 'TensorFlow']

export default function FlareModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="FLARE — Wildfire Detection">
      {/* Role badge */}
      <div className="liquid-glass rounded-full px-3 py-1 inline-flex items-center gap-2 mb-5">
        <span className="text-white/50 text-xs">Co-Founder & CV Developer</span>
        <span className="text-white/20 text-xs">·</span>
        <span className="text-white/50 text-xs">Nov 2024 – Feb 2026</span>
      </div>

      {/* Core bullets */}
      <ul className="space-y-3 mb-6">
        {FLARE_BULLETS.map((b) => (
          <li key={b} className="flex gap-3 text-white/70 text-sm leading-relaxed">
            <span className="text-white/30 mt-1 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>

      {/* XtraChallenge divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-white/40 text-xs tracking-widest uppercase">XtraChallenge 2025</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="liquid-glass rounded-2xl p-3 mb-4 inline-block">
        <span className="text-white/50 text-xs">July 2025 · Universitat Politècnica de València, Spain</span>
      </div>

      <ul className="space-y-3 mb-6">
        {XTRA_BULLETS.map((b) => (
          <li key={b} className="flex gap-3 text-white/70 text-sm leading-relaxed">
            <span className="text-white/30 mt-1 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {TECH_TAGS.map((tag) => (
          <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/70">
            {tag}
          </span>
        ))}
      </div>
    </ModalShell>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/components/modals/FlareModal.tsx
git commit -m "feat: add FlareModal with full CV project content"
```

---

### Task 3: Create StackModal

**Files:**
- Create: `src/components/modals/StackModal.tsx`

**Step 1: Create the file**

```tsx
import ModalShell from './ModalShell'

interface Props { open: boolean; onClose: () => void }

const CATEGORIES = [
  { label: 'Programming',       tools: ['Python', 'Java', 'Lua', 'Shell'] },
  { label: 'CV / ML',           tools: ['OpenCV', 'TensorFlow', 'YOLO', 'NumPy', 'PyTorch'] },
  { label: 'Automation',        tools: ['n8n'] },
  { label: 'Web',               tools: ['React', 'Angular', 'CSS', 'HTML', 'JavaScript'] },
  { label: 'Tools',             tools: ['Git', 'GitHub', 'Neo4j', 'Neovim'] },
  { label: 'Systems',           tools: ['Raspberry Pi'] },
]

export default function StackModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Tech Stack">
      <p className="text-white/50 text-xs mb-5 uppercase tracking-widest">Everything I work with</p>

      <div className="space-y-4">
        {CATEGORIES.map(({ label, tools }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
            <span className="text-white/40 text-xs w-28 shrink-0 pt-1 uppercase tracking-wide">{label}</span>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/components/modals/StackModal.tsx
git commit -m "feat: add StackModal with all CV skill categories"
```

---

### Task 4: Create EducationModal

**Files:**
- Create: `src/components/modals/EducationModal.tsx`

**Step 1: Create the file**

```tsx
import ModalShell from './ModalShell'
import { GraduationCap, CheckCircle2 } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

const CERTS = [
  'Machine Learning & Deep Learning — Udemy (2025)',
  'Web Development — Udemy (2025)',
  'Python for Game Programming: Pygame — Udemy (2025)',
  'Claude Code in Action — Anthropic (2026)',
]

export default function EducationModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Education & Certifications">
      {/* University block */}
      <div className="liquid-glass rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Technische Universität Darmstadt</p>
            <p className="text-white/60 text-xs mt-0.5">BSc Computer Science</p>
            <p className="text-white/40 text-xs mt-1">October 2023 – Present · Darmstadt, Germany</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Certifications</p>
      <div className="space-y-3">
        {CERTS.map((cert) => (
          <div key={cert} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-white/70 text-sm leading-relaxed">{cert}</span>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/components/modals/EducationModal.tsx
git commit -m "feat: add EducationModal with TU Darmstadt and certifications"
```

---

### Task 5: Create CVModal (PDF viewer)

**Files:**
- Create: `src/components/modals/CVModal.tsx`

**Step 1: Create the file**

```tsx
import ModalShell from './ModalShell'
import { Download } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

export default function CVModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Curriculum Vitae" wide>
      {/* PDF iframe */}
      <div className="liquid-glass rounded-2xl overflow-hidden mb-4">
        <iframe
          src="/cv.pdf"
          title="Suryadev Chippada CV"
          className="w-full"
          style={{ height: '60vh' }}
        />
      </div>

      {/* Download button */}
      <a
        href="/cv.pdf"
        download="SuryadevChippada_CV.pdf"
        className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform w-fit"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        Download PDF
      </a>
    </ModalShell>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/components/modals/CVModal.tsx
git commit -m "feat: add CVModal with embedded PDF viewer and download"
```

---

### Task 6: Create ContactModal

**Files:**
- Create: `src/components/modals/ContactModal.tsx`

**Step 1: Create the file**

```tsx
import ModalShell from './ModalShell'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

const LINKS = [
  { icon: Github,   label: 'GitHub',   value: 'SuryadevChippada',         href: 'https://github.com/SuryadevChippada' },
  { icon: Linkedin, label: 'LinkedIn', value: 'suryadev-chippada',         href: 'https://www.linkedin.com/in/suryadev-chippada' },
  { icon: Mail,     label: 'Email',    value: 'chippadasurya8@gmail.com',   href: 'mailto:chippadasurya8@gmail.com' },
  { icon: Phone,    label: 'Phone',    value: '+49 17669061747',            href: 'tel:+4917669061747' },
]

export default function ContactModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Let's connect">
      {/* Bio */}
      <p className="text-white/70 text-sm leading-relaxed mb-6">
        CS student at TU Darmstadt building real-time computer vision systems and AI tools.
        Open to <span className="text-white/90">internships</span>, <span className="text-white/90">collaboration</span>, and <span className="text-white/90">part-time roles</span>.
      </p>

      {/* Contact links */}
      <div className="space-y-3 mb-6">
        {LINKS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            className="liquid-glass rounded-2xl p-3 flex items-center gap-3 hover:scale-[1.02] transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white/40 text-xs">{label}</p>
              <p className="text-white/80 text-sm">{value}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-white/40 text-xs">
        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Darmstadt, Hessen, Germany</span>
      </div>
    </ModalShell>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/components/modals/ContactModal.tsx
git commit -m "feat: add ContactModal with all contact links and bio"
```

---

### Task 7: Create MenuModal

**Files:**
- Create: `src/components/modals/MenuModal.tsx`

**Step 1: Create the file**

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Zap, Code2, GraduationCap, FileText, User } from 'lucide-react'
import { useEffect } from 'react'
import type { ModalType } from '../HeroBloom'

interface Props {
  open: boolean
  onClose: () => void
  openModal: (type: ModalType) => void
}

const NAV_ITEMS = [
  { icon: User,          label: 'About me',       modal: 'contact'   as ModalType },
  { icon: Zap,           label: 'FLARE Project',   modal: 'flare'     as ModalType },
  { icon: Code2,         label: 'Tech Stack',      modal: 'stack'     as ModalType },
  { icon: GraduationCap, label: 'Education',       modal: 'education' as ModalType },
  { icon: FileText,      label: 'View CV',         modal: 'cv'        as ModalType },
]

export default function MenuModal({ open, onClose, openModal }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="relative liquid-glass-strong rounded-3xl w-full max-w-sm overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <span className="text-white/50 text-xs uppercase tracking-widest">Navigate</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="liquid-glass w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:scale-105 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="px-3 pb-4 space-y-1">
              {NAV_ITEMS.map(({ icon: Icon, label, modal }) => (
                <button
                  key={label}
                  onClick={() => { onClose(); setTimeout(() => openModal(modal), 150) }}
                  className="w-full liquid-glass rounded-2xl px-4 py-3 flex items-center gap-3 text-left hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white/80 text-sm flex-1">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30" aria-hidden="true" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 2: Verify build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -5
```

Note: Will error until `ModalType` is exported from `HeroBloom.tsx` — fix in next task.

**Step 3: Commit**

```bash
git add src/components/modals/MenuModal.tsx
git commit -m "feat: add MenuModal navigation overlay"
```

---

### Task 8: Rewrite HeroBloom.tsx — wire up all state and modals

**Files:**
- Modify: `src/components/HeroBloom.tsx`

This is the largest task. Replace the entire file with the wired-up version below.

**Step 1: Replace `src/components/HeroBloom.tsx` entirely**

```tsx
import { useState } from 'react'
import { Github, Linkedin, Mail, Menu, Download, Zap, Code2, ArrowRight, Sparkles } from 'lucide-react'
import FlareModal from './modals/FlareModal'
import StackModal from './modals/StackModal'
import EducationModal from './modals/EducationModal'
import CVModal from './modals/CVModal'
import ContactModal from './modals/ContactModal'
import MenuModal from './modals/MenuModal'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'

export type ModalType = 'flare' | 'stack' | 'education' | 'cv' | 'contact' | 'menu' | null

export default function HeroBloom() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openModal = (type: ModalType) => setActiveModal(type)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden font-display">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* Content layer */}
        <div className="relative z-10 flex min-h-screen">
          <LeftPanel openModal={openModal} />
          <RightPanel openModal={openModal} />
        </div>
      </div>

      {/* Modals */}
      <FlareModal     open={activeModal === 'flare'}     onClose={closeModal} />
      <StackModal     open={activeModal === 'stack'}     onClose={closeModal} />
      <EducationModal open={activeModal === 'education'} onClose={closeModal} />
      <CVModal        open={activeModal === 'cv'}        onClose={closeModal} />
      <ContactModal   open={activeModal === 'contact'}   onClose={closeModal} />
      <MenuModal      open={activeModal === 'menu'}      onClose={closeModal} openModal={openModal} />
    </>
  )
}

// ─── Left Panel ──────────────────────────────────────────────────────────────

function LeftPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
      <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl" />
      <div className="relative z-10 flex flex-col min-h-full">
        <LeftNav openModal={openModal} />
        <HeroCenter openModal={openModal} />
        <BottomQuote />
      </div>
    </div>
  )
}

function LeftNav({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <nav className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">SC</span>
        </div>
        <span className="text-white font-semibold text-2xl tracking-tighter">suryadev</span>
      </div>
      <button
        onClick={() => openModal('menu')}
        aria-label="Open navigation menu"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Menu className="w-4 h-4" aria-hidden="true" />
        <span>Menu</span>
      </button>
    </nav>
  )
}

function HeroCenter({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 py-12 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
        <span className="text-white text-2xl font-semibold">SC</span>
      </div>

      <div>
        <h1 className="text-6xl lg:text-7xl font-medium font-display text-white tracking-[-0.05em] leading-tight">
          Building<br />
          <em className="font-serif not-italic italic text-white/80">intelligent</em><br />
          systems.
        </h1>
        <p className="text-white/50 text-sm mt-3 font-display">
          CS student · TU Darmstadt · Computer Vision & AI
        </p>
      </div>

      <button
        onClick={() => openModal('cv')}
        className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
          <Download className="w-4 h-4" aria-hidden="true" />
        </span>
        Download CV
      </button>

      <div className="flex flex-wrap gap-2 justify-center">
        {['Computer Vision', 'AI Systems', 'Edge Inference', 'Full-Stack'].map((tag) => (
          <span key={tag} className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80">
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
        &ldquo;We built where <em className="font-serif italic text-white/60">code meets</em> the physical world.&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-white/20" />
        <span className="text-xs tracking-widest uppercase text-white/50">Suryadev Chippada</span>
        <div className="h-px w-12 bg-white/20" />
      </div>
    </div>
  )
}

// ─── Right Panel ─────────────────────────────────────────────────────────────

function RightPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="hidden lg:flex w-[48%] flex-col p-6 gap-4">
      <RightTopBar openModal={openModal} />
      <CommunityCard openModal={openModal} />
      <FeatureSection openModal={openModal} />
    </div>
  )
}

function RightTopBar({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3">
        {[
          { icon: Github,   href: 'https://github.com/SuryadevChippada',              label: 'GitHub' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/suryadev-chippada',    label: 'LinkedIn' },
          { icon: Mail,     href: 'mailto:chippadasurya8@gmail.com',                  label: 'Email' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 hover:scale-105 transition-all"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </a>
        ))}
        <ArrowRight className="w-4 h-4 text-white/50" aria-hidden="true" />
      </div>

      <button
        onClick={() => openModal('cv')}
        aria-label="View Resume"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span>Resume</span>
      </button>
    </div>
  )
}

function CommunityCard({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <button
      onClick={() => openModal('contact')}
      className="liquid-glass rounded-2xl p-4 w-56 text-left cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <p className="text-white text-sm font-medium mb-1">Enter my ecosystem</p>
      <p className="text-white/60 text-xs leading-relaxed">
        CS @ TU Darmstadt · Co-founder of FLARE. Open to opportunities →
      </p>
    </button>
  )
}

function FeatureSection({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        {/* FLARE card — fully clickable */}
        <button
          onClick={() => openModal('flare')}
          aria-label="View FLARE project"
          className="liquid-glass rounded-3xl flex-1 p-4 text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-white text-xs font-medium">FLARE</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Wildfire CV system on edge hardware. YOLO-based detection.</p>
        </button>

        {/* Tech Stack card — fully clickable */}
        <button
          onClick={() => openModal('stack')}
          aria-label="View tech stack"
          className="liquid-glass rounded-3xl flex-1 p-4 text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-white text-xs font-medium">Tech Stack</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Python · YOLO · React · OpenCV · PyTorch</p>
        </button>
      </div>

      {/* TU Darmstadt card */}
      <div className="liquid-glass rounded-3xl p-4 flex gap-3 items-start">
        <div className="w-24 h-16 rounded-xl bg-white/10 shrink-0" />
        <div className="flex-1">
          <p className="text-white text-xs font-medium">TU Darmstadt</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">BSc Computer Science · Oct 2023–Present</p>
        </div>
        <button
          onClick={() => openModal('education')}
          aria-label="View education details"
          className="liquid-glass w-7 h-7 rounded-full flex items-center justify-center text-white text-sm hover:scale-105 transition-transform shrink-0"
        >
          +
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Verify TypeScript build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1 | tail -8
```

Expected: `✓ built in Xms` with no TypeScript errors.

**Step 3: Run dev and manually verify each modal opens**

```bash
npm run dev
```

- Click Menu → nav overlay appears ✓
- Click FLARE card → project modal with all bullets ✓
- Click Tech Stack card → skills grid ✓
- Click TU Darmstadt `+` → education modal ✓
- Click Download CV → PDF iframe modal ✓
- Click Resume button → PDF iframe modal ✓
- Click "Enter my ecosystem" → contact hub ✓
- Backdrop click → modal closes ✓
- Escape key → modal closes ✓
- Menu item click → menu closes then opens target modal ✓

**Step 4: Commit**

```bash
git add src/components/HeroBloom.tsx
git commit -m "feat: wire up all modal triggers and openModal state in HeroBloom"
```

---

### Task 9: Final build + clean commit

**Step 1: Full build**

```bash
cd "/Users/surya.dev/Me/Coding/Portfolio Web" && npm run build 2>&1
```

Expected: clean build, no warnings about unused imports.

**Step 2: Stage all modal files and commit**

```bash
git add -A
git commit -m "feat: complete interactive modal system with CV content"
```

---

## Done

After Task 9, every interactive element on the page opens a full glass modal:
- **Menu** → navigation overlay
- **FLARE** → full project deep-dive with XtraChallenge
- **Tech Stack** → all 6 skill categories from CV
- **TU Darmstadt** → education + certifications
- **Download CV / Resume** → embedded PDF viewer with download
- **Enter my ecosystem** → contact hub with all links
