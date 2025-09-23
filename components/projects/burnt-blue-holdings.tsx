import { Users, TrendingUp, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ProjectLayout } from '@/components/layout/project-layout'

const projectDetails = {
  client: 'Burnt Blue Holdings',
  timeline: '10 Weeks',
  services: ['Web Development', 'Brand Strategy', 'Investment Platform Design', 'Content Strategy'],
  technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  liveLink: 'https://www.burntblueholdings.com/',
  linkText: 'Visit Live Website'
}

const testimonial = {
  rating: 5,
  quote: 'SM Supports created an exceptional investment platform that perfectly communicates our bourbon wholesale business model. The sophisticated design and clear messaging helped us establish credibility with investors and industry partners.',
  author: 'David Thompson',
  position: 'Founder',
  company: 'Burnt Blue Holdings'
}

export function BurntBlueHoldings() {
  return (
    <ProjectLayout
      title="Burnt Blue Holdings - Investment Platform"
      subtitle="A sophisticated investment platform for bourbon wholesale trading and alternative investment opportunities."
      details={projectDetails}
      testimonial={testimonial}
    >
      <div className="space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Burnt Blue Holdings, founded in Nashville in 2023, needed a professional website to showcase their unique bourbon wholesale investment model. As a company that buys, ages, and sells bourbon barrels while providing cash flow to distilleries, they required a digital presence that would communicate their sophisticated investment approach and build trust with both investors and industry partners. The challenge was creating a platform that balances the traditional bourbon industry with modern investment concepts.
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
                <h3 className="text-xl font-semibold text-foreground mb-3">Investment Credibility & Trust</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Building investor confidence in a unique alternative investment opportunity that combines bourbon industry expertise with financial returns.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I designed a professional, sophisticated layout that emphasizes BBH's industry relationships, quality standards, and proven business model. The design highlights their ecosystem-centric approach and Kentucky bourbon heritage to build immediate credibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Complex Investment Model Communication</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Explaining the bourbon wholesale investment process clearly to potential investors unfamiliar with the industry.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I created compelling visual storytelling that breaks down their business model: buying 2-year barrels, aging 1-4 years, and selling to producers. Added industry statistics and compelling data points about Kentucky's bourbon dominance to educate and inspire confidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Professional Investment Brand</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Balancing the traditional bourbon industry aesthetics with modern investment platform expectations.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I developed a sophisticated design system that honors bourbon heritage while maintaining investment-grade professionalism. Used premium imagery, clean typography, and strategic color choices that convey both tradition and innovation in the alternative investment space.
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
                <p className="text-green-700 dark:text-green-300 font-medium">Investor Satisfaction Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10 Weeks</div>
                <p className="text-blue-700 dark:text-blue-300 font-medium">From Concept to Launch</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$9.3B</div>
                <p className="text-purple-700 dark:text-purple-300 font-medium">Industry Market Size by 2025</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">2.6M</div>
                <p className="text-orange-700 dark:text-orange-300 font-medium">Barrels Filled in Kentucky (2021)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Website Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Platform Showcase</h2>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
              <Image 
                src="/fullweb7.webp" 
                alt="Burnt Blue Holdings Complete Website Design" 
                width={1200} 
                height={800} 
                className="w-full h-auto rounded-md" 
              />
              <div className="mt-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Complete Investment Platform</h4>
                <p className="text-sm text-muted-foreground mt-1">Full-length view of the Burnt Blue Holdings platform showcasing sophisticated investment messaging, bourbon industry expertise, and professional design</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  )
}