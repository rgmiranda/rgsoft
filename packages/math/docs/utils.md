# Util Functions

## Range

The `range` generates an array of numbers from a `start` (inclusively) to an `end` (exclusively), using a `step`.
For example

```javascript
range(0, 5, 1); // [0, 1, 2, 3, 4]
range(2, -2, -1); // [2, 1, 0, -1]
```

## Lerp

The `lerp` function interpolates an amount between `0` and `1` in a given range:
For example

```javascript
range(0, 5, 0.6); // 3
range(100, 0, 0.25); // 75
```

## Clamp

The `clamp` function clamps a value within a given range:
For example

```javascript
clamp(2.5, 0, 5); // 2.5
clamp(0, 5, 10); // 5
range(25, 5, 10); // 10
```

## Map Range

Maps a value in a range to a value in another range, optionally, clamping the
resulting value. For example

```javascript
mapRange(0, -5, 5, 0, 10); // 5
mapRange(5, 5, -5, 0, 10); // 0
mapRange(-6, -5, 5, 0, 10, false); // -1
mapRange(6, -5, 5, 0, 10, false); // 10
```
