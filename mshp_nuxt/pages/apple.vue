<script setup>
useSeoMeta({
  title: 'Apple Shop — каталог',
  description: 'Каталог iPhone в учебном Nuxt-проекте',
  ogTitle: 'Apple Shop',
  ogDescription: 'Выбери свой iPhone и открой страницу товара'
})
</script>

<template>
  <main class="shop-page">
    <section class="shop-hero">
      <div>
        <p class="shop-label">Apple Shop</p>

        <h1>{{ $t('shop.title') }}</h1>

        <p class="shop-description">
          {{ $t('shop.description') }}
        </p>

        <NuxtLink to="/iphone/16" class="shop-button">
          {{ $t('shop.button') }}
        </NuxtLink>
      </div>

      <NuxtImg
        src="/iphone-main.png"
        alt="iPhone"
        class="shop-hero-image"
      />
    </section>

    <section class="shop-products">
      <h2>{{ $t('shop.catalog') }}</h2>

      <div class="shop-grid">
        <NuxtLink to="/iphone/16" class="shop-card">
          <NuxtImg src="/iphone-16.png" alt="iPhone 16" />
          <h3>iPhone 16 Pro</h3>
          <p>{{ $t('shop.productId') }}: 16</p>
        </NuxtLink>

        <NuxtLink to="/iphone/15" class="shop-card">
          <NuxtImg src="/iphone-main.png" alt="iPhone 15" />
          <h3>iPhone 15 Pro</h3>
          <p>{{ $t('shop.productId') }}: 15</p>
        </NuxtLink>

        <NuxtLink to="/iphone/13" class="shop-card">
          <NuxtImg src="/iphone-main.png" alt="iPhone 13" />
          <h3>iPhone 13 Pro</h3>
          <p>{{ $t('shop.productId') }}: 13</p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
