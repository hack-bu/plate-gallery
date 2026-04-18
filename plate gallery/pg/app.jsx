// Main app — lays out all screens in the design canvas as sections.

function App() {
  return (
    <DesignCanvas>
      {/* Title block */}
      <div style={{ padding: '20px 60px 40px', maxWidth: 1100 }}>
        <div style={{
          fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700,
          color: 'rgba(60,50,40,0.6)', letterSpacing: 1.5, marginBottom: 6,
        }}>
          DESIGN EXPLORATION · APR 18 · v1
        </div>
        <div style={{
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 96,
          color: '#1d1a14', letterSpacing: -3, lineHeight: 0.88,
        }}>
          PLATEGALLERY.
        </div>
        <div style={{
          fontFamily: PG.f.body, fontSize: 16, color: '#5a5246',
          marginTop: 10, lineHeight: 1.5, fontWeight: 500, maxWidth: 780,
        }}>
          A fresh UI direction for a vanity-plate social network. Warm Americana palette (cream / rust /
          cobalt / mustard), chunky rounded display (Sofia Sans Extra Condensed) + friendly body (Nunito),
          phone-snap photo treatments, and a <strong>periodic-table grid</strong> instead of a traditional
          map. Drag to pan · scroll/pinch to zoom.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <div style={{ padding: '6px 12px', background: PG.c.rust, color: PG.c.white, borderRadius: 999, fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>RUST · PRIMARY</div>
          <div style={{ padding: '6px 12px', background: PG.c.cobalt, color: PG.c.white, borderRadius: 999, fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>COBALT · ACCENT</div>
          <div style={{ padding: '6px 12px', background: PG.c.mustard, color: PG.c.ink, borderRadius: 999, fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>MUSTARD · POP</div>
          <div style={{ padding: '6px 12px', background: PG.c.cream, color: PG.c.ink, border: `1.5px solid ${PG.c.rule}`, borderRadius: 999, fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>CREAM · GROUND</div>
          <div style={{ padding: '6px 12px', background: PG.c.ink, color: PG.c.cream, borderRadius: 999, fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>INK · TEXT</div>
        </div>
      </div>

      <DCSection title="01 · Home feed" subtitle="Social feed with a plate-themed editorial voice. Phone-snap photos, big display-type captions, and a state-following sidebar.">
        <DCArtboard label="Home — signed in" width={1280} height={1020}>
          <ScreenHome />
        </DCArtboard>
        <DCPostIt top={10} left={1300} rotate={2.5}>
          Every post is framed as a "sighting" — time-stamped, geo-hinted, with a meta badge that says “IN THE WILD”. Makes uploads feel like field notes.
        </DCPostIt>
      </DCSection>

      <DCSection title="02 · Plate detail" subtitle="Celebrate a single plate as an object. Big display type, photo + vectorized plate side-by-side, comments below.">
        <DCArtboard label="Plate detail — SURFSUP" width={1280} height={1020}>
          <ScreenDetail />
        </DCArtboard>
      </DCSection>

      <DCSection title="03 · Upload flow" subtitle="Step 2 of 3. The auto-moderation panel is visible and honest — users see exactly what's being checked.">
        <DCArtboard label="Upload · Details step" width={1280} height={1020}>
          <ScreenUpload />
        </DCArtboard>
        <DCPostIt top={10} left={1300} rotate={-2}>
          The moderation checks are listed so users trust the system. OCR + plate detector + SFW + dup check.
        </DCPostIt>
      </DCSection>

      <DCSection title="04 · The Periodic Table of Plates" subtitle="Signature screen. 51 state tiles in a geographic-ish grid, heat-mapped by volume. Locked states show 🔒.">
        <DCArtboard label="USA Map — periodic table" width={1280} height={1020}>
          <ScreenMap />
        </DCArtboard>
      </DCSection>

      <DCSection title="05 · State page" subtitle="Deep-dive into one state. Branded hero, top-10 leaderboard, fresh-sightings grid, and a state-specific fun-fact block.">
        <DCArtboard label="State · Massachusetts" width={1280} height={1020}>
          <ScreenState />
        </DCArtboard>
      </DCSection>

      <DCSection title="06 · Global leaderboard" subtitle="Hall of Plates across all 51 states. Podium treatment for top 3, table for the rest, sidebar stats for 'most competitive / rarest / wittiest'.">
        <DCArtboard label="Hall of Plates" width={1280} height={1020}>
          <ScreenLeaderboard />
        </DCArtboard>
      </DCSection>

      <DCSection title="07 · Creator profile" subtitle="A plate-spotter's page. Badge case, states-unlocked progress, and a grid of their best work.">
        <DCArtboard label="Profile · @robinjamal" width={1280} height={1020}>
          <ScreenProfile />
        </DCArtboard>
      </DCSection>

      <div style={{ padding: '0 60px 40px', maxWidth: 1000 }}>
        <div style={{
          fontFamily: PG.f.mono, fontSize: 11, fontWeight: 700,
          color: 'rgba(60,50,40,0.6)', letterSpacing: 1.5, marginBottom: 6,
        }}>
          NEXT STEPS
        </div>
        <div style={{
          fontFamily: PG.f.body, fontSize: 15, color: '#1d1a14',
          lineHeight: 1.55, fontWeight: 500,
        }}>
          • If you want, I can turn the <strong>Home feed</strong> or <strong>Map</strong> into a clickable React prototype.<br/>
          • Mobile variants of Home + Upload are an easy next addition (on-the-go upload is the killer use-case).<br/>
          • Additional explorations: darker "night drive" theme, a grid-layout feed, or a more experimental map with plates pinned geographically.
        </div>
      </div>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
