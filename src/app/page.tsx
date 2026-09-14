import Link from 'next/link'
import CodePane from '@/components/CodePane'
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
      <section className="grid-bg -mx-5 mb-10 border-b px-5 pb-10 pt-2" style={{ borderColor: 'var(--line)' }}>
        <p className="mono mb-3 text-[11.5px]" style={{ color: 'var(--accent)' }}>
          200 OK · content-type: application/json
        </p>
        <h1 className="max-w-[19ch] text-[34px] font-bold leading-[1.1] sm:text-[44px]">
          {profile.name}
        </h1>
        <p className="mono mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          {profile.title} · {profile.location}
        </p>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed">{profile.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/projects/magick-box/"
            className="mono rounded px-3 py-2 text-[12.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            Read the case studies
          </Link>
          <a
            className="mono rounded px-3 py-2 text-[12.5px]"
            style={{ border: '1px solid var(--line)' }}
            href="/cv/Khaing_Myal_Htike_CV_2026.pdf"
          >
            Download CV
          </a>
          <a
            className="mono rounded px-3 py-2 text-[12.5px]"
            style={{ border: '1px solid var(--line)' }}
            href={`mailto:${profile.email}`}
          >
            Email me
          </a>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {NUMBERS.map((n) => (
          <div key={n.label} className="panel p-4">
            <div className="mono text-[26px] font-bold leading-none" style={{ color: 'var(--accent)' }}>
              {n.value}
            </div>
            <div className="mt-1.5 text-[12px]" style={{ color: 'var(--muted)' }}>
              {n.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-1 text-lg font-bold">What I work on</h2>
        <p className="mb-4 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          Services that have to stay up while something slow and unreliable happens behind them. Model
          calls, media renders, payment webhooks. The interesting part is never the happy path.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}/`} className="panel block p-4 hover:border-current">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[15px] font-semibold">{p.name}</h3>
                <span className="mono text-[11px]" style={{ color: 'var(--muted)' }}>
                  {p.status}
                </span>
              </div>
              <p className="mt-1 text-[13px]" style={{ color: 'var(--muted)' }}>
                {p.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
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

      <section>
        <h2 className="mb-1 text-lg font-bold">This page, as data</h2>
        <p className="mb-4 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          The site is static, but every page has a JSON twin at a real path. Copy the curl and run it.
        </p>
        <CodePane path="/v1/profile.json" body={profile} maxHeight={340} />
      </section>
    </>
  )
}
