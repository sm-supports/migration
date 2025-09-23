'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const footerLinks = {
  services: [
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'UI/UX Design', href: '/services#ui-ux' },
    { name: 'Graphic Design', href: '/services#graphic-design' },
    { name: 'Digital Marketing', href: '/services#marketing' },
  ],
  resources: [
    { name: 'Case Studies', href: '/projects' },
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQ', href: '/#faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Work', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book a Call', href: '/schedule' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

const contactInfo = {
  address: 'Savar, Dhaka, Bangladesh',
  email: 'sajat@smsupports.com',
  phone: '(+880) 13013-60818',
  hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST'
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/orgs/sm-supports/', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/smsupports', icon: Twitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/smsupports/', icon: Linkedin },
  { name: 'Email', href: 'mailto:sajat@smsupports.com', icon: Mail },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }
  
  return (
    <footer className="mt-12 bg-background border-t border-border/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="space-y-8 lg:space-y-12">
          {/* Top section with logo and social links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-primary font-bold text-xl">SM</span>
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight">SM Supports</h3>
                <p className="text-sm text-muted-foreground/80 mt-1">Professional web development solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="p-3 rounded-xl bg-muted/5 hover:bg-muted/10 transition-colors duration-200"
                >
                  <s.icon className="w-5 h-5 text-muted-foreground/70 hover:text-primary transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Main footer content - Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 group"
                >
                  <Mail className="w-4 h-4" />
                  <span>{contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 group"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contactInfo.phone}</span>
                </a>
                <div className="text-sm text-muted-foreground/70 flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="text-xs text-muted-foreground/60 mt-2">
                  {contactInfo.hours}
                </div>
              </div>
            </div>
          </div>

          {/* Main footer content - Mobile Accordion */}
          <div className="lg:hidden space-y-4">
            {/* Services Section */}
            <div className="group">
              <button
                onClick={() => toggleSection('services')}
                className={`w-full p-4 flex items-center justify-between rounded-lg transition-all duration-200 ${
                  activeSection === 'services' 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'hover:bg-muted/5'
                }`}
                aria-expanded={activeSection === 'services'}
              >
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-base">Services</h4>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === 'services' ? 'transform rotate-180 text-primary' : 'text-muted-foreground/70'
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeSection === 'services' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="p-4 space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-md hover:bg-muted/5"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company Section */}
            <div className="group">
              <button
                onClick={() => toggleSection('company')}
                className={`w-full p-4 flex items-center justify-between rounded-lg transition-all duration-200 ${
                  activeSection === 'company' 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'hover:bg-muted/5'
                }`}
                aria-expanded={activeSection === 'company'}
              >
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-base">Company</h4>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === 'company' ? 'transform rotate-180 text-primary' : 'text-muted-foreground/70'
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeSection === 'company' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="p-4 space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-md hover:bg-muted/5"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources Section */}
            <div className="group">
              <button
                onClick={() => toggleSection('resources')}
                className={`w-full p-4 flex items-center justify-between rounded-lg transition-all duration-200 ${
                  activeSection === 'resources' 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'hover:bg-muted/5'
                }`}
                aria-expanded={activeSection === 'resources'}
              >
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-base">Resources</h4>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === 'resources' ? 'transform rotate-180 text-primary' : 'text-muted-foreground/70'
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeSection === 'resources' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="p-4 space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 p-2 rounded-md hover:bg-muted/5"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-auto" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="group">
              <button
                onClick={() => toggleSection('contact')}
                className={`w-full p-4 flex items-center justify-between rounded-lg transition-all duration-200 ${
                  activeSection === 'contact' 
                    ? 'bg-primary/10 text-primary shadow-sm' 
                    : 'hover:bg-muted/5'
                }`}
                aria-expanded={activeSection === 'contact'}
              >
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-base">Get in Touch</h4>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeSection === 'contact' ? 'transform rotate-180 text-primary' : 'text-muted-foreground/70'
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeSection === 'contact' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-4 space-y-3">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 p-2 rounded-md hover:bg-muted/5"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{contactInfo.email}</span>
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-muted-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 p-2 rounded-md hover:bg-muted/5"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{contactInfo.phone}</span>
                  </a>
                  <div className="text-sm text-muted-foreground/70 flex items-center gap-3 p-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{contactInfo.address}</span>
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-2 p-2">
                    {contactInfo.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-border/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-muted-foreground/60 text-center md:text-left">
                © {currentYear} SM Supports. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground/60 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
