'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with React, Next.js, and Stripe integration. Features include product management, user authentication, and payment processing.',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'TypeScript', 'Stripe'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/ecommerce-platform'
  },
  {
    title: 'Design System Library',
    description: 'Comprehensive design system with reusable components, documentation, and brand guidelines for consistent user experiences.',
    category: 'Design',
    technologies: ['Figma', 'Storybook', 'React', 'TypeScript'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/design-system'
  },
  {
    title: 'Mobile App UI/UX',
    description: 'Complete mobile app design with user research, wireframes, prototypes, and final UI design for iOS and Android.',
    category: 'Design',
    technologies: ['Figma', 'Protopie', 'User Research', 'Prototyping'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/mobile-app'
  },
  {
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with real-time data visualization, user management, and advanced reporting features.',
    category: 'Web Development',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/saas-dashboard'
  },
  {
    title: 'Brand Identity Package',
    description: 'Complete brand identity including logo design, color palette, typography, and marketing materials.',
    category: 'Design',
    technologies: ['Illustrator', 'Photoshop', 'Brand Strategy', 'Print Design'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/brand-identity'
  },
  {
    title: 'API Integration Service',
    description: 'Backend service for third-party API integrations with authentication, rate limiting, and comprehensive error handling.',
    category: 'Web Development',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    image: '/api/placeholder/400/250',
    rating: 5,
    link: '/projects/api-service'
  }
]

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
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Preview</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={project.link} className="inline-flex items-center w-full justify-start group-hover:bg-primary/10">
                    <span className="flex-1 text-left">View Case Study</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
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
              Let's discuss how I can help bring your vision to life with the same level of quality 
              and attention to detail shown in these case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View All Projects
              </Button>
              <Button variant="outline" size="lg">
                Start a Project
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
