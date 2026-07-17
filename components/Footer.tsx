import Image from 'next/image'

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gray-900">
          {/* Brand */}
          <div>
            <div className="mb-4 inline-block bg-white rounded-lg p-2">
              <Image
                src="/logo.jpeg"
                alt="Stuka d'Or"
                width={110}
                height={50}
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Профессиональные штукатурные и отделочные работы. Качество, проверенное временем.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Навигация
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Контакты
            </h4>
            <div className="space-y-2.5">
              <a
                href="tel:+320000000000"
                className="block text-gray-600 text-sm hover:text-white transition-colors duration-200"
              >
                +32 (000) 000-000
              </a>
              <a
                href="mailto:info@stukdor.com"
                className="block text-gray-600 text-sm hover:text-white transition-colors duration-200"
              >
                info@stukdor.com
              </a>
              <span className="block text-gray-600 text-sm">Бельгия</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-800 text-xs">
            © {year} Stuka d&apos;Or. Все права защищены.
          </p>
          <p className="text-gray-800 text-xs">
            Штукатурные и отделочные работы в Бельгии
          </p>
        </div>
      </div>
    </footer>
  )
}
