# Pixbit

Pixbit is a lightweight pixel manipulation library for JavaScript and TypeScript. It applies color adjustments and image effects directly to RGBA pixel buffers without requiring a browser canvas.

## Contents

- [Pixel Effects](effects.md) — Adjust colors, map tones, and apply common image effects.
- [Color Spaces](color-spaces.md) — Convert RGBA pixel buffers to HSV and CMYK-style channel data.

## Installation

```sh
npm install @rgsoft/pixbit
```

## Quick Start

Each pixel is stored as four consecutive channels in red, green, blue, alpha order. Pass a `Uint8ClampedArray` containing one or more pixels to an effect; the effect returns a new array and leaves the input unchanged.

```typescript
import { grayscale, negative } from "@rgsoft/pixbit";

const pixels = new Uint8ClampedArray([
  255, 0, 0, 255, // opaque red
]);

const grayPixels = grayscale(pixels);
const invertedPixels = negative(pixels);

console.log([...grayPixels]); // [76, 76, 76, 255]
console.log([...invertedPixels]); // [0, 255, 255, 255]
```

The array length must be a multiple of four. Invalid RGBA buffers throw an error. Color effects preserve the alpha channel.

## Exports

- **Color adjustment:** `add`, `multiply`
- **Tone and color effects:** `colorPop`, `duotone`, `grayscale`, `heatmap`, `negative`, `posterize`, `sepia`, `threshold`, `vintage`
- **Channel conversion:** `halftone`, `hsv`

All these functions are exported from the package entry point.
