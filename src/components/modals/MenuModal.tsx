import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Zap, Code2, GraduationCap, FileText, User } from 'lucide-react'
import { useEffect } from 'react'
import type { ModalType } from './types'

interface Props {
  open: boolean
  onClose: () => void
  openModal: (type: ModalType) => void
}

const NAV_ITEMS = [
  { icon: User,          label: 'About me',      modal: 'contact'   as ModalType, href: null },
  { icon: Zap,           label: 'FLARE Project',  modal: 'flare'     as ModalType, href: null },
  { icon: Code2,         label: 'Tech Stack',     modal: 'stack'     as ModalType, href: null },
  { icon: GraduationCap, label: 'Education',      modal: 'education' as ModalType, href: null },
  { icon: FileText,      label: 'View CV',        modal: null,                     href: '/cv.pdf' },
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative liquid-glass-strong rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {/* Command palette header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                <X className="w-3 h-3 text-white/40" aria-hidden="true" />
              </div>
              <span className="text-white/40 text-sm flex-1">Navigate...</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="liquid-glass px-2 py-0.5 rounded text-white/40 text-xs hover:text-white/70 transition-colors"
              >
                esc
              </button>
            </div>

            {/* Nav items */}
            <div className="p-2">
              {NAV_ITEMS.map(({ icon: Icon, label, modal }) => (
                <button
                  key={label}
                  onClick={() => { onClose(); setTimeout(() => openModal(modal), 150) }}
                  className="w-full rounded-xl px-3 py-2.5 flex items-center gap-3 text-left hover:bg-white/10 active:bg-white/5 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                  </div>
                  <span className="text-white/80 text-sm flex-1">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" aria-hidden="true" />
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/10 flex items-center gap-2">
              <span className="text-white/25 text-xs">↵ select</span>
              <span className="text-white/10 text-xs mx-1">·</span>
              <span className="text-white/25 text-xs">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
