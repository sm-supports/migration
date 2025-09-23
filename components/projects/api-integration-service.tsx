import { Lightbulb, Zap, Target, Users, TrendingUp, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ProjectLayout } from '@/components/layout/project-layout'

const projectDetails = {
  client: 'DNA Partners',
  timeline: '8 Weeks',
  services: ['Web Development', 'Brand Strategy', 'UX/UI Design', 'Content Strategy'],
  technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  liveLink: 'https://www.dnapartners.org/',
  linkText: 'Visit Live Website'
}

const testimonial = {
  rating: 5,
  quote: 'SM Supports delivered a professional, modern website that perfectly captures our advisory approach and entrepreneurial expertise. The clean design and strategic messaging helped us establish credibility with growth company leaders.',
  author: 'Jason Moore',
  position: 'Co-Founder',
  company: 'DNA Partners'
}

export function ApiIntegrationService() {
  return (
    <ProjectLayout
      title="DNA Partners - Business Advisory Website"
      subtitle="A professional website for experienced entrepreneurs advising leaders of growth companies."
      details={projectDetails}
      testimonial={testimonial}
    >
      <div className="space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DNA Partners, founded by seasoned entrepreneurs Jason Moore and Haley Devlin, needed a professional website that would establish credibility with leaders of growth companies. As experienced operators who scaled and sold businesses, they required a digital presence that reflected their battle-tested expertise and practical approach to business advisory. The challenge was creating a clean, trustworthy design that communicates their unique value proposition of firsthand entrepreneurial experience.
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
                <h3 className="text-xl font-semibold text-foreground mb-3">Establishing Credibility & Trust</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Creating immediate trust with CEOs and founders who need to feel confident in the advisory partnership.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I designed a clean, professional layout that highlights their proven track record, including Jason's successful exit with Stratasan and Haley's operational expertise. The design emphasizes their practical experience over theoretical advice.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Communicating Unique Value Proposition</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Differentiating from traditional consultants by emphasizing hands-on entrepreneurial experience.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I crafted messaging around three core pillars: "Battle-Tested Guidance," "Accountability Partner," and "Avoid Common Pitfalls" - each supported by their real entrepreneurial journey and lessons learned from building and scaling companies.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Professional Brand Identity</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Creating a sophisticated brand that appeals to successful business leaders while remaining approachable.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I developed a minimalist design system with strategic use of professional imagery, clean typography, and a balanced color palette that conveys expertise without being intimidating. The layout emphasizes clarity and easy navigation.
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
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
                <p className="text-green-700 dark:text-green-300 font-medium">Client Satisfaction Score</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">8 Weeks</div>
                <p className="text-blue-700 dark:text-blue-300 font-medium">From Concept to Launch</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
                <p className="text-purple-700 dark:text-purple-300 font-medium">Mobile Responsive Design</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">3 Core</div>
                <p className="text-orange-700 dark:text-orange-300 font-medium">Value Propositions Highlighted</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Website Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Website Showcase</h2>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
              <Image 
                src="/dnapartners.webp" 
                alt="DNA Partners Complete Website Design" 
                width={1200} 
                height={800} 
                className="w-full h-auto rounded-md" 
              />
              <div className="mt-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Complete Website Design</h4>
                <p className="text-sm text-muted-foreground mt-1">Full-length view of the DNA Partners website showcasing clean design, strategic messaging, and professional layout</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  )
}