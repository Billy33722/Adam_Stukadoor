'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  phone: string
  message: string
}

const contactInfo = [
  { Icon: Phone, label: 'Телефон', value: '+32 (000) 000-000', href: 'tel:+320000000000' },
  { Icon: Mail,  label: 'Email',   value: 'info@stukdor.com',   href: 'mailto:info@stukdor.com' },
  { Icon: MapPin, label: 'Регион', value: 'Бельгия', href: null },
]

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const onSubmit = async (_data: FormData) => {
    setSending(true)
    // TODO: Replace simulation with real endpoint, e.g.:
    // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSending(false)
    setSubmitted(true)
    reset()
  }

  return (
    <section id="contact" className="py-24 bg-brand-dark-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4 font-medium">
              Свяжитесь с нами
            </p>
            <h2 className="font-slab text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Готовы начать
              <br />
              ваш проект?
            </h2>
            <div className="w-16 h-px bg-white opacity-30 mb-8" />
            <p className="text-gray-400 leading-relaxed mb-12 text-sm">
              Оставьте заявку — мы свяжемся с вами в течение часа. Бесплатная консультация и
              выезд на замер.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 border border-gray-700 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-wide mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-white font-semibold text-sm hover:text-gray-300 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-white font-semibold text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {submitted ? (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 border-2 border-white/40 flex items-center justify-center mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-7 h-7 text-white"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-slab text-2xl font-bold text-white mb-3">
                  Заявка отправлена!
                </h3>
                <p className="text-gray-400 text-sm">Мы свяжемся с вами в течение часа.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 border border-gray-700 text-gray-400 text-xs tracking-widest uppercase hover:border-white hover:text-white transition-colors"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    {...register('name', { required: 'Пожалуйста, введите ваше имя' })}
                    className="w-full bg-transparent border border-gray-700 text-white px-5 py-4 text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-700"
                    placeholder="Иван Иванов"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    autoComplete="tel"
                    {...register('phone', {
                      required: 'Пожалуйста, введите номер телефона',
                      pattern: {
                        value: /^[\d\s+\-()\u0020]{7,20}$/,
                        message: 'Введите корректный номер телефона',
                      },
                    })}
                    className="w-full bg-transparent border border-gray-700 text-white px-5 py-4 text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-700"
                    placeholder="+32 (0__) ___-___"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    className="w-full bg-transparent border border-gray-700 text-white px-5 py-4 text-sm focus:outline-none focus:border-white transition-colors resize-none placeholder-gray-700"
                    placeholder="Опишите ваш проект или задайте вопрос..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-white text-brand-black font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Отправляем...' : 'Отправить заявку'}
                </button>

                <p className="text-gray-700 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
