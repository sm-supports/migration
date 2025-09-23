"use client"

import { useEffect } from 'react'

export function TrustpilotClient() {
  useEffect(() => {
    // Ensure script is only added once
    if (typeof window === 'undefined') return
    if (document.getElementById('trustpilot-widget-script')) return

    const s = document.createElement('script')
    s.id = 'trustpilot-widget-script'
    s.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    s.async = true
    document.body.appendChild(s)

    return () => {
      // don't remove script on unmount to keep widget intact across navigations
    }
  }, [])

  // Render the TrustBox placeholder markup - script will transform this after load
  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="68ad78780d777a86c73fe883"
      data-style-height="52px"
      data-style-width="100%"
      data-token="e968265e-e744-4644-b2a8-cf9faeed13d7"
    >
      <a href="https://www.trustpilot.com/review/smsupports.com" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  )
}
