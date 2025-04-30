import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Research Assistant',
  description: 'AI-powered research paper search and assistant tool',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
