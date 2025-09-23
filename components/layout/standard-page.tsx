"use client"

import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface StandardPageProps {
  children: React.ReactNode
}

// Standard page wrapper matching the Services page structure
export function StandardPage({ children }: StandardPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
