// Home feed — "plate-themed Instagram"
// Layout: topnav / left sidenav / center feed / right rails (trending states, stats)

// Sample data — a mix of fun real-ish vanity plates with variety
const SAMPLE_PLATES = [
  { id: 'p1',  text: 'ILUV2SKI', state: 'CO', user: 'heathermtns', hood: 'Boulder',      up: 348, cmt: 42,  dist: '1h',   car: 'forest', sky: 'daylight', note: 'spotted at the base lodge' },
  { id: 'p2',  text: 'GOBOSTON', state: 'MA', user: 'robinjamal',  hood: 'Back Bay',     up: 612, cmt: 88,  dist: '3h',   car: 'red',    sky: 'golden',   note: 'green monster energy' },
  { id: 'p3',  text: 'DAD0F3',   state: 'TX', user: 'mgarcia',     hood: 'Austin',       up: 511, cmt: 63,  dist: '5h',   car: 'black',  sky: 'daylight', note: 'he\u2019s peak dad' },
  { id: 'p4',  text: 'HOTDISH',  state: 'MN', user: 'twinsfan88',  hood: 'Minneapolis',  up: 420, cmt: 57,  dist: '8h',   car: 'silver', sky: 'overcast', note: 'minnesota nice' },
  { id: 'p5',  text: 'SURFSUP',  state: 'HI', user: 'kainalu',     hood: 'North Shore',  up: 1024,cmt: 201, dist: '1d',   car: 'tan',    sky: 'golden',   note: 'pipe swell incoming' },
  { id: 'p6',  text: 'YALLZEE',  state: 'GA', user: 'petermac',    hood: 'Savannah',     up: 288, cmt: 31,  dist: '2d',   car: 'cream',  sky: 'daylight', note: 'y\u2019all-zee rolls on' },
  { id: 'p7',  text: 'BGAPPL3',  state: 'NY', user: 'queensf3',    hood: 'Queens',       up: 872, cmt: 114, dist: '2d',   car: 'navy',   sky: 'dusk',     note: 'taxi traffic vibes' },
  { id: 'p8',  text: 'GR8PNW',   state: 'WA', user: 'rainyluna',   hood: 'Ballard',      up: 402, cmt: 49,  dist: '3d',   car: 'forest', sky: 'overcast', note: 'gr8 pnw indeed' },
  { id: 'p9',  text: 'PIZZAPIE', state: 'NJ', user: 'tonypizza',   hood: 'Hoboken',      up: 688, cmt: 101, dist: '3d',   car: 'red',    sky: 'daylight', note: 'pork roll, egg, cheese' },
];

function ScreenHome() {
  return (
    <BrowserFrame url="plategallery.us" width={1280} height={1020}>
      <TopNav active="feed" />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: 0, height: 'calc(100% - 110px)' }}>
        <FeedSideNav />
        <FeedCenter />
        <FeedRightRail />
      </div>
    </BrowserFrame>
  );
}

function FeedSideNav() {
  const items = [
    { l: 'Home', icon: '⌂', active: true },
    { l: 'Nearby plates', icon: '◉' },
    { l: 'Following', icon: '★' },
    { l: 'Saved', icon: '♥' },
    { l: 'Your posts', icon: '▣' },
  ];
  const states = [
    { code: 'MA', name: 'Massachusetts' },
    { code: 'NY', name: 'New York' },
    { code: 'CA', name: 'California' },
    { code: 'TX', name: 'Texas' },
  ];
  return (
    <aside style={{
      borderRight: `1.5px solid ${PG.c.rule}`, padding: '20px 16px',
      fontFamily: PG.f.body, fontSize: 14, overflow: 'hidden',
    }}>
      {items.map((it) => (
        <div key={it.l} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: it.active ? PG.c.ink : 'transparent',
          color: it.active ? PG.c.cream : PG.c.ink,
          fontWeight: 700, marginBottom: 2,
        }}>
          <span style={{ fontSize: 16, width: 18, textAlign: 'center' }}>{it.icon}</span>
          {it.l}
        </div>
      ))}
      <div style={{
        marginTop: 28, marginBottom: 8,
        fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700,
        color: PG.c.inkMuted, letterSpacing: 1.5,
      }}>
        STATES YOU FOLLOW
      </div>
      {states.map(s => (
        <div key={s.code} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', fontSize: 13, fontWeight: 600, color: PG.c.ink,
        }}>
          <StateBadge code={s.code} size="sm" />
          {s.name}
        </div>
      ))}

      <div style={{
        marginTop: 24, padding: 14,
        background: PG.c.mustardLite, border: `1.5px solid ${PG.c.rule}`, borderRadius: 12,
        position: 'relative',
      }}>
        <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, color: PG.c.ink, lineHeight: 0.95, letterSpacing: -0.3 }}>
          SPOTTED<br/>A PLATE?
        </div>
        <div style={{ fontSize: 12, color: PG.c.ink, marginTop: 6, lineHeight: 1.35, fontWeight: 600 }}>
          Snap it and help map the country.
        </div>
        <div style={{
          marginTop: 10, padding: '8px 12px', background: PG.c.ink, color: PG.c.cream,
          borderRadius: 999, fontWeight: 800, fontSize: 12, textAlign: 'center', letterSpacing: 0.5,
        }}>
          START AN UPLOAD →
        </div>
      </div>
    </aside>
  );
}

function FeedCenter() {
  return (
    <main style={{ padding: '20px 28px', overflow: 'hidden' }}>
      <FeedHero />
      <StorySortBar />
      <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
        {SAMPLE_PLATES.slice(0, 4).map(p => <PostCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}

function FeedHero() {
  return (
    <div style={{
      position: 'relative', height: 160,
      background: PG.c.ink, color: PG.c.cream,
      borderRadius: 18, border: `1.5px solid ${PG.c.rule}`,
      padding: '22px 24px', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 18,
    }}>
      {/* Road stripes */}
      <svg width="100%" height="100%" viewBox="0 0 900 160" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <g stroke={PG.c.mustard} strokeWidth="6" strokeDasharray="40 40" fill="none">
          <line x1="0" y1="140" x2="900" y2="140" />
          <line x1="0" y1="150" x2="900" y2="150" />
        </g>
      </svg>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, color: PG.c.mustard, letterSpacing: 1.5, marginBottom: 6 }}>
          YOUR FEED · TUESDAY, APR 18
        </div>
        <div style={{
          fontFamily: PG.f.display, fontSize: 54, fontWeight: 900,
          lineHeight: 0.9, letterSpacing: -1,
        }}>
          4 NEW PLATES FROM<br/>STATES YOU FOLLOW.
        </div>
      </div>
      {/* Decorative mini plate */}
      <div style={{ position: 'relative', zIndex: 1, transform: 'rotate(-6deg)' }}>
        <Plate text="HOWDY" state="TX" width={180} />
      </div>
    </div>
  );
}

function StorySortBar() {
  const sorts = ['Hot 🔥', 'New', 'Top today', 'Top all-time', 'Rising'];
  return (
    <div style={{
      marginTop: 18, display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: PG.f.body,
    }}>
      {sorts.map((s, i) => (
        <div key={s} style={{
          padding: '7px 14px', borderRadius: 999,
          background: i === 0 ? PG.c.ink : 'transparent',
          color: i === 0 ? PG.c.cream : PG.c.ink,
          border: `1.5px solid ${PG.c.rule}`,
          fontSize: 13, fontWeight: 800, letterSpacing: 0.2,
        }}>{s}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: PG.c.inkSoft, fontWeight: 700 }}>
        VIEW:
        <div style={{ display: 'flex', border: `1.5px solid ${PG.c.rule}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '4px 10px', background: PG.c.ink, color: PG.c.cream, fontWeight: 800, fontSize: 11 }}>CARD</div>
          <div style={{ padding: '4px 10px', background: PG.c.paper, color: PG.c.ink, fontWeight: 800, fontSize: 11 }}>GRID</div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ p }) {
  return (
    <article style={{
      background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
      borderRadius: 16, overflow: 'hidden',
      boxShadow: `0 2px 0 ${PG.c.rule}`,
      display: 'grid', gridTemplateColumns: '320px 1fr',
    }}>
      {/* Photo */}
      <div style={{ position: 'relative', background: PG.c.ink }}>
        <PhotoSnap plate={p.text} state={p.state} width={320} height={260} carColor={p.car} time={p.sky} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(15,13,9,0.72)', color: PG.c.cream,
          padding: '4px 8px', borderRadius: 6,
          fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
        }}>
          <span style={{ color: PG.c.mustard }}>●</span> IN THE WILD · {p.dist} AGO
        </div>
        <div style={{
          position: 'absolute', top: 10, right: 10,
        }}>
          <StateBadge code={p.state} />
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 999,
            background: PG.c.cobaltLite, color: PG.c.cream,
            border: `1.5px solid ${PG.c.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 12, fontFamily: PG.f.body,
          }}>
            {p.user.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: PG.c.ink }}>@{p.user}</div>
          <div style={{ fontSize: 12, color: PG.c.inkMuted }}>· {p.hood}</div>
          <div style={{ marginLeft: 'auto', fontSize: 18, color: PG.c.inkMuted, letterSpacing: 2 }}>···</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
          <div style={{
            fontFamily: PG.f.display, fontWeight: 900, fontSize: 42,
            color: PG.c.ink, letterSpacing: -0.5, lineHeight: 0.95,
          }}>
            “{p.text}”
          </div>
        </div>
        <div style={{ fontSize: 13, color: PG.c.inkSoft, marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>
          {p.note}
        </div>
        {/* Vote & actions */}
        <div style={{
          marginTop: 'auto', paddingTop: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <VoteCluster up={p.up} />
          <ActionButton>💬 {p.cmt}</ActionButton>
          <ActionButton>↗ Share</ActionButton>
          <ActionButton>♥ Save</ActionButton>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <Pill bg={PG.c.cream}>{pctToTop(p.up)} TO TOP 10</Pill>
          </div>
        </div>
      </div>
    </article>
  );
}

function pctToTop(up) {
  // arbitrary: closer to 1000 = closer to top
  const gap = Math.max(0, 1000 - up);
  return gap === 0 ? 'IN TOP 10' : `${gap} VOTES`;
}

function VoteCluster({ up }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: PG.c.cream, border: `1.5px solid ${PG.c.rule}`,
      borderRadius: 999, padding: 3, gap: 2,
    }}>
      <button style={{
        width: 36, height: 36, borderRadius: 999, border: 'none',
        background: PG.c.rust, color: PG.c.white,
        fontSize: 18, fontWeight: 900, cursor: 'pointer',
      }}>▲</button>
      <div style={{
        padding: '0 12px', fontFamily: PG.f.display, fontWeight: 900,
        fontSize: 22, color: PG.c.ink, letterSpacing: -0.3, minWidth: 40, textAlign: 'center',
      }}>
        {up}
      </div>
      <button style={{
        width: 36, height: 36, borderRadius: 999, border: 'none',
        background: PG.c.paper, color: PG.c.inkSoft,
        fontSize: 18, fontWeight: 900, cursor: 'pointer',
      }}>▼</button>
    </div>
  );
}

function ActionButton({ children }) {
  return (
    <button style={{
      height: 36, padding: '0 14px', borderRadius: 999,
      background: PG.c.cream, border: `1.5px solid ${PG.c.rule}`,
      color: PG.c.ink, fontFamily: PG.f.body, fontWeight: 700, fontSize: 13,
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
    }}>{children}</button>
  );
}

function FeedRightRail() {
  return (
    <aside style={{
      borderLeft: `1.5px solid ${PG.c.rule}`, padding: '20px 18px',
      background: PG.c.cream, overflow: 'hidden',
    }}>
      {/* Hot states block */}
      <div style={{
        background: PG.c.rust, color: PG.c.cream, borderRadius: 14,
        padding: 16, border: `1.5px solid ${PG.c.rule}`,
        boxShadow: `0 3px 0 ${PG.c.rule}`,
      }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: PG.c.mustard, marginBottom: 4 }}>
          THIS WEEK
        </div>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 28, lineHeight: 0.95, letterSpacing: -0.5,
        }}>
          HOTTEST STATES
        </div>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {[
            { code: 'CA', name: 'California', cnt: 312, pct: 95 },
            { code: 'TX', name: 'Texas',      cnt: 287, pct: 88 },
            { code: 'NY', name: 'New York',   cnt: 261, pct: 80 },
            { code: 'FL', name: 'Florida',    cnt: 241, pct: 74 },
          ].map((s, i) => (
            <div key={s.code} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
              <span style={{ fontFamily: PG.f.mono, fontSize: 11, opacity: 0.7, width: 16 }}>{String(i + 1).padStart(2, '0')}</span>
              <StateBadge code={s.code} size="sm" />
              <span style={{ flex: 1 }}>{s.name}</span>
              <span style={{ fontFamily: PG.f.mono, fontWeight: 800, fontSize: 11 }}>+{s.cnt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spotlight plate */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: PG.c.inkMuted, marginBottom: 6 }}>
          PLATE OF THE DAY
        </div>
        <div style={{ background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14, padding: 12, boxShadow: `0 2px 0 ${PG.c.rule}` }}>
          <Plate text="SURFSUP" state="HI" width={248} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, color: PG.c.ink, letterSpacing: -0.3, lineHeight: 1 }}>1,024</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: PG.c.inkSoft }}>UPVOTES · #1 ALOHA STATE</div>
          </div>
        </div>
      </div>

      {/* US map teaser */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: PG.c.inkMuted, marginBottom: 6 }}>
          50 + DC UNLOCKED
        </div>
        <div style={{
          background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 14,
          padding: 14, textAlign: 'center', boxShadow: `0 2px 0 ${PG.c.rule}`,
        }}>
          <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 44, color: PG.c.cobalt, lineHeight: 1 }}>
            41 / 51
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: PG.c.inkSoft, marginTop: 2 }}>
            states with plates uploaded
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {Array.from({ length: 51 }).map((_, i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: 2,
                background: i < 41 ? PG.c.rust : PG.c.paperEdge,
              }} />
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: PG.c.inkMuted, fontWeight: 700 }}>
            Missing: WY, ND, SD, MS, AR, NM, VT, RI, DE, AK
          </div>
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { ScreenHome, SAMPLE_PLATES });
