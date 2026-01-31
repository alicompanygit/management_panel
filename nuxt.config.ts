// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import en from './app/locales/en.json'
import fa from './app/locales/fa.json'

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
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fa', name: 'فارسی', file: 'fa.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'app/locales'
  },

  alias: {
    '~': resolve(fileURLToPath(import.meta.url), './'),
    '@': resolve(fileURLToPath(import.meta.url), './')
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