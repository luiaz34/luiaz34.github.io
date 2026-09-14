import type { Metadata } from 'next'
import skills from '@/content/skills.json'

export const metadata: Metadata = { title: 'Skills — Khaing Myal Htike' }

export default function SkillsPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-[28px] font-bold">Skills</h1>
        <p className="mt-2 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          Everything listed here is in something that shipped, not something read about. The case studies
          say where each one was used.
        </p>
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {skills.groups.map((g) => (
          <section key={g.name} className="panel p-4">
            <h2 className="mono mb-2.5 text-[12px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              {g.name}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

    </>
  )
}
