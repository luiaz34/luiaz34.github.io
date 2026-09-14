import type { Metadata } from 'next'
import ProjectPage from '@/components/ProjectPage'
import projects from '@/content/projects.json'

export const metadata: Metadata = { title: 'Magick Whisper — Khaing Myal Htike' }

const project = projects.projects.find((p) => p.slug === 'magick-whisper')!

export default function Page() {
  return <ProjectPage project={project} />
}
