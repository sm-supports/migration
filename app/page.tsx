import { Header } from '@/components/layout/header'
import { 
  Hero, 
  Services, 
  WorkTogether, 
  CodeDelivery, 
  KnowledgeBase, 
  CaseStudies, 
  Testimonials, 
  FAQ 
} from '@/components/sections';
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
