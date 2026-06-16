<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)

const productName = computed(() => getIphoneProductName(id))

const { activeTab, tabs, selectTab } = useProductTabs()
const { storageOptions, selectedStorage, totalPrice } = useStorageSelector(999)
const { languages, selectedLanguage, dictionary } = useLanguage()
const { themeOptions, selectedTheme } = useSiteTheme()

const selectedColor = ref('midnight')

const colorOptions = [
  { label: 'Midnight', value: 'midnight', class: 'bg-slate-950' },
  { label: 'Silver', value: 'silver', class: 'bg-slate-100' },
  { label: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { label: 'Green', value: 'green', class: 'bg-emerald-400' }
]

const currentPrice = computed(() => formatPrice(totalPrice.value))
const languageCode = computed(() => selectedLanguage.value.value)
const selectedSummary = computed(() => getStorageSummary(selectedStorage.value.label, currentPrice.value))

const tabContent = computed(() => getProductTabContent(activeTab.value, {
  productName: productName.value,
  storageLabel: selectedStorage.value.label,
  price: currentPrice.value,
  language: languageCode.value
}))

const tabStats = computed(() => [
  { label: dictionary.value.storage, value: selectedStorage.value.label },
  { label: dictionary.value.price, value: currentPrice.value },
  { label: dictionary.value.language, value: selectedLanguage.value.label },
  { label: dictionary.value.theme, value: selectedTheme.value }
])

useHead({ title: `${productName.value} — реактивная страница` })
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
    <section class="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1fr_380px]">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="flex min-h-[420px] items-center justify-center rounded-xl bg-slate-100 p-8 dark:bg-slate-800">
            <img src="/blure.png" :alt="productName" class="max-h-[360px] object-contain drop-shadow-2xl">
          </div>

          <div class="flex flex-col justify-between gap-6">
            <div>
              <div class="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <NuxtLink to="/">Home</NuxtLink>
                <span>/</span>
                <span>Reactive iPhone</span>
              </div>

              <h1 class="text-4xl font-black leading-tight md:text-5xl">
                {{ productName }}
              </h1>
              <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {{ tabContent.lead }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div v-for="stat in tabStats" :key="stat.label" class="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
                <p class="mt-1 text-sm font-black">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-y border-slate-200 px-4 dark:border-slate-800">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              class="border-b-4 px-4 py-4 text-sm font-black transition-colors"
              :class="activeTab === tab.key ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300' : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
              @click="selectTab(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="p-6">
          <h2 class="text-2xl font-black">{{ tabContent.title }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">{{ tabContent.lead }}</p>

          <div class="mt-5 grid gap-3 md:grid-cols-3">
            <div v-for="point in tabContent.points" :key="point" class="rounded-xl bg-slate-100 p-4 text-sm font-semibold dark:bg-slate-800">
              {{ point }}
            </div>
          </div>
        </div>
      </div>

      <aside class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-xl font-black">{{ dictionary.selectPhone }}</h3>

        <div class="mt-5">
          <p class="mb-2 text-sm font-bold">Color</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              type="button"
              class="size-10 rounded-full border transition"
              :class="[color.class, selectedColor === color.value ? 'ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : 'border-slate-300']"
              :aria-label="color.label"
              @click="selectedColor = color.value"
            />
          </div>
        </div>

        <div class="mt-5">
          <p class="mb-2 text-sm font-bold">{{ dictionary.storage }}</p>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="storage in storageOptions"
              :key="storage.value"
              type="button"
              class="rounded-xl border px-4 py-3 text-left transition"
              :class="selectedStorage.value === storage.value ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200' : 'border-slate-200 dark:border-slate-700'"
              @click="selectedStorage = storage"
            >
              <span class="block text-sm font-black">{{ formatStorageSize(storage.value) }}</span>
              <span class="text-xs text-slate-500 dark:text-slate-400">+{{ formatPrice(storage.priceAdd) }}</span>
            </button>
          </div>
        </div>

        <div class="mt-5">
          <p class="mb-2 text-sm font-bold">{{ dictionary.language }}</p>
          <USelectMenu v-model="selectedLanguage" :items="languages" class="w-full" />
        </div>

        <div class="mt-5">
          <p class="mb-2 text-sm font-bold">{{ dictionary.theme }}</p>
          <URadioGroup v-model="selectedTheme" :items="themeOptions" />
        </div>

        <UCard class="mt-6">
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400">{{ dictionary.selected }}</p>
          <p class="mt-1 font-black">{{ selectedSummary }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ selectedColor }} / {{ selectedLanguage.label }}
          </p>
        </UCard>

        <UButton class="mt-5 w-full justify-center" size="lg">
          {{ dictionary.addToBag }}
        </UButton>
      </aside>
    </section>
  </div>
</template>
