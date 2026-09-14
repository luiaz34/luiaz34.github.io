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
        <p className="eyebrow mb-3">Case study</p>
        <h1 className="grad-text text-[32px] font-bold tracking-tight">{project.name}</h1>
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
          <div key={n.label} className="panel panel-lit p-3.5">
            <div className="grad-num mono text-[21px] font-bold leading-none">{n.value}</div>
            <div className="mt-1.5 text-[11.5px]" style={{ color: 'var(--muted)' }}>
              {n.label}
            </div>
          </div>
        ))}
      </section>

      {Diagram && (
        <section className="mb-8">
          <h2 className="mb-3 text-[19px] font-bold">How it fits together</h2>
          <Diagram />
        </section>
      )}

      <section className="mb-8">
        {project.sections.map((s) => (
          <div key={s.heading} className="mb-6">
            <h2 className="mb-2 text-[16.5px] font-bold">{s.heading}</h2>
            <p className="max-w-[68ch] text-[14px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[19px] font-bold">Stack</h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>

    </>
  )
}
