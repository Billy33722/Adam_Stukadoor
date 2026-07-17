import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Services from '@/components/Services'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Services />
      <About />
      <Stats />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
