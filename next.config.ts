import type { NextConfig } from "next"
const nextConfig:NextConfig={
  output:"export",trailingSlash:true,images:{unoptimized:true},
  ...(process.env.CONTACT_DEV_PORT ? { async rewrites() {
    return [{ source: "/api/contact", destination: `http://127.0.0.1:${process.env.CONTACT_DEV_PORT}/api/contact` }]
  } } : {}),
}
export default nextConfig
