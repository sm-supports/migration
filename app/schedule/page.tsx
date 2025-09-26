'use client'
import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { scheduleMeeting, getBookedTimeSlots, getTimeSlots } from '@/lib/meetingService';
import type { MeetingData } from '@/types';
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { TimezoneSelect } from '@/components/ui/TimezoneSelect'
import { getTimezone } from 'countries-and-timezones'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'] as const
type TimeSlot = typeof TIME_SLOTS[number]
type RpcSlot = { time_slot: string; is_booked: boolean }
type BookingFormData = { name: string; email: string; date?: Date; time: TimeSlot | ''; message: string; timezone?: string }
type FormErrors = Partial<Record<keyof BookingFormData, string>> & { submit?: string }
type BookedSlot = { time_slot: string; date: string }

function formatYMD(date?: Date): string {
  return date ? format(date, 'yyyy-MM-dd') : ''
}

export default function ScheduleMeeting() {
  const [isClient, setIsClient] = useState(false)
  const [step, setStep] = useState<number>(1)
  const [stepTransition, setStepTransition] = useState<number>(1)
  const [formData, setFormData] = useState<BookingFormData>({ name: '', email: '', date: undefined, time: '', message: '' })
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [rpcSlots, setRpcSlots] = useState<RpcSlot[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  // IP detection removed — only timezone is used
  const [timezoneList, setTimezoneList] = useState<string[] | null>(null)
  const [isDetectingTz, setIsDetectingTz] = useState(false)
  const [countryCode, setCountryCode] = useState<string | null>(null)

  // auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => { setIsClient(true) }, [])
  // detect timezone (server-assisted) then fallback to Intl; don't override if already set to a non-UTC value
  useEffect(() => {
    if (!isClient) return
    let mounted = true
    // Immediately populate timezone from the browser's Intl API so the field
    // is selected before any async detection completes.
    try {
      const instantTz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (instantTz && mounted) {
        setFormData(prev => ({ ...prev, timezone: prev.timezone || instantTz }))
      }
    } catch (e) {
      // ignore if Intl is not available
    }
    const detect = async () => {
      setIsDetectingTz(true)
      try {
        // Use client-side timezone detection since API routes are not available in static export
        const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        if (!mounted) return
        setFormData(prev => {
          // Only override if not set or set to UTC
          if (prev.timezone && prev.timezone !== 'UTC') return prev
          return { ...prev, timezone: detectedTimezone }
        })
        
        // Try to get country code from timezone (simplified detection)
        const timezoneToCountry: Record<string, string> = {
          'America/New_York': 'US',
          'America/Los_Angeles': 'US',
          'America/Chicago': 'US',
          'America/Denver': 'US',
          'Europe/London': 'GB',
          'Europe/Paris': 'FR',
          'Europe/Berlin': 'DE',
          'Europe/Rome': 'IT',
          'Europe/Madrid': 'ES',
          'Asia/Tokyo': 'JP',
          'Asia/Shanghai': 'CN',
          'Asia/Kolkata': 'IN',
          'Australia/Sydney': 'AU',
          'America/Toronto': 'CA',
          'America/Vancouver': 'CA',
        }
        const detectedCountry = timezoneToCountry[detectedTimezone] || 'US'
        setCountryCode(detectedCountry)

        // Next try ipapi.co directly from client with a short timeout as fallback
        try {
          const c2 = new AbortController()
          const t2 = setTimeout(() => c2.abort(), 2000)
          const r2 = await fetch('/api/ip', { signal: c2.signal });
          clearTimeout(t2)
          if (r2.ok) {
            let j2: any = null
            try { j2 = await r2.json() } catch { j2 = null }
            if (!mounted) return
            const tz = (j2 && j2.timezone) || detectedTimezone
            setFormData(prev => {
              if (prev.timezone && prev.timezone !== 'UTC') return prev
              return { ...prev, timezone: tz }
            })
            if (j2 && (j2.country_code || j2.country)) {
              setCountryCode(String(j2.country_code || j2.country).toUpperCase())
            }
            return
          }
        } catch (e) {
          // ignore and fallback to client-side detection
        }

        // Fallback for country: try navigator.language (e.g., en-US)
        try {
          const nav = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : ''
          const region = nav.includes('-') ? nav.split('-')[1] : ''
          if (region) setCountryCode(region.toUpperCase())
        } catch {}
      } finally {
        if (mounted) setIsDetectingTz(false)
      }
    }
    detect()
    return () => { mounted = false }
  }, [isClient])

  // Build timezone list (ensure current selection is included) in a separate effect
  useEffect(() => {
    if (!isClient) return
    let mounted = true
    try {
      // @ts-ignore - guard for environments without supportedValuesOf
      if (typeof Intl?.supportedValuesOf === 'function') {
        // @ts-ignore
        const vals = Intl.supportedValuesOf('timeZone') as string[]
        const current = formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        const valsWithCurrent = current && !vals.includes(current) ? [current, ...vals] : vals
        if (mounted) setTimezoneList(valsWithCurrent)
      } else {
        const current = formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        const small = [
          'UTC', 'Europe/London', 'Europe/Berlin', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'
        ]
        const valsWithCurrent = current && !small.includes(current) ? [current, ...small] : small
        if (mounted) setTimezoneList(valsWithCurrent)
      }
    } catch (e) {
      setTimezoneList(['UTC'])
    }
    return () => { mounted = false }
  }, [isClient, formData.timezone])
  useEffect(() => {
    if (step !== stepTransition) {
      const t = setTimeout(() => setStepTransition(step), 250)
      return () => clearTimeout(t)
    }
  }, [step, stepTransition])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!formData.date) { setBookedSlots([]); setRpcSlots(null); return }
      setIsLoading(true)
      try {
        const slots = await getBookedTimeSlots(formData.date)
        if (mounted) setBookedSlots(slots || [])
      } catch (e) {
        // Soft-fail: treat as zero booked slots
        if (mounted) setBookedSlots([])
      }
      try {
        const r = await getTimeSlots(formData.date)
        if (mounted) setRpcSlots(r ?? [])
      } catch (e) {
        if (mounted) setRpcSlots(null)
      } finally { if (mounted) setIsLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [formData.date])

  // Render gating is handled in the UI; avoid early returns before hooks to satisfy React rules-of-hooks

  // Helpers
  const codeToFlagEmoji = (code?: string | null) => {
    if (!code) return ''
    const cc = code.trim().toUpperCase()
    if (cc.length !== 2) return ''
    const A = 0x1F1E6
    const base = 'A'.charCodeAt(0)
    const chars = [cc.charCodeAt(0) - base + A, cc.charCodeAt(1) - base + A]
    return String.fromCodePoint(...chars)
  }
  const flagEmoji = codeToFlagEmoji(countryCode)

  const setField = (key: keyof BookingFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value }
      
      // Clear time selection when date changes to ensure valid combinations
      if (key === 'date' && prev.time) {
        updated.time = ''
      }
      
      return updated
    })
    setErrors(prev => {
      const updated = { ...prev, [key]: undefined }
      
      // Clear time error when date changes
      if (key === 'date') {
        updated.time = undefined
      }
      
      return updated
    })
  }
  // When timezone changes (incl. user manual change), map timezone -> primary country code
  useEffect(() => {
    const tz = formData.timezone
    if (!tz) return
    try {
      const tzInfo = getTimezone(tz)
      if (tzInfo && tzInfo.countries && tzInfo.countries.length > 0) {
        // Prefer the first associated country; for multi-country zones like Europe/Paris this should be FR
        setCountryCode(tzInfo.countries[0])
        return
      }
      // Some timezones might not map uniquely; try infer by region fallback from tz string
      const parts = tz.split('/')
      if (parts.length > 0) {
        const guess = parts[0].toUpperCase()
        // crude fallback for common regions
        const map: Record<string, string> = { 'AMERICA': 'US', 'EUROPE': 'DE', 'ASIA': 'IN', 'AUSTRALIA': 'AU', 'AFRICA': 'ZA' }
        if (map[guess]) setCountryCode(map[guess])
      }
    } catch {
      // ignore
    }
  }, [formData.timezone])
  // Determine if a slot is in the past relative to selected date and detected timezone
  const isSlotInPast = (slot: string): boolean => {
    if (!formData.date) return false
    const tz = formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    try {
      const now = new Date()
      const dateParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(now)
      const getVal = (type: string) => Number(dateParts.find(p => p.type === type)?.value || '0')
      const tzY = getVal('year')
      const tzM = getVal('month')
      const tzD = getVal('day')
      const timeParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(now)
      const tzH = Number(timeParts.find(p => p.type === 'hour')?.value || '0')
      const tzMin = Number(timeParts.find(p => p.type === 'minute')?.value || '0')

      const selY = formData.date.getFullYear()
      const selM = formData.date.getMonth() + 1
      const selD = formData.date.getDate()

      // If selected date is before today in the user's timezone, it's entirely in the past
      if (selY < tzY || (selY === tzY && (selM < tzM || (selM === tzM && selD < tzD)))) return true
      // If it's after today, definitely not past
      if (selY > tzY || (selY === tzY && (selM > tzM || (selM === tzM && selD > tzD)))) return false

      // Same day: compare time
      const [sh, sm] = slot.split(':').map(Number)
      if (sh < tzH) return true
      if (sh === tzH && sm <= tzMin) return true
      return false
    } catch {
      return false
    }
  }
  const validate = () => {
    const e: FormErrors = {}
    if (!formData.name) e.name = 'Name is required'
    if (!formData.email) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) e.email = 'Invalid email'
    if (!formData.date) e.date = 'Please select a date'
    if (!formData.time) e.time = 'Please select a time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Validation for step 1 (date and time selection)
  const validateStep1 = () => {
    const e: FormErrors = {}
    
    if (!formData.date && !formData.time) {
      e.date = 'Please select a date first'
      e.time = 'Please select a time slot'
      setToast({ type: 'error', message: 'Please select both a date and time slot to continue' })
    } else if (!formData.date) {
      e.date = 'Please select a date first'
      setToast({ type: 'error', message: 'Please select a date before choosing a time slot' })
    } else if (!formData.time) {
      e.time = 'Please select a time slot'
      setToast({ type: 'error', message: 'Please select an available time slot to continue' })
    }
    
    setErrors(prev => ({ ...prev, ...e }))
    return Object.keys(e).length === 0
  }

  // Handle step navigation with validation
  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
      // Clear any previous validation toasts
      if (toast?.type === 'error') {
        setToast(null)
      }
    }
  }
  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const meeting: MeetingData = {
        name: formData.name,
        email: formData.email,
        company: '',
        message: formData.message,
        date: formData.date!,
  timeSlot: formData.time as TimeSlot,
  // include timezone and ip for tracking (meetingService may accept extra fields)
  // cast to any to avoid strict typing issues if MeetingData doesn't include these fields
  ...(formData.timezone ? ({ timezone: formData.timezone } as any) : {}),
  // requester_ip removed intentionally
      }
      const res = await scheduleMeeting(meeting)
      if (res && (res as any).success) {
        // show toast about email delivery
        const emailInfo = (res as any).email
        if (emailInfo && emailInfo.ok) {
          setToast({ type: 'success', message: 'Confirmation email sent to you and admin.' })
        } else {
          const errMsg = emailInfo?.body?.error || emailInfo?.error || 'Email notifications failed to send.'
          setToast({ type: 'error', message: String(errMsg) })
        }
        setStep(3)
      } else {
        setErrors(prev => ({ ...prev, submit: 'Failed to schedule meeting' }))
      }
    } catch (err: any) {
      setErrors(prev => ({ ...prev, submit: err?.message ?? 'Failed to schedule meeting' }))
    } finally { setIsSubmitting(false) }
  }
  const isSlotBooked = (slot: TimeSlot): boolean => {
    if (!formData.date) return false
    const selDate = formatYMD(formData.date)
    return bookedSlots.some(b => b.date === selDate && b.time_slot === slot)
  }
  // If the selected time becomes invalid due to timezone or date changes, clear it
  useEffect(() => {
    if (!formData.time) return
    const selected = formData.time as TimeSlot
    const booked = isSlotBooked(selected)
    const past = isSlotInPast(selected)
    const rpcBooked = rpcSlots?.find(s => s.time_slot === selected)?.is_booked ?? false
    if (booked || rpcBooked || past) {
      setField('time', '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date, formData.timezone, JSON.stringify(rpcSlots)])
  const handleGoogleCalendar = () => {
    const details = encodeURIComponent(formData.message || 'Meeting Booking')
    const start = formData.date && formData.time
      ? format(formData.date, "yyyyMMdd") + "T" + formData.time.replace(":", "") + "00"
      : ''
    const end = formData.date && formData.time
      ? format(formData.date, "yyyyMMdd") + "T" + (+(formData.time.split(':')[0]) + 1).toString().padStart(2, '0') + formData.time.split(':')[1] + "00"
      : ''
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting&details=${details}&dates=${start}/${end}&ctz=UTC`
    window.open(url, "_blank")
  }
  const handleICSDownload = () => {
    if (!formData.date || !formData.time) return
    const dt = format(formData.date, "yyyyMMdd")
    const tm = formData.time.replace(":", "") + "00"
    const start = dt + "T" + tm
    const endHour = +(formData.time.split(':')[0]) + 1
    const end = dt + "T" + endHour.toString().padStart(2, '0') + formData.time.split(':')[1] + "00"
    const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Meeting
DTSTART;TZID=UTC:${start}
DTEND;TZID=UTC:${end}
DESCRIPTION:${formData.message || ''}
LOCATION:
END:VEVENT
END:VCALENDAR
`.trim()
    const blob = new Blob([ics], { type: 'text/calendar' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'meeting.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // --------- DESIGN ---------
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="w-full py-8 flex flex-col items-center bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent px-2">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center text-blue-900 dark:text-white leading-tight mb-2 md:mb-5">Book a Meeting with SM Supports</h1>
        {/* Stepper / Roadmap */}
        <div className="w-full max-w-full md:max-w-xl mb-2 md:mb-3">
          {(() => {
            const steps = [
              { label: 'Date & Time', isComplete: !!(formData.date && formData.time) },
              { label: 'Details', isComplete: step > 2 },
              { label: 'Confirmation', isComplete: step === 3 }
            ]
            return (
              <>
                <div className="flex items-center justify-between">
                  {steps.map((stepObj, idx) => (
                    <div key={idx} className="flex flex-col items-center w-[33%]">
                      <div className={`
                        flex items-center justify-center rounded-full border-2
                        w-8 h-8 md:w-9 md:h-9 font-bold text-base md:text-lg transition-all duration-300
                        ${stepObj.isComplete ? 'border-green-500 bg-green-500 text-white scale-105' :
                          step === idx + 1 ? 'border-blue-600 bg-blue-600 text-white' : 
                          'border-gray-300 bg-white text-gray-400 dark:bg-transparent dark:border-gray-600 dark:text-gray-400'}
                      `}>
                        {stepObj.isComplete ? '✓' : idx + 1}
                      </div>
                      <div className={`mt-2 font-semibold text-xs md:text-base transition-colors duration-300 text-center truncate
                        ${stepObj.isComplete ? 'text-green-600' : step === idx + 1 ? 'text-blue-700' : 'text-gray-400 dark:text-gray-400'}`}>
                        {stepObj.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  {steps.map((_, idx) => (
                    idx < steps.length - 1 ? (
                      <div
                        key={`bar-${idx}`}
                        className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                          step > idx + 1
                            ? 'bg-green-400'
                            : step === idx + 1
                              ? 'bg-blue-300'
                              : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ) : (
                      <div key={`sp-${idx}`} className="w-8" />
                    )
                  ))}
                </div>
              </>
            )
          })()}
        </div>
  <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 text-center max-w-lg mx-auto mt-2">Schedule a call: pick your slot, enter your details, and you&apos;re set.</p>
      </section>
      {/* Scheduler Card */}
      <section className="flex justify-center items-start py-6 md:py-8 px-2">
  <div className="w-full max-w-md md:max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg md:shadow-xl border border-gray-100 dark:border-gray-800 px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row gap-0 md:gap-12 transition-all duration-300">
          {/* Calendar Side (stacked on mobile) */}
          <div className="w-full md:w-1/2 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 md:pr-8 pb-6 md:pb-0 mb-6 md:mb-0">
            <h2 className="font-bold text-lg md:text-2xl text-blue-700 dark:text-blue-300 mb-2">Select a Date</h2>
            <DayPicker
              mode="single"
              selected={formData.date}
              onSelect={d => setField('date', d)}
              disabled={{ before: new Date(), after: addDays(new Date(), 30) }}
              className="mb-1"
              classNames={{
                months: "flex flex-col",
                day_selected: "bg-blue-600 text-white hover:bg-blue-700",
                day_today: "font-bold text-blue-600",
                day: "w-9 h-9 rounded-md font-medium",
              }}
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>
          {/* Main Content (stacked using block on mobile) */}
            <div className="w-full md:w-1/2 flex flex-col">
              {/* Step 1: Time Slot */}
              <div className={`transition-all duration-300 ${stepTransition === 1 ? "block" : "hidden"}`}>
                <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2">Choose a Time</h2>
                {!formData.date && (
                  <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 font-medium">
                      ⚠️ Please select a date first to view available time slots
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4">
                {(rpcSlots ?? TIME_SLOTS.map(t => ({ time_slot: t, is_booked: isSlotBooked(t as TimeSlot) }))).map(s => {
                  const past = isSlotInPast(s.time_slot)
                  const disabled = !formData.date || s.is_booked || past
                  return (
                  <button
                    key={s.time_slot}
                    disabled={disabled}
                    className={`
                      py-2 md:py-3 rounded-xl text-base font-semibold border shadow-sm
                      transition
                      ${disabled
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        : formData.time === s.time_slot
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'}
                    `}
                    onClick={() => {
                      if (!formData.date) {
                        setToast({ type: 'error', message: 'Please select a date first before choosing a time slot' })
                        setErrors(prev => ({ ...prev, date: 'Please select a date first' }))
                        return
                      }
                      if (!disabled) {
                        setField('time', formData.time === s.time_slot ? '' : s.time_slot)
                      }
                    }}
                    type="button"
                    title={!formData.date ? 'Please select a date first' : disabled ? 'This time slot is not available' : 'Select this time slot'}
                  >
                    {s.time_slot}
                  </button>
                )})}
              </div>
              {errors.time && <p className="text-xs text-red-500 mb-2">{errors.time}</p>}
              <Button
                className={`
                  w-full py-2 md:py-3 rounded-lg text-base md:text-lg font-bold shadow-sm transition-all
                  ${(!formData.date || !formData.time) 
                    ? 'bg-gray-400 text-gray-100 cursor-pointer hover:bg-gray-500' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                `}
                onClick={handleNextStep}
                aria-disabled={!formData.date || !formData.time}
                title={!formData.date ? 'Click to see what\'s required' : !formData.time ? 'Click to see what\'s required' : 'Continue to details'}
              >
                {!formData.date ? 'Select Date First' : !formData.time ? 'Select Time Slot' : 'Next'}
              </Button>
            </div>
            {/* Step 2: Details */}
            <form
              onSubmit={handleSubmit}
              className={`transition-all duration-300 space-y-5 md:space-y-6 ${stepTransition === 2 ? "block" : "hidden"}`}
            >
              <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2">Enter Your Details</h2>
              <Input
                name="name"
                value={formData.name}
                onChange={e => setField('name', e.target.value)}
                placeholder="Full Name"
                disabled={isSubmitting}
                className="mb-1"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={e => setField('email', e.target.value)}
                placeholder="Your Email"
                disabled={isSubmitting}
                className="mb-1"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              {/* Timezone (detected, editable) with country flag */}
              <div className="flex flex-col">
                <label className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <span>Timezone</span>
                  {flagEmoji && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 border border-gray-200 text-base">
                      {flagEmoji}
                    </span>
                  )}
                </label>
                {isDetectingTz ? (
                  // Allow the user to edit the timezone even while detection is in progress.
                  <Input
                    name="timezone"
                    value={formData.timezone || ''}
                    onChange={e => setField('timezone', e.target.value)}
                    placeholder="Timezone"
                    disabled={isSubmitting}
                    className="mb-1"
                  />
                ) : timezoneList ? (
                  <TimezoneSelect
                    value={formData.timezone || ''}
                    onChange={(tz) => setField('timezone', tz)}
                    timezones={timezoneList}
                    placeholder="Search and select timezone..."
                    disabled={isSubmitting}
                    className="mb-1"
                  />
                ) : (
                  <Input
                    name="timezone"
                    value={formData.timezone || ''}
                    onChange={e => setField('timezone', e.target.value)}
                    placeholder="Timezone"
                    disabled={isSubmitting}
                    className="mb-1"
                  />
                )}
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <span>Detected timezone: {formData.timezone ?? 'unknown'}</span>
                  {countryCode && (
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 border border-gray-200 text-xs">
                        {flagEmoji}
                      </span>
                      <span className="uppercase text-[10px] tracking-wide">{countryCode}</span>
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-2">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full md:w-1/3"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >← Back</Button>
                <Button
                  type="submit"
                  className="w-full md:w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                </Button>
              </div>
              {errors.submit && <p className="text-xs text-red-500">{errors.submit}</p>}
            </form>
            {/* Step 3: Confirmation */}
            <div className={`transition-all duration-300 ${stepTransition === 3 ? "flex" : "hidden"} flex-col items-center justify-center text-center min-h-[260px] md:min-h-[340px]`}>
              <div className="mb-3 md:mb-4 rounded-full bg-green-100 border-2 md:border-4 border-green-300 p-2 md:p-4 flex items-center justify-center">
                <span className="block text-green-700 text-3xl md:text-5xl">🎉</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-green-700 mb-2 md:mb-3">Booking Confirmed!</h2>
              <div className="mb-1 md:mb-2 text-gray-700 dark:text-gray-200 text-center text-base md:text-lg">
                <span className="block font-semibold">
                  {formData.name} ({formData.email})
                </span>
                <span className="my-1 md:my-2 block text-lg md:text-xl font-bold text-blue-700">
                  {formData.date && format(formData.date, "EEEE, MMM d, yyyy")} at {formData.time}
                </span>
              </div>
              <div className="flex flex-col w-full items-center mt-2 md:mt-4">
                <span className="text-xs md:text-sm font-semibold mb-1 text-blue-700">Add to your Calendar:</span>
                <div className="flex flex-row gap-2 md:gap-3 mb-3 md:mb-4">
                  <Button size="sm" variant="outline" onClick={handleGoogleCalendar}>Google</Button>
                  <Button size="sm" variant="outline" onClick={handleICSDownload}>Outlook/iCal</Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => { setStep(1); setStepTransition(1); setFormData({ name: '', email: '', date: undefined, time: '', message: '' }); }}
                  className="mt-2 underline text-blue-700"
                >Book another slot</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50 max-w-md w-full px-4" aria-live="polite">
          <div className={`rounded-lg p-3 sm:p-4 border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="mr-2">
                  <div className={`w-3 h-3 rounded-full ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`} />
                </div>
                <div className="flex flex-col text-sm sm:text-base">
                  <div className="font-semibold">{toast.type === 'success' ? 'Email sent' : 'Email failed'}</div>
                  <div className="mt-1">{toast.message}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => setToast(null)}>Dismiss</Button>
                <Badge variant={toast.type === 'success' ? 'default' : 'destructive'}>{toast.type === 'success' ? 'Success' : 'Error'}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
