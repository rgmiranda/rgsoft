# Pixbit

Pixel manipulation utilities for JavaScript and TypeScript.

## Installation

```sh
npm install @rgsoft/pixbit
```

## Documentation

- [Main Documentation](https://github.com/rgmiranda/rgsoft/blob/main/docs/pixbit/index.md) — Overview and quick start
- [Pixel Effects](https://github.com/rgmiranda/rgsoft/blob/main/docs/pixbit/effects.md) — Color adjustments and image effects
- [Color Spaces](https://github.com/rgmiranda/rgsoft/blob/main/docs/pixbit/color-spaces.md) — HSV and CMYK-style channel data

## Quick Start

```typescript
import { grayscale } from "@rgsoft/pixbit";

const pixels = new Uint8ClampedArray([255, 0, 0, 255]);
const grayPixels = grayscale(pixels);

console.log([...grayPixels]); // [76, 76, 76, 255]
```
