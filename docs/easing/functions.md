# Easing Functions Reference

Complete reference for all 30 easing functions, organized by family.

## Function Signatures

All easing functions follow this signature:

```typescript
function ease(x: number): number
```

**Parameter:**
- `x` — Progress value, typically from 0 to 1 (represents animation progress)

**Returns:**
- Eased value, typically from 0 to 1 (but may overshoot depending on the function)

## Sine Family

Smooth, subtle easing using sine waves. Great for general-purpose animations.

### `easeInSine(x: number): number`

Slow start, accelerates to normal speed.

```typescript
easeInSine(0.0)  // 0.0
easeInSine(0.5)  // ~0.293
easeInSine(1.0)  // 1.0
```

**Use cases:** Fade-in, gentle entrances, smooth reveals

### `easeOutSine(x: number): number`

Fast start, decelerates to normal speed.

```typescript
easeOutSine(0.0)  // 0.0
easeOutSine(0.5)  // ~0.707
easeOutSine(1.0)  // 1.0
```

**Use cases:** Fade-out, smooth exits, landing effects

### `easeInOutSine(x: number): number`

Slow start and end, fast in middle.

```typescript
easeInOutSine(0.0)   // 0.0
easeInOutSine(0.5)   // 0.5
easeInOutSine(1.0)   // 1.0
```

**Use cases:** General smooth transitions, door opening/closing, smooth scrolling

---

## Quad Family

Simple quadratic acceleration (x²). Good for standard UI transitions.

### `easeInQuad(x: number): number`

Quadratic acceleration: x²

```typescript
easeInQuad(0.0)   // 0.0
easeInQuad(0.5)   // 0.25
easeInQuad(1.0)   // 1.0
```

**Use cases:** Button clicks, menu slides, quick animations

### `easeOutQuad(x: number): number`

Quadratic deceleration: 1 - (1-x)²

```typescript
easeOutQuad(0.0)   // 0.0
easeOutQuad(0.5)   // 0.75
easeOutQuad(1.0)   // 1.0
```

**Use cases:** Smooth button releases, gentle landings, UI reveals

### `easeInOutQuad(x: number): number`

Combination of easeInQuad and easeOutQuad.

```typescript
easeInOutQuad(0.0)   // 0.0
easeInOutQuad(0.5)   // 0.5
easeInOutQuad(1.0)   // 1.0
```

**Use cases:** Modal dialogs, sliding panels, general transitions

---

## Cubic Family

Cubic acceleration (x³). Moderate speed for smooth animations.

### `easeInCubic(x: number): number`

Cubic acceleration: x³

```typescript
easeInCubic(0.0)   // 0.0
easeInCubic(0.5)   // 0.125
easeInCubic(1.0)   // 1.0
```

**Use cases:** Expanding elements, zoom-in effects, growing animations

### `easeOutCubic(x: number): number`

Cubic deceleration: 1 - (1-x)³

```typescript
easeOutCubic(0.0)   // 0.0
easeOutCubic(0.5)   // 0.875
easeOutCubic(1.0)   // 1.0
```

**Use cases:** Collapsing elements, zoom-out effects, shrinking animations

### `easeInOutCubic(x: number): number`

Combination of easeInCubic and easeOutCubic.

```typescript
easeInOutCubic(0.0)   // 0.0
easeInOutCubic(0.5)   // 0.5
easeInOutCubic(1.0)   // 1.0
```

**Use cases:** Smooth scaling, carousel scrolling, content transitions

---

## Quart Family

Quartic acceleration (x⁴). Stronger acceleration than cubic.

### `easeInQuart(x: number): number`

Quartic acceleration: x⁴

```typescript
easeInQuart(0.0)   // 0.0
easeInQuart(0.5)   // 0.0625
easeInQuart(1.0)   // 1.0
```

**Use cases:** Dramatic zoom-in, emphasized entrances, attention-grabbing animations

### `easeOutQuart(x: number): number`

Quartic deceleration: 1 - (1-x)⁴

```typescript
easeOutQuart(0.0)   // 0.0
easeOutQuart(0.5)   // 0.9375
easeOutQuart(1.0)   // 1.0
```

**Use cases:** Snappy exits, quick landings, responsive UI feedback

### `easeInOutQuart(x: number): number`

Combination of easeInQuart and easeOutQuart.

```typescript
easeInOutQuart(0.0)   // 0.0
easeInOutQuart(0.5)   // 0.5
easeInOutQuart(1.0)   // 1.0
```

**Use cases:** Impactful transitions, page animations, dramatic reveals

---

## Quint Family

Quintic acceleration (x⁵). Very strong acceleration.

### `easeInQuint(x: number): number`

Quintic acceleration: x⁵

```typescript
easeInQuint(0.0)   // 0.0
easeInQuint(0.5)   // 0.03125
easeInQuint(1.0)   // 1.0
```

**Use cases:** Dramatic emphasis, loading indicators, strong visual impact

### `easeOutQuint(x: number): number`

Quintic deceleration: 1 - (1-x)⁵

```typescript
easeOutQuint(0.0)   // 0.0
easeOutQuint(0.5)   // 0.96875
easeOutQuint(1.0)   // 1.0
```

**Use cases:** Powerful impacts, emphatic landings, climactic animations

### `easeInOutQuint(x: number): number`

Combination of easeInQuint and easeOutQuint.

```typescript
easeInOutQuint(0.0)   // 0.0
easeInOutQuint(0.5)   // 0.5
easeInOutQuint(1.0)   // 1.0
```

**Use cases:** Hero animations, focal transitions, premium feel animations

---

## Expo Family

Exponential acceleration (2^(10x)). Very dramatic acceleration.

### `easeInExpo(x: number): number`

Exponential acceleration

```typescript
easeInExpo(0.0)   // 0.0
easeInExpo(0.5)   // ~0.031
easeInExpo(1.0)   // 1.0
```

**Use cases:** Pop-in effects, loading spinners, explosion animations

### `easeOutExpo(x: number): number`

Exponential deceleration

```typescript
easeOutExpo(0.0)   // 0.0
easeOutExpo(0.5)   // ~0.969
easeOutExpo(1.0)   // 1.0
```

**Use cases:** Pop-out effects, launching, explosive exits

### `easeInOutExpo(x: number): number`

Combination of easeInExpo and easeOutExpo.

```typescript
easeInOutExpo(0.0)   // 0.0
easeInOutExpo(0.5)   // 0.5
easeInOutExpo(1.0)   // 1.0
```

**Use cases:** Spotlight effects, dramatic reveals, power-up animations

---

## Circ Family

Circular motion easing. Based on circular acceleration.

### `easeInCirc(x: number): number`

Circular acceleration

```typescript
easeInCirc(0.0)   // 0.0
easeInCirc(0.5)   // ~0.134
easeInCirc(1.0)   // 1.0
```

**Use cases:** Circular movements, rotating transitions, arc-based animations

### `easeOutCirc(x: number): number`

Circular deceleration

```typescript
easeOutCirc(0.0)   // 0.0
easeOutCirc(0.5)   // ~0.866
easeOutCirc(1.0)   // 1.0
```

**Use cases:** Spinning to stop, orbital movements, rolling animations

### `easeInOutCirc(x: number): number`

Combination of easeInCirc and easeOutCirc.

```typescript
easeInOutCirc(0.0)   // 0.0
easeInOutCirc(0.5)   // 0.5
easeInOutCirc(1.0)   // 1.0
```

**Use cases:** Smooth rotations, spinning doors, circular reveals

---

## Back Family

Overshoots the target then settles back. Creates playful bouncy effects.

### `easeInBack(x: number): number`

Overshoots during acceleration phase

```typescript
easeInBack(0.0)   // 0.0
easeInBack(0.5)   // ~-0.087 (undershoots)
easeInBack(1.0)   // 1.0
```

**Use cases:** Anticipation animations, wind-up effects, pull-back preparation

### `easeOutBack(x: number): number`

Overshoots during deceleration phase

```typescript
easeOutBack(0.0)   // 0.0
easeOutBack(0.5)   // ~1.087 (overshoots)
easeOutBack(1.0)   // 1.0
```

**Use cases:** Playful bounces, rubber-band effects, spring-back animations

### `easeInOutBack(x: number): number`

Overshoots at both beginning and end

```typescript
easeInOutBack(0.0)   // 0.0
easeInOutBack(0.5)   // 0.5
easeInOutBack(1.0)   // 1.0
```

**Use cases:** Playful UI interactions, elastic collisions, fun transitions

---

## Elastic Family

Spring-like motion with oscillations. Creates natural, organic feel.

### `easeInElastic(x: number): number`

Spring compression phase

```typescript
easeInElastic(0.0)   // 0.0
easeInElastic(0.5)   // ~-0.195 (oscillates)
easeInElastic(1.0)   // 1.0
```

**Use cases:** Spring loading, elastic collisions, bouncy entrances

### `easeOutElastic(x: number): number`

Spring release phase

```typescript
easeOutElastic(0.0)   // 0.0
easeOutElastic(0.5)   // ~1.195 (oscillates)
easeOutElastic(1.0)   // 1.0
```

**Use cases:** Spring launches, jello wobble, elastic exits

### `easeInOutElastic(x: number): number`

Elastic motion at both phases

```typescript
easeInOutElastic(0.0)   // 0.0
easeInOutElastic(0.5)   // 0.5
easeInOutElastic(1.0)   // 1.0
```

**Use cases:** Springy UI elements, elastic collisions, organic transitions

---

## Bounce Family

Bouncing motion, like a ball bouncing to a stop.

### `easeInBounce(x: number): number`

Bounces during acceleration

```typescript
easeInBounce(0.0)   // 0.0
easeInBounce(0.5)   // ~0.047 (bounces)
easeInBounce(1.0)   // 1.0
```

**Use cases:** Ball dropping, bounce-in animations, energetic entrances

### `easeOutBounce(x: number): number`

Bounces during deceleration

```typescript
easeOutBounce(0.0)   // 0.0
easeOutBounce(0.5)   // ~0.953 (bounces)
easeOutBounce(1.0)   // 1.0
```

**Use cases:** Ball landing, bounce-out animations, playful exits

### `easeInOutBounce(x: number): number`

Bounces at both phases

```typescript
easeInOutBounce(0.0)   // 0.0
easeInOutBounce(0.5)   // 0.5
easeInOutBounce(1.0)   // 1.0
```

**Use cases:** Bouncy UI elements, playful interactions, fun transitions

---

## Comparison Chart

| Family | Acceleration | Overshoots | Oscillates | Feel |
|--------|-------------|-----------|-----------|------|
| Sine | Moderate | No | No | Smooth |
| Quad | Moderate | No | No | Standard |
| Cubic | Moderate | No | No | Smooth |
| Quart | Strong | No | No | Snappy |
| Quint | Very Strong | No | No | Dramatic |
| Expo | Very Strong | No | No | Explosive |
| Circ | Moderate | No | No | Natural |
| Back | Moderate | Yes | No | Playful |
| Elastic | Strong | Yes | Yes | Springy |
| Bounce | Strong | No | Yes | Bouncy |

## Choosing an Easing Function

**For smooth, natural feel:** Use Sine, Quad, Cubic, or Circ

**For snappy, responsive feel:** Use Quart, Quint, or Expo

**For playful, fun feel:** Use Back, Elastic, or Bounce

**For general UI:** Start with easeInOutQuad, adjust if needed

**For game physics:** Consider Elastic or Bounce for realistic motion
