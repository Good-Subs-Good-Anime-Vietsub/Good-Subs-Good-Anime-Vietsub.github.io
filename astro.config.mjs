// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://gsga.moe',
  base: '/',
  integrations: [
    tailwind() // <<< Đảm bảo dòng này có ở đây
  ]
});