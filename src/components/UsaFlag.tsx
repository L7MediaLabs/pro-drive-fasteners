/**
 * UsaFlag — accurate inline-SVG US flag (13 stripes, 50-star union).
 *
 * Client direction (Hollis, Aug 20): any USA-made item gets the flag next to the
 * "Made in USA" text. Drawn as a vector so it stays crisp at badge sizes on both
 * light and dark grounds — no raster asset, no layout shift.
 */

const RED = "#B22234";
const BLUE = "#3C3B6E";
const STRIPE_H = 650 / 13;
const UNION_W = 494;
const UNION_H = 350;

function starPoints(cx: number, cy: number, outer = 15, inner = 5.7): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

// Standard 50-star grid: a star wherever column and row share parity.
const STARS: { x: number; y: number }[] = [];
for (let col = 1; col <= 11; col++) {
  for (let row = 1; row <= 9; row++) {
    if (col % 2 === row % 2) {
      STARS.push({ x: col * (UNION_W / 12), y: row * (UNION_H / 10) });
    }
  }
}

export function UsaFlag({
  height = 16,
  title = "Made in USA",
  className = "",
}: {
  /** px number, or any CSS length such as "0.75em" so it scales with the heading. */
  height?: number | string;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1235 650"
      role="img"
      aria-label={title}
      style={{
        height,
        width: "auto",
        display: "block",
        flexShrink: 0,
        border: "1px solid rgba(0,0,0,0.18)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
        background: "#fff",
      }}
    >
      <title>{title}</title>
      <rect width="1235" height="650" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map(i => (
        <rect key={i} y={i * STRIPE_H} width="1235" height={STRIPE_H} fill={RED} />
      ))}
      <rect width={UNION_W} height={UNION_H} fill={BLUE} />
      {STARS.map((s, i) => (
        <polygon key={i} points={starPoints(s.x, s.y)} fill="#FFFFFF" />
      ))}
    </svg>
  );
}

export default UsaFlag;
