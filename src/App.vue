<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useNewsStore } from './stores/news.ts'

  const newsStore = useNewsStore()

  onMounted(async () => {
    await newsStore.fetchItems('Iran')
    console.log(newsStore.newsItems)
  })
</script>

<template>
</template>

<style scoped></style>
