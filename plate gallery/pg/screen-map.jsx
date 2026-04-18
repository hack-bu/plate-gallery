// USA map — periodic-table style.
// Each state is a card tile arranged in a rough geographic grid.
// Clicking one opens the state's gallery (shown as a panel on the right in this mock).

// Periodic-table-ish layout of US states — (col, row) 1-indexed.
// Not pixel-perfect geography — stylized, readable grid.
const STATE_GRID = [
  // row 1 — top tier
  { c: 'AK', name: 'Alaska',        col: 1,  row: 7, cnt: 12 },
  { c: 'ME', name: 'Maine',         col: 12, row: 1, cnt: 68 },
  // row 2
  { c: 'VT', name: 'Vermont',       col: 11, row: 2, cnt: 41 },
  { c: 'NH', name: 'New Hampshire', col: 12, row: 2, cnt: 55 },
  { c: 'WA', name: 'Washington',    col: 2,  row: 2, cnt: 184 },
  { c: 'ID', name: 'Idaho',         col: 3,  row: 2, cnt: 32 },
  { c: 'MT', name: 'Montana',       col: 4,  row: 2, cnt: 21 },
  { c: 'ND', name: 'North Dakota',  col: 5,  row: 2, cnt: 0 },
  { c: 'MN', name: 'Minnesota',     col: 6,  row: 2, cnt: 94 },
  { c: 'WI', name: 'Wisconsin',     col: 7,  row: 2, cnt: 77 },
  { c: 'MI', name: 'Michigan',      col: 9,  row: 2, cnt: 131 },
  { c: 'NY', name: 'New York',      col: 10, row: 2, cnt: 412 },
  { c: 'MA', name: 'Massachusetts', col: 11, row: 3, cnt: 224 },
  // row 3
  { c: 'OR', name: 'Oregon',        col: 2,  row: 3, cnt: 112 },
  { c: 'UT', name: 'Utah',          col: 3,  row: 3, cnt: 47 },
  { c: 'WY', name: 'Wyoming',       col: 4,  row: 3, cnt: 0 },
  { c: 'SD', name: 'South Dakota',  col: 5,  row: 3, cnt: 0 },
  { c: 'IA', name: 'Iowa',          col: 6,  row: 3, cnt: 38 },
  { c: 'IL', name: 'Illinois',      col: 7,  row: 3, cnt: 201 },
  { c: 'IN', name: 'Indiana',       col: 8,  row: 3, cnt: 88 },
  { c: 'OH', name: 'Ohio',          col: 9,  row: 3, cnt: 142 },
  { c: 'PA', name: 'Pennsylvania',  col: 10, row: 3, cnt: 198 },
  { c: 'NJ', name: 'New Jersey',    col: 11, row: 4, cnt: 161 },
  { c: 'CT', name: 'Connecticut',   col: 10, row: 4, cnt: 72 },
  { c: 'RI', name: 'Rhode Island',  col: 12, row: 3, cnt: 14 },
  // row 4
  { c: 'CA', name: 'California',    col: 2,  row: 4, cnt: 487 },
  { c: 'NV', name: 'Nevada',        col: 3,  row: 4, cnt: 59 },
  { c: 'CO', name: 'Colorado',      col: 4,  row: 4, cnt: 128 },
  { c: 'NE', name: 'Nebraska',      col: 5,  row: 4, cnt: 19 },
  { c: 'MO', name: 'Missouri',      col: 6,  row: 4, cnt: 64 },
  { c: 'KY', name: 'Kentucky',      col: 8,  row: 4, cnt: 51 },
  { c: 'WV', name: 'West Virginia', col: 9,  row: 4, cnt: 22 },
  { c: 'VA', name: 'Virginia',      col: 10, row: 5, cnt: 113 },
  { c: 'MD', name: 'Maryland',      col: 11, row: 5, cnt: 97 },
  { c: 'DE', name: 'Delaware',      col: 12, row: 5, cnt: 11 },
  { c: 'DC', name: 'D.C.',          col: 10, row: 6, cnt: 33, special: true },
  // row 5
  { c: 'AZ', name: 'Arizona',       col: 3,  row: 5, cnt: 86 },
  { c: 'NM', name: 'New Mexico',    col: 4,  row: 5, cnt: 0 },
  { c: 'KS', name: 'Kansas',        col: 5,  row: 5, cnt: 28 },
  { c: 'OK', name: 'Oklahoma',      col: 6,  row: 5, cnt: 34 },
  { c: 'AR', name: 'Arkansas',      col: 7,  row: 5, cnt: 0 },
  { c: 'TN', name: 'Tennessee',     col: 8,  row: 5, cnt: 81 },
  { c: 'NC', name: 'N. Carolina',   col: 9,  row: 5, cnt: 118 },
  // row 6
  { c: 'TX', name: 'Texas',         col: 6,  row: 6, cnt: 398 },
  { c: 'LA', name: 'Louisiana',     col: 7,  row: 6, cnt: 45 },
  { c: 'MS', name: 'Mississippi',   col: 8,  row: 6, cnt: 0 },
  { c: 'AL', name: 'Alabama',       col: 9,  row: 6, cnt: 31 },
  { c: 'GA', name: 'Georgia',       col: 10, row: 7, cnt: 124 },
  { c: 'SC', name: 'S. Carolina',   col: 11, row: 6, cnt: 48 },
  // row 7 — bottom
  { c: 'HI', name: 'Hawaii',        col: 2,  row: 7, cnt: 74 },
  { c: 'FL', name: 'Florida',       col: 11, row: 7, cnt: 221 },
];

function ScreenMap() {
  return (
    <BrowserFrame url="plategallery.us/map" width={1280} height={1020}>
      <TopNav active="map" />
      <div style={{ padding: '20px 32px', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
          <div>
            <div style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5, marginBottom: 4 }}>
              50 STATES + 1 DISTRICT · A LIVING INDEX
            </div>
            <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 70, color: PG.c.ink, letterSpacing: -2, lineHeight: 0.9 }}>
              THE PERIODIC TABLE OF PLATES.
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <Pill bg={PG.c.mustardLite}>41 / 51 UNLOCKED</Pill>
            <Pill bg={PG.c.paper}>12,104 TOTAL PLATES</Pill>
            <Pill bg={PG.c.cobalt} fg={PG.c.cream}>SORT BY: VOLUME ▾</Pill>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 14, alignItems: 'center',
          marginTop: 14, marginBottom: 14,
          fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkSoft, letterSpacing: 0.8,
        }}>
          LEGEND:
          <LegendSwatch color={PG.c.paperEdge} label="LOCKED" />
          <LegendSwatch color="#e9d8a8" label="1–24 PLATES" />
          <LegendSwatch color={PG.c.mustard} label="25–99" />
          <LegendSwatch color="#e87a47" label="100–249" />
          <LegendSwatch color={PG.c.rust} label="250+" />
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: PG.c.ink }}>
            CURRENTLY VIEWING <StateBadge code="MA" /> MASSACHUSETTS (224)
          </div>
        </div>

        {/* Grid + detail panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, height: 'calc(100% - 180px)' }}>
          <StateGrid />
          <StateQuickPeek />
        </div>
      </div>
    </BrowserFrame>
  );
}

function LegendSwatch({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 14, height: 14, background: color, borderRadius: 3, border: `1.5px solid ${PG.c.rule}` }} />
      {label}
    </span>
  );
}

function StateGrid() {
  const cols = 12, rows = 7;
  const cell = 72, gap = 8;
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  return (
    <div style={{
      background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
      borderRadius: 18, padding: 24, boxShadow: `0 3px 0 ${PG.c.rule}`,
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'relative',
        width: w, height: h, margin: '0 auto',
      }}>
        {/* Background grid dots */}
        {Array.from({ length: cols }).map((_, c) =>
          Array.from({ length: rows }).map((_, r) => (
            <div key={`${c}-${r}`} style={{
              position: 'absolute',
              left: c * (cell + gap), top: r * (cell + gap),
              width: cell, height: cell,
              border: `1px dashed ${PG.c.paperEdge}`, borderRadius: 6,
            }} />
          ))
        )}
        {STATE_GRID.map(s => (
          <StateTile key={s.c} s={s} cell={cell} gap={gap} active={s.c === 'MA'} />
        ))}
      </div>
    </div>
  );
}

function volColor(cnt) {
  if (cnt === 0) return PG.c.paperEdge;
  if (cnt < 25) return '#e9d8a8';
  if (cnt < 100) return PG.c.mustard;
  if (cnt < 250) return '#e87a47';
  return PG.c.rust;
}

function StateTile({ s, cell, gap, active }) {
  const locked = s.cnt === 0;
  const bg = volColor(s.cnt);
  const isHot = s.cnt >= 250;
  const fg = isHot ? PG.c.cream : PG.c.ink;
  return (
    <div style={{
      position: 'absolute',
      left: (s.col - 1) * (cell + gap), top: (s.row - 1) * (cell + gap),
      width: cell, height: cell,
      background: bg,
      border: active ? `2.5px solid ${PG.c.ink}` : `1.5px solid ${PG.c.rule}`,
      borderRadius: 6,
      boxShadow: active ? `0 4px 0 ${PG.c.ink}` : (locked ? 'none' : `0 2px 0 ${PG.c.rule}`),
      padding: 6,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      opacity: locked ? 0.6 : 1,
      transform: active ? 'translate(0, -2px)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: PG.f.mono, fontWeight: 700, fontSize: 9, color: fg, opacity: 0.65 }}>
          {s.col}·{s.row}
        </div>
        {locked && <div style={{ fontSize: 10 }}>🔒</div>}
      </div>
      <div>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 26, color: fg,
          lineHeight: 0.85, letterSpacing: -0.5,
        }}>{s.c}</div>
        <div style={{
          fontFamily: PG.f.mono, fontSize: 9, fontWeight: 700, color: fg,
          opacity: 0.75, marginTop: 2,
        }}>
          {locked ? '— — —' : String(s.cnt).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}

function StateQuickPeek() {
  return (
    <div style={{
      background: PG.c.ink, color: PG.c.cream, borderRadius: 18,
      border: `1.5px solid ${PG.c.rule}`, padding: 20,
      boxShadow: `0 3px 0 ${PG.c.rule}`, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StateBadge code="MA" />
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: PG.c.mustard }}>
          HOVERED
        </div>
      </div>
      <div style={{
        fontFamily: PG.f.display, fontWeight: 900, fontSize: 54,
        color: PG.c.cream, letterSpacing: -1.5, lineHeight: 0.85,
      }}>
        MASSA-<br/>CHUSETTS.
      </div>
      <div style={{ fontSize: 12, color: PG.c.mustard, fontWeight: 700 }}>
        Spirit of America · 224 plates · 41 creators
      </div>

      <div style={{
        padding: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 10,
        border: `1px dashed rgba(245,236,220,0.25)`,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: PG.c.mustard, marginBottom: 8 }}>
          #1 IN STATE
        </div>
        <Plate text="GOBOSTON" state="MA" width={280} />
        <div style={{ display: 'flex', gap: 10, marginTop: 10, fontSize: 11, fontWeight: 700 }}>
          <span>▲ 612</span>
          <span>💬 88</span>
          <span style={{ marginLeft: 'auto', color: PG.c.mustard }}>by @robinjamal</span>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: PG.c.mustard, marginBottom: 6 }}>
          ALSO TRENDING
        </div>
        {[
          { t: 'WICKED1', up: 411 },
          { t: 'CHOWDAH', up: 287 },
          { t: 'BOSOX4EV', up: 264 },
        ].map((p, i) => (
          <div key={p.t} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0', borderTop: i === 0 ? 'none' : '1px dashed rgba(245,236,220,0.2)',
          }}>
            <span style={{ fontFamily: PG.f.mono, fontSize: 10, color: PG.c.mustard, width: 16 }}>0{i + 2}</span>
            <div style={{
              fontFamily: PG.f.display, fontWeight: 900, fontSize: 20, color: PG.c.cream,
              letterSpacing: -0.3, flex: 1,
            }}>{p.t}</div>
            <span style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700 }}>▲ {p.up}</span>
          </div>
        ))}
      </div>

      <button style={{
        marginTop: 'auto', height: 46, borderRadius: 999,
        background: PG.c.rust, color: PG.c.white, border: 'none',
        fontFamily: PG.f.display, fontWeight: 900, fontSize: 20, letterSpacing: 0.3,
        boxShadow: `0 3px 0 ${PG.c.rustDeep}`, cursor: 'pointer',
      }}>ENTER MASSACHUSETTS →</button>
    </div>
  );
}

Object.assign(window, { ScreenMap, STATE_GRID });
