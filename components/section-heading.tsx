import type { RefObject } from "react"
type Props = {
  tag: string
  heading: string
  subHeading: string
  tagRef: RefObject<HTMLSpanElement | null>
  headingRef: RefObject<HTMLHeadingElement | null>
  subHeadingRef: RefObject<HTMLParagraphElement | null>
}
export default function SectionHeading({
  tag,
  heading,
  subHeading,
  tagRef,
  headingRef,
  subHeadingRef,
}: Props) {
  return (
    <div className="section-heading">
      <span ref={tagRef} className="section-tag">
        {tag.trim()}
      </span>
      <h2 ref={headingRef}>{heading.trim()}</h2>
      <p ref={subHeadingRef}>{subHeading.trim()}</p>
    </div>
  )
}
