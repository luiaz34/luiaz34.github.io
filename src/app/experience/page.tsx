import type { Metadata } from 'next'
import experience from '@/content/experience.json'
import profile from '@/content/profile.json'

export const metadata: Metadata = { title: 'Experience — Khaing Myal Htike' }

function period(start: string, end: string | null) {
  const fmt = (s: string) => {
    const [y, m] = s.split('-')
    return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m) - 1]} ${y}`
  }
  return `${fmt(start)} – ${end ? fmt(end) : 'present'}`
}

export default function ExperiencePage() {
  return (
    <>
      <header className="mb-8">
        <p className="eyebrow mb-3">Career</p>
        <h1 className="grad-text text-[32px] font-bold tracking-tight">Experience</h1>
        <p className="mt-2 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          Three years, two employers, and one long stretch of owning a production backend end to end.
        </p>
      </header>

      {experience.roles.map((role) => (
        <section key={role.id} className="mb-10">
          <div
            className="rule-left mb-4 pl-4"
          >
            <h2 className="text-lg font-bold">{role.company}</h2>
            <p className="mono text-[12.5px]" style={{ color: 'var(--muted)' }}>
              {role.title} · {role.location} · {period(role.start, role.end)}
            </p>
          </div>

          {role.products.map((product) => (
            <div key={product.name} className="panel panel-lit mb-4 p-5">
              <h3 className="text-[15px] font-semibold">{product.name}</h3>
              <p className="mb-3 text-[13px]" style={{ color: 'var(--muted)' }}>
                {product.blurb}
              </p>
              <ul className="space-y-1.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[13.5px] leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      <section className="mb-10">
        <h2 className="mb-3 text-[19px] font-bold">Education</h2>
        <div className="panel panel-lit p-5">
          <h3 className="text-[15px] font-semibold">{profile.education.school}</h3>
          <p className="mono text-[12.5px]" style={{ color: 'var(--muted)' }}>
            {profile.education.degree} · {profile.education.location} · {profile.education.years}
          </p>
        </div>
      </section>

    </>
  )
}
