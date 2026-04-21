// Plate detail screen — one plate, gallery-style

function ScreenDetail() {
  return (
    <BrowserFrame url="plategallery.us/plate/surfsup-hi" width={1280} height={1020}>
      <TopNav active="feed" />
      <div style={{ padding: '20px 32px', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
        <Breadcrumb items={['Home', 'Hawaii 🌺', '#1 of all time', '“SURFSUP”']} />
        <div style={{
          marginTop: 16, display: 'grid',
          gridTemplateColumns: '1.35fr 1fr', gap: 24,
          height: 'calc(100% - 40px)',
        }}>
          <DetailPhotoPanel />
          <DetailSidePanel />
        </div>
      </div>
    </BrowserFrame>
  );
}

function Breadcrumb({ items }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 0.5,
    }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span style={{ color: i === items.length - 1 ? PG.c.ink : PG.c.inkSoft }}>{it}</span>
          {i < items.length - 1 && <span style={{ color: PG.c.inkMuted }}>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function DetailPhotoPanel() {
  return (
    <div style={{
      background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
      borderRadius: 18, boxShadow: `0 3px 0 ${PG.c.rule}`,
      padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {/* Big plate title */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 14 }}>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 86,
          color: PG.c.ink, letterSpacing: -2, lineHeight: 0.85,
        }}>
          “SURFSUP”
        </div>
        <div style={{ flex: 1 }}>
          <Pill bg={PG.c.rust} fg={PG.c.cream}>#1 HAWAII · ALL TIME</Pill>
        </div>
      </div>
      {/* Sub-title */}
      <div style={{ fontSize: 14, color: PG.c.inkSoft, fontWeight: 600, marginBottom: 16 }}>
        Spotted April 14, 2026 · North Shore, Oʻahu · by <strong style={{ color: PG.c.ink }}>@kainalu</strong>
      </div>
      {/* Big photo */}
      <div style={{
        position: 'relative', borderRadius: 12, overflow: 'hidden',
        border: `1.5px solid ${PG.c.rule}`, flex: 1,
      }}>
        <PhotoSnap plate="SURFSUP" state="HI" width={700} height={420} carColor="tan" time="golden" />
        {/* Corner ribbon */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: PG.c.ink, color: PG.c.mustard,
          padding: '6px 10px', borderRadius: 6,
          fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1,
        }}>
          📍 21.6795°N · 158.0397°W
        </div>
        {/* Big plate overlaid */}
      </div>
      {/* Meta strip */}
      <div style={{
        marginTop: 14, padding: '12px 16px',
        background: PG.c.cream, border: `1.5px solid ${PG.c.rule}`, borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 24,
        fontFamily: PG.f.body, fontSize: 12,
      }}>
        <MetaStat label="UPVOTES" value="1,024" accent={PG.c.rust} />
        <MetaStat label="COMMENTS" value="201" />
        <MetaStat label="SAVES" value="388" />
        <MetaStat label="STATE RANK" value="#1" accent={PG.c.cobalt} />
        <MetaStat label="NATIONAL" value="#7" />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Pill bg={PG.c.mustardLite}>✓ AUTO-MODERATED</Pill>
        </div>
      </div>
    </div>
  );
}

function MetaStat({ label, value, accent = PG.c.ink }) {
  return (
    <div>
      <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 0.8 }}>{label}</div>
      <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 26, color: accent, letterSpacing: -0.5, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function DetailSidePanel() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden',
    }}>
      {/* Vote strip */}
      <div style={{
        background: PG.c.ink, color: PG.c.cream, borderRadius: 14,
        padding: '18px 20px', border: `1.5px solid ${PG.c.rule}`,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 54, lineHeight: 0.9, letterSpacing: -1,
          color: PG.c.mustard,
        }}>
          1,024
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, color: PG.c.cream }}>
          upvotes this week<br/>
          <span style={{ color: PG.c.mustard }}>+137 in last 24h</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{
            height: 44, padding: '0 18px', borderRadius: 999,
            background: PG.c.rust, color: PG.c.white, border: `1.5px solid ${PG.c.rule}`,
            fontWeight: 900, fontSize: 14, cursor: 'pointer', fontFamily: PG.f.body,
          }}>▲ UPVOTE</button>
          <button style={{
            width: 44, height: 44, borderRadius: 999,
            background: PG.c.paper, color: PG.c.ink, border: `1.5px solid ${PG.c.rule}`,
            fontWeight: 900, fontSize: 14, cursor: 'pointer', fontFamily: PG.f.body,
          }}>▼</button>
        </div>
      </div>

      {/* Plate rendered big */}
      <div style={{
        background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
        padding: 16, boxShadow: `0 3px 0 ${PG.c.rule}`,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5, marginBottom: 10 }}>
          THE PLATE · VECTORIZED
        </div>
        <Plate text="SURFSUP" state="HI" width={450} />
      </div>

      {/* Comments */}
      <div style={{
        background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
        padding: 16, boxShadow: `0 3px 0 ${PG.c.rule}`, flex: 1, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 24, color: PG.c.ink, letterSpacing: -0.3 }}>
            COMMENTS
          </div>
          <div style={{ fontSize: 12, color: PG.c.inkSoft, fontWeight: 700 }}>201 · sorted by top</div>
        </div>
        {[
          { u: 'bigislandben', t: 'pipe was legit this morning. glad someone shot this.', v: 88 },
          { u: 'aunty_mo',     t: 'i know this truck! park at foodland shave ice lol', v: 54 },
          { u: 'daveFL',       t: 'florida plate guy reporting: we need a SURF\'SUP down here', v: 23 },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, padding: '10px 0',
            borderTop: i === 0 ? 'none' : `1px dashed ${PG.c.paperEdge}`,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 999,
              background: [PG.c.rust, PG.c.cobalt, PG.c.mustard][i],
              color: PG.c.cream, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 11, fontFamily: PG.f.body, flexShrink: 0,
            }}>
              {c.u.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: PG.c.ink }}>@{c.u}</div>
              <div style={{ fontSize: 13, color: PG.c.ink, marginTop: 2, lineHeight: 1.4 }}>{c.t}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4, fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkSoft }}>
                ▲ {c.v} · REPLY · SAVE
              </div>
            </div>
          </div>
        ))}
        {/* New comment */}
        <div style={{
          marginTop: 10, background: PG.c.cream,
          border: `1.5px solid ${PG.c.rule}`, borderRadius: 10,
          padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, color: PG.c.inkMuted, fontWeight: 600,
        }}>
          <span style={{ flex: 1 }}>say something nice…</span>
          <span style={{
            padding: '4px 10px', background: PG.c.ink, color: PG.c.cream,
            borderRadius: 999, fontWeight: 800, fontSize: 11,
          }}>POST</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenDetail });
