<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur dark:border-white/20 dark:bg-black/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6">
      <NuxtLink to="/" class="flex items-center gap-2 font-black text-slate-950 dark:text-white">
        <span class="grid size-9 place-items-center rounded-xl bg-black text-white ring-1 ring-black dark:bg-white dark:text-black dark:ring-white">N</span>
        <span>Nuxt Works</span>
      </NuxtLink>

      <nav class="hidden items-center gap-5 text-sm font-semibold text-slate-700 dark:text-white md:flex">
        <NuxtLink to="/practice-1">Практика 1</NuxtLink>
        <NuxtLink to="/practice-2">Практика 2</NuxtLink>
        <NuxtLink to="/catalog/iphone/16">Практика 3</NuxtLink>
        <NuxtLink to="/catalog/iphone-reactive/16">Практика 4</NuxtLink>
        <NuxtLink to="/social-network">Соцсеть</NuxtLink>
        <NuxtLink to="/social-network-reactive">Реактивная соцсеть</NuxtLink>
        <NuxtLink to="/admin">Admin</NuxtLink>
        <NuxtLink to="/enter">Enter</NuxtLink>
      </nav>

      <button
        type="button"
        class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-black text-slate-950 transition hover:bg-slate-100 dark:border-white dark:bg-black dark:text-white dark:hover:bg-neutral-900"
        :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
        @click="toggleTheme"
      >
        {{ isDark ? '☀ Светлая' : '☾ Тёмная' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const { colorMode } = useSiteTheme()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
