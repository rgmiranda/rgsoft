# Utility Functions

## Overview

The utility helpers cover range generation, interpolation, clamping, and tolerance-based comparisons.

- `range(start, end, step?)` — Produces a numeric sequence from a start value to an end value.
- `lerp(start, stop, amount)` — Interpolates a value between two endpoints using a normalized amount.
- `clamp(value, lowerBound, upperBound)` — Keeps a number within a bounded interval.
- `approximateTo(n, target, epsilon?)` — Returns the target when the value is within epsilon of it.
- `areClose(n, m, epsilon?)` — Compares two numbers with a tolerance threshold.
- `isCloseToZero(n, epsilon?)` — Checks whether a value is effectively zero.
- `mapRange(value, inputMin, inputMax, outputMin, outputMax, clampValue?)` — Rescales a value from one range into another.

## Range

The `range` function generates an array of numbers from a `start` value (inclusive) to an `end` value (exclusive), using a step size.

```javascript
range(0, 5, 1); // [0, 1, 2, 3, 4]
range(2, -2, -1); // [2, 1, 0, -1]
```

## Lerp

The `lerp` function interpolates a value between two endpoints using a normalized amount between `0` and `1`.

```javascript
lerp(0, 5, 0.6); // 3
lerp(100, 0, 0.25); // 75
```

## Clamp

The `clamp` function constrains a value within a given range.

```javascript
clamp(2.5, 0, 5); // 2.5
clamp(0, 5, 10); // 5
clamp(25, 5, 10); // 10
```

## Approximate To

The `approximateTo` helper returns the target value when the input is within a tolerance of it; otherwise it returns the input unchanged.

```javascript
approximateTo(0.00000000005, 0); // 0
approximateTo(1.5, 0); // 1.5
```

## Are Close

The `areClose` function compares two numbers using an epsilon tolerance.

```javascript
areClose(1.00000000005, 1); // true
areClose(1.0001, 1); // false
```

## Is Close to Zero

The `isCloseToZero` helper checks whether a value is effectively zero within a tolerance.

```javascript
isCloseToZero(1e-12); // true
isCloseToZero(0.01); // false
```

## Map Range

The `mapRange` function rescales a value from one numeric range into another range, optionally clamping the output.

```javascript
mapRange(0, -5, 5, 0, 10); // 5
mapRange(5, 5, -5, 0, 10); // 0
mapRange(-6, -5, 5, 0, 10, false); // -1
mapRange(6, -5, 5, 0, 10, false); // 10
```
