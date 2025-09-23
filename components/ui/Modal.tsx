 'use client'

import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-background rounded-2xl shadow-2xl max-w-xl w-full mx-4 p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
