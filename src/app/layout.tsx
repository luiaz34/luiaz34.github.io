import type { Metadata } from 'next'
import Shell from '@/components/Shell'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khaing Myal Htike — AI & Backend Developer',
  description:
    'Backend developer in Bangkok. Python and FastAPI, Go and Gin, PostgreSQL and MongoDB, Kubernetes. Built the backend behind Magick Box.',
  openGraph: {
    title: 'Khaing Myal Htike — AI & Backend Developer',
    description: 'Python, Go, distributed systems and AI pipelines. Based in Bangkok.',
    type: 'website',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
