import { describe, expect, it } from "vitest";
import { add, halftone } from "../src";
import { pixel } from "../src/types";

describe(add.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    value: pixel;
    w: number;
    h: number;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([
          255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255,
        ]),
        value: [128, 128, 128, 128],
        w: 2,
        h: 2,
        expected: new Uint8ClampedArray([
          255, 128, 128, 255, 128, 255, 128, 255, 128, 128, 255, 255, 255, 255,
          255, 255,
        ]),
      },
    ],
  ];

  it.each(testData)(
    "Add a pixel to the image data",
    ({ data, value, w, h, expected }) => {
      const result = add(data, value);
      expect(result).toEqual(expected);
    },
  );
});

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

  it.each(halftoneTestData)("Converts from RGBA to CMYK", ({ rgba, cmyk }) => {
    expect(halftone(rgba)).toEqual(cmyk);
  });
});
