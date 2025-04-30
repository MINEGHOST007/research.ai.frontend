import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="flex items-center justify-between w-full py-6">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-zinc-300 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-zinc-500 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/docs" className="text-zinc-500 hover:text-white transition-colors">
          Docs
        </Link>
        <Link href="/api" className="text-zinc-500 hover:text-white transition-colors">
          API
        </Link>
      </div>

      <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
        Try Pro
      </Button>
    </nav>
  )
}
