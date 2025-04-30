"use client"

import { useState, useRef } from "react"
import { Search, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchStore } from "@/lib/store"

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("search")
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setResults, setIsSearching, setPodcastUrl } = useSearchStore()

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!inputValue.trim()) {
      setError("Please enter a search term or URL")
      return
    }

    if (activeTab === "generate" && !isValidUrl(inputValue)) {
      setError("Please enter a valid URL for audio generation")
      return
    }

    setIsLoading(true)
    setIsSearching(true)

    try {
      if (activeTab === "search") {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const endpoint = `${backendUrl}/query?q=${encodeURIComponent(inputValue)}`
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`)
        }
        const data = await response.json()
        setResults(data.papers || data)
      } else {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const endpoint = `${backendUrl}/create_podcast?url=${encodeURIComponent(inputValue)}`
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Podcast failed: ${response.statusText}`)
        }
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        setPodcastUrl(audioUrl)
      }
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-lg overflow-hidden transition-all shadow-lg hover:shadow-zinc-700/30 focus-within:ring-1 focus-within:ring-blue-500/50">
          {/* Tabs at top */}
          <div className="flex bg-zinc-800/50 p-1.5 border-b border-zinc-700/50">
            <div 
              className={`flex-1 text-center py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all ${
                activeTab === "search" 
                  ? "bg-blue-500/20 text-blue-400" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
              }`}
              onClick={() => setActiveTab("search")}
            >
              Search Papers
            </div>
            <div 
              className={`flex-1 text-center py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all ${
                activeTab === "generate" 
                  ? "bg-blue-500/20 text-blue-400" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50"
              }`}
              onClick={() => setActiveTab("generate")}
            >
              Generate Audio
            </div>
          </div>
          
          {/* Search input area */}
          <div className="flex items-center px-4 py-3">
            <div className="p-2 bg-zinc-800/50 rounded-lg mr-3">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={activeTab === "search" ? "Search for papers or enter URL..." : "Enter paper URL..."}
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-100 placeholder:text-zinc-500 text-lg"
            />
            <Button
              type="submit"
              size="sm"
              className={`ml-2 px-4 py-2 rounded-lg transition-all ${
                isLoading 
                  ? "bg-zinc-800 text-zinc-400" 
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <div className="flex items-center">
                  <span className="mr-1">{activeTab === "search" ? "Search" : "Generate"}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 px-4">{error}</p>}
      </form>
    </div>
  )
}