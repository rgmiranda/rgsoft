import { clamp } from "@rgsoft/math";

export function validateRgba(rgba: Uint8ClampedArray) {
  if (!(rgba instanceof Uint8ClampedArray)) {
    throw new Error("RGBA must be an array");
  }

  if (rgba.length % 4 !== 0) {
    throw new Error("Invalid number of elements in array");
  }
}

export function validateHsl(rgba: Uint8ClampedArray) {
  if (!(rgba instanceof Uint8ClampedArray)) {
    throw new Error("RGBA must be an array");
  }

  if (rgba.length % 4 !== 0) {
    throw new Error("Invalid number of elements in array");
  }

  for (let i = 0; i < rgba.length; i += 4) {
    const [h, s, l, a] = rgba.slice(i, 4);
    if (h < 0 || h > 1) {
      throw new Error("Hue must be between 0 and 1");
    }
    if (s < 0 || s > 1) {
      throw new Error("Saturation must be between 0 and 1");
    }
    if (l < 0 || l > 1) {
      throw new Error("Luminosity must be between 0 and 1");
    }
    if (a < 0 || a > 255) {
      throw new Error("Alpha channel must be between 0 and 255");
    }
  }
}

export function getBrightness(r: number, g: number, b: number): number {
  return clamp(0.299 * r + 0.587 * g + 0.114 * b, 0, 255);
}

export function sepiaRed(r: number, g: number, b: number): number {
  return clamp(0.393 * r + 0.769 * g + 0.189 * b, 0, 255);
}

export function sepiaGreen(r: number, g: number, b: number): number {
  return clamp(0.349 * r + 0.686 * g + 0.168 * b, 0, 255);
}

export function sepiaBlue(r: number, g: number, b: number): number {
  return clamp(0.272 * r + 0.534 * g + 0.131 * b, 0, 255);
}

export function isHueInRange(
  h: number,
  target: number,
  threshold: number
): boolean {
  const hDeg = h * 360;
  const diff = Math.min(Math.abs(hDeg - target), 360 - Math.abs(hDeg - target));
  return diff <= threshold;
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // gris
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

export function rgbToHsv(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const v = max;
  const s = max === 0 ? 0 : d / max;

  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, v];
}

export function hsvToRgb(
  h: number,
  s: number,
  v: number
): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [r * 255, g * 255, b * 255];
}
