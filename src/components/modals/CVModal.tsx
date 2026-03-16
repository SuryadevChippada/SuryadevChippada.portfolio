import ModalShell from './ModalShell'
import { Download } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

export default function CVModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Resume" wide>
      <div className="rounded-2xl overflow-hidden mb-4 bg-white/5 ring-1 ring-white/10">
        <embed
          src="/cv.pdf#toolbar=0&navpanes=0&scrollbar=1"
          type="application/pdf"
          className="w-full"
          style={{ height: '72vh' }}
        />
      </div>

      <a
        href="/cv.pdf"
        download="SuryadevChippada_CV.pdf"
        className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white/60 text-sm hover:text-white hover:scale-105 active:scale-95 transition-all w-fit"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        Download PDF
      </a>
    </ModalShell>
  )
}
