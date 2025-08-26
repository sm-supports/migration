import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { WorkTogether } from '@/components/sections/work-together'
import { CodeDelivery } from '@/components/sections/code-delivery'
import { KnowledgeBase } from '@/components/sections/knowledge-base'
import { CaseStudies } from '@/components/sections/case-studies'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <Hero />
      <Services />
      <WorkTogether />
      <CodeDelivery />
      <KnowledgeBase />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      
      <Footer />
    </main>
  )
}
