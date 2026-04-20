import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useMapSummary, useStateLeaderboard } from '@/hooks/useApi'
import { Plate } from '@/components/Plate'
import { StateBadge } from '@/components/StateBadge'
import { Pill } from '@/components/Pill'
import { PG } from '@/lib/design'
import { US_STATES } from '@/lib/states'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const FIPS_TO_CODE: Record<string, string> = {
  '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT',
  '10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL',
  '18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD',
  '25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE',
  '32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND',
  '39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD',
  '47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
  '55':'WI','56':'WY',
}

function volColor(cnt: number) {
  if (cnt === 0) return PG.c.paperEdge
  if (cnt < 25) return '#e9d8a8'
  if (cnt < 100) return PG.c.mustard
  if (cnt < 250) return '#e87a47'
  return PG.c.rust
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-3.5 w-3.5 rounded-sm border-[1.5px] border-rule" style={{ background: color }} />
      {label}
    </span>
  )
}

function QuickPeek({ code, name, count }: { code: string; name: string; count: number }) {
  const { data } = useStateLeaderboard(code, 'all', 4)
  const top = data?.items?.[0]
  const others = (data?.items ?? []).slice(1, 4)
  const navigate = useNavigate()

  // Scale the display name so long names ("Massachusetts", "Pennsylvania") don't overflow the 340px panel.
  const upper = name.toUpperCase()
  const longest = upper.split(' ').reduce((a, w) => Math.max(a, w.length), 0)
  const nameSize = longest >= 13 ? 30 : longest >= 10 ? 36 : longest >= 8 ? 40 : 44

  return (
    <div
      className="flex h-full flex-col gap-3 overflow-hidden rounded-[18px] border-[1.5px] border-rule bg-ink p-5 text-cream"
      style={{ boxShadow: '0 3px 0 var(--color-rule)' }}
    >
      <div className="flex items-center gap-2">
        <StateBadge code={code} />
        <div className="font-mono text-[10px] font-bold uppercase tracking-wide text-mustard">
          HOVERED
        </div>
      </div>
      <div
        className="font-display font-black uppercase leading-[0.88] tracking-[-1px] text-cream break-words"
        style={{ fontSize: nameSize }}
      >
        {upper}.
      </div>
      <div className="text-[12px] font-bold text-mustard">
        {count} plates {count === 0 && '· locked'}
      </div>

      {top ? (
        <div className="rounded-lg border border-dashed border-cream/25 bg-white/5 p-3">
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wide text-mustard">
            #1 in state
          </div>
          <Plate text={top.plate_text} state={top.state_code} width={260} />
          <div className="mt-2 flex gap-2.5 text-[11px] font-bold">
            <span>▲ {top.score}</span>
            <span>💬 {top.comment_count}</span>
            <span className="ml-auto text-mustard">by @{top.author?.display_name ?? 'anonymous'}</span>
          </div>
        </div>
      ) : count === 0 ? (
        <div className="rounded-lg border border-dashed border-cream/25 bg-white/5 p-3 text-[12px] font-semibold text-mustard">
          First uploader gets 50 bonus votes.
        </div>
      ) : null}

      {others.length > 0 && (
        <div>
          <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-mustard">
            Also trending
          </div>
          {others.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 py-2 text-[12px] font-bold"
              style={{ borderTop: i === 0 ? 'none' : '1px dashed rgba(245,236,220,0.2)' }}
            >
              <span className="w-4 font-mono text-[10px] text-mustard">0{i + 2}</span>
              <span className="flex-1 font-display text-[18px] font-black leading-none tracking-tight text-cream">
                {p.plate_text}
              </span>
              <span className="font-mono text-[11px]">▲ {p.score}</span>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate(`/states/${code}`)}
        disabled={count === 0}
        className="mt-auto h-11 rounded-full border-[1.5px] border-rule bg-rust font-display text-[18px] font-black tracking-wide text-white disabled:opacity-40"
        style={{ boxShadow: '0 3px 0 var(--color-rust-deep)' }}
      >
        ENTER {code} →
      </button>
    </div>
  )
}

const USMapChart = memo(function USMapChart({
  byCode,
  hovered,
  onHover,
  onSelect,
}: {
  byCode: Map<string, { count: number; name: string }>
  hovered: string
  onHover: (code: string) => void
  onSelect: (code: string) => void
}) {
  return (
    <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1050 }} width={880} height={520}>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const code = FIPS_TO_CODE[geo.id]
            if (!code) return null
            const cnt = byCode.get(code)?.count ?? 0
            const locked = cnt === 0
            const fill = volColor(cnt)
            const active = code === hovered
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => onHover(code)}
                onFocus={() => onHover(code)}
                onClick={() => !locked && onSelect(code)}
                tabIndex={0}
                role="link"
                aria-label={`${geo.properties.name}: ${cnt} plates`}
                style={{
                  default: {
                    fill,
                    stroke: PG.c.rule,
                    strokeWidth: active ? 2.5 : 1,
                    outline: 'none',
                    cursor: locked ? 'not-allowed' : 'pointer',
                    opacity: locked ? 0.65 : 1,
                  },
                  hover: {
                    fill,
                    stroke: PG.c.ink,
                    strokeWidth: 2.5,
                    outline: 'none',
                    cursor: locked ? 'not-allowed' : 'pointer',
                    opacity: locked ? 0.85 : 1,
                  },
                  pressed: { fill, outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
})

export default function States() {
  const { data, isLoading } = useMapSummary()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string>('MA')

  const byCode = new Map<string, { count: number; name: string }>()
  data?.states.forEach((s) => byCode.set(s.code, { count: s.plate_count, name: s.name }))

  const total = data?.states.reduce((a, s) => a + s.plate_count, 0) ?? 0
  const unlocked = data?.states.filter((s) => s.plate_count > 0).length ?? 0

  const hoveredCount = byCode.get(hovered)?.count ?? 0
  const hoveredName = byCode.get(hovered)?.name ?? US_STATES[hovered] ?? hovered

  return (
    <motion.main
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25 }}
      className="px-8 py-5"
    >
      <div className="flex flex-wrap items-end gap-5">
        <div>
          <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-ink-muted">
            50 states + 1 district · a living index
          </div>
          <h1 className="font-display text-[64px] font-black uppercase leading-[0.9] tracking-[-2px] text-ink">
            Plates across the country.
          </h1>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <Pill bg={PG.c.mustardLite}>{unlocked} / 51 UNLOCKED</Pill>
          <Pill bg={PG.c.paper}>{total.toLocaleString()} TOTAL PLATES</Pill>
        </div>
      </div>

      <div className="mt-3.5 mb-3.5 flex flex-wrap items-center gap-3.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-soft">
        <span>Legend:</span>
        <LegendSwatch color={PG.c.paperEdge} label="LOCKED" />
        <LegendSwatch color="#e9d8a8" label="1–24 PLATES" />
        <LegendSwatch color={PG.c.mustard} label="25–99" />
        <LegendSwatch color="#e87a47" label="100–249" />
        <LegendSwatch color={PG.c.rust} label="250+" />
        <div className="ml-auto flex items-center gap-1.5 text-ink">
          CURRENTLY VIEWING <StateBadge code={hovered} /> {hoveredName.toUpperCase()} ({hoveredCount})
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div
          className="overflow-hidden rounded-[18px] border-[1.5px] border-rule bg-paper p-4"
          style={{ boxShadow: '0 3px 0 var(--color-rule)' }}
        >
          {isLoading ? (
            <div className="flex h-[520px] items-center justify-center font-mono text-sm text-ink-muted">
              Loading state data…
            </div>
          ) : (
            <USMapChart
              byCode={byCode}
              hovered={hovered}
              onHover={setHovered}
              onSelect={(code) => navigate(`/states/${code}`)}
            />
          )}
        </div>

        <QuickPeek code={hovered} name={hoveredName} count={hoveredCount} />
      </div>
    </motion.main>
  )
}
