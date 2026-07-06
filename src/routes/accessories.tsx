import { createFileRoute, Link } from "@tanstack/react-router";
import ork6Pkg from "../assets/ork6_package.jpg.asset.json";
import ork6Pdf from "../assets/ork6_parts_diagram.pdf.asset.json";
import { RelatedProducts, PageDisclaimers } from "../components/editorial";
import { ACCESSORIES_LIST, pickRelated } from "../data/products";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories | Pro-Drive Fasteners®" },
      { name: "description", content: "ORK-6 Maintenance Kit for MIII staplers, nailers & cleat tools. Mallet displays and Pro-Drive merchandising solutions." },
      { property: "og:title", content: "Accessories — Pro-Drive Fasteners®" },
      { property: "og:description", content: "ORK-6 Maintenance Kit and retail display solutions." },
      { property: "og:image", content: ork6Pkg.url },
      { property: "twitter:image", content: ork6Pkg.url },
    ],
  }),
  component: Acc,
});

const compatibility = [
  "MIII", "MIIIFN", "MIIIFS", "MIII886",
  "MIII812", "MFIII", "BTFP12569", "DWMIIIFN Type 0 & 1",
];

function Acc() {
  const related = pickRelated(ACCESSORIES_LIST.map(p => p.id), 6);
  return (
    <div>
      {/* HERO + ORK-6 FEATURE */}
      <section className="px-[6%] pt-20 pb-20 relative overflow-hidden" style={{ background: "var(--pd-dark)" }}>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 80% 30%, rgba(255,205,0,0.08), transparent 55%)",
          }}
        />
        <div className="relative z-10">
          <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Accessories</div>
          <h1 className="pd-display text-white mt-3" style={{ fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.02 }}>
            Keep Tools Running.<br />Keep Crews Working.
          </h1>
          <p className="mt-5 text-white/65 max-w-2xl" style={{ fontSize: 17, lineHeight: 1.6 }}>
            Maintenance kits engineered for the most common flooring tools, plus merchandising hardware
            that puts the Pro-Drive line front and center in your store.
          </p>

          {/* ORK-6 hero card */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mt-12 items-center">
            <div className="relative" style={{ background: "#fff", padding: 32, borderTop: "3px solid var(--pd-yellow)" }}>
              <img
                src={ork6Pkg.url}
                alt="Pro-Drive ORK-6 Maintenance Kit retail package"
                loading="eager"
                style={{ width: "100%", height: "auto", display: "block", maxHeight: 560, objectFit: "contain", margin: "0 auto" }}
              />
              <div className="pd-label absolute top-4 left-4" style={{ background: "var(--pd-yellow)", color: "var(--pd-dark)", padding: "6px 12px", fontSize: 11, letterSpacing: "0.15em", fontWeight: 800 }}>
                MADE IN THE USA
              </div>
            </div>
            <div>
              <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>ORK6-KIT-B</div>
              <h2 className="pd-display text-white mt-2" style={{ fontSize: 42, lineHeight: 1.05 }}>
                ORK-6 Maintenance Kit
              </h2>
              <div className="text-white/70 mt-3" style={{ fontSize: 16, lineHeight: 1.6 }}>
                Complete O-ring and gasket kit for MIII staplers, nailers, and cleat tools. Everything a
                contractor needs to rebuild the most common Bostitch-pattern flooring tools — sold in
                contractor-ready retail packaging.
              </div>

              <div className="grid grid-cols-3 gap-px mt-6" style={{ background: "rgba(255,255,255,0.08)" }}>
                {[
                  { k: "Pack", v: "20 / Case" },
                  { k: "Grade", v: "Contractor" },
                  { k: "Origin", v: "USA" },
                ].map(s => (
                  <div key={s.k} className="px-4 py-3" style={{ background: "var(--pd-darker)" }}>
                    <div className="pd-label" style={{ color: "rgba(255,205,0,0.5)", fontSize: 10 }}>{s.k}</div>
                    <div className="text-white font-bold mt-1" style={{ fontSize: 14 }}>{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="pd-label" style={{ color: "rgba(255,205,0,0.6)", fontSize: 11 }}>Tool Compatibility</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {compatibility.map(c => (
                    <span key={c} className="pd-glass-light px-3 py-1.5" style={{ fontSize: 11, color: "#fff", letterSpacing: "0.06em", fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-7 flex-wrap">
                <Link to="/contact" className="pd-btn-primary" style={{ padding: "12px 22px", fontSize: 12 }}>
                  Request Distributor Pricing →
                </Link>
                <a
                  href={ork6Pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-glass-light"
                  style={{
                    padding: "12px 22px", fontSize: 12, color: "#fff",
                    letterSpacing: "0.12em", fontWeight: 700, textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  ↓ Parts Diagram (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-light-bg)" }}>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-xl">
            <div className="pd-label" style={{ color: "var(--pd-gold)" }}>What's Inside</div>
            <h2 className="pd-display mt-2" style={{ color: "var(--pd-dark)", fontSize: 36, lineHeight: 1.1 }}>
              Every wear part, ready to install.
            </h2>
            <p className="mt-4" style={{ color: "var(--pd-muted)", fontSize: 15, lineHeight: 1.7 }}>
              The ORK-6 includes the full O-ring set and both piston gaskets — shown to scale below.
              Screws and washers are also in the kit but not pictured.
            </p>
          </div>
          <a
            href={ork6Pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-btn-primary"
            style={{ padding: "12px 22px", fontSize: 12 }}
          >
            ↓ Full Parts Diagram (PDF)
          </a>
        </div>

        <div className="bg-white p-8 md:p-12" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
          <ORK6PartsDiagram />
          <div className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="pd-label" style={{ color: "var(--pd-gold)", fontSize: 10 }}>
              Items shown to scale · Screws and washers not pictured
            </div>
            <div className="pd-label" style={{ color: "var(--pd-dark)", fontSize: 10 }}>
              ORK6-KIT-B · Pro-Drive Fasteners®
            </div>
          </div>
        </div>
      </section>

      {/* DISPLAYS */}
      <section className="px-[6%] py-16" style={{ background: "var(--pd-darker)" }}>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="pd-label" style={{ color: "var(--pd-yellow)" }}>Retail Merchandising</div>
            <h2 className="pd-display text-white mt-2" style={{ fontSize: 36 }}>Display Solutions</h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 460, fontSize: 14, lineHeight: 1.7 }}>
            Purpose-built fixtures for showcasing the Pro-Drive line at retail. Contact sales for availability and lead times.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <article className="pd-glass-light p-6" style={{ borderTop: "3px solid var(--pd-yellow)" }}>
            <div className="pd-label" style={{ color: "var(--pd-yellow)", fontSize: 11 }}>MALLET-DISP</div>
            <h3 className="text-white mt-2 font-bold" style={{ fontSize: 20 }}>Mallet Display</h3>
            <p className="text-white/65 mt-2 text-sm leading-relaxed">
              Branded floor display that merchandises the full Pro-Drive mallet line. Holds up to 8 mallets in a compact, retail-friendly footprint.
            </p>
            <div className="flex gap-4 mt-4 text-[11px]" style={{ color: "var(--pd-yellow)", letterSpacing: "0.1em", fontWeight: 700 }}>
              <span>HOLDS 8 MALLETS</span>
              <span>·</span>
              <span>BRANDED FIXTURE</span>
            </div>
            <Link to="/contact" className="pd-btn-primary mt-5 inline-block" style={{ padding: "10px 20px", fontSize: 11 }}>
              Contact Sales →
            </Link>
          </article>
          <article className="pd-glass-light p-6" style={{ borderTop: "3px solid rgba(255,205,0,0.4)" }}>
            <div className="pd-label" style={{ color: "rgba(255,205,0,0.6)", fontSize: 11 }}>Custom</div>
            <h3 className="text-white mt-2 font-bold" style={{ fontSize: 20 }}>Custom POP & Co-Branded Fixtures</h3>
            <p className="text-white/65 mt-2 text-sm leading-relaxed">
              Working on a flagship distributor program or a regional rollout? Our team builds custom point-of-purchase displays
              and co-branded merchandising to fit your floor plan.
            </p>
            <Link to="/contact" className="pd-btn-primary mt-5 inline-block" style={{ padding: "10px 20px", fontSize: 11 }}>
              Start a Conversation →
            </Link>
          </article>
        </div>
      </section>

      <RelatedProducts products={related} />
      <PageDisclaimers trademarks />
    </div>
  );
}

/* ---------- ORK-6 Parts Diagram (to-scale vector recreation) ---------- */

function Ring({ cx, cy, outer, stroke }: { cx: number; cy: number; outer: number; stroke: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={outer - stroke / 2}
      fill="none"
      stroke="var(--pd-dark)"
      strokeWidth={stroke}
    />
  );
}

function PartLabel({
  x,
  y,
  title,
  code,
  sub,
}: {
  x: number;
  y: number;
  title: React.ReactNode;
  code: string;
  sub?: string;
}) {
  return (
    <g textAnchor="middle" style={{ fontFamily: "'Gotham Bold', system-ui, sans-serif" }}>
      <text x={x} y={y} fontSize={22} fill="var(--pd-dark)" fontWeight={600}>
        {title}
      </text>
      {sub && (
        <text x={x} y={y + 26} fontSize={20} fill="var(--pd-dark)" fontWeight={600}>
          {sub}
        </text>
      )}
      <text x={x} y={y + (sub ? 58 : 32)} fontSize={26} fill="var(--pd-dark)" fontWeight={800}>
        {code}
      </text>
    </g>
  );
}

/**
 * Vector paths traced from the OEM ORK-6 parts diagram at true scale.
 * Native coordinate system: 1622 × 1206 (matching the source artwork).
 * Path data lives inside a group with the inverted-Y potrace transform.
 */
const ORK6_TRACED_PATHS: string[] = [
  // BIG gasket (#6500) — top-right teardrop with mounting ears + stem
  "M10430 11559 c-120 -14 -268 -46 -526 -114 -133 -36 -358 -94 -501 -129 -321 -79 -366 -101 -418 -205 -16 -32 -320 -952 -372 -1126 -63 -209 -91 -623 -55 -805 26 -129 65 -279 123 -467 32 -106 126 -432 208 -725 245 -872 258 -920 361 -1253 98 -316 187 -613 195 -648 23 -102 154 -536 175 -583 82 -181 250 -363 427 -462 227 -126 345 -158 563 -149 433 17 831 274 978 633 92 223 1094 3278 1151 3509 65 262 67 580 6 850 -75 330 -316 1177 -348 1222 -56 79 -61 81 -737 273 -450 127 -595 162 -752 179 -111 13 -368 12 -478 0z m455 -279 c612 -71 1158 -445 1423 -975 296 -594 248 -1299 -130 -1871 -148 -224 -369 -414 -694 -599 -180 -102 -268 -225 -284 -396 -7 -81 -27 -886 -24 -977 1 -19 16 -54 37 -85 161 -243 163 -562 6 -803 -178 -273 -499 -400 -817 -324 -308 74 -532 371 -534 710 -1 159 28 255 131 420 46 75 46 75 53 585 7 567 5 596 -53 706 -43 80 -121 149 -258 227 -145 83 -272 181 -401 311 -375 378 -569 981 -489 1516 83 551 422 1042 913 1322 61 35 113 63 118 63 4 0 36 13 70 29 272 124 621 176 933 141z m-1598 -161 c89 -43 123 -170 62 -235 -100 -108 -269 -47 -269 96 0 75 32 122 97 146 51 18 60 17 110 -7z m2961 -49 c126 -77 82 -266 -65 -278 -73 -6 -115 15 -143 73 -67 139 79 283 208 205z m-2501 -3869 c53 -28 72 -147 34 -205 -93 -141 -325 -40 -282 122 25 93 152 135 248 83z m1938 -20 c135 -76 73 -273 -86 -275 -139 -2 -200 184 -88 267 52 38 115 41 174 8z",
  // 86460 Poppet Piston O-Ring (upper-left large ring)
  "M3165 10340 c-1189 -121 -1961 -1286 -1589 -2399 274 -820 1102 -1345 1972 -1250 1290 140 2042 1493 1467 2639 -338 674 -1093 1086 -1850 1010z m343 -280 c695 -73 1241 -560 1394 -1242 30 -136 33 -451 5 -591 -127 -626 -604 -1100 -1247 -1238 -152 -33 -477 -33 -627 -1 -723 157 -1231 737 -1270 1450 -50 942 790 1723 1745 1622z",
  // 850143 Poppet I.D. O-Ring (small ring upper-center)
  "M6542 8405 c-164 -36 -338 -170 -410 -315 -135 -276 -50 -599 202 -768 116 -78 184 -97 341 -97 157 0 225 19 341 97 316 211 358 643 89 914 -152 154 -354 214 -563 169z m300 -232 c246 -115 312 -418 133 -612 -168 -181 -431 -182 -597 -2 -238 257 -43 662 312 648 70 -2 97 -8 152 -34z",
  // SMALL gasket (#6500) — round flange w/ center bore + 3 outer holes
  "M13840 7743 c-967 -70 -1587 -1061 -1223 -1953 384 -937 1612 -1183 2328 -466 851 851 324 2303 -875 2415 -112 11 -136 11 -230 4z m176 -182 c118 -72 50 -256 -89 -238 -82 11 -132 99 -101 177 30 74 121 103 190 61z m44 -461 c517 -82 815 -632 594 -1099 -307 -652 -1241 -593 -1471 94 -38 113 -40 331 -5 445 122 388 490 622 882 560z m-1056 -1204 c94 -39 105 -185 16 -231 -136 -70 -267 98 -157 202 49 46 83 53 141 29z m1973 -31 c109 -72 59 -238 -71 -238 -77 0 -126 53 -126 136 0 100 112 158 197 102z",
  // 86458 Plunger Internal (small ring center)
  "M6563 5800 c-362 -77 -556 -460 -397 -784 146 -298 536 -405 816 -224 458 296 265 991 -282 1013 -52 2 -114 0 -137 -5z m281 -188 c87 -41 155 -106 197 -189 48 -94 50 -234 4 -328 -149 -307 -591 -307 -740 0 -43 89 -44 232 -1 320 36 72 94 137 155 173 25 14 49 31 53 37 4 5 8 7 8 4 0 -3 21 0 48 8 78 22 199 11 276 -25z",
  // 850626 Piston O-Ring (lower-left largest ring)
  "M3063 5555 c-1138 -173 -1881 -1233 -1637 -2334 86 -384 309 -760 607 -1022 768 -674 1934 -654 2675 45 804 760 806 2027 5 2787 -272 257 -594 424 -975 505 -154 32 -519 43 -675 19z m547 -281 c860 -130 1482 -899 1419 -1752 -75 -1004 -1041 -1716 -2038 -1501 -51 12 -101 22 -110 24 -9 2 -61 20 -116 40 -556 208 -955 666 -1075 1232 -30 142 -37 392 -16 546 76 536 418 1007 911 1251 324 161 666 214 1025 160z",
  // 88998 Piloted Valve O-Ring (bottom-center ring)
  "M10510 3793 c-640 -84 -912 -843 -465 -1297 417 -423 1146 -230 1301 344 25 90 25 291 0 380 -72 268 -288 483 -552 550 -76 20 -222 32 -284 23z m271 -235 c387 -142 507 -622 227 -907 -397 -405 -1079 -55 -963 494 69 325 427 526 736 413z",
  // 85144 Plunger External (bottom-right ring)
  "M13905 3624 c-224 -28 -403 -136 -509 -307 -157 -254 -121 -581 87 -789 299 -299 791 -255 1022 91 227 343 85 797 -300 958 -78 32 -227 56 -300 47z m195 -180 c309 -86 452 -456 279 -725 -264 -412 -919 -231 -919 254 0 333 311 562 640 471z",
];

function ORK6PartsDiagram() {
  return (
    <svg
      viewBox="0 0 1622 1310"
      role="img"
      aria-label="ORK-6 Maintenance Kit — parts diagram shown to scale"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Traced OEM shape paths — native scale, Y-flipped like potrace output */}
      <g transform="translate(0,1206) scale(0.1,-0.1)" fill="var(--pd-dark)" stroke="none">
        {ORK6_TRACED_PATHS.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </g>

      {/* Labels — positioned in natural viewBox coordinates below each shape */}
      {/* 86460 Poppet Piston O-Ring — cx≈334 cy≈354 */}
      <PartLabel x={334} y={585} title="POPPET PISTON O-RING" code="86460" />
      {/* 850143 Poppet I.D. — cx≈667 cy≈423 */}
      <PartLabel x={667} y={520} title="POPPET" sub="I.D. O-RING" code="850143" />
      {/* 86458 Plunger Internal — cx≈667 cy≈680 */}
      <PartLabel x={667} y={775} title="PLUNGER" sub="O-RING (INTERNAL)" code="86458" />
      {/* 850626 Piston O-Ring — cx≈334 cy≈841 */}
      <PartLabel x={334} y={1075} title="PISTON O-RING" code="850626" />
      {/* BIG gasket — bbox cx≈1066 h ends 716 */}
      <PartLabel x={1066} y={770} title="GASKET" code="#6500 BIG" />
      {/* SMALL gasket — cx≈1393 h ends 714 */}
      <PartLabel x={1393} y={770} title="GASKET" code="#6500 SMALL" />
      {/* 88998 Piloted Valve — cx≈1059 cy≈902 */}
      <PartLabel x={1059} y={1030} title="PILOTED VALVE" sub="O-RING (LOWER) × 2" code="88998" />
      {/* 85144 Plunger External — cx≈1395 cy≈908 */}
      <PartLabel x={1395} y={1030} title="PLUNGER" sub="O-RING (EXTERNAL)" code="85144" />

      {/* "Shown to scale" note — sits in the empty gap between columns */}
      <g textAnchor="middle" style={{ fontFamily: "'Gotham Bold', system-ui, sans-serif", fontStyle: "italic" }}>
        <text x={667} y={905} fontSize={19} fill="var(--pd-dark)" fontWeight={700}>ITEMS ARE SHOWN</text>
        <text x={667} y={928} fontSize={19} fill="var(--pd-dark)" fontWeight={700}>TO SCALE. SCREWS AND</text>
        <text x={667} y={951} fontSize={19} fill="var(--pd-dark)" fontWeight={700}>WASHERS NOT PICTURED.</text>
      </g>
    </svg>
  );
}


