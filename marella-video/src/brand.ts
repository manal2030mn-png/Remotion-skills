// Marella (ماريلا) – Taif brand palette, sampled from the official logo.
export const TEAL = "#254746";
export const TEAL_SOFT = "#334A4A";
export const IVORY = "#D3D4CA";
export const EMBER = "#FF8A2B";

// Pointed-arch window echoing the arch in Marella's logo mark.
// `inset` shrinks the shape uniformly to draw inner/outer frame lines.
export const FRAME = { left: 70, right: 1010, apex: 150, shoulder: 520, bottom: 1380 };

export const archPath = (inset = 0) => {
  const l = FRAME.left + inset;
  const r = FRAME.right - inset;
  const cx = (FRAME.left + FRAME.right) / 2;
  const apex = FRAME.apex + inset * 1.6;
  const shoulder = FRAME.shoulder + inset * 0.4;
  const b = FRAME.bottom - inset;
  const w = r - l;
  return [
    `M ${l} ${b}`,
    `L ${l} ${shoulder}`,
    `C ${l} ${shoulder - 230} ${l + w * 0.32} ${apex + 80} ${cx} ${apex}`,
    `C ${r - w * 0.32} ${apex + 80} ${r} ${shoulder - 230} ${r} ${shoulder}`,
    `L ${r} ${b}`,
    "Z",
  ].join(" ");
};
