import { Palette, Layers, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { ProjectLayout } from '@/components/layout/project-layout'

const projectDetails = {
  client: 'Personal Project',
  timeline: '10 Weeks',
  services: ['Full-Stack Development', 'UI/UX Design', 'Canvas Integration', 'User Authentication'],
  technologies: ['React', 'Next.js', 'TypeScript', 'Canvas API'],
  liveLink: 'https://configurator-sigma-one.vercel.app/',
  linkText: 'View Live App'
}

const testimonial = {
  rating: 5,
  quote: 'SM Supports delivered an exceptional license plate design configurator that exceeded our expectations. The intuitive visual editor and seamless template system make creating custom designs effortless and enjoyable.',
  author: 'Michael Chen',
  position: 'Creative Director',
  company: 'Design Studio'
}

export function LicensePlateDesigner() {
  return (
    <ProjectLayout
      title="License Plate Designer - Visual Configurator"
      subtitle="An advanced license plate design configurator with visual editor, template system, and high-resolution export capabilities."
      details={projectDetails}
      testimonial={testimonial}
    >
      <div className="space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            License Plate Designer is a comprehensive web application that allows users to create custom license plate designs through an intuitive visual editor. The platform features a powerful template system supporting multiple countries, advanced layering capabilities, and high-resolution export functionality. Built with modern web technologies, the application includes user authentication, design management, and an admin panel for template and system administration.
          </p>
        </section>

        {/* Challenges & Solutions */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Challenges & Solutions</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Palette className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Visual Editor</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Creating a sophisticated design editor that allows users to manipulate text, images, and graphics with precision while maintaining ease of use.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I implemented a Canvas API-based editor with drag-and-drop functionality, real-time preview, and precise positioning controls. The editor supports multiple layers, custom fonts, and image manipulation with intuitive controls for non-technical users.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Layers className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Country Template System</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Supporting various license plate formats and regulations from different countries while maintaining design consistency and legal compliance.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I developed a flexible template architecture that accommodates different plate dimensions, text constraints, and regional requirements. The system includes an admin panel for managing templates and ensuring compliance with local regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Download className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3">High-Resolution Export & User Management</h3>
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Challenge:</span> Generating print-ready, high-resolution exports while providing users with comprehensive design management and history tracking.
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Solution:</span> I implemented a robust export system that generates high-DPI images suitable for professional printing. The platform includes user authentication, design saving, project management, and a comprehensive dashboard for tracking design history and managing multiple projects.
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
                <p className="text-green-700 dark:text-green-300 font-medium">Design Success Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10 Weeks</div>
                <p className="text-blue-700 dark:text-blue-300 font-medium">Development Timeline</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">8+</div>
                <p className="text-purple-700 dark:text-purple-300 font-medium">Country Templates</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">300 DPI</div>
                <p className="text-orange-700 dark:text-orange-300 font-medium">Print-Ready Export Quality</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Platform Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Platform Showcase</h2>
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30 p-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
              <Image 
                src="/website3.png" 
                alt="License Plate Designer Visual Configurator Platform" 
                width={1200} 
                height={800} 
                className="w-full h-auto rounded-md" 
              />
              <div className="mt-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Complete Design Platform</h4>
                <p className="text-sm text-muted-foreground mt-1">Full view of the License Plate Designer showcasing the visual editor, template system, user dashboard, and admin panel</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  )
}