/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  safelist: [
    'text-green-400', 'border-green-500', 'bg-green-500',
    'text-cyan-400', 'border-cyan-500', 'bg-cyan-500', // Đã sửa text-cyan-300 thành 400 cho nhất quán
    'text-yellow-400', 'border-yellow-500', 'bg-yellow-500',
    'text-red-400', 'border-red-500', 'bg-red-500',
    'bg-gray-500', // Thêm màu cho nút "Tất cả"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
}