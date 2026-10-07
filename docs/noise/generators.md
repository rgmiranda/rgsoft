# Noise Generators

Each generator can be sampled in one through four dimensions using its `noise1` to `noise4` methods. Seeded generators accept an optional string seed in their constructor; use the same algorithm and seed to recreate the same pattern.

## Gradient and Value Noise

- `Perlin` — Gradient noise with smooth interpolation.
- `Simplex` — Simplex-lattice gradient noise.
- `OpenSimplex` — OpenSimplex-style gradient noise.
- `ValueNoise` — Smoothly interpolated lattice values.
- `WhiteNoise` — Independent deterministic values at integer lattice coordinates.

```typescript
import { Perlin, ValueNoise } from '@rgsoft/noise';

const perlin = new Perlin('texture-seed');
const value = new ValueNoise('texture-seed');

const smoothSample = perlin.noise2(3.25, 8.5);
const interpolatedSample = value.noise2(3.25, 8.5);
```

## Worley Noise

`Worley` creates cellular patterns by measuring distances to nearby feature points. Its second constructor argument selects which distance result to return, and its third selects the distance metric.

`WorleyType` offers `F1`, `F2`, `F3`, `F2_MINUS_F1`, and `F3_MINUS_F1`. `WorleyDistanceType` offers `Euclidean`, `Manhattan`, and `Chebyshev` distance metrics.

```typescript
import { Worley, WorleyDistanceType, WorleyType } from '@rgsoft/noise';

const cells = new Worley(
  'cell-seed',
  WorleyType.F2_MINUS_F1,
  WorleyDistanceType.Euclidean,
);

const edgeSample = cells.noise2(3.25, 8.5);
```

Unlike the gradient-noise examples above, Worley samples are distance-derived and should not be assumed to fall in `[-1, 1]`.

## Tiling and Domain Warping

`Tileable` maps input coordinates around circles before sampling a source generator, providing periodic sampling in one or two dimensions. The wrapped sample repeats every $2\pi$ input units.

```typescript
import { Perlin, Tileable } from '@rgsoft/noise';

const tileable = new Tileable(new Perlin('tile-seed'));
const sample = tileable.noise2(1.2, 3.4);
```

`DomainWarp` uses one noise source to offset the coordinates sampled from another. The optional `strength` controls the amount of distortion and defaults to `20`.

```typescript
import { DomainWarp, Perlin } from '@rgsoft/noise';

const warped = new DomainWarp(
  new Perlin('surface-seed'),
  new Perlin('warp-seed'),
  { strength: 8 },
);

const sample = warped.noise2(1.2, 3.4);
```