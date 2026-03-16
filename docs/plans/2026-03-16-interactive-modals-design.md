# Interactive Modal Layer — Design Doc
**Date:** 2026-03-16
**Status:** Approved

## Goal
Add a Framer Motion modal system to HeroBloom. Every card/button opens a rich Notion-style modal with full CV content. Menu becomes functional. All existing glass aesthetic carries into modals.

## Architecture

### State
Single `activeModal` state in `HeroBloom`:
```ts
type ModalType = 'flare' | 'stack' | 'education' | 'cv' | 'contact' | 'menu' | null
const [activeModal, setActiveModal] = useState<ModalType>(null)
```
Pass `openModal` and `closeModal` helpers down to sub-components via props.

### File structure
- **`src/components/HeroBloom.tsx`** — add state, wire up triggers, render `<ModalLayer>`
- **`src/components/modals/ModalShell.tsx`** — shared animated overlay + panel
- **`src/components/modals/FlareModal.tsx`**
- **`src/components/modals/StackModal.tsx`**
- **`src/components/modals/EducationModal.tsx`**
- **`src/components/modals/CVModal.tsx`**
- **`src/components/modals/ContactModal.tsx`**
- **`src/components/modals/MenuModal.tsx`**

## Modal Shell

```
Fixed fullscreen backdrop
  background: rgba(0,0,0,0.55)
  backdrop-filter: blur(8px)
  z-index: 50
  onClick backdrop → closeModal()

Modal panel (centered)
  liquid-glass-strong rounded-3xl
  max-w-xl w-full mx-4 max-h-[85vh]
  overflow-y-auto
  padding: p-6 lg:p-8

Animation (Framer Motion)
  initial: { opacity: 0, scale: 0.95, y: 8 }
  animate: { opacity: 1, scale: 1, y: 0 }
  exit:    { opacity: 0, scale: 0.95, y: 8 }
  transition: spring, stiffness: 300, damping: 30

Dismiss: click backdrop OR Escape key
Header: title (text-white font-display font-medium text-xl) + X button (top-right, liquid-glass rounded-full)
```

## Modal Contents

### FlareModal
**Header:** "FLARE — Wildfire Detection"
**Badge:** Co-Founder & CV Developer · Nov 2024 – Feb 2026

**Section 1 — Core Project**
4 bullets from CV:
- Contributed to the development of an early-stage real-time computer vision pipeline using YOLO-based object detection for smoke and fire recognition
- Trained and fine-tuned models on curated aerial imagery datasets to evaluate the feasibility for field deployment
- Implemented edge inference prototype on Raspberry Pi 5 (AI HAT+) for autonomous wildfire monitoring experiments
- Collaborated in system testing and iterative performance improvements

**Section 2 — XtraChallenge 2025** (divider + sub-heading)
Badge: July 2025 · Universitat Politècnica de València
3 bullets:
- Participated in a national UAV design and flight competition organized by Xtra2 UPV
- Collaborated with an interdisciplinary student team during system preparation and testing phases
- Gained exposure to UAV integration workflows, field testing procedures, and real-time system constraints

**Footer tech tags:** Python · YOLO · OpenCV · Raspberry Pi 5 · AI HAT+ · PyTorch · TensorFlow

### StackModal
**Header:** "Tech Stack"
**Sub-heading:** "Everything I work with"

6 grouped rows (category label left, pills right):
| Category | Tools |
|----------|-------|
| Programming | Python, Java, Lua, Shell |
| Computer Vision | OpenCV, TensorFlow, YOLO, NumPy, PyTorch |
| Automation | n8n |
| Web | React, Angular, CSS, HTML, JavaScript |
| Tools | Git, GitHub, Neo4j, Neovim |
| Systems | Raspberry Pi |

Each pill: `liquid-glass rounded-full px-3 py-1 text-xs text-white/80`

### EducationModal
**Header:** "Education & Certifications"

**University block:**
- Technische Universität Darmstadt
- BSc Computer Science
- October 2023 – Present
- Darmstadt, Germany

**Certifications (3 items with checkmark icon):**
- Machine Learning & Deep Learning — Udemy (2025)
- Web Development — Udemy (2025)
- Python for Game Programming: Pygame — Udemy (2025)

### CVModal
**Header:** "Curriculum Vitae"
**Body:** `<iframe src="/cv.pdf" className="w-full h-[60vh] rounded-xl" />`
**Footer:** `<a href="/cv.pdf" download>` Download PDF button (liquid-glass-strong rounded-full)

### ContactModal
**Header:** "Let's connect"
**Intro text:** "CS student at TU Darmstadt building real-time CV systems. Open to internships, collaboration, and part-time roles."

**Contact cards (each liquid-glass rounded-2xl, clickable links):**
- GitHub → https://github.com/SuryadevChippada
- LinkedIn → https://www.linkedin.com/in/suryadev-chippada
- Email → chippadasurya8@gmail.com
- Phone → +49 17669061747

**Location chip:** "📍 Darmstadt, Germany"

### MenuModal
**Style:** Full-width glass panel (not centered card) — slides down from top or fades in as overlay
**5 nav items** (large, hover:scale-105, each closes menu and opens respective modal):
1. About me → opens ContactModal
2. FLARE Project → opens FlareModal
3. Tech Stack → opens StackModal
4. Education → opens EducationModal
5. View CV → opens CVModal

Each item: left icon + label + ArrowRight on right side

## Triggers (what opens what)

| Element | Opens |
|---------|-------|
| FLARE card (click whole card) | FlareModal |
| Tech Stack card (click whole card) | StackModal |
| TU Darmstadt `+` button | EducationModal |
| "Download CV" button (left panel) | CVModal |
| "Resume" button (right panel) | CVModal |
| "Enter my ecosystem" card | ContactModal |
| Menu button (nav) | MenuModal |
| Menu item "About me" | ContactModal |
| Menu item "FLARE Project" | FlareModal |
| Menu item "Tech Stack" | StackModal |
| Menu item "Education" | EducationModal |
| Menu item "View CV" | CVModal |

## Content Updates to HeroBloom

- Add a short bio line below h1: `"CS student at TU Darmstadt · Computer Vision & AI"`
- Pills: add "Full-Stack" as 4th pill
- Make FLARE and Tech Stack cards fully clickable (`cursor-pointer`)
- "Enter my ecosystem" card: make it clickable, add `→` indicator

## Animation Details
- Use `AnimatePresence` from framer-motion wrapping a single `<ModalShell>` render
- `key={activeModal}` on the panel so switching modals re-animates
- Escape key listener in `useEffect` in `HeroBloom`
- `document.body.style.overflow = 'hidden'` when modal open, restore on close
