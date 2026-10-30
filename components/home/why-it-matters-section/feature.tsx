import Image, { StaticImageData } from "next/image"

type Props = {
  image: {
    src: StaticImageData
    alt: string
  }
  title: string
  description: string
}

export default function Feature({ image, title, description }: Props) {
  return (
    <div className="feature-card">
      <div className="feature-image">
        <Image
          src={image.src}
          alt={image.alt}
          className="feature-image-content"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 280px"
        />
      </div>
      <div className="feature-copy">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  )
}
