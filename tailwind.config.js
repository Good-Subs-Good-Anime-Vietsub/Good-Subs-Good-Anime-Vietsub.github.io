/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  safelist: [
    'text-green-400', 'border-green-500', 'bg-green-500', 'bg-green-600', 'from-green-600', 'to-green-500',
    'text-cyan-400', 'border-cyan-500', 'bg-cyan-500', 'bg-cyan-600', 'from-cyan-600', 'to-cyan-500',
    'text-yellow-400', 'border-yellow-500', 'bg-yellow-500', 'bg-yellow-600', 'from-yellow-600', 'to-yellow-500',
    'text-red-400', 'border-red-500', 'bg-red-500', 'bg-red-600', 'from-red-600', 'to-red-500',
    'bg-gray-500', 'bg-gray-600', 'from-gray-600', 'to-gray-500',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Add word break properties to the base prose styles
            'overflow-wrap': 'break-word',
            'word-break': 'break-word',
            'hyphens': 'auto',

            'code': {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
