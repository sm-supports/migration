'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'hsjutla',
    role: 'Client from United Kingdom',
    content: 'Sajat is truly one of the best and most understanding web designers I\'ve worked with on Fiverr. He quickly understood exactly how I envisioned my site and brought it to life with skill and creativity. I\'ve been using Fiverr for a long time, and it\'s rare to come across someone this talented. Highly recommended!',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'gilbertbeard23',
    role: 'Client from United Kingdom',
    content: 'Great experience from start to finish. The entire experience felt calm and well-managed. Everything was delivered neatly and right on time. I would consider working with him again. It\'s been a positive experience throughout.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'patriciaaer',
    role: 'Client from Germany',
    content: 'Sajat is an outstanding web developer! His creativity, technical expertise, and sharp eye for detail completely transformed my website into something beyond what I imagined. The final result looks modern, professional, and truly impressive. Working with him was effortless—he\'s responsive, reliable, and genuinely cares about delivering top-quality work. I highly recommend Sajat to anyone looking for an exceptional website.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'lavarn_kihn',
    role: 'Client from United States',
    content: 'Working with Sajat am truly impressed with the quality of work delivered. The seller quickly understood my demands and went above and above to produce outcomes that were better than I could have imagined. Highly professional and absolutely recommended!',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'deidreswanson',
    role: 'Client from United States',
    content: 'He is an excellent expert in Wix and also did a fantastic job improving my Wix website, both in terms of functional design and SEO. Extremely cooperative, responsive, and always puts the customer first. Thank you!',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    name: 'jbomb001',
    role: 'Client from United States',
    content: 'Sajat was great to work with, he listens, he is quick to make the right changes the first time and always going above and beyond by doing things the right way the first time. Highly recommended.',
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
            Don&apos;t just take my word for it. Here&apos;s what clients have to say about working together 
            and the results we&apos;ve achieved.
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
                    &quot;{testimonial.content}&quot;
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
              Let&apos;s work together to create something amazing. I&apos;m committed to delivering 
              the same level of quality and satisfaction to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#hero-section" passHref>
                <Button className="btn btn-primary">
                  Start Your Project
                </Button>
              </Link>
              <a href="https://www.fiverr.com/sajjatmohammed?public_mode=true" target="_blank" rel="noopener noreferrer">
                <Button className="btn btn-secondary">
                  Read More Reviews
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
