// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  // ⚠ CAMBIAR al dominio real antes de publicar: alimenta canonical, og:url y sitemap.
  site: 'https://www.traumasurgery.pe',

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['astro']
    }
  }
});