import type { ReactNode } from "react"
import Footer from "@/components/footer"
import s from "./legal-page.module.css"

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <>
      <main id="main-content" className={s.page}>
        <a href="/" className={s.back}>
          Back to Atheon
        </a>
        <header>
          <span className="section-tag">Atheon</span>
          <h1>{title}</h1>
          <p className={s.date}>Last updated: 29 October 2026</p>
          <p className={s.intro}>{intro}</p>
        </header>
        <div className={s.content}>{children}</div>
      </main>
      <Footer />
    </>
  )
}
