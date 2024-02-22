import type { PluginOption } from 'vite';
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';
import viteAnalyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteEnv from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteAnalyze({ summaryOnly: true }) as PluginOption,
    visualizer({ gzipSize: true, emitFile: true }) as PluginOption,
    remixCloudflareDevProxy(),
    remix(),
    tsconfigPaths(),
    viteEnv({
      VITE_HOST: undefined,
    }),
    /*VitePluginRadar({
      analytics: {
        id: 'G-XXXXX', // Google Analytics tag injection
      },
    }),*/
  ],
});
