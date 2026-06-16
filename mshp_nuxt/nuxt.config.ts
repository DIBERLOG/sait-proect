export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'MSHP_PORTAL',
      meta: [
        {
          name: 'description',
          content: 'Учебный Nuxt-проект: музыка, Apple Shop, i18n, плагины и модули'
        }
      ]
    }
  },

  i18n: {
    restructureDir: '.',
    locales: [
      { code: 'ru', iso: 'ru-RU', name: 'Русский' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts'
  },

  colorMode: {
    classSuffix: '-mode',
    preference: 'dark',
    fallback: 'dark'
  }
})
