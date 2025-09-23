'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface ProjectDetails {
  client: string
  timeline: string
  services: string[]
  technologies: string[]
  liveLink?: string
  linkText?: string
}

interface Testimonial {
  rating: number
  quote: string
  author: string
  position: string
  company: string
}

interface ProjectLayoutProps {
  title: string
  subtitle: string
  details: ProjectDetails
  testimonial: Testimonial
  children: React.ReactNode
}

export function ProjectLayout({ title, subtitle, details, testimonial, children }: ProjectLayoutProps) {
  const heroRef = useRef<HTMLElement | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const opacity = useMotionValue(0)

  // Optimized for ultra-smoothness matching homepage
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section - matching homepage style */}
      <section
        ref={heroRef}
        className="relative py-16 sm:py-20 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Pattern - matching homepage */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        {/* Ultra-smooth moving cursor light - matching homepage */}
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              {title}
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Project Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-muted/30 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Client</h3>
                    <p className="text-muted-foreground">{details.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Timeline</h3>
                    <p className="text-muted-foreground">{details.timeline}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Services</h3>
                    <ul className="space-y-1">
                      {details.services.map((service, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {details.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-background/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {details.liveLink && (
                    <Button asChild className="w-full">
                      <a href={details.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {details.linkText || 'View Live Project'}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-muted/30 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}