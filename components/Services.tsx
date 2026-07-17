'use client'

import { motion } from 'framer-motion'
import { Layers, PaintBucket, Sparkles, Brush, Hammer, Building2 } from 'lucide-react'

const services = [
  {
    Icon: Layers,
    title: 'Штукатурные работы',
    description:
      'Выравнивание стен цементной, гипсовой и известковой штукатуркой. Идеальная геометрия и чистые углы.',
  },
  {
    Icon: PaintBucket,
    title: 'Малярные работы',
    description:
      'Покраска стен и потолков любой площади. Профессиональные материалы, равномерное покрытие без разводов.',
  },
  {
    Icon: Sparkles,
    title: 'Декоративные покрытия',
    description:
      'Венецианская штукатурка, микроцемент, фактурные покрытия — создаём уникальный характер пространства.',
  },
  {
    Icon: Brush,
    title: 'Шпатлёвочные работы',
    description:
      'Финишная шпатлёвка под обои или покраску. Идеально ровная поверхность без малейших изъянов.',
  },
  {
    Icon: Hammer,
    title: 'Ремонт и реставрация',
    description:
      'Устранение трещин, восстановление старых покрытий, ремонт после усадки здания или аварийных ситуаций.',
  },
  {
    Icon: Building2,
    title: 'Отделка фасадов',
    description:
      'Наружная штукатурка, утепление "мокрый фасад" под ключ, защита от влаги и перепадов температур.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Что мы делаем</p>
          <h2 className="section-title mb-5">Наши услуги</h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
            Полный спектр штукатурных и отделочных работ — от чернового выравнивания до
            финишных декоративных покрытий.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="bg-white p-8 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Top accent bar */}
              <div className="w-full h-px bg-brand-black mb-8 group-hover:h-0.5 transition-all duration-300" />

              <div className="mb-5 text-brand-grey">
                <Icon size={26} strokeWidth={1.5} />
              </div>

              <h3 className="font-slab text-lg font-bold text-brand-black mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
