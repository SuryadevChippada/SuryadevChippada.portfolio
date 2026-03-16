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
  { icon: User,          label: 'About me',      modal: 'contact'   as ModalType },
  { icon: Zap,           label: 'FLARE Project',  modal: 'flare'     as ModalType },
  { icon: Code2,         label: 'Tech Stack',     modal: 'stack'     as ModalType },
  { icon: GraduationCap, label: 'Education',      modal: 'education' as ModalType },
  { icon: FileText,      label: 'View CV',        modal: 'cv'        as ModalType },
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
          className="fixed inset-0 z-50 flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative liquid-glass-strong w-full overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <span className="text-white/50 text-xs uppercase tracking-widest">Navigate</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:scale-105 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 pb-5 space-y-1">
              {NAV_ITEMS.map(({ icon: Icon, label, modal }) => (
                <button
                  key={label}
                  onClick={() => { onClose(); setTimeout(() => openModal(modal), 150) }}
                  className="w-full liquid-glass rounded-2xl px-5 py-4 flex items-center gap-4 text-left hover:scale-105 active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white/80 text-base flex-1">{label}</span>
                  <ArrowRight className="w-4 h-4 text-white/30" aria-hidden="true" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
