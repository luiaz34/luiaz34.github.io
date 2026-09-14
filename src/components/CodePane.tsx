'use client'

import { useState } from 'react'

/** Minimal JSON colouring, done on the string so no highlighter ships to the browser. */
function paint(json: string) {
  const escaped = json.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)
  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let color = 'var(--accent-2)' // numbers
      if (/^"/.test(match)) color = /:$/.test(match) ? 'var(--ink)' : 'var(--accent)'
      else if (/true|false/.test(match)) color = 'var(--warn)'
      else if (/null/.test(match)) color = 'var(--muted)'
      return `<span style="color:${color}">${match}</span>`
    },
  )
}

export default function CodePane({
  method = 'GET',
  path,
  body,
  language = 'json',
  maxHeight = 420,
}: {
  method?: string
  path: string
  body: unknown
  language?: 'json' | 'text'
  maxHeight?: number
}) {
  const [tab, setTab] = useState<'response' | 'curl'>('response')
  const [copied, setCopied] = useState(false)

  const json = typeof body === 'string' ? body : JSON.stringify(body, null, 2)
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const curl = `curl -s ${origin}${base}${path} | jq`
  const shown = tab === 'curl' ? curl : json

  async function copy() {
    try {
      await navigator.clipboard.writeText(shown)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard blocked, nothing useful to do */
    }
  }

  return (
    <div className="panel overflow-hidden">
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderColor: 'var(--line)', background: 'var(--panel-2)' }}
      >
        <span className="method">{method}</span>
        <code className="truncate text-xs" style={{ color: 'var(--muted)' }}>
          {path}
        </code>
        <span className="ml-auto flex items-center gap-1">
          {(['response', 'curl'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="mono rounded px-2 py-0.5 text-[11px]"
              style={{
                color: tab === t ? 'var(--ink)' : 'var(--muted)',
                background: tab === t ? 'var(--panel)' : 'transparent',
                border: `1px solid ${tab === t ? 'var(--line)' : 'transparent'}`,
              }}
            >
              {t}
            </button>
          ))}
          <button
            onClick={copy}
            className="mono rounded px-2 py-0.5 text-[11px]"
            style={{ color: 'var(--muted)', border: '1px solid var(--line)' }}
          >
            {copied ? 'copied' : 'copy'}
          </button>
        </span>
      </div>
      <pre
        className="scroll-thin overflow-auto p-3 text-[12.5px] leading-[1.55]"
        style={{ maxHeight }}
      >
        {tab === 'curl' || language === 'text' ? (
          <code>{shown}</code>
        ) : (
          <code dangerouslySetInnerHTML={{ __html: paint(shown) }} />
        )}
      </pre>
    </div>
  )
}
