import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type NewsItem } from '../types'

const API_KEY = import.meta.env.VITE_WORLD_NEWS_API_KEY as string
const BASE_URL = 'https://api.worldnewsapi.com/search-news'

export const useNewsStore = defineStore('news', () => {
  const newsItems = ref<NewsItem[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const itemCount = computed(() => newsItems.value.length)

  async function fetchItems(query: string, language = 'en', number = 10) {
    isLoading.value = true
    errorMessage.value = null
    try {
      const params = new URLSearchParams({
        text: query,
        language,
        number: String(number),
        'api-key': API_KEY,
      })
      const response = await fetch(`${BASE_URL}?${params}`)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const data = await response.json() as { news: NewsItem[] }
      newsItems.value = data.news
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { newsItems, itemCount, isLoading, errorMessage, fetchItems }
})
