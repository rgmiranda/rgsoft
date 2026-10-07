# Color Spaces

Pixbit includes functions to convert an RGBA byte buffer into normalized color-channel data stored in a `Float32Array`.

## HSV

### `hsv(pixels)`

Converts each RGBA pixel to four normalized values in `[hue, saturation, value, alpha]` order. Hue, saturation, value, and alpha are represented in the range `0`–`1`; alpha is normalized from its byte value.

```typescript
import { hsv } from "@rgsoft/pixbit";

const channels = hsv(new Uint8ClampedArray([255, 0, 0, 255]));
console.log([...channels]); // [0, 1, 1, 1] (red, fully opaque)
```

## CMYK

### `halftone(pixels)`

Converts each RGBA pixel to normalized cyan, magenta, yellow, and key (black) channel values in `[c, m, y, k]` order. The result is a `Float32Array` with four values per input pixel. The fourth output value is the CMYK black component, not the input alpha channel.

```typescript
import { halftone } from "@rgsoft/pixbit";

const channels = halftone(new Uint8ClampedArray([0, 0, 0, 255]));
console.log([...channels]); // [0, 0, 0, 1] (black)
```

Both functions require a `Uint8ClampedArray` with a length divisible by four. They return new arrays and do not modify the input.
