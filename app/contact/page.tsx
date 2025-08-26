import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-24 pb-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact</h1>
            <p className="text-muted-foreground">Have a project or question? Send a message and I’ll get back to you shortly.</p>
          </div>

          <div className="card max-w-3xl mx-auto">
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input name="name" type="text" required className="w-full border border-border rounded-md px-3 py-2 bg-background" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input name="email" type="email" required className="w-full border border-border rounded-md px-3 py-2 bg-background" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea name="message" rows={6} required className="w-full border border-border rounded-md px-3 py-2 bg-background resize-vertical" />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
