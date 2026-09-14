'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/experience/', label: 'Experience' },
  { href: '/projects/magick-box/', label: 'Magick Box' },
  { href: '/projects/magick-whisper/', label: 'Magick Whisper' },
  { href: '/skills/', label: 'Skills' },
  { href: '/contact/', label: 'Contact' },
]

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const here = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30">
        {/* the lit edge that runs the width of the page */}
        <div
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, transparent, var(--accent) 22%, var(--accent-3) 58%, var(--accent-2) 80%, transparent)',
            opacity: 0.7,
          }}
        />
        <div
          className="border-b backdrop-blur-xl"
          style={{ borderColor: 'var(--line)', background: 'rgba(5, 9, 21, 0.72)' }}
        >
          <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-3.5">
            <Link href="/" className="mono text-sm font-bold tracking-tight">
              khaing
              <span
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                .dev
              </span>
            </Link>

            <span className="ml-auto flex items-center gap-2">
              <a
                className="btn !hidden !px-2.5 !py-1.5 !text-[11px] sm:!inline-flex"
                href="https://github.com/luiaz34"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="btn !px-2.5 !py-1.5 !text-[11px]" href="/cv/Khaing_Myal_Htike_CV_2026.pdf">
                CV
              </a>
              <button
                className="btn !px-2.5 !py-1.5 !text-[11px] lg:!hidden"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
              >
                Menu
              </button>
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] gap-9 px-5 py-9">
        <aside className={`${open ? 'block' : 'hidden'} w-[200px] shrink-0 lg:block`}>
          <nav className="sticky top-[86px] flex flex-col gap-1">
            {ROUTES.map((r) => {
              const active = here(r.href)
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="relative rounded-lg px-3 py-2 text-[13px] transition-colors"
                  style={{
                    background: active ? 'rgba(125,165,255,0.08)' : 'transparent',
                    border: `1px solid ${active ? 'var(--line)' : 'transparent'}`,
                    color: active ? 'var(--ink)' : 'var(--muted)',
                  }}
                >
                  {active && (
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: -1,
                        top: 8,
                        bottom: 8,
                        width: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(180deg, var(--accent), var(--accent-3))',
                        boxShadow: '0 0 12px rgba(77,163,255,0.8)',
                      }}
                    />
                  )}
                  {r.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <footer className="mt-8 border-t" style={{ borderColor: 'var(--line)' }}>
        <div
          className="mono mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-5 gap-y-1.5 px-5 py-6 text-[11.5px]"
          style={{ color: 'var(--muted)' }}
        >
          <span style={{ color: 'var(--ink)' }}>Khaing Myal Htike</span>
          <span>Bangkok, Thailand</span>
          <a className="link-accent" href="mailto:khaingmyalhtike3400@gmail.com">
            khaingmyalhtike3400@gmail.com
          </a>
          <span className="ml-auto">Open to backend and platform work</span>
        </div>
      </footer>
    </div>
  )
}
