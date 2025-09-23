'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { projects } from '@/lib/projects-data'

export function CaseStudies() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Case Studies & Documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore detailed case studies of successful projects, from concept to completion. 
            See how I solve complex problems and deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} idx={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-background rounded-2xl p-8 max-w-4xl mx-auto border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to start your project?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss how I can help bring your vision to life with the same level of quality 
              and attention to detail shown in these case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" passHref>
                <Button size="lg" className="group">
                  <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View All Projects
                </Button>
              </Link>
              <Link href="/#hero-section" passHref>
                <Button variant="outline" size="lg">
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
