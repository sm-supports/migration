 'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const IMAGES = [
  '/api/placeholder/800/400',
  '/api/placeholder/800/400?2',
  '/api/placeholder/800/400?3',
]

export default function EcommerceGallery() {
  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 4000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden">
        <img src={IMAGES[index]} alt={`gallery-${index}`} className="w-full h-64 object-cover" />
      </div>

      <button
        onClick={() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/70 hover:bg-background/90 p-2 rounded-full"
        aria-label="Previous"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => setIndex((i) => (i + 1) % IMAGES.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/70 hover:bg-background/90 p-2 rounded-full"
        aria-label="Next"
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 mt-3">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-muted'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
