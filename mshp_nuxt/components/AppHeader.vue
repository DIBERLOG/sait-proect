<script setup lang="ts">
const { locales, setLocale, locale } = useI18n()
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="header-logo" aria-label="MSHP_PORTAL home">
      <span class="logo-mark" aria-hidden="true"></span>
      MSHP_PORTAL
    </NuxtLink>

    <nav class="header-nav" aria-label="Основная навигация">
      <NuxtLink to="/" class="header-link">
        {{ $t('nav.home') }}
      </NuxtLink>

      <NuxtLink to="/music" class="header-link">
        <span aria-hidden="true">🎧</span>
        {{ $t('nav.music') }}
      </NuxtLink>

      <NuxtLink to="/apple" class="header-link">
        <span aria-hidden="true">🍎</span>
        {{ $t('nav.apple') }}
      </NuxtLink>

      <NuxtLink to="/plugins-demo" class="header-link">
        <span aria-hidden="true">🔌</span>
        {{ $t('nav.plugins') }}
      </NuxtLink>
    </nav>

    <div class="language-switcher">
      <button
        v-for="item in locales"
        :key="item.code"
        :class="['lang-button', { active: item.code === locale }]"
        type="button"
        @click="setLocale(item.code)"
      >
        {{ item.name }}
      </button>
    </div>

    <button class="theme-button" type="button" @click="toggleTheme">
      {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
    </button>

    <NuxtImg
      src="/avatar.png"
      alt="Аватар пользователя"
      class="header-avatar"
    />
  </header>
</template>
