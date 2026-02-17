import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    tailwind(), 
    mdx(), 
    sitemap()
  ],
});
