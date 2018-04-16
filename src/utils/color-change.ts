import * as tinycolor from 'tinycolor2';

export function colorChange(data, oldHue?: any) {
  let alpha = data && data.a;
  let color;
  // hsl is better than hex between conversions
  if (data && data.hsl) {
    color = tinycolor(data.hsl);
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex);
  } else {
    color = tinycolor(data);
  }
  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1);
  }
  let hsl = color.toHsl();
  let hsv = color.toHsv();
  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0;
  }
  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha()
  };
}
