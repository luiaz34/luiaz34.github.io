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

/** Applies the saved theme before paint, so the page never flashes the wrong one. */
const THEME_BOOT = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
