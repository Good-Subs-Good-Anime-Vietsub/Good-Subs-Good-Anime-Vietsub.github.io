import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
// Forcing a reload to recognize new .mdx files
export default defineConfig({
  site: 'https://gsga.moe',
  base: '/',
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
  },
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 's4.anilist.co' }]
  },
  integrations: [tailwind(), preact(), sitemap(), icon({
    include: {
      mdi: ["*"]
    }
  })],
  vite: {
    server: {
      allowedHosts: [
        '.ngrok-free.app'
      ]
    }
  }
});
