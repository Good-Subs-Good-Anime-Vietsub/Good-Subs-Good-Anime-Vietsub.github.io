import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact"; 
import sitemap from "@astrojs/sitemap"; // Import sitemap

// https://astro.build/config
// Forcing a reload to recognize new .mdx files
export default defineConfig({
  site: 'https://gsga.moe',
  base: '/',
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 's4.anilist.co' }]
  },
  integrations: [tailwind(), preact(), sitemap()] // Thêm sitemap()
});
