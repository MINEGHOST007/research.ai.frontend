import SearchBar from "@/components/search-bar"
import SearchResults from "@/components/search-results"
import { Gradient } from "@/components/ui/gradient"
import { Logo } from "@/components/logo"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden bg-black">
      <Gradient />

      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navigation />

        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
          <Logo />

          <div className="w-full max-w-3xl mt-16 mb-8">
            <SearchBar />
          </div>

          <p className="text-zinc-400 text-center max-w-2xl mb-12">
            Search for research papers or generate audio from papers with our advanced AI tools. Explore the latest in
            AI research with just a few clicks.
          </p>

          <div className="w-full max-w-3xl">
            <SearchResults />
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
