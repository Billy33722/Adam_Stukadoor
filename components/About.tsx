'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const values = [
  'Более 8 лет опыта в штукатурных и отделочных работах',
  'Собственная бригада квалифицированных мастеров',
  'Работаем только с сертифицированными материалами',
  'Гарантия на все виды работ — до 3 лет',
  'Соблюдение сроков и прозрачная смета без скрытых доплат',
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Кто мы</p>
            <h2 className="section-title mb-5">
              О компании
              <br />
              Stuka d&apos;Or
            </h2>
            <div className="section-divider mb-8" />

            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              Stuka d&apos;Or — это команда профессионалов, для которых качество отделки — не
              просто слова. Мы работаем с 2016 года и за это время реализовали более 250 объектов:
              квартиры, частные дома, коммерческие помещения и общественные пространства.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10 text-sm">
              Наш подход — внимание к каждой детали, честные сроки и материалы, которые служат
              долго. Мы не берёмся за всё подряд — мы делаем штукатурку и отделку, и делаем это
              превосходно.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle
                    size={17}
                    className="text-brand-grey mt-0.5 flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-brand-grey text-sm">{value}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-dark">
              Обсудить проект
            </a>
          </motion.div>

          {/* Image block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Placeholder — replace with <Image> when real photos are available */}
            <div
              className="aspect-[4/5] bg-brand-graphite relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #111 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-slab text-[8rem] font-extrabold text-white/5 select-none leading-none">
                  STUK
                </span>
              </div>
              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-black text-white w-28 h-28 flex flex-col items-center justify-center text-center shadow-xl">
              <span className="font-slab text-4xl font-extrabold leading-none">8+</span>
              <span className="text-gray-400 text-xs mt-1 leading-tight">лет опыта</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
