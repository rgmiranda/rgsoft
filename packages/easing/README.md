# Easing

A comprehensive collection of 30 easing functions (10 families × 3 variants) for smooth, natural-feeling animations and transitions.

## Installation

```sh
npm install @rgsoft/easing
```

## Documentation

- [Main Documentation](https://github.com/rgmiranda/rgsoft/blob/main/docs/easing/index.md) — Overview and quick start guide
- [Function Reference](https://github.com/rgmiranda/rgsoft/blob/main/docs/easing/functions.md) — Complete reference for all 30 easing functions
- [Usage Guide](https://github.com/rgmiranda/rgsoft/blob/main/docs/easing/usage.md) — Practical examples and integration patterns

## Quick Start

```typescript
import {
  easeInOutQuad,
  easeOutElastic,
  easeInBounce,
} from '@rgsoft/easing';

const progress = 0.5;

// Smooth ease-in-out quadratic
const quadValue = easeInOutQuad(progress);

// Spring-like elastic motion
const elasticValue = easeOutElastic(progress);

// Playful bounce effect
const bounceValue = easeInBounce(progress);
```

## Available Easing Families

- `easeInSine`, `easeOutSine`, `easeInOutSine` — Smooth, subtle easing
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad` — Simple quadratic acceleration
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic` — Moderate cubic acceleration
- `easeInQuart`, `easeOutQuart`, `easeInOutQuart` — Strong quartic acceleration
- `easeInQuint`, `easeOutQuint`, `easeInOutQuint` — Very strong quintic acceleration
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo` — Exponential acceleration
- `easeInCirc`, `easeOutCirc`, `easeInOutCirc` — Circular motion easing
- `easeInBack`, `easeOutBack`, `easeInOutBack` — Overshoots with settle effect
- `easeInElastic`, `easeOutElastic`, `easeInOutElastic` — Spring-like oscillations
- `easeInBounce`, `easeOutBounce`, `easeInOutBounce` — Bouncing motion

## Features

- **30 Easing Functions** — 10 families with In, Out, and InOut variants
- **Standard Conventions** — Based on [easings.net](https://easings.net) specifications
- **Zero Dependencies** — Pure mathematical functions
- **TypeScript Support** — Fully typed
- **Lightweight** — Minimal bundle size
- **Performance** — O(1) complexity, suitable for 60+ FPS animations

## Development

```sh
npm run build    # Build the package
npm run test     # Run tests
npm run coverage # Generate coverage report
```
