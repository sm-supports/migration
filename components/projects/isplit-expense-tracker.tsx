import { Users, TrendingUp, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ProjectLayout } from '@/components/layout/project-layout'

const projectDetails = {
  client: 'Personal Project',
  timeline: '12 Weeks',
  services: ['Full-Stack Development', 'UI/UX Design', 'Mobile Optimization', 'Analytics Integration'],
  technologies: ['React', 'JavaScript', 'Node.js', 'Express'],
  liveLink: 'https://isplit.netlify.app/',
  linkText: 'View Live App'
}

const testimonial = {
  rating: 5,
  quote: 'SM Supports created an incredibly intuitive expense tracking app that has revolutionized how our team manages shared expenses. The AI-powered insights and seamless bill splitting features make financial management effortless.',
  author: 'Dhrubajit Paul',
  position: 'Software Engineer',
  company: 'Brain Station 23'
}

export function ISplitExpenseTracker() {
  return (
    <ProjectLayout
      title="iSplit - Smart Expense Tracker"
      subtitle="A comprehensive expense tracking and bill splitting app with AI-powered insights and group management features."
      details={projectDetails}
      testimonial={testimonial}
    >
      <div className="space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            iSplit is a modern expense tracking and bill splitting application designed to simplify financial management for individuals and groups. The app combines intelligent expense categorization, AI-powered insights, and seamless group expense splitting to help users take control of their finances. Built with a mobile-first approach, iSplit offers real-time synchronization across devices, visual analytics, and enterprise-grade security to protect sensitive financial data.
          </p>
        </section>

        {/* Challenges & Solutions */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Challenges & Solutions</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Complex Group Expense Management</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Creating an intuitive system for splitting bills among multiple people with different sharing arrangements and payment methods.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I developed a flexible group management system that handles various splitting scenarios - equal splits, custom amounts, and percentage-based divisions. The interface clearly shows who owes what to whom, with automatic calculations and settlement suggestions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Financial Insights</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Providing meaningful financial insights that help users understand and improve their spending patterns.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I implemented intelligent expense categorization using machine learning algorithms and created interactive visual analytics with charts and graphs. The app provides personalized spending insights, budget recommendations, and identifies potential savings opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Security & Cross-Platform Sync</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Ensuring sensitive financial data remains secure while providing seamless access across multiple devices and platforms.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I implemented enterprise-grade security with encrypted data storage and transmission, secure authentication, and real-time synchronization across devices. The app works flawlessly on mobile and desktop with full offline capability and data export features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Results & Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
                <p className="text-green-700 dark:text-green-300 font-medium">User Satisfaction Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">12 Weeks</div>
                <p className="text-blue-700 dark:text-blue-300 font-medium">Development Timeline</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
                <p className="text-purple-700 dark:text-purple-300 font-medium">Mobile Responsive</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">6</div>
                <p className="text-orange-700 dark:text-orange-300 font-medium">Core Features Implemented</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Website Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">App Showcase</h2>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
              <Image 
                src="/fullweb8.png" 
                alt="iSplit Expense Tracker Complete App Design" 
                width={1200} 
                height={800} 
                className="w-full h-auto rounded-md" 
              />
              <div className="mt-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Complete App Experience</h4>
                <p className="text-sm text-muted-foreground mt-1">Full-length view of the iSplit app showcasing smart expense tracking, group bill splitting, and AI-powered financial insights</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  )
}