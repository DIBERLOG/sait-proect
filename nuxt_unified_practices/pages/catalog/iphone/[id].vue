<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)

const productName = computed(() => {
  if (id.includes('max')) {
    return `iPhone ${id} Pro Max`
  }

  return `iPhone ${id}`
})

const { activeTab, tabs, selectTab } = useProductTabs()
const { storageOptions, selectedStorage, totalPrice } = useStorageSelector(999)
const { languages, selectedLanguage, dictionary } = useLanguage()
const { themeOptions, selectedTheme } = useSiteTheme()

const selectedColor = ref('black')

const colorOptions = [
  { label: 'Black', value: 'black', class: 'bg-black' },
  { label: 'White', value: 'white', class: 'bg-white' },
  { label: 'Blue', value: 'blue', class: 'bg-blue-500' }
]

const tabContent = computed(() => {
  const content = {
    overview: {
      title: `${productName.value} Overview`,
      text: 'The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion, fast chip and strong battery life.'
    },
    techspec: {
      title: 'Tech Specs',
      text: 'OLED display, Ceramic Shield, 5G, A15 Bionic chip, Pro camera system, LiDAR Scanner and Dolby Vision recording.'
    },
    pricing: {
      title: 'Pricing',
      text: `${selectedStorage.value.label}: ${formatPrice(totalPrice.value)}. Storage changes the final price reactively.`
    },
    software: {
      title: 'Software',
      text: 'The phone runs iOS with security updates, App Store, FaceTime, iCloud, widgets and privacy tools.'
    }
  }

  return content[activeTab.value]
})
</script>

<template>
  <div class="min-h-screen bg-white text-[#111318] transition-colors dark:bg-[#0f172a] dark:text-white">
    <div class="flex flex-1 justify-center gap-1 px-6 py-5">
      <div class="flex flex-col flex-1 max-w-[920px] layout-content-container">
        <div class="flex flex-wrap gap-2 p-4">
          <NuxtLink to="/" class="font-medium text-[#636f88] text-base leading-normal dark:text-slate-300">
            Home
          </NuxtLink>
          <span class="font-medium text-[#636f88] text-base leading-normal dark:text-slate-300">/</span>
          <NuxtLink to="/" class="font-medium text-[#636f88] text-base leading-normal dark:text-slate-300">
            iPhone
          </NuxtLink>
          <span class="font-medium text-[#636f88] text-base leading-normal dark:text-slate-300">/</span>
          <span class="font-medium text-[#111318] text-base leading-normal dark:text-white">
            {{ productName }}
          </span>
        </div>

        <div class="flex flex-wrap justify-between gap-3 p-4">
          <div class="flex flex-col gap-3 min-w-72">
            <h1 class="font-bold text-[32px] leading-tight tracking-light">
              {{ productName }}
            </h1>
            <p class="font-normal text-[#636f88] text-sm leading-normal dark:text-slate-300">
              {{ dictionary.price }}: {{ formatPrice(totalPrice) }}
            </p>
          </div>
        </div>

        <div class="pb-3">
          <div class="flex flex-wrap gap-3 px-4 border-[#dcdfe5] border-b dark:border-slate-700">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              class="flex flex-col justify-center items-center pt-4 pb-[13px] border-b-[3px] text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
              :class="activeTab === tab.key ? 'border-b-[#111318] text-[#111318] dark:border-b-white dark:text-white' : 'border-b-transparent text-[#636f88] dark:text-slate-400'"
              @click="selectTab(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="gap-3 grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] p-4">
          <div
            v-for="image in [
              'https://cdn.usegalileo.ai/stability/dc51bab8-a04d-4144-9452-346a96b8a7a3.png',
              'https://cdn.usegalileo.ai/sdxl10/dd520496-c3b7-49d7-aa2f-33ef2a37166d.png',
              'https://cdn.usegalileo.ai/stability/8ce1bf3c-d999-41ff-af8d-178b36a84898.png'
            ]"
            :key="image"
            class="flex flex-col gap-3"
          >
            <div
              class="bg-cover bg-no-repeat bg-center rounded-xl w-full aspect-square"
              :style="{ backgroundImage: `url('${image}')` }"
            />
          </div>
        </div>

        <UCard class="mx-4 my-4">
          <template #header>
            <h2 class="font-bold text-lg">
              {{ tabContent.title }}
            </h2>
          </template>

          <p class="text-base leading-normal">
            {{ tabContent.text }}
          </p>

          <div v-if="activeTab === 'techspec'" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div class="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p class="text-sm text-slate-500 dark:text-slate-400">Display</p>
              <p class="font-medium">Super Retina XDR OLED</p>
            </div>
            <div class="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p class="text-sm text-slate-500 dark:text-slate-400">Chip</p>
              <p class="font-medium">A15 Bionic</p>
            </div>
            <div class="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p class="text-sm text-slate-500 dark:text-slate-400">Camera</p>
              <p class="font-medium">Pro camera system</p>
            </div>
            <div class="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p class="text-sm text-slate-500 dark:text-slate-400">Network</p>
              <p class="font-medium">5G capable</p>
            </div>
          </div>
        </UCard>

        <div class="flex justify-start px-4 py-3">
          <UButton color="primary" size="lg">
            {{ dictionary.addToBag }}
          </UButton>
        </div>
      </div>

      <div class="flex flex-col w-[360px] layout-content-container">
        <h3 class="px-4 pt-4 pb-2 font-bold text-lg leading-tight tracking-[-0.015em]">
          {{ dictionary.selectPhone }}
        </h3>

        <div class="px-4 py-3">
          <p class="mb-2 text-sm font-bold">Color</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              type="button"
              class="size-10 rounded-full border transition-all"
              :class="[
                color.class,
                selectedColor === color.value ? 'ring-4 ring-blue-500 border-white' : 'border-[#dcdfe5]'
              ]"
              :aria-label="color.label"
              @click="selectedColor = color.value"
            />
          </div>
        </div>

        <div class="px-4 py-3">
          <p class="mb-2 text-sm font-bold">{{ dictionary.storage }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="storage in storageOptions"
              :key="storage.value"
              type="button"
              class="relative flex justify-center items-center px-4 border rounded-xl h-11 font-medium text-sm leading-normal cursor-pointer transition-colors"
              :class="selectedStorage.value === storage.value ? 'border-[#3571e9] border-[3px]' : 'border-[#dcdfe5] dark:border-slate-700'"
              @click="selectedStorage = storage"
            >
              {{ storage.label }}
            </button>
          </div>
        </div>

        <div class="px-4 py-3">
          <p class="mb-2 text-sm font-bold">{{ dictionary.language }}</p>
          <USelectMenu v-model="selectedLanguage" :items="languages" class="w-full" />
        </div>

        <div class="px-4 py-3">
          <p class="mb-2 text-sm font-bold">{{ dictionary.theme }}</p>
          <URadioGroup v-model="selectedTheme" :items="themeOptions" />
        </div>

        <UCard class="mx-4 my-4">
          <p class="font-bold">{{ dictionary.selected }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ selectedStorage.label }} / {{ selectedColor }} / {{ selectedLanguage.label }}
          </p>
          <p class="mt-2 text-xl font-bold">
            {{ formatPrice(totalPrice) }}
          </p>
        </UCard>
      </div>
    </div>
  </div>
</template>
