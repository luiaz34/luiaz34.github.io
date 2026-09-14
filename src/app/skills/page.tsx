import type { Metadata } from 'next'
import CodePane from '@/components/CodePane'
import skills from '@/content/skills.json'

export const metadata: Metadata = { title: 'Skills — Khaing Myal Htike' }

export default function SkillsPage() {
  return (
    <>
      <header className="mb-8">
        <span className="method">GET</span>
        <code className="mono ml-2 text-xs" style={{ color: 'var(--muted)' }}>
          /v1/skills
        </code>
        <h1 className="mt-3 text-[28px] font-bold">Skills</h1>
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

      <CodePane path="/v1/skills.json" body={skills} maxHeight={340} />
    </>
  )
}
