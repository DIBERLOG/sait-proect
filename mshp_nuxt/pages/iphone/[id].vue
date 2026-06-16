<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { $getIphoneName, $getIphonePrice, $formatPrice, $notify } = useNuxtApp()

const id = computed(() => String(route.params.id))

const productTitle = computed(() => $getIphoneName(id.value))
const rawPrice = computed(() => $getIphonePrice(id.value))
const productPrice = computed(() => $formatPrice(rawPrice.value))
const isKnownProduct = computed(() => rawPrice.value > 0)

const productShortName = computed(() => {
  if (id.value === '16') {
    return 'iPhone 16'
  }

  if (id.value === '15') {
    return 'iPhone 15'
  }

  if (id.value === '13') {
    return 'iPhone 13'
  }

  return 'iPhone'
})

const productDescription = computed(() => {
  if (id.value === '16') {
    return 'Новый iPhone 16 Pro с мощным процессором, улучшенной камерой и современным дизайном.'
  }

  if (id.value === '15') {
    return 'iPhone 15 Pro — мощная модель прошлого поколения с отличной камерой и производительностью.'
  }

  if (id.value === '13') {
    return 'iPhone 13 Pro — более доступный вариант, который всё ещё хорошо подходит для повседневных задач.'
  }

  return 'Товар с таким ID не найден.'
})

const productBadge = computed(() => {
  if (id.value === '16') {
    return `${t('shop.novelty')} 🔥`
  }

  if (id.value === '15') {
    return t('shop.goodChoice')
  }

  if (id.value === '13') {
    return t('shop.budget')
  }

  return t('shop.notFound')
})

const gallery = [
  '/iphone-gallery-1.png',
  '/iphone-gallery-2.png',
  '/iphone-gallery-3.png',
  '/iphone-gallery-4.png',
  '/iphone-gallery-5.png',
  '/iphone-gallery-6.png'
]

const storageOptions = ['128GB', '256GB', '512GB', '1TB']

function buyProduct() {
  $notify(`${productTitle.value} ${t('shop.added')}`)
}

useSeoMeta({
  title: () => `${productTitle.value} — Apple Shop`,
  description: () => productDescription.value,
  ogTitle: () => `${productTitle.value} — Apple Shop`,
  ogDescription: () => productDescription.value
})
</script>

<template>
  <main class="iphone-page">
    <section class="iphone-layout">
      <div class="iphone-main">
        <nav class="breadcrumbs" aria-label="Навигационная цепочка">
          <NuxtLink to="/">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/apple">iPhone</NuxtLink>
          <span>/</span>
          <span>{{ productTitle }}</span>
        </nav>

        <div class="iphone-title-row">
          <div>
            <h1>{{ productTitle }}</h1>
            <p>{{ productPrice }}</p>
          </div>
        </div>

        <div class="iphone-tabs" aria-label="Разделы товара">
          <a class="active" href="#overview">Overview</a>
          <a href="#specs">Tech Specs</a>
          <a href="#pricing">Pricing</a>
          <a href="#software">Software</a>
        </div>

        <div id="overview" class="iphone-gallery">
          <NuxtImg
            v-for="image in gallery"
            :key="image"
            :src="image"
            :alt="productTitle"
          />
        </div>

        <section class="iphone-copy">
          <h2>{{ productShortName }} Pro</h2>
          <p>{{ productDescription }}</p>
        </section>

        <section id="specs" class="tech-specs">
          <h2>Tech Specs</h2>

          <div class="tech-grid">
            <div>
              <p>Super Retina XDR display</p>
              <span>6.1-inch all-screen OLED display</span>
            </div>

            <div>
              <p>Ceramic Shield</p>
              <span>4x better drop performance</span>
            </div>

            <div>
              <p>5G capable</p>
              <span>Superfast downloads and high-quality streaming</span>
            </div>

            <div>
              <p>A-series chip</p>
              <span>Fast CPU and GPU for everyday tasks</span>
            </div>
          </div>
        </section>

        <button
          class="add-bag-button"
          type="button"
          :disabled="!isKnownProduct"
          @click="buyProduct"
        >
          {{ $t('shop.buy') }}
        </button>
      </div>

      <aside class="iphone-sidebar">
        <NuxtLink to="/apple" class="back-link">
          ← {{ $t('shop.back') }}
        </NuxtLink>

        <h2>{{ $t('shop.select') }} {{ productShortName }} Pro</h2>

        <div class="color-options" aria-label="Цвет">
          <label class="color-option black">
            <input type="radio" name="iphone-color" checked />
            <span></span>
          </label>

          <label class="color-option white">
            <input type="radio" name="iphone-color" />
            <span></span>
          </label>
        </div>

        <div class="storage-options" aria-label="Память">
          <label
            v-for="storage in storageOptions"
            :key="storage"
            class="storage-option"
          >
            {{ storage }}
            <input
              type="radio"
              name="iphone-storage"
              :checked="storage === '128GB'"
            />
          </label>
        </div>

        <div :class="['iphone-badge', { error: !isKnownProduct }]">
          {{ productBadge }}
        </div>

        <div class="finance-card">
          <NuxtImg src="/iphone-main.png" alt="Apple Card" />

          <div>
            <h3>{{ $t('shop.payMonthly') }}</h3>
            <p>From {{ $formatPrice(2500) }}/mo or {{ productPrice }} with trade-in</p>
          </div>
        </div>

        <p class="finance-note">{{ $t('shop.payUpfront') }}: {{ productPrice }}</p>
        <a href="#pricing">{{ $t('shop.buyDirect') }}</a>
        <a href="#software">{{ $t('shop.learnFinance') }}</a>

        <div class="iphone-links">
          <NuxtLink to="/iphone/16">iPhone 16</NuxtLink>
          <NuxtLink to="/iphone/15">iPhone 15</NuxtLink>
          <NuxtLink to="/iphone/13">iPhone 13</NuxtLink>
        </div>
      </aside>
    </section>
  </main>
</template>
