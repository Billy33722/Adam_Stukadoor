import type { Metadata } from 'next'
import { Roboto_Slab, Inter } from 'next/font/google'
import './globals.css'

const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-roboto-slab',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Stuka d'Or — Штукатурные и отделочные работы",
  description:
    "Профессиональные штукатурные, малярные и декоративные отделочные работы. Высокое качество, надёжность, гарантия результата. Бельгия.",
  keywords: "штукатурные работы, малярные работы, отделка стен, Stuka d'Or, Бельгия, Belgium",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${robotoSlab.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
