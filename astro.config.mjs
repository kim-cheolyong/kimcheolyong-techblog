import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kim-cheolyong.github.io',
  base: '/kimcheolyong-techblog',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (url) => !url.endsWith('/404/') })],
  devToolbar: { enabled: false },
});
