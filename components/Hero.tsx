'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-graphite"
    >
      {/* Layered dark background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 45%, #0a0a0a 100%)',
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white opacity-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
        {/* Pre-heading label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-500 text-xs tracking-[0.4em] uppercase mb-8 font-medium"
        >
          Штукатурные &amp; отделочные работы
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-slab text-[clamp(4rem,14vw,10rem)] font-semibold text-white leading-[0.9] tracking-tight mb-6"
        >
          STUKA
          <br />
          <span className="text-gray-400 italic">d&apos;Or</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ transformOrigin: 'center' }}
          className="w-20 h-px bg-white opacity-40 mx-auto mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Качество, проверенное временем.
          <br className="hidden md:block" />
          Результат, которым вы гордитесь.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="px-10 py-4 bg-white text-brand-black font-semibold text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300"
          >
            Наши работы
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border-2 border-white text-white font-semibold text-sm tracking-widest uppercase hover:bg-white hover:text-brand-black transition-colors duration-300"
          >
            Связаться с нами
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  )
}
