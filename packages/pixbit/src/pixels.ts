import { clamp, mapRange } from "@rgsoft/math";
import { pixel } from "./types";
import {
  getBrightness,
  hsvToRgb,
  isHueInRange,
  rgbToHsl,
  rgbToHsv,
  sepiaBlue,
  sepiaGreen,
  sepiaRed,
  validateHsl,
  validateRgba,
} from "./utils";

export function add(pixels: Uint8ClampedArray, value: pixel): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const [ra, ga, ba] = value;
    output[i + 0] = clamp(r + ra, 0, 255);
    output[i + 1] = clamp(g + ga, 0, 255);
    output[i + 2] = clamp(b + ba, 0, 255);
    output[i + 3] = a;
  }
  return output;
}

export function duotone(
  pixels: Uint8ClampedArray,
  from: pixel,
  to: pixel
): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const [rf, gf, bf] = from;
    const [rt, gt, bt] = to;
    const gray = getBrightness(r, g, b);
    output[i + 0] = mapRange(gray, 0, 255, rf, rt, true);
    output[i + 1] = mapRange(gray, 0, 255, gf, gt, true);
    output[i + 2] = mapRange(gray, 0, 255, bf, bt, true);
    output[i + 3] = a;
  }
  return output;
}

export function colorPop(
  pixels: Uint8ClampedArray,
  hueTarget: number,
  threshold: number = 20 / 360
): Uint8ClampedArray {
  validateRgba(pixels);
  if (hueTarget < 0 || hueTarget > 1) {
    throw new Error("Invalid hue target");
  }
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const gray = getBrightness(r, g, b);
    const [h] = rgbToHsl(r, g, b);
    if (isHueInRange(h, hueTarget, threshold)) {
      output[i + 0] = r;
      output[i + 1] = g;
      output[i + 2] = b;
    } else {
      output[i + 0] = gray;
      output[i + 1] = gray;
      output[i + 2] = gray;
    }
    output[i + 3] = a;
  }
  return output;
}

export function grayscale(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const gr = getBrightness(r, g, b);
    output[i + 0] = gr;
    output[i + 1] = gr;
    output[i + 2] = gr;
    output[i + 3] = a;
  }
  return output;
}

export function heatmap(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const brightness = getBrightness(r, g, b) / 255;
    const clamped = clamp(brightness, 0, 1);
    output[i + 0] = Math.floor(255 * Math.min(1, clamped * 2));
    output[i + 1] = Math.floor(255 * (1 - Math.abs(clamped * 2 - 1)));
    output[i + 2] = Math.floor(255 * Math.min(1, (1 - clamped) * 2));
    output[i + 3] = a;
  }
  return output;
}

export function multiply(
  pixels: Uint8ClampedArray,
  value: pixel
): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const [rm, gm, bm] = value;
    output[i + 0] = clamp(r * rm, 0, 255);
    output[i + 1] = clamp(g * gm, 0, 255);
    output[i + 2] = clamp(b * bm, 0, 255);
    output[i + 3] = a;
  }
  return output;
}

export function negative(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    output[i + 0] = 255 - r;
    output[i + 1] = 255 - g;
    output[i + 2] = 255 - b;
    output[i + 3] = a;
  }
  return output;
}

export function posterize(
  pixels: Uint8ClampedArray,
  channels: number = 64
): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    output[i + 0] = Math.floor(r / channels) * channels;
    output[i + 1] = Math.floor(g / channels) * channels;
    output[i + 2] = Math.floor(b / channels) * channels;
    output[i + 3] = a;
  }
  return output;
}

export function sepia(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    output[i + 0] = sepiaRed(r, g, b);
    output[i + 1] = sepiaGreen(r, g, b);
    output[i + 2] = sepiaBlue(r, g, b);
    output[i + 3] = a;
  }
  return output;
}

export function threshold(
  pixels: Uint8ClampedArray,
  threshold: number
): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    const gr = getBrightness(r, g, b) > threshold ? 255 : 0;
    output[i + 0] = gr;
    output[i + 1] = gr;
    output[i + 2] = gr;
    output[i + 3] = a;
  }
  return output;
}

export function vintage(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const output = new Uint8ClampedArray(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    output[i + 0] = sepiaRed(r, g, b);
    output[i + 1] = sepiaGreen(r, g, b);
    output[i + 2] = sepiaBlue(r, g, b);
    output[i + 3] = a;
  }
  return output;
}

/**
 *
 * @param { Uint8ClampedArray } pixels
 * @returns { Float32Array }
 */
export function halftone(pixels: Uint8ClampedArray): Float32Array {
  validateRgba(pixels);
  const cmykData = new Float32Array(pixels.length);
  for (let i = 0; i < pixels.length; i += 4) {
    const [r, g, b, a] = pixels.slice(i, i + 4);
    const nr = r / 255;
    const ng = g / 255;
    const nb = b / 255;
    const k = 1 - Math.max(nr, ng, nb);
    if (k === 1) {
      cmykData[i + 0] = 0;
      cmykData[i + 1] = 0;
      cmykData[i + 2] = 0;
      cmykData[i + 3] = 1;
    } else {
      cmykData[i + 0] = (1 - nr - k) / (1 - k);
      cmykData[i + 1] = (1 - ng - k) / (1 - k);
      cmykData[i + 2] = (1 - nb - k) / (1 - k);
      cmykData[i + 3] = k;
    }
  }
  return cmykData;
}

/**
 *
 * @param { Uint8ClampedArray } pixels
 * @returns { Uint8ClampedArray }
 */
export function hsv(pixels: Uint8ClampedArray): Uint8ClampedArray {
  validateRgba(pixels);
  const hsvPixels = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i + 0];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const hsv = rgbToHsv(r, g, b);
    hsvPixels[i + 0] = hsv[0];
    hsvPixels[i + 1] = hsv[1];
    hsvPixels[i + 2] = hsv[2];
    hsvPixels[i + 3] = pixels[i + 3];
  }

  return hsvPixels
}

/**
 *
 * @param { Float32Array } pixels
 * @returns { Uint8ClampedArray }
 */
export function rgba(pixels: Float32Array): Uint8ClampedArray {
  validateHsl(pixels);
  const rgbPixels = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const h = pixels[i + 0];
    const s = pixels[i + 1];
    const v = pixels[i + 2];
    const rgb = hsvToRgb(h, s, v);
    rgbPixels[i + 0] = rgb[0];
    rgbPixels[i + 1] = rgb[1];
    rgbPixels[i + 2] = rgb[2];
    rgbPixels[i + 3] = pixels[i + 3];
  }

  return rgbPixels
}
