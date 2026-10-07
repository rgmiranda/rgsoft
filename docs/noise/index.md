# Noise Library

The noise package provides seeded procedural-noise generators, fractal combinations, and decorators for modifying noise output. It is useful for procedural textures, terrain, and other applications that need repeatable, spatially varying values.

## Quick Start

```typescript
import { FBM, Perlin } from '@rgsoft/noise';

const terrain = new FBM(new Perlin('world-seed'), 5, 2, 0.5);
const height = terrain.noise2(12.4, 8.7);
```

Generators expose `noise1(x)`, `noise2(x, y)`, `noise3(x, y, z)`, and `noise4(x, y, z, w)`. Use the method that matches the dimensionality of the coordinates you are sampling. A string seed makes generated patterns repeatable between instances using that seed.

## Guides

- [Noise Generators](generators.md) — Available algorithms, seeded sampling, Worley noise, tiling, and domain warping
- [Fractal Noise](fractals.md) — Layering octaves with FBM, ridged, and turbulence transforms
- [Decorators](decorators.md) — Adjusting a generator's output and sampling space

## Package

Install from npm:

```sh
npm install @rgsoft/noise
```