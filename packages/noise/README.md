# Noise

A collection of seeded noise generators and composable modifiers for JavaScript and TypeScript. Use it to create procedural textures, terrain, and other smoothly varying values across one to four dimensions.

## Installation

```sh
npm install @rgsoft/noise
```

## Documentation

- [Main Documentation](https://github.com/rgmiranda/rgsoft/blob/main/docs/noise/index.md) — Overview and quick start
- [Noise Generators](https://github.com/rgmiranda/rgsoft/blob/main/docs/noise/generators.md) — Perlin, Simplex, OpenSimplex, Value, White, Worley, and more
- [Fractal Noise](https://github.com/rgmiranda/rgsoft/blob/main/docs/noise/fractals.md) — FBM, ridged, and turbulence noise
- [Decorators](https://github.com/rgmiranda/rgsoft/blob/main/docs/noise/decorators.md) — Transform, combine, and constrain noise output

## Quick Start

```typescript
import { FBM, Perlin } from '@rgsoft/noise';

const terrain = new FBM(new Perlin('world-seed'), 5, 2, 0.5);

const height = terrain.noise2(12.4, 8.7);
console.log(height);
```

Noise generators expose `noise1`, `noise2`, `noise3`, and `noise4` for sampling one-, two-, three-, and four-dimensional coordinates. Reusing a generator with the same seed produces repeatable patterns.

## Features

- **Noise algorithms** — Perlin, Simplex, OpenSimplex, Value, White, and Worley noise
- **Fractal combinations** — FBM, ridged, and turbulence noise with configurable octaves
- **Noise modifiers** — Amplitude, offset, spacing, clamping, curves, inversion, and more
- **Spatial effects** — Domain warping and tileable 1D/2D sampling
- **TypeScript support** — Typed API with seeded generators

## Tests

```sh
npm run test
```
