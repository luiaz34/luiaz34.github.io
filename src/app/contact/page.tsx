import type { Metadata } from 'next'
import profile from '@/content/profile.json'

export const metadata: Metadata = { title: 'Contact — Khaing Myal Htike' }

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { label: 'GitHub', value: 'github.com/luiaz34', href: 'https://github.com/luiaz34' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/khaing-myal-htike-261705256',
    href: 'https://www.linkedin.com/in/khaing-myal-htike-261705256',
  },
  { label: 'Product', value: 'magickbox.ai', href: 'https://magickbox.ai' },
]

export default function ContactPage() {
  return (
    <>
      <header className="mb-8 flex items-start gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/khaing.webp"
          alt="Khaing Myal Htike"
          width={84}
          height={84}
          className="hidden h-[84px] w-[84px] shrink-0 rounded-full sm:block"
          style={{
            border: '1px solid rgba(125,165,255,0.4)',
            boxShadow: '0 0 30px -12px rgba(77,163,255,0.8)',
          }}
        />
        <div>
        <p className="eyebrow mb-3">Get in touch</p>
        <h1 className="grad-text text-[32px] font-bold tracking-tight">Contact</h1>
        <p className="mt-2 max-w-[62ch] text-sm" style={{ color: 'var(--muted)' }}>
          Based in {profile.location}, open to backend and platform work. Email is the fastest way to
          reach me.
        </p>
        </div>
      </header>

      <section className="panel panel-lit mb-6 divide-y" style={{ borderColor: 'var(--line)' }}>
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
        <h2 className="mb-3 text-[19px] font-bold">CV</h2>
        <div className="flex flex-wrap gap-2">
          <a
            className="btn btn-primary"
            href="/cv/Khaing_Myal_Htike_CV_2026.pdf"
          >
            Download CV (PDF)
          </a>
          <a
            className="btn"
            href="/cv/Khaing_Myal_Htike_CV_2026_no_photo.pdf"
          >
            Without photo
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[19px] font-bold">Languages</h2>
        <div className="flex flex-wrap gap-1.5">
          {profile.languages_spoken.map((l) => (
            <span key={l.language} className="chip">
              {l.language} · {l.level}
            </span>
          ))}
        </div>
      </section>

    </>
  )
}
