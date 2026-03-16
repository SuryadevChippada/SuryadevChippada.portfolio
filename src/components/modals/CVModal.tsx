import ModalShell from './ModalShell'
import { Download } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

export default function CVModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Curriculum Vitae" wide>
      <div className="liquid-glass rounded-2xl overflow-hidden mb-4">
        <iframe
          src="/cv.pdf"
          title="Suryadev Chippada CV"
          sandbox="allow-scripts allow-same-origin"
          className="w-full"
          style={{ height: '60vh' }}
        />
      </div>

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
