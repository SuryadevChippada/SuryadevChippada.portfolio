import ModalShell from './ModalShell'
import { CheckCircle } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

const CERTS = [
  { name: 'Machine Learning & Deep Learning',    issuer: 'Udemy', year: '2025' },
  { name: 'Web Development',                     issuer: 'Udemy', year: '2025' },
  { name: 'Python for Game Programming: Pygame', issuer: 'Udemy', year: '2025' },
]

export default function CertificationsModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Certifications">
      <div className="space-y-3">
        {CERTS.map(({ name, issuer, year }) => (
          <div key={name} className="liquid-glass rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-white/60" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm font-medium leading-snug">{name}</p>
              <p className="text-white/40 text-xs mt-1">{issuer} · {year}</p>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}
