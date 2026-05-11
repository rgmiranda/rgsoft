import { describe, expect, it } from "vitest";
import {
  validateRgba,
  getBrightness,
  sepiaRed,
  sepiaGreen,
  sepiaBlue,
  isHueInRange,
  validateHsl,
  rgbToHsl,
} from "../src/utils";

function expectClose(actual: number, expected: number, precision = 5) {
  expect(actual).toBeCloseTo(expected, precision);
}

describe("Utils", () => {
  describe(validateRgba.name, () => {
    const okData: Uint8ClampedArray[] = [
      new Uint8ClampedArray([1, 2, 3, 4]),
      new Uint8ClampedArray([1, 2, 3, 4, 5, 6, 7, 8]),
      new Uint8ClampedArray([]),
      new Uint8ClampedArray([255, 255, 255, 255]),
      new Uint8ClampedArray([0, 0, 0, 0]),
    ];

    it.each(okData)("does not throws any exception on correct data", (data) => {
      expect(() => validateRgba(data)).not.toThrowError();
    });

    it("throws exception on invalid parameter", () => {
      const data = JSON.parse("{}");
      expect(() => validateRgba(data)).toThrowError("RGBA must be an array");
    });

    const invalidLenghtData: Uint8ClampedArray[] = [
      new Uint8ClampedArray([1, 2, 3]),
      new Uint8ClampedArray([1, 2, 3, 4, 5]),
      new Uint8ClampedArray([255]),
      new Uint8ClampedArray([255, 255, 255, 255, 0]),
    ];

    it.each(invalidLenghtData)(
      "throws exception on invalid data length",
      (data) => {
        expect(() => validateRgba(data)).toThrowError(
          "Invalid number of elements in array",
        );
      },
    );
  });

  describe(validateRgba.name, () => {
    const okData: Uint8ClampedArray[] = [
      new Uint8ClampedArray([1, 2, 3, 4]),
      new Uint8ClampedArray([1, 2, 3, 4, 5, 6, 7, 8]),
      new Uint8ClampedArray([]),
      new Uint8ClampedArray([255, 255, 255, 255]),
      new Uint8ClampedArray([0, 0, 0, 0]),
    ];

    it.each(okData)("does not throws any exception on correct data", (data) => {
      expect(() => validateRgba(data)).not.toThrowError();
    });

    it("throws exception on invalid parameter", () => {
      const data = JSON.parse("{}");
      expect(() => validateRgba(data)).toThrowError("RGBA must be an array");
    });

    const invalidLenghtData: Uint8ClampedArray[] = [
      new Uint8ClampedArray([1, 2, 3]),
      new Uint8ClampedArray([1, 2, 3, 4, 5]),
      new Uint8ClampedArray([255]),
      new Uint8ClampedArray([255, 255, 255, 255, 0]),
    ];

    it.each(invalidLenghtData)(
      "throws exception on invalid data length",
      (data) => {
        expect(() => validateRgba(data)).toThrowError(
          "Invalid number of elements in array",
        );
      },
    );
  });

  describe("validateHsl", () => {
    const okData: Float32Array[] = [
      new Float32Array([0, 0, 0, 0]),
      new Float32Array([1, 1, 1, 1]),
      new Float32Array([0.5, 0.5, 0.5, 0.5]),
      new Float32Array([0.25, 0.75, 0.5, 0.15]),
    ];

    it.each(okData)("does not throws any exception on correct data", (data) => {
      expect(() => validateHsl(data)).not.toThrowError();
    });

    const wrongData: [Float32Array, string][] = [
      [new Float32Array([-1, 1, 1, 1]), "Hue must be between 0 and 1"],
      [new Float32Array([1, -1, 1, 1]), "Saturation must be between 0 and 1"],
      [new Float32Array([1, 1, 5, 1]), "Luminosity must be between 0 and 1"],
      [new Float32Array([0, 0, 0, 2]), "Alpha must be between 0 and 1"],
      [new Float32Array([0.5, 0.5, 0.5]), "Invalid number of elements in array"],
      [JSON.parse("{}") as Float32Array, "HSLA must be a Float32Array"],
    ];

    it.each(wrongData)("throws an exception on wrong data", (data, error) => {
      expect(() => validateHsl(data)).toThrowError(error);
    });
  });

  describe("getBrightness", () => {
    it("should return 0 for black", () => {
      expect(getBrightness(0, 0, 0)).toBe(0);
    });

    it("should return 255 for white (clamped)", () => {
      expect(getBrightness(255, 255, 255)).toBe(255);
    });

    it("should calculate correct brightness for pure red", () => {
      expectClose(getBrightness(255, 0, 0), 0.299 * 255);
    });

    it("should calculate correct brightness for pure green", () => {
      expectClose(getBrightness(0, 255, 0), 0.587 * 255);
    });

    it("should calculate correct brightness for pure blue", () => {
      expectClose(getBrightness(0, 0, 255), 0.114 * 255);
    });

    it("should clamp values above 255", () => {
      // forzamos overflow artificial
      const value = getBrightness(300, 300, 300);
      expect(value).toBe(255);
    });
  });

  describe("sepia", () => {
    describe("sepiaRed", () => {
      it("should return 0 for black", () => {
        expect(sepiaRed(0, 0, 0)).toBe(0);
      });

      it("should clamp to 255 for white", () => {
        expect(sepiaRed(255, 255, 255)).toBe(255);
      });

      it("should compute correct value for a known color", () => {
        const r = sepiaRed(100, 150, 200);
        expectClose(r, 0.393 * 100 + 0.769 * 150 + 0.189 * 200);
      });
    });

    describe("sepiaGreen", () => {
      it("should return 0 for black", () => {
        expect(sepiaGreen(0, 0, 0)).toBe(0);
      });

      it("should clamp to 255 for white", () => {
        expect(sepiaGreen(255, 255, 255)).toBe(255);
      });

      it("should compute correct value for a known color", () => {
        const g = sepiaGreen(100, 150, 200);
        expectClose(g, 0.349 * 100 + 0.686 * 150 + 0.168 * 200);
      });
    });

    describe("sepiaBlue", () => {
      it("should return 0 for black", () => {
        expect(sepiaBlue(0, 0, 0)).toBe(0);
      });

      it("should clamp to less than 255 for white", () => {
        expect(sepiaBlue(255, 255, 255)).toBeLessThan(255);
      });

      it("should compute correct value for a known color", () => {
        const b = sepiaBlue(100, 150, 200);
        expectClose(b, 0.272 * 100 + 0.534 * 150 + 0.131 * 200);
      });
    });
  });

  describe(isHueInRange.name, () => {
    const testData: [number, number, number, boolean][] = [
      [0, 0, 0, true],
      [0, 0, 0, true],
      [0, 1, 0, true],
      [1, 1, 0, true],
      [0.1, 1, 0.2, true],
      [0.2, 1, 0.1, false],
      [0.51, 0.5 , 0.015, true],
      [3.51, 0.5 , 0.015, true],
      [3.52, 0.5 , 0.015, false],
    ];

    it.each(testData)("detects hue in range", (h, tgt, thrs, e) => {
      expect(isHueInRange(h, tgt, thrs)).toBe(e);
    });
  });

  describe(rgbToHsl.name, () => {
    const testData: [number, number, number, number, number, number][] = [
      [0, 0, 0, 0, 0, 0],
      [255, 255, 255, 0, 0, 1],
      [255, 0, 0, 0, 1, 0.5],
      [255, 255, 0, 1/6, 1, 0.5],
      [255, 0, 255, 5/6, 1, 0.5],
      [0, 0, 255, 4/6, 1, 0.5],
      [0, 255, 255, 0.5, 1, 0.5],
      [0, 255, 0, 1/3, 1, 0.5],
    ];

    it.each(testData)(
      "converts RGB to HSL correctly",
      (r, g, b, h, s, l) => {
        const [hslH, hslS, hslL] = rgbToHsl(r, g, b);
        expectClose(hslH, h);
        expectClose(hslS, s);
        expectClose(hslL, l);
      },
    );
  });
});
