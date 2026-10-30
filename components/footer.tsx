import Container from "@/components/container"
import Image from "next/image"
import logo from "@/assets/images/logo.png"
import { navItemsData } from "@/lib/nav-items-data"
import { ArrowUpRight } from "lucide-react"
import s from "./footer.module.css"

export default function Footer({ onHome = false }: { onHome?: boolean }) {
  const homeLink = (url: string) => (onHome ? url.replace(/^\//, "") : url)
  return (
    <Container className="site-footer">
      <footer className="max-w-[1760px] mx-auto py-12 flex flex-col items-center justify-center gap-4">
        <a href={homeLink("/#home")} className="flex items-center gap-2.5">
          <Image
            src={logo}
            alt=""
            className="max-w-[32px]"
            width={32}
            height={35}
          />
          <span className="text-lg font-medium text-blue-600">Atheon</span>
        </a>
        <div className={s.details}>
          <p>Custom AI agents & business automation</p>
          <p>Based in Sri Lanka</p>
          <a href="mailto:contact@atheonworks.com">contact@atheonworks.com</a>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-700"
        >
          {navItemsData.map((navItem) => (
            <a
              href={homeLink(navItem.url)}
              key={navItem.id}
              className="hover:underline hover:underline-offset-4"
            >
              {navItem.name}
            </a>
          ))}
        </nav>
        <nav aria-label="Company and legal links" className={s.legal}>
          <a href="/privacy">Privacy policy</a>
          <a href="/terms">Website terms</a>
          <a
            href="https://www.linkedin.com/in/nirmal-piyumantha-3856501a5/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight size={16} aria-hidden="true" /> LinkedIn
            <span className="sr-only"> (new tab)</span>
          </a>
        </nav>
        <p className={s.copyright}>
          © {new Date().getFullYear()} Atheon. All rights reserved.
        </p>
      </footer>
    </Container>
  )
}
