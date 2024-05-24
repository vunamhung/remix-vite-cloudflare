import type { PluginOption } from 'vite';
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';
import { remixDevTools } from 'remix-development-tools';
import { flatRoutes } from 'remix-flat-routes';
import viteAnalyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteEnv from 'vite-plugin-environment';
import { VitePluginRadar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    remixDevTools(),
    viteAnalyze({ summaryOnly: true }) as PluginOption,
    visualizer({ gzipSize: true, emitFile: true }) as PluginOption,
    remixCloudflareDevProxy(),
    remix({
      ignoredRouteFiles: ['**/*'],
      serverModuleFormat: 'esm',
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
            // This is for server-side utilities you want to colocate next to
            // your routes without making an additional directory.
            // If you need a route that includes "server" or "client" in the
            // filename, use the escape brackets like: my-route.[server].tsx
            '**/*.server.*',
            '**/*.client.*',
          ],
        });
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        icon: true,
        memo: true,
        expandProps: 'end',
        svgoConfig: {
          floatPrecision: 2,
          plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
        },
      },
      include: '**/*.svg?react',
    }),
    viteEnv({
      // VITE_RESEND_API_KEY: undefined,
      // VITE_HOST: undefined,
    }),
    /*VitePluginRadar({
      analytics: {
        id: 'G-XXXXX', // Google Analytics tag injection
      },
    }),*/
  ],
});
