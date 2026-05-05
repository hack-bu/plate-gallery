// Profile screen — a creator's page.

function ScreenProfile() {
  return (
    <BrowserFrame url="plategallery.us/u/robinjamal" width={1280} height={1020}>
      <TopNav active="feed" />
      <ProfileHeader />
      <div style={{ padding: '20px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, height: 'calc(100% - 340px)' }}>
        <ProfileGrid />
        <ProfileSide />
      </div>
    </BrowserFrame>
  );
}

function ProfileHeader() {
  return (
    <div style={{
      padding: '28px 32px', background: PG.c.paper,
      borderBottom: `1.5px solid ${PG.c.rule}`, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        {/* Avatar */}
        <div style={{
          width: 120, height: 120, borderRadius: 999,
          background: PG.c.cobalt, color: PG.c.cream,
          border: `3px solid ${PG.c.rule}`, boxShadow: `0 4px 0 ${PG.c.rule}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 54,
        }}>RJ</div>
        <div>
          <div style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5 }}>
            @ROBINJAMAL · JOINED MAR 2026 · BACK BAY, MA
          </div>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 72, color: PG.c.ink, letterSpacing: -2, lineHeight: 0.9 }}>
            Robin Jamal.
          </div>
          <div style={{ fontSize: 14, color: PG.c.inkSoft, marginTop: 4, fontWeight: 600, maxWidth: 520 }}>
            professional plate-spotter · commutes the pike daily · dms open for Boston-area sightings 🦞
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <ProfileStat v="63" l="POSTED" />
          <ProfileStat v="12.4k" l="TOTAL VOTES" accent={PG.c.rust} />
          <ProfileStat v="4" l="#1s" accent={PG.c.cobalt} />
          <ProfileStat v="382" l="FOLLOWERS" />
          <button style={{
            height: 48, padding: '0 22px', borderRadius: 999,
            background: PG.c.ink, color: PG.c.cream, border: `1.5px solid ${PG.c.rule}`,
            fontFamily: PG.f.body, fontWeight: 800, fontSize: 13, letterSpacing: 0.3,
            boxShadow: `0 3px 0 ${PG.c.rule}`, cursor: 'pointer',
          }}>+ FOLLOW</button>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ v, l, accent = PG.c.ink }) {
  return (
    <div style={{
      padding: '10px 14px', background: PG.c.cream,
      border: `1.5px solid ${PG.c.rule}`, borderRadius: 12, minWidth: 86,
    }}>
      <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 30, color: accent, letterSpacing: -0.5, lineHeight: 1 }}>{v}</div>
      <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1 }}>{l}</div>
    </div>
  );
}

function ProfileGrid() {
  const tabs = ['All posts', 'Top', 'States', 'Saved', 'Badges'];
  const plates = [
    { t: 'GOBOSTON', s: 'MA', car: 'red',    sky: 'golden',   u: 612, rank: '#1' },
    { t: 'PAHKIT',   s: 'MA', car: 'silver', sky: 'overcast', u: 221, rank: '#5' },
    { t: 'CAPECOD',  s: 'MA', car: 'tan',    sky: 'daylight', u: 164, rank: '#7' },
    { t: 'FENWAY',   s: 'MA', car: 'navy',   sky: 'dusk',     u: 141, rank: '#14' },
    { t: 'LOBSTAH',  s: 'ME', car: 'cream',  sky: 'daylight', u: 132, rank: '#2' },
    { t: 'VRMONT1',  s: 'VT', car: 'forest', sky: 'golden',   u: 98,  rank: '#3' },
  ];
  return (
    <section>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {tabs.map((t, i) => (
          <div key={t} style={{
            padding: '7px 14px', borderRadius: 999,
            background: i === 0 ? PG.c.ink : PG.c.paper,
            color: i === 0 ? PG.c.cream : PG.c.ink,
            border: `1.5px solid ${PG.c.rule}`, fontSize: 12, fontWeight: 800, letterSpacing: 0.3,
          }}>{t}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {plates.map(p => (
          <div key={p.t} style={{
            background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
            boxShadow: `0 2px 0 ${PG.c.rule}`, overflow: 'hidden',
          }}>
            <div style={{ position: 'relative' }}>
              <PhotoSnap plate={p.t} state={p.s} width={220} height={160} carColor={p.car} time={p.sky} />
              <div style={{ position: 'absolute', top: 8, left: 8 }}>
                <Pill bg={PG.c.rust} fg={PG.c.cream} size="sm">{p.rank} IN {p.s}</Pill>
              </div>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 18, color: PG.c.ink, letterSpacing: -0.3 }}>“{p.t}”</div>
              <span style={{ marginLeft: 'auto', fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700 }}>▲ {p.u}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfileSide() {
  const badges = [
    { e: '🥇', l: 'First Gold',     s: 'Hit #1 in MA' },
    { e: '🌆', l: 'Six-Cities',     s: 'Posted from 6 metros' },
    { e: '⛱️', l: 'Coast-to-Coast', s: 'Plates on both coasts' },
    { e: '🎯', l: 'Sharp Shooter',  s: '10 plates over 100 votes' },
    { e: '📸', l: 'Golden Hour',    s: '5 sunset photos' },
    { e: '🚫', l: 'Clean Record',   s: '0 moderation flags' },
  ];
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{
        background: PG.c.mustardLite, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
        padding: 16, boxShadow: `0 2px 0 ${PG.c.rule}`,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.ink, letterSpacing: 1.5 }}>BADGE CASE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 10 }}>
          {badges.map(b => (
            <div key={b.l} style={{
              background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 10,
              padding: '10px 6px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22 }}>{b.e}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: PG.c.ink, marginTop: 2 }}>{b.l}</div>
              <div style={{ fontSize: 9, color: PG.c.inkMuted, fontWeight: 600 }}>{b.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        background: PG.c.ink, color: PG.c.cream, borderRadius: 14,
        border: `1.5px solid ${PG.c.rule}`, padding: 16,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.mustard, letterSpacing: 1.5 }}>
          STATES UNLOCKED
        </div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 44, letterSpacing: -1, lineHeight: 1, marginTop: 4 }}>
          9 / 51
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 10 }}>
          {['MA','ME','VT','NH','RI','CT','NY','NJ','FL'].map(s => (
            <StateBadge key={s} code={s} size="sm" />
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: PG.c.mustard, fontWeight: 700 }}>
          Next goal: 10 states → unlock Road-Tripper badge
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { ScreenProfile });
