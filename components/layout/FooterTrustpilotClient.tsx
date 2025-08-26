"use client"

import { useEffect } from 'react'
import { TrustpilotClient } from '@/components/TrustpilotClient'

export default function FooterTrustpilotClient() {
  useEffect(() => {
    const placeholder = document.getElementById('trustpilot-placeholder')
    if (!placeholder) return

    // don't double-mount
    if (placeholder.dataset.mounted === '1') return
    placeholder.dataset.mounted = '1'

    const mount = document.createElement('div')
    placeholder.appendChild(mount)

    // Render TrustpilotClient into the mount node
    // We can't call ReactDOM.render here because Next provides the client runtime.
    // Instead, we create a small dynamic script that replaces the placeholder with the TrustBox markup
    // and ensure the Trustpilot script is present.

    // Add script if missing
    if (!document.getElementById('trustpilot-widget-script')) {
      const s = document.createElement('script')
      s.id = 'trustpilot-widget-script'
      s.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
      s.async = true
      document.body.appendChild(s)
    }

    // Insert markup
    mount.innerHTML = `
      <div
        class="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="68ad78780d777a86c73fe883"
        data-style-height="52px"
        data-style-width="100%"
        data-token="e968265e-e744-4644-b2a8-cf9faeed13d7"
      >
        <a href="https://www.trustpilot.com/review/smsupports.com" target="_blank" rel="noopener noreferrer">Trustpilot</a>
      </div>
    `

    return () => {
      // noop
    }
  }, [])

  return null
}
