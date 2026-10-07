# Pixel Effects

The pixel effects accept RGBA pixels in a `Uint8ClampedArray` and return a new `Uint8ClampedArray` of the same length. The input is not modified. Except for `halftone` and `hsv`, which are documented in [Color Spaces](color-spaces.md), each effect preserves the original alpha channel.

## Color Adjustment

### `add(pixels, value)`

Adds the red, green, and blue components of `value` to every pixel. Each result is clamped to the byte range `0`–`255`.

```typescript
add(pixels, [20, 0, -10]);
```

### `multiply(pixels, value)`

Multiplies each pixel's red, green, and blue components by the corresponding components in `value`. Results are clamped to `0`–`255`.

```typescript
multiply(pixels, [1, 0.8, 0.8]);
```

For both functions, `value` is an RGB tuple with an optional fourth component: `[r, g, b, a?]`. Only the first three components are used.

## Tone and Color Effects

### `colorPop(pixels, hueTarget, threshold?)`

Keeps colors near `hueTarget` in color and converts other pixels to grayscale. Hue and threshold are normalized values in the range `0`–`1`; the default threshold is `20 / 360`. Hue comparisons wrap around the ends of the hue range.

```typescript
colorPop(pixels, 0, 0.05); // retain red hues
```

### `duotone(pixels, from, to)`

Maps each pixel's brightness from the `from` RGB color at the darkest end to the `to` RGB color at the brightest end.

```typescript
duotone(pixels, [20, 30, 80], [255, 210, 120]);
```

### `grayscale(pixels)`

Replaces each pixel's RGB channels with its weighted brightness. Alpha is unchanged.

### `heatmap(pixels)`

Maps brightness to a blue-green-red heatmap, with dark pixels blue and bright pixels red.

### `negative(pixels)`

Inverts each RGB channel by subtracting it from `255`.

### `posterize(pixels, channels?)`

Reduces the number of color levels by quantizing each RGB channel in steps of `channels`. The default step is `32`.

```typescript
posterize(pixels); // use 32-channel steps
posterize(pixels, 64);
```

### `sepia(pixels)`

Applies a sepia color transform to RGB channels.

### `threshold(pixels, threshold)`

Converts pixels to black or white based on weighted brightness. A brightness greater than `threshold` becomes white (`255`); all other pixels become black (`0`). Alpha is unchanged.

```typescript
threshold(pixels, 128);
```

### `vintage(pixels)`

Applies the same sepia-toned RGB transform as `sepia`.

## Input Requirements

Every effect that accepts RGBA requires a `Uint8ClampedArray` whose length is a multiple of four. Each consecutive group of four values represents one pixel as `[red, green, blue, alpha]`. Invalid input throws an error.
