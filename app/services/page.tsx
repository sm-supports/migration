import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Services as ServicesSection } from '@/components/sections/services'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Reuse the existing Services section for consistency */}
      <ServicesSection />

      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Why work with me?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              I bring a blend of design sensibility and engineering discipline to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Design-led development</h3>
              <p className="text-sm text-muted-foreground">Pixel-perfect interfaces built with accessibility and performance in mind.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">End-to-end delivery</h3>
              <p className="text-sm text-muted-foreground">From concept and design to engineering and deployment, I handle the full lifecycle.</p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">Clear communication, iterative feedback loops, and on-time delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
