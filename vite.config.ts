import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// check if we are building the library
const isBuildingLibrary =
  process.env.BUILD_LIB !== undefined && process.env.BUILD_LIB === 'true';

const plugins = [vue()];
// if we are building the library, add the dts plugin to generate the typings
if (isBuildingLibrary) {
  plugins.push(dts({ exclude: ['src/examples/**/*', 'src/lib/*.spec.ts'] }));
}

// https://vitejs.dev/config/
export default defineConfig({
  base: isBuildingLibrary ? '/' : '/vue-task-management/',
  plugins,
  build: isBuildingLibrary
    ? {
        lib: {
          entry: 'src/lib/index.ts',
          name: 'VueTaskManagement',
          fileName: (format) => `vue-task-management.${format}.js`,
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      }
    : {
        outDir: 'dist/examples',
        assetsDir: './',
        rollupOptions: {
          input: ['src/examples/main.ts', './index.html'],
        },
      },
});
