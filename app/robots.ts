export const dynamic="force-static"
import type { MetadataRoute } from "next"
import { aboutData } from "@/lib/about-data"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${aboutData.publicBaseUrl}/sitemap.xml`,
  }
}
