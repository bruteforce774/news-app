<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useNewsStore } from '../stores/news.ts'

  const newsStore = useNewsStore()

  onMounted(async () => {
    await newsStore.fetchItems('Iran')
  })
</script>

<template>
  <p v-for="item in newsStore.newsItems">
    {{ item.title }}
  </p>
</template>

<style scoped>
</style>
