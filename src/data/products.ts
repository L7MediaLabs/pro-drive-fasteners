// Pro-Drive Fasteners full product catalog
export type Product = {
  id: string;
  name: string;
  specs?: string[];
  pack?: string;
};

export const STAPLES_15_5 = [
  { id: "FS-150-5000", name: '1-1/2" (38mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "5,000 count · 18.2 lbs" },
  { id: "FS-175-5000", name: '1-3/4" (44mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "5,000 count · 20.4 lbs" },
  { id: "FS-175-9000", name: '1-3/4" (44mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "9,000 count · 36.9 lbs" },
  { id: "FS-200-5000", name: '2" (50mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "5,000 count · 23.8 lbs" },
  { id: "FS-200-6000", name: '2" (50mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "1,000 x 6 · 28.1 lbs" },
  { id: "FS-200-7200", name: '2" (50mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "7,720 count · 35.1 lbs" },
  { id: "FS-10300-150", name: '1-1/2" (38mm) Flooring Staple', specs: ["15.5 GA", "Electro-Galvanized Chisel Point"], pack: "10,300 count · 36.9 lbs" },
];

export const STAPLES_15_Q = [
  { id: "Q21", name: '2" (50mm) Q-Wire Staple', specs: ["15 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 count · 23.1 lbs" },
  { id: "Q25", name: '2-1/2" (64mm) Q-Wire Staple', specs: ["15 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 count · 29.7 lbs" },
];

export const STAPLES_16_N = [
  { id: "MC750-N11", name: '3/4" (19mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "15,000 count · 21.0 lbs" },
  { id: "MC875-N12", name: '7/8" (22mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "15,000 count · 21.5 lbs" },
  { id: "MC100-N13", name: '1" (25mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "12,000 count · 21.3 lbs" },
  { id: "MC125-N15", name: '1-1/4" (32mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "10,000 count · 22.0 lbs" },
  { id: "MC150-N17", name: '1-1/2" (38mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "10,000 count · 25.3 lbs" },
  { id: "MC200-N21", name: '2" (50mm) N-Wire Staple', specs: ["16 GA", '7/16" Crown', "E-G Galvanized Chisel Point"], pack: "10,000 count · 34.0 lbs" },
];

export const STAPLES_18_M = [
  { id: "M10BAB58", name: '5/8" M-Wire Staple', specs: ["18 GA", '3/8" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 x 10 (50,000) · 36.5 lbs" },
  { id: "M11BAB34", name: '3/4" M-Wire Staple', specs: ["18 GA", '3/8" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 x 10 (50,000) · 43.7 lbs" },
  { id: "M12BAB78", name: '7/8" M-Wire Staple', specs: ["18 GA", '3/8" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 x 10 (50,000) · 23.1 lbs" },
  { id: "M13BAB100", name: '1" M-Wire Staple', specs: ["18 GA", '3/8" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 x 10 (50,000) · 56.4 lbs" },
  { id: "M15BAB125", name: '1-1/4" M-Wire Staple', specs: ["18 GA", '3/8" Crown', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 55.3 lbs" },
];

export const STAPLES_18_L = [
  { id: "1824-L11", name: '3/4" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 37.8 lbs" },
  { id: "1828-L12", name: '7/8" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 42.0 lbs" },
  { id: "1832-L13", name: '1" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 46.8 lbs" },
  { id: "1836-L14", name: '1-1/8" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 46.8 lbs" },
  { id: "1840-L15", name: '1-1/4" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 53.2 lbs" },
  { id: "1848-L17", name: '1-1/2" L-Wire Staple', specs: ["18 GA", '1/4" Crown (Duo-Fast 1800)', "E-G Galvanized Chisel Point"], pack: "5,000 x 8 (40,000) · 62.7 lbs" },
];

export const LCLEATS_16 = [
  { id: "LC150-16", name: '1-1/2" (38mm) L-Cleat', specs: ["16 GA"], pack: "1,000 Count x 5 Boxes" },
  { id: "LC175-16", name: '1-3/4" (44mm) L-Cleat', specs: ["16 GA"], pack: "1,000 Count x 5 Boxes" },
  { id: "LC200-16", name: '2" (50mm) L-Cleat', specs: ["16 GA"], pack: "1,000 Count x 5 Boxes" },
];
export const LCLEATS_18 = [
  { id: "LC125-18", name: '1-1/4" (32mm) L-Cleat', specs: ["18 GA"], pack: "1,000 Count x 5 Boxes" },
  { id: "LC150-18", name: '1-1/2" (38mm) L-Cleat', specs: ["18 GA"], pack: "1,000 Count x 5 Boxes" },
  { id: "LC175-18", name: '1-3/4" (44mm) L-Cleat', specs: ["18 GA"], pack: "1,000 Count x 5 Boxes" },
];

export const FN15 = [
  { id: "FN1520-125", name: '1-1/4" (32mm) FN Nail', specs: ["15 GA", "25° Angle (Bostitch)", "E-G Galvanized"], pack: "4 x 3,655 count" },
  { id: "FN1524-15O", name: '1-1/2" (38mm) FN Nail', specs: ["15 GA", "25° Angle (Bostitch)", "E-G Galvanized"], pack: "4 x 3,655 count" },
  { id: "FN1532-200", name: '2" (50mm) FN Nail', specs: ["15 GA", "25° Angle (Bostitch)", "E-G Galvanized"], pack: "4 x 3,655 count" },
];

export const DA15 = [
  { id: "DA13-100", name: '1" (25mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 24.2 lbs" },
  { id: "DA15-125", name: '1-1/4" (32mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 23.7 lbs" },
  { id: "DA15-BARB", name: '1-1/4" (32mm) DA Nail — Barbed', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel Barb"], pack: "4,000 x 4" },
  { id: "DA17-150", name: '1-1/2" (38mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 24.4 lbs" },
  { id: "DA19-175", name: '1-3/4" (45mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 33.0 lbs" },
  { id: "DA21-200", name: '2" (50mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 36.7 lbs" },
  { id: "DA21-200SS", name: '2" (50mm) DA Nail — Stainless', specs: ["15 GA", "34° (Senco)", "Stainless Steel Chisel"], pack: "4,000 x 4" },
  { id: "DA25-250", name: '2-1/2" (64mm) DA Nail', specs: ["15 GA", "34° (Senco)", "E-G Galvanized Chisel"], pack: "4,000 x 4 · 45.8 lbs" },
  { id: "DA25-250SS", name: '2-1/2" (64mm) DA Nail — Stainless', specs: ["15 GA", "34° (Senco)", "Stainless Steel Chisel"], pack: "4,000 x 4" },
];

export const C16 = [
  { id: "C25-100", name: '1" (25mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 10 · 21.8 lbs" },
  { id: "C32-125", name: '1-1/4" (32mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 12 · 32.8 lbs" },
  { id: "C38-150", name: '1-1/2" (38mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 12 · 38.4 lbs" },
  { id: "C45-175", name: '1-3/4" (44mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 12 · 45.1 lbs" },
  { id: "C50-200", name: '2" (50mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 12 · 49.8 lbs" },
  { id: "C50-200SS", name: '2" (50mm) Finish Nail — Stainless', specs: ["16 GA", "0° Straight", "Stainless Steel"], pack: "2,500 x 12" },
  { id: "C64-250", name: '2-1/2" (64mm) Finish Nail', specs: ["16 GA", "0° Straight", "E-G Galvanized"], pack: "2,500 x 8 · 42.2 lbs" },
  { id: "C64-250SS", name: '2-1/2" (64mm) Finish Nail — Stainless', specs: ["16 GA", "0° Straight", "Stainless Steel"], pack: "2,500 x 12" },
];

export const AFN = [
  { id: "AFN-38", name: '1-1/2" (38mm) AFN Nail', specs: ["16 GA", "20° Paslode", "E-G Galvanized Chisel"], pack: "2,000 x 12 · 41 lbs" },
  { id: "AFN50-200", name: '2" (50mm) AFN Nail', specs: ["16 GA", "20° Paslode", "E-G Galvanized Chisel"], pack: "2,000 x 12 · 43 lbs" },
];

export const BRAD18 = [
  { id: "AXX08EAA-500", name: '1/2" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 10 lbs" },
  { id: "AXX10EAA-625", name: '5/8" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 10 lbs" },
  { id: "AXX11EAA-750", name: '3/4" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 10 lbs" },
  { id: "AXX13EAA-100", name: '1" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 12 lbs" },
  { id: "AXX15EAA-125", name: '1-1/4" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 12 lbs" },
  { id: "AXX17EAA-150", name: '1-1/2" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 12 lbs" },
  { id: "AXX21EAA-200", name: '2" Brad Nail', specs: ["18 GA", "Straight", "E-G Galvanized"], pack: "5,000 x 12 · 12 lbs" },
  { id: "AXX11EAA-750SS", name: '3/4" Brad Nail — Stainless', specs: ["18 GA", "Straight", "Stainless Steel"], pack: "1,000 x 8 · 8 lbs" },
];

export const PINS23 = [
  { id: "CZ10-58", name: '5/8" (16mm) Micro Pin', specs: ["23 GA", "E-G Galvanized"], pack: "4,500 x 24 · 10.1 lbs" },
  { id: "CZ11-34", name: '3/4" (19mm) Micro Pin', specs: ["23 GA", "E-G Galvanized"], pack: "4,500 x 24 · 11.3 lbs" },
  { id: "CZ13-100", name: '1" (25mm) Micro Pin', specs: ["23 GA", "E-G Galvanized"], pack: "4,500 x 24 · 16.0 lbs" },
  { id: "CZ16-138", name: '1-3/8" (35mm) Micro Pin', specs: ["23 GA", "E-G Galvanized"], pack: "4,500 x 24 · 20.8 lbs" },
  { id: "CZ08-500-10", name: '1/2" Micro Pin — Job Pack', specs: ["23 GA"], pack: "10,000 x 48 · 35.0 lbs" },
  { id: "CZ10-58-10", name: '5/8" Micro Pin — Job Pack', specs: ["23 GA"], pack: "10,000 x 48 · 43.0 lbs" },
  { id: "CZ-11-34-10", name: '3/4" Micro Pin — Job Pack', specs: ["23 GA"], pack: "10,000 x 48 · 48.1 lbs" },
  { id: "CZ13-100-10", name: '1" Micro Pin — Job Pack', specs: ["23 GA"], pack: "10,000 x 48 · 69.0 lbs" },
  { id: "CZ16-138-10", name: '1-3/8" Micro Pin — Job Pack', specs: ["23 GA"], pack: "10,000 x 24 · 45.5 lbs" },
];

export const DIVERGENT = [
  { id: "A11-10D", name: 'A11 Pad Staple', specs: ['3/8" Leg', '13/32" Crown', "20 GA", "E-G Galvanized Chisel", "Fits Arrow T50, Duo-Fast A-11, Arrow T55, Senco H, Rapid R11"], pack: "5,000 x 20 (100,000)" },
  { id: "5010-D", name: '5010 Pad Staple', specs: ['3/8" Leg', '1/2" Crown', "20 GA", "E-G Galvanized Chisel", "Fits BeA 95, Haubold 900, JK64, Prebena AD, Spotnails 35, Fasco ED-50"], pack: "5,000 x 20 (100,000)" },
  { id: "7512D", name: '7512 Hammer Tacker Staple', specs: ['3/8" Leg', '15/32" Crown', "19 GA", "Fits Duo-Fast HT-755, HT-755M"], pack: "5,000 x 20 (100,000)" },
  { id: "5418D", name: '5418 Stair Tread / Carpet Staple', specs: ['9/16" Leg', '3/16" Crown', "19 GA", "Available Tan or Gray Crown", "Fits Bostitch CR1000E, Cran 625 Pro, Duo-Fast DNS-5424, Fasco F1A 54DF-18"], pack: "5,000 x 20 (100,000)" },
];

export const MALLETS = [
  { id: "M1W", name: 'M1W® Mallet — Steel Head / White Cap', specs: ['15"', "2.6 lbs"], pack: "Packed 8 per carton (20.8 lbs total)" },
  { id: "M5W", name: 'M5W® Mallet — Steel Head / White Cap', specs: ['15"', "3.2 lbs"], pack: "Packed 8 per carton (25.6 lbs total)" },
  { id: "V-CAP", name: 'V-CAP Mallet — White Cap', specs: ['15"', "24 oz"], pack: "Packed 12 per carton (18 lbs total)" },
  { id: "DHW", name: 'DHW® Mallet — Steel Head / Two White Caps', specs: ['15"', "3.3 lbs"], pack: "Packed 8 per carton (26.4 lbs total)" },
  { id: "R5W", name: 'R5W® Mallet — Steel Head / White Cap', specs: ['15"', "2.8 lbs"], pack: "Packed 8 per carton (22.4 lbs total)" },
];

export const MALLET_CAPS = [
  { id: "100-V-CAP", name: 'White 2" V-Cap', specs: ["Pro-Angle™ Design", "For engineered flooring"] },
  { id: "CAP601B", name: 'Black 2-1/2" Cap', specs: ["For standard rubber cap mallets"] },
  { id: "GRAY-V-CAP", name: 'Gray V-Cap', specs: ["For 24oz mallet"] },
];

export const POLY_FACES = [
  { id: "POLY01-ORG", name: '2" Orange Striking Face', specs: ["Hardness: SOFT"], pack: "16 per case" },
  { id: "POLY01-BRO", name: '2" Brown Striking Face', specs: ["Hardness: SOFT/MED"], pack: "16 per case" },
  { id: "POLY01-GRE", name: '2" Green Striking Face', specs: ["Hardness: MEDIUM SOFT"], pack: "16 per case" },
  { id: "POLY01-RED", name: '2" Red Striking Face', specs: ["Hardness: HARD"], pack: "16 per case" },
  { id: "POLY01-BLK", name: '2" Black Striking Face', specs: ["Hardness: TOUGH"], pack: "16 per case" },
];

export const DEAD_BLOW = [
  { id: "200L-POLY-O-BR", name: 'Poly Dead Blow — Orange & Brown', specs: ['2" Poly Caps', "Only 2.2 lbs"] },
  { id: "200L-POLY-O-BL", name: 'Poly Dead Blow — Orange & Black', specs: ['2" Poly Caps', "Only 2.2 lbs"] },
  { id: "200L-POLY-BR-BR", name: 'Poly Dead Blow — Brown & Brown', specs: ['2" Poly Caps', "Special Order Only"] },
  { id: "200L-POLY-O-G", name: 'Poly Dead Blow — Orange & Green', specs: ['2" Poly Caps', "Special Order Only"] },
];

export const SPLIT_HEAD = [
  { id: "23002-150", name: '1-1/2" White Hammer Face', specs: ["Non-marring", "For Garland® split-head mallets"], pack: "80 per case" },
  { id: "23004-200", name: '2" White Hammer Face', specs: ["Non-marring", "For Garland® split-head mallets"], pack: "55 per case" },
];

export const TAPPING_BLOCKS = [
  { id: "TB-PRO-312", name: 'ONE TAP™ Heavy-Duty Tapping Block', specs: ["48oz weight", "Ergonomic wooden handle with hang hole", "Beveled edges prevent cracking", "Recessed channels ensure optimal plank alignment"], pack: "5 per carton · 15 lbs" },
  { id: "561-TB", name: '561 Tapping Block', specs: ['3" x 7" x 3/4"', "Plank alignment channels", "Beveled edges", "Ergonomic knob", "Hang hole"], pack: "8 per carton · 6 lbs" },
  { id: "392-TB", name: 'Wide Plank Wood Driving Tool', specs: ['11.5" x 4.5" x 4"', "3.5 lbs each", "Built-in plastic edge protects flooring", "Use with dead-blow mallets"], pack: "2 per carton · 7 lbs" },
];

export const NAILERS = [
  { id: "BRAD18", name: '18 GA Brad Nailer', specs: ["Weight: 3.06 lbs", 'Dim: 9.7" x 2.4" x 9.9"', "70–110 psi", "110 brad capacity", '5/8" to 2" range', "360° Exhaust Deflector · E-Z Tool-Free Depth · Non-Mar Pad"] },
  { id: "BRAD16", name: '16 GA Brad Nailer', specs: ["Weight: 4.19 lbs", 'Dim: 10.7" x 2.8" x 11.1"', "70–110 psi", "100 brad capacity", '1" to 2-1/2" range', "360° Adjustable Deflector · Quick Release Nose Cover"] },
];

export const HOSES = [
  { id: "BLUE-AIR250-50", name: 'E-Z Connect® Blue Braided Hose · 50 ft', specs: ['1/4" ID · 3/8" OD', "200 psi max"], pack: "20 per carton · 42 lbs" },
  { id: "RED-AIR250-50R", name: 'E-Z Connect® Red Braided Hose · 50 ft', specs: ['1/4" ID · 3/8" OD', "200 psi max"], pack: "20 per carton · 42 lbs" },
  { id: "AIR-PVC-YELLOW-50", name: 'Super-Flex Hybrid PVC Hose · Yellow · 50 ft', specs: ["300 psi max"], pack: "12 per carton · 39.1 lbs" },
];

export const FITTINGS = [
  { id: "AIR-MP20M", name: 'Industrial 6-Ball 1/4" NPT Male', pack: "10 per bag · 0.43 lbs" },
  { id: "AIR-MIC20F", name: 'Quick Coupler Industrial Nipple, Brass, 1/4" NPT Female', pack: "10 per bag · 2.36 lbs" },
  { id: "AIR-UCB1414", name: 'Brass Splicer for 3/8" x 1/4" Hose (Reusable)', pack: "10 per bag · 1.6 lbs" },
  { id: "AIR-SW-MP20M", name: '360° Swivel Nipple x 1/4" NPT Male', pack: "10 per bag · 1.9 lbs" },
];

export const ACCESSORIES_LIST = [
  { id: "ORK6-KIT-B", name: 'ORK-6 Maintenance Kit', specs: ["Fits all Bostitch® branded 15.5 GA staplers", "Fits 16 GA L-Cleat tools"], pack: "20 per case" },
  { id: "MALLET-DISP", name: 'Mallet Display', specs: ["Holds up to 8 mallets", "Heavy duty construction", "Displayable on any surface"], pack: "Contact sales for availability" },
];
