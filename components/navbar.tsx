"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Menu, X } from "lucide-react"
import logo from "@/assets/images/logo.png"
import { navItemsData } from "@/lib/nav-items-data"
import { usePathname } from "next/navigation"
export default function Navbar() {
  const pathname = usePathname()
  const homeLink = (url: string) =>
    pathname === "/" ? url.replace(/^\//, "") : url
  const menu = useRef<HTMLDetailsElement>(null)
  const close = () => menu.current?.removeAttribute("open")
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu.current?.open) {
        close()
        menu.current.querySelector("summary")?.focus()
      }
    }
    const media = window.matchMedia("(min-width: 1120px)")
    const resized = () => {
      if (media.matches) close()
    }
    document.addEventListener("keydown", key)
    media.addEventListener("change", resized)
    return () => {
      document.removeEventListener("keydown", key)
      media.removeEventListener("change", resized)
    }
  }, [])
  return (
    <header className="site-nav">
      <div className="nav-shell">
        <a
          href={homeLink("/#home")}
          aria-label="Atheon home"
          className="brand"
          onClick={close}
        >
          <Image src={logo} alt="" width={33} height={36} priority />
          <span>Atheon</span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <ul>
            {navItemsData.map((item) => (
              <li key={item.id}>
                <a href={homeLink(item.url)}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={homeLink("/#contact-us")}
          className="button nav-contact"
          onClick={close}
        >
          Discuss your project <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <details ref={menu} className="mobile-menu">
          <summary aria-label="Toggle navigation" className="menu-toggle">
            <Menu className="menu-open-icon" aria-hidden="true" />
            <X className="menu-close-icon" aria-hidden="true" />
          </summary>
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {navItemsData.map((item) => (
              <a key={item.id} href={homeLink(item.url)} onClick={close}>
                {item.name}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
