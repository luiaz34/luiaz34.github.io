import type { Metadata } from 'next'
import ProjectPage from '@/components/ProjectPage'
import projects from '@/content/projects.json'

export const metadata: Metadata = { title: 'Magick Box — Khaing Myal Htike' }

const project = projects.projects.find((p) => p.slug === 'magick-box')!

export default function Page() {
  return <ProjectPage project={project} />
}
