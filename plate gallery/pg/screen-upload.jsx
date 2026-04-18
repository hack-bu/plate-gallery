// Upload flow — a "your turn to post" moment.
// Two-column: left = snap + auto-moderation feedback; right = form.

function ScreenUpload() {
  return (
    <BrowserFrame url="plategallery.us/upload" width={1280} height={1020}>
      <TopNav active="feed" />
      <div style={{ padding: '24px 48px', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <div style={{
            fontFamily: PG.f.display, fontWeight: 900, fontSize: 72,
            color: PG.c.ink, letterSpacing: -2, lineHeight: 0.9,
          }}>
            POST A PLATE.
          </div>
          <div style={{ fontSize: 14, color: PG.c.inkSoft, fontWeight: 600 }}>
            Step <strong style={{ color: PG.c.ink }}>2 of 3</strong> · Confirm details & submit for review
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {['Snap', 'Details', 'Review'].map((s, i) => (
              <div key={s} style={{
                height: 8, width: 80, borderRadius: 999,
                background: i <= 1 ? PG.c.rust : PG.c.paperEdge,
                border: `1.5px solid ${PG.c.rule}`,
              }} />
            ))}
          </div>
        </div>
        {/* Content */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, height: 'calc(100% - 110px)' }}>
          <UploadPreview />
          <UploadForm />
        </div>
      </div>
    </BrowserFrame>
  );
}

function UploadPreview() {
  return (
    <div style={{
      background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
      borderRadius: 18, boxShadow: `0 3px 0 ${PG.c.rule}`,
      padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.inkMuted, letterSpacing: 1.5, marginBottom: 8 }}>
        YOUR SNAP
      </div>
      {/* Photo tilted */}
      <div style={{
        flex: 1, background: PG.c.cream, border: `1.5px dashed ${PG.c.rule}`,
        borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ transform: 'rotate(-1.8deg)', boxShadow: `0 8px 24px ${PG.c.shadowHard}, 0 2px 0 ${PG.c.rule}`, border: `1.5px solid ${PG.c.rule}` }}>
          <PhotoSnap plate="BEANTWN" state="MA" width={440} height={330} carColor="navy" time="golden" />
        </div>
      </div>
      {/* Auto-moderation panel */}
      <div style={{
        marginTop: 16, padding: 14,
        background: PG.c.cream, border: `1.5px solid ${PG.c.rule}`, borderRadius: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999, background: PG.c.mint,
            color: PG.c.white, border: `1.5px solid ${PG.c.rule}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900,
          }}>✓</div>
          <div>
            <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, color: PG.c.ink, letterSpacing: -0.3, lineHeight: 1 }}>
              AUTO-MOD PASSED
            </div>
            <div style={{ fontSize: 12, color: PG.c.inkSoft, fontWeight: 600 }}>
              Ran 4 checks in 1.3s — all green.
            </div>
          </div>
          <div style={{ marginLeft: 'auto', fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.mint, letterSpacing: 1 }}>
            CONFIDENCE 0.94
          </div>
        </div>
        {[
          { ok: true,  label: 'Contains a license plate', sub: 'YOLO detector · bbox locked' },
          { ok: true,  label: 'Readable plate text',      sub: 'OCR: "BEANTWN" · 0.97' },
          { ok: true,  label: 'SFW / non-offensive',      sub: 'GPT moderation · clean' },
          { ok: true,  label: 'Not a duplicate',          sub: 'pHash vs 12,104 plates · no match' },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
            borderTop: i === 0 ? 'none' : `1px dashed ${PG.c.paperEdge}`,
            fontSize: 13,
          }}>
            <span style={{ color: PG.c.mint, fontWeight: 900 }}>✓</span>
            <span style={{ fontWeight: 700, color: PG.c.ink }}>{c.label}</span>
            <span style={{ marginLeft: 'auto', fontFamily: PG.f.mono, fontSize: 10, color: PG.c.inkMuted, fontWeight: 700 }}>{c.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadForm() {
  return (
    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Plate text */}
      <FormRow label="PLATE TEXT" hint="We read this from your photo. Fix if wrong.">
        <div style={{
          background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 12,
          padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: `0 3px 0 ${PG.c.rule}`,
        }}>
          <div style={{
            fontFamily: PG.f.display, fontWeight: 900, fontSize: 48, color: PG.c.ink,
            letterSpacing: -1, lineHeight: 1, flex: 1,
          }}>
            BEANTWN<span style={{ color: PG.c.inkMuted, fontWeight: 600 }}>|</span>
          </div>
          <Pill bg={PG.c.mustardLite}>7 / 8 CHARS</Pill>
        </div>
      </FormRow>

      {/* State picker */}
      <FormRow label="STATE" hint="Chose from the photo's backdrop? You can change it.">
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center', overflow: 'hidden',
        }}>
          <div style={{
            background: PG.c.ink, color: PG.c.cream, borderRadius: 12,
            padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
            border: `1.5px solid ${PG.c.rule}`,
          }}>
            <StateBadge code="MA" />
            <div>
              <div style={{ fontFamily: PG.f.display, fontWeight: 900, fontSize: 20, letterSpacing: -0.3, lineHeight: 1 }}>MASSACHUSETTS</div>
              <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>detected · 91% confident</div>
            </div>
          </div>
          {['NY', 'RI', 'CT', 'NH', 'ME'].map(s => (
            <div key={s} style={{
              width: 44, height: 44, borderRadius: 10,
              background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: PG.f.mono, fontWeight: 800, fontSize: 13, color: PG.c.inkSoft,
            }}>{s}</div>
          ))}
          <div style={{
            marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: PG.c.cobalt,
          }}>Show all 51 →</div>
        </div>
      </FormRow>

      {/* Caption */}
      <FormRow label="CAPTION" hint="Optional. What made you stop?">
        <div style={{
          background: PG.c.paper, border: `1.5px solid ${PG.c.rule}`, borderRadius: 12,
          padding: '12px 16px', minHeight: 70, fontFamily: PG.f.body, fontSize: 15, color: PG.c.ink, lineHeight: 1.4, fontWeight: 500,
        }}>
          spotted outside Fenway before the game — this sox fan <em style={{ color: PG.c.rust, fontStyle: 'normal', fontWeight: 700 }}>gets it</em>.
        </div>
      </FormRow>

      {/* Tags */}
      <FormRow label="TAGS" hint="Auto-suggested from the plate & photo.">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { l: 'sports',       on: true },
            { l: 'boston',       on: true },
            { l: 'red-sox',      on: true },
            { l: 'pre-game',     on: false },
            { l: 'pun',          on: false },
            { l: 'coffee-brown', on: false },
          ].map(t => (
            <div key={t.l} style={{
              padding: '6px 12px', borderRadius: 999,
              background: t.on ? PG.c.cobalt : PG.c.paper,
              color: t.on ? PG.c.cream : PG.c.inkSoft,
              border: `1.5px solid ${PG.c.rule}`,
              fontSize: 12, fontWeight: 800, fontFamily: PG.f.mono,
            }}>
              {t.on ? '✓ ' : '+ '}#{t.l}
            </div>
          ))}
        </div>
      </FormRow>

      {/* Rate limit callout */}
      <div style={{
        padding: '10px 14px', background: PG.c.mustardLite,
        border: `1.5px solid ${PG.c.rule}`, borderRadius: 10,
        fontSize: 12, color: PG.c.ink, fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 14 }}>ⓘ</span>
        You've uploaded <strong>3 of 5</strong> plates allowed this hour. Rate limit resets in 00:42:13.
      </div>

      {/* Submit row */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: PG.c.inkSoft, fontWeight: 700 }}>
          By posting you agree to the <span style={{ color: PG.c.cobalt }}>community guidelines</span>.
        </div>
        <button style={{
          marginLeft: 'auto', height: 52, padding: '0 24px', borderRadius: 999,
          background: PG.c.paper, color: PG.c.ink, border: `1.5px solid ${PG.c.rule}`,
          fontWeight: 800, fontSize: 14, cursor: 'pointer',
        }}>◀ BACK</button>
        <button style={{
          height: 52, padding: '0 32px', borderRadius: 999,
          background: PG.c.rust, color: PG.c.white, border: `1.5px solid ${PG.c.rule}`,
          fontFamily: PG.f.display, fontWeight: 900, fontSize: 22, letterSpacing: 0.3,
          boxShadow: `0 4px 0 ${PG.c.rustDeep}`, cursor: 'pointer',
        }}>SUBMIT PLATE →</button>
      </div>
    </div>
  );
}

function FormRow({ label, hint, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <div style={{ fontFamily: PG.f.mono, fontSize: 10, fontWeight: 700, color: PG.c.ink, letterSpacing: 1.5 }}>
          {label}
        </div>
        {hint && <div style={{ fontSize: 11, color: PG.c.inkMuted, fontWeight: 600 }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { ScreenUpload });
