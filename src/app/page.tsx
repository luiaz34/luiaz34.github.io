import Link from 'next/link'
import profile from '@/content/profile.json'
import projects from '@/content/projects.json'

const NUMBERS = [
  { value: '3', label: 'years building backends' },
  { value: '~250', label: 'REST endpoints shipped' },
  { value: '315', label: 'backend tests written' },
  { value: '2', label: 'apps live in the stores' },
]

export default function Home() {
  return (
    <>
      <section className="mb-12">
        <p className="eyebrow mb-4">{profile.title}</p>
        <h1 className="grad-text max-w-[16ch] text-[38px] font-bold leading-[1.05] tracking-tight sm:text-[54px]">
          {profile.name}
        </h1>
        <p className="mono mt-3 text-[13px]" style={{ color: 'var(--muted)' }}>
          {profile.location} · Python · Go · distributed systems
        </p>
        <p className="mt-6 max-w-[64ch] text-[15.5px] leading-relaxed" style={{ color: '#c6d4ec' }}>
          {profile.summary}
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href="/projects/magick-box/" className="btn btn-primary">
            Read the case studies
          </Link>
          <a className="btn" href="/cv/Khaing_Myal_Htike_CV_2026.pdf">
            Download CV
          </a>
          <a className="btn" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>
      </section>

      <section className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {NUMBERS.map((n) => (
          <div key={n.label} className="panel panel-lit p-4">
            <div className="grad-num mono text-[28px] font-bold leading-none">{n.value}</div>
            <div className="mt-2 text-[11.5px] leading-snug" style={{ color: 'var(--muted)' }}>
              {n.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-1.5 text-[19px] font-bold">What I work on</h2>
        <p className="mb-5 max-w-[64ch] text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          Services that have to stay up while something slow and unreliable happens behind them. Model
          calls, media renders, payment webhooks. The interesting part is never the happy path.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="panel panel-hover block p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[16px] font-semibold">{p.name}</h3>
                <span
                  className="mono shrink-0 text-[10.5px]"
                  style={{ color: p.status === 'live' ? 'var(--accent-2)' : 'var(--muted)' }}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {p.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
