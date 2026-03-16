import { Github, Linkedin, Mail, Menu, Download, Zap, Code2, ArrowRight, Sparkles } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'

export default function HeroBloom() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-display">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content layer */}
      <div className="relative z-10 flex min-h-screen">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}

function LeftPanel() {
  return (
    <div className="relative w-full lg:w-[52%] flex flex-col min-h-screen p-4 lg:p-6">
      {/* Glass overlay behind all left content */}
      <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl" />

      {/* All content sits above the glass overlay */}
      <div className="relative z-10 flex flex-col min-h-full">
        <LeftNav />
        <HeroCenter />
        <BottomQuote />
      </div>
    </div>
  )
}

function LeftNav() {
  return (
    <nav className="flex items-center justify-between px-4 pt-4">
      <div className="flex items-center gap-2">
        {/* Logo placeholder */}
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <span className="text-white text-xs font-semibold">SC</span>
        </div>
        <span className="text-white font-semibold text-2xl tracking-tighter">suryadev</span>
      </div>
      <button className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform">
        <Menu className="w-4 h-4" />
        <span>Menu</span>
      </button>
    </nav>
  )
}

function HeroCenter() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 px-4 text-center">
      {/* Logo mark placeholder */}
      <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center">
        <span className="text-white text-2xl font-semibold">SC</span>
      </div>

      {/* Main headline */}
      <h1 className="text-6xl lg:text-7xl font-medium font-display text-white tracking-[-0.05em] leading-tight">
        Building<br />
        <em className="font-serif not-italic italic text-white/80">intelligent</em><br />
        systems.
      </h1>

      {/* CTA button */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noreferrer"
        className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-3 text-white text-sm font-medium hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
          <Download className="w-4 h-4" />
        </span>
        Download CV
      </a>

      {/* Pill tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {['Computer Vision', 'AI Systems', 'Edge Inference'].map((tag) => (
          <span
            key={tag}
            className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80"
          >
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
      <p className="text-xs tracking-widest uppercase text-white/50">Visionary Engineering</p>
      <p className="text-sm text-white/80 font-display">
        &ldquo;We built where <em className="font-serif italic text-white/60">code meets</em> the physical world.&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-white/20" />
        <span className="text-xs tracking-widest uppercase text-white/50">Suryadev Chippada</span>
        <div className="h-px w-12 bg-white/20" />
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="hidden lg:flex w-[48%] flex-col p-6 gap-4">
      <RightTopBar />
      <CommunityCard />
      <FeatureSection />
    </div>
  )
}

function RightTopBar() {
  return (
    <div className="flex items-center justify-between">
      {/* Social icons pill */}
      <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3">
        {[
          { icon: Github, href: 'https://github.com/SuryadevChippada' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/suryadev-chippada' },
          { icon: Mail, href: 'mailto:chippadasurya8@gmail.com' },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
        <ArrowRight className="w-4 h-4 text-white/50" />
      </div>

      {/* Resume button */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noreferrer"
        className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs hover:scale-105 transition-transform"
      >
        <Sparkles className="w-4 h-4" />
        <span>Resume</span>
      </a>
    </div>
  )
}

function CommunityCard() {
  return (
    <div className="liquid-glass rounded-2xl p-4 w-56">
      <p className="text-white text-sm font-medium mb-1">Enter my ecosystem</p>
      <p className="text-white/60 text-xs leading-relaxed">
        CS @ TU Darmstadt · Co-founder of FLARE — wildfire detection on edge hardware
      </p>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-3">
      {/* Two side-by-side cards */}
      <div className="flex gap-3">
        <div className="liquid-glass rounded-3xl flex-1 p-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <p className="text-white text-xs font-medium">FLARE</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Wildfire CV system on edge hardware. YOLO-based detection.</p>
        </div>

        <div className="liquid-glass rounded-3xl flex-1 p-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <p className="text-white text-xs font-medium">Tech Stack</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">Python · YOLO · React · OpenCV · PyTorch</p>
        </div>
      </div>

      {/* Bottom card */}
      <div className="liquid-glass rounded-3xl p-4 flex gap-3 items-start">
        {/* Image placeholder */}
        <div className="w-24 h-16 rounded-xl bg-white/10 shrink-0" />
        <div className="flex-1">
          <p className="text-white text-xs font-medium">TU Darmstadt</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed">BSc Computer Science · Oct 2023–Present</p>
        </div>
        <button className="liquid-glass w-7 h-7 rounded-full flex items-center justify-center text-white text-sm hover:scale-105 transition-transform shrink-0">
          +
        </button>
      </div>
    </div>
  )
}
