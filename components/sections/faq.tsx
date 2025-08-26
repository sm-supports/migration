'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I offer comprehensive web development, graphic design, and illustration services. This includes React/Next.js development, UI/UX design, brand identity creation, custom illustrations, and full-stack solutions. I also provide project documentation, technical consulting, and ongoing support.'
  },
  {
    question: 'How do you handle project communication and updates?',
    answer: 'I maintain clear, regular communication throughout the project lifecycle. This includes weekly progress updates, milestone reviews, and transparent project tracking. I use tools like Slack, email, and video calls to keep you informed and involved in the process.'
  },
  {
    question: 'What is your development process?',
    answer: 'My process starts with discovery and planning, followed by design and prototyping, then development with regular check-ins, and finally testing and deployment. I use modern tools like Git for version control, implement best practices, and ensure code quality through testing and documentation.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I provide detailed timelines during the planning phase and keep you updated on progress throughout the project.'
  },
  {
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes, I offer various support options including bug fixes, feature updates, maintenance, and technical consulting. I can also provide training and documentation to help your team manage the project going forward.'
  },
  {
    question: 'What technologies and tools do you use?',
    answer: 'I work with modern technologies including React, Next.js, TypeScript, Node.js, and various databases. For design, I use Figma, Adobe Creative Suite, and other industry-standard tools. I stay current with the latest trends and best practices.'
  },
  {
    question: 'How do you ensure project quality and reliability?',
    answer: 'I implement comprehensive testing, code reviews, and quality assurance processes. This includes unit testing, integration testing, performance optimization, and thorough documentation. I also follow industry best practices and coding standards.'
  },
  {
    question: 'What are your rates and payment terms?',
    answer: 'I offer flexible pricing based on project scope and requirements. This can include hourly rates, fixed project pricing, or retainer agreements. I typically require a deposit to begin work, with milestone payments throughout the project.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? I've got answers. Here are the most common questions about working together 
            and what you can expect from our collaboration.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div
                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-border pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
          <div className="bg-background rounded-2xl p-8 max-w-2xl mx-auto border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm here to help! Feel free to reach out with any questions about your project 
              or how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary">
                Get in Touch
              </button>
              <button className="btn btn-secondary">
                Schedule a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
