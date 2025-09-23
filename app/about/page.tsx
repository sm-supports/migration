'use client'

import { StandardPage } from '@/components/layout/standard-page'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Code2, 
  Palette, 
  Rocket, 
  Users, 
  Award, 
  Globe,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

export default function AboutPage() {
  const skills = [
    'React & Next.js', 'TypeScript', 'Node.js', 'UI/UX Design', 
    'Graphic Design', 'Brand Identity', 'E-commerce', 'API Integration'
  ]

  const values = [
    {
      icon: Code2,
      title: 'Quality Code',
      description: 'Clean, maintainable, and scalable code that stands the test of time.'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Always exploring new technologies and creative solutions for complex problems.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients to understand their vision and exceed expectations.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional results in every project we undertake.'
    }
  ]

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '3+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' }
  ]

  return (
    <StandardPage>
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              About SM Supports
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Crafting Digital 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Experiences
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're a dedicated team passionate about transforming ideas into powerful digital solutions. 
              From concept to deployment, we bring your vision to life with modern technologies and creative design.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a passion for creating exceptional digital experiences, SM Supports has grown 
                  from a solo developer's dream into a trusted partner for businesses worldwide.
                </p>
                <p>
                  Our journey began with a simple belief: that great technology should be accessible, 
                  beautiful, and purposeful. Every line of code we write and every design we create 
                  reflects this commitment to excellence.
                </p>
                <p>
                  Today, we specialize in modern web development, user-centered design, and comprehensive 
                  digital solutions that help businesses thrive in the digital landscape.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">Serving clients worldwide</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Based in Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Remote-first approach</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Available across time zones</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every project we deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 
                               rounded-2xl flex items-center justify-center mx-auto mb-6 
                               group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-950/50 dark:to-blue-950/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We stay at the forefront of technology to deliver cutting-edge solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto"
          >
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </Badge>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to bringing your ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Sajat Mahmud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-xl font-bold">
                  SM
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Sajat Mahmud</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Lead Developer & Founder</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Full-stack developer with a passion for creating beautiful, functional web applications. 
                  Specializes in React, Next.js, and modern web technologies.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">50+ Projects</span>
                </div>
              </div>
            </motion.div>

            {/* Joy Saha */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-xl font-bold">
                  JS
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Joy Saha</h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-4">Frontend Developer</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Creative frontend developer specializing in modern React applications and responsive design. 
                  Passionate about creating intuitive user experiences and pixel-perfect interfaces.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">30+ Projects</span>
                </div>
              </div>
            </motion.div>

            {/* Joyanta Karmakar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2 lg:col-span-1 md:mx-auto lg:mx-0"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 text-center h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-xl font-bold">
                  JK
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Joyanta Karmakar</h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium mb-4">Backend Developer</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Experienced backend developer focused on building robust APIs and scalable server architectures. 
                  Expert in Node.js, databases, and cloud infrastructure management.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">25+ Projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Let's discuss how we can help bring your digital vision to life. 
              We're excited to hear about your project and explore the possibilities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-blue-600 transition-all duration-200">
                <Link href="/schedule">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </StandardPage>
  )
}