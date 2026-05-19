import { describe, expect, it } from "vitest";
import { add, colorPop, duotone, grayscale, halftone, heatmap } from "../src";
import { pixel } from "../src/types";

describe(add.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    value: pixel;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([
          255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255,
        ]),
        value: [128, 128, 128, 128],
        expected: new Uint8ClampedArray([
          255, 128, 128, 255, 128, 255, 128, 255, 128, 128, 255, 255, 255, 255,
          255, 255,
        ]),
      },
    ],
  ];

  it.each(testData)(
    "Add a pixel to the image data",
    ({ data, value, expected }) => {
      const result = add(data, value);
      expect(result).toEqual(expected);
    },
  );
});

describe(duotone.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    from: pixel;
    to: pixel;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([255, 255, 255, 255]),
        from: [0, 0, 0, 255],
        to: [128, 128, 128, 255],
        expected: new Uint8ClampedArray([128, 128, 128, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([0, 0, 0, 255]),
        from: [64, 64, 64, 255],
        to: [128, 128, 128, 255],
        expected: new Uint8ClampedArray([64, 64, 64, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        from: [64, 64, 64, 255],
        to: [128, 128, 128, 255],
        expected: new Uint8ClampedArray([83, 83, 83, 255]),
      },
    ],
  ];

  it.each(testData)(
    "Applies a duotone effect to the image data",
    ({ data, from, to, expected }) => {
      const result = duotone(data, from, to);
      expect(result).toEqual(expected);
    },
  );
});

describe(colorPop.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    hueTarget: number;
    threshold?: number;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        hueTarget: 0,
        expected: new Uint8ClampedArray([255, 0, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        hueTarget: 0.5,
        expected: new Uint8ClampedArray([76, 76, 76, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 255, 0, 255]),
        hueTarget: 0.5,
        expected: new Uint8ClampedArray([226, 226, 226, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 255, 0, 255]),
        hueTarget: 1 / 6,
        expected: new Uint8ClampedArray([255, 255, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 255, 0, 255]),
        hueTarget: - 5 / 6,
        expected: new Uint8ClampedArray([255, 255, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        hueTarget: 1,
        expected: new Uint8ClampedArray([255, 0, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        hueTarget: 2,
        expected: new Uint8ClampedArray([255, 0, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        hueTarget: -1,
        expected: new Uint8ClampedArray([255, 0, 0, 255]),
      },
    ],
  ];

  it.each(testData)(
    "Applies a color pop effect to the image data",
    ({ data, hueTarget, threshold, expected }) => {
      const result = colorPop(data, hueTarget, threshold);
      expect(result).toEqual(expected);
  });
});

describe(grayscale.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([255, 0, 0, 255]),
        expected: new Uint8ClampedArray([76, 76, 76, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([0, 255, 0, 255]),
        expected: new Uint8ClampedArray([150, 150, 150, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([0, 0, 255, 255]),
        expected: new Uint8ClampedArray([29, 29, 29, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([0, 0, 0, 255]),
        expected: new Uint8ClampedArray([0, 0, 0, 255]),
      },
    ],
    [
      {
        data: new Uint8ClampedArray([255, 255, 255, 255]),
        expected: new Uint8ClampedArray([255, 255, 255, 255]),
      },
    ]
  ];

  it.each(testData)("Converts the image data to grayscale", ({ data, expected }) => {
    const result = grayscale(data);
    expect(result).toEqual(expected);
  });
});

describe(heatmap.name, () => {
  const testData: {
    data: Uint8ClampedArray<ArrayBuffer>;
    expected: Uint8ClampedArray<ArrayBuffer>;
  }[][] = [
    [
      {
        data: new Uint8ClampedArray([0, 0, 0, 255]),
        expected: new Uint8ClampedArray([0, 0, 255, 255]),
      }
    ],
    [
      {
        data: new Uint8ClampedArray([255, 255, 255, 255]),
        expected: new Uint8ClampedArray([255, 0, 0, 255]),
      }
    ],
    [
      {
        data: new Uint8ClampedArray([127, 127, 127, 255]),
        expected: new Uint8ClampedArray([253, 253, 255, 255]),
      }
    ],
    [
      {
        data: new Uint8ClampedArray([0, 255, 0, 255]),
        expected: new Uint8ClampedArray([255, 210, 210, 255]),
      }
    ],
  ];

  it.each(testData)("Converts image to heatmap", ({ data, expected }) => {
    const result = heatmap(data);
    expect(result).toEqual(expected);
  });
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
