import ModalShell from './ModalShell'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

const LINKS = [
  { icon: Github,   label: 'GitHub',   value: 'SuryadevChippada',        href: 'https://github.com/SuryadevChippada' },
  { icon: Linkedin, label: 'LinkedIn', value: 'suryadev-chippada',        href: 'https://www.linkedin.com/in/suryadev-chippada' },
  { icon: Mail,     label: 'Email',    value: 'chippadasurya8@gmail.com',  href: 'mailto:chippadasurya8@gmail.com' },
  { icon: Phone,    label: 'Phone',    value: '+49 17669061747',           href: 'tel:+4917669061747' },
]

export default function ContactModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Let's connect">
      <p className="text-white/70 text-sm leading-relaxed mb-6">
        CS student at TU Darmstadt building real-time CV systems.
        Open to{' '}
        <span className="text-white/90">internships</span>,{' '}
        <span className="text-white/90">collaboration</span>, and{' '}
        <span className="text-white/90">part-time roles</span>.
      </p>

      <div className="space-y-3 mb-6">
        {LINKS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
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

      <div className="flex items-center gap-2 text-white/40 text-xs">
        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Darmstadt, Germany</span>
      </div>
    </ModalShell>
  )
}
