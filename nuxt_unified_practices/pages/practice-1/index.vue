<script setup lang="ts">
type Blogger = {
  id: string
  name?: string
  username?: string
  message?: string
  avatar_url?: string
  followers?: number
  posts?: unknown[]
}

type Joke = {
  setup: string
  punchline: string
}

type SidebarView = 'home' | 'trends' | 'subscriptions'

const usersApi = 'https://670cdcf87e5a228ec1d1adcf.mockapi.io/users'
const jokeApi = 'https://official-joke-api.appspot.com/random_joke'

const fallbackAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBT_h9-lRwaWR4TlaMawZNr_WvNm1XqnxRmQ&s'
const coverImage = 'https://informatics.ru/img/SHPlogo-1200x630.png'
const postImage = 'https://cdn.usegalileo.ai/stability/2beee341-a9e5-4499-8314-484844361b69.png'

const { data: users, pending: usersPending, refresh: refreshUsers } = await useFetch<Blogger[]>(usersApi, {
  default: () => []
})

const { data: joke, pending: jokePending, refresh: refreshJoke } = await useFetch<Joke>(jokeApi)

const mainBlogger = computed(() => {
  return users.value?.find((user) => user.name === 'Наська Левушкина') || users.value?.[0]
})

const visiblePosts = computed(() => {
  return users.value?.filter((user) => user.message).slice(-6).reverse() || []
})

const form = reactive({
  name: '',
  message: '',
  avatar_url: fallbackAvatar
})

const activeSidebarView = ref<SidebarView>('home')
const isSending = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const sidebarItems: { key: SidebarView; icon: string; label: string }[] = [
  { key: 'home', icon: '🏠', label: 'Главная' },
  { key: 'trends', icon: '🔥', label: 'Тренды' },
  { key: 'subscriptions', icon: '▶️', label: 'Подписки' }
]

const trendingPosts = computed(() => {
  return visiblePosts.value
    .map((post, index) => ({
      ...post,
      rating: visiblePosts.value.length - index + 10
    }))
    .slice(0, 4)
})

const subscriptions = computed(() => {
  return users.value?.filter((user) => user.name || user.username).slice(0, 5) || []
})

function selectSidebarView(view: SidebarView) {
  activeSidebarView.value = view
}

async function createUser() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.name.trim() || !form.message.trim()) {
    errorMessage.value = 'Заполни имя и описание/пост'
    return
  }

  isSending.value = true

  try {
    await $fetch(usersApi, {
      method: 'POST',
      body: {
        name: form.name,
        message: form.message,
        avatar_url: form.avatar_url || fallbackAvatar,
        createdAt: Math.floor(Date.now() / 1000)
      }
    })

    form.name = ''
    form.message = ''
    form.avatar_url = fallbackAvatar
    successMessage.value = 'Пользователь создан и отправлен в API'
    await refreshUsers()
  } catch (error) {
    errorMessage.value = 'Ошибка отправки данных в API'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div
    class="group/design-root relative flex min-h-screen size-full flex-col overflow-x-hidden bg-white"
    style="font-family: Newsreader, 'Noto Sans', sans-serif"
  >
    <div class="flex h-full flex-col layout-container grow">
      <div class="flex flex-1 justify-center gap-1 px-6 py-5">
        <aside class="hidden w-80 flex-col layout-content-container md:flex">
          <div class="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
            <div class="flex flex-col gap-2">
              <button
                v-for="item in sidebarItems"
                :key="item.key"
                type="button"
                class="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#f0f2f4] dark:hover:bg-white/10"
                :class="activeSidebarView === item.key ? 'bg-[#f0f2f4] dark:bg-white/10' : ''"
                @click="selectSidebarView(item.key)"
              >
                <span class="text-2xl">{{ item.icon }}</span>
                <span class="text-sm font-medium text-[#111418] dark:text-white">{{ item.label }}</span>
              </button>
              <NuxtLink to="/admin" class="flex items-center gap-3 px-3 py-2">
                <span class="text-2xl">🛠️</span>
                <p class="text-sm font-medium text-[#111418] dark:text-white">Админ-панель</p>
              </NuxtLink>
            </div>
          </div>
        </aside>

        <section class="flex max-w-[960px] flex-1 flex-col layout-content-container">
          <div class="@container">
            <div class="@[480px]:px-4 @[480px]:py-3">
              <div
                class="flex min-h-[218px] w-full flex-col justify-end overflow-hidden bg-white bg-cover bg-center bg-no-repeat @[480px]:rounded-xl"
                :style="{ backgroundImage: `url('${coverImage}')` }"
              />
            </div>
          </div>

          <div class="@container flex p-4">
            <div v-if="usersPending" class="w-full text-center text-[#637588]">Загрузка блогера...</div>

            <div v-else class="flex w-full flex-col items-center gap-4">
              <div class="flex flex-col items-center gap-4">
                <UAvatar :src="fallbackAvatar" size="3xl" />
                <div class="flex flex-col items-center justify-center">
                  <p class="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#111418]">
                    {{ mainBlogger?.name || 'Блогер' }}
                  </p>
                  <p class="text-center text-base font-normal leading-normal text-[#637588]">
                    {{ mainBlogger?.message || mainBlogger?.username || '@blogger' }}
                  </p>
                </div>
              </div>

              <div class="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
                <UButton color="neutral" variant="soft" class="flex-1 justify-center">Подписаться</UButton>
                <UButton color="primary" class="flex-1 justify-center">Написать</UButton>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-3">
            <UCard>
              <p class="text-center text-2xl font-bold text-[#111418]">{{ visiblePosts.length }}</p>
              <p class="text-center text-sm text-[#637588]">Публикации</p>
            </UCard>
            <UCard>
              <p class="text-center text-2xl font-bold text-[#111418]">{{ mainBlogger?.followers || '999+' }}</p>
              <p class="text-center text-sm text-[#637588]">Подписчиков</p>
            </UCard>
            <UCard>
              <p class="text-center text-2xl font-bold text-[#111418]">1.8K</p>
              <p class="text-center text-sm text-[#637588]">Подписок</p>
            </UCard>
          </div>

          <div class="pb-3">
            <div class="flex gap-8 border-b border-[#dce0e5] px-4">
              <a class="flex flex-col items-center justify-center border-b-[3px] border-b-[#111418] pt-4 pb-[13px] text-[#111418]" href="#">
                <p class="text-sm font-bold leading-normal tracking-[0.015em] text-[#111418]">Посты</p>
              </a>
              <a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pt-4 pb-[13px] text-[#637588]" href="#create-user">
                <p class="text-sm font-bold leading-normal tracking-[0.015em] text-[#637588]">Создать пользователя</p>
              </a>
            </div>
          </div>

          <section class="px-4 py-3">
            <UCard>
              <template #header>
                <div class="flex items-center justify-between gap-3">
                  <h2 class="text-lg font-bold">Случайная шутка</h2>
                  <UButton :loading="jokePending" size="sm" variant="soft" @click="refreshJoke()">Обновить</UButton>
                </div>
              </template>
              <p class="font-medium">{{ joke?.setup || 'Загрузка...' }}</p>
              <p class="mt-2 text-[#637588]">{{ joke?.punchline }}</p>
            </UCard>
          </section>

          <section v-if="activeSidebarView === 'trends'" class="px-4 py-3">
            <UCard>
              <template #header>
                <h2 class="text-xl font-bold">Тренды</h2>
              </template>

              <div class="grid gap-3">
                <article v-for="post in trendingPosts" :key="post.id" class="rounded-xl border border-slate-200 p-4 dark:border-white/20">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="font-bold text-[#111418] dark:text-white">{{ post.name }}</h3>
                    <span class="rounded-full bg-black px-3 py-1 text-sm font-black text-white dark:bg-white dark:text-black">
                      🔥 {{ post.rating }}
                    </span>
                  </div>
                  <p class="mt-2 text-sm text-[#637588] dark:text-white/70">{{ post.message }}</p>
                </article>
              </div>
            </UCard>
          </section>

          <section v-else-if="activeSidebarView === 'subscriptions'" class="px-4 py-3">
            <UCard>
              <template #header>
                <h2 class="text-xl font-bold">Подписки</h2>
              </template>

              <div class="grid gap-3">
                <article v-for="user in subscriptions" :key="user.id" class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 dark:border-white/20">
                  <div>
                    <h3 class="font-bold text-[#111418] dark:text-white">{{ user.name || user.username }}</h3>
                    <p class="text-sm text-[#637588] dark:text-white/70">{{ user.message || 'Блогер из MockAPI' }}</p>
                  </div>
                  <UButton color="neutral" variant="soft">Открыть</UButton>
                </article>
              </div>
            </UCard>
          </section>

          <section v-else id="posts" class="flex flex-col gap-3 px-4 py-3">
            <article
              v-for="post in visiblePosts"
              :key="post.id"
              class="flex items-stretch justify-between gap-4 rounded-xl p-4"
            >
              <div class="flex flex-[2_2_0px] flex-col gap-4">
                <div class="flex flex-col gap-1">
                  <p class="text-base font-bold leading-tight text-[#111418]">{{ post.name }}</p>
                  <p class="text-sm font-normal leading-normal text-[#637588]">{{ post.message }}</p>
                </div>
                <UButton color="neutral" variant="soft" class="w-fit">Read more</UButton>
              </div>
              <div
                class="hidden w-full flex-1 rounded-xl bg-cover bg-center bg-no-repeat aspect-video sm:block"
                :style="{ backgroundImage: `url('${postImage}')` }"
              />
            </article>
          </section>

          <section id="create-user" class="px-4 py-6">
            <UCard>
              <template #header>
                <h2 class="text-xl font-bold">Создать нового пользователя</h2>
              </template>

              <form class="flex flex-col gap-4" @submit.prevent="createUser">
                <UInput v-model="form.name" placeholder="Имя блогера" />
                <UInput v-model="form.avatar_url" placeholder="Ссылка на аватар" />
                <UTextarea v-model="form.message" placeholder="Описание или текст поста" />
                <UButton type="submit" :loading="isSending" class="w-fit">Отправить в API</UButton>
              </form>

              <UAlert v-if="successMessage" class="mt-4" color="success" :title="successMessage" />
              <UAlert v-if="errorMessage" class="mt-4" color="error" :title="errorMessage" />
            </UCard>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>
