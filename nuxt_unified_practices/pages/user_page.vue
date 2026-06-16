<template>
  <section class="mx-auto max-w-4xl px-6 py-10">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-black">/user_page — SWR-кеширование</h1>
      </template>
      <p class="text-slate-600 dark:text-slate-300">
        Эта страница нужна для практики 2. В <code>nuxt.config.ts</code> для неё задано <code>swr: true</code>,
        потому что пользователи часто обновляют страницу.
      </p>
      <p class="mt-4 text-sm text-slate-500">Время рендера: {{ renderedAt }}</p>
    </UCard>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'User page — SWR' })
const renderedAt = new Date().toLocaleString('ru-RU')
</script>
