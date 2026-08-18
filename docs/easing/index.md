# Easing Functions Library

A comprehensive collection of easing functions for smooth, natural-feeling animations and transitions. This library provides 10 different easing families with three variants each (ease-in, ease-out, and ease-in-out), following the standard easing conventions from [easings.net](https://easings.net).

This package is perfect for animations, UI transitions, game development, data visualization, and any application requiring smooth interpolation between values.

## Contents

- [Function Reference](functions.md) — Complete reference for all easing functions and their characteristics
- [Usage Guide](usage.md) — Practical examples and integration patterns

## Quick Start

```typescript
import { easeInOutQuad, easeOutElastic, easeInBounce } from '@rgsoft/easing';

// Get eased value for progress 0-1
const progress = 0.5;

// Smooth ease-in-out quadratic interpolation
const quadValue = easeInOutQuad(progress);

// Elastic ease-out for spring-like motion
const elasticValue = easeOutElastic(progress);

// Bounce ease-in for playful animation
const bounceValue = easeInBounce(progress);

console.log(quadValue);      // 0.5
console.log(elasticValue);   // > 1.0 (overshoots)
console.log(bounceValue);    // < 0.5 (bounces)
```

## Available Easing Families

| Family | Characteristics | Use Cases |
|--------|-----------------|-----------|
| **Sine** | Smooth, subtle | General animations, fade-ins |
| **Quad** | Simple acceleration | Standard UI transitions |
| **Cubic** | Moderate acceleration | Sliding, moving elements |
| **Quart** | Stronger acceleration | Quick, snappy animations |
| **Quint** | Strong acceleration | Emphasis, dramatic changes |
| **Expo** | Very strong acceleration | Loading indicators, emphasis |
| **Circ** | Circular motion | Rotations, circular movements |
| **Back** | Overshoots then settles | Playful bouncy effects |
| **Elastic** | Spring-like motion | Spring physics, elastic effects |
| **Bounce** | Bouncing motion | Ball bouncing, playful reactions |

## Basic Usage Pattern

All easing functions follow the same signature:

```typescript
function ease(progress: number): number
```

Where:
- **Input (progress):** A normalized value from 0 to 1 representing animation progress
- **Output:** The eased value (typically 0 to 1, but may overshoot depending on the function)

### Applying Easing to Animation

```typescript
import { easeOutQuad } from '@rgsoft/easing';

function animateValue(startValue: number, endValue: number, duration: number) {
  let elapsed = 0;
  
  function update(deltaTime: number) {
    elapsed += deltaTime;
    
    // Normalize progress to 0-1
    const progress = Math.min(elapsed / duration, 1);
    
    // Apply easing function
    const easedProgress = easeOutQuad(progress);
    
    // Interpolate between start and end
    const currentValue = startValue + (endValue - startValue) * easedProgress;
    
    console.log(`Value: ${currentValue}`);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

animateValue(0, 100, 1000);  // Animate from 0 to 100 over 1 second
```

## Easing Variants

Each easing family provides three variants:

- **Ease-In** (`easeInXxx`) — Slow start, fast end. Acceleration effect.
- **Ease-Out** (`easeOutXxx`) — Fast start, slow end. Deceleration effect.
- **Ease-In-Out** (`easeInOutXxx`) — Slow start and end, fast middle. Smooth, natural motion.

### Example: Comparing Variants

```typescript
import {
  easeInQuad,
  easeOutQuad,
  easeInOutQuad
} from '@rgsoft/easing';

const progress = 0.5;

console.log(easeInQuad(progress));      // 0.25 (slow at first)
console.log(easeOutQuad(progress));     // 0.75 (starts fast, slowing down)
console.log(easeInOutQuad(progress));   // 0.5 (midpoint)
```

## Highlights

- **30 Easing Functions** — 10 families × 3 variants each
- **Standard Conventions** — Based on [easings.net](https://easings.net) specifications
- **Zero Dependencies** — Pure mathematical functions, no external deps
- **TypeScript Support** — Fully typed for better development experience
- **Lightweight** — Minimal bundle size for animations in any application
- **Predictable Behavior** — Each function has consistent characteristics

## Common Applications

### UI Animations
```typescript
import { easeInOutQuad } from '@rgsoft/easing';

// Smooth slide-in effect
const opacity = easeInOutQuad(progress);
```

### Game Movement
```typescript
import { easeOutCubic } from '@rgsoft/easing';

// Smooth deceleration for character movement
const position = easeOutCubic(progress);
```

### Spring Physics
```typescript
import { easeOutElastic } from '@rgsoft/easing';

// Natural spring-like bouncing
const scale = 1 + easeOutElastic(progress) * 0.2;
```

### Bounce Effects
```typescript
import { easeOutBounce } from '@rgsoft/easing';

// Playful bounce on landing
const yPosition = easeOutBounce(progress);
```

## Performance Considerations

- All functions are pure functions with O(1) complexity
- Suitable for high-frequency updates (60+ FPS)
- Can be safely used in requestAnimationFrame loops
- No memory allocations or side effects
