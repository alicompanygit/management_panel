import { createResolver } from '@nuxt/kit';
import vuetify from 'vite-plugin-vuetify';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    }
  },  

  alias: {
    // '~': `${process.env.NGINX_PATH}`,
    // '@': `${process.env.NGINX_PATH}`,
    // '~~': `${process.env.NGINX_PATH}`,
    // '@@': `${process.env.NGINX_PATH}`,
    'public/': `${process.env.NGINX_PATH}public/`,
    'files/': `${process.env.NGINX_PATH}files/`,
    'fonts/': `${process.env.NGINX_PATH}fonts/`,
    'icons/': `${process.env.NGINX_PATH}icons/`,
    'images/': `${process.env.NGINX_PATH}images/`,
  },

  typescript: {
    shim: false,
  },

  plugins: ['~/plugins/firebase.js', '~/plugins/fetching.ts'],

  vite: {
    ssr: {
      noExternal: ['vuetify'], // add the vuetify vite plugin
    },
    optimizeDeps: {
      include: [
        '@tato30/vue-pdf',
        'vue3-persian-datetime-picker',
        'vue-scrollto',
        'vue3-smooth-dnd',
        'yup',
        'jssip',
      ],
      // load all packages on first build
      exclude: [
        '@fullcalendar/core',
        '@fullcalendar/daygrid',
        '@fullcalendar/interaction',
        '@fullcalendar/timegrid',
        '@fullcalendar/vue3',
        '@iconify/vue',
        '@mdi/font',
        '@nuxt/vite-builder',
        '@pinia/nuxt',
        '@tato30/vue-pdf',
        '@tiptap/pm',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        '@types/aos',
        'aos',
        'chance',
        'date-fns',
        'firebase',
        'maska',
        'apexcharts',
        'vue3-apexcharts',
        'pinia',
        'qrcode.vue',
        'remixicon',
        'sass',
        'tiff.js',
        'svgmap',
        'ulid',
        'vee-validate',
        'vite-plugin-vuetify',
        'vue',
        'vue-draggable-next',
        'vue-i18n',
        'vue-style-loader',
        'vue-tabler-icons',

        'vue3-carousel',
        'vue3-easy-data-table',
        'vue3-perfect-scrollbar',
        'vuedraggable',
        'vuetify',
        'wavesurfer.js',
        'xlsx',
      ],
      esbuildOptions: {
        target: 'esnext',
      },
    },
    esbuild: {
      target: 'esnext',
    },
    build: {
      target: 'esnext',
    },
    resolve: {
      mainFields: ['browser', 'module', 'main', 'jsnext:main', 'jsnext'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $primary-path: '${process.env.NGINX_PATH}';
          `,
        },
      },
    },
  },

  //build: { transpile: ["vuetify"] },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) =>
        // @ts-ignore
        config.plugins.push(
          vuetify({
            styles: { configFile: resolve('/assets/scss/variables.scss') },
          })
        )
      );
    },
  ],
  devtools: {
    enabled: true,
  },

  app: {
    // baseURL: process.env.NGINX_PATH,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [],
      title: process.env.VITE_COMPANY_NAME,
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${process.env.NGINX_PATH}images/logos/${process.env.VITE_COMPANY_LOGO}/logo.png`,
        },
      ],
      style: [
        {
          children: `
            :root {
              --primary-path: ${process.env.NGINX_PATH};
            }
          `,
        },
      ],
    },
  },

  nitro: {
    serveStatic: true,
  },

  sourcemap: {
    server: true,
    client: true,
  },
  devServerHandlers: [],
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  // hooks: {
  //   "vite:extendConfig": (config: any) => {
  //     config.plugins.push(
  //       vuetify({
  //         styles: { configFile: resolve("/assets/scss/variables.scss") },
  //       })
  //     );
  //   },
  // },

  compatibilityDate: '2024-07-30',
});
