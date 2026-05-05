// Shared chrome — browser frame, topnav, footer, generic bits.

function BrowserFrame({ children, url = 'plategallery.us', width = 1280, height = 820 }) {
  return (
    <div style={{ width, height, background: PG.c.cream, position: 'relative', overflow: 'hidden' }}>
      {/* Tab strip */}
      <div style={{
        height: 36, background: '#e6ddc8', borderBottom: `1px solid ${PG.c.paperEdge}`,
        display: 'flex', alignItems: 'flex-end', paddingLeft: 14,
      }}>
        <div style={{
          background: PG.c.cream, padding: '6px 14px', borderRadius: '8px 8px 0 0',
          fontFamily: PG.f.body, fontSize: 12, fontWeight: 600, color: PG.c.ink,
          display: 'flex', alignItems: 'center', gap: 8, minWidth: 220,
        }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: PG.c.rust }} />
          PlateGallery — {urlToTitle(url)}
          <span style={{ marginLeft: 'auto', opacity: 0.5, fontSize: 14 }}>×</span>
        </div>
      </div>
      {/* Addressbar */}
      <div style={{
        height: 40, background: PG.c.cream, borderBottom: `1px solid ${PG.c.paperEdge}`,
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 6, color: PG.c.inkMuted, fontSize: 16 }}>
          <span>‹</span><span>›</span><span>↻</span>
        </div>
        <div style={{
          flex: 1, height: 26, background: PG.c.paper, borderRadius: 13,
          padding: '0 12px', display: 'flex', alignItems: 'center',
          fontFamily: PG.f.mono, fontSize: 11, color: PG.c.inkSoft,
          border: `1px solid ${PG.c.paperEdge}`,
        }}>
          <span style={{ color: PG.c.mint, marginRight: 6 }}>●</span>
          https://{url}
        </div>
      </div>
      {children}
    </div>
  );
}

function urlToTitle(url) {
  if (url === 'plategallery.us') return 'Home';
  if (url.includes('/upload')) return 'Upload';
  if (url.includes('/map')) return 'USA Map';
  if (url.includes('/plate/')) return 'Plate';
  if (url.includes('/state/')) return 'State';
  if (url.includes('/leaderboard')) return 'Leaderboard';
  if (url.includes('/u/')) return 'Profile';
  return 'PlateGallery';
}

// Global topnav used across screens
function TopNav({ active = 'feed' }) {
  const items = [
    { k: 'feed', label: 'Feed' },
    { k: 'map', label: 'USA Map' },
    { k: 'ranks', label: 'Leaderboards' },
    { k: 'about', label: 'About' },
  ];
  return (
    <div style={{
      height: 72, background: PG.c.cream,
      borderBottom: `1.5px solid ${PG.c.rule}`,
      display: 'flex', alignItems: 'center', padding: '0 32px', gap: 32,
      fontFamily: PG.f.body,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <LogoMark size={38} />
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 30,
          color: PG.c.ink, letterSpacing: -0.5, lineHeight: 1,
        }}>
          PLATE<span style={{ color: PG.c.rust }}>GALLERY</span>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
        {items.map(it => (
          <div key={it.k} style={{
            padding: '8px 14px',
            fontSize: 15, fontWeight: 700,
            color: active === it.k ? PG.c.ink : PG.c.inkSoft,
            background: active === it.k ? PG.c.paper : 'transparent',
            borderRadius: 999,
            border: active === it.k ? `1.5px solid ${PG.c.rule}` : '1.5px solid transparent',
          }}>
            {it.label}
          </div>
        ))}
      </nav>
      {/* Search */}
      <div style={{
        flex: 1, maxWidth: 320, marginLeft: 'auto',
        height: 40, background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
        borderRadius: 999, padding: '0 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 13, color: PG.c.inkMuted, fontWeight: 500,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={PG.c.inkSoft} strokeWidth="1.5"/><path d="M9.5 9.5L12 12" stroke={PG.c.inkSoft} strokeWidth="1.5" strokeLinecap="round"/></svg>
        search plates, states, creators…
      </div>
      {/* Upload CTA */}
      <button style={{
        background: PG.c.rust, color: PG.c.white, border: 'none',
        borderRadius: 999, padding: '0 22px', height: 44,
        fontFamily: PG.f.body, fontSize: 15, fontWeight: 800, letterSpacing: 0.3,
        boxShadow: `0 3px 0 ${PG.c.rustDeep}, 0 6px 14px ${PG.c.shadowHard}`,
        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
      }}>
        <span style={{ fontSize: 18 }}>+</span> POST A PLATE
      </button>
      {/* Avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: 999, background: PG.c.cobalt,
        border: `1.5px solid ${PG.c.rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: PG.c.white, fontWeight: 800, fontSize: 14, fontFamily: PG.f.body,
      }}>
        RJ
      </div>
    </div>
  );
}

function LogoMark({ size = 42 }) {
  return (
    <svg width={size} height={size * 0.54} viewBox="0 0 80 44">
      <rect x="1" y="1" width="78" height="42" rx="6" fill={PG.c.white} stroke={PG.c.ink} strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1.5" fill={PG.c.ink} opacity="0.4" />
      <circle cx="73" cy="7" r="1.5" fill={PG.c.ink} opacity="0.4" />
      <circle cx="7" cy="37" r="1.5" fill={PG.c.ink} opacity="0.4" />
      <circle cx="73" cy="37" r="1.5" fill={PG.c.ink} opacity="0.4" />
      <text x="40" y="30" textAnchor="middle" fontFamily="'Sofia Sans Extra Condensed', sans-serif" fontWeight="900" fontSize="22" fill={PG.c.rust}>PG</text>
    </svg>
  );
}

// Small utility pills & chips
function Pill({ children, bg = PG.c.paper, fg = PG.c.ink, border = true, bold = true, size = 'md' }) {
  const h = size === 'sm' ? 22 : 28;
  const p = size === 'sm' ? '0 8px' : '0 12px';
  const fs = size === 'sm' ? 10 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: h, padding: p, borderRadius: 999,
      background: bg, color: fg,
      border: border ? `1.5px solid ${PG.c.rule}` : 'none',
      fontFamily: PG.f.body, fontWeight: bold ? 800 : 600, fontSize: fs,
      letterSpacing: 0.3, textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

// Rank medal (big number)
function RankMedal({ n, color = PG.c.rust }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 999,
      background: color, color: PG.c.white,
      border: `1.5px solid ${PG.c.rule}`,
      boxShadow: `0 3px 0 ${PG.c.rule}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: PG.f.display, fontWeight: 900, fontSize: 24, lineHeight: 1,
    }}>{n}</div>
  );
}

// State badge — small abbreviation chip
function StateBadge({ code, size = 'md' }) {
  const h = size === 'sm' ? 20 : 26;
  const fs = size === 'sm' ? 10 : 13;
  return (
    <div style={{
      height: h, minWidth: h * 1.4, padding: '0 7px',
      borderRadius: 4, background: PG.c.ink, color: PG.c.cream,
      fontFamily: PG.f.mono, fontWeight: 700, fontSize: fs, letterSpacing: 0.5,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>{code}</div>
  );
}

Object.assign(window, { BrowserFrame, TopNav, LogoMark, Pill, RankMedal, StateBadge });
