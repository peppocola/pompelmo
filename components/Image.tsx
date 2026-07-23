import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Static export with `images.unoptimized: true` bypasses next/image's loader,
// so basePath is never applied to local sources - prefix it ourselves.
const Image = ({ src, ...rest }: ImageProps) => {
  const resolvedSrc = typeof src === 'string' && src.startsWith('/') ? `${basePath}${src}` : src
  return <NextImage src={resolvedSrc} {...rest} />
}

export default Image
