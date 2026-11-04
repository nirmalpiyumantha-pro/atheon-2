"use client"

import { useEffect, useRef, useState } from "react"
import { Play, X } from "lucide-react"

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
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-[15px] rounded-[10px] border border-[#a9c7fa] bg-white px-[19px] py-[11px] text-sm leading-normal font-[550] text-(--brand) hover:border-(--brand) hover:bg-(--light) md:w-auto md:gap-[17px] md:px-[23px] md:py-3"
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
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[min(960px,calc(100vw-32px))] max-w-none overflow-auto rounded-[18px] border border-[#d1def1] bg-[#f1f5fb] p-0 text-[#14213d] shadow-[0_24px_100px_#071a3c40] backdrop:bg-[#091a36b8] backdrop:backdrop-blur-[5px] max-[601px]:rounded-xl"
        aria-labelledby="promo-title"
        onClose={() => {
          setOpen(false)
          trigger.current?.focus({ preventScroll: true })
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        <div>
          <header className="flex items-center justify-between gap-4 px-[18px] py-[14px] max-[601px]:px-3 max-[601px]:py-2.5">
            <h2
              id="promo-title"
              className="m-0 text-[17px] leading-[1.4] font-semibold"
            >
              See Atheon in action
            </h2>
            <button
              type="button"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-[#d1def1] bg-white text-[#14213d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-(--brand)"
              aria-label="Close video"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </header>
          <div className="aspect-video bg-[#071a36]">
            {open && (
              <iframe
                className="block size-full border-0"
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
