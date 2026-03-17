import ModalShell from './ModalShell'
import { Download, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react'

interface Props { open: boolean; onClose: () => void }

const SKILLS = [
  { label: 'Programming',      items: ['Python', 'Java', 'Lua', 'Shell'] },
  { label: 'CV / ML',          items: ['OpenCV', 'TensorFlow', 'YOLO', 'NumPy', 'PyTorch'] },
  { label: 'Automation',       items: ['n8n'] },
  { label: 'Web',              items: ['React', 'Angular', 'CSS', 'HTML', 'JavaScript'] },
  { label: 'Tools',            items: ['Git', 'GitHub', 'Neo4j', 'Neovim'] },
  { label: 'Systems',          items: ['Raspberry Pi'] },
]

export default function CVModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Resume" wide>
      {/* CV Document */}
      <div className="space-y-6 pb-2">

        {/* Header */}
        <div className="text-center pb-4 border-b border-white/10">
          <h2 className="text-2xl font-semibold text-white tracking-tight">Suryadev Chippada</h2>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2">
            <span className="flex items-center gap-1 text-white/50 text-xs"><MapPin className="w-3 h-3" />Darmstadt, Germany</span>
            <a href="mailto:chippadasurya8@gmail.com" className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors"><Mail className="w-3 h-3" />chippadasurya8@gmail.com</a>
            <a href="tel:+4917669061747" className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors"><Phone className="w-3 h-3" />+49 17669061747</a>
            <a href="https://github.com/SuryadevChippada" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors"><Github className="w-3 h-3" />SuryadevChippada</a>
            <a href="https://linkedin.com/in/suryadev-chippada" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors"><Linkedin className="w-3 h-3" />suryadev-chippada</a>
          </div>
        </div>

        {/* Summary */}
        <section>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Summary</p>
          <p className="text-white/70 text-sm leading-relaxed">
            Computer Science student with a strong interest in emerging technologies and a focus on developing practical, well-grounded skills. Through collaborative engineering projects, I have gained hands-on experience in real-time computer vision and AI systems. I apply my knowledge to real-world challenges by designing effective and reliable solutions.
          </p>
        </section>

        {/* Skills */}
        <section>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Skills</p>
          <div className="space-y-2">
            {SKILLS.map(({ label, items }) => (
              <div key={label} className="flex gap-3 items-start">
                <span className="text-white/40 text-xs w-24 shrink-0 pt-0.5">{label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(t => (
                    <span key={t} className="liquid-glass rounded-full px-2.5 py-0.5 text-[11px] text-white/70">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Experience</p>
          <div className="space-y-5">
            <div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-white text-sm font-medium">Co-Founder & Computer Vision Developer</p>
                  <p className="text-white/50 text-xs">FLARE @ TU Darmstadt</p>
                </div>
                <span className="text-white/30 text-xs shrink-0 ml-4">Nov 2024 – Feb 2026</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {[
                  'Contributed to the development of an early-stage real-time computer vision pipeline using YOLO-based object detection for smoke and fire recognition',
                  'Trained and fine-tuned models on curated aerial imagery datasets to evaluate the feasibility for field deployment',
                  'Implemented edge inference prototype on Raspberry Pi 5 (AI HAT+) for autonomous wildfire monitoring experiments',
                  'Collaborated in system testing and iterative performance improvements',
                ].map(b => (
                  <li key={b} className="flex gap-2 text-white/60 text-xs leading-relaxed">
                    <span className="text-white/25 shrink-0 mt-0.5">→</span>{b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-white text-sm font-medium">XtraChallenge 2025</p>
                  <p className="text-white/50 text-xs">FLARE @ TU Darmstadt · Universitat Politècnica de València</p>
                </div>
                <span className="text-white/30 text-xs shrink-0 ml-4">Jul 2025</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {[
                  'Participated in a national UAV design and flight competition organized by Xtra2 UPV',
                  'Collaborated with an interdisciplinary student team during system preparation and testing phases',
                  'Gained exposure to UAV integration workflows, field testing procedures, and real-time system constraints',
                ].map(b => (
                  <li key={b} className="flex gap-2 text-white/60 text-xs leading-relaxed">
                    <span className="text-white/25 shrink-0 mt-0.5">→</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Education</p>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white text-sm font-medium">Technische Universität Darmstadt</p>
              <p className="text-white/50 text-xs mt-0.5">Bachelor of Science in Computer Science</p>
              <p className="text-white/30 text-xs mt-0.5">Darmstadt, Germany</p>
            </div>
            <span className="text-white/30 text-xs shrink-0 ml-4">Oct 2023 – Present</span>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Certifications</p>
          <div className="space-y-1.5">
            {[
              { name: 'Machine Learning & Deep Learning', issuer: 'Udemy', year: '2025' },
              { name: 'Web Development',                  issuer: 'Udemy', year: '2025' },
              { name: 'Python for Game Programming: Pygame', issuer: 'Udemy', year: '2025' },
              { name: 'Claude Code in Action',            issuer: 'Anthropic', year: '2026' },
            ].map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <p className="text-white/70 text-xs">{c.name}</p>
                <span className="text-white/30 text-xs ml-4 shrink-0">{c.issuer} · {c.year}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Download */}
      <div className="pt-4 border-t border-white/10 mt-2">
        <a
          href="/cv.pdf"
          download="SuryadevChippada_CV.pdf"
          className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white/60 text-sm hover:text-white hover:scale-105 active:scale-95 transition-all w-fit"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Download PDF
        </a>
      </div>
    </ModalShell>
  )
}
