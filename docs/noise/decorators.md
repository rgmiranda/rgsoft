# Noise Decorators

Decorators wrap a noise source and return another object with the same `noise1` through `noise4` sampling interface. They can be nested to build a processing pipeline.

## Available Decorators

- `Abs(source)` — Returns the absolute value of each sample.
- `Amp(source, amplitude)` — Scales sample values by an amplitude.
- `Clamp(source, [min, max])` — Limits sample values to the specified range.
- `Curve(source, curve)` — Remaps normalized output values through a callback.
- `Invert(source)` — Negates sample values.
- `Offset(source, offset)` — Adds a constant to sample values.
- `Space(source, spacing)` — Scales input coordinates before sampling.

```typescript
import { Amp, Clamp, FBM, Perlin, Space } from '@rgsoft/noise';

const source = new FBM(new Perlin('terrain-seed'), 5, 2, 0.5);
const detailed = new Space(source, 1.5);
const height = new Amp(new Clamp(detailed, [0, 1]), 100);

const sample = height.noise2(12.4, 8.7);
```

This composes coordinate scaling, output clamping, and amplitude scaling. Choose the order based on the effect needed: decorators apply in the order they wrap each other.