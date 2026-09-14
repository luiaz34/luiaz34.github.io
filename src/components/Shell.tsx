'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/experience/', label: 'Experience' },
  { href: '/projects/magick-box/', label: 'Magick Box' },
  { href: '/projects/magick-whisper/', label: 'Magick Whisper' },
  { href: '/skills/', label: 'Skills' },
  { href: '/contact/', label: 'Contact' },
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
            <nav className="flex flex-col gap-0.5">
              {ROUTES.map((r) => {
                const active = here(r.href)
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="rounded px-2 py-1.5 text-[13px]"
                    style={{
                      background: active ? 'var(--panel)' : 'transparent',
                      border: `1px solid ${active ? 'var(--line)' : 'transparent'}`,
                      color: active ? 'var(--ink)' : 'var(--muted)',
                    }}
                  >
                    {r.label}
                  </Link>
                )
              })}
            </nav>
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
          <span className="ml-auto">Open to backend and platform work</span>
        </div>
      </footer>
    </div>
  )
}
