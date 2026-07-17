'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure autoplay works after hydration
  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">

      {/* ── Background video ── */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Dark overlay so text is readable ── */}
      <div className="absolute inset-0 bg-black/55" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Label */}
        <p
          className="text-xs tracking-[0.35em] uppercase text-white/60 mb-5 font-medium"
          style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
        >
          Штукатурные и отделочные работы
        </p>

        {/* Heading */}
        <h1
          className="font-slab text-[clamp(4rem,13vw,9rem)] font-semibold text-white leading-[0.88] tracking-tight mb-6"
          style={{ animation: 'fadeUp 0.9s ease 0.4s both' }}
        >
          STUKA
          <br />
          <span className="text-gray-400 italic">d&apos;Or</span>
        </h1>

        {/* Divider */}
        <div
          className="w-16 h-px bg-white/40 mb-8"
          style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}
        />

        {/* Tagline */}
        <p
          className="text-gray-300 text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed"
          style={{ animation: 'fadeUp 0.7s ease 0.75s both' }}
        >
          Качество, проверенное временем.
          <br />
          Результат, которым вы гордитесь.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: 'fadeUp 0.7s ease 0.9s both' }}
        >
          <a href="#portfolio" className="btn-dark">
            Наши работы
          </a>
          <a href="#contact" className="btn-ghost-light">
            Связаться с нами
          </a>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce"
        style={{ animation: 'fadeUp 1s ease 1.2s both' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <line x1="8" y1="6" x2="8" y2="10" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
