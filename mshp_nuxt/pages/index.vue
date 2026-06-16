<script setup>
useSeoMeta({
  title: 'MSHP_PORTAL — главная',
  description: 'Единый учебный Nuxt-проект с музыкой, Apple Shop, плагинами и модулями',
  ogTitle: 'MSHP_PORTAL',
  ogDescription: 'Музыка, магазин Apple, Nuxt i18n, Color Mode и плагины'
})
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <h1>{{ $t('home.title') }}</h1>

      <p>
        {{ $t('home.description') }}
      </p>

      <div class="home-actions">
        <NuxtLink to="/music" class="home-card">
          <span class="home-icon" aria-hidden="true">🎧</span>
          <h2>{{ $t('home.musicTitle') }}</h2>
          <p>{{ $t('home.musicText') }}</p>
        </NuxtLink>

        <NuxtLink to="/apple" class="home-card">
          <span class="home-icon" aria-hidden="true">🍎</span>
          <h2>{{ $t('home.appleTitle') }}</h2>
          <p>{{ $t('home.appleText') }}</p>
        </NuxtLink>

        <NuxtLink to="/plugins-demo" class="home-card">
          <span class="home-icon" aria-hidden="true">🔌</span>
          <h2>{{ $t('plugins.title') }}</h2>
          <p>{{ $t('plugins.description') }}</p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
