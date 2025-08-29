import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { TrustpilotClient } from '../TrustpilotClient'

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

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
]

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

        {/* ---------Responsive Main Grid---------- */}
        <div className={`
          flex flex-col items-center text-center gap-y-10
          md:grid md:grid-cols-12 md:gap-12 md:text-left md:items-start md:flex-none md:gap-8
        `}>

          {/* Brand and Socials: mobile at top, desktop at left */}
          <div className="md:col-span-4 space-y-8 w-full">
            <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-3 space-y-3 md:space-y-0">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SM</span>
              </div>
              <span className="font-bold text-xl">SM Supports</span>
            </div>

            <p className="text-muted-foreground/90 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Professional web development and digital solutions. Helping businesses transform their digital presence with creativity and expertise.
            </p>

            {/* Social links, centered on mobile */}
            <div className="flex justify-center md:justify-start items-center space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="
                    w-11 h-11 bg-muted/20 rounded-xl flex items-center justify-center 
                    text-muted-foreground hover:text-primary hover:bg-muted/30 
                    transition-all duration-200 active:scale-95
                  "
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info: stacked on mobile */}
          <div className="order-2 md:order-none md:col-span-4 space-y-7 w-full">
            <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-2 md:mb-6">Get in Touch</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center md:justify-start space-x-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{contactInfo.email}</span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center md:justify-start space-x-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{contactInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Links Columns: grid-2 for mobile, same desktop */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 w-full">
            <div>
              <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-3 md:mb-6">Services</h3>
              <ul className="space-y-2 md:space-y-4">
                {footerLinks.services.map((link, i) => (
                  <li 
                    key={link.name} 
                    className={i > 1 ? 'hidden sm:block' : ''}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground/80 hover:text-primary transition-colors duration-200 text-sm block py-2 md:py-0"
                    >{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase mb-3 md:mb-6">Company</h3>
              <ul className="space-y-2 md:space-y-4">
                {footerLinks.company.map((link, i) => (
                  <li 
                    key={link.name} 
                    className={i > 1 ? 'hidden sm:block' : ''}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground/80 hover:text-primary transition-colors duration-200 text-sm block py-2 md:py-0"
                    >{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trustpilot Widget (client-only) to avoid mutating DOM during hydration */}
        <div className="w-full flex justify-center md:justify-start mt-8">
          <TrustpilotClient />
        </div>

        {/* -----------Lower Bar--------- */}
        <div className="
          mt-12 pt-7 border-t border-border/10 
          flex flex-col items-center gap-y-3
          md:flex-row md:justify-between md:gap-y-0
        ">
          <p className="text-sm text-muted-foreground/70 text-center md:text-left">
            © {currentYear} SM Supports. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/70 mt-2 md:mt-0">
            {legalLinks.map((link, i) => (
              <Link 
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
