import ModalShell from './ModalShell'

interface Props { open: boolean; onClose: () => void }

const FLARE_BULLETS = [
  'Contributed to the development of an early-stage real-time computer vision pipeline using YOLO-based object detection for smoke and fire recognition',
  'Trained and fine-tuned models on curated aerial imagery datasets to evaluate the feasibility for field deployment',
  'Implemented edge inference prototype on Raspberry Pi 5 (AI HAT+) for autonomous wildfire monitoring experiments',
  'Collaborated in system testing and iterative performance improvements',
]

const XTRA_BULLETS = [
  'Participated in a national UAV design and flight competition organized by Xtra2 UPV',
  'Collaborated with an interdisciplinary student team during system preparation and testing phases',
  'Gained exposure to UAV integration workflows, field testing procedures, and real-time system constraints',
]

const TECH_TAGS = ['Python', 'YOLO', 'OpenCV', 'Raspberry Pi 5', 'AI HAT+', 'PyTorch', 'TensorFlow']

export default function FlareModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="FLARE — Wildfire Detection">
      <div className="liquid-glass rounded-full px-3 py-1 inline-flex items-center gap-2 mb-5">
        <span className="text-white/50 text-xs">Co-Founder & CV Developer</span>
        <span className="text-white/20 text-xs">·</span>
        <span className="text-white/50 text-xs">Nov 2024 – Feb 2026</span>
      </div>

      <ul className="space-y-3 mb-6">
        {FLARE_BULLETS.map((b) => (
          <li key={b} className="flex gap-3 text-white/70 text-sm leading-relaxed">
            <span className="text-white/30 mt-1 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-white/40 text-xs tracking-widest uppercase">XtraChallenge 2025</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="liquid-glass rounded-full px-3 py-1 mb-4 inline-block">
        <span className="text-white/50 text-xs">July 2025 · Universitat Politècnica de València</span>
      </div>

      <ul className="space-y-3 mb-6">
        {XTRA_BULLETS.map((b) => (
          <li key={b} className="flex gap-3 text-white/70 text-sm leading-relaxed">
            <span className="text-white/30 mt-1 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {TECH_TAGS.map((tag) => (
          <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80">
            {tag}
          </span>
        ))}
      </div>
    </ModalShell>
  )
}
