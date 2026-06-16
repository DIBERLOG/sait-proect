<template>
  <section class="mx-auto max-w-md px-6 py-16">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-black">/enter</h1>
      </template>
      <p class="text-slate-600 dark:text-slate-300">
        Сюда перенаправляет маршрут <code>/login</code> через <code>redirect: '/enter'</code>.
      </p>
      <UButton to="/" class="mt-5">На главную</UButton>
    </UCard>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Enter' })
</script>
