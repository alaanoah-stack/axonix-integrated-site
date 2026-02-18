import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // Setting output to 'static' makes it faster and avoids the "Function" error
  output: 'static', 
  integrations: [tailwind()],
});
