import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TawkToWidget } from '@/components/TawkToWidget'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SM Supports - Portfolio & Services',
  description: 'Professional web development, React expertise, graphic design, and illustration services. Everything you need for your digital projects.',
  keywords: 'web development, React, graphic design, illustration, portfolio, SM Supports',
  authors: [{ name: 'SM Supports' }],
  creator: 'SM Supports',
  openGraph: {
    title: 'SM Supports - Portfolio & Services',
    description: 'Professional web development, React expertise, graphic design, and illustration services.',
    url: 'https://smsupports.com',
    siteName: 'SM Supports',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SM Supports Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SM Supports - Portfolio & Services',
    description: 'Professional web development, React expertise, graphic design, and illustration services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
  {/* TrustBox script is loaded from a client component to avoid server/client DOM mismatches */}
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
        <TawkToWidget />
      </body>
    </html>
  )
}
