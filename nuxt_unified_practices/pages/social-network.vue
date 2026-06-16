<script setup lang="ts">
type SocialView = 'profile' | 'friends' | 'feed'

const activeView = ref<SocialView>('profile')
const selectedUsername = ref('admin')
const newPostContent = ref('')
const localPosts = useState('nuxt-social-posts', () => [...socialPosts])

const currentUser = computed(() => {
  return socialUsers.find((user) => user.username === selectedUsername.value) || socialUsers[0]
})

const friends = computed(() => socialUsers.filter((user) => user.username !== 'admin'))

const userPosts = computed(() => {
  return localPosts.value
    .filter((post) => post.username === currentUser.value.username)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const feedPosts = computed(() => {
  return localPosts.value
    .filter((post) => post.username !== 'admin')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)
})

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

function formatSocialDate(date: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

useHead({ title: 'Социальная сеть — единый Nuxt-проект' })
</script>

<template>
  <section class="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
    <aside class="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-5 flex items-center gap-3">
        <img src="/social-avatars/user0.png" alt="Егор Ангелов" class="size-12 rounded-full object-cover">
        <div>
          <p class="font-black text-slate-950 dark:text-white">Егор Ангелов</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">Социальная сеть</p>
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
          Новости
        </button>
      </div>
    </aside>

    <main>
      <div v-if="activeView === 'profile'" class="space-y-5">
        <UCard>
          <div class="grid gap-5 md:grid-cols-[180px_1fr]">
            <img :src="getSocialAvatarPath(currentUser.avatar)" :alt="getSocialUserName(currentUser)" class="h-48 w-full rounded-xl object-cover">
            <div>
              <p class="text-sm font-bold text-blue-600 dark:text-blue-400">/user/{{ currentUser.username }}</p>
              <h1 class="mt-2 text-3xl font-black">{{ getSocialUserName(currentUser) }}</h1>
              <p class="mt-3 text-slate-600 dark:text-slate-300">{{ currentUser.info }}</p>
              <p class="mt-3 font-semibold">Телефон: {{ currentUser.phone }}</p>
            </div>
          </div>
        </UCard>

        <form v-if="currentUser.username === 'admin'" class="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createPost">
          <textarea v-model="newPostContent" class="min-h-20 flex-1 rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Что у вас нового?" />
          <UButton type="submit">Отправить</UButton>
        </form>

        <article v-for="post in userPosts" :key="post.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ formatSocialDate(post.createdAt) }}</p>
          <p class="mt-3 text-slate-800 dark:text-slate-100">{{ post.content }}</p>
        </article>
      </div>

      <div v-else-if="activeView === 'friends'" class="space-y-4">
        <h1 class="text-3xl font-black">Друзья</h1>
        <button
          v-for="friend in friends"
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

      <div v-else class="space-y-4">
        <h1 class="text-3xl font-black">Новости</h1>
        <article v-for="post in feedPosts" :key="post.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center gap-3">
            <img :src="getSocialAvatarPath(post.avatar)" :alt="post.name" class="size-12 rounded-full object-cover">
            <div>
              <p class="font-black">{{ post.name }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ formatSocialDate(post.createdAt) }}</p>
            </div>
          </div>
          <p class="mt-4 text-slate-800 dark:text-slate-100">{{ post.content }}</p>
        </article>
      </div>
    </main>
  </section>
</template>
