import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-zinc-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} PaperAI. All rights reserved.
        </div>

        <div className="flex space-x-6">
          <Link href="/terms" className="text-zinc-500 hover:text-white text-sm transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-zinc-500 hover:text-white text-sm transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-zinc-500 hover:text-white text-sm transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
