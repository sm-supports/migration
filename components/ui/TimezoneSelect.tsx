'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, Search } from 'lucide-react'

interface TimezoneSelectProps {
  value: string
  onChange: (timezone: string) => void
  timezones: string[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function TimezoneSelect({ 
  value, 
  onChange, 
  timezones, 
  placeholder = "Select timezone...",
  disabled = false,
  className = ""
}: TimezoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTimezones, setFilteredTimezones] = useState(timezones)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Filter timezones based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTimezones(timezones)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = timezones.filter(timezone => 
      timezone.toLowerCase().includes(query) ||
      timezone.split('/').some(part => part.toLowerCase().includes(query))
    )
    setFilteredTimezones(filtered)
  }, [searchQuery, timezones])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (timezone: string) => {
    onChange(timezone)
    setIsOpen(false)
    setSearchQuery('')
  }

  const displayValue = value || placeholder

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main input/button */}
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full justify-between text-left font-normal
          ${!value && "text-muted-foreground"}
          ${disabled && "opacity-50 cursor-not-allowed"}
        `}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown className={`ml-2 h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchRef}
                type="text"
                placeholder="Search timezones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Timezone list */}
          <div className="max-h-60 overflow-auto">
            {filteredTimezones.length > 0 ? (
              filteredTimezones.map((timezone) => (
                <button
                  key={timezone}
                  type="button"
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground
                    transition-colors focus:bg-accent focus:text-accent-foreground focus:outline-none
                    ${value === timezone ? 'bg-accent text-accent-foreground font-medium' : ''}
                  `}
                  onClick={() => handleSelect(timezone)}
                >
                  {timezone}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No timezones found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}