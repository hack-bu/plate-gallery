// State page — Massachusetts deep-dive. Top 10 + grid below.

function ScreenState() {
  return (
    <BrowserFrame url="plategallery.us/state/ma" width={1280} height={1020}>
      <TopNav active="map" />
      <div style={{ padding: '0 0 0 0', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
        <StateHero />
        <div style={{ padding: '20px 32px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          <StateTop10 />
          <StateGridPhotos />
        </div>
      </div>
    </BrowserFrame>
  );
}

function StateHero() {
  return (
    <div style={{
      background: PG.c.cobalt, color: PG.c.cream, padding: '28px 32px',
      borderBottom: `1.5px solid ${PG.c.rule}`, position: 'relative', overflow: 'hidden',
    }}>
      {/* stripes */}
      <svg width="100%" height="100%" viewBox="0 0 1280 200" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="0" y1={30 + i * 32} x2="1280" y2={30 + i * 32} stroke={PG.c.mustard} strokeWidth="2" strokeDasharray="20 20" />
        ))}
      </svg>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, position: 'relative' }}>
        <div>
          <div style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: PG.c.mustard, marginBottom: 6 }}>
            COL 11 · ROW 3 · EST. 1788 · STATE #06
          </div>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 120, lineHeight: 0.82, letterSpacing: -4 }}>
            MASSA-<br/>CHUSETTS.
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          <HeroStat v="224"  l="PLATES" />
          <HeroStat v="41"   l="CREATORS" />
          <HeroStat v="8.4k" l="WEEKLY VOTES" />
          <HeroStat v="#6"   l="NATIONAL RANK" accent={PG.c.mustard} />
        </div>
      </div>
    </div>
  );
}

function HeroStat({ v, l, accent = PG.c.cream }) {
  return (
    <div style={{
      padding: '14px 18px', background: 'rgba(0,0,0,0.22)', borderRadius: 14,
      border: '1.5px solid rgba(245,236,220,0.2)', minWidth: 110,
    }}>
      <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 48, color: accent, lineHeight: 1, letterSpacing: -1 }}>{v}</div>
      <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.mustard, letterSpacing: 1 }}>{l}</div>
    </div>
  );
}

function StateTop10() {
  const top = [
    { r: 1,  t: 'GOBOSTON', u: 612, by: 'robinjamal',  car: 'red',    sky: 'golden' },
    { r: 2,  t: 'WICKED1',  u: 411, by: 'southiegrl',  car: 'white',  sky: 'daylight' },
    { r: 3,  t: 'CHOWDAH',  u: 287, by: 'clamjack',    car: 'silver', sky: 'overcast' },
    { r: 4,  t: 'BOSOX4EV', u: 264, by: 'fenwayfrank', car: 'navy',   sky: 'dusk' },
    { r: 5,  t: 'PAHKIT',   u: 221, by: 'tonyduxbury', car: 'black',  sky: 'daylight' },
    { r: 6,  t: 'HAHVAHD',  u: 189, by: 'cambridgeQ',  car: 'cream',  sky: 'golden' },
    { r: 7,  t: 'CAPECOD',  u: 164, by: 'hyannislou',  car: 'tan',    sky: 'daylight' },
    { r: 8,  t: 'DUNKIN',   u: 151, by: 'woostah',     car: 'red',    sky: 'overcast' },
    { r: 9,  t: 'LOBSTAH',  u: 132, by: 'eastie',      car: 'forest', sky: 'daylight' },
    { r: 10, t: 'SALEM1692',u: 118, by: 'witchynorth', car: 'black',  sky: 'dusk' },
  ];
  return (
    <section>
      <SectionTitle kicker="LEADERBOARD · THIS WEEK" title="TOP 10 PLATES" />
      <div style={{
        background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 18,
        boxShadow: `0 3px 0 ${PG.c.rule}`, overflow: 'hidden',
      }}>
        {top.map((p, i) => (
          <div key={p.t} style={{
            display: 'grid', gridTemplateColumns: '56px 180px 1fr auto auto',
            alignItems: 'center', gap: 16, padding: '12px 18px',
            borderTop: i === 0 ? 'none' : `1px dashed ${PG.c.paperEdge}`,
            background: i === 0 ? PG.c.mustardLite : 'transparent',
          }}>
            <div style={{
              fontFamily: PG.f.display, fontWeight: 900, fontSize: 42,
              color: i < 3 ? PG.c.rust : PG.c.ink, letterSpacing: -1.5, lineHeight: 1,
            }}>
              {String(p.r).padStart(2, '0')}
            </div>
            <Plate text={p.t} state="MA" width={180} />
            <div>
              <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, color: PG.c.ink, letterSpacing: -0.3, lineHeight: 1 }}>
                “{p.t}”
              </div>
              <div style={{ fontSize: 12, color: PG.c.inkSoft, marginTop: 2, fontWeight: 600 }}>
                by <strong style={{ color: PG.c.ink }}>@{p.by}</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 24, color: PG.c.ink, letterSpacing: -0.5, lineHeight: 1 }}>
                ▲ {p.u}
              </div>
              <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1 }}>UPVOTES</div>
            </div>
            <div style={{
              width: 30, height: 30, borderRadius: 999, background: PG.c.cream,
              border: `1.5px solid ${PG.c.rule}`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 14, color: PG.c.rust, fontWeight: 900,
            }}>▲</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StateGridPhotos() {
  return (
    <section>
      <SectionTitle kicker="FRESH SIGHTINGS" title="LATEST IN MASS" right={<Pill bg={PG.c.paper}>SEE ALL 224 →</Pill>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {[
          { t: 'BEANTWN',  car: 'navy',   sky: 'golden' },
          { t: 'REVERE',   car: 'red',    sky: 'daylight' },
          { t: 'JAMAICA4', car: 'cream',  sky: 'overcast' },
          { t: 'NRTHEND',  car: 'black',  sky: 'dusk' },
        ].map(p => (
          <div key={p.t} style={{
            background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
            boxShadow: `0 2px 0 ${PG.c.rule}`, overflow: 'hidden',
          }}>
            <PhotoSnap plate={p.t} state="MA" width={280} height={180} carColor={p.car} time={p.sky} />
            <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 18, color: PG.c.ink, letterSpacing: -0.3 }}>
                “{p.t}”
              </div>
              <span style={{ marginLeft: 'auto', fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkSoft }}>▲ {Math.floor(Math.random() * 80 + 20)}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, padding: 16, background: PG.c.mustardLite,
        border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.ink, letterSpacing: 1.5 }}>
          MA FUN FACT
        </div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 26, color: PG.c.ink, letterSpacing: -0.3, lineHeight: 1, marginTop: 4 }}>
          18% OF MA PLATES MENTION A SPORTS TEAM.
        </div>
        <div style={{ fontSize: 13, color: PG.c.inkSoft, marginTop: 4, fontWeight: 600 }}>
          Highest sports-to-total ratio in the nation. Shocker.
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, right }) {
  return (
    <div style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
      <div>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5 }}>{kicker}</div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 34, color: PG.c.ink, letterSpacing: -0.8, lineHeight: 1 }}>{title}</div>
      </div>
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  );
}

Object.assign(window, { ScreenState, SectionTitle });
