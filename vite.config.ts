import type { PluginOption } from 'vite';
import { unstable_cloudflarePreset as cloudflare, unstable_vitePlugin as remix } from '@remix-run/dev';
import viteAnalyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteEnv from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteAnalyze({ summaryOnly: true }) as PluginOption,
    visualizer({ gzipSize: true, emitFile: true }) as PluginOption,
    remix({ presets: [cloudflare()] }),
    tsconfigPaths(),
    viteEnv({
      VITE_HOST: undefined,
    }),
  ],
  ssr: {
    resolve: {
      externalConditions: ['workerd', 'worker'],
    },
  },
});
