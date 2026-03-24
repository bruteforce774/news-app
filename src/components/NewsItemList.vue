<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useNewsStore } from '../stores/news.ts'

  const newsStore = useNewsStore()

  onMounted(async () => {
    await newsStore.fetchItems('Iran')
  })

  const newsItems = newsStore.newsItems
</script>

<template>
  <p v-for="item in newsItems">
    {{ item.title }}
  </p>
</template>

<style scoped>
</style>
