import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { createRequire } from 'module';
import { homedir } from 'os';

const require = createRequire(import.meta.url);

// Hard-mock svelte-loader if present
try {
  const id = require.resolve('svelte-loader');
  //@ts-ignore
  require.cache[id] = {
    id,
    filename: id,
    loaded: true,
    exports: () => ({}),
    isPreloading: false,
    require: require,
    parent: null,
    children: []
  };
  console.log('MOCK: svelte-loader mocked');
} catch (e) {
  // ok if not installed
  console.log('MOCK: svelte-loader not found');
}

export default defineConfig(({ mode }) => {
  const alias: Record<string, string> = {
    '@hcengineering/accountClient': path.resolve(__dirname, '../../packages/account-client'),
    '@hcengineering/analytics': path.resolve(__dirname, '../../packages/analytics'),
    '@hcengineering/analyticsService': path.resolve(__dirname, '../../packages/analytics-service'),
    '@hcengineering/apiClient': path.resolve(__dirname, '../../packages/api-client'),
    '@hcengineering/collaboratorClient': path.resolve(__dirname, '../../packages/collaborator-client'),
    '@hcengineering/core': path.resolve(__dirname, '../../packages/core'),
    '@hcengineering/highlight': path.resolve(__dirname, '../../packages/highlight'),
    '@hcengineering/importer': path.resolve(__dirname, '../../packages/importer'),
    '@hcengineering/kanban': path.resolve(__dirname, '../../packages/kanban'),
    '@hcengineering/model': path.resolve(__dirname, '../../packages/model'),
    '@hcengineering/panel': path.resolve(__dirname, '../../packages/panel'),
    '@hcengineering/platform': path.resolve(__dirname, '../../packages/platform'),
    '@hcengineering/platformRig': path.resolve(__dirname, '../../packages/platform-rig'),
    '@hcengineering/presentation': path.resolve(__dirname, '../../packages/presentation'),
    '@hcengineering/query': path.resolve(__dirname, '../../packages/query'),
    '@hcengineering/rank': path.resolve(__dirname, '../../packages/rank'),
    '@hcengineering/rekoni': path.resolve(__dirname, '../../packages/rekoni'),
    '@hcengineering/storage': path.resolve(__dirname, '../../packages/storage'),
    '@hcengineering/text': path.resolve(__dirname, '../../packages/text'),
    '@hcengineering/textCore': path.resolve(__dirname, '../../packages/text-core'),
    '@hcengineering/textHtml': path.resolve(__dirname, '../../packages/text-html'),
    '@hcengineering/textMarkdown': path.resolve(__dirname, '../../packages/text-markdown'),
    '@hcengineering/textYdoc': path.resolve(__dirname, '../../packages/text-ydoc'),
    '@hcengineering/theme': path.resolve(__dirname, '../../packages/theme/src'),
    '@hcengineering/ui': path.resolve(__dirname, '../../packages/ui'),
    '@hcengineering/uiNext': path.resolve(__dirname, '../../packages/ui-next/src')
  }

  // Strip Webpack-only packages
  if (mode === 'development') {
    alias['svelte-loader'] = path.resolve(__dirname, './.vite-shim/empty.js');
  }
  return {
    plugins: [svelte({
      compilerOptions: {
        dev: true
      }

    })],
    resolve: {
      alias: alias,
      extensions: ['.mjs', '.js', '.ts', '.json', '.svelte'] // just in case
    },
    server: {
      port: 3000,
      open: true,
      hmr: false
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.message.includes('for supported dynamic import formats. If ')) {
            return; // suppress just this warning
          }
          warn(warning); // forward all others
        }
      }
    }  
  }
});
