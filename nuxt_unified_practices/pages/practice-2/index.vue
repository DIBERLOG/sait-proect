<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <h1 class="text-3xl font-black text-slate-900 dark:text-white">Практика 2 — Выбор пути</h1>
    <p class="mt-3 text-slate-600 dark:text-slate-300">
      Эта страница объясняет конфигурацию <code>routeRules</code>, которая лежит в <code>nuxt.config.ts</code>.
    </p>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <UCard v-for="rule in rules" :key="rule.path">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <code class="text-lg font-bold">{{ rule.path }}</code>
            <UBadge color="primary" variant="soft">{{ rule.mode }}</UBadge>
          </div>
        </template>
        <p class="text-sm text-slate-600 dark:text-slate-300">{{ rule.text }}</p>
        <pre class="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-3 text-sm text-slate-100"><code>{{ rule.code }}</code></pre>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Практика 2 — routeRules' })

const rules = [
  {
    path: '/index и /',
    mode: 'prerender',
    text: 'Главная страница заранее генерируется в HTML: быстрее загрузка и лучше SEO.',
    code: "'/index': { prerender: true }"
  },
  {
    path: '/user_page',
    mode: 'swr: true',
    text: 'Страница пользователя кешируется и обновляется по логике stale-while-revalidate.',
    code: "'/user_page': { swr: true }"
  },
  {
    path: '/recommendations',
    mode: 'swr: 3600',
    text: 'Рекомендации обновляются один раз в час. 3600 секунд = 1 час.',
    code: "'/recommendations': { swr: 3600 }"
  },
  {
    path: '/admin',
    mode: 'CSR',
    text: 'Админ-панель не нужна для SEO, поэтому серверный рендер отключён.',
    code: "'/admin': { ssr: false }"
  },
  {
    path: '/login',
    mode: 'redirect',
    text: 'При входе пользователь перенаправляется на /enter.',
    code: "'/login': { redirect: '/enter' }"
  }
]
</script>
