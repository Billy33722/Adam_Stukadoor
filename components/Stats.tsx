'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 250, suffix: '+', label: 'Выполненных проектов' },
  { value: 8, suffix: ' лет', label: 'На рынке отделки' },
  { value: 200, suffix: '+', label: 'Довольных клиентов' },
  { value: 3, suffix: ' года', label: 'Гарантия на работы' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 bg-brand-graphite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-6 py-4"
            >
              <div className="font-slab text-5xl md:text-6xl font-extrabold text-white mb-2 tabular-nums">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
