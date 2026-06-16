<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()
const { $formatPrice, $notify } = useNuxtApp()

const demoPrice = computed(() => $formatPrice(99990))

function showNotify() {
  $notify(t('plugins.notifyMessage'))
}

useSeoMeta({
  title: 'Плагины и модули Nuxt',
  description: 'Демонстрация i18n, Nuxt Image, Color Mode и пользовательских плагинов',
  ogTitle: 'Плагины и модули Nuxt',
  ogDescription: 'Учебная страница по плагинам и модулям Nuxt'
})
</script>

<template>
  <main class="plugins-page">
    <section class="plugins-card">
      <h1>{{ $t('plugins.title') }}</h1>

      <p>
        {{ $t('plugins.description') }}
      </p>

      <div class="plugin-info">
        <h2>i18n</h2>
        <p>{{ $t('music.goodEvening') }}</p>
      </div>

      <div class="plugin-info">
        <h2>Color Mode</h2>
        <p>{{ $t('plugins.currentTheme') }}: {{ colorMode.value }}</p>
      </div>

      <div class="plugin-info">
        <h2>Format Plugin</h2>
        <p>{{ $t('plugins.price') }}: {{ demoPrice }}</p>
      </div>

      <div class="plugin-info">
        <h2>Notify Plugin</h2>
        <button class="shop-button" type="button" @click="showNotify">
          {{ $t('plugins.notify') }}
        </button>
      </div>

      <div class="plugin-info">
        <h2>Nuxt Image</h2>
        <NuxtImg
          src="/iphone-main.png"
          alt="iPhone через NuxtImg"
          width="240"
        />
      </div>
    </section>
  </main>
</template>
