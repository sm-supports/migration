'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon, ServicesIcon, ProjectsIcon, ContactIcon } from '@/components/icons';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('/')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Set active section based on current path
    setActiveSection(window.location.pathname)
  }, [])

  const handleNavClick = (href: string) => {
    setActiveSection(href)
    // Haptic feedback for supported devices
    if (navigator.vibrate) navigator.vibrate(50)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200', // Reduced animation duration for performance
          isScrolled
            ? 'bg-background/90 backdrop-blur-sm border-b border-border' // Reduced backdrop blur for performance
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo with improved touch target */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 p-2 -m-2 rounded-lg transition-colors hover:bg-accent/50"
              onClick={() => handleNavClick('/')}
              aria-label="SM Supports Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm sm:text-base">SM</span>
              </div>
              <span className="font-semibold text-lg sm:text-xl">SM Supports</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "min-h-[48px] flex items-center", // Touch-friendly target
                    activeSection === item.href 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button Container - Always visible for consistent layout */}
            <div className="hidden md:flex items-center w-[120px] justify-end">
              {activeSection !== '/schedule' && (
                <Button
                  asChild
                  size="sm"
                  className="min-h-[48px] px-4 bg-primary text-primary-foreground hover:bg-primary/90" // Touch-friendly
                >
                  <a href="/schedule" aria-label="Book a consultation call">
                    Book a Call
                  </a>
                </Button>
              )}
            </div>

            {/* Mobile CTA Button Container - Always visible for consistent layout */}
            <div className="md:hidden w-[100px] flex justify-end">
              {activeSection !== '/schedule' && (
                <Button
                  asChild
                  size="sm"
                  className="min-h-[48px] min-w-[48px] px-4 bg-primary text-primary-foreground hover:bg-primary/90" // Touch-friendly
                >
                  <a href="/schedule" aria-label="Book a consultation call">
                    Book Call
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Fixed Bottom Navigation for Mobile - Consistent placement */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-[100]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-around py-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl transition-all duration-150",
                  "min-w-[64px] min-h-[64px] p-2 m-1", // 48px+ touch target with spacing
                  "active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50", // Clear feedback
                  activeSection === item.href 
                    ? "text-primary bg-primary/15 shadow-sm" // Enhanced active state
                    : "text-foreground/60 hover:text-foreground hover:bg-accent/40"
                )}
                onClick={() => handleNavClick(item.href)}
                aria-label={`Navigate to ${item.name}`}
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                <div className="h-6 w-6 flex items-center justify-center">
                  {item.name === 'Home' && <HomeIcon />}
                  {item.name === 'Services' && <ServicesIcon />}
                  {item.name === 'Projects' && <ProjectsIcon />}
                  {item.name === 'Contact' && <ContactIcon />}
                </div>
                <span className="text-xs mt-1 font-medium leading-tight">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Global styles for proper spacing */}
      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 5rem !important;
          }
          main {
            padding-bottom: 5rem !important;
          }
        }
      `}</style>
    </>
  )
}