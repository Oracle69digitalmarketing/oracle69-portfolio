import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oracle69 Portfolio',
  description: 'Projects, SaaS platforms, and AI solutions by Oracle69digitalmarketing',
  generator: 'Next.js + v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/oracle69-icon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta property="og:title" content="Oracle69 Portfolio" />
        <meta property="og:description" content="Scalable AI, SaaS & AgriTech projects by Oracle69digitalmarketing." />
        <meta property="og:image" content="/oracle69-banner.jpg" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
