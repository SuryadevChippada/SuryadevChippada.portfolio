import ModalShell from './ModalShell'

interface Props { open: boolean; onClose: () => void }

const CATEGORIES = [
  { label: 'Programming',  tools: ['Python', 'Java', 'Lua', 'Shell'] },
  { label: 'CV / ML',      tools: ['OpenCV', 'TensorFlow', 'YOLO', 'NumPy', 'PyTorch'] },
  { label: 'Automation',   tools: ['n8n'] },
  { label: 'Web',          tools: ['React', 'Angular', 'CSS', 'HTML', 'JavaScript'] },
  { label: 'Tools',        tools: ['Git', 'GitHub', 'Neo4j', 'Neovim'] },
  { label: 'Systems',      tools: ['Raspberry Pi'] },
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
