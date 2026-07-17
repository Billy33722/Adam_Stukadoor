'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'О нас', href: '#about' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-1' : 'py-4'}`}>
        {/* Logo */}
        <a href="#" className="block">
          <div className={`bg-white rounded-lg shadow-sm transition-all duration-300 ${scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'}`}>
            <Image
              src="/logo.jpeg"
              alt="Stuka d'Or"
              width={110}
              height={50}
              unoptimized
              className={`object-contain transition-all duration-300 ${scrolled ? 'w-[60px] h-auto' : ''}`}
            />
          </div>
        </a>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-8 transition-all duration-300 ${scrolled ? '' : '-translate-y-3'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:opacity-60 ${
                scrolled ? 'text-brand-grey' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`ml-2 px-5 py-2.5 text-sm font-semibold border-2 tracking-wide transition-colors duration-200 ${
              scrolled
                ? 'border-brand-black text-brand-black hover:bg-brand-black hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-brand-black'
            }`}
          >
            Получить консультацию
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-1 ${scrolled ? 'text-brand-black' : 'text-white'}`}
          aria-label="Открыть меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-brand-grey font-medium py-3 border-b border-gray-100 text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-3 px-5 py-3 text-center bg-brand-black text-white font-semibold text-sm tracking-wide"
          >
            Получить консультацию
          </a>
        </div>
      )}
    </header>
  )
}
