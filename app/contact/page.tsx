"use client"

import { StandardPage } from '@/components/layout/standard-page'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    technologies: [] as string[],
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Lock body scroll while loading overlay is shown
  useEffect(() => {
    if (loading) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [loading])

  const projectTypes = [
    'Website Development', 'Mobile App', 'E-commerce Platform', 'SaaS Dashboard', 
    'API Integration', 'Design System', 'Brand Identity', 'Other'
  ]

  const budgetRanges = [
    'Under $5K', '$5K - $15K', '$15K - $30K', '$30K - $50K', '$50K+', 'Let\'s discuss'
  ]

  const timelineOptions = [
    'ASAP', '1-2 weeks', '1 month', '2-3 months', '3-6 months', '6+ months'
  ]

  const technologyOptions = [
    'React/Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python/Django', 'PHP/Laravel',
    'WordPress', 'Shopify', 'Mobile (React Native)', 'Mobile (Native)', 'AI/ML', 'Blockchain'
  ]

  const validateField = (name: string, value: string | string[]) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        return !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value as string) ? 'Invalid email format' : ''
      case 'phone':
        return value && !/^[\+]?[1-9][\d]{0,15}$/.test((value as string).replace(/[\s\-\(\)]/g, '')) ? 'Invalid phone format' : ''
      case 'message':
        return (value as string).length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleTechnologyChange = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'technologies' && key !== 'company' && key !== 'phone' && key !== 'projectType' && key !== 'budget' && key !== 'timeline') {
        const error = validateField(key, formData[key as keyof typeof formData])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      return
    }

    const start = Date.now()
    setLoading(true)
    try {
      // Use Formspree for static form handling
      const res = await fetch('https://formspree.io/f/xvgzabjn', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          technologies: formData.technologies.join(', '),
          message: formData.message,
          _subject: `New Portfolio Contact: ${formData.name}`,
        }),
      })
      
      if (res.ok) {
        setSuccessMsg('Message sent! I\'ll get back to you shortly.')
        setFormData({ 
          name: '', email: '', company: '', phone: '', projectType: '', 
          budget: '', timeline: '', technologies: [], message: '' 
        })
        setErrors({})
        setTouched({})
      } else {
        alert('Failed to send! Please try again.')
      }
    } catch (error) {
      alert('Error submitting the form! Please check your connection.')
    }
    // Ensure the loading overlay is visible for a minimum duration for better UX
    const elapsed = Date.now() - start
    const minDuration = 600
    if (elapsed < minDuration) {
      await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed))
    }
    setLoading(false)
  }

  return (
    <StandardPage>
      <section className="pt-24 pb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Let's Work Together</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Tell me about your project and let's create something amazing.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-1 space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 
                              border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400">⚡</span>
                    </div>
                    <span>Typically respond within 1 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400">🎯</span>
                    </div>
                    <span>Free consultation call available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400">💼</span>
                    </div>
                    <span>Project proposals within 48 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 
                              border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">What to Include</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Project goals and requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Preferred timeline and budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>Any existing assets or references</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 
                              rounded-xl shadow-xl shadow-gray-100/50 dark:shadow-gray-900/50 p-8">
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {successMsg}
                    </div>
                  </motion.div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit} aria-busy={loading}>
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        className={`w-full border rounded-lg px-4 py-3 bg-background transition-all duration-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400
                          ${errors.name ? 'border-red-500' : 'border-border'}`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className={`w-full border rounded-lg px-4 py-3 bg-background transition-all duration-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400
                          ${errors.email ? 'border-red-500' : 'border-border'}`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                      <input
                        name="company"
                        type="text"
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background transition-all duration-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        className={`w-full border rounded-lg px-4 py-3 bg-background transition-all duration-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400
                          ${errors.phone ? 'border-red-500' : 'border-border'}`}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Project Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                        <select
                          name="projectType"
                          className="w-full border border-border rounded-lg px-4 py-3 bg-background transition-all duration-200
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                          value={formData.projectType}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                        <select
                          name="budget"
                          className="w-full border border-border rounded-lg px-4 py-3 bg-background transition-all duration-200
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                          value={formData.budget}
                          onChange={handleChange}
                          disabled={loading}
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map(budget => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">Timeline</label>
                      <select
                        name="timeline"
                        className="w-full border border-border rounded-lg px-4 py-3 bg-background transition-all duration-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                        value={formData.timeline}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map(timeline => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Technologies of Interest <span className="text-xs text-muted-foreground">(select all that apply)</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {technologyOptions.map(tech => (
                          <label key={tech} className="flex items-center space-x-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.technologies.includes(tech)}
                              onChange={() => handleTechnologyChange(tech)}
                              disabled={loading}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {tech}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className={`w-full border rounded-lg px-4 py-3 bg-background transition-all duration-200 resize-vertical
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400
                        ${errors.message ? 'border-red-500' : 'border-border'}`}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit" 
                      disabled={loading} 
                      aria-disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                                px-8 py-3 text-white font-medium rounded-lg transition-all duration-200 
                                transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {loading && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background/90 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label="Sending your message"
        >
          <div className="flex flex-col items-center">
            {/* Primary: GIF; Fallback: existing SVG in public */}
            <img
              src="/message-animation.gif"
              alt="Sending message animation"
              className="w-64 h-64 md:w-80 md:h-80 motion-safe:animate-bounce"
            />
            <p className="mt-4 text-foreground/80 text-lg motion-safe:animate-pulse">Sending your message...</p>
          </div>
        </div>
      )}
    </StandardPage>
  )
}
