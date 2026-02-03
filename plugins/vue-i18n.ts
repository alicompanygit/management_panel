import { createI18n } from 'vue-i18n'
import { defineNuxtPlugin } from 'nuxt/app'

import messages from '~/utils/locales/messages'

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'fa',
    messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    allowHtml: true,
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(i18n)
})

