"use client"

import { StandardPage } from '@/components/layout/standard-page'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/lib/projects-data'

export default function ProjectsPage() {
  return (
    <StandardPage>
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of recent work showcasing design, development, and full-stack projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    </StandardPage>
  )
}
