<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <h1 class="text-3xl font-black">/recommendations — кеш 3600 секунд</h1>
    <p class="mt-3 text-slate-600 dark:text-slate-300">
      Рекомендации обновляются раз в час, поэтому в routeRules стоит <code>swr: 3600</code>.
    </p>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <UCard v-for="friend in friends" :key="friend.name">
        <div class="flex items-center gap-3">
          <UAvatar :src="friend.avatar" size="lg" />
          <div>
            <p class="font-bold">{{ friend.name }}</p>
            <p class="text-sm text-slate-500">{{ friend.role }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Recommendations — SWR 3600' })

const friends = [
  { name: 'Настя', role: 'Блогер', avatar: 'https://i.pravatar.cc/120?img=5' },
  { name: 'Аркадий', role: 'Разработчик', avatar: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Егор', role: 'Администратор', avatar: 'https://i.pravatar.cc/120?img=15' }
]
</script>
