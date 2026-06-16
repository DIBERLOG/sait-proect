<script setup lang="ts">
type RandomUser = {
  name: { first: string; last: string }
  email: string
  phone: string
  picture: { thumbnail: string; large: string }
  location: { country: string; city: string }
}

const { data, pending, refresh } = await useFetch<{ results: RandomUser[] }>('https://randomuser.me/api/?results=12', {
  default: () => ({ results: [] })
})

const users = computed(() => data.value.results.map((user) => ({
  avatar: user.picture.thumbnail,
  name: `${user.name.first} ${user.name.last}`,
  email: user.email,
  phone: user.phone,
  city: `${user.location.city}, ${user.location.country}`
})))

const columns = [
  { accessorKey: 'name', header: 'Имя' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Телефон' },
  { accessorKey: 'city', header: 'Город' }
]
</script>

<template>
  <div class="min-h-screen bg-[#f6f7f9] px-6 py-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold">Админ-панель блогеров</h1>
          <p class="text-[#637588]">Пользователи сгенерированы через randomuser.me</p>
        </div>
        <div class="flex gap-2">
          <UButton to="/" variant="soft" color="neutral">На сайт</UButton>
          <UButton :loading="pending" @click="refresh()">Сгенерировать заново</UButton>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UCard v-for="user in users.slice(0, 3)" :key="user.email">
          <div class="flex items-center gap-3">
            <UAvatar :src="user.avatar" />
            <div>
              <p class="font-bold">{{ user.name }}</p>
              <p class="text-sm text-[#637588]">{{ user.email }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Таблица пользователей</h2>
        </template>
        <UTable :data="users" :columns="columns" />
      </UCard>
    </div>
  </div>
</template>
