import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const posts = [
  { id: 1, title: 'Performance Tips for Next.js', excerpt: 'Small changes that yield big performance wins for modern web apps.' },
  { id: 2, title: 'Design Systems on a Budget', excerpt: 'How to build practical design systems without expensive tooling.' },
  { id: 3, title: 'From Idea to Launch', excerpt: 'A walkthrough of a real project: planning, execution, and outcomes.' },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Thoughts on design, development, and building better web experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="card">
                <h3 className="text-xl font-semibold mb-2 text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Aug 2025</div>
                  <Link href="#" className="btn btn-secondary">Read</Link>
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
