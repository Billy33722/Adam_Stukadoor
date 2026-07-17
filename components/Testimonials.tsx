'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Андрей Коваленко',
    role: 'Владелец квартиры',
    text: 'Заказывали штукатурку и покраску в новой квартире. Мастера работали аккуратно, соблюли все сроки. Стены идеально ровные — ни одного изъяна. Очень доволен результатом, буду рекомендовать друзьям.',
    stars: 5,
  },
  {
    name: 'Марина Савченко',
    role: 'Дизайнер интерьера',
    text: "Работаю с Stuka d'Or уже три года и рекомендую всем клиентам. Особенно ценю декоративные покрытия — венецианская штукатурка выполнена на высочайшем уровне. Профессионалы своего дела.",
    stars: 5,
  },
  {
    name: 'Игорь Бондаренко',
    role: 'Владелец кафе',
    text: 'Доверили отделку коммерческого помещения 200 м². Сдали точно в срок, смета не изменилась. Качество материалов и работы — на уровне европейских стандартов. Буду обращаться снова.',
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#111111" className="w-4 h-4">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.08L8 10.5l-3.71 1.96.71-4.08L2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Что говорят клиенты</p>
          <h2 className="section-title mb-5">Отзывы</h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#F5F5F5] p-8 relative"
            >
              <Quote size={30} strokeWidth={1} className="text-gray-300 mb-4" />
              <StarRating count={t.stars} />
              <p className="text-gray-500 text-sm leading-relaxed mb-7 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-gray-200 pt-5">
                <div className="font-slab font-bold text-brand-black text-sm">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
