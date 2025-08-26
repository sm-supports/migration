import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of recent work showcasing design, development, and full-stack projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <article key={id} className="card">
                <div className="w-full h-48 relative mb-4 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={`/images/project-${id}.jpg`}
                    alt={`Project ${id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={id <= 2}
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Project Title {id}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Short description of the project, the problem it solved, and technologies used.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">React · Next.js · TypeScript</div>
                  <Link href="#" className="btn btn-secondary">
                    View Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
