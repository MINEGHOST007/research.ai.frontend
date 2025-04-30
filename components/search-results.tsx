"use client"

import { useState } from "react"
import { Copy, Check, Loader2, FileAudio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import AudioPlayer from "./audio-player"

type Paper = {
  title: string
  authors: string[]
  year: number
  abstract: string
  url: string
  source: string
  categories: string[]
  id: string
}

export default function SearchResults() {
  const { results, isSearching, podcastUrl } = useSearchStore()
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [generatingAudio, setGeneratingAudio] = useState<string | null>(null)
  const { toast } = useToast()

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)

    toast({
      title: "URL copied",
      description: "You can now paste it in the Generate Audio tab",
    })
  }

  const generateAudio = async (url: string) => {
    setGeneratingAudio(url)

    try {
      const response = await fetch(`/create_podcast?url=${encodeURIComponent(url)}`)

      if (!response.ok) {
        throw new Error("Failed to generate audio")
      }

      const data = await response.json()

      toast({
        title: "Audio generated successfully",
        description: "Your audio is ready to download",
      })

      console.log("Audio generation successful:", data)
    } catch (err) {
      toast({
        title: "Error generating audio",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setGeneratingAudio(null)
    }
  }

  if (isSearching) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-zinc-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-zinc-300 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-zinc-100 animate-spin animation-delay-300"></div>
        </div>
        <p className="mt-6 text-zinc-400">Searching for papers...</p>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return null
  }

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">Search Results</h2>

      {podcastUrl && <AudioPlayer />}

      {results.map((paper: Paper) => (
        <Card
          key={paper.id}
          className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/90 transition-all"
        >
          <CardHeader>
            <CardTitle className="text-zinc-100">{paper.title}</CardTitle>
            <div className="text-sm text-zinc-400">
              {paper.authors.join(", ")} • {paper.year}
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-zinc-300 line-clamp-3">{paper.abstract}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {paper.categories.map((category, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                  {category}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
            <div className="text-xs text-zinc-500">Source: {paper.source}</div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={() => copyUrl(paper.url)}>
                {copiedUrl === paper.url ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copiedUrl === paper.url ? "Copied" : "Copy URL"}
              </Button>

              <Button
                size="sm"
                variant="default"
                className="text-xs"
                onClick={() => generateAudio(paper.url)}
                disabled={generatingAudio === paper.url}
              >
                {generatingAudio === paper.url ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <FileAudio className="h-3 w-3 mr-1" />
                )}
                {generatingAudio === paper.url ? "Generating..." : "Generate Audio"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
