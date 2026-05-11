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

export function add(imageData: ImageData, value: pixel): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i + 0];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    const [ra, ga, ba] = value;
    const tr = clamp(r + ra, 0, 255);
    const tg = clamp(g + ga, 0, 255);
    const tb = clamp(b + ba, 0, 255);
    newRgba.push(tr, tg, tb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function duotone(imageData: ImageData, from: pixel, to: pixel): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i + 0];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    const [rf, gf, bf] = from;
    const [rt, gt, bt] = to;
    const gray = getBrightness(r, g, b);

    const tr = mapRange(gray, 0, 255, rf, rt, true);
    const tg = mapRange(gray, 0, 255, gf, gt, true);
    const tb = mapRange(gray, 0, 255, bf, bt, true);
    newRgba.push(tr, tg, tb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function colorPop(
  imageData: ImageData,
  hueTarget: number,
  threshold: number = 20 / 360
): ImageData {
  validateRgba(imageData.data);
  if (hueTarget < 0 || hueTarget > 1) {
    throw new Error("Invalid hue target");
  }
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const gray = getBrightness(r, g, b);

    const [h] = rgbToHsl(r, g, b);

    if (isHueInRange(h, hueTarget, threshold)) {
      newRgba.push(r, g, b, a);
    } else {
      newRgba.push(gray, gray, gray, a);
    }
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function grayscale(imageData: ImageData): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const gr = getBrightness(r, g, b);
    newRgba.push(gr, gr, gr, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function heatmap(imageData: ImageData): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);

    const brightness = getBrightness(r, g, b) / 255;
    const clamped = clamp(brightness, 0, 1);
    const nr = Math.floor(255 * Math.min(1, clamped * 2));
    const ng = Math.floor(255 * (1 - Math.abs(clamped * 2 - 1)));
    const nb = Math.floor(255 * Math.min(1, (1 - clamped) * 2));

    newRgba.push(nr, ng, nb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function multiply(
  imageData: ImageData,
  value: pixel
): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const [rm, gm, bm] = value;
    const tr = clamp(r * rm, 0, 255);
    const tg = clamp(g * gm, 0, 255);
    const tb = clamp(b * bm, 0, 255);
    newRgba.push(tr, tg, tb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function negative(imageData: ImageData): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const tr = 255 - r;
    const tg = 255 - g;
    const tb = 255 - b;
    newRgba.push(tr, tg, tb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function posterize(imageData: ImageData, channels: number = 64): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const nr = Math.floor(r / channels) * channels;
    const ng = Math.floor(g / channels) * channels;
    const nb = Math.floor(b / channels) * channels;
    newRgba.push(nr, ng, nb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function sepia(imageData: ImageData): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const nr = sepiaRed(r, g, b);
    const ng = sepiaGreen(r, g, b);
    const nb = sepiaBlue(r, g, b);
    newRgba.push(nr, ng, nb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function threshold(
  imageData: ImageData,
  threshold: number
): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const gr = getBrightness(r, g, b) > threshold ? 255 : 0;
    newRgba.push(gr, gr, gr, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
}

export function vintage(imageData: ImageData): ImageData {
  validateRgba(imageData.data);
  const newRgba = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, a] = imageData.data.slice(i, i + 4);
    const nr = sepiaRed(r, g, b);
    const ng = sepiaGreen(r, g, b);
    const nb = sepiaBlue(r, g, b);
    newRgba.push(nr, ng, nb, a);
  }
  const data = new Uint8ClampedArray(newRgba);
  return new ImageData(data, imageData.width, imageData.height);
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
