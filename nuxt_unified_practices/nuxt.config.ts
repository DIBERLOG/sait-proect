import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  },

  app: {
    head: {
      title: 'Единый Nuxt-проект: практические работы',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Единый проект Nuxt с практиками: блогеры, routeRules, SSR/CSR/SWR, реактивный сайт iPhone, composables и utils.'
        },
        { name: 'keywords', content: 'Nuxt, Nuxt UI, SSR, CSR, SWR, useState, useAsyncData, composables' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/index': { prerender: true },
    '/user_page': { swr: true },
    '/recommendations': { swr: 3600 },
    '/admin': { ssr: false },
    '/login': { redirect: '/enter' }
  },

  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'index-alias',
        path: '/index',
        file: join(currentDir, 'pages/index.vue')
      })
    }
  }
})
