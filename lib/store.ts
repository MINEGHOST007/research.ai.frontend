import { create } from "zustand"

type SearchStore = {
  results: any[]
  isSearching: boolean
  podcastUrl: string | null
  setResults: (results: any[]) => void
  setIsSearching: (isSearching: boolean) => void
  setPodcastUrl: (url: string | null) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  results: [],
  isSearching: false,
  podcastUrl: null,
  setResults: (results) => set({ results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setPodcastUrl: (podcastUrl) => set({ podcastUrl }),
}))
