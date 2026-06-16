<script setup>
useSeoMeta({
  title: 'MSHP_MUSIK — музыка',
  description: 'Музыкальная страница Nuxt-проекта: Daily Mix и New Releases',
  ogTitle: 'MSHP_MUSIK',
  ogDescription: 'Relax with your favorite songs'
})
</script>

<template>
  <main class="music-page">
    <div class="page">
      <section class="top">
        <NuxtImg
          src="/guitarist.png"
          alt="Обложка Гитариста"
          class="top-image"
        />

        <div class="top-text">
          <p>
            <span class="top-text-h">{{ $t('music.goodEvening') }}</span>
            <br />
            {{ $t('music.relax') }}
          </p>

          <button class="btn btn-primary">
            {{ $t('music.play') }}
          </button>
        </div>
      </section>

      <section class="daily">
        <h2 class="section-title">
          {{ $t('music.dailyMix') }}
        </h2>

        <div class="cards-row">
          <MusicCard image="/daily_1.png" title="Daily Mix 1" />
          <MusicCard image="/daily_2.png" title="Daily Mix 2" />
          <MusicCard image="/daily_3.png" title="Daily Mix 3" />
          <MusicCard image="/daily_4.png" title="Daily Mix 4" />
        </div>
      </section>

      <section class="releases">
        <h2 class="section-title">
          {{ $t('music.newReleases') }}
        </h2>

        <div class="cards-row">
          <MusicCard image="/release_1.png" title="New Release 1" />
          <MusicCard image="/release_2.png" title="New Release 2" />
          <MusicCard image="/release_3.png" title="New Release 3" />
          <MusicCard image="/release_4.png" title="New Release 4" />
        </div>
      </section>
    </div>
  </main>
</template>
