import type { NextConfig } from 'next'

/**
 * Static export for GitHub Pages. A repo named <account>.github.io serves from
 * the domain root, so no base path; set BASE_PATH when the repo is named
 * anything else and the site lives at /<repo>.
 */
const basePath = process.env.BASE_PATH ?? ''

const config: NextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default config
