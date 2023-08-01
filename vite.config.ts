import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

// check if we are building the library
const isLib = process.env.BUILD_LIB;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ exclude: ['src/examples/**/*'] }), vue()],
  build:
    isLib != null && isLib === 'true'
      ? {
          lib: {
            entry: 'src/lib/index.ts',
            name: 'VueUseTaskManagement',
            fileName: (format) => `vue-use-task-management.${format}.js`,
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
            input: 'src/examples/main.ts',
          },
        },
});
