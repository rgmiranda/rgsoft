import { describe, expect, it } from "vitest";
import {
  validateRgba,
  getBrightness,
  sepiaRed,
  sepiaGreen,
  sepiaBlue,
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
});
