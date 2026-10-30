"use client"

import { useEffect, useRef, useState } from "react"
import { Play, X } from "lucide-react"
import s from "./promo-player.module.css"

export function PromoPlayer() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="button button-outline"
        aria-haspopup="dialog"
        aria-controls="atheon-promo"
        onClick={() => {
          dialog.current?.showModal()
          setOpen(true)
        }}
      >
        <Play size={17} aria-hidden="true" />
        See Atheon in action
      </button>
      <dialog
        ref={dialog}
        id="atheon-promo"
        className={s.dialog}
        aria-labelledby="promo-title"
        onClose={() => {
          setOpen(false)
          trigger.current?.focus({ preventScroll: true })
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        <div className={s.content}>
          <header className={s.header}>
            <h2 id="promo-title">See Atheon in action</h2>
            <button
              type="button"
              className={s.close}
              aria-label="Close video"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </header>
          <div className={s.video}>
            {open && (
              <iframe
                src="https://www.youtube-nocookie.com/embed/8tAExH3B48Y?autoplay=1&playsinline=1&rel=0"
                title="Atheon promotional video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
