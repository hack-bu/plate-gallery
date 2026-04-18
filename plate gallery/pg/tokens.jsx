// Design tokens — Warm Americana
// Cream background, rust primary, cobalt accent, mustard highlight

const PG = {
  c: {
    cream:      '#f5ecdc',   // page bg
    paper:      '#fbf6ea',   // card bg
    paperEdge:  '#ece2cc',
    ink:        '#1d1a14',   // primary text
    inkSoft:    '#5a5246',
    inkMuted:   '#9a9181',
    rule:       '#2a251c',
    rust:       '#c24a20',   // primary accent
    rustDeep:   '#8f3414',
    cobalt:     '#1e3a8a',   // secondary
    cobaltLite: '#3a5cc4',
    sky:        '#a9c6e8',
    mustard:    '#e6b245',   // tertiary pop
    mustardLite:'#f2cf7b',
    mint:       '#7ea28a',
    olive:      '#636b3a',
    cherry:     '#b6233d',
    white:      '#fffdf7',
    black:      '#0f0d09',
    shadow:     'rgba(40,26,10,0.12)',
    shadowHard: 'rgba(40,26,10,0.22)',
  },
  f: {
    display: '"Sofia Sans Extra Condensed", "Arial Narrow", sans-serif',
    body: '"Nunito", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  r: { sm: 6, md: 10, lg: 16, xl: 24, pill: 999 },
};

Object.assign(window, { PG });
