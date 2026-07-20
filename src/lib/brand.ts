// Brand normalization: appends ® to third-party brand names.
// Pro-Drive is the client's own brand — handled separately.
// Standards references (ASTM, NPT, NWFA) are NOT brands (NWFA is a nonprofit
// association mark and handled where appropriate outside this helper).

// Order matters: longer / more specific names first so "Stanley Bostitch"
// is matched before "Bostitch", "Metabo HPT" before "Metabo", etc.
const BRANDS: string[] = [
  "Stanley Bostitch",
  "Metabo HPT",
  "Porter-Cable",
  "Porter Cable",
  "Josef Kihlberg",
  "Grip-Rite",
  "Duo-Fast",
  "Spotnails",
  "Spotnail",
  "Prebena",
  "Unicatch",
  "Paslode",
  "Bostitch",
  "Garland",
  "Haubold",
  "Hitachi",
  "Grizzly",
  "Metabo",
  "DeWalt",
  "Dewalt",
  "Fasco",
  "FASCO",
  "Cadex",
  "Senco",
  "Arrow",
  "Rapid",
  "Grex",
  "ATRO",
  "Cran",
  "BeA",
  "MAX",
];

// Precompile a single regex with word boundaries, ordered by longest first.
// Negative lookahead prevents double-appending ®.
const BRAND_RE = new RegExp(
  "\\b(" +
    BRANDS
      .map((b) => b.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|") +
    ")\\b(?!®)",
  "g",
);

export function withRegistered(input: string): string {
  if (!input) return input;
  return input.replace(BRAND_RE, "$1®");
}
