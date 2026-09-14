import type { Metadata } from 'next'
import CodePane from '@/components/CodePane'
import profile from '@/content/profile.json'

export const metadata: Metadata = { title: 'Contact — Khaing Myal Htike' }

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { label: 'GitHub', value: 'github.com/luiaz34', href: 'https://github.com/luiaz34' },
  { label: 'Product', value: 'magickbox.ai', href: 'https://magickbox.ai' },
]

export default function ContactPage() {
  return (
    <>
      <header className="mb-8">
        <span className="method">GET</span>
        <code className="mono ml-2 text-xs" style={{ color: 'var(--muted)' }}>
          /v1/profile
        </code>
        <h1 className="mt-3 text-[28px] font-bold">Contact</h1>
        <p className="mt-2 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          Based in {profile.location}, open to backend and platform work. Email is the fastest way to
          reach me.
        </p>
      </header>

      <section className="panel mb-6 divide-y" style={{ borderColor: 'var(--line)' }}>
        {LINKS.map((l) => (
          <div key={l.label} className="flex items-baseline gap-4 px-4 py-3" style={{ borderColor: 'var(--line)' }}>
            <span className="mono w-[70px] shrink-0 text-[11.5px]" style={{ color: 'var(--muted)' }}>
              {l.label}
            </span>
            <a className="link-accent mono text-[13px]" href={l.href}>
              {l.value}
            </a>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">CV</h2>
        <div className="flex flex-wrap gap-2">
          <a
            className="mono rounded px-3 py-2 text-[12.5px] font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            href="/cv/Khaing_Myal_Htike_CV_2026.pdf"
          >
            Download CV (PDF)
          </a>
          <a
            className="mono rounded px-3 py-2 text-[12.5px]"
            style={{ border: '1px solid var(--line)' }}
            href="/cv/Khaing_Myal_Htike_CV_2026_no_photo.pdf"
          >
            Without photo
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Languages</h2>
        <div className="flex flex-wrap gap-1.5">
          {profile.languages_spoken.map((l) => (
            <span key={l.language} className="chip">
              {l.language} · {l.level}
            </span>
          ))}
        </div>
      </section>

      <CodePane path="/v1/profile.json" body={profile} maxHeight={340} />
    </>
  )
}
