import ModalShell from './ModalShell'
import { CheckCircle2 } from 'lucide-react'

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
      <div className="liquid-glass rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg liquid-glass flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white/80 font-serif font-medium text-sm tracking-wider">TUD</span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">TU Darmstadt</p>
            <p className="text-white/60 text-xs mt-0.5">BSc Computer Science</p>
            <p className="text-white/40 text-xs mt-1">October 2023 – Present · Darmstadt, Germany</p>
          </div>
        </div>
      </div>

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
