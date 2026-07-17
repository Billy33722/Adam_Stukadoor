'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['Все', 'Штукатурка', 'Покраска', 'Декор', 'Фасад'] as const

type Category = (typeof categories)[number]

const projects: { id: number; title: string; category: Exclude<Category, 'Все'>; shade: string }[] =
  [
    { id: 1, title: 'Квартира в стиле минимализм', category: 'Штукатурка', shade: '#1a1a1a' },
    { id: 2, title: 'Декоративная венецианка', category: 'Декор', shade: '#252525' },
    { id: 3, title: 'Покраска коммерческого объекта', category: 'Покраска', shade: '#202020' },
    { id: 4, title: 'Фасад частного дома', category: 'Фасад', shade: '#303030' },
    { id: 5, title: 'Микроцемент в ванной', category: 'Декор', shade: '#1c1c1c' },
    {
      id: 6,
      title: 'Выравнивание стен в новостройке',
      category: 'Штукатурка',
      shade: '#272727',
    },
    { id: 7, title: 'Покраска загородного дома', category: 'Покраска', shade: '#222222' },
    { id: 8, title: 'Фактурная штукатурка — офис', category: 'Декор', shade: '#1e1e1e' },
    { id: 9, title: 'Штукатурка фасада', category: 'Фасад', shade: '#2a2a2a' },
  ]

export default function Portfolio() {
  const [active, setActive] = useState<Category>('Все')

  const filtered =
    active === 'Все' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label">Наши проекты</p>
          <h2 className="section-title mb-5">Портфолио</h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Избранные работы — реализованные объекты, где виден наш стандарт качества.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase border-2 transition-colors duration-200 ${
                active === cat
                  ? 'bg-brand-black border-brand-black text-white'
                  : 'border-brand-grey text-brand-grey hover:bg-brand-black hover:border-brand-black hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
                style={{ backgroundColor: project.shade }}
              >
                {/* Subtle diagonal pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px)',
                  }}
                />

                {/* Project number watermark */}
                <span className="absolute bottom-3 right-4 font-slab text-7xl font-extrabold text-white/[0.04] select-none leading-none">
                  {String(project.id).padStart(2, '0')}
                </span>

                {/* Category tag */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs tracking-widest uppercase">
                  {project.category}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="font-slab text-white text-base font-bold leading-snug">
                    {project.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a href="#contact" className="btn-dark">
            Обсудить ваш проект
          </a>
        </motion.div>
      </div>
    </section>
  )
}
