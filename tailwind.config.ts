import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        slab: ['var(--font-roboto-slab)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#000000',
          graphite: '#111111',
          grey: '#333333',
          white: '#FFFFFF',
          'light-grey': '#F5F5F5',
          'dark-section': '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}

export default config
