'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Frame sequence config ───────────────────────────────────────────────────
// Files must be named: /public/frames/ffout001.gif … ffout103.gif
const TOTAL_FRAMES = 103
const frameSrc = (i: number) =>
  `/frames/ffout${String(i).padStart(3, '0')}.gif`

// ─── Content reveal thresholds (0–1 scroll progress) ────────────────────────
// Wall is ~60 % plastered by frame 62.  Reveal content between 58 %–78 %.
const REVEAL_START = 0.58
const REVEAL_END = 0.78

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    let killed = false
    let ScrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger

    const init = async () => {
      // Dynamically import GSAP to keep it client-side only
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ScrollTriggerInstance = ScrollTrigger

      const canvas = canvasRef.current
      const container = containerRef.current
      const overlay = overlayRef.current
      const loader = loaderRef.current
      if (!canvas || !container) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // ── Canvas sizing (object-fit: cover logic) ──────────────────────────
      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resize()

      const drawCover = (img: HTMLImageElement) => {
        if (!img.naturalWidth) return
        const cw = canvas.width
        const ch = canvas.height
        const iw = img.naturalWidth
        const ih = img.naturalHeight
        const scale = Math.max(cw / iw, ch / ih)
        const dx = (cw - iw * scale) / 2
        const dy = (ch - ih * scale) / 2
        ctx.clearRect(0, 0, cw, ch)
        ctx.drawImage(img, dx, dy, iw * scale, ih * scale)
      }

      // ── Preload all frames ────────────────────────────────────────────────
      const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES)
      let loadedCount = 0
      let currentIndex = 0

      const renderFrame = (idx: number) => {
        const i = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx))
        const img = frames[i]
        if (img?.complete && img.naturalWidth) drawCover(img)
      }

      const onAllLoaded = () => {
        if (killed) return
        // Hide loader, show canvas
        if (loader) loader.style.display = 'none'
        canvas.style.opacity = '1'
        renderFrame(0)
        setupScrollTrigger()
      }

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = frameSrc(i + 1)
        img.onload = img.onerror = () => {
          loadedCount++
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
          if (loadedCount === TOTAL_FRAMES) onAllLoaded()
        }
        frames[i] = img
      }

      // ── GSAP ScrollTrigger setup ──────────────────────────────────────────
      const setupScrollTrigger = () => {
        // 1. Frame scrubbing — ties scroll progress to the frame index
        gsap.to(
          {},
          {
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.3, // small value = tight scrub, responsive feeling
              onUpdate(self) {
                const idx = Math.round(self.progress * (TOTAL_FRAMES - 1))
                if (idx !== currentIndex) {
                  currentIndex = idx
                  renderFrame(idx)
                }
              },
            },
          }
        )

        // 2. Content overlay — fades in + slides up on the plastered white area
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                // Convert progress thresholds to pixel offsets inside the container
                start: () =>
                  container.offsetHeight * REVEAL_START + ' top',
                end: () =>
                  container.offsetHeight * REVEAL_END + ' top',
                scrub: 1.2,
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      }

      // ── Resize handler ────────────────────────────────────────────────────
      const onResize = () => {
        resize()
        renderFrame(currentIndex)
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize, { passive: true })

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }

    init()

    return () => {
      killed = true
      // Kill all ScrollTriggers created by this component on unmount
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [])

  return (
    // Tall scroll container — gives GSAP 500 vh of scrub room for 103 frames
    <section
      ref={containerRef}
      id="hero"
      style={{ height: '500vh' }}
      className="relative"
    >
      {/* ── Sticky full-viewport stage ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — hidden until frames load */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
        />

        {/* ── Loading screen ── */}
        <div
          ref={loaderRef}
          className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center gap-4 z-10"
        >
          <div className="text-white/40 text-xs tracking-[0.3em] uppercase">
            Загрузка
          </div>
          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10">
            <div
              className="h-full bg-white/60 transition-all duration-150"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-white/30 text-xs tabular-nums">
            {loadProgress}%
          </div>
        </div>

        {/* ── Content overlay — dark text on the plastered white wall ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: 0 }}
        >
          <div className="text-center max-w-2xl">
            {/* Label */}
            <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-5 font-medium">
              Штукатурные и отделочные работы
            </p>

            {/* Main heading — same visual treatment as original Hero */}
            <h1 className="font-slab text-[clamp(3.5rem,11vw,8rem)] font-semibold text-brand-black leading-[0.88] tracking-tight mb-6">
              STUKA
              <br />
              <span className="text-brand-graphite italic">d&apos;Or</span>
            </h1>

            {/* Divider */}
            <div className="w-16 h-px bg-brand-black opacity-30 mx-auto mb-8" />

            {/* Tagline */}
            <p className="text-gray-500 text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed">
              Качество, проверенное временем.
              <br />
              Результат, которым вы гордитесь.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#portfolio" className="btn-dark">
                Наши работы
              </a>
              <a href="#contact" className="btn-ghost-dark">
                Связаться с нами
              </a>
            </div>
          </div>
        </div>

        {/* ── Scroll hint — fades out once user starts scrolling ── */}
        <div
          id="scroll-hint"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce z-20"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <line x1="8" y1="6" x2="8" y2="10" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
