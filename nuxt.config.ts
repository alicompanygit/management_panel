// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import en from '~/i18n/locales/en.json'
import fa from '~/i18n/locales/fa.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  css: [],
  modules: ['@nuxt/fonts', 'vuetify-nuxt-module', '@nuxtjs/i18n'],

  // @ts-ignore
  i18n: {
    lazy: true,
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fa', file: 'fa.json' }
    ],
    defaultLocale: 'en'
  },

  alias: {
    '~': resolve(fileURLToPath(import.meta.url), './'),
    '@': resolve(fileURLToPath(import.meta.url), './')
  },

  devServer: {
    host: '127.0.0.1',
    port: 3001
  },

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: false,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      styles: {
        configFile: 'assets/settings.scss',
      },
    },
  },
})