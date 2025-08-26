'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, MessageCircle, ExternalLink } from 'lucide-react'

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const opacity = useMotionValue(0)

  // Optimized for ultra-smoothness
  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 40 })
  const opacitySpring = useSpring(opacity, { stiffness: 500, damping: 60 })

  function handleMouseMove(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
    opacity.set(1)
  }
  function handleMouseLeave() {
    opacity.set(0)
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Ultra-smooth moving cursor light */}
      <motion.div
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
          opacity: opacitySpring,
          willChange: 'transform',
        }}
        className="pointer-events-none absolute z-20 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.14) 40%, transparent 80%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Everything Portfolio for{' '}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                your projects
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional web development, React expertise, graphic design, and illustration services. 
              Everything you need to bring your digital vision to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="inline-flex items-center justify-center px-6 py-3">
              <a href="https://smsupports.zohobookings.com" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group">
              <a href="https://api.whatsapp.com/send?phone=8801301360818&text=Hello%20Sm%20Supports!" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                WhatsApp
              </a>
            </Button>
            
            <Button asChild variant="ghost" size="lg" className="group">
              <Link href="/projects">
                <>
                  <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View Projects
                </>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available for new projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>React & Next.js Expert</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Design & Illustration</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
