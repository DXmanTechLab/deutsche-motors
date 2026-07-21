import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deutsche-dark': '#1a1a1a',
        'deutsche-silver': '#e8e8e8',
        'deutsche-gold': '#d4af37',
      },
    },
  },
  plugins: [],
}
export default config
