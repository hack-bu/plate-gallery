// Global leaderboard — the "hall of fame" treatment.

function ScreenLeaderboard() {
  return (
    <BrowserFrame url="plategallery.us/leaderboard" width={1280} height={1020}>
      <TopNav active="ranks" />
      <div style={{ padding: '24px 32px', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <div>
            <div style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5, marginBottom: 4 }}>
              ALL 51 STATES · ALL TIME
            </div>
            <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 80, color: PG.c.ink, letterSpacing: -2.5, lineHeight: 0.88 }}>
              HALL OF PLATES.
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            {['ALL TIME','THIS YEAR','THIS MONTH','THIS WEEK'].map((s,i) => (
              <div key={s} style={{
                padding: '8px 14px', borderRadius: 999,
                background: i === 0 ? PG.c.ink : PG.c.paper,
                color: i === 0 ? PG.c.cream : PG.c.ink,
                border: `1.5px solid ${PG.c.rule}`, fontWeight: 800, fontSize: 12, letterSpacing: 0.3,
              }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: 16 }}>
          <PodiumCard rank={2} plate="GOBOSTON" state="MA" up={612} by="robinjamal" h={240} color={PG.c.cobalt} />
          <PodiumCard rank={1} plate="SURFSUP"  state="HI" up={1024} by="kainalu"    h={280} color={PG.c.rust} big />
          <PodiumCard rank={3} plate="BGAPPL3"  state="NY" up={872}  by="queensf3"   h={220} color={PG.c.mustard} dark />
        </div>

        {/* Rest of leaderboard */}
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, height: 'calc(100% - 430px)' }}>
          <LeaderRows />
          <LeaderSideCards />
        </div>
      </div>
    </BrowserFrame>
  );
}

function PodiumCard({ rank, plate, state, up, by, h, color, big, dark }) {
  const txt = dark ? PG.c.ink : PG.c.cream;
  return (
    <div style={{
      background: color, color: txt,
      border: `1.5px solid ${PG.c.rule}`, borderRadius: 18,
      boxShadow: `0 4px 0 ${PG.c.rule}`, padding: 18,
      height: h, display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 12, right: 12,
        fontFamily: PG.f.display, fontWeight: 900, fontSize: big ? 120 : 90,
        letterSpacing: -3, lineHeight: 0.8, opacity: 0.22,
      }}>
        {String(rank).padStart(2, '0')}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 999,
          background: dark ? PG.c.ink : PG.c.cream,
          color: dark ? PG.c.mustard : color,
          border: `1.5px solid ${PG.c.rule}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 18,
        }}>
          {rank === 1 ? '★' : rank === 2 ? '2' : '3'}
        </div>
        <StateBadge code={state} />
      </div>
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <Plate text={plate} state={state} width={big ? 280 : 240} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: big ? 44 : 36,
          letterSpacing: -1, lineHeight: 1,
        }}>▲ {up.toLocaleString()}</div>
        <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>@{by}</div>
      </div>
    </div>
  );
}

function LeaderRows() {
  const rows = [
    { r: 4,  t: 'PIZZAPIE', s: 'NJ', u: 688, by: 'tonypizza' },
    { r: 5,  t: 'DAD0F3',   s: 'TX', u: 511, by: 'mgarcia' },
    { r: 6,  t: 'GR8PNW',   s: 'WA', u: 402, by: 'rainyluna' },
    { r: 7,  t: 'HOTDISH',  s: 'MN', u: 420, by: 'twinsfan88' },
    { r: 8,  t: 'ILUV2SKI', s: 'CO', u: 348, by: 'heathermtns' },
    { r: 9,  t: 'YALLZEE',  s: 'GA', u: 288, by: 'petermac' },
    { r: 10, t: 'PEACHY1',  s: 'GA', u: 276, by: 'atlantaaa' },
    { r: 11, t: 'DERBYDAY', s: 'KY', u: 241, by: 'bluegrass' },
  ];
  return (
    <div style={{
      background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 18,
      boxShadow: `0 3px 0 ${PG.c.rule}`, overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '56px 160px 1fr 100px 80px',
        padding: '10px 18px', background: PG.c.ink, color: PG.c.cream,
        fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
      }}>
        <div>#</div><div>PLATE</div><div>CREATOR</div><div>UPVOTES</div><div>TREND</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.r} style={{
          display: 'grid', gridTemplateColumns: '56px 160px 1fr 100px 80px',
          alignItems: 'center', padding: '10px 18px',
          borderTop: i === 0 ? 'none' : `1px dashed ${PG.c.paperEdge}`,
          fontFamily: PG.f.body,
        }}>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 26, color: PG.c.ink, letterSpacing: -0.5, lineHeight: 1 }}>{r.r}</div>
          <Plate text={r.t} state={r.s} width={150} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: PG.c.ink }}>“{r.t}”</div>
            <div style={{ fontSize: 11, color: PG.c.inkSoft, fontWeight: 600, display: 'flex', gap: 6, alignItems: 'center' }}>
              <StateBadge code={r.s} size="sm" /> @{r.by}
            </div>
          </div>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, color: PG.c.ink, letterSpacing: -0.3 }}>
            {r.u}
          </div>
          <div style={{
            fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700,
            color: i % 3 === 0 ? PG.c.cherry : PG.c.mint,
          }}>
            {i % 3 === 0 ? '▼ -12' : `▲ +${30 + i * 7}`}
          </div>
        </div>
      ))}
    </div>
  );
}

function LeaderSideCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{
        background: PG.c.ink, color: PG.c.cream, borderRadius: 18,
        border: `1.5px solid ${PG.c.rule}`, padding: 16,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.mustard, letterSpacing: 1.5 }}>
          MOST COMPETITIVE STATE
        </div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 54, color: PG.c.cream, letterSpacing: -1.5, lineHeight: 0.85, marginTop: 4 }}>
          CALIFORNIA.
        </div>
        <div style={{ fontSize: 12, marginTop: 6, color: PG.c.mustard, fontWeight: 700 }}>
          487 plates · smallest vote-gap between ranks
        </div>
      </div>
      <div style={{
        background: PG.c.mustardLite, color: PG.c.ink, borderRadius: 18,
        border: `1.5px solid ${PG.c.rule}`, padding: 16,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.ink, letterSpacing: 1.5 }}>
          RAREST STATE REPRESENTED
        </div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 54, color: PG.c.ink, letterSpacing: -1.5, lineHeight: 0.85, marginTop: 4 }}>
          WYOMING?<br/>(not yet.)
        </div>
        <div style={{ fontSize: 12, marginTop: 6, fontWeight: 700 }}>
          Still locked. First uploader gets <strong>50 bonus votes</strong>.
        </div>
      </div>
      <div style={{
        background: PG.c.paper, borderRadius: 18,
        border: `1.5px solid ${PG.c.rule}`, padding: 16,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5 }}>
          WITTIEST WORD-PLAY (AI-RATED)
        </div>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 30, color: PG.c.ink, letterSpacing: -0.5, lineHeight: 0.95, marginTop: 4 }}>
          “PAHKIT”, “YALLZEE”,<br/>“HAHVAHD”.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenLeaderboard });
