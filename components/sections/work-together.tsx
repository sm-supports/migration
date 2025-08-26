'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, Video, Calendar } from 'lucide-react'

export function WorkTogether() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Work with me.{' '}
              <span className="text-primary">Like in your team.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I integrate seamlessly into your workflow, providing the expertise and collaboration 
              you need to bring your projects to life. Whether you need a dedicated developer, 
              designer, or creative partner, I'm here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Seamless Integration
                  </h3>
                  <p className="text-muted-foreground">
                    Work with me as if I'm part of your team. I adapt to your processes, 
                    tools, and communication preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Clear Communication
                  </h3>
                  <p className="text-muted-foreground">
                    Regular updates, transparent progress tracking, and open communication 
                    ensure your project stays on track.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Flexible Collaboration
                  </h3>
                  <p className="text-muted-foreground">
                    Video calls, screen sharing, and real-time collaboration tools keep us 
                    connected throughout the project.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="inline-flex items-center justify-center px-6 py-3">
                <a href="https://smsupports.zohobookings.com" target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Meeting
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mock UI/Meeting Preview */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">SM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">SM Supports</h4>
                      <p className="text-sm text-muted-foreground">Online • Available</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                      <p className="text-sm">Hi! I'd like to discuss a new project</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                      <p className="text-sm">Great! I'd love to hear about it. What are you thinking?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2 max-w-xs">
                      <p className="text-sm">Can we schedule a call to discuss the details?</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 pt-4 border-t border-border">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <a href="https://smsupports.zohobookings.com" target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
