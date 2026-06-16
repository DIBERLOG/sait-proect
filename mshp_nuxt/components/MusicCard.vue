<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="music-card">
    <NuxtImg
      :src="image"
      :alt="title"
      class="music-card-image"
    />

    <p class="music-card-title">
      {{ title }}
    </p>
  </div>
</template>
