// Plate — renders a vanity license plate as inline SVG.
// Styled like a real state plate with appropriate colors.
// Also exports a PhotoSnap component that wraps a plate in a photo-like frame
// simulating a phone snap (with tilt, rough texture, EXIF-ish metadata).

// State plate styles — a sampling, enough for visual variety
const PLATE_STYLES = {
  CA: { bg: '#fffdf5', txt: '#c2232c', top: 'California', topC: '#d08432', sub: 'dmv.ca.gov', subC: '#9a9181', gradient: true },
  NY: { bg: '#e9d7a3', txt: '#1a4a8a', top: 'New York', topC: '#1a4a8a', sub: 'empire state', subC: '#1a4a8a' },
  TX: { bg: '#fffdf5', txt: '#0f0d09', top: 'TEXAS', topC: '#0f0d09', sub: 'The Lone Star State', subC: '#0f0d09' },
  FL: { bg: '#fffdf5', txt: '#0f0d09', top: 'Sunshine State', topC: '#e6b245', sub: 'FLORIDA', subC: '#c24a20', gradient: true, gradC: '#ffe4a8' },
  MA: { bg: '#fbf6ea', txt: '#c24a20', top: 'Spirit of America', topC: '#5a5246', sub: 'MASSACHUSETTS', subC: '#c24a20' },
  IL: { bg: '#fffdf5', txt: '#1e3a8a', top: 'ILLINOIS', topC: '#c2232c', sub: 'Land of Lincoln', subC: '#1e3a8a' },
  WA: { bg: '#e9e4d4', txt: '#1e3a8a', top: 'WASHINGTON', topC: '#1e3a8a', sub: 'Evergreen State', subC: '#636b3a' },
  CO: { bg: '#1d5a3a', txt: '#fffdf5', top: 'COLORADO', topC: '#fffdf5', sub: 'mountains', subC: '#e6d7a3' },
  AZ: { bg: '#f2cf7b', txt: '#8f3414', top: 'ARIZONA', topC: '#8f3414', sub: 'Grand Canyon State', subC: '#8f3414', gradient: true, gradC: '#e6b245' },
  VT: { bg: '#2d5a3d', txt: '#fffdf5', top: 'Vermont', topC: '#fffdf5', sub: 'green mountains', subC: '#c5d4a8' },
  OR: { bg: '#fbf6ea', txt: '#1d5a3a', top: 'OREGON', topC: '#1d5a3a', sub: 'Pacific Wonderland', subC: '#1d5a3a' },
  HI: { bg: '#fffdf5', txt: '#b6233d', top: 'Aloha State', topC: '#b6233d', sub: 'HAWAII', subC: '#b6233d' },
  AK: { bg: '#fffdf5', txt: '#1e3a8a', top: 'ALASKA', topC: '#e6b245', sub: 'The Last Frontier', subC: '#1e3a8a' },
  NV: { bg: '#d4d9c8', txt: '#1e3a8a', top: 'NEVADA', topC: '#c24a20', sub: 'Silver State', subC: '#1e3a8a' },
  DC: { bg: '#fffdf5', txt: '#1e3a8a', top: 'Taxation Without', topC: '#c2232c', sub: 'Representation', subC: '#c2232c' },
  OH: { bg: '#fffdf5', txt: '#c2232c', top: 'OHIO', topC: '#1e3a8a', sub: 'Birthplace of Aviation', subC: '#1e3a8a' },
  MI: { bg: '#fffdf5', txt: '#1e3a8a', top: 'MICHIGAN', topC: '#1e3a8a', sub: 'Pure Michigan', subC: '#1e3a8a' },
  GA: { bg: '#fffdf5', txt: '#1d5a3a', top: 'GEORGIA', topC: '#e6b245', sub: 'on my mind', subC: '#1d5a3a' },
  NC: { bg: '#fffdf5', txt: '#1e3a8a', top: 'First in Flight', topC: '#c2232c', sub: 'NORTH CAROLINA', subC: '#1e3a8a' },
};

const DEFAULT_STYLE = { bg: '#fffdf5', txt: '#0f0d09', top: 'U.S.A.', topC: '#0f0d09', sub: '', subC: '#0f0d09' };

function Plate({ text = 'ILUV2SKI', state = 'MA', width = 320, tilt = 0 }) {
  const s = PLATE_STYLES[state] || DEFAULT_STYLE;
  const h = width * 0.54;
  const fontSize = text.length <= 5 ? 72 : text.length <= 7 ? 62 : 52;

  return (
    <svg viewBox="0 0 320 172" width={width} height={h} style={{ transform: `rotate(${tilt}deg)`, display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
      <defs>
        {s.gradient && (
          <linearGradient id={`pg-${state}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={s.gradC || s.bg} />
            <stop offset="1" stopColor={s.bg} />
          </linearGradient>
        )}
      </defs>
      {/* Plate body */}
      <rect x="2" y="2" width="316" height="168" rx="14" fill={s.gradient ? `url(#pg-${state})` : s.bg} stroke="#0f0d09" strokeWidth="1.5" />
      {/* Bolt holes */}
      <circle cx="24" cy="18" r="3" fill="#1d1a14" opacity="0.25" />
      <circle cx="296" cy="18" r="3" fill="#1d1a14" opacity="0.25" />
      <circle cx="24" cy="154" r="3" fill="#1d1a14" opacity="0.25" />
      <circle cx="296" cy="154" r="3" fill="#1d1a14" opacity="0.25" />
      {/* Top line */}
      <text x="160" y="30" textAnchor="middle" fontFamily="'Sofia Sans Extra Condensed', sans-serif" fontWeight="800" fontSize="18" fill={s.topC} letterSpacing="2">
        {s.top.toUpperCase()}
      </text>
      {/* Main plate number — chunky condensed */}
      <text x="160" y="112" textAnchor="middle" fontFamily="'Sofia Sans Extra Condensed', sans-serif" fontWeight="900" fontSize={fontSize} fill={s.txt} letterSpacing="1">
        {text}
      </text>
      {/* Sub line */}
      {s.sub && (
        <text x="160" y="148" textAnchor="middle" fontFamily="'Nunito', sans-serif" fontWeight="700" fontSize="11" fill={s.subC} letterSpacing="1.5">
          {s.sub.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

// PhotoSnap — wraps a Plate in a "phone snap" treatment:
// car-ish backdrop tint, camera-ish blur/vignette, slight tilt.
function PhotoSnap({ plate, state, width = 320, tilt = 0, carColor, time = 'daylight', height }) {
  const h = height || width * 0.75;
  // Car colors from a palette
  const carColors = {
    red:    ['#7c1d1d', '#b32d2d'],
    navy:   ['#1a2a4a', '#2e4878'],
    black:  ['#1a1a1a', '#2e2e2e'],
    silver: ['#8a8a8a', '#b5b5b5'],
    white:  ['#d8d2c4', '#efe9dc'],
    tan:    ['#8b7a5a', '#b8a782'],
    forest: ['#2a3e2a', '#3e5c3e'],
    cream:  ['#d4c49a', '#e8d8ae'],
  };
  const [c1, c2] = carColors[carColor] || carColors.black;
  const skyPalette = {
    daylight: ['#a9c6e8', '#e8ddc4'],
    golden:   ['#e6b245', '#c24a20'],
    dusk:     ['#8a7ca8', '#e6a878'],
    overcast: ['#c4c8cc', '#a4a8ac'],
    night:    ['#1a1f35', '#3a3f5a'],
  };
  const [sky1, sky2] = skyPalette[time] || skyPalette.daylight;

  const id = `snap-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div style={{
      width, height: h,
      transform: `rotate(${tilt}deg)`,
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
      boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
    }}>
      <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={sky1} />
            <stop offset="1" stopColor={sky2} />
          </linearGradient>
          <linearGradient id={`${id}-car`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c2} />
            <stop offset="0.5" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
          <radialGradient id={`${id}-vignette`} cx="50%" cy="50%" r="70%">
            <stop offset="0.55" stopColor="rgba(0,0,0,0)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>
          <filter id={`${id}-grain`} x="0" y="0">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" />
          </filter>
        </defs>
        {/* Sky */}
        <rect x="0" y="0" width="400" height="180" fill={`url(#${id}-sky)`} />
        {/* Ground */}
        <rect x="0" y="180" width="400" height="120" fill="#2a2520" />
        {/* Car bumper shape — a soft band behind the plate */}
        <rect x="0" y="130" width="400" height="170" fill={`url(#${id}-car)`} />
        {/* Car body details — hinted panel lines */}
        <rect x="0" y="126" width="400" height="2" fill="rgba(0,0,0,0.4)" />
        <rect x="0" y="135" width="400" height="1" fill="rgba(255,255,255,0.1)" />
        {/* Reflection highlight */}
        <ellipse cx="80" cy="155" rx="60" ry="15" fill="rgba(255,255,255,0.15)" />
        {/* Plate mounting area (darker strip) */}
        <rect x="110" y="150" width="180" height="100" rx="4" fill="rgba(0,0,0,0.25)" />
        {/* Vignette + grain overlay */}
        <rect x="0" y="0" width="400" height="300" fill={`url(#${id}-vignette)`} />
        <rect x="0" y="0" width="400" height="300" filter={`url(#${id}-grain)`} opacity="0.5" />
      </svg>
      {/* Plate positioned over the snap */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '58%',
        transform: `translate(-50%, -50%) rotate(${(tilt * 0.3)}deg)`,
        width: '48%',
      }}>
        <Plate text={plate} state={state} width={width * 0.48} />
      </div>
    </div>
  );
}

Object.assign(window, { Plate, PhotoSnap, PLATE_STYLES });
