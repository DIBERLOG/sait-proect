<template>
  <section class="mx-auto max-w-6xl px-6 py-10">
    <div class="mb-8 rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
      <p class="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Nuxt практики</p>
      <h1 class="text-4xl font-black leading-tight md:text-5xl">Единый проект со всеми работами</h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Здесь собраны практические и промежуточные задания из чата: Nuxt UI, MockAPI, получение данных,
        routeRules, SSR/CSR/SWR, реактивность, useState, composables и utils.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink v-for="item in cards" :key="item.to" :to="item.to" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-bold text-blue-600 dark:text-blue-400">{{ item.label }}</p>
        <h2 class="mt-2 text-xl font-black text-slate-900 dark:text-white">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ item.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Главная — единый Nuxt-проект' })

const cards = [
  {
    label: 'Практика 1',
    title: 'Кваккер: блогеры и API',
    description: 'MockAPI, useFetch/useAsyncData, вывод постов, форма создания пользователя, шутка из API.',
    to: '/practice-1'
  },
  {
    label: 'Практика 2',
    title: 'Выбор пути и routeRules',
    description: 'prerender, swr, ssr: false, redirect, кеш рекомендаций на 1 час.',
    to: '/practice-2'
  },
  {
    label: 'Практика 3',
    title: 'Реактивный iPhone',
    description: 'Вкладки, выбор памяти, язык, тёмная тема, composables и utils.',
    to: '/catalog/iphone/16'
  },
  {
    label: 'Практика 4',
    title: 'iPhone: расширенная реактивность',
    description: 'Отдельная страница по новому ТЗ: вкладки, гигабайты, язык, тема, composables и дополнительные utils.',
    to: '/catalog/iphone-reactive/16'
  },
  {
    label: 'Практика 5',
    title: 'Социальная сеть',
    description: 'Профиль Егора Ангелова, друзья, лента, форма поста и динамический переход на страницу друга.',
    to: '/social-network'
  },
  {
    label: 'Практика 6',
    title: 'Соцсеть: реактивность',
    description: 'Отдельная страница со счётчиками, поиском друзей через computed, лайками и пустыми состояниями.',
    to: '/social-network-reactive'
  },
  {
    label: 'CSR',
    title: 'Админ-панель',
    description: 'Путь /admin работает в режиме CSR через routeRules ssr: false.',
    to: '/admin'
  },
  {
    label: 'SWR',
    title: 'Страница пользователя',
    description: 'Путь /user_page кешируется через swr: true.',
    to: '/user_page'
  },
  {
    label: 'SWR 3600',
    title: 'Рекомендации',
    description: 'Путь /recommendations обновляется раз в час.',
    to: '/recommendations'
  }
]
</script>
