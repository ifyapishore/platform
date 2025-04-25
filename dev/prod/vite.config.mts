import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';
import { createRequire } from 'module';
import { homedir } from 'os';
import glob from 'fast-glob';

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

const hcPackages = glob.sync('packages/*/package.json')
  .map((pkg: string) => '@hcengineering/' + pkg.split('/')[1]);

hcPackages.push('@hcengineering/contact');

export default defineConfig(({ mode }) => {
  const alias: Record<string, string> = {

    // hacks
    '@hcengineering/platform-rig/profiles/ui/svelte': path.resolve(__dirname, './.vite-shim/empty.js'),

    // models
    '@hcengineering/contact': path.resolve(__dirname, '../../models/contact/src'),
    '@hcengineering/model-contact': path.resolve(__dirname, '../../models/contact/src'),
    '@hcengineering/chunter': path.resolve(__dirname, '../../models/chunter/src'),

    // packages
    '@hcengineering/account-client': path.resolve(__dirname, '../../packages/account-client'),
    '@hcengineering/analytics': path.resolve(__dirname, '../../packages/analytics/src'),
    '@hcengineering/analytics-service': path.resolve(__dirname, '../../packages/analytics-service'),
    '@hcengineering/api-client': path.resolve(__dirname, '../../packages/api-client'),
    '@hcengineering/collaborator-client': path.resolve(__dirname, '../../packages/collaborator-client'),
    '@hcengineering/core': path.resolve(__dirname, '../../packages/core/src'),
    '@hcengineering/highlight': path.resolve(__dirname, '../../packages/highlight'),
    '@hcengineering/importer': path.resolve(__dirname, '../../packages/importer'),
    '@hcengineering/kanban': path.resolve(__dirname, '../../packages/kanban'),
    '@hcengineering/model': path.resolve(__dirname, '../../packages/model'),
    '@hcengineering/panel': path.resolve(__dirname, '../../packages/panel'),
    '@hcengineering/platform': path.resolve(__dirname, '../../packages/platform/src'),
    '@hcengineering/platform-rig': path.resolve(__dirname, '../../packages/platform-rig'),
    '@hcengineering/presentation': path.resolve(__dirname, '../../packages/presentation'),
    '@hcengineering/query': path.resolve(__dirname, '../../packages/query'),
    '@hcengineering/rank': path.resolve(__dirname, '../../packages/rank'),
    '@hcengineering/rekoni': path.resolve(__dirname, '../../packages/rekoni'),
    '@hcengineering/storage': path.resolve(__dirname, '../../packages/storage'),
    '@hcengineering/text': path.resolve(__dirname, '../../packages/text/src'),
    '@hcengineering/text-core': path.resolve(__dirname, '../../packages/text-core/src'),
    '@hcengineering/text-html': path.resolve(__dirname, '../../packages/text-html'),
    '@hcengineering/text-markdown': path.resolve(__dirname, '../../packages/text-markdown'),
    '@hcengineering/text-ydoc': path.resolve(__dirname, '../../packages/text-ydoc'),
    '@hcengineering/theme': path.resolve(__dirname, '../../packages/theme/src'),
    '@hcengineering/ui': path.resolve(__dirname, '../../packages/ui'),
    '@hcengineering/ui-next': path.resolve(__dirname, '../../packages/ui-next/src'),
  }

  // Strip Webpack-only packages
  if (mode === 'development') {
    alias['svelte-loader'] = path.resolve(__dirname, './.vite-shim/empty.js');
  }

  return {
    optimizeDeps: {
      exclude: hcPackages
    },
    ssr: {
      noExternal: hcPackages
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({ typescript: true }),
        compilerOptions: {
          dev: true
        }
      })
    ],
    resolve: {
      alias,
      extensions: ['.mjs', '.js', '.ts', '.json', '.svelte']
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
