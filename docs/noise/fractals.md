# Fractal Noise

Fractal generators layer multiple samples of a source noise field at increasing frequencies. Their constructor accepts a source generator, octave count, lacunarity, and gain:

```typescript
new FBM(source, octaves, lacunarity, gain)
```

Defaults are one octave, lacunarity `2`, and gain `0.5`. Octaves must be at least `1`. Higher octave counts add detail; lacunarity controls how frequency increases between octaves, while gain controls how amplitude decreases.

## Variants

- `FBM` — Adds the source samples directly for layered natural variation.
- `Ridged` — Transforms each sample with `1 - abs(value)` to emphasize ridges.
- `Turbulence` — Transforms each sample with `abs(value)` for folded, turbulent patterns.

```typescript
import { FBM, Perlin, Ridged, Turbulence } from '@rgsoft/noise';

const source = new Perlin('terrain-seed');
const fbm = new FBM(source, 5, 2, 0.5);
const ridges = new Ridged(source, 5, 2, 0.5);
const turbulence = new Turbulence(source, 5, 2, 0.5);

const height = fbm.noise2(12.4, 8.7);
const ridge = ridges.noise2(12.4, 8.7);
const detail = turbulence.noise2(12.4, 8.7);
```

All variants expose the same `noise1` through `noise4` sampling methods as their source generators.