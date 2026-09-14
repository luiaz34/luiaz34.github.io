import type { ReactNode } from 'react'

const NODE = {
  fill: 'var(--panel-2)',
  stroke: 'var(--line)',
  rx: 6,
}

function Box({
  x,
  y,
  w = 108,
  h = 40,
  title,
  sub,
  accent = false,
}: {
  x: number
  y: number
  w?: number
  h?: number
  title: string
  sub?: string
  accent?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={NODE.rx}
        fill={NODE.fill}
        stroke={accent ? 'var(--accent)' : NODE.stroke}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11.5"
        fontFamily="var(--mono)"
        fill="var(--ink)"
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 11}
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="var(--mono)"
          fill="var(--muted)"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({
  d,
  label,
  dashed = false,
  accent = false,
  labelX,
  labelY,
}: {
  d: string
  label?: string
  dashed?: boolean
  accent?: boolean
  labelX?: number
  labelY?: number
}) {
  const colour = accent ? 'var(--accent)' : 'var(--muted)'
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={colour}
        strokeWidth="1.3"
        strokeDasharray={dashed ? '4 3' : undefined}
        markerEnd={accent ? 'url(#head-accent)' : 'url(#head)'}
      />
      {label && labelX !== undefined && labelY !== undefined && (
        <text x={labelX} y={labelY} fontSize="9.5" fontFamily="var(--mono)" fill={colour} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <marker id="head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 z" fill="var(--muted)" />
      </marker>
      <marker id="head-accent" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 z" fill="var(--accent)" />
      </marker>
    </defs>
  )
}

function Frame({ caption, viewBox, children }: { caption: string; viewBox: string; children: ReactNode }) {
  return (
    <figure className="panel overflow-hidden">
      <div className="scroll-thin overflow-x-auto p-4">
        <svg viewBox={viewBox} className="h-auto w-full" style={{ minWidth: 640 }} role="img">
          <Defs />
          {children}
        </svg>
      </div>
      <figcaption
        className="mono border-t px-4 py-2 text-[11px]"
        style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

function Lane({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="9.5" fontFamily="var(--mono)" fill="var(--muted)" letterSpacing="0.06em">
      {text.toUpperCase()}
    </text>
  )
}

/** How a generation request returns in milliseconds while the work runs for minutes. */
export function MagickBoxDiagram() {
  return (
    <Frame
      caption="A generation request. The reply is immediate; the render finishes later and is pushed back."
      viewBox="0 0 720 220"
    >
      <Lane x={0} y={14} text="request" />
      <Lane x={350} y={14} text="background" />

      <Box x={0} y={26} w={100} title="client" sub="iOS / web" />
      <Box x={175} y={26} w={115} title="FastAPI" sub="21 packages" accent />
      <Box x={350} y={26} w={105} title="Celery" sub="acks late" />
      <Box x={515} y={26} w={115} title="provider" sub="Veo · Suno" />

      <Arrow d="M100,40 L171,40" label="POST /chat" labelX={136} labelY={33} />
      <Arrow d="M175,56 L104,56" label="202 pending" labelX={140} labelY={70} dashed />
      <Arrow d="M290,46 L346,46" label="enqueue" labelX={318} labelY={38} />
      <Arrow d="M455,46 L511,46" />

      <Box x={140} y={104} w={95} h={32} title="MongoDB" sub="~58 collections" />
      <Box x={245} y={104} w={95} h={32} title="Redis" sub="cache · limits" />
      <Arrow d="M218,66 L192,100" />
      <Arrow d="M248,66 L288,100" />

      <Box x={515} y={104} w={115} h={32} title="FFmpeg" sub="normalise" />
      <Arrow d="M572,66 L572,100" />

      <Box x={515} y={166} w={115} h={34} title="S3" sub="stored asset" />
      <Arrow d="M572,136 L572,162" />

      <Box x={350} y={166} w={105} h={34} title="Socket.IO" sub="Redis pub/sub" accent />
      <Arrow d="M511,183 L459,183" accent />
      <Arrow d="M350,183 L50,183 L50,70" label="streamed back to the client" labelX={200} labelY={196} accent />
    </Frame>
  )
}

/** Provider identity in, own short-lived session out. */
export function MagickWhisperDiagram() {
  return (
    <Frame
      caption="Sign-in. The provider proves who you are once; the API issues and rotates its own session."
      viewBox="0 0 720 225"
    >
      <Box x={0} y={26} w={104} title="Flutter app" sub="iOS · Android" />
      <Box x={150} y={26} w={116} title="Google / Apple" sub="OIDC issuer" />
      <Arrow d="M104,42 L146,42" label="sign in" labelX={125} labelY={35} />
      <Arrow d="M150,58 L108,58" label="ID token" labelX={129} labelY={72} dashed />

      <Box x={310} y={26} w={116} title="Go API" sub="Gin" accent />
      <Arrow
        d="M52,66 L52,124 L340,124 L340,70"
        label="POST /v1/auth/oauth"
        labelX={196}
        labelY={137}
      />

      <Box x={515} y={8} w={116} h={32} title="JWKS cache" sub="RS256 · ES256" />
      <Arrow d="M426,38 L511,26" label="verify" labelX={468} labelY={20} />

      <Box x={515} y={62} w={116} h={32} title="access token" sub="15 minutes" />
      <Arrow d="M426,50 L511,76" />

      <Box x={515} y={124} w={116} h={32} title="refresh token" sub="sha-256 only" />
      <Arrow d="M426,58 L470,140 L511,140" />

      <Arrow d="M515,156 L470,190 L395,190 L395,70" label="rotates on use" labelX={452} labelY={203} accent />

      <text x="0" y="190" fontSize="9.5" fontFamily="var(--mono)" fill="var(--muted)">
        no password is ever stored, sent
      </text>
      <text x="0" y="203" fontSize="9.5" fontFamily="var(--mono)" fill="var(--muted)">
        or checked anywhere in the system
      </text>
    </Frame>
  )
}
