import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact"; 

// https://astro.build/config
export default defineConfig({
  site: 'https://gsga.moe',
  base: '/',
  integrations: [tailwind(), preact()] // <<< preact() được thêm vào đây
});