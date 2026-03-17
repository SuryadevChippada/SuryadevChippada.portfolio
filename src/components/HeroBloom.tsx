import { useState } from 'react'
import { Github, Linkedin, Mail, FileText, Zap, Code2, ArrowUpRight, Award } from 'lucide-react'
import FlareModal from './modals/FlareModal'
import StackModal from './modals/StackModal'
import EducationModal from './modals/EducationModal'
import CVModal from './modals/CVModal'
import ContactModal from './modals/ContactModal'
import MenuModal from './modals/MenuModal'
import CertificationsModal from './modals/CertificationsModal'
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
      <MenuModal            open={activeModal === 'menu'}  onClose={closeModal} openModal={openModal} />
      <CertificationsModal  open={activeModal === 'certs'} onClose={closeModal} />
    </>
  )
}

function LeftPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
      <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl" />
      <div className="relative z-10 flex flex-col min-h-full">
        <HeroCenter openModal={openModal} />
        <BottomQuote />
      </div>
    </div>
  )
}


function LeftTopBar({ openModal }: { openModal: (t: ModalType) => void }) {
  const LINKS = [
    { icon: Github,   href: 'https://github.com/SuryadevChippada',           label: 'GitHub',   modal: null },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/suryadev-chippada', label: 'LinkedIn', modal: null },
    { icon: Mail,     href: 'mailto:chippadasurya8@gmail.com',               label: 'Email',    modal: null },
    { icon: FileText, href: null,                                             label: 'Resume',   modal: 'cv' as ModalType },
  ]

  const socials = LINKS.slice(0, 3)
  const action  = LINKS[3]

  return (
    <div className="flex justify-center">
      <div className="liquid-glass rounded-full px-4 py-2.5 flex items-center gap-1">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href!}
            target={href!.startsWith('http') ? '_blank' : undefined}
            rel={href!.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </a>
        ))}

        <span className="w-px h-5 bg-white/15 mx-2" />

        <button
          onClick={() => openModal(action.modal)}
          aria-label={action.label}
          className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 text-white/60 text-xs hover:text-white hover:scale-105 transition-all"
        >
          <action.icon className="w-3.5 h-3.5" aria-hidden="true" />
          Resume
        </button>
      </div>
    </div>
  )
}

function HeroCenter({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 py-10 px-4 text-center">
      <div className="flex items-center gap-8">
        <div className="w-36 h-44 rounded-3xl overflow-hidden ring-2 ring-white/20 shrink-0">
          <img src="/avatar.png" alt="Suryadev Chippada" className="w-full h-full object-cover object-top" />
        </div>
        <h1 className="text-6xl lg:text-7xl font-medium font-display text-white tracking-[-0.05em] leading-tight text-left">
          Suryadev<br />
          <em className="font-serif not-italic italic text-white/80">Chippada.</em>
        </h1>
      </div>

      <p className="text-white/50 text-sm font-display">
        CS student · TU Darmstadt · Computer Vision & AI
      </p>

      <LeftTopBar openModal={openModal} />
    </div>
  )
}

function BottomQuote() {
  return (
    <div className="px-6 pb-6 flex justify-center">
      <div className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-white/70 text-xs">Open to internships &amp; collaboration</span>
      </div>
    </div>
  )
}

function RightPanel({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <div className="hidden lg:flex w-[48%] flex-col p-6 gap-4">
      <AboutCard openModal={openModal} />
      <FeatureSection openModal={openModal} />
    </div>
  )
}


function AboutCard({ openModal }: { openModal: (t: ModalType) => void }) {
  return (
    <button
      onClick={() => openModal('contact')}
      aria-label="About me"
      className="liquid-glass rounded-2xl p-5 text-left cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform"
    >
      <p className="text-white/40 text-xs uppercase tracking-widest mb-2">About me</p>
      <p className="text-white/70 text-base leading-relaxed">
        Computer Science student with a strong interest in emerging technologies and a focus on
        developing practical, well-grounded skills. Through collaborative engineering projects, I
        have gained hands-on experience in real-time computer vision and AI systems. I apply my
        knowledge to real-world challenges by designing effective and reliable solutions.
      </p>
      <span className="text-white/30 text-xs mt-3 flex items-center gap-1">
        Get in touch <ArrowUpRight className="w-2.5 h-2.5" />
      </span>
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
          <p className="text-white text-sm font-medium">FLARE</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Wildfire CV system on edge hardware. YOLO-based detection.</p>
          <span className="text-white/30 text-[10px] mt-2 flex items-center gap-0.5">View details <ArrowUpRight className="w-2.5 h-2.5" /></span>
        </button>

        <button
          onClick={() => openModal('stack')}
          aria-label="View tech stack"
          className="liquid-glass rounded-3xl flex-1 p-4 text-left cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <p className="text-white text-sm font-medium mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1">
            {['Python','YOLO','React','OpenCV','PyTorch','TensorFlow','n8n','Angular','Git','Neo4j','Raspberry Pi','Java'].map(t => (
              <span key={t} className="liquid-glass rounded-full px-2 py-0.5 text-xs text-white/70">{t}</span>
            ))}
          </div>
          <span className="text-white/30 text-[10px] mt-2 flex items-center gap-0.5">View full stack <ArrowUpRight className="w-2.5 h-2.5" /></span>
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
          <p className="text-white text-sm font-medium">TU Darmstadt</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">BSc Computer Science · Oct 2023–Present</p>
          <span className="text-white/30 text-[10px] mt-1.5 flex items-center gap-0.5">View education <ArrowUpRight className="w-2.5 h-2.5" /></span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/20 shrink-0" aria-hidden="true" />
      </button>

    </div>
  )
}
