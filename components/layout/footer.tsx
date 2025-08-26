import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'UI/UX Design', href: '/services#ui-ux' },
    { name: 'Graphic Design', href: '/services#graphic-design' },
    { name: 'Digital Marketing', href: '/services#marketing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Work', href: '/projects' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const contactInfo = {
  address: '123 Business Avenue, Tech Park',
  email: 'hello@smsupports.com',
  phone: '+1 (555) 123-4567'
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/smsupports', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/smsupports', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/smsupports', icon: Linkedin },
  { name: 'Email', href: 'mailto:hello@smsupports.com', icon: Mail },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative mt-24 bg-background">
      <div className="absolute inset-x-0 -top-16 border-t border-border/10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand + Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SM</span>
              </div>
              <span className="font-bold text-xl">SM Supports</span>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground/90 text-sm leading-relaxed">
                Professional web development and digital solutions. Helping businesses transform their digital presence with creativity and expertise.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground/90">
                  <MapPin className="w-4 h-4" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground/90">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground/90">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* TrustBox widget (client-only) */}
              <div>
                {/* Render placeholder for client mount; client script will hydrate this element */}
                <div id="trustpilot-placeholder" />
                <script
                  // Insert Trustpilot markup and script after hydration to avoid
                  // mutating the DOM during React hydration.
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function(){
                        if(typeof window==='undefined') return;
                        window.requestAnimationFrame(function(){
                          try{
                            var placeholder = document.getElementById('trustpilot-placeholder');
                            if(!placeholder) return;
                            if(placeholder.dataset.mounted==='1') return;
                            placeholder.dataset.mounted='1';
                            var mount = document.createElement('div');
                            mount.innerHTML = '\n                              <div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="68ad78780d777a86c73fe883" data-style-height="52px" data-style-width="100%" data-token="e968265e-e744-4644-b2a8-cf9faeed13d7">\n                                <a href="https://www.trustpilot.com/review/smsupports.com" target="_blank" rel="noopener noreferrer">Trustpilot</a>\n                              </div>';
                            placeholder.appendChild(mount);

                            if(!document.getElementById('trustpilot-widget-script')){
                              var s = document.createElement('script');
                              s.id = 'trustpilot-widget-script';
                              s.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
                              s.async = true;
                              document.body.appendChild(s);
                            }
                          }catch(e){}
                        });
                      })();
                    `,
                  }}
                />
              </div>

              <div className="flex items-center space-x-4 pt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 bg-muted/20 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/30 transition-all duration-200 transform hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="md:pl-12">
              <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-6">Services</h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground/80 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:pl-12">
              <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground/80 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground/70">
              © {currentYear} SM Supports. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-sm text-muted-foreground/70">
              <Link href="/privacy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
