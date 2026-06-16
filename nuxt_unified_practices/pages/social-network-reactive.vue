<script setup lang="ts">
type SocialView = 'profile' | 'friends' | 'feed'
type DemoPost = (typeof socialPosts)[number]
type DemoUser = (typeof socialUsers)[number]

const emptyDemoUser: DemoUser = {
  username: 'new-student',
  firstName: 'Мария',
  lastName: 'Орлова',
  phone: '+7-555-555-55-55',
  avatar: 'user4.png',
  info: 'Новый участник учебной соцсети. Профиль уже есть, а постов пока нет.'
}

const activeView = ref<SocialView>('profile')
const selectedUsername = ref('admin')
const newPostContent = ref('')
const friendSearch = ref('')
const localPosts = useState<DemoPost[]>('nuxt-social-reactive-posts', () => socialPosts.map((post) => ({ ...post, likes: post.likes ?? 0 })))

const users = computed(() => [...socialUsers, emptyDemoUser])
const currentUser = computed(() => users.value.find((user) => user.username === selectedUsername.value) || users.value[0])
const friends = computed(() => users.value.filter((user) => user.username !== 'admin'))

const filteredFriends = computed(() => {
  const query = friendSearch.value.trim().toLowerCase()

  if (!query) {
    return friends.value
  }

  return friends.value.filter((friend) => {
    return [friend.firstName, friend.lastName, friend.username, friend.info]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})

const userPosts = computed(() => {
  return localPosts.value
    .filter((post) => post.username === currentUser.value.username)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const feedPosts = computed(() => {
  return localPosts.value
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const stats = computed(() => [
  { label: 'Друзей', value: friends.value.length },
  { label: 'Постов пользователя', value: userPosts.value.length },
  { label: 'Постов в ленте', value: feedPosts.value.length }
])

function openProfile() {
  selectedUsername.value = 'admin'
  activeView.value = 'profile'
}

function openFriend(username: string) {
  selectedUsername.value = username
  activeView.value = 'profile'
}

function createPost() {
  const content = newPostContent.value.trim()

  if (!content) {
    return
  }

  localPosts.value = [
    {
      id: `local-${Date.now()}`,
      username: 'admin',
      name: 'Егор Ангелов',
      avatar: 'user0.png',
      content,
      createdAt: new Date().toISOString(),
      likes: 0
    },
    ...localPosts.value
  ]
  newPostContent.value = ''
  selectedUsername.value = 'admin'
  activeView.value = 'profile'
}

function likePost(postId: string) {
  localPosts.value = localPosts.value.map((post) => {
    if (post.id !== postId) {
      return post
    }

    return { ...post, likes: (post.likes ?? 0) + 1 }
  })
}

function formatSocialDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

useHead({ title: 'Соцсеть с реактивностью — Nuxt' })
</script>

<template>
  <section class="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
    <aside class="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-5 flex items-center gap-3">
        <img src="/social-avatars/user0.png" alt="Егор Ангелов" class="size-12 rounded-full object-cover">
        <div>
          <p class="font-black text-slate-950 dark:text-white">Егор Ангелов</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">Реактивная соцсеть</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 pb-4">
        <div v-for="item in stats" :key="item.label" class="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800">
          <p class="text-xl font-black text-blue-600 dark:text-blue-400">{{ item.value }}</p>
          <p class="text-[11px] font-semibold leading-tight text-slate-500 dark:text-slate-400">{{ item.label }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left font-bold transition"
          :class="activeView === 'profile' && selectedUsername === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'"
          @click="openProfile"
        >
          Моя страница
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left font-bold transition"
          :class="activeView === 'friends' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'"
          @click="activeView = 'friends'"
        >
          Друзья
        </button>
        <button
          type="button"
          class="rounded-xl px-4 py-3 text-left font-bold transition"
          :class="activeView === 'feed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'"
          @click="activeView = 'feed'"
        >
          Лента
        </button>
      </div>
    </aside>

    <main class="min-w-0 space-y-5">
      <div class="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
        <h1 class="text-3xl font-black text-slate-950 dark:text-white">Социальная сеть: реактивность</h1>
        <p class="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
          Отдельная страница для показа учителю: счётчики пересчитываются сами, поиск друзей работает через computed, лайки и новые посты меняют состояние без перезагрузки.
        </p>
      </div>

      <div v-if="activeView === 'profile'" class="space-y-5">
        <UCard>
          <div class="grid gap-5 md:grid-cols-[180px_1fr]">
            <img :src="getSocialAvatarPath(currentUser.avatar)" :alt="getSocialUserName(currentUser)" class="h-48 w-full rounded-xl object-cover">
            <div>
              <p class="text-sm font-bold text-blue-600 dark:text-blue-400">/user/{{ currentUser.username }}</p>
              <h2 class="mt-2 text-3xl font-black">{{ getSocialUserName(currentUser) }}</h2>
              <p class="mt-3 text-slate-600 dark:text-slate-300">{{ currentUser.info }}</p>
              <p class="mt-3 font-semibold">Телефон: {{ currentUser.phone }}</p>
            </div>
          </div>
        </UCard>

        <form v-if="currentUser.username === 'admin'" class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[1fr_auto]" @submit.prevent="createPost">
          <textarea v-model="newPostContent" class="min-h-20 rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Что у вас нового?" />
          <UButton type="submit" class="justify-center">Создать пост</UButton>
        </form>

        <div v-if="userPosts.length" class="space-y-4">
          <article v-for="post in userPosts" :key="post.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ formatSocialDate(post.createdAt) }}</p>
            <p class="mt-3 text-slate-800 dark:text-slate-100">{{ post.content }}</p>
            <button type="button" class="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200" @click="likePost(post.id)">
              Нравится: {{ post.likes ?? 0 }}
            </button>
          </article>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <p class="text-xl font-black text-slate-950 dark:text-white">У пользователя пока нет постов</p>
          <p class="mt-2 text-slate-500 dark:text-slate-400">Откройте Егора Ангелова и создайте запись через форму.</p>
        </div>
      </div>

      <div v-else-if="activeView === 'friends'" class="space-y-4">
        <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-black">Друзья</h2>
            <p class="text-slate-500 dark:text-slate-400">Всего друзей: {{ friends.length }}</p>
          </div>
          <label class="w-full md:w-80">
            <span class="mb-1 block text-sm font-bold text-slate-600 dark:text-slate-300">Найти друга</span>
            <input v-model="friendSearch" type="search" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Введите имя или username">
          </label>
        </div>

        <div v-if="filteredFriends.length" class="space-y-3">
          <button
            v-for="friend in filteredFriends"
            :key="friend.username"
            type="button"
            class="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            @click="openFriend(friend.username)"
          >
            <img :src="getSocialAvatarPath(friend.avatar)" :alt="getSocialUserName(friend)" class="size-20 rounded-full object-cover">
            <div>
              <p class="text-xl font-black">{{ getSocialUserName(friend) }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Открыть /user/{{ friend.username }}</p>
            </div>
          </button>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <p class="text-xl font-black text-slate-950 dark:text-white">Друзья не найдены</p>
          <p class="mt-2 text-slate-500 dark:text-slate-400">Измените текст в поле поиска.</p>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div>
          <h2 class="text-3xl font-black">Лента</h2>
          <p class="text-slate-500 dark:text-slate-400">Постов в ленте: {{ feedPosts.length }}</p>
        </div>

        <article v-for="post in feedPosts" :key="post.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center gap-3">
            <img :src="getSocialAvatarPath(post.avatar)" :alt="post.name" class="size-12 rounded-full object-cover">
            <div>
              <p class="font-black">{{ post.name }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ formatSocialDate(post.createdAt) }}</p>
            </div>
          </div>
          <p class="mt-4 text-slate-800 dark:text-slate-100">{{ post.content }}</p>
          <button type="button" class="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200" @click="likePost(post.id)">
            Нравится: {{ post.likes ?? 0 }}
          </button>
        </article>
      </div>
    </main>
  </section>
</template>
