import { useState } from 'react'
import { Github, Linkedin, Mail, Menu, Download, Zap, Code2, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react'
import FlareModal from './modals/FlareModal'
import StackModal from './modals/StackModal'
import EducationModal from './modals/EducationModal'
import CVModal from './modals/CVModal'
import ContactModal from './modals/ContactModal'
import MenuModal from './modals/MenuModal'
import type { ModalType } from './modals/types'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'

export default function HeroBloom() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const openModal = (type: ModalType) => setActiveModal(type)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden font-display">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <div className="relative z-10 flex min-h-screen">
          <LeftPanel openModal={openModal} />
          <RightPanel openModal={openModal} />
        </div>
      </div>

      <FlareModal     open={activeModal === 'flare'}     onClose={closeModal} />
      <StackModal     open={activeModal === 'stack'}     onClose={closeModal} />
      <EducationModal open={activeModal === 'education'} onClose={closeModal} />
      <CVModal        open={activeModal === 'cv'}        onClose={closeModal} />
      <ContactModal   open={activeModal === 'contact'}   onClose={closeModal} />
      <MenuModal      open={activeModal === 'menu'}      onClose={closeModal} openModal={openModal} />
    </>
  )
}

function LeftPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
      <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl" />
      <div className="relative z-10 flex flex-col min-h-full">
        <LeftNav openModal={openModal} />
        <HeroCenter openModal={openModal} />
        <BottomQuote />
      </div>
    </div>
  )
}

function LeftNav({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <nav className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">SC</span>
        </div>
        <span className="text-white font-semibold text-2xl tracking-tighter">suryadev</span>
      </div>
      <button
        onClick={() => openModal('menu')}
        aria-label="Open navigation menu"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Menu className="w-4 h-4" aria-hidden="true" />
        <span>Menu</span>
      </button>
    </nav>
  )
}

function HeroCenter({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 py-12 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
        <span className="text-white text-2xl font-semibold">SC</span>
      </div>

      <div>
        <h1 className="text-6xl lg:text-7xl font-medium font-display text-white tracking-[-0.05em] leading-tight">
          Vision<br />
          <em className="font-serif not-italic italic text-white/80">meets</em><br />
          the real world.
        </h1>
        <p className="text-white/50 text-sm mt-3 font-display">
          CS student · TU Darmstadt · Computer Vision & AI
        </p>
      </div>

      <button
        onClick={() => openModal('cv')}
        className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
          <Download className="w-4 h-4" aria-hidden="true" />
        </span>
        Download CV
      </button>

      <div className="flex flex-wrap gap-2 justify-center">
        {['Computer Vision', 'AI Systems', 'Full-Stack'].map((tag) => (
          <span key={tag} className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function BottomQuote() {
  return (
    <div className="px-6 pb-6 flex flex-col items-center gap-3 text-center">
      <p className="text-xs tracking-widest uppercase text-white/50">Philosophy</p>
      <p className="text-sm text-white/80 font-display">
        &ldquo;Closing the gap between <em className="font-serif italic text-white/60">AI research</em> and the real world.&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-white/20" />
        <span className="text-xs tracking-widest uppercase text-white/50">Suryadev Chippada</span>
        <div className="h-px w-12 bg-white/20" />
      </div>
    </div>
  )
}

function RightPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="hidden lg:flex w-[48%] flex-col p-6 gap-4">
      <RightTopBar openModal={openModal} />
      <CommunityCard openModal={openModal} />
      <FeatureSection openModal={openModal} />
    </div>
  )
}

function RightTopBar({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3">
        {[
          { icon: Github,   href: 'https://github.com/SuryadevChippada',           label: 'GitHub' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/suryadev-chippada', label: 'LinkedIn' },
          { icon: Mail,     href: 'mailto:chippadasurya8@gmail.com',               label: 'Email' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 hover:scale-105 transition-all"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </a>
        ))}
        <ArrowRight className="w-4 h-4 text-white/50" aria-hidden="true" />
      </div>

      <button
        onClick={() => openModal('cv')}
        aria-label="View Resume"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span>Resume</span>
      </button>
    </div>
  )
}

function CommunityCard({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <button
      onClick={() => openModal('contact')}
      className="liquid-glass rounded-2xl p-4 w-56 text-left cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <p className="text-white text-sm font-medium mb-1">Enter my ecosystem</p>
      <p className="text-white/60 text-xs leading-relaxed">
        CS @ TU Darmstadt · Co-founder of FLARE. Open to opportunities →
      </p>
    </button>
  )
}

function FeatureSection({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={() => openModal('flare')}
          aria-label="View FLARE project"
          className="liquid-glass rounded-3xl flex-1 p-4 text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-white text-xs font-medium">FLARE</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Wildfire CV system on edge hardware. YOLO-based detection.</p>
          <span className="text-white/30 text-[9px] mt-2 flex items-center gap-0.5">View details <ArrowUpRight className="w-2.5 h-2.5" /></span>
        </button>

        <button
          onClick={() => openModal('stack')}
          aria-label="View tech stack"
          className="liquid-glass rounded-3xl flex-1 p-4 text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-white text-xs font-medium mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1">
            {['Python','YOLO','React','OpenCV','PyTorch','TensorFlow','n8n','Angular','Git','Neo4j','Raspberry Pi','Java'].map(t => (
              <span key={t} className="liquid-glass rounded-full px-2 py-0.5 text-[10px] text-white/70">{t}</span>
            ))}
          </div>
          <span className="text-white/30 text-[9px] mt-2 flex items-center gap-0.5">View full stack <ArrowUpRight className="w-2.5 h-2.5" /></span>
        </button>
      </div>

      <button
        onClick={() => openModal('education')}
        aria-label="View education details"
        className="liquid-glass rounded-3xl p-4 flex gap-3 items-center w-full text-left cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform"
      >
        <div className="w-24 h-16 rounded-xl liquid-glass flex items-center justify-center shrink-0">
          <span className="text-white/80 font-serif font-medium text-xl tracking-widest">TUD</span>
        </div>
        <div className="flex-1">
          <p className="text-white text-xs font-medium">TU Darmstadt</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">BSc Computer Science · Oct 2023–Present</p>
          <span className="text-white/30 text-[9px] mt-1.5 flex items-center gap-0.5">View education <ArrowUpRight className="w-2.5 h-2.5" /></span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/20 shrink-0" aria-hidden="true" />
      </button>
    </div>
  )
}
