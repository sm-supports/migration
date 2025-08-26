'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'SM Supports delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise is outstanding.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, DesignCo',
    content: 'Working with SM Supports was a game-changer for our design system. The documentation and component library have streamlined our entire development process.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, Creative Agency',
    content: 'The brand identity package SM Supports created perfectly captured our vision. Professional, creative, and delivered on time with excellent communication.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'David Thompson',
    role: 'CTO, SaaS Platform',
    content: 'The dashboard SM Supports built for us is not only beautiful but highly functional. The performance optimizations and clean code made maintenance a breeze.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'Lisa Wang',
    role: 'Marketing Director, StartupXYZ',
    content: 'SM Supports transformed our mobile app design with thoughtful UX and stunning visuals. The user research and prototyping process was invaluable.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'James Wilson',
    role: 'Technical Lead, Enterprise Corp',
    content: 'The API integration service SM Supports developed is robust and well-documented. Their technical expertise and problem-solving skills are top-notch.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working together 
            and the results we've achieved.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
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
          className="text-center mt-16"
        >
          <div className="bg-muted/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to join these satisfied clients?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's work together to create something amazing. I'm committed to delivering 
              the same level of quality and satisfaction to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary">
                Start Your Project
              </button>
              <button className="btn btn-secondary">
                Read More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
