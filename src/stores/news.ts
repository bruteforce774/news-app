import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type NewsItem } from '../types'

export const useNewsStore = defineStore('news', () => {
  const newsItems = ref<NewsItem[]>([])

  const itemCount = computed(() => newsItems.length)

  async function fetchItems() {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await fetch('/api/items')
      if(!response.ok) throw new Error('Failed to load')
      newsItems.value = await response.json()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message: 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { newsItems, itemCount, isLoading, errorMessage }
})
