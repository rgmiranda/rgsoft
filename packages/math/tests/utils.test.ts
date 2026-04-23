import { describe, expect, it } from "vitest";
import { clamp, lerp, range, approximateTo, areClose, isCloseToZero, mapRange } from "../src";

describe("Utils", () => {
  describe(range.name, () => {
    const fromBaseData: {
      params: [number, number, number];
      expected: number[];
    }[] = [
      {
        params: [0, 5, 1],
        expected: [0, 1, 2, 3, 4],
      },
      {
        params: [5, 0, -1],
        expected: [5, 4, 3, 2, 1],
      },
      {
        params: [-5, 0, 1],
        expected: [-5, -4, -3, -2, -1],
      },
      {
        params: [3, -3, -1],
        expected: [3, 2, 1, 0, -1, -2],
      },
      {
        params: [3, -3, -2],
        expected: [3, 1, -1],
      },
      {
        params: [0, 5, 4],
        expected: [0, 4],
      },
      {
        params: [0, 5, 5],
        expected: [0],
      },
    ];

    it.each(fromBaseData)("generates the range", ({ params, expected }) => {
      const result = range(...params);
      expect(result).toEqual(expected);
    });

    const invalidRanges: [number, number, number][] = [
      [0, 10, -1],
      [0, 0, 1],
      [10, -10, 1],
    ];

    it.each(invalidRanges)("fails on invalid range", (start, end, step) => {
      expect(() => range(start, end, step)).toThrowError("Invalid range");
    });
  });

  describe(lerp.name, () => {
    const testData = [
      [0, 1, 0.5, 0.5],
      [0, 10, 0.5, 5],
      [50, 100, 0.5, 75],
      [-50, 50, 0.5, 0],
      [-50, 50, 0.75, 25],
      [100, 0, 0.75, 25],
    ];

    it.each(testData)("applies lerp", (start, stop, amount, expected) => {
      expect(lerp(start, stop, amount)).toBe(expected);
    });

    it("fails on invalid amount", () => {
      expect(() => lerp(0, 10, -0.1)).toThrowError(
        "Amount must be between 0 and 1"
      );
      expect(() => lerp(0, 10, 2.5)).toThrowError(
        "Amount must be between 0 and 1"
      );
    });
  });

  describe(clamp.name, () => {
    const testData = [
      [0, 0, 10, 0],
      [10, 0, 10, 10],
      [-8, 0, 10, 0],
      [55, 0, 10, 10],
    ];

    it.each(testData)(
      "clamps values",
      (lowerBound, upperBound, value, expected) => {
        expect(clamp(lowerBound, upperBound, value)).toBe(expected);
      }
    );

    it("fails on invalid range", () => {
      expect(() => clamp(20, 10, 0)).toThrowError(
        "Lower bound must be lower than upper bound"
      );
    });
  });

  describe(approximateTo.name, () => {
    const testData: [number, number, number, number][] = [
      [2.999, 3, 1e-6, 2.999],
      [2.99999, 3, 1e-6, 2.99999],
      [2.999999, 3, 1e-6, 2.999999],
      [2.9999999, 3, 1e-6, 3],
      [2.99999, 3, 1e-4, 3],
    ];

    it.each(testData)(
      "approximates values to",
      (n, target, epsilon, expected) => {
        expect(approximateTo(n, target, epsilon)).toBe(expected);
      }
    );
  });

  describe(areClose.name, () => {
    const testData: [number, number, number, boolean][] = [
      [2.999, 3, 1e-6, false],
      [2.99999, 3, 1e-6, false],
      [2.999999, 3, 1e-6, false],
      [2.9999999, 3, 1e-6, true],
      [2.99999, 3, 1e-4, true],
    ];

    it.each(testData)(
      "detects when values are close",
      (n, m, epsilon, expected) => {
        expect(areClose(n, m, epsilon)).toBe(expected);
      }
    );
  });

  describe(isCloseToZero.name, () => {
    const testData: [number, number, boolean][] = [
      [0.001, 1e-6, false],
      [0.00001, 1e-6, false],
      [0.000001, 1e-6, false],
      [0.00000001, 1e-6, true],
      [0.00001, 1e-4, true],
    ];

    it.each(testData)(
      "detects when a value is close to zero",
      (n, epsilon, expected) => {
        expect(isCloseToZero(n, epsilon)).toBe(expected);
      }
    );
  });

  describe(mapRange.name, () => {
    const happyTests = [
      [0, -5, 5, 0, 10, 5],
      [5, -5, 5, 0, 10, 10],
      [-5, -5, 5, 0, 10, 0],
      [-5, -5, 5, 0, 10, 0],
      [0, 0, 10, 100, 900, 100],
      [5, 0, 10, 100, 900, 500],
    ];

    const unclampedTests = [
      [6, -5, 5, 0, 10, 11],
      [-6, -5, 5, 0, 10, -1],
      [11, 0, 10, 100, 900, 980],
      [12, 0, 10, 100, 900, 1060],
      [-1, 0, 10, 100, 900, 20],
      [2, 0, 1, 0, 100, 200],
    ];

    const clampedTests = [
      [6, -5, 5, 0, 10, 10],
      [-6, -5, 5, 0, 10, 0],
      [11, 0, 10, 100, 900, 900],
      [12, 0, 10, 100, 900, 900],
      [-1, 0, 10, 100, 900, 100],
      [2, 0, 1, 0, 100, 100],
    ];

    const invertedTests = [
      [0, -5, 5, 10, 0, 5],
      [-5, -5, 5, 10, 0, 10],
      [5, -5, 5, 10, 0, 0],
      [0, 5, -5, 0, 10, 5],
      [5, 5, -5, 0, 10, 0],
      [-5, 5, -5, 0, 10, 10],
      [0, 5, -5, 10, 0, 5],
      [5, 5, -5, 10, 0, 10],
      [-5, 5, -5, 10, 0, 0],
    ];

    it.each(happyTests)(
      "maps the range",
      (val, inputMin, inputMax, outputMin, outputMax, expected) => {
        expect(mapRange(val, inputMin, inputMax, outputMin, outputMax)).toBe(
          expected,
        );
      },
    );

    it.each(unclampedTests)(
      "maps the range without clamping",
      (val, inputMin, inputMax, outputMin, outputMax, expected) => {
        expect(
          mapRange(val, inputMin, inputMax, outputMin, outputMax, false),
        ).toBeCloseTo(expected, 6);
      },
    );

    it.each(clampedTests)(
      "maps the range with clamping",
      (val, inputMin, inputMax, outputMin, outputMax, expected) => {
        expect(
          mapRange(val, inputMin, inputMax, outputMin, outputMax, true),
        ).toBeCloseTo(expected, 6);
      },
    );

    it.each(invertedTests)(
      "maps inverted",
      (val, inputMin, inputMax, outputMin, outputMax, expected) => {
        expect(
          mapRange(val, inputMin, inputMax, outputMin, outputMax),
        ).toBeCloseTo(expected, 5);
      },
    );
  });

});
