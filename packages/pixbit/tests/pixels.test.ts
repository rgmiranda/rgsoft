import { describe, expect, it } from "vitest";
import { halftone } from "../src";

describe(halftone.name, () => {

  const halftoneTestData = [
    [
      {
        rgba: new Uint8ClampedArray([255, 0, 0, 255]),
        cmyk: new Float32Array([0, 1, 1, 0]),
      },
    ],
    [
      {
        rgba: new Uint8ClampedArray([0, 255, 0, 255]),
        cmyk: new Float32Array([1, 0, 1, 0]),
      },
    ],
    [
      {
        rgba: new Uint8ClampedArray([0, 0, 255, 255]),
        cmyk: new Float32Array([1, 1, 0, 0]),
      },
    ],
    [
      {
        rgba: new Uint8ClampedArray([255, 0, 255, 255]),
        cmyk: new Float32Array([0, 1, 0, 0]),
      },
    ],
    [
      {
        rgba: new Uint8ClampedArray([127, 0, 127, 255]),
        cmyk: new Float32Array([0, 1, 0, 0.501960813999176]), // Convert error
      },
    ],
  ];

  it.each(halftoneTestData)('Converts from RGBA to CMYK', ({ rgba, cmyk }) => {
    expect(halftone(rgba)).toEqual(cmyk);
  });
});
