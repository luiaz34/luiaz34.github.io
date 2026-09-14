'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ROUTES = [
  { href: '/', method: 'GET', path: '/', label: 'index' },
  { href: '/experience/', method: 'GET', path: '/v1/experience', label: 'experience' },
  { href: '/projects/magick-box/', method: 'GET', path: '/v1/projects/magick-box', label: 'magick-box' },
  {
    href: '/projects/magick-whisper/',
    method: 'GET',
    path: '/v1/projects/magick-whisper',
    label: 'magick-whisper',
  },
  { href: '/skills/', method: 'GET', path: '/v1/skills', label: 'skills' },
  { href: '/contact/', method: 'GET', path: '/v1/profile', label: 'contact' },
]

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'dark'
    setTheme(saved)
    document.documentElement.dataset.theme = saved
  }, [])

  function flip() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode, the choice just will not persist */
    }
  }

  return (
    <button
      onClick={flip}
      className="mono rounded px-2 py-1 text-[11px]"
      style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
      aria-label="Switch between dark and light"
    >
      {theme === 'dark' ? 'dark' : 'light'}
    </button>
  )
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const here = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ borderColor: 'var(--line)', background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-3">
          <Link href="/" className="mono text-sm font-bold">
            khaing<span style={{ color: 'var(--accent)' }}>.dev</span>
          </Link>
          <span
            className="mono hidden items-center gap-1.5 text-[11px] sm:flex"
            style={{ color: 'var(--muted)' }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--ok)' }}
            />
            200 OK
          </span>
          <span className="ml-auto flex items-center gap-2">
            <a
              className="mono hidden rounded px-2 py-1 text-[11px] sm:block"
              style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
              href="https://github.com/luiaz34"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
            <ThemeToggle />
            <button
              className="mono rounded px-2 py-1 text-[11px] lg:hidden"
              style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
              onClick={() => setOpen((o) => !o)}
            >
              menu
            </button>
          </span>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] gap-8 px-5 py-8">
        <aside className={`${open ? 'block' : 'hidden'} w-[210px] shrink-0 lg:block`}>
          <div className="sticky top-[72px]">
            <p className="mono mb-2 text-[11px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Endpoints
            </p>
            <nav className="flex flex-col gap-0.5">
              {ROUTES.map((r) => {
                const active = here(r.href)
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="mono rounded px-2 py-1.5 text-[12.5px]"
                    style={{
                      background: active ? 'var(--panel)' : 'transparent',
                      border: `1px solid ${active ? 'var(--line)' : 'transparent'}`,
                      color: active ? 'var(--ink)' : 'var(--muted)',
                    }}
                  >
                    <span style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}>GET </span>
                    {r.label}
                  </Link>
                )
              })}
            </nav>
            <p className="mono mt-5 text-[11px]" style={{ color: 'var(--muted)' }}>
              Every page here is also a JSON file. The paths are real.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <footer className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div
          className="mono mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-4 gap-y-1 px-5 py-5 text-[11.5px]"
          style={{ color: 'var(--muted)' }}
        >
          <span>Khaing Myal Htike</span>
          <span>Bangkok, Thailand</span>
          <a className="link-accent" href="mailto:khaingmyalhtike3400@gmail.com">
            khaingmyalhtike3400@gmail.com
          </a>
          <span className="ml-auto">static site, no server, no cookies</span>
        </div>
      </footer>
    </div>
  )
}
