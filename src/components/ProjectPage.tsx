import CodePane from '@/components/CodePane'
import { MagickBoxDiagram, MagickWhisperDiagram } from '@/components/Diagrams'

type Project = {
  slug: string
  name: string
  tagline: string
  role: string
  period: string
  status: string
  stack: string[]
  links: { label: string; url: string }[]
  numbers: { label: string; value: string }[]
  sections: { heading: string; body: string }[]
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  'magick-box': MagickBoxDiagram,
  'magick-whisper': MagickWhisperDiagram,
}

export default function ProjectPage({ project }: { project: Project }) {
  const Diagram = DIAGRAMS[project.slug]

  return (
    <>
      <header className="mb-8">
        <span className="method">GET</span>
        <code className="mono ml-2 text-xs" style={{ color: 'var(--muted)' }}>
          /v1/projects/{project.slug}
        </code>
        <h1 className="mt-3 text-[28px] font-bold">{project.name}</h1>
        <p className="mt-1 max-w-[62ch] text-[15px]" style={{ color: 'var(--muted)' }}>
          {project.tagline}
        </p>
        <p className="mono mt-3 text-[12px]" style={{ color: 'var(--muted)' }}>
          {project.role} · {project.period} · {project.status}
        </p>
        {project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a key={l.url} className="link-accent mono text-[12.5px]" href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {project.numbers.map((n) => (
          <div key={n.label} className="panel p-3.5">
            <div className="mono text-[20px] font-bold leading-none" style={{ color: 'var(--accent)' }}>
              {n.value}
            </div>
            <div className="mt-1.5 text-[11.5px]" style={{ color: 'var(--muted)' }}>
              {n.label}
            </div>
          </div>
        ))}
      </section>

      {Diagram && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">How it fits together</h2>
          <Diagram />
        </section>
      )}

      <section className="mb-8">
        {project.sections.map((s) => (
          <div key={s.heading} className="mb-6">
            <h2 className="mb-2 text-[16px] font-bold">{s.heading}</h2>
            <p className="max-w-[68ch] text-[14px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Stack</h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>

      <CodePane path={`/v1/projects/${project.slug}.json`} body={project} maxHeight={360} />
    </>
  )
}
